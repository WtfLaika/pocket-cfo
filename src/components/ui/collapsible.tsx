import { SymbolView } from "expo-symbols";
import { PropsWithChildren, useState } from "react";
import { Pressable } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useAppColors } from "@/hooks/use-app-colors";

export function Collapsible({
  children,
  title,
}: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const colors = useAppColors();
  const handleToggle = () => setIsOpen((value) => !value);

  return (
    <ThemedView>
      <Pressable
        className="flex-row items-center gap-2 pressed:opacity-70"
        onPress={handleToggle}>
        <ThemedView
          type="backgroundElement"
          className="h-6 w-6 items-center justify-center rounded-[12px]">
          <SymbolView
            name={{
              ios: "chevron.right",
              android: "chevron_right",
              web: "chevron_right",
            }}
            size={14}
            weight="bold"
            tintColor={colors.primary}
            style={{ transform: [{ rotate: isOpen ? "-90deg" : "90deg" }] }}
          />
        </ThemedView>

        <ThemedText type="small">{title}</ThemedText>
      </Pressable>
      {isOpen && (
        <Animated.View entering={FadeIn.duration(200)}>
          <ThemedView
            type="backgroundElement"
            className="ml-6 mt-4 rounded-md p-6">
            {children}
          </ThemedView>
        </Animated.View>
      )}
    </ThemedView>
  );
}
