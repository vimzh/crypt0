import { View, Text, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path, Circle } from "react-native-svg";

import { BackArrow } from "../../components/BackArrow";

import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../navigation/types";

const CameraIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 7C3 5.9 3.9 5 5 5H7L9 3H15L17 5H19C20.1 5 21 5.9 21 7V18C21 19.1 20.1 20 19 20H5C3.9 20 3 19.1 3 18V7Z"
      stroke="white"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle
      cx={12}
      cy={12.5}
      r={3.5}
      stroke="white"
      strokeWidth={1.5}
    />
  </Svg>
);

const BellIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M18 8C18 6.4 17.4 4.9 16.2 3.8C15.1 2.6 13.6 2 12 2C10.4 2 8.9 2.6 7.8 3.8C6.6 4.9 6 6.4 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
      stroke="white"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M13.7 21C13.5 21.3 13.3 21.6 12.9 21.8C12.6 21.9 12.3 22 12 22C11.7 22 11.4 21.9 11.1 21.8C10.7 21.6 10.5 21.3 10.3 21"
      stroke="white"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const GreenCheckCircleIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Circle cx={12} cy={12} r={10} fill="#22C55E" />
    <Path
      d="M8 12L11 15L16 9"
      stroke="white"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const EnablePermissionsDone = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View className="flex-1 bg-black">
      <StatusBar style="light" />

      <SafeAreaView className="flex-1">
        <View className="flex-1 justify-between">
          <View>
            {/* Navbar */}
            <View className="h-11 flex-row items-center px-4">
              {/* Back button */}
              <Pressable
                onPress={() => navigation.goBack()}
                className="h-11 w-11 items-center justify-center"
              >
                <BackArrow size={20} />
              </Pressable>

              {/* Progress indicator - step 3 active */}
              <View className="flex-1 flex-row items-center justify-center gap-1">
                <View className="h-px w-[38px] bg-white/30" />
                <View className="h-px w-[38px] bg-white/30" />
                <View className="h-px w-[38px] bg-white" />
              </View>

              {/* Right spacer */}
              <View className="w-11" />
            </View>

            {/* Header */}
            <View className="px-4 mt-10 gap-4">
              <Text className="text-white text-lg" style={styles.headingText}>
                Enable Permissions
              </Text>
              <Text className="text-white/60 text-base" style={styles.bodyText}>
                For the best experience, please allow access to the following
                permissions.
              </Text>
            </View>

            {/* Permission cards */}
            <View className="px-4 mt-6 gap-6">
              {/* Camera card */}
              <View>
                <View
                  className="flex-row items-center p-3 rounded"
                  style={styles.optionCard}
                >
                  <CameraIcon />
                  <View className="flex-1 gap-1 ml-3">
                    <Text
                      className="text-white text-base"
                      style={styles.bodyText}
                    >
                      Camera
                    </Text>
                    <Text
                      className="text-white/50 text-xs"
                      style={styles.captionText}
                    >
                      Enabled
                    </Text>
                  </View>
                  <GreenCheckCircleIcon />
                </View>
                <Text
                  className="text-white/60 text-xs mt-2"
                  style={styles.captionText}
                >
                  Scan QR codes to scan wallet address and connect to apps.
                </Text>
              </View>

              {/* Notifications card */}
              <View>
                <View
                  className="flex-row items-center p-3 rounded"
                  style={styles.optionCard}
                >
                  <BellIcon />
                  <View className="flex-1 gap-1 ml-3">
                    <Text
                      className="text-white text-base"
                      style={styles.bodyText}
                    >
                      Notifications
                    </Text>
                    <Text
                      className="text-white/50 text-xs"
                      style={styles.captionText}
                    >
                      Enabled
                    </Text>
                  </View>
                  <GreenCheckCircleIcon />
                </View>
                <Text
                  className="text-white/60 text-xs mt-2"
                  style={styles.captionText}
                >
                  Get notified of new wallet activity and other important
                  events.
                </Text>
              </View>
            </View>
          </View>

          {/* Bottom section */}
          <View className="px-4 pb-4 gap-4">
            <Text
              className="text-white/60 text-xs text-center"
              style={styles.captionText}
            >
              You can always change your preferences later.
            </Text>
            <Pressable
              onPress={() =>
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Main" as never }],
                })
              }
              className="w-full items-center justify-center bg-white p-4"
            >
              <Text
                className="text-black text-lg"
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
  optionCard: {
    backgroundColor: "#323232",
  },
});
