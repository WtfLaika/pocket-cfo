import { View, type ViewProps } from "react-native";

import { themeColorClasses, type ThemeColor } from "@/constants/components";

export type ThemedViewProps = ViewProps & {
  type?: ThemeColor;
};

export function ThemedView({
  style,
  type,
  className,
  ...otherProps
}: ThemedViewProps) {
  return (
    <View
      className={`${themeColorClasses[type ?? "background"]}${className ? ` ${className}` : ""}`}
      style={style}
      {...otherProps}
    />
  );
}
