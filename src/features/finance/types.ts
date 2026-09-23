export type CurrencyCode = "USD" | "EUR" | "GBP" | "JPY";

export type TransactionCategory =
  | "Groceries"
  | "Subscriptions"
  | "Income"
  | "Dining"
  | "Transport"
  | "Utilities"
  | "Software"
  | "Health";

export type AccountType = "Checking" | "Savings" | "Credit" | "Investment";
export type AccountColor = "accent" | "info" | "warning" | "brand";

export type Account = {
  id: string;
  name: string;
  bank: string;
  type: AccountType;
  balance: number;
  lastSynced: string;
  color: AccountColor;
};

export type Transaction = {
  id: string;
  merchant: string;
  category: TransactionCategory;
  amount: number;
  date: string;
  time: string;
  accountId: string;
  note?: string;
  recurring?: boolean;
};

export type Budget = {
  id: string;
  category: TransactionCategory;
  limit: number;
  spent: number;
};

export type RecurringPayment = {
  id: string;
  merchant: string;
  amount: number;
  cadence: string;
  next: string;
  category: TransactionCategory;
  priceChange?: number;
};
