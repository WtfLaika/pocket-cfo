import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { PrimaryButton } from "@/components/primary-button";
import { newTransactionCategories } from "@/constants/screens";
import { edges } from "@/constants/theme";
import { useFinanceStore } from "@/features/finance/store";
import type { TransactionCategory } from "@/features/finance/types";
import { useAppColors } from "@/hooks/use-app-colors";

export default function NewTransactionScreen() {
  const colors = useAppColors();
  const addTransaction = useFinanceStore((state) => state.addTransaction);
  const [merchant, setMerchant] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<TransactionCategory>("Groceries");
  const canSave = merchant.trim().length > 0 && Number(amount) > 0;

  const save = () => {
    if (!canSave) return;
    const now = new Date();
    addTransaction({
      id: `local-${Date.now()}`,
      merchant: merchant.trim(),
      amount: -Number(amount),
      category,
      date: "Today",
      time: now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
      accountId: "checking",
    });
    router.replace("/(tabs)/transactions");
  };
  const handleBack = () => router.back();
  const getCategoryPressHandler = (value: TransactionCategory) => () =>
    setCategory(value);

  return (
    <SafeAreaView edges={edges} className="flex-1 bg-bg">
      <KeyboardAvoidingView
        className="flex-1 px-5"
        behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View className="flex-1 justify-center gap-3 pb-4">
          <View className="flex-row items-center justify-between pt-3">
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Go back"
              onPress={handleBack}
              className="h-10 w-10 items-center justify-center rounded-xl border border-dark-border bg-dark-surface">
              <Text className="text-xl text-dark-primary">‹</Text>
            </Pressable>
            <Text className="font-mono text-xs font-bold uppercase tracking-[1.5px] text-dark-tertiary">
              New transaction
            </Text>
            <View className="w-10" />
          </View>
          <View>
            <Text className="text-2xl font-semibold text-dark-primary">
              Add an expense
            </Text>
          </View>
          <View className="gap-2">
            <Text className="font-mono text-[11px] font-bold uppercase tracking-[1.2px] text-dark-tertiary">
              Merchant
            </Text>
            <TextInput
              value={merchant}
              onChangeText={setMerchant}
              placeholder="e.g. Corner Cafe"
              placeholderTextColor={colors.placeholder}
              className="rounded-2xl border border-dark-border bg-dark-surface px-4 py-2 text-base text-dark-primary"
            />
          </View>
          <View className="gap-2">
            <Text className="font-mono text-[11px] font-bold uppercase tracking-[1.2px] text-dark-tertiary">
              Amount
            </Text>
            <TextInput
              value={amount}
              onChangeText={setAmount}
              keyboardType="decimal-pad"
              placeholder="0.00"
              placeholderTextColor={colors.placeholder}
              className="rounded-2xl border border-dark-border bg-dark-surface px-4 py-2 font-mono text-base text-dark-primary"
            />
          </View>
          <View className="gap-3">
            <Text className="font-mono text-[11px] font-bold uppercase tracking-[1.2px] text-dark-tertiary">
              Category
            </Text>
            <FlashList
              horizontal
              data={newTransactionCategories}
              keyExtractor={(item) => item}
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
              contentContainerClassName="gap-2"
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <PrimaryButton
            title="SAVE TRANSACTION"
            onPress={save}
            disabled={!canSave}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
