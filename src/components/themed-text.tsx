import { Text, type TextProps } from "react-native";

import { themedTextTypeClasses, themeColorClasses, type ThemeColor } from "@/constants/components";

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

export function ThemedText({
  style,
  type = "default",
  themeColor,
  className,
  ...rest
}: ThemedTextProps) {
  return (
    <Text
      className={`${themedTextTypeClasses[type]} ${themeColorClasses[themeColor ?? "text"]}${className ? ` ${className}` : ""}`}
      style={style}
      {...rest}
    />
  );
}
