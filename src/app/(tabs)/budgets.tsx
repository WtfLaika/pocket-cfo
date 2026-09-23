import { FlashList } from "@shopify/flash-list";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BudgetRow } from "@/components/budget-row";
import { MetricCard } from "@/components/metric-card";
import { ScreenHeader } from "@/components/screen-header";
import { SectionHeader } from "@/components/section-header";
import { topEdges } from "@/constants/theme";
import { formatMoney } from "@/features/finance/format";
import { useFinanceStore } from "@/features/finance/store";
import { useMemo } from "react";

export default function BudgetsScreen() {
  const budgets = useFinanceStore((state) => state.budgets);
  const { spent, limit, metric } = useMemo(() => {
    const totals = budgets.reduce(
      (result, budget) => ({
        spent: result.spent + budget.spent,
        limit: result.limit + budget.limit,
      }),
      { spent: 0, limit: 0 },
    );

    return {
      ...totals,
      metric: Math.round((totals.spent / totals.limit) * 100),
    };
  }, [budgets]);

  return (
    <SafeAreaView edges={topEdges} className="flex-1 bg-bg">
      <FlashList
        data={budgets}
        keyExtractor={(budget) => budget.id}
        renderItem={({ item }) => <BudgetRow budget={item} />}
        ItemSeparatorComponent={() => <View className="h-3" />}
        ListHeaderComponent={
          <View className="gap-6 pb-5">
            <View className="pt-3">
              <ScreenHeader
                eyebrow="September plan"
                title="Budgets"
                action={
                  <View className="h-10 w-10 items-center justify-center rounded-xl bg-accent-500">
                    <Text className="text-xl font-bold text-navy-950">+</Text>
                  </View>
                }
              />
            </View>
            <View className="flex-row gap-3">
              <MetricCard
                label="Total planned"
                value={formatMoney(limit)}
                detail="Across 5 categories"
              />
              <MetricCard
                label="Spent"
                value={formatMoney(spent)}
                detail={`${metric}% of plan`}
                tone="warning"
              />
            </View>
            <SectionHeader title="Category budgets" />
          </View>
        }
        className="flex-1"
        contentContainerClassName="px-5 pb-8"
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
