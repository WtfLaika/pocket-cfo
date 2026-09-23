import { router } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AccountRow } from "@/components/account-row";
import { edges } from "@/constants/theme";
import { useFinanceStore } from "@/features/finance/store";

export default function AccountsScreen() {
  const accounts = useFinanceStore((state) => state.accounts);

  const goBack = () => router.back();
  return (
    <SafeAreaView edges={edges} className="flex-1 bg-bg">
      <FlashList
        data={accounts}
        keyExtractor={(account) => account.id}
        renderItem={({ item }) => <AccountRow account={item} />}
        ItemSeparatorComponent={() => <View className="h-3" />}
        ListHeaderComponent={
          <View className="gap-6 pb-5">
            <View className="flex-row items-center gap-3 pt-3">
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Go back"
                onPress={goBack}
                className="h-10 w-10 items-center justify-center rounded-xl border border-dark-border bg-dark-surface">
                <Text className="text-xl text-dark-primary">‹</Text>
              </Pressable>
              <Text className="text-2xl font-semibold text-dark-primary">
                Accounts
              </Text>
            </View>
            <Text className="text-sm leading-5 text-dark-tertiary">
              Every account in one quiet, local view.
            </Text>
          </View>
        }
        className="flex-1"
        contentContainerClassName="px-5 pb-8"
      />
    </SafeAreaView>
  );
}
