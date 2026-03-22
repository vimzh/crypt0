import { View, Text, Pressable, ScrollView, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { BackArrow } from "../../components/BackArrow";
import type { OnboardingStackParamList } from "../../navigation/types";

type Quiz = {
  position: number;
  options: string[];
  correct: string;
  selected: string;
};

const QUIZZES: Quiz[] = [
  { position: 3, options: ["vote", "obey", "apple"], correct: "apple", selected: "vote" },
  { position: 9, options: ["eager", "purpose", "other"], correct: "purpose", selected: "purpose" },
  { position: 11, options: ["radar", "avoid", "income"], correct: "avoid", selected: "radar" },
];

export const VerifyBackupFilled = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<OnboardingStackParamList>>();

  return (
    <View className="flex-1 bg-black">
      <StatusBar style="light" />

      <SafeAreaView className="flex-1">
        {/* Navbar */}
        <View className="h-11 flex-row items-center px-4">
          <Pressable
            onPress={() => navigation.goBack()}
            className="h-11 w-11 items-center justify-center"
          >
            <BackArrow size={20} />
          </Pressable>
        </View>

        {/* Scrollable content */}
        <ScrollView className="flex-1" contentContainerStyle={{ padding: 16 }}>
          {/* Header */}
          <View className="gap-4 mb-6">
            <Text className="text-white text-lg" style={styles.headingText}>
              Confirm Backup
            </Text>
            <Text className="text-white/60 text-base" style={styles.bodyText}>
              Complete this quick test to confirm you've saved everything
              correctly.
            </Text>
          </View>

          {/* Quiz sections */}
          <View className="gap-6">
            {QUIZZES.map((quiz) => {
              const isCorrect = quiz.selected === quiz.correct;

              return (
                <View key={quiz.position} className="gap-3">
                  <View style={styles.answerBox}>
                    <Text
                      className="text-white text-lg"
                      style={styles.headingText}
                    >
                      {quiz.position}. {quiz.selected}
                    </Text>
                  </View>

                  <View className="flex-row gap-4">
                    {quiz.options.map((word) => {
                      const isSelected = quiz.selected === word;
                      const chipBorderColor = isSelected
                        ? isCorrect
                          ? "#804FB0"
                          : "#FF0000"
                        : "rgba(255,255,255,0.5)";

                      return (
                        <View
                          key={word}
                          style={[
                            styles.chip,
                            { borderColor: chipBorderColor },
                          ]}
                        >
                          <Text
                            className="text-white text-base text-center"
                            style={styles.bodyText}
                          >
                            {word}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>

        {/* Confirm button — full opacity since all answered */}
        <View className="px-4 pb-4 pt-2">
          <Pressable
            onPress={() =>
              navigation.navigate("BackupCompleted", { type: "manual" })
            }
            className="w-full items-center justify-center bg-white p-4"
            style={{ opacity: 1 }}
          >
            <Text className="text-black text-lg" style={styles.buttonText}>
              Confirm
            </Text>
          </Pressable>
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
  answerBox: {
    backgroundColor: "#323232",
    borderRadius: 4,
    padding: 16,
    width: "100%",
  },
  chip: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.5)",
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  buttonText: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 18,
  },
});
