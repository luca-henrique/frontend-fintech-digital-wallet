import {
    MOCK_USER_BALANCE_BRL,
    MOCK_CRYPTO_PRICES,
    MOCK_TRANSACTIONS,
    MOCK_CRYPTO_WALLETS,
    MOCK_PIX_KEYS,
    MOCK_SAVED_CARDS,
} from "../constants/constants";
import {
    Transaction,
    CryptoWallet,
    PixKey,
    CryptoAsset,
    CreditCard,
} from "../@types/types";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const api = {
    fetchBalance: async (): Promise<number> => {
        await delay(500);
        return MOCK_USER_BALANCE_BRL;
    },

    fetchCryptoPrices: async (): Promise<{
        [key in CryptoAsset]: { brl: number };
    }> => {
        await delay(500);
        return {
            [CryptoAsset.BTC]: { brl: MOCK_CRYPTO_PRICES.bitcoin.brl },
            [CryptoAsset.USDT]: { brl: MOCK_CRYPTO_PRICES.tether.brl },
        };
    },

    fetchTransactions: async (): Promise<Transaction[]> => {
        await delay(800);
        return MOCK_TRANSACTIONS;
    },

    fetchWallets: async (): Promise<CryptoWallet[]> => {
        await delay(600);
        return MOCK_CRYPTO_WALLETS;
    },

    fetchPixKeys: async (): Promise<PixKey[]> => {
        await delay(600);
        return MOCK_PIX_KEYS;
    },

    fetchSavedCards: async (): Promise<CreditCard[]> => {
        await delay(400);
        return MOCK_SAVED_CARDS;
    },
};
