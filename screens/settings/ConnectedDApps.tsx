import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import type { WalletStackParamList } from "../../navigation/types";

// -- SVG Icons --

const BackArrow = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M19 12H5" />
    <Path d="M12 19l-7-7 7-7" />
  </Svg>
);

// -- Data --

type ConnectedDApp = {
  name: string;
  url: string;
  color: string;
  connectedDate: string;
};

const connectedDApps: ConnectedDApp[] = [
  { name: "OpenSea", url: "opensea.io", color: "#2081E2", connectedDate: "Mar 20, 2026" },
  { name: "Uniswap", url: "app.uniswap.org", color: "#FF007A", connectedDate: "Mar 20, 2026" },
  { name: "Aave", url: "app.aave.com", color: "#B6509E", connectedDate: "Mar 20, 2026" },
  { name: "Compound", url: "compound.finance", color: "#00D395", connectedDate: "Mar 20, 2026" },
];

// -- Connected DApp Card --

const DAppCard = ({ dapp, onDisconnect }: { dapp: ConnectedDApp; onDisconnect?: () => void }) => (
  <View style={styles.card} className="flex-row items-center justify-between mx-4 mb-3 p-4">
    <View className="flex-row items-center flex-1">
      <View style={[styles.iconCircle, { backgroundColor: dapp.color }]} />
      <View className="ml-3 flex-1">
        <Text style={styles.dappName} numberOfLines={1}>{dapp.name}</Text>
        <Text style={styles.dappUrl} numberOfLines={1}>{dapp.url}</Text>
        <Text style={styles.dappDate} numberOfLines={1}>Connected: {dapp.connectedDate}</Text>
      </View>
    </View>
    <Pressable onPress={onDisconnect}>
      <Text style={styles.disconnectText}>Disconnect</Text>
    </Pressable>
  </View>
);

// -- Empty State --

const EmptyState = () => (
  <View className="flex-1 items-center justify-center px-8">
    <Text style={styles.emptyTitle}>No connected apps</Text>
    <Text style={styles.emptySubtitle}>Connect to dApps through the browser</Text>
  </View>
);

// -- Main Screen --

export const ConnectedDApps = () => {
  const navigation = useNavigation<NativeStackNavigationProp<WalletStackParamList>>();
  const isEmpty = connectedDApps.length === 0;

  return (
    <View className="flex-1 bg-black">
      <StatusBar style="light" />

      <SafeAreaView className="flex-1" edges={["top"]}>
        {/* Navbar */}
        <View className="flex-row items-center justify-between px-4 h-12">
          <Pressable onPress={() => navigation.goBack()} className="w-10">
            <BackArrow />
          </Pressable>
          <Text style={styles.navTitle}>Connected Apps</Text>
          <View className="w-10" />
        </View>

        {isEmpty ? (
          <EmptyState />
        ) : (
          <ScrollView className="flex-1 mt-4">
            {connectedDApps.map((dapp) => (
              <DAppCard key={dapp.name} dapp={dapp} />
            ))}
          </ScrollView>
        )}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  navTitle: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#1a1a1a",
    borderRadius: 8,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  dappName: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 14,
    color: "white",
  },
  dappUrl: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.6)",
    marginTop: 2,
  },
  dappDate: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.3)",
    marginTop: 2,
  },
  disconnectText: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 12,
    color: "#BC3C20",
  },
  emptyTitle: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 14,
    color: "white",
  },
  emptySubtitle: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.6)",
    marginTop: 8,
    textAlign: "center",
  },
});
