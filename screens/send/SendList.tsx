import { View, Text, Image, ScrollView, Pressable, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { BackArrow } from "../../components/BackArrow";
import type { WalletStackParamList } from "../../navigation/types";

const coin2 = require("../../assets/intro/coin2.png"); // USDC
const coin3 = require("../../assets/intro/coin3.png"); // APE
const coin4 = require("../../assets/intro/coin4.png"); // DOGE

// -- Placeholder icon for tokens without an image --

const TokenPlaceholder = ({ letter, color }: { letter: string; color: string }) => (
  <View style={[styles.tokenIcon, { backgroundColor: color }]}>
    <Text style={styles.tokenPlaceholderLetter}>{letter}</Text>
  </View>
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

// -- Token Row --

type TokenRowProps = {
  token: Token;
  onPress?: () => void;
};

const TokenRow = ({ token, onPress }: TokenRowProps) => (
  <Pressable className="flex-row items-center justify-between py-4" onPress={onPress}>
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
  </Pressable>
);

// -- Main Screen --

export const SendList = () => {
  const navigation = useNavigation<NativeStackNavigationProp<WalletStackParamList>>();
  return (
    <View className="flex-1 bg-black">
      <StatusBar style="light" />

      <SafeAreaView className="flex-1" edges={["top"]}>
        {/* Navbar */}
        <View className="flex-row items-center justify-between px-4 py-2">
          <Pressable onPress={() => navigation.goBack()} className="w-10 items-start justify-center">
            <BackArrow />
          </Pressable>
          <Text style={styles.navTitle}>Send</Text>
          <View className="w-10" />
        </View>

        {/* Tabs */}
        <View className="flex-row justify-center gap-6 mt-4">
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
            <TokenRow
              key={token.ticker}
              token={token}
              onPress={() => navigation.navigate("SendEnterAddress")}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  navTitle: {
    fontFamily: "IBMPlexMono_400Regular",
    fontSize: 14,
    color: "white",
  },
  activeTab: {
    borderBottomWidth: 1,
    borderBottomColor: "white",
  },
  tabTextActive: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 12,
    color: "white",
  },
  tabTextInactive: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 12,
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
