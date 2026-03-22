import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path, Circle, Line } from "react-native-svg";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import type { BrowserStackParamList } from "../../navigation/types";

// -- SVG Icon Components --

const ArrowLeftIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M19 12H5" />
    <Path d="M12 19l-7-7 7-7" />
  </Svg>
);

const MoreIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <Circle cx={12} cy={5} r={1} fill="white" />
    <Circle cx={12} cy={12} r={1} fill="white" />
    <Circle cx={12} cy={19} r={1} fill="white" />
  </Svg>
);

const PlusIcon = () => (
  <Svg width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <Line x1={12} y1={5} x2={12} y2={19} />
    <Line x1={5} y1={12} x2={19} y2={12} />
  </Svg>
);

// -- Data --

type TabData = {
  url: string;
};

const tabs: TabData[] = [
  { url: "https://opensea.io/collection/clonex" },
  { url: "https://blur.io/asset/0x60e4d786..." },
  { url: "https://blur.io/asset/0x23581767..." },
  { url: "https://dextool.io/app/en/ether/..." },
];

// -- Tab Card --

const NewTabCard = () => (
  <View style={styles.card} className="items-center justify-center">
    <PlusIcon />
  </View>
);

const TabCard = ({ tab }: { tab: TabData }) => (
  <View>
    <View style={styles.card}>
      <View className="flex-1 bg-black" style={styles.cardContent} />
    </View>
    <Text style={styles.tabUrl} numberOfLines={1}>
      {tab.url}
    </Text>
  </View>
);

// -- Main Screen --

type BrowserTabsProps = NativeStackScreenProps<BrowserStackParamList, "BrowserTabs">;

export const BrowserTabs = ({ navigation }: BrowserTabsProps) => {

  return (
    <View className="flex-1 bg-black">
      <StatusBar style="light" />

      <SafeAreaView className="flex-1" edges={["top"]}>
        {/* Navbar */}
        <View className="flex-row items-center justify-between h-12 px-4">
          <Pressable className="p-2" onPress={() => navigation.goBack()}>
            <ArrowLeftIcon />
          </Pressable>
          <Text style={styles.navTitle}>{tabs.length} Tabs</Text>
          <Pressable className="p-2">
            <MoreIcon />
          </Pressable>
        </View>

        {/* Tab Grid */}
        <ScrollView className="flex-1 px-4">
          <View className="flex-row flex-wrap gap-4 mt-4 pb-8">
            {/* New Tab Card */}
            <View style={styles.cardWrapper}>
              <NewTabCard />
            </View>

            {/* Tab Cards */}
            {tabs.map((tab, index) => (
              <View key={index} style={styles.cardWrapper}>
                <TabCard tab={tab} />
              </View>
            ))}
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
  cardWrapper: {
    width: "48%",
  },
  card: {
    backgroundColor: "#1a1a1a",
    borderRadius: 8,
    aspectRatio: 0.7,
    overflow: "hidden",
  },
  cardContent: {
    margin: 6,
    borderRadius: 4,
  },
  tabUrl: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.6)",
    marginTop: 6,
  },
});
