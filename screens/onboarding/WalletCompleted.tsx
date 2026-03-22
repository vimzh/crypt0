import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { OnboardingStackParamList } from "../../navigation/types";

const defaultAvatar = require("../../assets/intro/default-avatar.png");

export const WalletCompleted = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<OnboardingStackParamList>>();
  const walletName = "rdpilot";
  return (
    <View className="flex-1 bg-[black]">
      <StatusBar style="light" />

      <SafeAreaView className="flex-1">
        <View className="flex-1 justify-between">
          {/* Center content */}
          <View className="flex-1 items-center justify-center px-4">
            {/* Title */}
            <Text className="text-lg mb-6" style={styles.headingText}>
              <Text className="text-white">Your wallet is </Text>
              <Text className="text-[#A87AD7]">ready ✨</Text>
            </Text>

            {/* Wallet card */}
            <View
              className="w-[343px] overflow-hidden"
              style={styles.walletCard}
            >
              <View className="p-6" style={styles.walletCardInner}>
                {/* Top row: avatar + name */}
                <View className="flex-row items-center justify-between w-full">
                  <Image
                    source={defaultAvatar}
                    className="rounded-full"
                    style={styles.avatar}
                  />
                  <Text className="text-white text-base" style={styles.bodyText}>
                    {walletName}
                  </Text>
                </View>

                {/* Bottom: address + balance */}
                <View className="mt-14 gap-[9px]">
                  <Text
                    className="text-white text-base"
                    style={styles.bodyText}
                  >
                    0x29e...76ef
                  </Text>
                  <Text
                    className="text-white text-base"
                    style={styles.semiBoldText}
                  >
                    0 ETH
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Bottom section */}
          <View className="px-4 pb-4 gap-4">
            {/* Caption */}
            <Text className="text-xs text-center" style={styles.captionText}>
              <Text className="text-white/60">
                "Backing up" means saving your wallet's{" "}
              </Text>
              <Text className="text-[#A87AD7]">secret recovery phrase</Text>
              <Text className="text-white/60">
                {" "}
                in a secure location that you control
              </Text>
            </Text>

            {/* Buttons */}
            <View className="gap-2">
              <Pressable
                onPress={() => navigation.navigate("SelectBackupMethod")}
                className="w-full items-center justify-center bg-white p-4"
              >
                <Text
                  className="text-[black] text-lg"
                  style={styles.buttonText}
                >
                  Back Up Now
                </Text>
              </Pressable>

              <Pressable
                onPress={() => navigation.navigate("EnablePermissions")}
                className="w-full items-center justify-center border border-white bg-[black] p-4"
              >
                <Text
                  className="text-white text-lg"
                  style={styles.buttonText}
                >
                  Do it Later
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  headingText: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 18,
  },
  bodyText: {
    fontFamily: "IBMPlexMono_400Regular",
    fontSize: 16,
  },
  semiBoldText: {
    fontFamily: "IBMPlexMono_600SemiBold",
    fontSize: 16,
  },
  captionText: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 12,
  },
  buttonText: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 18,
  },
  walletCard: {
    backgroundColor: "rgba(128, 79, 176, 0.15)",
    height: 195,
  },
  walletCardInner: {
    borderWidth: 1,
    borderColor: "#804FB0",
    borderRadius: 4,
  },
  avatar: {
    width: 40,
    height: 40,
  },
});
