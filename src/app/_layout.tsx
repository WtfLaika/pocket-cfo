import { DefaultTheme, DarkTheme, Stack, ThemeProvider } from "expo-router";
import { useColorScheme } from "react-native";
import "@/global.css";

import { useAppColors } from "@/hooks/use-app-colors";
import "../../global.css";

export default function RootLayout() {
  const scheme = useColorScheme();
  const colors = useAppColors();
  const navigationTheme = scheme === "dark" ? DarkTheme : DefaultTheme;
  const theme = {
    ...navigationTheme,
    colors: {
      ...navigationTheme.colors,
      primary: colors.accent,
      background: colors.background,
      card: colors.surface,
      text: colors.primary,
      border: colors.border,
      notification: colors.danger,
    },
  };

  return (
    <ThemeProvider value={theme}>
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: colors.background },
          headerShown: false,
        }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </ThemeProvider>
  );
}
