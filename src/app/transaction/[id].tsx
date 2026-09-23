import { router, useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { DetailRow } from "@/components/detail-row";
import { edges } from "@/constants/theme";
import { formatSignedMoney } from "@/features/finance/format";
import { useFinanceStore } from "@/features/finance/store";

export default function TransactionDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const transaction = useFinanceStore((state) =>
    state.transactions.find((item) => item.id === id),
  );
  const account = useFinanceStore((state) =>
    state.accounts.find((item) => item.id === transaction?.accountId),
  );
  const handleBack = () => router.back();

  if (!transaction) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-bg">
        <Text className="text-sm text-dark-tertiary">
          Transaction not found.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={edges} className="flex-1 bg-bg">
      <ScrollView contentContainerClassName="gap-6 px-5 pb-8">
        <View className="flex-row items-center justify-between pt-3">
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Go back"
            onPress={handleBack}
            className="h-10 w-10 items-center justify-center rounded-xl border border-dark-border bg-dark-surface">
            <Text className="text-xl text-dark-primary">‹</Text>
          </Pressable>
          <Text className="font-mono text-xs font-bold uppercase tracking-[1.5px] text-dark-tertiary">
            Transaction
          </Text>
          <View className="w-10" />
        </View>
        <View className="items-center rounded-3xl border border-dark-border bg-dark-surface px-5 py-8">
          <View className="h-16 w-16 items-center justify-center rounded-2xl bg-accent-500/15">
            <Text className="font-mono text-sm font-bold text-accent-500">
              {transaction.category.slice(0, 2).toUpperCase()}
            </Text>
          </View>
          <Text className="mt-5 text-2xl font-semibold text-dark-primary">
            {transaction.merchant}
          </Text>
          <Text
            className={`mt-3 font-mono text-3xl font-bold ${transaction.amount > 0 ? "text-accent-500" : "text-dark-primary"}`}>
            {formatSignedMoney(transaction.amount)}
          </Text>
          <Text className="mt-2 text-sm text-dark-tertiary">
            {transaction.date} at {transaction.time}
          </Text>
        </View>
        <View className="overflow-hidden rounded-2xl border border-dark-border bg-dark-surface">
          <DetailRow label="Category" value={transaction.category} />
          <DetailRow
            label="Account"
            value={account?.name ?? "Unknown account"}
          />
          <DetailRow label="Status" value="Completed" />
          <DetailRow label="Note" value={transaction.note || "No note added"} />
        </View>
        <View className="flex-row gap-3">
          <Pressable className="flex-1 items-center justify-center rounded-2xl border border-dark-border bg-dark-surface py-4 pressed:bg-navy-800">
            <Text className="font-mono text-xs font-bold text-dark-primary">
              EDIT
            </Text>
          </Pressable>
          <Pressable className="flex-1 items-center justify-center rounded-2xl bg-danger-500/15 py-4 pressed:opacity-70">
            <Text className="font-mono text-xs font-bold text-danger-500">
              DELETE
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
