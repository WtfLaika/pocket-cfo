import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import "../../global.css";

export default function HomeScreen() {
  return (
    <SafeAreaView edges={["top", "bottom"]} className="flex-1 bg-navy-950">
      <View className="w-full max-w-[520px] flex-1 self-center px-8">
        <View className="flex-1 items-center justify-center gap-6">
          <View
            accessible
            accessibilityLabel="Pocket CFO logo"
            className="h-20 w-20 items-center justify-center rounded-lg border border-brand-500/40 bg-brand-500/10">
            <Text className="font-mono text-[32px] font-bold text-brand-500">
              ₿
            </Text>
          </View>

          <View className="items-center gap-2">
            <Text
              accessibilityRole="header"
              className="font-mono text-display-lg font-bold text-dark-primary">
              Pocket CFO
            </Text>
            <Text className="text-center text-body-lg text-dark-tertiary">
              A smarter way to manage money.
            </Text>
          </View>

          <View
            accessibilityLabel="Step 1 of 4"
            className="mt-4 flex-row items-center gap-2">
            <View className="h-1 w-6 rounded-full bg-brand-500" />
            <View className="h-1 w-2 rounded-full bg-navy-700" />
            <View className="h-1 w-2 rounded-full bg-navy-700" />
            <View className="h-1 w-2 rounded-full bg-navy-700" />
          </View>
        </View>

        <View className="gap-3 pb-6">
          <Pressable
            accessibilityLabel="Get started"
            accessibilityRole="button"
            onPress={() => undefined}
            className="min-h-[52px] items-center justify-center rounded-md bg-brand-500 px-4 pressed:scale-[0.98] pressed:opacity-80">
            <Text className="font-mono text-label-md font-bold text-white">
              GET STARTED →
            </Text>
          </Pressable>

          <Pressable
            accessibilityLabel="Learn more"
            accessibilityRole="button"
            onPress={() => undefined}
            className="min-h-[44px] items-center justify-center rounded-sm px-4 pressed:bg-navy-800">
            <Text className="text-body-md text-dark-tertiary">Learn more</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
