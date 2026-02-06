import React, { useState, useMemo, useEffect } from "react";
import Card from "../components/shared/Card";
import Input from "../components/shared/Input";
import Select from "../components/shared/Select";
import Button from "../components/shared/Button";
import Modal from "../components/shared/Modal";
import { MOCK_SAVED_CARDS } from "../constants/constants";
import {
  CryptoAsset,
  Transaction,
  TransactionSuccessDetails,
  CryptoWallet,
  TransactionStatus,
  TransactionType,
  Notification,
} from "../@types/types";

import { useNavigate } from "react-router-dom";
import { useWallet } from "../context/WalletContext";
import { useNotification } from "../context/NotificationContext";

const BalanceToCrypto: React.FC = () => {
  const navigate = useNavigate();
  const { addTransaction, wallets, cryptoPrices } = useWallet();
  const { addNotification } = useNotification();
  const [brlAmount, setBrlAmount] = useState("");
  const [asset, setAsset] = useState<CryptoAsset>(CryptoAsset.BTC);
  const [walletId, setWalletId] = useState("");

  const [selectedCardId, setSelectedCardId] = useState(
    MOCK_SAVED_CARDS[0]?.id || "new",
  );
  const [cardDetails, setCardDetails] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: "",
  });
  const [installments, setInstallments] = useState(1);

  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const filtered = wallets.filter((w) => w.asset === asset);
    setWalletId(filtered.length > 0 ? filtered[0].id : "");
  }, [asset, wallets]);

  const parsedBrlAmount = parseFloat(brlAmount) || 0;

  const { cryptoAmount, totalDebit, fees } = useMemo(() => {
    if (parsedBrlAmount <= 0 || !cryptoPrices)
      return { cryptoAmount: 0, totalDebit: 0, fees: 0 };

    const networkFeeBrl = asset === CryptoAsset.BTC ? 25.0 : 5.2;
    const currentPrice = cryptoPrices[asset].brl;

    const platformFeePercentage = 0.029; // 2.9% for credit card

    const platformFee = parsedBrlAmount * platformFeePercentage;
    const totalFees = platformFee + networkFeeBrl;
    const amountAfterFees = parsedBrlAmount - totalFees;

    const calculatedCryptoAmount = amountAfterFees / currentPrice;

    return {
      cryptoAmount: calculatedCryptoAmount > 0 ? calculatedCryptoAmount : 0,
      totalDebit: parsedBrlAmount,
      fees: totalFees,
    };
  }, [parsedBrlAmount, asset, cryptoPrices]);

  const handleSuccess = () => {
    const selectedWallet = wallets.find((w) => w.id === walletId);
    if (selectedWallet) {
      navigate("/success", {
        state: {
          cryptoAmount,
          asset,
          wallet: selectedWallet,
          brlAmount: parsedBrlAmount,
        },
      });
      setBrlAmount("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      const isApproved = Math.random() > 0.3; // 70% approval chance
      const selectedWallet = wallets.find((w) => w.id === walletId);

      addTransaction({
        type: TransactionType.CRYPTO_PURCHASE,
        value: parsedBrlAmount,
        status: isApproved
          ? TransactionStatus.CONFIRMED
          : TransactionStatus.FAILED,
        details: isApproved
          ? `${cryptoAmount.toFixed(8)} ${asset} para ${selectedWallet?.alias || "carteira"}`
          : `Falha na compra de ${asset}`,
      });

      setIsProcessing(false);

      if (isApproved) {
        addNotification({
          type: "success",
          title: "Compra Aprovada!",
          message: "Sua cripto está a caminho da sua carteira.",
        });
        setTimeout(() => {
          handleSuccess();
        }, 500); // Short delay to allow user to see notification before page change
      } else {
        addNotification({
          type: "error",
          title: "Pagamento Recusado",
          message:
            "Não foi possível processar a compra. Verifique os dados do cartão.",
        });
      }
    }, 2000);
  };

  const filteredWallets = wallets.filter((w) => w.asset === asset);
  const isFormValid =
    parsedBrlAmount > 0 &&
    !!walletId &&
    !!cryptoPrices &&
    (selectedCardId !== "new" ||
      (cardDetails.name &&
        cardDetails.number.length >= 16 &&
        cardDetails.expiry &&
        cardDetails.cvv.length >= 3));

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-dark-text">
        Comprar Cripto com Cartão
      </h1>
      <Card>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-dark-text-secondary mb-2">
              Escolher ativo
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div
                onClick={() => setAsset(CryptoAsset.BTC)}
                className={`p-4 border rounded-lg cursor-pointer text-center transition ${asset === CryptoAsset.BTC ? "border-brand-accent bg-brand-accent/10" : "border-slate-300 dark:border-dark-border"}`}
              >
                <p className="font-bold">BTC</p>
                <p className="text-sm text-slate-500 dark:text-dark-text-secondary">
                  {cryptoPrices
                    ? `R$ ${cryptoPrices.BTC.brl.toLocaleString("pt-BR")}`
                    : "Carregando..."}
                </p>
              </div>
              <div
                onClick={() => setAsset(CryptoAsset.USDT)}
                className={`p-4 border rounded-lg cursor-pointer text-center transition ${asset === CryptoAsset.USDT ? "border-brand-accent bg-brand-accent/10" : "border-slate-300 dark:border-dark-border"}`}
              >
                <p className="font-bold">USDT</p>
                <p className="text-sm text-slate-500 dark:text-dark-text-secondary">
                  {cryptoPrices
                    ? `R$ ${cryptoPrices.USDT.brl.toLocaleString("pt-BR")}`
                    : "Carregando..."}
                </p>
              </div>
            </div>
          </div>
          <Input
            label="Valor a comprar (R$)"
            type="number"
            placeholder="0,00"
            value={brlAmount}
            onChange={(e) => setBrlAmount(e.target.value)}
          />

          <div className="space-y-4">
            <Select
              label="Cartão de Crédito"
              value={selectedCardId}
              onChange={(e) => setSelectedCardId(e.target.value)}
            >
              {MOCK_SAVED_CARDS.map((card) => (
                <option key={card.id} value={card.id}>
                  {card.brand} final {card.last4}
                </option>
              ))}
              <option value="new">Cadastrar novo cartão</option>
            </Select>
            {selectedCardId === "new" && (
              <div className="space-y-4 p-4 border border-slate-200 dark:border-dark-border rounded-lg">
                <Input
                  label="Nome do Titular"
                  placeholder="Como impresso no cartão"
                  value={cardDetails.name}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, name: e.target.value })
                  }
                />
                <Input
                  label="Número do Cartão"
                  placeholder="0000 0000 0000 0000"
                  value={cardDetails.number}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, number: e.target.value })
                  }
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Validade (MM/AA)"
                    placeholder="MM/AA"
                    value={cardDetails.expiry}
                    onChange={(e) =>
                      setCardDetails({ ...cardDetails, expiry: e.target.value })
                    }
                  />
                  <Input
                    label="CVV"
                    placeholder="123"
                    value={cardDetails.cvv}
                    onChange={(e) =>
                      setCardDetails({ ...cardDetails, cvv: e.target.value })
                    }
                  />
                </div>
              </div>
            )}
            <Select
              label="Parcelamento"
              value={installments}
              onChange={(e) => setInstallments(parseInt(e.target.value))}
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((i) => (
                <option key={i} value={i}>
                  {i}x sem juros
                </option>
              ))}
            </Select>
          </div>

          <Select
            label="Carteira de destino"
            value={walletId}
            onChange={(e) => setWalletId(e.target.value)}
            disabled={filteredWallets.length === 0}
          >
            {filteredWallets.length > 0 ? (
              filteredWallets.map((w) => (
                <option key={w.id} value={w.id}>
                  {w.alias} (...{w.address.slice(-6)})
                </option>
              ))
            ) : (
              <option>Nenhuma carteira {asset} encontrada</option>
            )}
          </Select>

          {parsedBrlAmount > 0 && (
            <Card className="bg-slate-100 dark:bg-slate-800/50">
              <h3 className="font-semibold mb-3">Resumo da Compra</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-dark-text-secondary">
                    Taxas (plataforma + rede)
                  </span>
                  <span>
                    R${" "}
                    {fees.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between font-bold">
                  <span className="text-slate-600 dark:text-dark-text-secondary">
                    Total a ser pago
                  </span>
                  <span>
                    R${" "}
                    {totalDebit.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <hr className="border-slate-200 dark:border-dark-border my-2" />
                <div className="flex justify-between font-bold text-brand-accent text-lg">
                  <span>Você recebe aprox.</span>
                  <span>
                    {cryptoAmount > 0
                      ? `${cryptoAmount.toFixed(8)} ${asset}`
                      : "..."}
                  </span>
                </div>
              </div>
            </Card>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={!isFormValid || isProcessing}
          >
            {isProcessing ? "Processando..." : "Comprar e Enviar"}
          </Button>
        </form>
      </Card>

      <Modal
        isOpen={isProcessing}
        onClose={() => {}}
        title="Processando Compra"
      >
        <div className="flex flex-col items-center justify-center text-center p-4">
          <svg
            className="animate-spin h-12 w-12 text-brand-accent"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <h3 className="text-xl font-bold mt-4">Aguarde...</h3>
          <p>Estamos validando seu pagamento.</p>
        </div>
      </Modal>
    </div>
  );
};

export default BalanceToCrypto;
