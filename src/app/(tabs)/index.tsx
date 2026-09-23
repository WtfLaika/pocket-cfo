import { useMemo } from "react";
import { FlashList } from "@shopify/flash-list";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AccountRow } from "@/components/account-row";
import { BudgetRow } from "@/components/budget-row";
import { MetricCard } from "@/components/metric-card";
import { ScreenHeader } from "@/components/screen-header";
import { SectionHeader } from "@/components/section-header";
import { TransactionRow } from "@/components/transaction-row";
import { topEdges } from "@/constants/theme";
import { formatMoney } from "@/features/finance/format";
import { useFinanceStore } from "@/features/finance/store";

export default function DashboardScreen() {
  const accounts = useFinanceStore((state) => state.accounts);
  const transactions = useFinanceStore((state) => state.transactions);
  const budgets = useFinanceStore((state) => state.budgets);
  const totalBalance = useMemo(
    () => accounts.reduce((sum, account) => sum + account.balance, 0),
    [accounts],
  );
  const monthlySpend = useMemo(
    () =>
      Math.abs(
        transactions
          .filter((transaction) => transaction.amount < 0)
          .reduce((sum, transaction) => sum + transaction.amount, 0),
      ),
    [transactions],
  );
  const { budgetUsed, budgetLimit } = useMemo(
    () => ({
      budgetUsed: budgets.reduce((sum, budget) => sum + budget.spent, 0),
      budgetLimit: budgets.reduce((sum, budget) => sum + budget.limit, 0),
    }),
    [budgets],
  );
  const dashboardItems = useMemo(
    () => [
      ...accounts.slice(0, 3).map((account) => ({
        type: "account" as const,
        key: `account-${account.id}`,
        account,
      })),
      { type: "budget" as const, key: "budget" },
      { type: "activity-heading" as const, key: "activity-heading" },
      ...transactions.slice(0, 4).map((transaction) => ({
        type: "transaction" as const,
        key: `transaction-${transaction.id}`,
        transaction,
      })),
    ],
    [accounts, transactions],
  );

  return (
    <SafeAreaView edges={topEdges} className="flex-1 bg-bg">
      <FlashList
        data={dashboardItems}
        keyExtractor={(item) => item.key}
        getItemType={(item) => item.type}
        renderItem={({ item, index }) => {
          if (item.type === "account") {
            return <AccountRow account={item.account} />;
          }
          if (item.type === "budget") {
            return (
              <View>
                <SectionHeader title="Budget pulse" action="View budgets" />
                <BudgetRow budget={budgets[0]} />
                <Text className="mt-3 text-xs leading-5 text-dark-tertiary">
                  You are on track this month. Dining is approaching its warning
                  threshold.
                </Text>
              </View>
            );
          }
          if (item.type === "activity-heading") {
            return (
              <SectionHeader
                title="Recent activity"
                action="All transactions"
              />
            );
          }
          const firstActivityRow = dashboardItems[index - 1]?.type === "activity-heading";
          const lastActivityRow = index === dashboardItems.length - 1;
          return (
            <View
              className={`border-x border-dark-border bg-dark-surface px-3 ${firstActivityRow ? "rounded-t-2xl border-t" : ""} ${lastActivityRow ? "rounded-b-2xl border-b" : ""}`}>
              <TransactionRow transaction={item.transaction} />
            </View>
          );
        }}
        ItemSeparatorComponent={({ leadingItem, trailingItem }) =>
          leadingItem.type === "account" && trailingItem.type === "account" ? (
            <View className="h-3" />
          ) : leadingItem.type === "activity-heading" ||
            (leadingItem.type === "transaction" &&
              trailingItem.type === "transaction") ? null : (
            <View className="h-7" />
          )
        }
        ListHeaderComponent={
          <View className="gap-7 pb-7">
            <View className="pt-3">
              <ScreenHeader
                eyebrow="Monday, September 7"
                title="Good morning, Alex"
                action={
                  <View className="h-10 w-10 items-center justify-center rounded-xl border border-dark-border bg-dark-surface">
                    <Text className="font-mono text-xs font-bold text-accent-500">
                      AC
                    </Text>
                  </View>
                }
              />
            </View>
            <View className="rounded-3xl border border-accent-500/25 bg-accent-500/10 p-5">
              <Text className="font-mono text-[11px] font-bold uppercase tracking-[1.5px] text-accent-500">
                Total net worth
              </Text>
              <Text className="mt-3 font-mono text-4xl font-bold tracking-tight text-dark-primary">
                {formatMoney(totalBalance)}
              </Text>
              <View className="mt-4 flex-row items-center justify-between">
                <Text className="text-xs text-dark-tertiary">
                  Across {accounts.length} accounts
                </Text>
                <Text className="font-mono text-xs font-bold text-accent-500">
                  +4.8% this month
                </Text>
              </View>
            </View>
            <View className="flex-row gap-3">
              <MetricCard
                label="Spent this month"
                value={formatMoney(monthlySpend)}
                detail="↓ 12% vs Aug"
                tone="positive"
              />
              <MetricCard
                label="Budget remaining"
                value={formatMoney(budgetLimit - budgetUsed)}
                detail={`${Math.round((budgetUsed / budgetLimit) * 100)}% used`}
                tone="warning"
              />
            </View>
            <SectionHeader title="Accounts" action="See all" />
          </View>
        }
        className="flex-1"
        contentContainerClassName="gap-0 px-5 pb-8"
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
