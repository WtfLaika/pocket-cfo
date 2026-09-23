import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { LogoMark } from "@/components/logo-mark";
import { PrimaryButton } from "@/components/primary-button";
import { onboardingCurrencies, onboardingSteps } from "@/constants/screens";
import { edges } from "@/constants/theme";
import { useFinanceStore } from "@/features/finance/store";
import type { CurrencyCode } from "@/features/finance/types";
import { useAppColors } from "@/hooks/use-app-colors";

export default function OnboardingScreen() {
  const colors = useAppColors();
  const { height, width } = useWindowDimensions();
  const compact = height < 720;
  const narrow = width < 380;
  const [step, setStep] = useState(0);
  const [securityEnabled, setSecurityEnabled] = useState(true);
  const [currency, setCurrency] = useState<CurrencyCode>("USD");
  const [accountName, setAccountName] = useState("Everyday Checking");

  const completeOnboarding = useFinanceStore(
    (state) => state.completeOnboarding,
  );
  const toggleSecurity = useFinanceStore((state) => state.toggleSecurity);

  const handleNext = async () => {
    if (step < 3) {
      setStep((current) => current + 1);
      return;
    }
    toggleSecurity(securityEnabled);
    await completeOnboarding(currency);
    router.replace("/(tabs)");
  };
  const handleSecurityToggle = () => setSecurityEnabled((value) => !value);
  const getCurrencyPressHandler = (code: CurrencyCode) => () =>
    setCurrency(code);

  const handleBack = () => setStep((current) => Math.max(0, current - 1));
  const securityIcon = securityEnabled ? "🔓" : "🔐";
  const securityStatusText = securityEnabled ? "Enabled" : "Disabled";
  const primaryButtonTitle =
    step === 3 ? "OPEN MY DASHBOARD" : step === 0 ? "GET STARTED" : "CONTINUE";

  return (
    <SafeAreaView edges={edges} className="flex-1 bg-bg">
      <KeyboardAvoidingView
        className={`flex-1 ${compact ? "py-4" : "py-8"} ${compact || narrow ? "px-5" : "px-7"}`}
        behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View className="flex-row items-center justify-between">
          <Text className="font-mono text-[11px] font-bold uppercase tracking-[1.5px] text-dark-tertiary">
            Pocket CFO
          </Text>
          <Text className="font-mono text-xs text-dark-tertiary">
            {step + 1} / 4
          </Text>
        </View>

        <View className="flex-1 justify-center py-4">
          {step === 0 ? (
            <View
              className="items-center"
              style={{ transform: [{ translateY: height * 0.25 }] }}>
              <LogoMark compact={compact} />
              <Text
                className={`text-center font-mono font-bold tracking-tight text-dark-primary ${compact || narrow ? "mt-4 text-3xl" : "mt-7 text-4xl"}`}>
                Pocket CFO
              </Text>
              <Text
                className={`max-w-[280px] text-center leading-6 text-dark-tertiary ${compact ? "mt-2 text-sm" : "mt-3 text-base"}`}>
                A calmer, clearer way to manage your money.
              </Text>
              <FlashList
                horizontal
                data={onboardingSteps}
                keyExtractor={(item) => String(item)}
                renderItem={({ item }) => (
                  <View
                    className={`h-1 rounded-full ${item === step ? "w-7 bg-accent-500" : "w-2 bg-navy-700"}`}
                  />
                )}
                className={`h-1 ${compact ? "mt-5" : "mt-8"}`}
                contentContainerClassName="gap-2"
                showsHorizontalScrollIndicator={false}
                scrollEnabled={false}
              />
            </View>
          ) : null}

          {step === 1 ? (
            <View>
              <Text className="font-mono text-[11px] font-bold uppercase tracking-[1.5px] text-dark-tertiary">
                Step 2 of 4
              </Text>
              <Text
                className={`mt-3 font-semibold text-dark-primary ${compact || narrow ? "text-2xl" : "text-3xl"}`}>
                Secure access
              </Text>
              <Text className="mt-3 text-base leading-6 text-dark-tertiary">
                Use biometrics to keep your financial picture private on this
                device.
              </Text>
              <View
                className={`items-center rounded-3xl border border-dark-border bg-dark-surface ${compact ? "mt-5 px-5 py-5" : "mt-10 px-6 py-10"}`}>
                <View
                  className={`items-center justify-center rounded-full border ${compact ? "h-16 w-16" : "h-24 w-24"} ${securityEnabled ? "border-accent-500 bg-accent-500/10" : "border-dark-border bg-navy-800"}`}>
                  <Text className={compact ? "text-3xl" : "text-4xl"}>
                    {securityIcon}
                  </Text>
                </View>
                <Text
                  className={`text-center text-lg font-semibold text-dark-primary ${compact ? "mt-3" : "mt-6"}`}>
                  Biometric unlock
                </Text>
                <Text
                  className={`mt-2 text-center text-sm leading-5 text-dark-tertiary ${narrow ? "px-1" : ""}`}>
                  You can change this later in Security settings.
                </Text>
                <Pressable
                  accessibilityRole="switch"
                  accessibilityState={{ checked: securityEnabled }}
                  onPress={handleSecurityToggle}
                  className={`flex-row items-center rounded-xl px-4 ${compact ? "mt-4 min-h-10" : "mt-6 min-h-[44px]"} ${securityEnabled ? "bg-accent-500/15" : "bg-navy-800"}`}>
                  <Text
                    className={`font-mono text-xs font-bold uppercase tracking-wide ${securityEnabled ? "text-accent-500" : "text-dark-tertiary"}`}>
                    {securityStatusText}
                  </Text>
                </Pressable>
              </View>
            </View>
          ) : null}

          {step === 2 ? (
            <View>
              <Text className="font-mono text-[11px] font-bold uppercase tracking-[1.5px] text-dark-tertiary">
                Step 3 of 4
              </Text>
              <Text
                className={`mt-3 font-semibold text-dark-primary ${compact || narrow ? "text-2xl" : "text-3xl"}`}>
                Choose your currency
              </Text>
              <Text className="mt-3 text-base leading-6 text-dark-tertiary">
                We will use this for balances, budgets, and insights.
              </Text>
              <View
                className={`${compact ? "mt-4 h-[220px]" : "mt-8 h-[328px]"}`}>
                <FlashList
                  data={onboardingCurrencies}
                  keyExtractor={(item) => item.code}
                  renderItem={({ item }) => {
                    const selected = item.code === currency;
                    return (
                      <Pressable
                        accessibilityRole="radio"
                        accessibilityState={{ selected }}
                        onPress={getCurrencyPressHandler(item.code)}
                        className={`flex-row items-center rounded-2xl border ${compact ? "gap-3 p-3" : "gap-4 p-4"} ${selected ? "border-accent-500 bg-accent-500/10" : "border-dark-border bg-dark-surface"}`}>
                        <View
                          className={`items-center justify-center rounded-xl bg-navy-800 ${compact ? "h-9 w-9" : "h-11 w-11"}`}>
                          <Text className="font-mono text-lg font-bold text-dark-primary">
                            {item.symbol}
                          </Text>
                        </View>
                        <View className="flex-1">
                          <Text className="text-sm font-semibold text-dark-primary">
                            {item.name}
                          </Text>
                          <Text className="mt-1 font-mono text-xs text-dark-tertiary">
                            {item.code}
                          </Text>
                        </View>
                        <View
                          className={`h-5 w-5 rounded-full border-2 ${selected ? "border-accent-500 bg-accent-500" : "border-dark-border"}`}
                        />
                      </Pressable>
                    );
                  }}
                  ItemSeparatorComponent={() => (
                    <View className={compact ? "h-2" : "h-3"} />
                  )}
                  className="flex-1"
                  contentContainerClassName="gap-0"
                  scrollEnabled={false}
                />
              </View>
            </View>
          ) : null}

          {step === 3 ? (
            <ScrollView
              className="flex-1"
              contentContainerClassName="py-4"
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}>
              <Text className="font-mono text-[11px] font-bold uppercase tracking-[1.5px] text-dark-tertiary">
                Step 4 of 4
              </Text>
              <Text
                className={`mt-3 font-semibold text-dark-primary ${compact || narrow ? "text-2xl" : "text-3xl"}`}>
                Add your first account
              </Text>
              <Text className="mt-3 text-base leading-6 text-dark-tertiary">
                Start with a simple local account. You can connect more later.
              </Text>
              <View className={`gap-2 ${compact ? "mt-4" : "mt-8"}`}>
                <Text className="font-mono text-[11px] font-bold uppercase tracking-[1.2px] text-dark-tertiary">
                  Account name
                </Text>
                <TextInput
                  value={accountName}
                  onChangeText={setAccountName}
                  placeholder="Everyday Checking"
                  placeholderTextColor={colors.placeholder}
                  className={`rounded-2xl border border-dark-border bg-dark-surface px-4 text-base text-dark-primary ${compact ? "py-3" : "py-4"}`}
                />
              </View>
              <View className={`mt-4 flex-row ${narrow ? "gap-2" : "gap-3"}`}>
                <View
                  className={`flex-1 rounded-2xl border border-accent-500/40 bg-accent-500/10 ${compact || narrow ? "p-3" : "p-4"}`}>
                  <Text className="font-mono text-[11px] font-bold uppercase tracking-[1.1px] text-accent-500">
                    Type
                  </Text>
                  <Text className="mt-2 text-sm font-semibold text-dark-primary">
                    Checking
                  </Text>
                </View>
                <View
                  className={`flex-1 rounded-2xl border border-dark-border bg-dark-surface ${compact || narrow ? "p-3" : "p-4"}`}>
                  <Text className="font-mono text-[11px] font-bold uppercase tracking-[1.1px] text-dark-tertiary">
                    Currency
                  </Text>
                  <Text className="mt-2 text-sm font-semibold text-dark-primary">
                    {currency}
                  </Text>
                </View>
              </View>
            </ScrollView>
          ) : null}
        </View>

        <View className={`shrink-0 gap-3 ${compact ? "mt-3" : "mt-10"}`}>
          <PrimaryButton title={primaryButtonTitle} onPress={handleNext} />
          {step > 0 ? (
            <Pressable
              accessibilityRole="button"
              onPress={handleBack}
              className="min-h-[44px] items-center justify-center rounded-xl pressed:bg-navy-800">
              <Text className="text-sm text-dark-tertiary">Back</Text>
            </Pressable>
          ) : (
            <Text className="text-center text-xs leading-5 text-dark-tertiary">
              Your demo data stays on this device.
            </Text>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
