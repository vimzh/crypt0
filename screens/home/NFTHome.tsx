import { View, Text, Image, ScrollView, Pressable, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path, Circle, Rect, Line } from "react-native-svg";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import type { WalletStackParamList } from "../../navigation/types";

const defaultAvatar = require("../../assets/intro/default-avatar.png");

// -- SVG Icon Components --

const SettingsIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <Circle cx={12} cy={12} r={3} />
    <Path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </Svg>
);

const CopyIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <Rect x={9} y={9} width={13} height={13} rx={2} ry={2} />
    <Path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </Svg>
);

const QrCodeIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <Rect x={2} y={2} width={8} height={8} rx={1} />
    <Rect x={14} y={2} width={8} height={8} rx={1} />
    <Rect x={2} y={14} width={8} height={8} rx={1} />
    <Rect x={14} y={14} width={4} height={4} rx={0.5} />
    <Line x1={22} y1={14} x2={22} y2={14.01} />
    <Line x1={18} y1={22} x2={22} y2={22} />
    <Line x1={22} y1={18} x2={22} y2={22} />
  </Svg>
);

const ChevronDownIcon = () => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M6 9l6 6 6-6" />
  </Svg>
);

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

// -- NFT Data --

type NFTCollection = {
  name: string;
  thumbnailCount: number;
  iconColor: string;
};

const collections: NFTCollection[] = [
  { name: "0N1 Force", thumbnailCount: 4, iconColor: "#555" },
  { name: "CLONE X", thumbnailCount: 1, iconColor: "#555" },
  { name: "DeGods", thumbnailCount: 3, iconColor: "#555" },
  { name: "The Captainz", thumbnailCount: 3, iconColor: "#555" },
  { name: "Azuki", thumbnailCount: 3, iconColor: "#BC3748" },
  { name: "Mutant Ape Yacht Club", thumbnailCount: 2, iconColor: "#555" },
];

// -- Collection Row --

const CollectionRow = ({ collection, onPress }: { collection: NFTCollection; onPress?: () => void }) => (
  <Pressable className="py-3 gap-2" onPress={onPress}>
    <View className="flex-row items-center gap-3">
      <View style={[styles.collectionIcon, { backgroundColor: collection.iconColor }]} />
      <Text style={styles.collectionName}>{collection.name}</Text>
    </View>
    <View className="flex-row gap-1">
      {Array.from({ length: collection.thumbnailCount }).map((_, i) => (
        <View key={i} style={styles.nftThumbnail} />
      ))}
    </View>
  </Pressable>
);

// -- Main Screen --

type NFTHomeProps = NativeStackScreenProps<WalletStackParamList, "NFTHome">;

export const NFTHome = ({ navigation }: NFTHomeProps) => {

  return (
    <View className="flex-1 bg-black">
      <StatusBar style="light" />

      <SafeAreaView className="flex-1" edges={["top"]}>
        {/* Top Navbar */}
        <View className="flex-row items-center justify-between px-4 py-2">
          <Pressable>
            <SettingsIcon />
          </Pressable>
          <View className="flex-row items-center gap-4">
            <Pressable>
              <CopyIcon />
            </Pressable>
            <Pressable>
              <QrCodeIcon />
            </Pressable>
          </View>
        </View>

        {/* Header */}
        <View className="items-center mt-4">
          <View className="flex-row items-center gap-2">
            <Image source={defaultAvatar} style={styles.avatar} className="rounded-full" />
            <Text style={styles.username}>rdpilot</Text>
            <ChevronDownIcon />
          </View>
          <Text style={styles.balance} className="mt-3">$12,332.95</Text>
        </View>

        {/* Action Buttons */}
        <View className="flex-row justify-center gap-10 mt-6">
          <ActionButton icon={<PlusIcon />} label="Buy" />
          <ActionButton icon={<SwapIcon />} label="Swap" />
          <ActionButton icon={<SendIcon />} label="Send" />
          <ActionButton icon={<ReceiveIcon />} label="Receive" />
        </View>

        {/* Tabs */}
        <View className="flex-row justify-center gap-6 mt-6">
          <Pressable className="pb-2" onPress={() => navigation.navigate("Home")}>
            <Text style={styles.tabTextInactive}>Crypto</Text>
          </Pressable>
          <View className="pb-2" style={styles.activeTab}>
            <Text style={styles.tabTextActive}>Collectibles</Text>
          </View>
        </View>

        {/* NFT Collections List */}
        <ScrollView className="flex-1 px-4 mt-2">
          {collections.map((collection) => (
            <CollectionRow key={collection.name} collection={collection} onPress={() => navigation.navigate("NFTDetails")} />
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 24,
    height: 24,
  },
  username: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 14,
    color: "white",
  },
  balance: {
    fontFamily: "IBMPlexMono_600SemiBold",
    fontSize: 32,
    color: "white",
  },
  actionCircle: {
    backgroundColor: "#804FB0",
  },
  actionLabel: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 12,
    color: "white",
  },
  activeTab: {
    borderBottomWidth: 1,
    borderBottomColor: "white",
  },
  tabTextActive: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 14,
    color: "white",
  },
  tabTextInactive: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.3)",
  },
  collectionIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  collectionName: {
    fontFamily: "IBMPlexMono_400Regular",
    fontSize: 16,
    color: "white",
  },
  nftThumbnail: {
    width: 64,
    height: 64,
    borderRadius: 4,
    backgroundColor: "#323232",
  },
});
