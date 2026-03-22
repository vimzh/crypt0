import { View, Text, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Line } from "react-native-svg";

import { BackArrow } from "../../components/BackArrow";

import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { OnboardingStackParamList } from "../../navigation/types";

const Crosshair = ({ size = 119 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 119 119" fill="none">
    <Line x1="0" y1="59.5" x2="119" y2="59.5" stroke="white" strokeWidth={1} />
    <Line x1="59.5" y1="0" x2="59.5" y2="119" stroke="white" strokeWidth={1} />
  </Svg>
);

export const SetDisplayImage = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<OnboardingStackParamList>>();
  return (
    <View className="flex-1 bg-[black]">
      <StatusBar style="light" />

      <SafeAreaView className="flex-1">
        <View className="flex-1 justify-between">
          <View>
            {/* Navbar */}
            <View className="h-11 flex-row items-center px-4">
              <Pressable
                onPress={() => navigation.goBack()}
                className="h-11 w-11 items-center justify-center"
              >
                <BackArrow size={20} />
              </Pressable>

              <View className="flex-1 flex-row items-center justify-center gap-1">
                <View className="h-px w-[38px] bg-white/30" />
                <View className="h-px w-[38px] bg-white" />
                <View className="h-px w-[38px] bg-white/30" />
              </View>

              <View className="w-11" />
            </View>

            {/* Header */}
            <View className="px-4 mt-10 gap-4">
              <Text className="text-white text-lg" style={styles.headingText}>
                Set a Display Image
              </Text>
              <Text className="text-white/60 text-base" style={styles.bodyText}>
                Let's choose an avatar for your wallet. This is visible only to
                you.
              </Text>
            </View>
          </View>

          {/* Dashed square with crosshair */}
          <View className="items-center justify-center">
            <View style={styles.dashedBox}>
              <Crosshair size={119} />
            </View>
          </View>

          {/* Bottom section */}
          <View className="px-4 pb-4 gap-6">
            <Text
              className="text-white/60 text-xs text-center"
              style={styles.captionText}
            >
              You can always change your image later.
            </Text>

            <Pressable
              onPress={() => navigation.navigate("WalletCompleted")}
              className="w-full items-center justify-center bg-white p-4"
            >
              <Text
                className="text-[black] text-lg"
                style={styles.buttonText}
              >
                Continue
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
  bodyText: {
    fontFamily: "IBMPlexMono_400Regular",
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
  dashedBox: {
    width: 247,
    height: 247,
    borderWidth: 1,
    borderColor: "white",
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
  },
});
