import { View, Text, Pressable, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path, Rect, Line } from "react-native-svg";

import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { BackArrow } from "../../components/BackArrow";
import type { WalletStackParamList } from "../../navigation/types";

// -- SVG Icon Components --

const QrCodeIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <Rect x={2} y={2} width={8} height={8} rx={1} />
    <Rect x={14} y={2} width={8} height={8} rx={1} />
    <Rect x={2} y={14} width={8} height={8} rx={1} />
    <Rect x={14} y={14} width={4} height={4} rx={0.5} />
    <Line x1={22} y1={14} x2={22} y2={14.01} />
    <Line x1={18} y1={22} x2={22} y2={22} />
    <Line x1={22} y1={18} x2={22} y2={22} />
  </Svg>
);

const CopyIcon = ({ active = false }: { active?: boolean }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={active ? "white" : "rgba(255,255,255,0.6)"} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <Rect x={9} y={9} width={13} height={13} rx={2} ry={2} />
    <Path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </Svg>
);

// -- Data --

type Chain = {
  name: string;
  address: string;
  color: string;
  showChainDots: boolean;
};

const chains: Chain[] = [
  { name: "Ethereum", address: "0x52...e3b5", color: "#627EEA", showChainDots: true },
  { name: "Bitcoin", address: "bc1q...e3b5", color: "#F7931A", showChainDots: false },
  { name: "Solana", address: "G3TK...e3b5", color: "#9945FF", showChainDots: false },
  { name: "Dogecoin", address: "DFab...e3b5", color: "#C2A633", showChainDots: false },
  { name: "Litecoin", address: "ltc1...9k99", color: "#345D9D", showChainDots: false },
];

const ethereumChainDotColors = ["#627EEA", "#20BCA4", "#E84142", "#FF6B00", "#F7931A"];

// -- Chain Icon --

const ChainIcon = ({ color }: { color: string }) => (
  <View style={[styles.chainIcon, { backgroundColor: color }]} />
);

// -- Chain Dots (for Ethereum multi-chain) --

const ChainDots = () => (
  <View className="flex-row items-center gap-1 mt-1">
    {ethereumChainDotColors.map((color, index) => (
      <View
        key={index}
        style={[styles.chainDot, { backgroundColor: color }]}
      />
    ))}
  </View>
);

// -- Chain Row --

type ChainRowProps = {
  chain: Chain;
  copyActive?: boolean;
  onSelect?: (name: string) => void;
};

const ChainRow = ({ chain, copyActive = false, onSelect }: ChainRowProps) => (
  <Pressable
    className="flex-row items-center justify-between py-4 px-4"
    onPress={() => onSelect?.(chain.name)}
  >
    <View className="flex-row items-center gap-3">
      <ChainIcon color={chain.color} />
      <View>
        <Text style={styles.chainName}>{chain.name}</Text>
        <Text style={styles.chainAddress}>{chain.address}</Text>
        {chain.showChainDots && <ChainDots />}
      </View>
    </View>
    <View className="flex-row items-center gap-4">
      <Pressable hitSlop={8}>
        <QrCodeIcon />
      </Pressable>
      <Pressable hitSlop={8}>
        <CopyIcon active={copyActive} />
      </Pressable>
    </View>
  </Pressable>
);

// -- Main Screen --

export const ReceiveListCopied = () => {
  const navigation = useNavigation<NativeStackNavigationProp<WalletStackParamList>>();
  return (
    <View className="flex-1 bg-black">
      <StatusBar style="light" />

      <SafeAreaView className="flex-1" edges={["top"]}>
        {/* Navbar */}
        <View className="flex-row items-center justify-between px-4 py-2">
          <Pressable onPress={() => navigation.goBack()} className="w-10">
            <BackArrow />
          </Pressable>
          <Text style={styles.navTitle}>Receive</Text>
          <View className="w-10" />
        </View>

        {/* Chain List */}
        <View className="mt-2">
          {chains.map((chain) => (
            <ChainRow
              key={chain.name}
              chain={chain}
              copyActive={chain.name === "Ethereum"}
              onSelect={() => navigation.navigate("ReceiveQR")}
            />
          ))}
        </View>

        {/* Toast */}
        <View className="flex-1 justify-end items-center pb-10">
          <View style={styles.toast}>
            <Text style={styles.toastText}>Copied to Clipboard</Text>
          </View>
        </View>
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
  chainIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  chainDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  chainName: {
    fontFamily: "IBMPlexMono_400Regular",
    fontSize: 14,
    color: "white",
  },
  chainAddress: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.6)",
    marginTop: 2,
  },
  toast: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 999,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  toastText: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 14,
    color: "white",
  },
});
