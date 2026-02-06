import React, { useState } from "react";
import Card from "../components/shared/Card";
import Input from "../components/shared/Input";
import Button from "../components/shared/Button";
import { XCircleIcon } from "../components/icons/XCircleIcon";

const SpinnerIcon = () => (
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
);
const CheckCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-12 w-12"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const TestCard: React.FC = () => {
  const [cardDetails, setCardDetails] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "valid" | "invalid"
  >("idle");
  const [balance, setBalance] = useState<string | null>(null);

  const isFormValid =
    cardDetails.name &&
    cardDetails.number.length >= 16 &&
    cardDetails.expiry.length === 5 &&
    cardDetails.cvv.length === 3;

  const handleValidate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    setStatus("loading");
    setBalance(null);
    setTimeout(() => {
      const isValid = Math.random() > 0.4; // 60% chance of valid
      if (isValid) {
        setStatus("valid");
        const randomBalance = (Math.random() * 5000).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
        setBalance(randomBalance);
      } else {
        setStatus("invalid");
      }
    }, 1500);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-digits
    if (value.length > 4) {
      value = value.slice(0, 4);
    }
    if (value.length > 2) {
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }
    setCardDetails({ ...cardDetails, expiry: value });
  };

  return (
    <div className="space-y-8 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-dark-text">
        Testar Cartão
      </h1>
      <Card>
        <form className="space-y-6" onSubmit={handleValidate}>
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
            maxLength={19}
            value={cardDetails.number}
            onChange={(e) =>
              setCardDetails({
                ...cardDetails,
                number: e.target.value
                  .replace(/\s/g, "")
                  .replace(/(\d{4})/g, "$1 ")
                  .trim(),
              })
            }
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Validade (MM/AA)"
              placeholder="MM/AA"
              value={cardDetails.expiry}
              onChange={handleExpiryChange}
            />
            <Input
              label="CVV"
              placeholder="123"
              maxLength={3}
              value={cardDetails.cvv}
              onChange={(e) =>
                setCardDetails({
                  ...cardDetails,
                  cvv: e.target.value.replace(/\D/g, ""),
                })
              }
            />
          </div>
          <Button
            type="submit"
            disabled={!isFormValid || status === "loading"}
            className="w-full"
          >
            {status === "loading" ? "Validando..." : "Validar"}
          </Button>
        </form>
      </Card>

      {status !== "idle" && status !== "loading" && (
        <Card>
          <div className="flex flex-col items-center text-center">
            {status === "valid" && (
              <>
                <CheckCircleIcon className="text-green-500" />
                <h3 className="text-xl font-bold mt-4 text-green-500">
                  VALIDO
                </h3>
                {balance && (
                  <p className="text-lg font-semibold mt-2">Saldo: {balance}</p>
                )}
              </>
            )}
            {status === "invalid" && (
              <>
                <XCircleIcon className="h-12 w-12 text-red-500" />
                <h3 className="text-xl font-bold mt-4 text-red-500">NEGADO</h3>
              </>
            )}
          </div>
        </Card>
      )}

      {status === "loading" && (
        <div className="flex justify-center p-8">
          <SpinnerIcon />
        </div>
      )}
    </div>
  );
};

export default TestCard;
