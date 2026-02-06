import React, { useState, useMemo } from "react";
import Card from "../components/shared/Card";
import Button from "../components/shared/Button";
import Input from "../components/shared/Input";
import Select from "../components/shared/Select";
import Modal from "../components/shared/Modal";
import { MOCK_SAVED_CARDS } from "../constants/constants";
import {
  Transaction,
  TransactionStatus,
  TransactionType,
  Notification,
} from "../@types/types";

const MOCK_PIX_DATABASE: { [key: string]: { name: string; bank: string } } = {
  "usuario@teste.com": {
    name: "João da Silva Sauro",
    bank: "Nu Pagamentos S.A.",
  },
  "a1b2c3d4-e5f6-7890-g1h2-i3j4k5l6m7n8": {
    name: "Maria Oliveira Santos",
    bank: "Banco do Brasil S.A.",
  },
  "+5511987654321": {
    name: "Pedro Souza Costa",
    bank: "Caixa Econômica Federal",
  },
  "comercial@cryptopix.dev": {
    name: "CryptoPix Soluções LTDA",
    bank: "Banco Inter S.A.",
  },
};

const fetchPixKeyInfo = (
  key: string,
): Promise<{ name: string; bank: string } | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const info = MOCK_PIX_DATABASE[key.toLowerCase()];
      if (info) {
        resolve(info);
      } else {
        // For any other key that is reasonably long, generate a fake one for demonstration.
        if (key.length > 5 && key.includes("@")) {
          resolve({
            name: "Cliente Demonstração Fictício",
            bank: "Banco Fictício S.A.",
          });
        } else {
          resolve(null); // Key not found
        }
      }
    }, 1500); // Simulate network delay
  });
};

const isCardExpired = (expiry: string): boolean => {
  if (!/^\d{2}\/\d{2}$/.test(expiry)) return true; // Invalid format
  const [month, year] = expiry.split("/").map((num) => parseInt(num, 10));
  const expiryDate = new Date(2000 + year, month, 1); // Month is 0-indexed, so month becomes the next month's 1st day.
  const now = new Date();
  now.setHours(0, 0, 0, 0); // Set to start of today
  return expiryDate < now;
};

import { useWallet } from "../context/WalletContext";

const CardToPix: React.FC = () => {
  const { addTransaction } = useWallet();
  const [amount, setAmount] = useState("");
  const [pixKey, setPixKey] = useState("");
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

  const [pixKeyHolderInfo, setPixKeyHolderInfo] = useState<{
    name: string;
    bank: string;
  } | null>(null);
  const [isVerifyingPixKey, setIsVerifyingPixKey] = useState(false);
  const [pixKeyError, setPixKeyError] = useState<string | null>(null);

  const parsedAmount = parseFloat(amount) || 0;
  const feePercentage = 0.025; // 2.5%
  const fixedFee = 2.5; // R$2.50

  const { totalFee, finalAmount } = useMemo(() => {
    if (parsedAmount <= 0) return { totalFee: 0, finalAmount: 0 };
    const fee = parsedAmount * feePercentage + fixedFee;
    return {
      totalFee: fee,
      finalAmount: parsedAmount - fee,
    };
  }, [parsedAmount]);

  const selectedCard = useMemo(
    () => MOCK_SAVED_CARDS.find((c) => c.id === selectedCardId),
    [selectedCardId],
  );
  const isSelectedCardExpired = selectedCard
    ? isCardExpired(selectedCard.expiry)
    : false;

  const clearForm = () => {
    setAmount("");
    setPixKey("");
    setCardDetails({ name: "", number: "", expiry: "", cvv: "" });
    setInstallments(1);
    setSelectedCardId(MOCK_SAVED_CARDS[0]?.id || "new");
    setPixKeyHolderInfo(null);
    setPixKeyError(null);
  };

  const handlePixKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPixKey(e.target.value);
    if (pixKeyHolderInfo || pixKeyError) {
      setPixKeyHolderInfo(null);
      setPixKeyError(null);
    }
  };

  const handlePixKeyBlur = async () => {
    if (pixKey.length < 5) {
      return;
    }
    setIsVerifyingPixKey(true);
    setPixKeyHolderInfo(null);
    setPixKeyError(null);

    const info = await fetchPixKeyInfo(pixKey);

    setIsVerifyingPixKey(false);
    if (info) {
      setPixKeyHolderInfo(info);
    } else {
      setPixKeyError("Chave PIX não encontrada ou inválida.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      const isApproved = Math.random() > 0.3; // 70% chance of approval
      const status = isApproved
        ? TransactionStatus.CONFIRMED
        : TransactionStatus.FAILED;

      const details = isApproved
        ? `PIX para: ${pixKeyHolderInfo?.name}`
        : `Transação PIX de R$ ${parsedAmount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })} negada`;

      addTransaction({
        type: TransactionType.PIX_CARD,
        value: parsedAmount,
        status: status,
        details: details,
      });

      if (isApproved) {
        clearForm();
      }
      setIsProcessing(false);
    }, 2000);
  };

  const isFormValid =
    parsedAmount > 0 &&
    !!pixKeyHolderInfo &&
    !isSelectedCardExpired &&
    (selectedCardId !== "new" ||
      (cardDetails.name &&
        cardDetails.number.length >= 16 &&
        cardDetails.expiry &&
        cardDetails.cvv.length >= 3));

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-dark-text">
        Cartão → PIX
      </h1>
      <Card>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <Input
            label="Valor (R$)"
            type="number"
            placeholder="0,00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <div>
            <Input
              label="Chave PIX de Destino"
              placeholder="Digite a chave PIX"
              value={pixKey}
              onChange={handlePixKeyChange}
              onBlur={handlePixKeyBlur}
            />
            {isVerifyingPixKey && (
              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-dark-text-secondary mt-2">
                <svg
                  className="animate-spin h-4 w-4"
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
                Verificando chave...
              </div>
            )}
            {pixKeyError && (
              <p className="text-sm text-red-500 mt-2">{pixKeyError}</p>
            )}
            {pixKeyHolderInfo && (
              <div className="mt-2 p-3 bg-slate-100 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-dark-border">
                <p className="font-semibold text-sm text-slate-900 dark:text-dark-text">
                  {pixKeyHolderInfo.name}
                </p>
                <p className="text-xs text-slate-600 dark:text-dark-text-secondary">
                  {pixKeyHolderInfo.bank}
                </p>
              </div>
            )}
          </div>

          <div>
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
            {isSelectedCardExpired && (
              <p className="text-sm text-red-500 mt-1">Cartão vencido.</p>
            )}
          </div>

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

          {parsedAmount > 0 && (
            <Card className="bg-slate-100 dark:bg-slate-800/50">
              <h3 className="font-semibold mb-3 text-slate-900 dark:text-dark-text">
                Resumo da Operação
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-dark-text-secondary">
                    Taxas (fixa + percentual)
                  </span>
                  <span className="text-slate-800 dark:text-dark-text">
                    R$ {totalFee.toFixed(2)}
                  </span>
                </div>
                <hr className="border-slate-200 dark:border-dark-border my-2" />
                <div className="flex justify-between font-bold text-brand-accent text-lg">
                  <span>Valor final no PIX</span>
                  <span>R$ {finalAmount.toFixed(2)}</span>
                </div>
              </div>
            </Card>
          )}

          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={!isFormValid || isProcessing}>
              {isProcessing ? "Processando..." : "Enviar PIX"}
            </Button>
          </div>
        </form>
      </Card>

      <Modal
        isOpen={isProcessing}
        onClose={() => {}}
        title="Processando Transação"
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

export default CardToPix;
