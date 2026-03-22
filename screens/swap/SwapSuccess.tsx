import { View, Text, Image, ScrollView, Pressable, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path, Circle, Rect, Line } from "react-native-svg";

const defaultAvatar = require("../../assets/intro/default-avatar.png");
const coin2 = require("../../assets/intro/coin2.png");
const coin3 = require("../../assets/intro/coin3.png");
const coin4 = require("../../assets/intro/coin4.png");

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

const SwapIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M7 16l-4-4 4-4" />
    <Path d="M3 12h18" />
    <Path d="M17 8l4 4-4 4" />
    <Path d="M21 12H3" />
  </Svg>
);

const SendIconAction = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Line x1={12} y1={19} x2={12} y2={5} />
    <Path d="M5 12l7-7 7 7" />
  </Svg>
);

const ReceiveIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
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

const CheckIcon = () => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M20 6L9 17l-5-5" />
  </Svg>
);

// -- Data --

type Token = {
  name: string;
  ticker: string;
  price: string;
  change: string;
  changePositive: boolean;
  value: string;
  amount: string;
  icon: "eth" | "usdc" | "ape" | "looks" | "avax" | "doge" | "aave" | "sand";
};

const tokens: Token[] = [
  { name: "Ethereum", ticker: "ETH", price: "$3,900", change: "+1.23%", changePositive: true, value: "$6,911.70", amount: "2.32 ETH", icon: "eth" },
  { name: "USD Coin", ticker: "USDC", price: "$1.01", change: "+0.09%", changePositive: true, value: "$2,000.04", amount: "2000.01 USDC", icon: "usdc" },
  { name: "ApeCoin", ticker: "APE", price: "$3.33", change: "-5.22%", changePositive: false, value: "$1,370.65", amount: "452.23 APE", icon: "ape" },
  { name: "LooksRare", ticker: "LOOKS", price: "$0.87", change: "-1.22%", changePositive: false, value: "$458.09", amount: "1000.02 LOOKS", icon: "looks" },
  { name: "Avalanche", ticker: "AVAX", price: "$9.13", change: "+0.09%", changePositive: true, value: "$245.89", amount: "259.02 AVAX", icon: "avax" },
  { name: "DogeCoin", ticker: "DOGE", price: "$0.52", change: "+0.09%", changePositive: true, value: "$188.61", amount: "322,002.02 DOGE", icon: "doge" },
  { name: "AAVE", ticker: "AAVE", price: "$65.21", change: "+1.32%", changePositive: true, value: "$89.32", amount: "1.77 AAVE", icon: "aave" },
  { name: "Sandbox", ticker: "SAND", price: "$0.29", change: "+3.12%", changePositive: true, value: "$64.47", amount: "223 SAND", icon: "sand" },
];

const tokenIconColors: Record<string, string> = {
  eth: "#627EEA",
  looks: "#00E676",
  avax: "#E84142",
  aave: "#B6509E",
  sand: "#00ADEF",
};

const TokenPlaceholder = ({ letter, color }: { letter: string; color: string }) => (
  <View style={[styles.tokenIcon, { backgroundColor: color }]}>
    <Text style={styles.tokenPlaceholderLetter}>{letter}</Text>
  </View>
);

const getTokenIcon = (icon: Token["icon"]) => {
  switch (icon) {
    case "usdc":
      return <Image source={coin2} style={styles.tokenIcon} />;
    case "ape":
      return <Image source={coin3} style={styles.tokenIcon} />;
    case "doge":
      return <Image source={coin4} style={styles.tokenIcon} />;
    default: {
      const color = tokenIconColors[icon] ?? "#555";
      const letter = icon.charAt(0).toUpperCase();
      return <TokenPlaceholder letter={letter} color={color} />;
    }
  }
};

// -- Action Button --

const ActionButton = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <View className="items-center gap-2">
    <View className="w-10 h-10 rounded-full items-center justify-center" style={styles.actionCircle}>
      {icon}
    </View>
    <Text style={styles.actionLabel}>{label}</Text>
  </View>
);

// -- Token Row --

const TokenRow = ({ token }: { token: Token }) => (
  <View className="flex-row items-center justify-between py-4">
    <View className="flex-row items-center gap-3">
      {getTokenIcon(token.icon)}
      <View>
        <Text style={styles.tokenName}>{token.name}</Text>
        <View className="flex-row items-center gap-2 mt-1">
          <Text style={styles.tokenPrice}>{token.price}</Text>
          <Text style={[styles.tokenChange, { color: token.changePositive ? "#20BCA4" : "#BC3C20" }]}>
            {token.change}
          </Text>
        </View>
      </View>
    </View>
    <View className="items-end">
      <Text style={styles.tokenValue}>{token.value}</Text>
      <Text style={styles.tokenAmount}>{token.amount}</Text>
    </View>
  </View>
);

// -- Success Toast --

const SuccessToast = () => (
  <Pressable className="mx-4 mt-2 mb-1 flex-row items-center gap-3 p-3" style={styles.toastContainer}>
    <View style={styles.checkCircle} className="items-center justify-center">
      <CheckIcon />
    </View>
    <View>
      <Text style={styles.toastTitle}>Swap Completed</Text>
      <Text style={styles.toastSubtitle}>Tap to view this transaction details</Text>
    </View>
  </Pressable>
);

// -- Main Screen --

export const SwapSuccess = () => {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-black">
      <StatusBar style="light" />

      <SafeAreaView className="flex-1" edges={["top"]}>
        {/* Success Toast */}
        <SuccessToast />

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
          <Text style={styles.balance} className="mt-3">$12,332.95</Text>
        </View>

        {/* Action Buttons */}
        <View className="flex-row justify-center gap-10 mt-6">
          <ActionButton icon={<PlusIcon />} label="Buy" />
          <ActionButton icon={<SwapIcon />} label="Swap" />
          <ActionButton icon={<SendIconAction />} label="Send" />
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

        {/* Token List */}
        <ScrollView className="flex-1 px-4 mt-2">
          {tokens.map((token) => (
            <TokenRow key={token.ticker} token={token} />
          ))}
        </ScrollView>
      </SafeAreaView>

      {/* Bottom Tab Bar */}
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
  toastContainer: {
    backgroundColor: "#323232",
    borderRadius: 8,
  },
  checkCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#22C55E",
  },
  toastTitle: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 14,
    color: "white",
  },
  toastSubtitle: {
    fontFamily: "IBMPlexMono_400Regular",
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.6)",
    marginTop: 2,
  },
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
  tokenIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  tokenPlaceholderLetter: {
    fontFamily: "IBMPlexMono_600SemiBold",
    fontSize: 12,
    color: "white",
    textAlign: "center",
    lineHeight: 24,
  },
  tokenName: {
    fontFamily: "IBMPlexMono_400Regular",
    fontSize: 14,
    color: "white",
  },
  tokenPrice: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 12,
    color: "#7B849B",
  },
  tokenChange: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 12,
  },
  tokenValue: {
    fontFamily: "IBMPlexMono_400Regular",
    fontSize: 14,
    color: "white",
    textAlign: "right",
  },
  tokenAmount: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 12,
    color: "#7B849B",
    textAlign: "right",
    marginTop: 2,
  },
});
