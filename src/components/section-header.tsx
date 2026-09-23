import { Pressable, Text, View } from "react-native";

interface SectionHeaderProps {
  title: string;
  action?: string;
  onAction?: () => void;
}

export function SectionHeader({
  title,
  action,
  onAction,
}: SectionHeaderProps) {
  return (
    <View className="mb-3 flex-row items-center justify-between">
      <Text className="font-mono text-xs font-bold uppercase tracking-[1.5px] text-dark-tertiary">
        {title}
      </Text>
      {action ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={action}
          onPress={onAction}
          className="rounded-lg px-2 py-1 pressed:bg-navy-800">
          <Text className="font-mono text-xs font-semibold text-accent-500">
            {action}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}
