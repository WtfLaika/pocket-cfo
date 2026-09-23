import { router } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { edges } from "@/constants/theme";
import { recurringPayments } from "@/features/finance/data";
import { formatMoney } from "@/features/finance/format";

export default function RecurringScreen() {
  const handleBack = () => router.back();

  return (
    <SafeAreaView edges={edges} className="flex-1 bg-bg">
      <FlashList
        data={recurringPayments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="rounded-2xl border border-dark-border bg-dark-surface p-4">
            <View className="flex-row items-center">
              <View className="flex-1">
                <Text className="text-sm font-semibold text-dark-primary">
                  {item.merchant}
                </Text>
                <Text className="mt-1 text-xs text-dark-tertiary">
                  {item.cadence} · next {item.next}
                </Text>
              </View>
              <Text className="font-mono text-sm font-bold text-dark-primary">
                {formatMoney(item.amount)}
              </Text>
            </View>
            {item.priceChange ? (
              <View className="mt-4 rounded-xl bg-warning-500/10 px-3 py-2">
                <Text className="font-mono text-[11px] font-bold text-warning-500">
                  PRICE UP {formatMoney(item.priceChange)} THIS CYCLE
                </Text>
              </View>
            ) : null}
          </View>
        )}
        ItemSeparatorComponent={() => <View className="h-3" />}
        ListHeaderComponent={
          <View className="gap-6 pb-5">
            <View className="flex-row items-center gap-3 pt-3">
              <Text onPress={handleBack} className="text-3xl text-dark-primary">
                ‹
              </Text>
              <Text className="text-2xl font-semibold text-dark-primary">
                Recurring payments
              </Text>
            </View>
            <Text className="text-sm leading-5 text-dark-tertiary">
              Keep an eye on what repeats before it quietly adds up.
            </Text>
          </View>
        }
        className="flex-1"
        contentContainerClassName="px-5 pb-8"
      />
    </SafeAreaView>
  );
}
