import { Text, type TextProps } from "react-native";

import { ThemeColor } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";

export type ThemedTextProps = TextProps & {
  type?:
    | "default"
    | "title"
    | "small"
    | "smallBold"
    | "subtitle"
    | "link"
    | "linkPrimary"
    | "code";
  themeColor?: ThemeColor;
};

const textTypeClasses = {
  default: "text-base leading-6 font-medium",
  title: "text-[48px] leading-[52px] font-semibold",
  small: "text-sm leading-5 font-medium",
  smallBold: "text-sm leading-5 font-bold",
  subtitle: "text-[32px] leading-[44px] font-semibold",
  link: "text-sm leading-[30px]",
  linkPrimary: "text-sm leading-[30px] text-[#3c87f7]",
  code: "font-mono text-xs font-medium android:font-bold",
} as const;

export function ThemedText({
  style,
  type = "default",
  themeColor,
  className,
  ...rest
}: ThemedTextProps) {
  const theme = useTheme();

  return (
    <Text
      className={`${textTypeClasses[type]}${className ? ` ${className}` : ""}`}
      style={[{ color: theme[themeColor ?? "text"] }, style]}
      {...rest}
    />
  );
}
