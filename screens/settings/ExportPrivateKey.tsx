import { View, Text, Pressable, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path, Rect } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { BackArrow } from "../../components/BackArrow";
import type { WalletStackParamList } from "../../navigation/types";

const PRIVATE_KEY =
  "0x8da4ef21b864d2cc526dbdb2a120bd2874c36c9d0a1fb7f8c63d7f7a8b41de8f";

const WarningIcon = () => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
    <Path
      d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
      stroke="#BC3C20"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 9v4"
      stroke="#BC3C20"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 17h.01"
      stroke="#BC3C20"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const CopyIcon = () => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
    <Rect
      x={9}
      y={9}
      width={13}
      height={13}
      rx={2}
      stroke="white"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M5 15H4C2.89543 15 2 14.1046 2 13V4C2 2.89543 2.89543 2 4 2H13C14.1046 2 15 2.89543 15 4V5"
      stroke="white"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const ExportPrivateKey = () => {
  const navigation = useNavigation<NativeStackNavigationProp<WalletStackParamList>>();
  const handleCopy = () => {
    // Copy private key to clipboard
  };

  return (
    <View className="flex-1 bg-black">
      <StatusBar style="light" />

      <SafeAreaView className="flex-1">
        <View className="flex-1 justify-between">
          <View>
            {/* Navbar */}
            <View className="h-11 flex-row items-center justify-between px-4">
              <Pressable
                onPress={() => navigation.goBack()}
                className="h-11 w-11 items-center justify-center"
              >
                <BackArrow size={20} />
              </Pressable>
              <Text className="text-white" style={styles.navTitle}>
                Private Key
              </Text>
              <View className="w-11" />
            </View>

            {/* Warning banner */}
            <View className="mx-4 mt-6" style={styles.warningBanner}>
              <View className="flex-row items-center gap-2">
                <WarningIcon />
                <Text style={styles.warningTitle}>
                  Never share your private key
                </Text>
              </View>
              <Text className="mt-2" style={styles.warningBody}>
                Anyone with your private key can steal your funds. Crypt0 will
                never ask for it.
              </Text>
            </View>

            {/* Private key display */}
            <View className="mx-4 mt-6" style={styles.keyBox}>
              <Text selectable className="text-white" style={styles.keyText}>
                {PRIVATE_KEY}
              </Text>
            </View>

            {/* Copy to Clipboard */}
            <Pressable
              onPress={handleCopy}
              className="flex-row items-center justify-center gap-2 mt-6 opacity-60"
            >
              <CopyIcon />
              <Text className="text-white" style={styles.copyText}>
                Copy to Clipboard
              </Text>
            </Pressable>
          </View>

          {/* Bottom section */}
          <View className="px-4 pb-4">
            <Pressable
              onPress={() => navigation.goBack()}
              className="w-full items-center justify-center bg-white p-4"
            >
              <Text className="text-black" style={styles.buttonText}>
                Done
              </Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  navTitle: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 16,
  },
  warningBanner: {
    backgroundColor: "rgba(188,60,32,0.15)",
    borderWidth: 1,
    borderColor: "#BC3C20",
    borderRadius: 8,
    padding: 16,
  },
  warningTitle: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 14,
    color: "#BC3C20",
  },
  warningBody: {
    fontFamily: "IBMPlexMono_400Regular",
    fontSize: 12,
    color: "rgba(255,255,255,0.6)",
  },
  keyBox: {
    backgroundColor: "#1a1a1a",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.5)",
    borderRadius: 4,
    padding: 16,
  },
  keyText: {
    fontFamily: "IBMPlexMono_400Regular",
    fontSize: 14,
  },
  copyText: {
    fontFamily: "IBMPlexMono_400Regular",
    fontSize: 14,
  },
  buttonText: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 18,
  },
});
