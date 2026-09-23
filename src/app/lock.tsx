import * as LocalAuthentication from "expo-local-authentication";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { LogoMark } from "@/components/logo-mark";
import { edges } from "@/constants/theme";

export default function LockScreen() {
  const [unlocking, setUnlocking] = useState(false);
  const [message, setMessage] = useState(
    "Use Face ID or fingerprint to continue",
  );

  const unlock = async () => {
    setUnlocking(true);
    setMessage("Waiting for biometric confirmation...");
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Unlock Pocket CFO",
        fallbackLabel: "Use device passcode",
      });
      if (result.success) {
        router.replace("/(tabs)");
        return;
      }
      setMessage("Authentication cancelled. Try again when ready.");
    } catch {
      setMessage(
        "Biometrics are unavailable here. Use the demo unlock button again.",
      );
    } finally {
      setUnlocking(false);
    }
  };
  const handleUnlock = () => void unlock();
  const handleDemoUnlock = () => router.replace("/(tabs)");
  const unlockIcon = unlocking ? "🔓" : "🔐";
  const unlockingText = unlocking
    ? "AUTHENTICATING..."
    : "UNLOCK WITH BIOMETRICS";

  return (
    <SafeAreaView
      edges={edges}
      className="flex-1 items-center justify-between bg-bg px-7 py-12">
      <View className="items-center">
        <LogoMark compact />
        <Text className="mt-4 font-mono text-lg font-bold text-dark-primary">
          Pocket CFO
        </Text>
      </View>
      <View className="items-center">
        <View
          className={`h-24 w-24 items-center justify-center rounded-full border-2 ${unlocking ? "border-accent-500 bg-accent-500/15" : "border-dark-border bg-dark-surface"}`}>
          <Text className="text-4xl">{unlockIcon}</Text>
        </View>
        <Text className="mt-7 text-center text-lg font-semibold text-dark-primary">
          Unlock Pocket CFO
        </Text>
        <Text className="mt-2 max-w-[260px] text-center text-sm leading-5 text-dark-tertiary">
          {message}
        </Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Unlock with biometrics"
          disabled={unlocking}
          onPress={handleUnlock}
          className="mt-8 min-h-[52px] rounded-2xl bg-accent-500 px-7 items-center justify-center pressed:opacity-70">
          <Text className="font-mono text-xs font-bold tracking-wide text-navy-950">
            {unlockingText}
          </Text>
        </Pressable>
      </View>
      <Pressable
        accessibilityRole="button"
        onPress={handleDemoUnlock}
        className="rounded-xl px-4 py-3 pressed:bg-navy-800">
        <Text className="text-sm text-dark-tertiary">Use demo fallback</Text>
      </Pressable>
    </SafeAreaView>
  );
}
