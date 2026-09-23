import { router } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import { useEffect, useRef, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { syncEvents } from "@/constants/screens";
import { edges } from "@/constants/theme";

export default function SyncScreen() {
  const [syncing, setSyncing] = useState(false);
  const syncTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleBack = () => router.back();
  const handleForceSync = () => {
    if (syncTimer.current) {
      clearTimeout(syncTimer.current);
    }
    setSyncing(true);
    syncTimer.current = setTimeout(() => {
      setSyncing(false);
      syncTimer.current = null;
    }, 900);
  };

  useEffect(() => {
    return () => {
      if (syncTimer.current) {
        clearTimeout(syncTimer.current);
      }
    };
  }, []);
  const syncStatusText = syncing
    ? "SYNC IN PROGRESS"
    : "ALL SYSTEMS MONITORED";

  return (
    <SafeAreaView edges={edges} className="flex-1 bg-bg">
      <FlashList
        data={syncEvents}
        keyExtractor={(event) => event.label}
        renderItem={({ item: event }) => (
          <View className="flex-row items-center rounded-2xl border border-dark-border bg-dark-surface p-4">
            <View className="flex-1">
              <Text className="text-sm font-semibold text-dark-primary">
                {event.label}
              </Text>
              <Text className="mt-1 text-xs text-dark-tertiary">
                {event.detail}
              </Text>
            </View>
            <Text
              className={`font-mono text-[10px] font-bold ${event.state === "FAILED" ? "text-danger-500" : event.state === "PENDING" ? "text-warning-500" : "text-accent-500"}`}>
              {event.state}
            </Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View className="h-3" />}
        ListHeaderComponent={
          <View className="gap-6 pb-5">
            <View className="flex-row items-center gap-3 pt-3">
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Go back"
                onPress={handleBack}
                className="h-10 w-10 items-center justify-center rounded-xl border border-dark-border bg-dark-surface">
                <Text className="text-xl text-dark-primary">‹</Text>
              </Pressable>
              <Text className="text-2xl font-semibold text-dark-primary">
                Sync feed
              </Text>
            </View>
            <View className="rounded-2xl border border-accent-500/25 bg-accent-500/10 p-4">
              <Text className="font-mono text-[11px] font-bold uppercase tracking-[1.2px] text-accent-500">
                {syncStatusText}
              </Text>
              <Text className="mt-2 text-sm leading-5 text-dark-primary">
                Your local picture is current as of 2 minutes ago.
              </Text>
            </View>
          </View>
        }
        ListFooterComponent={
          <Pressable
            onPress={handleForceSync}
            className="mt-6 min-h-[52px] items-center justify-center rounded-2xl border border-dark-border bg-dark-surface pressed:bg-navy-800">
            <Text className="font-mono text-xs font-bold text-dark-primary">
              FORCE SYNC
            </Text>
          </Pressable>
        }
        className="flex-1"
        contentContainerClassName="px-5 pb-8"
      />
    </SafeAreaView>
  );
}
