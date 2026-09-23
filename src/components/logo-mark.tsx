import { Text, View } from "react-native";

interface LogoMarkProps {
  compact?: boolean;
}

export function LogoMark({ compact = false }: LogoMarkProps) {
  return (
    <View
      className={`${compact ? "h-10 w-10 rounded-xl" : "h-20 w-20 rounded-[24px]"} items-center justify-center border border-accent-500/40 bg-accent-500/10`}>
      <Text
        className={`${compact ? "text-lg" : "text-3xl"} font-mono font-bold text-accent-500`}>
        ₿
      </Text>
    </View>
  );
}
