import * as SecureStore from "expo-secure-store";
import { create } from "zustand";

import { accounts, budgets, transactions } from "./data";
import type { Budget, CurrencyCode, Transaction } from "./types";

type FinanceState = {
  hydrated: boolean;
  onboardingComplete: boolean;
  securityEnabled: boolean;
  currency: CurrencyCode;
  accounts: typeof accounts;
  transactions: Transaction[];
  budgets: Budget[];
  hydrate: () => Promise<void>;
  completeOnboarding: (currency: CurrencyCode) => Promise<void>;
  resetOnboarding: () => Promise<void>;
  toggleSecurity: (enabled: boolean) => void;
  addTransaction: (transaction: Transaction) => void;
};

const ONBOARDING_KEY = "pocket-cfo:onboarding-complete";

export const useFinanceStore = create<FinanceState>((set) => ({
  hydrated: false,
  onboardingComplete: false,
  securityEnabled: false,
  currency: "USD",
  accounts,
  transactions,
  budgets,
  hydrate: async () => {
    try {
      const onboardingComplete = await SecureStore.getItemAsync(ONBOARDING_KEY);
      set({
        hydrated: true,
        onboardingComplete: onboardingComplete === "true",
      });
    } catch {
      set({ hydrated: true });
    }
  },
  completeOnboarding: async (currency) => {
    set({ onboardingComplete: true, currency });
    try {
      await SecureStore.setItemAsync(ONBOARDING_KEY, "true");
    } catch {}
  },
  resetOnboarding: async () => {
    set({ onboardingComplete: false });
    try {
      await SecureStore.deleteItemAsync(ONBOARDING_KEY);
    } catch {}
  },
  toggleSecurity: (securityEnabled) => set({ securityEnabled }),
  addTransaction: (transaction) =>
    set((state) => ({ transactions: [transaction, ...state.transactions] })),
}));
