import type { TransactionCategory } from "@/features/finance/types";

export const financeIconColors: Record<TransactionCategory, string> = {
  Groceries: "bg-category-food/15",
  Subscriptions: "bg-category-shopping/15",
  Income: "bg-category-income/15",
  Dining: "bg-category-food/15",
  Transport: "bg-category-transport/15",
  Utilities: "bg-category-utilities/15",
  Software: "bg-category-entertainment/15",
  Health: "bg-category-health/15",
};

export type ThemeColor =
  | "text"
  | "background"
  | "backgroundElement"
  | "backgroundSelected"
  | "textSecondary"
  | "placeholder"
  | "accent";

export const themeColorClasses: Record<ThemeColor, string> = {
  text: "text-theme-primary",
  background: "bg-theme-background",
  backgroundElement: "bg-theme-elevated",
  backgroundSelected: "bg-theme-selected",
  textSecondary: "text-theme-secondary",
  placeholder: "text-theme-placeholder",
  accent: "text-theme-accent",
};

export const themedTextTypeClasses = {
  default: "text-base leading-6 font-medium",
  title: "text-[48px] leading-[52px] font-semibold",
  small: "text-sm leading-5 font-medium",
  smallBold: "text-sm leading-5 font-bold",
  subtitle: "text-[32px] leading-[44px] font-semibold",
  link: "text-sm leading-[30px]",
  linkPrimary: "text-sm leading-[30px] text-brand-700 dark:text-brand-300",
  code: "font-mono text-xs font-medium android:font-bold",
} as const;
