import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { edges } from "@/constants/theme";
import { useFinanceStore } from "@/features/finance/store";
import { useAppColors } from "@/hooks/use-app-colors";
import "../../global.css";

export default function HomeScreen() {
  const colors = useAppColors();
  const hydrated = useFinanceStore((state) => state.hydrated);
  const onboardingComplete = useFinanceStore(
    (state) => state.onboardingComplete,
  );
  const hydrate = useFinanceStore((state) => state.hydrate);

  useEffect(() => {
    void hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (!hydrated) return;
    router.replace(onboardingComplete ? "/(tabs)" : "/onboarding");
  }, [hydrated, onboardingComplete]);

  return (
    <SafeAreaView
      edges={edges}
      className="flex-1 items-center justify-center bg-bg">
      <View className="h-10 w-10 items-center justify-center rounded-full bg-accent-500/15">
        <ActivityIndicator color={colors.accent} />
      </View>
    </SafeAreaView>
  );
}
