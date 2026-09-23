import { Pressable, Text } from "react-native";

interface PrimaryButtonProps {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
}

export function PrimaryButton({
  title,
  onPress,
  disabled = false,
}: PrimaryButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      disabled={disabled}
      onPress={onPress}
      className={`min-h-[52px] items-center justify-center rounded-2xl px-4 ${disabled ? "bg-navy-700 opacity-50" : "bg-accent-500 pressed:scale-[0.98] pressed:opacity-80"}`}>
      <Text className="font-mono text-sm font-bold tracking-wide text-navy-950">
        {title}
      </Text>
    </Pressable>
  );
}
