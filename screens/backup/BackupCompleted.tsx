import { View, Text, Pressable, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Circle, Path } from "react-native-svg";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RouteProp } from "@react-navigation/native";

import { BackArrow } from "../../components/BackArrow";
import type { OnboardingStackParamList } from "../../navigation/types";

const TITLES: Record<"icloud" | "manual", string> = {
  icloud: "iCloud Backup Completed ✅",
  manual: "Manual Backup Completed ✅",
};

export const BackupCompleted = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<OnboardingStackParamList>>();
  const route =
    useRoute<RouteProp<OnboardingStackParamList, "BackupCompleted">>();
  const type = route.params.type;

  return (
    <View className="flex-1 bg-black">
      <StatusBar style="light" />

      <SafeAreaView className="flex-1">
        <View className="flex-1 justify-between">
          {/* Navbar */}
          <View className="px-4 py-3">
            <Pressable onPress={() => navigation.goBack()} hitSlop={8}>
              <BackArrow />
            </Pressable>
          </View>

          {/* Center content */}
          <View className="flex-1 items-center justify-center px-4">
            {/* Checkmark circle */}
            <Svg width={247} height={247} viewBox="0 0 247 247" fill="none">
              <Circle
                cx={123.5}
                cy={123.5}
                r={118}
                stroke="white"
                strokeWidth={3}
              />
              <Path
                d="M75 123.5L110 158.5L172 96.5"
                stroke="white"
                strokeWidth={5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>

            {/* Title */}
            <Text className="text-white mt-8 text-center" style={styles.headingText}>
              {TITLES[type]}
            </Text>

            {/* Subtitle */}
            <Text
              className="text-white/60 mt-3 text-center"
              style={styles.subtitleText}
            >
              {"This wallet was successfully\nbacked up."}
            </Text>
          </View>

          {/* Bottom button */}
          <View className="px-4 pb-4">
            <Pressable
              onPress={() => navigation.navigate("EnablePermissions")}
              className="w-full items-center justify-center bg-white p-4"
            >
              <Text className="text-black text-lg" style={styles.buttonText}>
                View Wallet
              </Text>
            </Pressable>
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
  subtitleText: {
    fontFamily: "IBMPlexMono_400Regular",
    fontSize: 16,
  },
  buttonText: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 18,
  },
});
