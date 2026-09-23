import { Text, View } from "react-native";

interface MetricCardProps {
  label: string;
  value: string;
  detail?: string;
  tone?: "default" | "positive" | "warning";
}

export function MetricCard({
  label,
  value,
  detail,
  tone = "default",
}: MetricCardProps) {
  const valueClass =
    tone === "positive"
      ? "text-accent-500"
      : tone === "warning"
        ? "text-warning-500"
        : "text-dark-primary";
  return (
    <View className="flex-1 rounded-2xl border border-dark-border bg-dark-surface p-4">
      <Text className="font-mono text-[10px] font-bold uppercase tracking-[1.2px] text-dark-tertiary">
        {label}
      </Text>
      <Text className={`mt-2 font-mono text-xl font-bold ${valueClass}`}>
        {value}
      </Text>
      {detail ? (
        <Text className="mt-1 text-xs text-dark-tertiary">{detail}</Text>
      ) : null}
    </View>
  );
}
