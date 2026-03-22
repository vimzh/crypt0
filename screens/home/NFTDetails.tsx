import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path, Circle, Rect, Line, Defs, Stop, LinearGradient } from "react-native-svg";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { BackArrow } from "../../components/BackArrow";
import type { WalletStackParamList } from "../../navigation/types";

// -- SVG Icon Components --

const SendIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Line x1={12} y1={19} x2={12} y2={5} />
    <Path d="M5 12l7-7 7 7" />
  </Svg>
);

const SaveIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
    <Path d="M17 21v-8H7v8" />
    <Path d="M7 3v5h8" />
  </Svg>
);

const OpenSeaIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <Path d="M15 3h6v6" />
    <Path d="M10 14L21 3" />
  </Svg>
);

const MoreIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Circle cx={12} cy={12} r={1} fill="white" />
    <Circle cx={5} cy={12} r={1} fill="white" />
    <Circle cx={19} cy={12} r={1} fill="white" />
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

// -- Info Row --

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <View className="flex-row justify-between py-2">
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

// -- Property Card --

const PropertyCard = ({ label, value, rarity }: { label: string; value: string; rarity: string }) => (
  <View style={styles.propertyCard}>
    <Text style={styles.propertyLabel}>{label}</Text>
    <Text style={styles.propertyValue}>{value}</Text>
    <Text style={styles.propertyRarity}>{rarity}</Text>
  </View>
);

// -- NFT Image Placeholder --

const NFTImagePlaceholder = () => (
  <View style={styles.nftImage}>
    <Svg width="100%" height="100%" viewBox="0 0 343 280">
      <Defs>
        <LinearGradient id="nftGrad" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#6B3FA0" stopOpacity="0.4" />
          <Stop offset="1" stopColor="#3B5998" stopOpacity="0.4" />
        </LinearGradient>
      </Defs>
      <Rect x={0} y={0} width={343} height={280} rx={8} fill="#323232" />
      <Rect x={0} y={0} width={343} height={280} rx={8} fill="url(#nftGrad)" />
    </Svg>
  </View>
);

// -- Properties Data --

const properties = [
  { label: "Clothing", value: "GM Hoodie", rarity: "\u{1F48E} 1%" },
  { label: "Hair", value: "PURP Shape Up", rarity: "\u{1F48E} 1%" },
  { label: "Accessories", value: "Cross Earrings", rarity: "\u{1F48E} 2%" },
  { label: "Eye colour", value: "BLCK Surprised", rarity: "\u{1F48E} 3%" },
  { label: "DNA", value: "Human", rarity: "\u{1F48E} 50%" },
];

// -- Main Screen --

type NFTDetailsProps = NativeStackScreenProps<WalletStackParamList, "NFTDetails">;

export const NFTDetails = ({ navigation }: NFTDetailsProps) => {

  return (
    <View className="flex-1 bg-black">
      <StatusBar style="light" />

      <SafeAreaView className="flex-1" edges={["top"]}>
        {/* Navbar */}
        <View className="flex-row items-center justify-between px-4 py-2">
          <Pressable onPress={() => navigation.goBack()} className="p-2">
            <BackArrow />
          </Pressable>
          <Text style={styles.navTitle}>CloneX #5572</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView className="flex-1">
          {/* NFT Image */}
          <View className="px-4 mt-2">
            <NFTImagePlaceholder />
          </View>

          {/* Action Buttons */}
          <View className="flex-row justify-center gap-6 mt-4 mb-4">
            <ActionButton icon={<SendIcon />} label="Send" />
            <ActionButton icon={<SaveIcon />} label="Save" />
            <ActionButton icon={<OpenSeaIcon />} label="OpenSea" />
            <ActionButton icon={<MoreIcon />} label="More" />
          </View>

          {/* Info Rows */}
          <View className="px-4">
            <InfoRow label="Owner" value="rdpilot.eth" />
            <InfoRow label="Network" value="Ethereum" />
          </View>

          {/* Properties */}
          <View className="px-4 mt-4">
            <Text style={styles.infoLabel}>Properties</Text>
            <View className="flex-row flex-wrap mt-3" style={styles.propertiesGrid}>
              {properties.map((prop) => (
                <View key={prop.label} style={styles.propertyCardWrapper}>
                  <PropertyCard label={prop.label} value={prop.value} rarity={prop.rarity} />
                </View>
              ))}
            </View>
          </View>

          {/* About Section */}
          <View className="px-4 mt-6">
            <View className="flex-row items-center gap-2 mb-2">
              <View style={styles.collectionIcon} />
              <Text style={styles.infoLabel}>About CLONE X</Text>
            </View>
            <Text style={styles.aboutText}>
              CLONE X - X TAKASHI MURAKAMI is a collection of 20,000 next-gen Avatars, by RTFKT and
              Takashi Murakami. If you own a clone without any forged items, you will be able to claim
              a free Murakami Drip Vessel.
            </Text>
          </View>

          {/* Social Links */}
          <View className="flex-row gap-3 px-4 mt-4 mb-8">
            <Pressable style={styles.socialPill}>
              <Text style={styles.socialPillText}>Twitter</Text>
            </Pressable>
            <Pressable style={styles.socialPill}>
              <Text style={styles.socialPillText}>Website</Text>
            </Pressable>
            <Pressable style={styles.socialPill}>
              <Text style={styles.socialPillText}>View Collection (Opensea)</Text>
            </Pressable>
          </View>
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
  actionCircle: {
    backgroundColor: "#804FB0",
  },
  actionLabel: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 12,
    color: "white",
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
  nftImage: {
    width: "100%",
    height: 280,
    borderRadius: 8,
    overflow: "hidden",
  },
  propertiesGrid: {
    gap: 12,
  },
  propertyCardWrapper: {
    width: "48%",
  },
  propertyCard: {
    borderWidth: 1,
    borderColor: "#804FB0",
    borderRadius: 4,
    padding: 12,
  },
  propertyLabel: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.6)",
  },
  propertyValue: {
    fontFamily: "IBMPlexMono_400Regular",
    fontSize: 14,
    color: "#A87AD7",
    marginTop: 4,
  },
  propertyRarity: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.6)",
    marginTop: 4,
  },
  collectionIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#323232",
  },
  aboutText: {
    fontFamily: "IBMPlexMono_400Regular",
    fontSize: 14,
    color: "white",
    lineHeight: 22,
  },
  socialPill: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
  },
  socialPillText: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.5)",
  },
});
