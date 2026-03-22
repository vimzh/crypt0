import { View, Text, Pressable, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path, Rect } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { BackArrow } from "../../components/BackArrow";
import type { OnboardingStackParamList } from "../../navigation/types";

const SEED_WORDS = [
  "physical",
  "vote",
  "apple",
  "eager",
  "income",
  "obey",
  "summer",
  "other",
  "purpose",
  "radar",
  "avoid",
  "draw",
];

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

export const ManualBackup = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<OnboardingStackParamList>>();
  const handleCopy = () => {
    // Copy seed phrase to clipboard
  };

  return (
    <View className="flex-1 bg-black">
      <StatusBar style="light" />

      <SafeAreaView className="flex-1">
        <View className="flex-1 justify-between">
          <View>
            {/* Navbar - back arrow only, no progress */}
            <View className="h-11 flex-row items-center px-4">
              <Pressable
                onPress={() => navigation.goBack()}
                className="h-11 w-11 items-center justify-center"
              >
                <BackArrow size={20} />
              </Pressable>
            </View>

            {/* Header */}
            <View className="px-4 mt-10 gap-4">
              <Text className="text-white text-lg" style={styles.headingText}>
                Manual Backup
              </Text>
              <Text
                className="text-white/60 text-base"
                style={styles.bodyText}
              >
                Save your secret recovery phrase in a safe location.
              </Text>
            </View>

            {/* Seed phrase grid */}
            <View className="mx-4 mt-6" style={styles.seedBox}>
              <View className="flex-row flex-wrap">
                {SEED_WORDS.map((word, index) => (
                  <View key={index} style={styles.seedWordCell}>
                    <Text className="text-white" style={styles.seedWordText}>
                      {index + 1}. {word}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Copy to Clipboard */}
            <Pressable
              onPress={handleCopy}
              className="flex-row items-center justify-center gap-2 mt-6"
            >
              <CopyIcon />
              <Text
                className="text-white/60 text-sm"
                style={styles.seedWordText}
              >
                Copy to Clipboard
              </Text>
            </Pressable>
          </View>

          {/* Bottom section */}
          <View className="px-4 pb-4 gap-4">
            <Text
              className="text-white/60 text-center"
              style={styles.captionText}
            >
              Next, you'll be asked to confirm the position of certain words.
            </Text>

            <Pressable
              onPress={() => navigation.navigate("VerifyBackup")}
              className="w-full items-center justify-center bg-white p-4"
            >
              <Text className="text-black text-lg" style={styles.buttonText}>
                I Understand, Continue
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
  seedBox: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.5)",
    borderRadius: 4,
    padding: 16,
  },
  seedWordCell: {
    width: "33.33%",
    paddingVertical: 12,
  },
  seedWordText: {
    fontFamily: "IBMPlexMono_400Regular",
    fontSize: 14,
  },
  buttonText: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 18,
  },
});
