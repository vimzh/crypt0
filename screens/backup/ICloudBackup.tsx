import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { BackArrow } from "../../components/BackArrow";
import type { OnboardingStackParamList } from "../../navigation/types";

const EyeIcon = ({ visible }: { visible: boolean }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    {visible ? (
      <>
        <Path
          d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
          stroke="white"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
          stroke="white"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ) : (
      <>
        <Path
          d="M17.94 17.94C16.2306 19.243 14.1491 19.9649 12 20C5 20 1 12 1 12C2.24389 9.68192 3.96914 7.65663 6.06 6.06M9.9 4.24C10.5883 4.07888 11.2931 3.99834 12 4C19 4 23 12 23 12C22.393 13.1356 21.6691 14.2048 20.84 15.19M14.12 14.12C13.8454 14.4148 13.5141 14.6512 13.1462 14.8151C12.7782 14.9791 12.3809 15.0673 11.9781 15.0744C11.5753 15.0815 11.1752 15.0074 10.8016 14.8565C10.4281 14.7056 10.0887 14.4811 9.80385 14.1962C9.51897 13.9113 9.29439 13.5719 9.14351 13.1984C8.99262 12.8248 8.91853 12.4247 8.92563 12.0219C8.93274 11.6191 9.02091 11.2218 9.18488 10.8538C9.34884 10.4859 9.58525 10.1546 9.88 9.88"
          stroke="white"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M1 1L23 23"
          stroke="white"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    )}
  </Svg>
);

export const ICloudBackup = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<OnboardingStackParamList>>();
  const [password, setPassword] = useState("");
  const [secureEntry, setSecureEntry] = useState(true);

  const canContinue = password.length > 0;

  return (
    <View className="flex-1 bg-black">
      <StatusBar style="light" />

      <SafeAreaView className="flex-1">
        <KeyboardAvoidingView
          className="flex-1"
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          {/* Navbar */}
          <View className="h-11 flex-row items-center px-4">
            {/* Back button */}
            <Pressable
              onPress={() => navigation.goBack()}
              className="h-11 w-11 items-center justify-center"
            >
              <BackArrow size={20} />
            </Pressable>
          </View>

          {/* Content */}
          <View className="flex-1 px-4 pt-10">
            {/* Header */}
            <View className="gap-4">
              <Text className="text-white text-lg" style={styles.headingText}>
                iCloud Backup
              </Text>
              <Text className="text-white/60 text-base" style={styles.bodyText}>
                Choose a strong password to secure your new iCloud Backup.
              </Text>
            </View>

            {/* Password input */}
            <View className="mt-6 flex-row items-center">
              <View className="h-[29px] w-px bg-[#804FB0]" />
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Enter Password"
                placeholderTextColor="rgba(255,255,255,0.3)"
                selectionColor="#804FB0"
                secureTextEntry={secureEntry}
                className="flex-1 text-white text-2xl"
                style={styles.inputText}
                autoFocus
              />
              <Pressable
                onPress={() => setSecureEntry((prev) => !prev)}
                className="h-11 w-11 items-center justify-center"
              >
                <EyeIcon visible={!secureEntry} />
              </Pressable>
            </View>
          </View>

          {/* Continue button */}
          <View className="px-4 pb-4">
            <Pressable
              onPress={() =>
                canContinue &&
                navigation.navigate("BackupCompleted", { type: "icloud" })
              }
              className="w-full items-center justify-center bg-white p-4"
              style={{ opacity: canContinue ? 1 : 0.3 }}
              disabled={!canContinue}
            >
              <Text
                className="text-black text-lg"
                style={styles.buttonText}
              >
                Continue
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
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
  inputText: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 24,
  },
  buttonText: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 18,
  },
});
