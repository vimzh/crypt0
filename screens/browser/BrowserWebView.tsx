import { View, Text, Pressable, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path, Circle, Line } from "react-native-svg";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import type { BrowserStackParamList } from "../../navigation/types";

// -- SVG Icon Components --

const BackArrowIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M19 12H5" />
    <Path d="M12 19l-7-7 7-7" />
  </Svg>
);

const MoreDotsIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="white">
    <Circle cx={12} cy={5} r={2} />
    <Circle cx={12} cy={12} r={2} />
    <Circle cx={12} cy={19} r={2} />
  </Svg>
);

// -- Types --

type BrowserWebViewProps = NativeStackScreenProps<BrowserStackParamList, "BrowserWebView">;

// -- Main Screen --

export const BrowserWebView = ({ navigation }: BrowserWebViewProps) => {

  return (
    <View className="flex-1 bg-black">
      <StatusBar style="light" />

      <SafeAreaView className="flex-1" edges={["top"]}>
        {/* Navbar */}
        <View className="flex-row items-center px-4 gap-3" style={styles.navbar}>
          {/* Back Arrow */}
          <Pressable onPress={() => navigation.goBack()} className="p-1">
            <BackArrowIcon />
          </Pressable>

          {/* URL Bar */}
          <View className="flex-1 flex-row items-center justify-center h-10 px-3" style={styles.urlBar}>
            <Text style={styles.urlText} numberOfLines={1}>pro.opensea.io</Text>
          </View>

          {/* Right Side Icons */}
          <View className="flex-row items-center gap-3">
            {/* Colored Circle Icon */}
            <View style={styles.profileCircle} />

            {/* Tab Count Badge */}
            <View style={styles.tabBadge}>
              <Text style={styles.tabBadgeText}>1</Text>
            </View>

            {/* Three Dots Menu */}
            <Pressable className="p-1">
              <MoreDotsIcon />
            </Pressable>
          </View>
        </View>

        {/* WebView Placeholder */}
        <View className="flex-1 items-center justify-center" style={styles.webviewPlaceholder}>
          <Text style={styles.placeholderText}>Web Content</Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    height: 52,
  },
  urlBar: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 4,
  },
  urlText: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 12,
    color: "white",
  },
  profileCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#804FB0",
  },
  tabBadge: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  tabBadgeText: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 11,
    color: "white",
  },
  webviewPlaceholder: {
    backgroundColor: "#1a1a2e",
  },
  placeholderText: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.3)",
  },
});
