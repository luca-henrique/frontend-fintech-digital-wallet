import React, { createContext, useContext, useState, useEffect } from "react";
import {
  Transaction,
  CryptoWallet,
  PixKey,
  CryptoAsset,
  TransactionStatus,
} from "../@types/types";
import {
  useBalance,
  useTransactions,
  useWallets,
  usePixKeys,
  useCryptoPrices,
} from "../hooks/useQueries";
import { MOCK_USER_BALANCE_BRL } from "../constants/constants";

interface WalletContextType {
  userBalance: number;
  transactions: Transaction[];
  wallets: CryptoWallet[];
  pixKeys: PixKey[];
  cryptoPrices: { [key in CryptoAsset]: { brl: number } } | null;
  addTransaction: (transaction: Omit<Transaction, "id" | "date">) => void;
  addWallet: (wallet: Partial<CryptoWallet>) => void;
  updateWallet: (updatedWallet: CryptoWallet) => void;
  deleteWallet: (id: string) => void;
  addPixKey: (key: Partial<PixKey>) => void;
  updatePixKey: (updatedKey: PixKey) => void;
  deletePixKey: (id: string) => void;
  setDefaultPixKey: (id: string) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data: balanceData } = useBalance();
  const { data: transactionsData } = useTransactions();
  const { data: walletsData } = useWallets();
  const { data: pixKeysData } = usePixKeys();
  const { data: cryptoPricesData } = useCryptoPrices();

  // Local state for optimistic updates / temporary state until we have real mutations
  const [localTransactions, setLocalTransactions] = useState<Transaction[]>([]);
  const [localWallets, setLocalWallets] = useState<CryptoWallet[]>([]);
  const [localPixKeys, setLocalPixKeys] = useState<PixKey[]>([]);

  // Combined state
  const transactions = [
    ...(localTransactions || []),
    ...(transactionsData || []),
  ];
  const wallets = [...(localWallets || []), ...(walletsData || [])];
  const pixKeys = [...(localPixKeys || []), ...(pixKeysData || [])];
  const cryptoPrices = cryptoPricesData || null;
  const userBalance = balanceData || MOCK_USER_BALANCE_BRL;

  // TODO: Replace these with useMutation hooks in the next phase
  const addTransaction = (transaction: Omit<Transaction, "id" | "date">) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: `tx${Date.now()}`,
      date: new Date().toLocaleString("pt-BR"),
    };
    setLocalTransactions((prev) => [newTransaction, ...prev]);
  };

  const addWallet = (wallet: Partial<CryptoWallet>) => {
    const newWallet: CryptoWallet = {
      ...(wallet as Omit<CryptoWallet, "id">),
      id: `cw${Date.now()}`,
    };
    setLocalWallets((prev) => [...prev, newWallet]);
  };

  const updateWallet = (updatedWallet: CryptoWallet) => {
    // In a real app this would be a mutation.
    // For now we can't easily update the query data without cache manipulation,
    // so we'll just mock it by updating local state if it exists there,
    // or we'd need a more complex merge strategy.
    // For simplicity in this mock phase, we'll just log it.
    console.log("Mock Update Wallet:", updatedWallet);
  };

  const deleteWallet = (id: string) => {
    console.log("Mock Delete Wallet:", id);
  };

  const addPixKey = (key: Partial<PixKey>) => {
    const newKey: PixKey = {
      ...(key as Omit<PixKey, "id" | "isDefault">),
      id: `pk${Date.now()}`,
      isDefault: pixKeys.length === 0,
    };
    setLocalPixKeys((prev) => [...prev, newKey]);
  };

  const updatePixKey = (updatedKey: PixKey) => {
    console.log("Mock Update Pix Key:", updatedKey);
  };

  const deletePixKey = (id: string) => {
    console.log("Mock Delete Pix Key:", id);
  };

  const setDefaultPixKey = (id: string) => {
    console.log("Mock Set Default Pix Key:", id);
  };

  return (
    <WalletContext.Provider
      value={{
        userBalance,
        transactions,
        wallets,
        pixKeys,
        cryptoPrices,
        addTransaction,
        addWallet,
        updateWallet,
        deleteWallet,
        addPixKey,
        updatePixKey,
        deletePixKey,
        setDefaultPixKey,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
