import { useState } from "react";
import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { BackArrow } from "../../components/BackArrow";
import type { WalletStackParamList } from "../../navigation/types";

// -- Chevron Right Icon --

const ChevronRight = () => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M9 18l6-6-6-6" />
  </Svg>
);

// -- Toggle Switch --

const ToggleSwitch = ({ active, onToggle }: { active: boolean; onToggle: () => void }) => (
  <Pressable
    onPress={onToggle}
    style={[
      styles.toggleTrack,
      { backgroundColor: active ? "#804FB0" : "#323232" },
    ]}
  >
    <View
      style={[
        styles.toggleThumb,
        { marginLeft: active ? 24 : 2 },
      ]}
    />
  </Pressable>
);

// -- Types --

type SettingRowProps = {
  label: string;
  value?: string;
  chevron?: boolean;
  toggle?: boolean;
  toggleActive?: boolean;
  onToggle?: () => void;
  onPress?: () => void;
  isFirst?: boolean;
  isLast?: boolean;
  labelColor?: string;
};

// -- Setting Row --

const SettingRow = ({
  label,
  value,
  chevron,
  toggle,
  toggleActive,
  onToggle,
  onPress,
  isFirst,
  isLast,
  labelColor,
}: SettingRowProps) => {
  const content = (
    <View
      style={[
        styles.row,
        isFirst && styles.rowFirst,
        isLast && styles.rowLast,
        !isLast && styles.rowBorder,
      ]}
    >
      <Text style={[styles.rowLabel, labelColor ? { color: labelColor } : undefined]}>{label}</Text>
      <View className="flex-row items-center gap-2">
        {value && <Text style={styles.rowValue}>{value}</Text>}
        {chevron && <ChevronRight />}
        {toggle && onToggle && <ToggleSwitch active={!!toggleActive} onToggle={onToggle} />}
      </View>
    </View>
  );

  if (onPress) {
    return <Pressable onPress={onPress}>{content}</Pressable>;
  }

  return content;
};

// -- Section --

type SectionProps = {
  title: string;
  children: React.ReactNode;
};

const Section = ({ title, children }: SectionProps) => (
  <View className="mb-6">
    <Text style={styles.sectionTitle} className="mb-2 mt-6 px-4">
      {title}
    </Text>
    <View className="mx-4" style={styles.sectionContainer}>
      {children}
    </View>
  </View>
);

// -- Main Screen --

export const SecuritySettings = () => {
  const navigation = useNavigation<NativeStackNavigationProp<WalletStackParamList>>();

  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [requireForTransactions, setRequireForTransactions] = useState(true);
  const [hideBalances, setHideBalances] = useState(false);

  return (
    <View className="flex-1 bg-black">
      <StatusBar style="light" />

      <SafeAreaView className="flex-1" edges={["top", "bottom"]}>
        {/* Navbar */}
        <View className="flex-row items-center justify-between px-4 py-3">
          <Pressable onPress={() => navigation.goBack()} className="w-10">
            <BackArrow />
          </Pressable>
          <Text style={styles.navTitle}>Security</Text>
          <View className="w-10" />
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* AUTHENTICATION */}
          <Section title="AUTHENTICATION">
            <SettingRow
              label="Face ID / Fingerprint"
              toggle
              toggleActive={biometricEnabled}
              onToggle={() => setBiometricEnabled((prev) => !prev)}
              isFirst
            />
            <SettingRow
              label="Auto-Lock"
              value="5 minutes"
            />
            <SettingRow
              label="Require for Transactions"
              toggle
              toggleActive={requireForTransactions}
              onToggle={() => setRequireForTransactions((prev) => !prev)}
              isLast
            />
          </Section>

          {/* RECOVERY */}
          <Section title="RECOVERY">
            <SettingRow
              label="Show Recovery Phrase"
              chevron
              onPress={() => {}}
              isFirst
            />
            <SettingRow
              label="Export Private Key"
              chevron
              onPress={() => navigation.navigate("ExportPrivateKey" as never)}
            />
            <SettingRow
              label="Change Password"
              chevron
              onPress={() => {}}
              isLast
            />
          </Section>

          {/* ADVANCED */}
          <Section title="ADVANCED">
            <SettingRow
              label="Transaction Signing"
              value="Biometric"
              isFirst
            />
            <SettingRow
              label="Hide Balances"
              toggle
              toggleActive={hideBalances}
              onToggle={() => setHideBalances((prev) => !prev)}
            />
            <SettingRow
              label="Lock Wallet"
              labelColor="#BC3C20"
              onPress={() => {}}
              isLast
            />
          </Section>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  navTitle: {
    fontFamily: "IBMPlexMono_400Regular",
    fontSize: 14,
    color: "white",
  },
  sectionTitle: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.6)",
    letterSpacing: 1,
  },
  sectionContainer: {
    borderRadius: 12,
    overflow: "hidden",
  },
  row: {
    backgroundColor: "#1a1a1a",
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rowFirst: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  rowLast: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  rowBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(255, 255, 255, 0.08)",
  },
  rowLabel: {
    fontFamily: "IBMPlexMono_400Regular",
    fontSize: 14,
    color: "white",
  },
  rowValue: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.6)",
  },
  toggleTrack: {
    width: 50,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
  },
  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "white",
  },
});
