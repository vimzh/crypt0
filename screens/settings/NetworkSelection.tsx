import { useState } from "react";
import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import type { WalletStackParamList } from "../../navigation/types";

type Network = {
  name: string;
  chainId: number;
  color: string;
};

const networks: Network[] = [
  { name: "Ethereum", chainId: 1, color: "#627EEA" },
  { name: "Polygon", chainId: 137, color: "#8247E5" },
  { name: "Arbitrum", chainId: 42161, color: "#28A0F0" },
  { name: "Optimism", chainId: 10, color: "#FF0420" },
  { name: "BSC", chainId: 56, color: "#F0B90B" },
  { name: "Avalanche", chainId: 43114, color: "#E84142" },
  { name: "Base", chainId: 8453, color: "#0052FF" },
];

const BackArrow = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M19 12H5" />
    <Path d="M12 19l-7-7 7-7" />
  </Svg>
);

type NetworkRowProps = {
  network: Network;
  isActive: boolean;
  onPress: () => void;
};

const NetworkRow = ({ network, isActive, onPress }: NetworkRowProps) => (
  <Pressable onPress={onPress} style={styles.row}>
    <View className="flex-row items-center">
      <View style={[styles.networkCircle, { backgroundColor: network.color }]} />
      <View style={styles.networkInfo}>
        <Text style={styles.networkName}>{network.name}</Text>
        <Text style={styles.chainId}>Chain ID: {network.chainId}</Text>
      </View>
    </View>
    {isActive && <View style={styles.activeDot} />}
  </Pressable>
);

export const NetworkSelection = () => {
  const navigation = useNavigation<NativeStackNavigationProp<WalletStackParamList>>();
  const [selectedChainId, setSelectedChainId] = useState(1);

  return (
    <View className="flex-1 bg-black">
      <StatusBar style="light" />

      <SafeAreaView className="flex-1" edges={["top", "bottom"]}>
        {/* Navbar */}
        <View className="flex-row items-center justify-between px-4 py-3">
          <Pressable onPress={() => navigation.goBack()} style={styles.navSide}>
            <BackArrow />
          </Pressable>
          <Text style={styles.title}>Networks</Text>
          <View style={styles.navSide} />
        </View>

        {/* Network List */}
        <ScrollView className="flex-1 px-4 mt-4">
          {networks.map((network) => (
            <NetworkRow
              key={network.chainId}
              network={network}
              isActive={selectedChainId === network.chainId}
              onPress={() => setSelectedChainId(network.chainId)}
            />
          ))}
        </ScrollView>

        {/* Add Custom Network Button */}
        <View className="px-4 pb-4">
          <Pressable style={styles.addButton}>
            <Text style={styles.addButtonText}>Add Custom Network</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  navSide: {
    width: 40,
  },
  title: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
  row: {
    backgroundColor: "#1a1a1a",
    borderRadius: 8,
    marginBottom: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  networkCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  networkInfo: {
    marginLeft: 12,
  },
  networkName: {
    fontFamily: "IBMPlexMono_400Regular",
    fontSize: 16,
    color: "white",
  },
  chainId: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.6)",
    marginTop: 2,
  },
  activeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#20BCA4",
  },
  addButton: {
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "transparent",
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
  },
  addButtonText: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 18,
    color: "white",
  },
});
