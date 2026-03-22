import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path, Circle, Rect, Line } from "react-native-svg";

const defaultAvatar = require("../../assets/intro/default-avatar.png");

// -- SVG Icon Components --

const SettingsIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <Circle cx={12} cy={12} r={3} />
    <Path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </Svg>
);

const CopyIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <Rect x={9} y={9} width={13} height={13} rx={2} ry={2} />
    <Path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </Svg>
);

const QrCodeIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <Rect x={2} y={2} width={8} height={8} rx={1} />
    <Rect x={14} y={2} width={8} height={8} rx={1} />
    <Rect x={2} y={14} width={8} height={8} rx={1} />
    <Rect x={14} y={14} width={4} height={4} rx={0.5} />
    <Line x1={22} y1={14} x2={22} y2={14.01} />
    <Line x1={18} y1={22} x2={22} y2={22} />
    <Line x1={22} y1={18} x2={22} y2={22} />
  </Svg>
);

const ChevronDownIcon = () => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M6 9l6 6 6-6" />
  </Svg>
);

const PlusIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Line x1={12} y1={5} x2={12} y2={19} />
    <Line x1={5} y1={12} x2={19} y2={12} />
  </Svg>
);

const ReceiveIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Line x1={12} y1={5} x2={12} y2={19} />
    <Path d="M19 12l-7 7-7-7" />
  </Svg>
);

const DownArrowIcon = () => (
  <Svg width={48} height={48} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <Line x1={12} y1={5} x2={12} y2={19} />
    <Path d="M19 12l-7 7-7-7" />
  </Svg>
);

const ClockIcon = ({ opacity, size = 24 }: { opacity: number; size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" opacity={opacity}>
    <Circle cx={12} cy={12} r={10} />
    <Path d="M12 6v6l4 2" />
  </Svg>
);

const WalletIcon = ({ opacity, size = 24 }: { opacity: number; size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" opacity={opacity}>
    <Rect x={2} y={4} width={20} height={16} rx={2} />
    <Path d="M2 10h20" />
    <Circle cx={18} cy={15} r={1.5} />
  </Svg>
);

const GlobeIcon = ({ opacity, size = 24 }: { opacity: number; size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" opacity={opacity}>
    <Circle cx={12} cy={12} r={10} />
    <Line x1={2} y1={12} x2={22} y2={12} />
    <Path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </Svg>
);

// -- Action Button --

const ActionButton = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <View className="items-center gap-2">
    <View className="w-10 h-10 rounded-full items-center justify-center" style={styles.actionCircle}>
      {icon}
    </View>
    <Text style={styles.actionLabel}>{label}</Text>
  </View>
);

// -- Main Screen --

export const HomeEmpty = () => {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-black">
      <StatusBar style="light" />

      <SafeAreaView className="flex-1" edges={["top"]}>
        {/* Top Navbar */}
        <View className="flex-row items-center justify-between px-4 py-2">
          <Pressable>
            <SettingsIcon />
          </Pressable>
          <View className="flex-row items-center gap-4">
            <Pressable>
              <CopyIcon />
            </Pressable>
            <Pressable>
              <QrCodeIcon />
            </Pressable>
          </View>
        </View>

        {/* Header */}
        <View className="items-center mt-4">
          <View className="flex-row items-center gap-2">
            <Image source={defaultAvatar} style={styles.avatar} className="rounded-full" />
            <Text style={styles.username}>rdpilot</Text>
            <ChevronDownIcon />
          </View>
          <Text style={styles.balance} className="mt-3">$0.00</Text>
        </View>

        {/* Action Buttons - Only Buy and Receive */}
        <View className="flex-row justify-center gap-10 mt-6">
          <ActionButton icon={<PlusIcon />} label="Buy" />
          <ActionButton icon={<ReceiveIcon />} label="Receive" />
        </View>

        {/* Tabs */}
        <View className="flex-row justify-center gap-6 mt-6">
          <View className="pb-2" style={styles.activeTab}>
            <Text style={styles.tabTextActive}>Crypto</Text>
          </View>
          <View className="pb-2">
            <Text style={styles.tabTextInactive}>Collectibles</Text>
          </View>
        </View>

        {/* Empty State */}
        <View className="flex-1 items-center justify-center px-8">
          <View style={styles.emptyCircle}>
            <DownArrowIcon />
          </View>
          <Text style={styles.emptyTitle} className="mt-6">No tokens found</Text>
          <Text style={styles.emptySubtitle} className="mt-3 text-center">
            Deposit tokens to your address or buy Ethereum to get started
          </Text>
        </View>
      </SafeAreaView>

      {/* Bottom Tab Bar - outside SafeAreaView */}
      <View
        className="flex-row items-center justify-around px-8 pt-4 bg-black"
        style={{ paddingBottom: Math.max(insets.bottom + 8, 24) }}
      >
        <Pressable className="p-3">
          <ClockIcon opacity={0.3} size={28} />
        </Pressable>
        <Pressable className="p-3">
          <WalletIcon opacity={1} size={28} />
        </Pressable>
        <Pressable className="p-3">
          <GlobeIcon opacity={0.3} size={28} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 24,
    height: 24,
  },
  username: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 14,
    color: "white",
  },
  balance: {
    fontFamily: "IBMPlexMono_600SemiBold",
    fontSize: 32,
    color: "white",
  },
  actionCircle: {
    backgroundColor: "#804FB0",
  },
  actionLabel: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 12,
    color: "white",
  },
  activeTab: {
    borderBottomWidth: 1,
    borderBottomColor: "white",
  },
  tabTextActive: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 14,
    color: "white",
  },
  tabTextInactive: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.3)",
  },
  emptyCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyTitle: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 18,
    color: "white",
  },
  emptySubtitle: {
    fontFamily: "IBMPlexMono_400Regular",
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.6)",
  },
});
