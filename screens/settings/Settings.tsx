import { View, Text, Image, ScrollView, Pressable, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { BackArrow } from "../../components/BackArrow";
import type { WalletStackParamList } from "../../navigation/types";

const defaultAvatar = require("../../assets/intro/default-avatar.png");

// -- Chevron Right Icon --

const ChevronRight = () => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M9 18l6-6-6-6" />
  </Svg>
);

// -- Toggle Switch (visual only) --

const ToggleSwitch = ({ active = false }: { active?: boolean }) => (
  <View
    style={[
      styles.toggleTrack,
      { backgroundColor: active ? "#804FB0" : "#333" },
    ]}
  >
    <View
      style={[
        styles.toggleThumb,
        { marginLeft: active ? 18 : 2 },
      ]}
    />
  </View>
);

// -- Types --

type SettingRowProps = {
  label: string;
  value?: string;
  chevron?: boolean;
  toggle?: boolean;
  toggleActive?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
};

// -- Setting Row --

const SettingRow = ({ label, value, chevron, toggle, toggleActive, isFirst, isLast }: SettingRowProps) => (
  <View
    style={[
      styles.row,
      isFirst && styles.rowFirst,
      isLast && styles.rowLast,
      !isLast && styles.rowBorder,
    ]}
  >
    <Text style={styles.rowLabel}>{label}</Text>
    <View className="flex-row items-center gap-2">
      {value && <Text style={styles.rowValue}>{value}</Text>}
      {chevron && <ChevronRight />}
      {toggle && <ToggleSwitch active={toggleActive} />}
    </View>
  </View>
);

// -- Section --

type SectionProps = {
  title: string;
  children: React.ReactNode;
};

const Section = ({ title, children }: SectionProps) => (
  <View className="mb-6">
    <Text style={styles.sectionTitle} className="mb-2 px-4">
      {title}
    </Text>
    <View className="mx-4" style={styles.sectionContainer}>
      {children}
    </View>
  </View>
);

// -- Main Screen --

export const Settings = () => {
  const navigation = useNavigation<NativeStackNavigationProp<WalletStackParamList>>();

  return (
    <View className="flex-1 bg-black">
      <StatusBar style="light" />

      <SafeAreaView className="flex-1" edges={["top", "bottom"]}>
        {/* Navbar */}
        <View className="flex-row items-center justify-between px-4 py-3">
          <Pressable onPress={() => navigation.goBack()} className="w-10">
            <BackArrow />
          </Pressable>
          <Text style={styles.navTitle}>Settings</Text>
          <View className="w-10" />
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* User Profile */}
          <View className="items-center mt-4 mb-8">
            <Image source={defaultAvatar} style={styles.avatar} className="rounded-full" />
            <Text style={styles.userName} className="mt-3">rdpilot</Text>
            <Text style={styles.userAddress} className="mt-1">0x29e...76ef</Text>
          </View>

          {/* GENERAL */}
          <Section title="GENERAL">
            <SettingRow label="Currency" value="USD" isFirst />
            <SettingRow label="Language" value="English" />
            <SettingRow label="Theme" value="Dark" isLast />
          </Section>

          {/* SECURITY */}
          <Section title="SECURITY">
            <SettingRow label="Show Recovery Phrase" chevron isFirst />
            <SettingRow label="Change Password" chevron />
            <SettingRow label="Face ID / Biometrics" toggle toggleActive isLast />
          </Section>

          {/* NETWORK */}
          <Section title="NETWORK">
            <SettingRow label="Default Network" value="Ethereum" isFirst />
            <SettingRow label="Custom RPC" chevron isLast />
          </Section>

          {/* ABOUT */}
          <Section title="ABOUT">
            <SettingRow label="Version" value="1.0.0" isFirst />
            <SettingRow label="Terms of Service" chevron />
            <SettingRow label="Privacy Policy" chevron isLast />
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
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userName: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 16,
    color: "white",
  },
  userAddress: {
    fontFamily: "IBMPlexMono_400Regular",
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.6)",
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
    width: 40,
    height: 22,
    borderRadius: 11,
    justifyContent: "center",
  },
  toggleThumb: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "white",
  },
});
