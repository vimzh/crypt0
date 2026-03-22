import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path, Circle, Line } from "react-native-svg";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { BackArrow } from "../../components/BackArrow";
import type { WalletStackParamList } from "../../navigation/types";

// -- SVG Icon Components --

const PlusIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Line x1={12} y1={5} x2={12} y2={19} />
    <Line x1={5} y1={12} x2={19} y2={12} />
  </Svg>
);

const SwapIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M7 16l-4-4 4-4" />
    <Path d="M3 12h18" />
    <Path d="M17 8l4 4-4 4" />
    <Path d="M21 12H3" />
  </Svg>
);

const SendIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Line x1={12} y1={19} x2={12} y2={5} />
    <Path d="M5 12l7-7 7 7" />
  </Svg>
);

const ReceiveIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Line x1={12} y1={5} x2={12} y2={19} />
    <Path d="M19 12l-7 7-7-7" />
  </Svg>
);

// -- Action Button --

const ActionButton = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <View className="items-center gap-2">
    <View className="w-10 h-10 rounded-full items-center justify-center" style={styles.actionCircle}>
      {icon}
    </View>
    <Text style={styles.actionLabel}>{label}</Text>
  </View>
);

// -- Pill Button --

const PillButton = ({ label, active, onPress }: { label: string; active?: boolean; onPress?: () => void }) => (
  <Pressable
    onPress={onPress}
    style={[
      styles.pill,
      active ? styles.pillActive : styles.pillInactive,
    ]}
  >
    <Text style={[styles.pillText, active ? styles.pillTextActive : styles.pillTextInactive]}>
      {label}
    </Text>
  </Pressable>
);

// -- Stat Row --

const StatRow = ({ label, value }: { label: string; value: string }) => (
  <View className="flex-row justify-between py-2">
    <Text style={styles.statLabel}>{label}</Text>
    <Text style={styles.statValue}>{value}</Text>
  </View>
);

// -- Chart --

const ChartPlaceholder = () => (
  <View style={styles.chartContainer}>
    <Text style={styles.chartLabelTopRight}>$1559.14</Text>
    <Svg width="100%" height={160} viewBox="0 0 360 160" preserveAspectRatio="none">
      <Path
        d="M0 120 C30 100, 50 80, 80 90 S120 110, 150 70 S200 40, 230 60 S280 100, 310 50 S340 30, 360 45"
        stroke="#20BCA4"
        strokeWidth={2}
        fill="none"
      />
    </Svg>
    <Text style={styles.chartLabelBottomLeft}>$1549.45</Text>
  </View>
);

// -- Time Period Selector --

const timePeriods = ["1H", "1D", "1W", "1M", "1Y", "All"];

const TimePeriodSelector = () => (
  <View className="flex-row justify-center gap-2 mt-4 px-4">
    {timePeriods.map((period) => (
      <PillButton key={period} label={period} active={period === "1H"} />
    ))}
  </View>
);

// -- Main Screen --

type CryptoDetailsProps = NativeStackScreenProps<WalletStackParamList, "CryptoDetails">;

