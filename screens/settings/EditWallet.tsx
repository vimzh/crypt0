import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
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
import type { WalletStackParamList } from "../../navigation/types";

const INITIAL_NAME = "rdpilot";

export const EditWallet = () => {
  const navigation = useNavigation<NativeStackNavigationProp<WalletStackParamList>>();
  const [walletName, setWalletName] = useState(INITIAL_NAME);

  const hasChanged = walletName.trim() !== INITIAL_NAME;

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

            {/* Title */}
            <View className="flex-1 items-center justify-center">
              <Text className="text-white" style={styles.navTitle}>
                Edit Wallet
              </Text>
            </View>

            {/* Right spacer */}
            <View className="w-11" />
          </View>

          {/* Content */}
          <View className="flex-1 px-4 pt-10">
            {/* Avatar */}
            <View className="items-center mb-10">
              <View className="relative">
                <Image
                  source={require("../../assets/intro/default-avatar.png")}
                  className="h-20 w-20 rounded-full"
                />
                {/* Edit badge */}
                <View
                  className="absolute items-center justify-center rounded-full bg-[#804FB0]"
                  style={styles.editBadge}
                >
                  <Svg width={10} height={10} viewBox="0 0 12 12" fill="none">
                    <Path
                      d="M8.5 1.5L10.5 3.5M1 11L1.5 8.5L9.5 0.5L11.5 2.5L3.5 10.5L1 11Z"
                      stroke="white"
                      strokeWidth={1.2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg>
                </View>
              </View>
            </View>

            {/* Input field */}
            <View>
              <Text className="text-white/60" style={styles.labelText}>
                Wallet Name
              </Text>
              <TextInput
                value={walletName}
                onChangeText={setWalletName}
                selectionColor="#804FB0"
                className="mt-2 text-white"
                style={styles.inputText}
              />
            </View>
          </View>

          {/* Save button */}
          <View className="px-4 pb-4">
            <Pressable
              onPress={() => hasChanged && console.log("Save:", walletName.trim())}
              className="w-full items-center justify-center bg-white p-4"
              style={{ opacity: hasChanged ? 1 : 0.3 }}
              disabled={!hasChanged}
            >
              <Text
                className="text-[black]"
                style={styles.buttonText}
              >
                Save
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  navTitle: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 16,
  },
  labelText: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 12,
  },
  inputText: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 24,
  },
  buttonText: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 18,
  },
  editBadge: {
    width: 20,
    height: 20,
    bottom: 0,
    right: 0,
  },
});
