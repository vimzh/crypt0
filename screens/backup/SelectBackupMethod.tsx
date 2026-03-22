import { View, Text, Pressable, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
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

const CloudUploadIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M8 16.5C5.8 16.5 4 14.9 4 12.9C4 11.2 5.2 9.8 6.8 9.4C6.8 9.3 6.8 9.2 6.8 9C6.8 6.8 8.6 5 10.8 5C11.4 5 12 5.2 12.5 5.4C13.5 3.9 15.2 3 17 3C20 3 22.5 5.5 22.5 8.5C22.5 8.7 22.5 8.9 22.4 9.1C23.4 9.9 24 11.1 24 12.5C24 14.7 22.2 16.5 20 16.5"
      stroke="white"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M14 13V21"
      stroke="white"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
    <Path
      d="M11.5 15.5L14 13L16.5 15.5"
      stroke="white"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const PencilIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M16.5 3.5L19.5 6L7.5 18L4 19L5 15.5L16.5 3.5Z"
      stroke="white"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M4 22H20"
      stroke="white"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
  </Svg>
);

const ChevronRight = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M9 6L15 12L9 18"
      stroke="white"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const SelectBackupMethod = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<OnboardingStackParamList>>();

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
                Your Secret Recovery Phrase
              </Text>
              <Text className="text-base" style={styles.bodyText}>
                <Text className="text-white">For your eyes only. </Text>
                <Text className="text-[#A87AD7]">Do not share</Text>
                <Text className="text-white">.</Text>
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
          </View>

          {/* Backup options */}
          <View className="px-4 pb-4 gap-4">
            <Pressable
              onPress={() => navigation.navigate("ICloudBackup")}
              className="flex-row items-center justify-between p-3 rounded"
              style={styles.optionCard}
            >
              <View className="flex-row items-center gap-3 flex-1">
                <CloudUploadIcon />
                <View className="flex-1 gap-1">
                  <Text
                    className="text-white text-base"
                    style={styles.bodyText}
                  >
                    iCloud Backup
                  </Text>
                  <Text
                    className="text-white/50 text-xs"
                    style={styles.captionText}
                  >
                    Encrypt your secret recovery phrase with a password.
                  </Text>
                </View>
              </View>
              <ChevronRight />
            </Pressable>

            <Pressable
              onPress={() => navigation.navigate("ManualBackup")}
              className="flex-row items-center justify-between p-3 rounded"
              style={styles.optionCard}
            >
              <View className="flex-row items-center gap-3 flex-1">
                <PencilIcon />
                <View className="flex-1 gap-1">
                  <Text
                    className="text-white text-base"
                    style={styles.bodyText}
                  >
                    Manual Backup
                  </Text>
                  <Text
                    className="text-white/50 text-xs"
                    style={styles.captionText}
                  >
                    Save your secret recovery phrase in a safe location.
                  </Text>
                </View>
              </View>
              <ChevronRight />
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
  optionCard: {
    backgroundColor: "#323232",
  },
});
