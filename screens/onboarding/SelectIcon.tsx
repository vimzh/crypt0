import { View, Text, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Svg, { Circle, Path, Rect, Line } from "react-native-svg";

import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { OnboardingStackParamList } from "../../navigation/types";

const CameraIcon = ({ size = 24 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2v11z"
      stroke="white"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle
      cx="12"
      cy="13"
      r="4"
      stroke="white"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const GalleryIcon = ({ size = 24 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect
      x="3"
      y="3"
      width="18"
      height="18"
      rx="2"
      ry="2"
      stroke="white"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle
      cx="8.5"
      cy="8.5"
      r="1.5"
      stroke="white"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M21 15l-5-5L5 21"
      stroke="white"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const EmojiIcon = ({ size = 24 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle
      cx="12"
      cy="12"
      r="10"
      stroke="white"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8 14s1.5 2 4 2 4-2 4-2"
      stroke="white"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Line
      x1="9"
      y1="9"
      x2="9.01"
      y2="9"
      stroke="white"
      strokeWidth={2}
      strokeLinecap="round"
    />
    <Line
      x1="15"
      y1="9"
      x2="15.01"
      y2="9"
      stroke="white"
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Svg>
);

const CloseIcon = ({ size = 24 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Line
      x1="18"
      y1="6"
      x2="6"
      y2="18"
      stroke="white"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
    <Line
      x1="6"
      y1="6"
      x2="18"
      y2="18"
      stroke="white"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
  </Svg>
);

export const SelectIcon = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<OnboardingStackParamList>>();
  return (
    <View className="absolute inset-0">
      {/* Dimmed overlay */}
      <Pressable
        onPress={() => navigation.goBack()}
        className="flex-1 bg-black/60"
      />

      {/* Bottom sheet */}
      <View className="bg-[#1a1a1a] rounded-t-2xl p-6">
        {/* Header */}
        <View className="flex-row items-center justify-between mb-2">
          <Text className="text-white" style={styles.headerText}>
            Select Icon
          </Text>
          <Pressable
            onPress={() => navigation.goBack()}
            className="h-11 w-11 items-center justify-center"
          >
            <CloseIcon size={24} />
          </Pressable>
        </View>

        {/* Options */}
        <Pressable
          onPress={() => navigation.goBack()}
          className="py-4 flex-row gap-4 items-center"
        >
          <CameraIcon size={24} />
          <Text className="text-white" style={styles.optionText}>
            Take Photo
          </Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.goBack()}
          className="py-4 flex-row gap-4 items-center"
        >
          <GalleryIcon size={24} />
          <Text className="text-white" style={styles.optionText}>
            Choose image
          </Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate("EmojiAvatar")}
          className="py-4 flex-row gap-4 items-center"
        >
          <EmojiIcon size={24} />
          <Text className="text-white" style={styles.optionText}>
            Use emoji
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 18,
  },
  optionText: {
    fontFamily: "IBMPlexMono_400Regular",
    fontSize: 16,
  },
});
