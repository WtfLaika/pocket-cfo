import { DarkTheme, Stack, ThemeProvider } from 'expo-router';

export default function TabLayout() {
  return (
    <ThemeProvider value={DarkTheme}>
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: '#0B1020' },
          headerShown: false,
        }}
      />
    </ThemeProvider>
  );
}
