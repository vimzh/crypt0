import { View, Text, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";

import { BackArrow } from "../../components/BackArrow";

import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { OnboardingStackParamList } from "../../navigation/types";

const PencilIcon = ({ size = 16 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <Path
      d="M11.333 1.333a1.886 1.886 0 0 1 2.667 0l.667.667a1.886 1.886 0 0 1 0 2.667L5.333 14H2v-3.333l9.333-9.334ZM10 4l2 2"
      stroke="white"
      strokeWidth={1.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const EmojiAvatar = () => {
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

          {/* Avatar circle with emoji */}
          <View className="items-center justify-center">
            <View style={styles.avatarCircle}>
              <Text style={styles.emoji}>🐸</Text>

              {/* Pencil icon at bottom-right */}
              <View style={styles.pencilBadge}>
                <PencilIcon size={16} />
              </View>
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
  avatarCircle: {
    width: 247,
    height: 247,
    borderRadius: 247 / 2,
    borderWidth: 1,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  emoji: {
    fontSize: 80,
  },
  pencilBadge: {
    position: "absolute",
    bottom: 16,
    right: 16,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
});
