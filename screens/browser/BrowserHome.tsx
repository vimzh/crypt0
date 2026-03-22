import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Circle, Line, Path } from "react-native-svg";

// -- SVG Icon Components --

const SearchIcon = () => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Circle cx={11} cy={11} r={8} />
    <Line x1={21} y1={21} x2={16.65} y2={16.65} />
  </Svg>
);

// -- Data --

type SuggestedDApp = {
  name: string;
  color: string;
};

const suggestedDApps: SuggestedDApp[] = [
  { name: "Opensea", color: "#2081E2" },
  { name: "Blur", color: "#FF6B00" },
  { name: "Zora", color: "#7C3AED" },
  { name: "Foundation", color: "#000000" },
  { name: "LooksRare", color: "#00E676" },
  { name: "AAVE", color: "#B6509E" },
  { name: "ENS", color: "#5298FF" },
  { name: "Curve", color: "#FF0000" },
];

type RecentSite = {
  name: string;
  url: string;
  color: string;
};

const recentSites: RecentSite[] = [
  { name: "Blur", url: "https://blur.io/collections", color: "#FF6B00" },
  { name: "Blur", url: "blur.io/asset/0x60e4d786...", color: "#FF6B00" },
  { name: "ENS", url: "https://app.ens.domains/", color: "#5298FF" },
  { name: "Dextool", url: "https://www.dextools.io/app/en/ether/...", color: "#00E676" },
  { name: "OpenSea", url: "https://opensea.io/collection/clonex", color: "#2081E2" },
  { name: "OpenSea", url: "https://opensea.io/assets/ethereum/0x4...", color: "#2081E2" },
];

// -- Suggested DApp Item --

const DAppItem = ({ dapp }: { dapp: SuggestedDApp }) => (
  <View className="items-center" style={styles.dappItem}>
    <View style={[styles.dappCircle, { backgroundColor: dapp.color }]} />
    <Text style={styles.dappName} numberOfLines={1}>{dapp.name}</Text>
  </View>
);

// -- Recent Row --

const RecentRow = ({ site }: { site: RecentSite }) => (
  <View className="flex-row items-center gap-3">
    <View style={[styles.recentCircle, { backgroundColor: site.color }]} />
    <View className="flex-1">
      <Text style={styles.recentName} numberOfLines={1}>{site.name}</Text>
      <Text style={styles.recentUrl} numberOfLines={1}>{site.url}</Text>
    </View>
  </View>
);

// -- Main Screen --

export const BrowserHome = () => {

  return (
    <View className="flex-1 bg-black">
      <StatusBar style="light" />

      <SafeAreaView className="flex-1" edges={["top"]}>
        <ScrollView className="flex-1 px-4">
          {/* Search Bar */}
          <Pressable
            className="flex-row items-center h-10 px-4 gap-2"
            style={styles.searchBar}
          >
            <SearchIcon />
            <Text style={styles.searchPlaceholder}>Search or enter url</Text>
          </Pressable>

          {/* Suggested Section */}
          <Text style={styles.sectionLabel} className="mt-6 mb-4">Suggested</Text>
          <View className="flex-row flex-wrap justify-between">
            {suggestedDApps.map((dapp) => (
              <DAppItem key={dapp.name} dapp={dapp} />
            ))}
          </View>

          {/* Recents Section */}
          <Text style={styles.sectionLabel} className="mt-6 mb-4">Recents</Text>
          <View className="gap-4">
            {recentSites.map((site, index) => (
              <RecentRow key={`${site.name}-${index}`} site={site} />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 4,
  },
  searchPlaceholder: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.6)",
  },
  sectionLabel: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.6)",
  },
  dappItem: {
    width: "25%",
    marginBottom: 16,
  },
  dappCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  dappName: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 12,
    color: "white",
    marginTop: 8,
    textAlign: "center",
  },
  recentCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  recentName: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 12,
    color: "white",
  },
  recentUrl: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.6)",
    marginTop: 2,
  },
});
