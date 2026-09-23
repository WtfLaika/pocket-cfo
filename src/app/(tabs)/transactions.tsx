import { router } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import { useMemo, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ScreenHeader } from "@/components/screen-header";
import { TransactionRow } from "@/components/transaction-row";
import { transactionCategories } from "@/constants/screens";
import { topEdges } from "@/constants/theme";
import { useFinanceStore } from "@/features/finance/store";
import type { TransactionCategory } from "@/features/finance/types";
import { useAppColors } from "@/hooks/use-app-colors";

export default function TransactionsScreen() {
  const colors = useAppColors();
  const transactions = useFinanceStore((state) => state.transactions);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<TransactionCategory | "All">("All");
  const filtered = useMemo(
    () =>
      transactions.filter(
        (transaction) =>
          (category === "All" || transaction.category === category) &&
          transaction.merchant.toLowerCase().includes(search.toLowerCase()),
      ),
    [category, search, transactions],
  );
  const handleAddTransaction = () => router.push("/transaction/new");
  const getCategoryPressHandler = (value: TransactionCategory | "All") => () =>
    setCategory(value);
  const getTransactionPressHandler = (id: string) => () =>
    router.push(`/transaction/${id}`);

  return (
    <SafeAreaView edges={topEdges} className="flex-1 bg-bg">
      <FlashList
        data={filtered}
        keyExtractor={(transaction) => transaction.id}
        renderItem={({ item }) => (
          <TransactionRow
            transaction={item}
            onPress={getTransactionPressHandler(item.id)}
          />
        )}
        ItemSeparatorComponent={() => <View className="h-1" />}
        ListHeaderComponent={
          <View className="gap-5 pb-5">
            <View className="pt-3">
              <ScreenHeader
                eyebrow="Your money trail"
                title="Transactions"
                action={
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Add transaction"
                    onPress={handleAddTransaction}
                    className="h-10 w-10 items-center justify-center rounded-xl bg-accent-500 pressed:opacity-70">
                    <Text className="text-xl font-bold text-navy-950">+</Text>
                  </Pressable>
                }
              />
            </View>
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search merchants"
              placeholderTextColor={colors.placeholder}
              className="rounded-2xl border border-dark-border bg-dark-surface px-4 py-4 text-sm text-dark-primary"
            />
            <FlashList
              horizontal
              data={transactionCategories}
              keyExtractor={(item) => item}
              showsHorizontalScrollIndicator={false}
              contentContainerClassName="gap-2"
              renderItem={({ item }) => (
                <Pressable
                  onPress={getCategoryPressHandler(item)}
                  className={`rounded-full border px-4 py-2.5 ${category === item ? "border-accent-500 bg-accent-500/15" : "border-dark-border bg-dark-surface"}`}>
                  <Text
                    className={`font-mono text-[11px] font-bold ${category === item ? "text-accent-500" : "text-dark-tertiary"}`}>
                    {item}
                  </Text>
                </Pressable>
              )}
            />
          </View>
        }
        ListEmptyComponent={
          <Text className="px-2 py-8 text-center text-sm text-dark-tertiary">
            No matching transactions.
          </Text>
        }
        className="flex-1"
        contentContainerClassName="px-5 pb-8"
        keyboardShouldPersistTaps="handled"
      />
    </SafeAreaView>
  );
}
