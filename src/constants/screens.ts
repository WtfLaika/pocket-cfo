import type {
  CurrencyCode,
  TransactionCategory,
} from "@/features/finance/types";

export const tabBarLabelStyle = {
  fontFamily: "monospace",
  fontSize: 10,
  marginBottom: 7,
};

export const spendingTrendHeights = [
  42, 58, 46, 68, 54, 77, 63, 86, 71, 64, 78, 52,
];

export const transactionCategories: (TransactionCategory | "All")[] = [
  "All",
  "Groceries",
  "Dining",
  "Subscriptions",
  "Income",
  "Transport",
];

export const newTransactionCategories: TransactionCategory[] = [
  "Groceries",
  "Dining",
  "Transport",
  "Subscriptions",
  "Utilities",
  "Income",
];

export const onboardingCurrencies: {
  code: CurrencyCode;
  name: string;
  symbol: string;
}[] = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
];

export const onboardingSteps = [0, 1, 2, 3];

export const syncEvents = [
  {
    label: "Chase Total Checking",
    detail: "3 new transactions",
    state: "SYNCED",
  },
  { label: "Ally Online Savings", detail: "Balance updated", state: "SYNCED" },
  { label: "Amex Gold Card", detail: "Awaiting sync", state: "PENDING" },
  { label: "Fidelity Brokerage", detail: "Connection error", state: "FAILED" },
];
