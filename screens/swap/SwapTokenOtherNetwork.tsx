import { useState } from "react";
import { View, Text, TextInput, ScrollView, Pressable, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";

import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { BackArrow } from "../../components/BackArrow";
import type { WalletStackParamList } from "../../navigation/types";

// -- Search Icon --

const SearchIcon = () => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
    <Path
      d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
      stroke="rgba(255,255,255,0.6)"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// -- Network Data --

type Network = {
  name: string;
  color: string;
};

const networks: Network[] = [
  { name: "Ethereum", color: "#627EEA" },
  { name: "Polygon", color: "#8247E5" },
  { name: "BSC", color: "#F3BA2F" },
  { name: "Optimism", color: "#FF0420" },
];

// -- Token Data --

type Token = {
  name: string;
  ticker: string;
  value: string;
  amount: string;
  iconColor: string;
};

const bridgeToken: Token = {
  name: "USD Coin",
  ticker: "USDC",
  value: "$0.00",
  amount: "0",
  iconColor: "#2775CA",
};

const polygonTokens: Token[] = [
  { name: "MATIC", ticker: "MATIC", value: "$0.00", amount: "", iconColor: "#8247E5" },
  { name: "Wrapped ETH", ticker: "WETH", value: "$756.71", amount: "0.5", iconColor: "#627EEA" },
  { name: "DAI", ticker: "DAI", value: "$533.41", amount: "532.72", iconColor: "#F5AC37" },
  { name: "Wrapped Bitcoin", ticker: "WBTC", value: "$0.00", amount: "", iconColor: "#F7931A" },
  { name: "1inch", ticker: "1INCH", value: "$0.00", amount: "", iconColor: "#1B314F" },
  { name: "AAVE", ticker: "AAVE", value: "$0.00", amount: "", iconColor: "#B6509E" },
  { name: "Aavegotchi ALPHA", ticker: "ALPHA", value: "$0.00", amount: "", iconColor: "#FA51D3" },
];

// -- Network Tab --

type NetworkTabProps = {
  network: Network;
  active: boolean;
  onPress: () => void;
};

const NetworkTab = ({ network, active, onPress }: NetworkTabProps) => (
  <Pressable
    onPress={onPress}
    style={[
      styles.networkTab,
      active ? styles.networkTabActive : styles.networkTabInactive,
    ]}
  >
    <View style={[styles.networkDot, { backgroundColor: network.color }]} />
    <Text style={[styles.networkTabText, active ? styles.networkTabTextActive : styles.networkTabTextInactive]}>
      {network.name}
    </Text>
  </Pressable>
);

// -- Token Row --

type TokenRowProps = {
  token: Token;
  onPress?: () => void;
};

const TokenRow = ({ token, onPress }: TokenRowProps) => (
  <Pressable className="flex-row items-center justify-between py-3" onPress={onPress}>
    <View className="flex-row items-center gap-3">
      <View style={[styles.tokenIcon, { backgroundColor: token.iconColor }]} />
      <View>
        <Text style={styles.tokenName}>{token.name}</Text>
        <Text style={styles.tokenTicker}>{token.ticker}</Text>
      </View>
    </View>
    <View className="items-end">
      <Text style={styles.tokenValue}>{token.value}</Text>
      {token.amount !== "" && (
        <Text style={styles.tokenAmount}>{token.amount} {token.ticker}</Text>
      )}
    </View>
  </Pressable>
);

// -- Section Header --

type SectionHeaderProps = {
  title: string;
};

const SectionHeader = ({ title }: SectionHeaderProps) => (
  <View className="mt-4 mb-1">
    <Text style={styles.sectionHeader}>{title}</Text>
  </View>
);

// -- Main Screen --

export const SwapTokenOtherNetwork = () => {
  const navigation = useNavigation<NativeStackNavigationProp<WalletStackParamList>>();
  const [activeNetwork, setActiveNetwork] = useState("Polygon");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTokens = polygonTokens.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.ticker.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredBridge =
    bridgeToken.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bridgeToken.ticker.toLowerCase().includes(searchQuery.toLowerCase());

  return (
    <View className="flex-1 bg-black">
      <StatusBar style="light" />

      <SafeAreaView className="flex-1" edges={["top"]}>
        {/* Navbar */}
        <View className="flex-row items-center justify-between px-4 py-2">
          <Pressable onPress={() => navigation.goBack()} className="p-2">
            <BackArrow />
          </Pressable>
          <Text style={styles.navTitle}>Swap To</Text>
          <View className="p-2" style={{ width: 24 }} />
        </View>

        {/* Search Bar */}
        <View className="px-4 mt-2">
          <View style={styles.searchBar} className="flex-row items-center px-3">
            <SearchIcon />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search tokens on Polygon"
              placeholderTextColor="rgba(255,255,255,0.6)"
              style={styles.searchInput}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
        </View>

        {/* Network Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.networkRow}
          className="mt-3"
        >
          {networks.map((network) => (
            <NetworkTab
              key={network.name}
              network={network}
              active={activeNetwork === network.name}
              onPress={() => setActiveNetwork(network.name)}
            />
          ))}
        </ScrollView>

        {/* Token List */}
        <ScrollView className="flex-1 px-4 mt-2">
          {/* Bridge Section */}
          {filteredBridge && (
            <>
              <SectionHeader title="Bridge to Polygon" />
              <TokenRow
                token={bridgeToken}
                onPress={() => navigation.navigate("SwapBridge")}
              />
            </>
          )}

          {/* All Tokens Section */}
          {filteredTokens.length > 0 && (
            <>
              <SectionHeader title="All Tokens" />
              {filteredTokens.map((token) => (
                <TokenRow
                  key={token.ticker}
                  token={token}
                  onPress={() => navigation.navigate("SwapBridge")}
                />
              ))}
            </>
          )}
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
  searchBar: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 4,
    height: 40,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 12,
    color: "white",
    height: 40,
  },
  networkRow: {
    paddingHorizontal: 16,
    gap: 8,
  },
  networkTab: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    gap: 6,
  },
  networkTabActive: {
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  networkTabInactive: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  networkTabText: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 12,
  },
  networkTabTextActive: {
    color: "white",
  },
  networkTabTextInactive: {
    color: "#7B849B",
  },
  networkDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  sectionHeader: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 12,
    color: "rgba(255,255,255,0.6)",
  },
  tokenIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  tokenName: {
    fontFamily: "IBMPlexMono_400Regular",
    fontSize: 14,
    color: "white",
  },
  tokenTicker: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 12,
    color: "#7B849B",
    marginTop: 2,
  },
  tokenValue: {
    fontFamily: "IBMPlexMono_400Regular",
    fontSize: 14,
    color: "white",
    textAlign: "right",
  },
  tokenAmount: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 12,
    color: "#7B849B",
    textAlign: "right",
    marginTop: 2,
  },
});
