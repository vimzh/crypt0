import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Svg, { Circle } from "react-native-svg";

import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { BackArrow } from "../../components/BackArrow";
import type { WalletStackParamList } from "../../navigation/types";

// -- Token Icon --

const TokenIcon = ({ letter, color }: { letter: string; color: string }) => (
  <View style={[styles.tokenIcon, { backgroundColor: color }]}>
    <Text style={styles.tokenIconLetter}>{letter}</Text>
  </View>
);

// -- Info Row --

const InfoRow = ({
  label,
  value,
  valueColor,
}: {
  label: string;
  value: string;
  valueColor?: string;
}) => (
  <View className="flex-row justify-between py-1">
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={[styles.infoValue, valueColor ? { color: valueColor } : undefined]}>
      {value}
    </Text>
  </View>
);

// -- Stake Card --

type StakePosition = {
  token: string;
  label: string;
  iconLetter: string;
  iconColor: string;
  apy: string;
  staked: string;
  rewards: string;
  duration: string;
};

const StakeCard = ({ position }: { position: StakePosition }) => (
  <View style={styles.card} className="mt-3">
    <View className="flex-row items-center justify-between">
      <View className="flex-row items-center gap-2">
        <TokenIcon letter={position.iconLetter} color={position.iconColor} />
        <Text style={styles.stakeTitle}>{position.label}</Text>
      </View>
      <Text style={styles.apyText}>{position.apy} APY</Text>
    </View>
    <View className="mt-2">
      <InfoRow label="Staked" value={position.staked} />
      <InfoRow label="Rewards" value={position.rewards} valueColor="#22C55E" />
      <InfoRow label="Duration" value={position.duration} />
    </View>
    <Pressable style={styles.unstakeButton} className="mt-2">
      <Text style={styles.unstakeText}>Unstake</Text>
    </Pressable>
  </View>
);

// -- Available Token Row --

type AvailableToken = {
  name: string;
  ticker: string;
  balance: string;
  iconLetter: string;
  iconColor: string;
};

const AvailableTokenRow = ({ token }: { token: AvailableToken }) => (
  <View className="flex-row items-center justify-between py-3">
    <View className="flex-row items-center gap-3">
      <TokenIcon letter={token.iconLetter} color={token.iconColor} />
      <View>
        <Text style={styles.tokenName}>{token.name}</Text>
        <Text style={styles.tokenBalance}>{token.balance}</Text>
      </View>
    </View>
    <Pressable style={styles.stakeButton}>
      <Text style={styles.stakeButtonText}>Stake</Text>
    </Pressable>
  </View>
);

// -- Data --

const activePositions: StakePosition[] = [
  {
    token: "ETH",
    label: "Ethereum Staking",
    iconLetter: "E",
    iconColor: "#627EEA",
    apy: "5.2%",
    staked: "2.0 ETH ($3,111.36)",
    rewards: "0.082 ETH ($127.83)",
    duration: "182 days",
  },
  {
    token: "MATIC",
    label: "Polygon Staking",
    iconLetter: "M",
    iconColor: "#8247E5",
    apy: "8.1%",
    staked: "1,500 MATIC ($1,120.14)",
    rewards: "42.3 MATIC ($31.52)",
    duration: "90 days",
  },
];

const availableTokens: AvailableToken[] = [
  { name: "Ethereum", ticker: "ETH", balance: "0.32 ETH", iconLetter: "E", iconColor: "#627EEA" },
  { name: "Avalanche", ticker: "AVAX", balance: "259.02 AVAX", iconLetter: "A", iconColor: "#E84142" },
  { name: "AAVE", ticker: "AAVE", balance: "1.77 AAVE", iconLetter: "A", iconColor: "#B6509E" },
  { name: "Polygon", ticker: "MATIC", balance: "500 MATIC", iconLetter: "M", iconColor: "#8247E5" },
];

// -- Main Screen --

export const Staking = () => {
  const navigation = useNavigation<NativeStackNavigationProp<WalletStackParamList>>();

  return (
    <View className="flex-1 bg-black">
      <StatusBar style="light" />

      <SafeAreaView className="flex-1" edges={["top"]}>
        {/* Navbar */}
        <View className="flex-row items-center justify-between px-4 py-2">
          <Pressable onPress={() => navigation.goBack()} className="p-2">
            <BackArrow />
          </Pressable>
          <Text style={styles.navTitle}>Staking</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView className="flex-1">
          {/* Summary Card */}
          <View style={styles.card} className="mx-4 mt-4">
            <View>
              <Text style={styles.summaryLabel}>Total Staked</Text>
              <Text style={styles.summaryValue}>$4,231.50</Text>
            </View>
            <View className="mt-3">
              <Text style={styles.summaryLabel}>Rewards Earned</Text>
              <Text style={styles.rewardsValue}>$127.83</Text>
            </View>
          </View>

          {/* Active Positions */}
          <View className="mx-4 mt-6">
            <Text style={styles.sectionHeader}>Active Positions</Text>
            {activePositions.map((position) => (
              <StakeCard key={position.token} position={position} />
            ))}
          </View>

          {/* Available to Stake */}
          <View className="mx-4 mt-6 mb-8">
            <Text style={styles.sectionHeader}>Available to Stake</Text>
            <View style={styles.card} className="mt-3">
              {availableTokens.map((token) => (
                <AvailableTokenRow key={token.ticker} token={token} />
              ))}
            </View>
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
  card: {
    backgroundColor: "#1a1a1a",
    borderRadius: 8,
    padding: 16,
  },
  summaryLabel: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.6)",
  },
  summaryValue: {
    fontFamily: "IBMPlexMono_600SemiBold",
    fontSize: 24,
    color: "white",
    marginTop: 4,
  },
  rewardsValue: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 16,
    color: "#22C55E",
    marginTop: 4,
  },
  sectionHeader: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.6)",
  },
  tokenIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  tokenIconLetter: {
    fontFamily: "IBMPlexMono_600SemiBold",
    fontSize: 12,
    color: "white",
    textAlign: "center",
    lineHeight: 24,
  },
  stakeTitle: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 14,
    color: "white",
  },
  apyText: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 12,
    color: "#22C55E",
  },
  infoLabel: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.6)",
  },
  infoValue: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 12,
    color: "white",
  },
  unstakeButton: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignSelf: "flex-start",
  },
  unstakeText: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 12,
    color: "white",
  },
  tokenName: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 14,
    color: "white",
  },
  tokenBalance: {
    fontFamily: "IBMPlexMono_400Regular",
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.6)",
    marginTop: 2,
  },
  stakeButton: {
    backgroundColor: "#22C55E",
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  stakeButtonText: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 12,
    color: "white",
  },
});
