import { useMemo } from "react";
import { DimensionValue, View } from "react-native";

interface ProgressBarProps {
  value: number;
  color?: string;
}

export function ProgressBar({
  value,
  color = "bg-accent-500",
}: ProgressBarProps) {
  const width = useMemo(
    () => `${Math.min(value, 1) * 100}%`,
    [value],
  ) as DimensionValue;

  return (
    <View className="h-2 overflow-hidden rounded-full bg-navy-700">
      <View className={`h-full rounded-full ${color}`} style={{ width }} />
    </View>
  );
}
