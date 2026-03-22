import { useState } from "react";
import { View, Text, ScrollView, Pressable, TextInput, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Svg, { Path, Circle as SvgCircle, Line } from "react-native-svg";

import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { WalletStackParamList } from "../../navigation/types";

// -- SVG Icons --

const BackArrowIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M19 12H5" />
    <Path d="M12 19l-7-7 7-7" />
  </Svg>
);

const SearchIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <SvgCircle cx={11} cy={11} r={8} />
    <Line x1={21} y1={21} x2={16.65} y2={16.65} />
  </Svg>
);

// -- Token Data --

type TokenEntry = {
  name: string;
  ticker: string;
  color: string;
  defaultEnabled: boolean;
};

const tokenList: TokenEntry[] = [
  { name: "Ethereum", ticker: "ETH", color: "#627EEA", defaultEnabled: true },
  { name: "USD Coin", ticker: "USDC", color: "#2775CA", defaultEnabled: true },
  { name: "ApeCoin", ticker: "APE", color: "#0025FF", defaultEnabled: true },
  { name: "LooksRare", ticker: "LOOKS", color: "#00E676", defaultEnabled: true },
  { name: "Avalanche", ticker: "AVAX", color: "#E84142", defaultEnabled: false },
  { name: "DogeCoin", ticker: "DOGE", color: "#C2A633", defaultEnabled: true },
  { name: "AAVE", ticker: "AAVE", color: "#B6509E", defaultEnabled: true },
  { name: "Sandbox", ticker: "SAND", color: "#00ADEF", defaultEnabled: false },
  { name: "Chainlink", ticker: "LINK", color: "#2A5ADA", defaultEnabled: false },
  { name: "Polygon", ticker: "MATIC", color: "#8247E5", defaultEnabled: false },
];

// -- Toggle Switch --

const ToggleSwitch = ({ value, onToggle }: { value: boolean; onToggle: () => void }) => (
  <Pressable onPress={onToggle}>
    <View
      style={[
        styles.toggleTrack,
        { backgroundColor: value ? "#804FB0" : "#323232" },
      ]}
    >
      <View
        style={[
          styles.toggleKnob,
          { transform: [{ translateX: value ? 22 : 2 }] },
        ]}
      />
    </View>
  </Pressable>
);

// -- Token Row --

const TokenRow = ({
  token,
  enabled,
  onToggle,
}: {
  token: TokenEntry;
  enabled: boolean;
  onToggle: () => void;
}) => (
  <View className="flex-row items-center justify-between py-4">
    <View className="flex-row items-center gap-3">
      <View style={[styles.tokenCircle, { backgroundColor: token.color }]} />
      <View>
        <Text style={styles.tokenName}>{token.name}</Text>
        <Text style={styles.tokenTicker}>{token.ticker}</Text>
      </View>
    </View>
    <ToggleSwitch value={enabled} onToggle={onToggle} />
  </View>
);

// -- Main Screen --

export const ManageTokens = () => {
  const navigation = useNavigation<NativeStackNavigationProp<WalletStackParamList>>();
  const [search, setSearch] = useState("");
  const [toggles, setToggles] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    tokenList.forEach((t) => {
      initial[t.ticker] = t.defaultEnabled;
    });
    return initial;
  });

  const handleToggle = (ticker: string) => {
    setToggles((prev) => ({ ...prev, [ticker]: !prev[ticker] }));
  };

  const filteredTokens = tokenList.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.ticker.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View className="flex-1 bg-black">
      <StatusBar style="light" />

      <SafeAreaView className="flex-1" edges={["top"]}>
        {/* Navbar */}
        <View className="flex-row items-center justify-between px-4 py-2">
          <Pressable onPress={() => navigation.goBack()}>
            <BackArrowIcon />
          </Pressable>
          <Text style={styles.headerTitle}>Manage Tokens</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Search Bar */}
        <View style={styles.searchBar} className="flex-row items-center mx-4 mt-2">
          <SearchIcon />
          <TextInput
            style={styles.searchInput}
            placeholder="Search tokens"
            placeholderTextColor="rgba(255,255,255,0.5)"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Token List */}
        <ScrollView className="flex-1 px-4 mt-4">
          {filteredTokens.map((token) => (
            <TokenRow
              key={token.ticker}
              token={token}
              enabled={toggles[token.ticker] ?? false}
              onToggle={() => handleToggle(token.ticker)}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    fontFamily: "IBMPlexMono_600SemiBold",
    fontSize: 16,
    color: "white",
  },
  searchBar: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 4,
    height: 40,
    paddingHorizontal: 12,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontFamily: "IBMPlexMono_400Regular",
    fontSize: 14,
    color: "white",
  },
  tokenCircle: {
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
  toggleTrack: {
    width: 50,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
  },
  toggleKnob: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "white",
  },
});
