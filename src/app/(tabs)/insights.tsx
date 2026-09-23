import { useMemo } from "react";
import { FlashList } from "@shopify/flash-list";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { MetricCard } from "@/components/metric-card";
import { ScreenHeader } from "@/components/screen-header";
import { SectionHeader } from "@/components/section-header";
import { spendingTrendHeights } from "@/constants/screens";
import { topEdges } from "@/constants/theme";
import { formatMoney } from "@/features/finance/format";
import { useFinanceStore } from "@/features/finance/store";

export default function InsightsScreen() {
  const transactions = useFinanceStore((state) => state.transactions);
  const categories = useMemo(
    () =>
      Array.from(
        new Set(transactions.map((transaction) => transaction.category)),
      ).slice(0, 5),
    [transactions],
  );
  return (
    <SafeAreaView edges={topEdges} className="flex-1 bg-bg">
      <FlashList
        data={categories}
        keyExtractor={(category) => category}
        renderItem={({ item: category, index }) => (
          <View className="flex-row items-center gap-3 rounded-2xl border border-dark-border bg-dark-surface p-4">
            <View
              className={`h-9 w-9 items-center justify-center rounded-xl ${index % 2 === 0 ? "bg-accent-500/15" : "bg-brand-500/15"}`}>
              <Text className="font-mono text-[10px] font-bold text-dark-primary">
                {category.slice(0, 2).toUpperCase()}
              </Text>
            </View>
            <Text className="flex-1 text-sm font-semibold text-dark-primary">
              {category}
            </Text>
            <Text className="font-mono text-sm font-bold text-dark-primary">
              {formatMoney(291.23 - index * 37)}
            </Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View className="h-3" />}
        ListHeaderComponent={
          <View className="gap-6 pb-5">
            <View className="pt-3">
              <ScreenHeader
                eyebrow="Patterns, not pressure"
                title="Insights"
                action={
                  <View className="rounded-xl border border-dark-border bg-dark-surface px-3 py-2">
                    <Text className="font-mono text-[11px] font-bold text-dark-tertiary">
                      30 DAYS
                    </Text>
                  </View>
                }
              />
            </View>
            <View className="flex-row gap-3">
              <MetricCard
                label="Income"
                value={formatMoney(4200)}
                detail="↑ 8.2% vs Aug"
                tone="positive"
              />
              <MetricCard
                label="Outflow"
                value={formatMoney(2784.32)}
                detail="↓ 4.1% vs Aug"
              />
            </View>
            <View className="rounded-3xl border border-dark-border bg-dark-surface p-5">
              <SectionHeader title="Spending trend" />
              <FlashList
                horizontal
                data={spendingTrendHeights}
                keyExtractor={(_, index) => `trend-${index}`}
                renderItem={({ item: height, index }) => (
                  <View className="h-36 w-5 items-center justify-end">
                    <View
                      className={`w-full rounded-t-lg ${index === 7 ? "bg-accent-500" : "bg-brand-500/45"}`}
                      style={{ height }}
                    />
                  </View>
                )}
                className="h-36"
                contentContainerClassName="flex-1 items-end justify-between gap-2 pt-5"
                showsHorizontalScrollIndicator={false}
              />
              <View className="mt-3 flex-row justify-between">
                <Text className="font-mono text-[10px] text-dark-tertiary">
                  AUG 09
                </Text>
                <Text className="font-mono text-[10px] text-dark-tertiary">
                  SEP 07
                </Text>
              </View>
            </View>
            <SectionHeader title="Top categories" />
          </View>
        }
        className="flex-1"
        contentContainerClassName="px-5 pb-8"
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
