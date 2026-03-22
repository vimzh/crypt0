import { View, Text, Pressable, StyleSheet } from "react-native";
import Svg, { Path, Line, Circle } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";

// -- SVG Icon Components --

const CloseIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Line x1={18} y1={6} x2={6} y2={18} />
    <Line x1={6} y1={6} x2={18} y2={18} />
  </Svg>
);

const PlusIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Line x1={12} y1={5} x2={12} y2={19} />
    <Line x1={5} y1={12} x2={19} y2={12} />
  </Svg>
);

const DownloadIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <Line x1={12} y1={3} x2={12} y2={15} />
    <Path d="M7 10l5 5 5-5" />
  </Svg>
);

const CheckIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M20 6L9 17l-5-5" />
  </Svg>
);

// -- Data --

type Wallet = {
  name: string;
  address: string;
  active: boolean;
  avatarColor: string;
};

const wallets: Wallet[] = [
  { name: "rdpilot", address: "0x29e...76ef", active: true, avatarColor: "#627EEA" },
  { name: "Trading", address: "0x7Bc...3a21", active: false, avatarColor: "#E84142" },
  { name: "DeFi", address: "0xAf1...8b44", active: false, avatarColor: "#20BCA4" },
];

// -- Wallet Row --

const WalletRow = ({ wallet }: { wallet: Wallet }) => (
  <Pressable className="py-4 flex-row items-center gap-3">
    <View style={[styles.avatar, { backgroundColor: wallet.avatarColor }]}>
      <Text style={styles.avatarLetter}>{wallet.name.charAt(0).toUpperCase()}</Text>
    </View>
    <View className="flex-1">
      <Text style={styles.walletName}>{wallet.name}</Text>
      <Text style={styles.walletAddress}>{wallet.address}</Text>
    </View>
    {wallet.active ? (
      <View style={styles.greenDot} />
    ) : (
      <CheckIcon />
    )}
  </Pressable>
);

// -- Action Row --

const ActionRow = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <Pressable className="py-4 flex-row items-center gap-3">
    <View style={styles.actionCircle}>
      {icon}
    </View>
    <Text style={styles.walletName}>{label}</Text>
  </Pressable>
);

// -- Main Component --

export const WalletSwitcher = () => {
  const navigation = useNavigation();
  return (
    <Pressable className="flex-1 bg-black/60 justify-end" onPress={() => navigation.goBack()}>
      <Pressable className="rounded-t-2xl p-6" style={styles.sheet} onPress={(e) => e.stopPropagation()}>
        {/* Header */}
        <View className="flex-row items-center justify-between mb-2">
          <Text style={styles.title}>Wallets</Text>
          <Pressable onPress={() => navigation.goBack()} className="p-1">
            <CloseIcon />
          </Pressable>
        </View>

        {/* Wallet List */}
        {wallets.map((wallet) => (
          <WalletRow key={wallet.address} wallet={wallet} />
        ))}

        {/* Separator */}
        <View className="my-1" style={styles.separator} />

        {/* Actions */}
        <ActionRow icon={<PlusIcon />} label="Create New Wallet" />
        <ActionRow icon={<DownloadIcon />} label="Import Wallet" />
      </Pressable>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  sheet: {
    backgroundColor: "#1a1a1a",
  },
  title: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 18,
    color: "white",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarLetter: {
    fontFamily: "IBMPlexMono_600SemiBold",
    fontSize: 16,
    color: "white",
  },
  walletName: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 14,
    color: "white",
  },
  walletAddress: {
    fontFamily: "IBMPlexMono_400Regular",
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.6)",
    marginTop: 2,
  },
  greenDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#20BCA4",
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  actionCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#804FB0",
    alignItems: "center",
    justifyContent: "center",
  },
});
