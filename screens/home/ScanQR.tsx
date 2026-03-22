import { useState } from "react";
import { View, Text, Pressable, StyleSheet, Dimensions } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Svg, { Path, Line, Circle } from "react-native-svg";

import { BackArrow } from "../../components/BackArrow";

import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { WalletStackParamList } from "../../navigation/types";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const FRAME_SIZE = 250;
const CORNER_LENGTH = 30;
const CORNER_WIDTH = 3;

// -- SVG Icon Components --

const FlashOnIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </Svg>
);

const FlashOffIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    <Line x1={2} y1={2} x2={22} y2={22} />
  </Svg>
);

// -- Corner Bracket Component --

const CornerBracket = ({ position }: { position: "topLeft" | "topRight" | "bottomLeft" | "bottomRight" }) => {
  const isTop = position.includes("top");
  const isLeft = position.includes("Left");

  return (
    <View
      style={[
        styles.corner,
        {
          top: isTop ? -CORNER_WIDTH : undefined,
          bottom: !isTop ? -CORNER_WIDTH : undefined,
          left: isLeft ? -CORNER_WIDTH : undefined,
          right: !isLeft ? -CORNER_WIDTH : undefined,
          borderTopWidth: isTop ? CORNER_WIDTH : 0,
          borderBottomWidth: !isTop ? CORNER_WIDTH : 0,
          borderLeftWidth: isLeft ? CORNER_WIDTH : 0,
          borderRightWidth: !isLeft ? CORNER_WIDTH : 0,
        },
      ]}
    />
  );
};

// -- Main Screen --

export const ScanQR = () => {
  const navigation = useNavigation<NativeStackNavigationProp<WalletStackParamList>>();
  const [torchOn, setTorchOn] = useState(false);
  const [activeTab, setActiveTab] = useState<"wallet" | "walletconnect">("wallet");

  return (
    <View className="flex-1 bg-black">
      <StatusBar style="light" />

      <SafeAreaView className="flex-1" edges={["top", "bottom"]}>
        {/* Navbar */}
        <View className="flex-row items-center justify-between px-4 py-2">
          <Pressable onPress={() => navigation.goBack()} hitSlop={8}>
            <BackArrow />
          </Pressable>
          <Text style={styles.navTitle}>Scan</Text>
          <Pressable onPress={() => setTorchOn((prev) => !prev)} hitSlop={8}>
            {torchOn ? <FlashOnIcon /> : <FlashOffIcon />}
          </Pressable>
        </View>

        {/* Scanner Area */}
        <View className="flex-1 items-center justify-center">
          {/* Semi-transparent overlay with transparent center cutout */}
          <View style={styles.overlayContainer}>
            {/* Top overlay */}
            <View style={styles.overlayTop} />
            {/* Middle row */}
            <View style={styles.overlayMiddleRow}>
              {/* Left overlay */}
              <View style={styles.overlaySide} />
              {/* Transparent scan frame */}
              <View style={styles.scanFrame}>
                <CornerBracket position="topLeft" />
                <CornerBracket position="topRight" />
                <CornerBracket position="bottomLeft" />
                <CornerBracket position="bottomRight" />
              </View>
              {/* Right overlay */}
              <View style={styles.overlaySide} />
            </View>
            {/* Bottom overlay */}
            <View style={styles.overlayBottom} />
          </View>

          {/* Hint text */}
          <Text style={styles.hintText}>Align QR code within the frame</Text>
        </View>

        {/* Bottom Section */}
        <View className="items-center px-4 pb-6">
          {/* Pill Buttons */}
          <View className="flex-row gap-3 mb-5">
            <Pressable
              style={[
                styles.pillButton,
                activeTab === "wallet" ? styles.pillActive : styles.pillInactive,
              ]}
              onPress={() => setActiveTab("wallet")}
            >
              <Text
                style={[
                  styles.pillText,
                  { color: activeTab === "wallet" ? "white" : "rgba(255,255,255,0.6)" },
                ]}
              >
                Wallet Address
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.pillButton,
                activeTab === "walletconnect" ? styles.pillActive : styles.pillInactive,
              ]}
              onPress={() => setActiveTab("walletconnect")}
            >
              <Text
                style={[
                  styles.pillText,
                  { color: activeTab === "walletconnect" ? "white" : "rgba(255,255,255,0.6)" },
                ]}
              >
                WalletConnect
              </Text>
            </Pressable>
          </View>

          {/* Manual entry link */}
          <Pressable>
            <Text style={styles.manualEntryText}>Or enter address manually</Text>
          </Pressable>
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
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  overlayTop: {
    flex: 1,
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  overlayMiddleRow: {
    flexDirection: "row",
    height: FRAME_SIZE,
  },
  overlaySide: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  scanFrame: {
    width: FRAME_SIZE,
    height: FRAME_SIZE,
    backgroundColor: "transparent",
  },
  overlayBottom: {
    flex: 1,
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  corner: {
    position: "absolute",
    width: CORNER_LENGTH,
    height: CORNER_LENGTH,
    borderColor: "white",
  },
  hintText: {
    fontFamily: "IBMPlexMono_400Regular",
    fontSize: 14,
    color: "rgba(255,255,255,0.6)",
    textAlign: "center",
    marginTop: FRAME_SIZE / 2 + 24,
  },
  pillButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
  },
  pillActive: {
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  pillInactive: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  pillText: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 12,
  },
  manualEntryText: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 12,
    color: "#A87AD7",
    textAlign: "center",
  },
});
