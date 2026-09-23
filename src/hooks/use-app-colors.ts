import { useUnstableNativeVariable } from "nativewind";
import { Platform } from "react-native";

function useColorVariable(name: string): string {
  const nativeValue = useUnstableNativeVariable(name) as unknown as string;
  return Platform.OS === "web" ? `var(${name})` : nativeValue;
}

export function useAppColors() {
  const background = useColorVariable("--app-background");
  const surface = useColorVariable("--app-surface");
  const elevated = useColorVariable("--app-elevated");
  const border = useColorVariable("--app-border");
  const selected = useColorVariable("--app-selected");
  const primary = useColorVariable("--app-primary");
  const secondary = useColorVariable("--app-secondary");
  const tertiary = useColorVariable("--app-tertiary");
  const placeholder = useColorVariable("--app-placeholder");
  const accent = useColorVariable("--app-accent");
  const warning = useColorVariable("--app-warning");
  const danger = useColorVariable("--app-danger");

  return {
    background,
    surface,
    elevated,
    border,
    selected,
    primary,
    secondary,
    tertiary,
    placeholder,
    accent,
    warning,
    danger,
  };
}