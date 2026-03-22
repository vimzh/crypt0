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
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

import { BackArrow } from "../../components/BackArrow";

import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { OnboardingStackParamList } from "../../navigation/types";

export const SetWalletName = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<OnboardingStackParamList>>();
  const [walletName, setWalletName] = useState("");

  const canContinue = walletName.trim().length > 0;

  return (
    <View className="flex-1 bg-[black]">
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

            {/* Progress indicator */}
            <View className="flex-1 flex-row items-center justify-center gap-1">
              <View className="h-px w-[38px] bg-white" />
              <View className="h-px w-[38px] bg-white/30" />
              <View className="h-px w-[38px] bg-white/30" />
            </View>

            {/* Right spacer */}
            <View className="w-11" />
          </View>

          {/* Content */}
          <View className="flex-1 px-4 pt-10">
            {/* Header */}
            <View className="gap-4">
              <Text className="text-white text-lg" style={styles.headingText}>
                Name Your Wallet
              </Text>
              <Text className="text-white/60 text-base" style={styles.bodyText}>
                Choose a nickname for your wallet
              </Text>
            </View>

            {/* Text input */}
            <View className="mt-6 flex-row items-center">
              <View className="h-[29px] w-px bg-[#804FB0]" />
              <TextInput
                value={walletName}
                onChangeText={setWalletName}
                placeholder="My New Wallet"
                placeholderTextColor="rgba(255,255,255,0.3)"
                selectionColor="#804FB0"
                className="flex-1 text-white text-2xl"
                style={styles.inputText}
                autoFocus
              />
            </View>

            {/* Helper text */}
            <Text
              className="mt-6 text-white/60 text-xs"
              style={styles.captionText}
            >
              Your nickname is stored locally on your device. it will only be
              visible to you.
            </Text>
          </View>

          {/* Continue button */}
          <View className="px-4 pb-4">
            <Pressable
              onPress={() =>
                canContinue && navigation.navigate("SetDisplayImage")
              }
              className="w-full items-center justify-center bg-white p-4"
              style={{ opacity: canContinue ? 1 : 0.3 }}
              disabled={!canContinue}
            >
              <Text
                className="text-[black] text-lg"
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
  captionText: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 12,
  },
  buttonText: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 18,
  },
});