export const CryptoDetails = ({ navigation }: CryptoDetailsProps) => {

  return (
    <View className="flex-1 bg-black">
      <StatusBar style="light" />

      <SafeAreaView className="flex-1" edges={["top"]}>
        {/* Navbar */}
        <View className="flex-row items-center justify-between px-4 py-2">
          <Pressable onPress={() => navigation.goBack()} className="p-2">
            <BackArrow />
          </Pressable>
          <View className="flex-row items-center gap-2">
            <View style={styles.ethIcon}>
              <Text style={styles.ethIconLetter}>E</Text>
            </View>
            <Text style={styles.navTitle}>Ethereum</Text>
          </View>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView className="flex-1">
          {/* Balance Row */}
          <View className="flex-row justify-between py-4 px-4">
            <View>
              <Text style={styles.sectionLabel}>Balance</Text>
              <Text style={styles.balanceValue}>2.32 ETH</Text>
            </View>
            <View className="items-end">
              <Text style={styles.sectionLabel}>Value</Text>
              <Text style={styles.balanceValue}>$6,911.70</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View className="flex-row justify-center gap-10 mt-2 mb-4">
            <ActionButton icon={<PlusIcon />} label="Buy" />
            <ActionButton icon={<SwapIcon />} label="Swap" />
            <ActionButton icon={<SendIcon />} label="Send" />
            <ActionButton icon={<ReceiveIcon />} label="Receive" />
          </View>

          {/* Price Section */}
          <View className="px-4 mt-4">
            <Text style={styles.sectionLabel}>Price</Text>
            <Text style={styles.priceValue}>$1,555.68</Text>
            <Text style={styles.priceChange}>+$5.16 (+1.23%)</Text>
          </View>

          {/* Chart */}
          <ChartPlaceholder />

          {/* Time Period Pills */}
          <TimePeriodSelector />

          {/* About Section */}
          <View className="px-4 mt-6">
            <Text style={styles.sectionLabel}>About Ethereum</Text>
            <Text style={styles.aboutText}>
              Ethereum is a decentralized, open-source blockchain with smart contract functionality.
              Ether is the native cryptocurrency of the platform. Amongst cryptocurrencies, ether is
              second only to bitcoin in market capitalization.
            </Text>
            <View className="mt-3">
              <Pressable style={styles.viewMorePill}>
                <Text style={styles.viewMoreText}>View More</Text>
              </Pressable>
            </View>
          </View>

          {/* Stats Section */}
          <View className="px-4 mt-6">
            <Text style={styles.sectionLabel}>Stats</Text>
            <View className="mt-2">
              <StatRow label="24h volume" value="$3.37b" />
              <StatRow label="Market cap." value="$186.82b" />
              <StatRow label="Total supply" value="120,221.729" />
              <StatRow label="Circulating supply" value="120,221.729" />
            </View>
          </View>

          {/* Social Links */}
          <View className="flex-row gap-3 px-4 mt-6 mb-8">
            <Pressable style={styles.viewMorePill}>
              <Text style={styles.viewMoreText}>Twitter</Text>
            </Pressable>
            <Pressable style={styles.viewMorePill}>
              <Text style={styles.viewMoreText}>Website</Text>
            </Pressable>
            <Pressable style={styles.viewMorePill}>
              <Text style={styles.viewMoreText}>Reddit</Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  ethIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#627EEA",
    alignItems: "center",
    justifyContent: "center",
  },
  ethIconLetter: {
    fontFamily: "IBMPlexMono_600SemiBold",
    fontSize: 12,
    color: "white",
    textAlign: "center",
    lineHeight: 24,
  },
  navTitle: {
    fontFamily: "IBMPlexMono_400Regular",
    fontSize: 14,
    color: "white",
  },
  sectionLabel: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.6)",
  },
  balanceValue: {
    fontFamily: "IBMPlexMono_400Regular",
    fontSize: 14,
    color: "white",
    marginTop: 4,
  },
  actionCircle: {
    backgroundColor: "#804FB0",
  },
  actionLabel: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 12,
    color: "white",
  },
  priceValue: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 18,
    color: "white",
    marginTop: 4,
  },
  priceChange: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 12,
    color: "#20BCA4",
    marginTop: 2,
  },
  chartContainer: {
    width: "100%",
    height: 160,
    marginTop: 16,
    position: "relative",
  },
  chartLabelTopRight: {
    fontFamily: "IBMPlexMono_400Regular",
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.6)",
    position: "absolute",
    top: 4,
    right: 16,
    zIndex: 1,
  },
  chartLabelBottomLeft: {
    fontFamily: "IBMPlexMono_400Regular",
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.6)",
    position: "absolute",
    bottom: 4,
    left: 16,
    zIndex: 1,
  },
  pill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  pillActive: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  pillInactive: {
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  pillText: {
    fontFamily: "IBMPlexMono_400Regular",
    fontSize: 14,
  },
  pillTextActive: {
    color: "white",
  },
  pillTextInactive: {
    color: "#7B849B",
  },
  aboutText: {
    fontFamily: "IBMPlexMono_400Regular",
    fontSize: 14,
    color: "white",
    marginTop: 8,
    lineHeight: 22,
  },
  viewMorePill: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    alignSelf: "flex-start",
  },
  viewMoreText: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.5)",
  },
  statLabel: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.6)",
  },
  statValue: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 12,
    color: "white",
  },
});
