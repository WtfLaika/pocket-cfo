import { Text, View } from "react-native";

interface DetailRowProps {
  label: string;
  value: string;
}

export function DetailRow({ label, value }: DetailRowProps) {
  return (
    <View className="flex-row items-center border-b border-dark-border px-4 py-4 last:border-b-0">
      <Text className="flex-1 text-sm text-dark-tertiary">{label}</Text>
      <Text className="max-w-[60%] text-right text-sm font-semibold text-dark-primary">
        {value}
      </Text>
    </View>
  );
}
