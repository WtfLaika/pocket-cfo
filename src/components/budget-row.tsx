import { memo, useMemo } from "react";
import { Text, View } from "react-native";

import { ProgressBar } from "@/components/progress-bar";
import { formatMoney } from "@/features/finance/format";
import type { Budget } from "@/features/finance/types";

interface BudgetRowProps {
  budget: Budget;
}

export const BudgetRow = memo(function BudgetRow({
  budget,
}: BudgetRowProps) {
  const progress = useMemo(
    () => budget.spent / budget.limit,
    [budget.spent, budget.limit],
  );
  return (
    <View className="rounded-2xl border border-dark-border bg-dark-surface p-4">
      <View className="mb-3 flex-row items-center justify-between">
        <View className="flex-row items-center gap-3">
          <View className="h-9 w-9 items-center justify-center rounded-xl bg-navy-800">
            <Text className="font-mono text-[10px] font-bold text-dark-secondary">
              {budget.category.slice(0, 2).toUpperCase()}
            </Text>
          </View>
          <View>
            <Text className="text-sm font-semibold text-dark-primary">
              {budget.category}
            </Text>
            <Text className="mt-1 text-xs text-dark-tertiary">
              {formatMoney(budget.spent)} of {formatMoney(budget.limit)}
            </Text>
          </View>
        </View>
        <Text
          className={`font-mono text-xs font-bold ${progress >= 0.9 ? "text-danger-500" : "text-dark-tertiary"}`}>
          {Math.round(progress * 100)}%
        </Text>
      </View>
      <ProgressBar
        value={progress}
        color={progress >= 0.9 ? "bg-danger-500" : "bg-accent-500"}
      />
    </View>
  );
});
