import { Pressable, Text, View } from "react-native";

import { formatMoney, getInitials } from "@/features/finance/format";
import type { Account, AccountColor } from "@/features/finance/types";

const accountColorClasses: Record<AccountColor, string> = {
  accent: "border-l-accent-500",
  info: "border-l-info-500",
  warning: "border-l-warning-500",
  brand: "border-l-brand-400",
};

interface AccountRowProps {
  account: Account;
  onPress?: () => void;
}

export function AccountRow({ account, onPress }: AccountRowProps) {
  const content = (
    <View className="flex-row items-center gap-3">
      <View
        className={`h-11 w-11 items-center justify-center rounded-xl border-l-[3px] bg-navy-800 ${accountColorClasses[account.color]}`}>
        <Text className="font-mono text-xs font-bold text-dark-primary">
          {getInitials(account.bank)}
        </Text>
      </View>
      <View className="flex-1">
        <Text className="text-sm font-semibold text-dark-primary">
          {account.name}
        </Text>
        <Text className="mt-1 text-xs text-dark-tertiary">
          {account.bank} · {account.lastSynced}
        </Text>
      </View>
      <Text
        className={`font-mono text-sm font-bold ${account.balance < 0 ? "text-danger-500" : "text-dark-primary"}`}>
        {formatMoney(account.balance)}
      </Text>
    </View>
  );

  return onPress ? (
    <Pressable
      onPress={onPress}
      className="rounded-2xl border border-dark-border bg-dark-surface p-4 pressed:bg-navy-800">
      {content}
    </Pressable>
  ) : (
    <View className="rounded-2xl border border-dark-border bg-dark-surface p-4">
      {content}
    </View>
  );
}
