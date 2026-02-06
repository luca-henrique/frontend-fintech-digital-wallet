import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../services/api";
import { Transaction } from "../@types/types";

export function useBalance() {
    return useQuery({
        queryKey: ["balance"],
        queryFn: api.fetchBalance,
    });
}

export function useCryptoPrices() {
    return useQuery({
        queryKey: ["cryptoPrices"],
        queryFn: api.fetchCryptoPrices,
        refetchInterval: 10000, // Refresh every 10s
    });
}

export function useTransactions() {
    return useQuery({
        queryKey: ["transactions"],
        queryFn: api.fetchTransactions,
    });
}

export function useWallets() {
    return useQuery({
        queryKey: ["wallets"],
        queryFn: api.fetchWallets,
    });
}

export function usePixKeys() {
    return useQuery({
        queryKey: ["pixKeys"],
        queryFn: api.fetchPixKeys,
    });
}

// Example mutation hooks (placeholders as we don't have a real backend to update)
// In a real app, these would call api.updateWallet, api.deleteWallet, etc.

export function useAddTransaction() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (newTransaction: Transaction) => {
            // transform sync update to async mock
            return newTransaction;
        },
        onSuccess: (newTransaction) => {
            queryClient.setQueryData(["transactions"], (old: Transaction[] | undefined) => {
                return old ? [newTransaction, ...old] : [newTransaction];
            });
            // Also update balance optimistically or refetch
            queryClient.invalidateQueries({ queryKey: ["balance"] });
        },
    });
}
