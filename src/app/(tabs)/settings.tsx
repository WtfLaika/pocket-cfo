import { router } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ScreenHeader } from "@/components/screen-header";
import { SectionHeader } from "@/components/section-header";
import { topEdges } from "@/constants/theme";
import { useFinanceStore } from "@/features/finance/store";

export default function SettingsScreen() {
  const securityEnabled = useFinanceStore((state) => state.securityEnabled);
  const toggleSecurity = useFinanceStore((state) => state.toggleSecurity);
  const resetOnboarding = useFinanceStore((state) => state.resetOnboarding);
  const handleAccountsPress = () => router.push("/accounts");
  const handleRecurringPress = () => router.push("/recurring");
  const handleExportPress = () => router.push("/export");
  const handleSyncPress = () => router.push("/sync");
  const handleSecurityToggle = () => toggleSecurity(!securityEnabled);
  const handleLockPress = () => router.push("/lock");
  const handleResetOnboarding = async () => {
    await resetOnboarding();
    router.replace("/onboarding");
  };
  const rows = [
    {
      label: "Accounts",
      detail: "4 accounts connected",
      onPress: handleAccountsPress,
    },
    {
      label: "Recurring payments",
      detail: "9 scheduled payments",
      onPress: handleRecurringPress,
    },
    {
      label: "Export data",
      detail: "CSV or printable report",
      onPress: handleExportPress,
    },
    {
      label: "Sync feed",
      detail: "Last synced 2 min ago",
      onPress: handleSyncPress,
    },
  ];

  return (
    <SafeAreaView edges={topEdges} className="flex-1 bg-bg">
      <FlashList
        data={rows}
        keyExtractor={(row) => row.label}
        renderItem={({ item: row, index }) => (
          <Pressable
            onPress={row.onPress}
            className={`flex-row items-center border-x border-dark-border bg-dark-surface px-4 py-4 pressed:bg-navy-800 ${index === 0 ? "rounded-t-2xl border-t" : ""} ${index === rows.length - 1 ? "rounded-b-2xl border-b" : "border-b"}`}>
            <View className="flex-1">
              <Text className="text-sm font-semibold text-dark-primary">
                {row.label}
              </Text>
              <Text className="mt-1 text-xs text-dark-tertiary">
                {row.detail}
              </Text>
            </View>
            <Text className="text-xl text-dark-tertiary">›</Text>
          </Pressable>
        )}
        ListHeaderComponent={
          <View className="gap-7 pb-7">
            <View className="pt-3">
              <ScreenHeader
                eyebrow="Your workspace"
                title="Settings"
                action={
                  <View className="h-10 w-10 items-center justify-center rounded-xl border border-dark-border bg-dark-surface">
                    <Text className="font-mono text-xs font-bold text-accent-500">
                      AC
                    </Text>
                  </View>
                }
              />
            </View>
            <SectionHeader title="Workspace" />
          </View>
        }
        ListFooterComponent={
          <View className="gap-7 pt-7">
            <View>
              <SectionHeader title="Security" />
              <View className="overflow-hidden rounded-2xl border border-dark-border bg-dark-surface">
                <Pressable
                  onPress={handleSecurityToggle}
                  className="flex-row items-center px-4 py-4 pressed:bg-navy-800">
                  <View className="flex-1">
                    <Text className="text-sm font-semibold text-dark-primary">
                      Biometric unlock
                    </Text>
                    <Text className="mt-1 text-xs text-dark-tertiary">
                      Protect Pocket CFO on this device
                    </Text>
                  </View>
                  <View
                    className={`h-7 w-12 justify-center rounded-full px-1 ${securityEnabled ? "items-end bg-accent-500" : "items-start bg-navy-700"}`}>
                    <View className="h-5 w-5 rounded-full bg-theme-surface" />
                  </View>
                </Pressable>
              </View>
            </View>
            <Pressable
              accessibilityRole="button"
              onPress={handleLockPress}
              className="min-h-[48px] items-center justify-center rounded-2xl border border-dark-border bg-dark-surface pressed:bg-navy-800">
              <Text className="font-mono text-xs font-bold uppercase tracking-wide text-dark-primary">
                Lock Pocket CFO
              </Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              onPress={handleResetOnboarding}
              className="min-h-[48px] items-center justify-center rounded-2xl border border-danger-500/30 bg-danger-500/10 pressed:opacity-70">
              <Text className="font-mono text-xs font-bold uppercase tracking-wide text-danger-500">
                Reset demo onboarding
              </Text>
            </Pressable>
          </View>
        }
        className="flex-1"
        contentContainerClassName="px-5 pb-8"
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
