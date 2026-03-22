import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { BackArrow } from "../../components/BackArrow";
import type { WalletStackParamList } from "../../navigation/types";

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
];

// -- Collection Row --

const CollectionRow = ({ collection }: { collection: NFTCollection }) => (
  <View className="py-3 gap-2">
    <View className="flex-row items-center gap-3">
      <View style={[styles.collectionIcon, { backgroundColor: collection.iconColor }]} />
      <Text style={styles.collectionName}>{collection.name}</Text>
    </View>
    <View className="flex-row gap-1">
      {Array.from({ length: collection.thumbnailCount }).map((_, i) => (
        <View key={i} style={styles.nftThumbnail} />
      ))}
    </View>
  </View>
);

// -- Main Screen --

export const SendNFTList = () => {
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
          <Text style={styles.navTitle}>Send</Text>
          <View className="w-10" />
        </View>

        {/* Tabs */}
        <View className="flex-row justify-center gap-6 mt-4">
          <View className="pb-2">
            <Text style={styles.tabTextInactive}>Crypto</Text>
          </View>
          <View className="pb-2" style={styles.activeTab}>
            <Text style={styles.tabTextActive}>Collectibles</Text>
          </View>
        </View>

        {/* NFT Collections List */}
        <ScrollView className="flex-1 px-4 mt-2">
          {collections.map((collection) => (
            <CollectionRow key={collection.name} collection={collection} />
          ))}
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
  activeTab: {
    borderBottomWidth: 1,
    borderBottomColor: "white",
  },
  tabTextActive: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 12,
    color: "white",
  },
  tabTextInactive: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 12,
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
