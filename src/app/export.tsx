import { exportTypes } from "@/constants/exports";
import { edges } from "@/constants/theme";
import { router } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ExportScreen() {
  const [format, setFormat] = useState("CSV");
  const [exported, setExported] = useState(false);
  const goBack = () => router.back();
  const getFormatPressHandler = (value: string) => () => setFormat(value);
  const handleExport = () => setExported(true);

  const exportButtonText = exported
    ? `${format} READY`
    : `CREATE ${format} EXPORT`;

  return (
    <SafeAreaView edges={edges} className="flex-1 bg-bg">
      <FlashList
        data={exportTypes}
        keyExtractor={(item) => item}
        numColumns={3}
        renderItem={({ item }) => (
          <Pressable
            onPress={getFormatPressHandler(item)}
            className={`flex-1 items-center rounded-2xl border py-4 ${format === item ? "border-accent-500 bg-accent-500/10" : "border-dark-border bg-dark-surface"}`}>
            <Text
              className={`font-mono text-xs font-bold ${format === item ? "text-accent-500" : "text-dark-tertiary"}`}>
              {item}
            </Text>
          </Pressable>
        )}
        ListHeaderComponent={
          <View className="gap-6 pb-6">
            <View className="flex-row items-center gap-3 pt-3">
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Go back"
                onPress={goBack}
                className="h-10 w-10 items-center justify-center rounded-xl border border-dark-border bg-dark-surface">
                <Text className="text-xl text-dark-primary">‹</Text>
              </Pressable>
              <Text className="text-2xl font-semibold text-dark-primary">
                Export data
              </Text>
            </View>
            <Text className="text-sm leading-5 text-dark-tertiary">
              Create a portable snapshot of your Pocket CFO data.
            </Text>
            <Text className="font-mono text-[11px] font-bold uppercase tracking-[1.2px] text-dark-tertiary">
              Format
            </Text>
          </View>
        }
        ListFooterComponent={
          <View className="gap-6 pt-6">
            <View className="rounded-2xl border border-dark-border bg-dark-surface p-4">
              <Text className="font-mono text-[11px] font-bold uppercase tracking-[1.2px] text-dark-tertiary">
                Included data
              </Text>
              <Text className="mt-3 text-sm leading-6 text-dark-primary">
                Transactions, account balances, budgets, and recurring payment
                metadata.
              </Text>
            </View>
            <Pressable
              onPress={handleExport}
              className="min-h-[52px] items-center justify-center rounded-2xl bg-accent-500 pressed:opacity-70">
              <Text className="font-mono text-sm font-bold text-navy-950">
                {exportButtonText}
              </Text>
            </Pressable>
          </View>
        }
        className="flex-1"
        contentContainerClassName="gap-3 px-5 pb-8"
      />
    </SafeAreaView>
  );
}
