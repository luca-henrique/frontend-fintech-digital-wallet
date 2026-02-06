import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { TransactionSuccessDetails } from "../@types/types";
import Card from "../components/shared/Card";
import Button from "../components/shared/Button";

const CheckIcon: React.FC = () => (
  <svg
    className="w-20 h-20 text-green-500"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const TransactionSuccess: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const details = location.state as TransactionSuccessDetails | null;

  if (!details) {
    // Fallback if the page is accessed directly without details
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-dark-text mb-4">
          Ocorreu um erro
        </h1>
        <p className="text-slate-600 dark:text-dark-text-secondary mb-6">
          Não foi possível carregar os detalhes da transação.
        </p>
        <Button onClick={() => navigate("/")}>Voltar para o Dashboard</Button>
      </div>
    );
  }

  const { cryptoAmount, asset, wallet } = details;

  return (
    <div className="flex flex-col items-center justify-center h-full text-center max-w-lg mx-auto">
      <CheckIcon />
      <h1 className="text-3xl font-bold text-slate-900 dark:text-dark-text mt-4 mb-2">
        Compra Confirmada!
      </h1>
      <p className="text-lg text-slate-600 dark:text-dark-text-secondary mb-8">
        O saldo foi enviado para a sua carteira com sucesso.
      </p>

      <Card className="w-full text-left">
        <h2 className="text-lg font-semibold mb-4 text-slate-800 dark:text-dark-text">
          Detalhes da Transação
        </h2>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-slate-500 dark:text-dark-text-secondary">
              Valor Enviado:
            </span>
            <span className="font-bold text-slate-900 dark:text-dark-text">
              {cryptoAmount.toFixed(8)} {asset}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 dark:text-dark-text-secondary">
              Carteira de Destino:
            </span>
            <span className="font-bold text-slate-900 dark:text-dark-text">
              {wallet.alias}
            </span>
          </div>
          <div className="flex justify-between items-start">
            <span className="text-slate-500 dark:text-dark-text-secondary pr-4">
              Endereço:
            </span>
            <span className="font-mono text-sm text-slate-700 dark:text-dark-text break-all text-right">
              ...{wallet.address.slice(-12)}
            </span>
          </div>
        </div>
      </Card>

      <Button onClick={() => navigate("/")} className="mt-8 w-full sm:w-auto">
        Voltar para o Dashboard
      </Button>
    </div>
  );
};

export default TransactionSuccess;
