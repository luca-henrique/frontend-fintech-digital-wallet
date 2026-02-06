import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Page,
  Transaction,
  TransactionStatus,
  CryptoAsset,
} from "../@types/types";
import Card from "../components/shared/Card";
import Button from "../components/shared/Button";
import TradingViewWidget from "../components/TradingViewWidget";

const TransactionStatusBadge: React.FC<{ status: TransactionStatus }> = ({
  status,
}) => {
  const colorClasses = {
    [TransactionStatus.CONFIRMED]: "bg-green-500/20 text-green-400",
    [TransactionStatus.PENDING]: "bg-yellow-500/20 text-yellow-400",
    [TransactionStatus.FAILED]: "bg-red-500/20 text-red-400",
  };
  return (
    <span
      className={`px-2 py-1 text-xs font-medium rounded-full ${colorClasses[status]}`}
    >
      {status}
    </span>
  );
};

const QuoteSkeleton: React.FC = () => (
  <div className="flex justify-between items-center animate-pulse">
    <div>
      <div className="h-5 w-10 bg-slate-200 dark:bg-slate-700 rounded"></div>
      <div className="h-4 w-16 bg-slate-200 dark:bg-slate-700 rounded mt-1"></div>
    </div>
    <div className="text-right">
      <div className="h-5 w-24 bg-slate-200 dark:bg-slate-700 rounded"></div>
    </div>
  </div>
);

import { useWallet } from "../context/WalletContext";

const Dashboard: React.FC = () => {
  const { userBalance, cryptoPrices, transactions } = useWallet();
  const navigate = useNavigate();
  const [displayedBalance, setDisplayedBalance] = useState(userBalance);
  const [priceDirection, setPriceDirection] = useState<"up" | "down" | null>(
    null,
  );
  const prevBtcPrice = useRef<number | null>(null);

  useEffect(() => {
    let animationFrameId: number;
    const start = displayedBalance;
    const end = userBalance;
    if (start === end) return;

    const duration = 500;
    const range = end - start;
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      const animatedValue = start + range * percentage;
      setDisplayedBalance(animatedValue);

      if (progress < duration) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setDisplayedBalance(end);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [userBalance]);

  useEffect(() => {
    if (cryptoPrices && prevBtcPrice.current !== null) {
      if (cryptoPrices.BTC.brl > prevBtcPrice.current) {
        setPriceDirection("up");
      } else if (cryptoPrices.BTC.brl < prevBtcPrice.current) {
        setPriceDirection("down");
      }
    }
    if (cryptoPrices) {
      prevBtcPrice.current = cryptoPrices.BTC.brl;
    }
  }, [cryptoPrices]);

  useEffect(() => {
    if (priceDirection) {
      const timeout = setTimeout(() => setPriceDirection(null), 1000);
      return () => clearTimeout(timeout);
    }
  }, [priceDirection]);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-dark-text">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Balance Card */}
        <Card
          className="lg:col-span-2 p-0 flex flex-col"
          style={{ height: "460px" }}
        >
          <div className="p-6">
            <h2 className="text-lg font-semibold text-slate-600 dark:text-dark-text-secondary">
              Gráfico BTC/BRL (Real-time)
            </h2>
          </div>
          <div className="flex-1">
            <TradingViewWidget />
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-6">
          <Card>
            <h2 className="text-lg font-semibold text-slate-600 dark:text-dark-text-secondary mb-2">
              Saldo Atual (BRL)
            </h2>
            <p className="text-4xl font-bold text-slate-900 dark:text-dark-text">
              R${" "}
              {displayedBalance.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </Card>
          <Card className="flex flex-col items-center justify-center text-center">
            <h2 className="text-lg font-semibold mb-4 text-slate-800 dark:text-dark-text">
              Ações Rápidas
            </h2>
            <div className="flex flex-col gap-4 w-full">
              <Button onClick={() => navigate("/card-to-pix")}>
                Fazer PIX com Cartão
              </Button>
              <Button
                onClick={() => navigate("/buy-crypto")}
                variant="secondary"
              >
                Comprar Cripto
              </Button>
            </div>
          </Card>
          <Card>
            <h2 className="text-lg font-semibold text-slate-600 dark:text-dark-text-secondary mb-3">
              Cotações
            </h2>
            <div className="space-y-4">
              {!cryptoPrices ? (
                <>
                  <QuoteSkeleton />
                  <QuoteSkeleton />
                </>
              ) : (
                <>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold text-slate-900 dark:text-dark-text">
                        BTC
                      </p>
                      <p className="text-sm text-slate-500 dark:text-dark-text-secondary">
                        Bitcoin
                      </p>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-semibold text-slate-900 dark:text-dark-text transition-colors duration-300 ${priceDirection === "up" ? "text-green-500" : ""} ${priceDirection === "down" ? "text-red-500" : ""}`}
                      >
                        R${" "}
                        {cryptoPrices.BTC.brl.toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold text-slate-900 dark:text-dark-text">
                        USDT
                      </p>
                      <p className="text-sm text-slate-500 dark:text-dark-text-secondary">
                        Tether
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-slate-900 dark:text-dark-text">
                        R${" "}
                        {cryptoPrices.USDT.brl.toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Recent Transactions */}
      <Card>
        <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-dark-text">
          Últimas Transações
        </h2>
        {transactions.length === 0 ? (
          <div className="text-center py-10 text-slate-500 dark:text-dark-text-secondary">
            NENHUMA TRANSAÇÃO REALIZADA
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b border-slate-200 dark:border-dark-border">
                <tr>
                  <th className="p-3 text-sm font-semibold text-slate-600 dark:text-dark-text-secondary">
                    Tipo
                  </th>
                  <th className="p-3 text-sm font-semibold text-slate-600 dark:text-dark-text-secondary">
                    Valor
                  </th>
                  <th className="p-3 text-sm font-semibold text-slate-600 dark:text-dark-text-secondary hidden sm:table-cell">
                    Data
                  </th>
                  <th className="p-3 text-sm font-semibold text-slate-600 dark:text-dark-text-secondary">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.slice(0, 5).map((tx: Transaction) => (
                  <tr
                    key={tx.id}
                    className="border-b border-slate-200 dark:border-dark-border last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-800 dark:text-dark-text"
                  >
                    <td className="p-3 font-medium">{tx.type}</td>
                    <td className="p-3">
                      R${" "}
                      {tx.value.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </td>
                    <td className="p-3 text-slate-500 dark:text-dark-text-secondary hidden sm:table-cell">
                      {tx.date}
                    </td>
                    <td className="p-3">
                      <TransactionStatusBadge status={tx.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Dashboard;
