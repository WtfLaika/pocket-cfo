import { Pressable, Text, View } from "react-native";

import { financeIconColors } from "@/constants/components";
import { formatSignedMoney } from "@/features/finance/format";
import type { Transaction } from "@/features/finance/types";

interface TransactionRowProps {
  transaction: Transaction;
  onPress?: () => void;
}

export function TransactionRow({
  transaction,
  onPress,
}: TransactionRowProps) {
  const content = (
    <View className="flex-row items-center gap-3">
      <View
        className={`h-10 w-10 items-center justify-center rounded-xl ${financeIconColors[transaction.category] ?? "bg-navy-800"}`}>
        <Text className="font-mono text-xs font-bold text-dark-primary">
          {transaction.category.slice(0, 2).toUpperCase()}
        </Text>
      </View>
      <View className="flex-1">
        <Text className="text-sm font-semibold text-dark-primary">
          {transaction.merchant}
        </Text>
        <Text className="mt-1 text-xs text-dark-tertiary">
          {transaction.category} · {transaction.date}
        </Text>
      </View>
      <Text
        className={`font-mono text-sm font-bold ${transaction.amount > 0 ? "text-accent-500" : "text-dark-primary"}`}>
        {formatSignedMoney(transaction.amount)}
      </Text>
    </View>
  );

  return onPress ? (
    <Pressable
      onPress={onPress}
      className="rounded-xl px-1 py-3 pressed:bg-navy-800">
      {content}
    </Pressable>
  ) : (
    <View className="px-1 py-3">{content}</View>
  );
}
