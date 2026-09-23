import type { ReactNode } from "react";
import { Text, View } from "react-native";

interface ScreenHeaderProps {
  eyebrow?: string;
  title: string;
  action?: ReactNode;
}

export function ScreenHeader({
  eyebrow,
  title,
  action,
}: ScreenHeaderProps) {
  return (
    <View className="mb-6 flex-row items-start justify-between">
      <View className="flex-1">
        {eyebrow ? (
          <Text className="mb-2 font-mono text-[11px] font-bold uppercase tracking-[1.5px] text-dark-tertiary">
            {eyebrow}
          </Text>
        ) : null}
        <Text
          accessibilityRole="header"
          className="text-3xl font-semibold tracking-tight text-dark-primary">
          {title}
        </Text>
      </View>
      {action}
    </View>
  );
}
