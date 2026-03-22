import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { OnboardingStackParamList } from "../../navigation/types";

const welcomeBlob = require("../../assets/intro/welcome-blob.png");

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
  Dimensions.get("window");

export const Intro = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<OnboardingStackParamList>>();
  return (
    <View className="flex-1 bg-black">
      <StatusBar style="light" />

      {/* Full-screen blob image */}
      <Image
        source={welcomeBlob}
        style={styles.blob}
        resizeMode="cover"
      />

      <SafeAreaView className="flex-1">
        <View className="flex-1 justify-end px-4 pb-4">
          {/* Text content */}
          <View className="items-center gap-4 w-full mb-8">
            <Text className="text-white text-lg" style={styles.headingText}>
              Welcome to Crypt0
            </Text>
            <Text
              className="text-white text-base text-center"
              style={styles.bodyText}
            >
              Create a brand new wallet or add an existing one to get started
              easily.
            </Text>
          </View>

          {/* Buttons */}
          <View className="gap-2 w-full">
            <Pressable
              onPress={() => navigation.navigate("SetWalletName")}
              className="w-full items-center justify-center bg-white p-4"
            >
              <Text
                className="text-black text-lg"
                style={styles.buttonText}
              >
                Create a New Wallet
              </Text>
            </Pressable>

            <Pressable
              onPress={() => console.log("Add existing wallet")}
              className="w-full items-center justify-center border border-white bg-black p-4"
            >
              <Text
                className="text-white text-lg"
                style={styles.buttonText}
              >
                Add an Existing Wallet
              </Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  blob: {
    position: "absolute",
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    top: 0,
    left: 0,
  },
  headingText: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 18,
  },
  bodyText: {
    fontFamily: "IBMPlexMono_400Regular",
    fontSize: 16,
  },
  buttonText: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 18,
  },
});
