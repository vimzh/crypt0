import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { BackArrow } from "../../components/BackArrow";
import type { ActivitiesStackParamList } from "../../navigation/types";

// -- Checkmark Icon --

const CheckmarkIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M5 13l4 4L19 7" />
  </Svg>
);

// -- Detail Row --

const DetailRow = ({ label, value, valueColor }: { label: string; value: string; valueColor?: string }) => (
  <View className="flex-row justify-between">
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={[styles.detailValue, valueColor ? { color: valueColor } : undefined]}>{value}</Text>
  </View>
);

// -- Main Screen --

type TransactionDetailsProps = NativeStackScreenProps<ActivitiesStackParamList, "TransactionDetails">;

export const TransactionDetails = ({ navigation }: TransactionDetailsProps) => {
  return (
    <View className="flex-1 bg-black">
      <StatusBar style="light" />

      <SafeAreaView className="flex-1" edges={["top"]}>
        {/* Navbar */}
        <View className="flex-row items-center justify-between px-4 py-2">
          <Pressable onPress={() => navigation.goBack()} className="p-2">
            <BackArrow />
          </Pressable>
          <Text style={styles.navTitle}>Transaction</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView className="flex-1">
          {/* Status Badge */}
          <View className="items-center mt-6">
            <View style={styles.statusCircle}>
              <CheckmarkIcon />
            </View>
            <Text style={styles.statusText}>Confirmed</Text>
          </View>

          {/* Amount Section */}
          <View className="items-center mt-6">
            <Text style={styles.amountPrimary}>1 ETH</Text>
            <Text style={styles.amountSecondary}>US$1,566.87</Text>
          </View>

          {/* Details Card */}
          <View style={styles.detailsCard}>
            <DetailRow label="Status" value="Confirmed" valueColor="#22C55E" />
            <DetailRow label="Date" value="Mar 22, 2026 14:32" />
            <DetailRow label="From" value="0x29e...76ef" />
            <DetailRow label="To" value="0xFaa...893E" />
            <DetailRow label="Network" value="Ethereum" />
            <DetailRow label="Network fee" value="0.00042 ETH ($0.66)" />
            <View className="flex-row justify-between">
              <Text style={styles.detailLabel}>Transaction Hash</Text>
              <Pressable>
                <Text style={[styles.detailValue, { color: "#A87AD7" }]}>0x8f3...2a1b</Text>
              </Pressable>
            </View>
            <DetailRow label="Block" value="19,234,567" />
          </View>

          {/* View on Etherscan Button */}
          <View className="mx-4 mt-4 mb-8">
            <Pressable style={styles.etherscanButton}>
              <Text style={styles.etherscanButtonText}>View on Etherscan</Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  navTitle: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 14,
    color: "white",
  },
  statusCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#22C55E",
    alignItems: "center",
    justifyContent: "center",
  },
  statusText: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 16,
    color: "#22C55E",
    marginTop: 8,
  },
  amountPrimary: {
    fontFamily: "IBMPlexMono_600SemiBold",
    fontSize: 32,
    color: "white",
  },
  amountSecondary: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.6)",
    marginTop: 4,
  },
  detailsCard: {
    backgroundColor: "#1a1a1a",
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 24,
    gap: 16,
  },
  detailLabel: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.6)",
  },
  detailValue: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 12,
    color: "white",
  },
  etherscanButton: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 4,
    padding: 12,
    alignItems: "center",
  },
  etherscanButtonText: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.5)",
  },
});
