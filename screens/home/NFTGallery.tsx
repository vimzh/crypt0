import { View, Text, Pressable, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Svg, {
  Path,
  Rect,
  Defs,
  Stop,
  LinearGradient as SvgLinearGradient,
} from "react-native-svg";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { BackArrow } from "../../components/BackArrow";
import type { WalletStackParamList } from "../../navigation/types";

// -- Share Icon --

const ShareIcon = () => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
    <Path d="M16 6l-4-4-4 4" />
    <Path d="M12 2v13" />
  </Svg>
);

// -- Dot Indicator --

const DotIndicator = ({ active }: { active: boolean }) => (
  <View
    style={[
      styles.dot,
      { backgroundColor: active ? "white" : "rgba(255, 255, 255, 0.3)" },
    ]}
  />
);

// -- Full-Screen Image Placeholder --

const NFTImagePlaceholder = () => (
  <View className="flex-1" style={styles.imagePlaceholder}>
    <Svg
      width="100%"
      height="100%"
      viewBox="0 0 400 600"
      preserveAspectRatio="xMidYMid slice"
    >
      <Defs>
        <SvgLinearGradient id="galleryGrad" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#6B3FA0" stopOpacity="0.3" />
          <Stop offset="1" stopColor="#3B5998" stopOpacity="0.3" />
        </SvgLinearGradient>
      </Defs>
      <Rect x={0} y={0} width={400} height={600} fill="#1a1a1a" />
      <Rect x={0} y={0} width={400} height={600} fill="url(#galleryGrad)" />
    </Svg>
    <View style={styles.placeholderTextContainer}>
      <Text style={styles.placeholderText}>NFT Image</Text>
    </View>
  </View>
);

// -- Main Screen --

export const NFTGallery = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<WalletStackParamList>>();
  const insets = useSafeAreaInsets();

  const currentIndex = 0;
  const totalCount = 4;

  return (
    <View className="flex-1 bg-black">
      <StatusBar hidden />

      {/* Full-screen NFT image */}
      <NFTImagePlaceholder />

      {/* Top overlay */}
      <View
        className="absolute left-0 right-0 flex-row items-center justify-between px-4"
        style={{ top: insets.top }}
      >
        <Pressable onPress={() => navigation.goBack()} className="p-2">
          <BackArrow />
        </Pressable>
        <Text style={styles.counter}>
          {currentIndex + 1} / {totalCount}
        </Text>
        <Pressable className="p-2">
          <ShareIcon />
        </Pressable>
      </View>

      {/* Bottom overlay with gradient */}
      <LinearGradient
        colors={["transparent", "rgba(0, 0, 0, 0.8)"]}
        className="absolute left-0 right-0"
        style={{ bottom: 0, paddingBottom: insets.bottom + 16 }}
      >
        <View className="px-4 pt-8">
          <Text style={styles.nftName}>CloneX #5572</Text>
          <Text style={styles.collectionName}>CLONE X</Text>

          {/* Dot indicators */}
          <View
            className="flex-row items-center justify-center mt-4"
            style={styles.dotsRow}
          >
            {Array.from({ length: totalCount }).map((_, i) => (
              <DotIndicator key={i} active={i === currentIndex} />
            ))}
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  counter: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 14,
    color: "white",
  },
  imagePlaceholder: {
    backgroundColor: "#1a1a1a",
  },
  placeholderTextContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.3)",
  },
  nftName: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 16,
    color: "white",
  },
  collectionName: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.6)",
    marginTop: 4,
  },
  dotsRow: {
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
