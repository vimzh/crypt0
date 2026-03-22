import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { BackArrow } from "../../components/BackArrow";
import type { WalletStackParamList } from "../../navigation/types";

// -- Chevron Icon --

const ChevronRight = () => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
    <Path
      d="M9 18l6-6-6-6"
      stroke="rgba(255, 255, 255, 0.3)"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// -- Info Row --

const InfoRow = ({
  label,
  value,
  isLast,
}: {
  label: string;
  value: string;
  isLast?: boolean;
}) => (
  <View
    style={[
      styles.row,
      !isLast && styles.rowBorder,
    ]}
  >
    <Text style={styles.rowLabel}>{label}</Text>
    <Text style={styles.rowValue}>{value}</Text>
  </View>
);

// -- Legal Row --

const LegalRow = ({
  label,
  isLast,
  onPress,
}: {
  label: string;
  isLast?: boolean;
  onPress?: () => void;
}) => (
  <Pressable
    onPress={onPress}
    style={[
      styles.row,
      !isLast && styles.rowBorder,
    ]}
  >
    <Text style={styles.rowLabel}>{label}</Text>
    <ChevronRight />
  </Pressable>
);

// -- Main Screen --

export const About = () => {
  const navigation = useNavigation<NativeStackNavigationProp<WalletStackParamList>>();
  return (
    <View className="flex-1 bg-black">
      <StatusBar style="light" />

      <SafeAreaView className="flex-1" edges={["top"]}>
        {/* Navbar */}
        <View className="flex-row items-center justify-between px-4 py-2">
          <Pressable onPress={() => navigation.goBack()} className="p-2">
            <BackArrow />
          </Pressable>
          <Text style={styles.navTitle}>About</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView className="flex-1">
          {/* App Logo */}
          <View className="items-center mt-8">
            <View style={styles.logoCircle}>
              <Text style={styles.logoText}>C0</Text>
            </View>
            <Text style={styles.appName}>Crypt0</Text>
            <Text style={styles.versionText}>Version 1.0.0</Text>
          </View>

          {/* Info Section */}
          <View style={styles.card} className="mx-4 mt-8">
            <InfoRow label="Website" value="crypt0.app" />
            <InfoRow label="Twitter" value="@crypt0wallet" />
            <InfoRow label="Discord" value="discord.gg/crypt0" />
            <InfoRow label="GitHub" value="github.com/crypt0" isLast />
          </View>

          {/* Legal Section */}
          <View style={styles.card} className="mx-4 mt-4">
            <LegalRow label="Terms of Service" />
            <LegalRow label="Privacy Policy" />
            <LegalRow label="Licenses" isLast />
          </View>

          {/* Footer */}
          <View className="items-center mt-8 mb-8">
            <Text style={styles.footerText}>Made with ♥ by rdpilot</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  navTitle: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 14,
    color: "white",
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#804FB0",
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    fontFamily: "IBMPlexMono_600SemiBold",
    fontSize: 48,
    color: "white",
  },
  appName: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 24,
    color: "white",
    marginTop: 12,
  },
  versionText: {
    fontFamily: "IBMPlexMono_400Regular",
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.6)",
    marginTop: 4,
  },
  card: {
    backgroundColor: "#1a1a1a",
    borderRadius: 8,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.05)",
  },
  rowLabel: {
    fontFamily: "IBMPlexMono_400Regular",
    fontSize: 14,
    color: "white",
  },
  rowValue: {
    fontFamily: "IBMPlexMono_400Regular",
    fontSize: 14,
    color: "#A87AD7",
  },
  footerText: {
    fontFamily: "IBMPlexMono_400Regular",
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.3)",
  },
});
