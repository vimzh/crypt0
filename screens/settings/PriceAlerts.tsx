import { useState } from "react";
import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Svg, { Path } from "react-native-svg";

import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { WalletStackParamList } from "../../navigation/types";

// -- Types --

type AlertItem = {
  id: string;
  token: string;
  color: string;
  direction: "above" | "below";
  targetPrice: string;
  currentPrice: string;
  enabled: boolean;
};

// -- Back Arrow Icon --

const BackArrowIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M19 12H5" />
    <Path d="M12 19l-7-7 7-7" />
  </Svg>
);

// -- Plus Icon --

const PlusIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#804FB0" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M12 5v14" />
    <Path d="M5 12h14" />
  </Svg>
);

// -- Toggle Switch (same as ManageTokens) --

const ToggleSwitch = ({ value, onToggle }: { value: boolean; onToggle: () => void }) => (
  <Pressable onPress={onToggle}>
    <View
      style={[
        styles.toggleTrack,
        { backgroundColor: value ? "#804FB0" : "#323232" },
      ]}
    >
      <View
        style={[
          styles.toggleKnob,
          { transform: [{ translateX: value ? 22 : 2 }] },
        ]}
      />
    </View>
  </Pressable>
);

// -- Alert Data --

const initialAlerts: AlertItem[] = [
  {
    id: "eth-above-4000",
    token: "ETH",
    color: "#627EEA",
    direction: "above",
    targetPrice: "$4,000",
    currentPrice: "$3,900",
    enabled: true,
  },
  {
    id: "eth-below-3500",
    token: "ETH",
    color: "#627EEA",
    direction: "below",
    targetPrice: "$3,500",
    currentPrice: "$3,900",
    enabled: true,
  },
  {
    id: "ape-above-5",
    token: "APE",
    color: "#0025FF",
    direction: "above",
    targetPrice: "$5.00",
    currentPrice: "$3.33",
    enabled: false,
  },
  {
    id: "usdc-below-099",
    token: "USDC",
    color: "#2775CA",
    direction: "below",
    targetPrice: "$0.99",
    currentPrice: "$1.01",
    enabled: true,
  },
  {
    id: "avax-above-15",
    token: "AVAX",
    color: "#E84142",
    direction: "above",
    targetPrice: "$15.00",
    currentPrice: "$9.13",
    enabled: false,
  },
];

// -- Alert Card --

const AlertCard = ({
  alert,
  onToggle,
}: {
  alert: AlertItem;
  onToggle: () => void;
}) => (
  <View style={styles.card}>
    <View style={styles.cardLeft}>
      <View style={[styles.tokenIcon, { backgroundColor: alert.color }]} />
      <View>
        <Text style={styles.alertLabel}>
          {alert.token} {alert.direction} {alert.targetPrice}
        </Text>
        <Text style={styles.currentPrice}>Current: {alert.currentPrice}</Text>
      </View>
    </View>
    <ToggleSwitch value={alert.enabled} onToggle={onToggle} />
  </View>
);

// -- Main Screen --

export const PriceAlerts = () => {
  const navigation = useNavigation<NativeStackNavigationProp<WalletStackParamList>>();
  const [alerts, setAlerts] = useState<AlertItem[]>(initialAlerts);

  const handleToggle = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, enabled: !a.enabled } : a))
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <SafeAreaView style={styles.flex} edges={["top"]}>
        {/* Navbar */}
        <View style={styles.navbar}>
          <Pressable onPress={() => navigation.goBack()} style={styles.navSide}>
            <BackArrowIcon />
          </Pressable>
          <Text style={styles.navTitle}>Price Alerts</Text>
          <Pressable style={styles.navSideRight}>
            <PlusIcon />
          </Pressable>
        </View>

        {/* Active Alerts */}
        <ScrollView style={styles.scrollView}>
          {alerts.map((alert) => (
            <AlertCard
              key={alert.id}
              alert={alert}
              onToggle={() => handleToggle(alert.id)}
            />
          ))}
        </ScrollView>

        {/* Create New Alert Button */}
        <View style={styles.bottomContainer}>
          <Pressable style={styles.createButton}>
            <Text style={styles.createButtonText}>Create New Alert</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  flex: {
    flex: 1,
  },
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  navSide: {
    width: 40,
  },
  navSideRight: {
    width: 40,
    alignItems: "flex-end",
  },
  navTitle: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 12,
    color: "white",
    textAlign: "center",
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 16,
  },
  card: {
    backgroundColor: "#1a1a1a",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  tokenIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  alertLabel: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 14,
    color: "white",
  },
  currentPrice: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.6)",
    marginTop: 2,
  },
  toggleTrack: {
    width: 50,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
  },
  toggleKnob: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "white",
  },
  bottomContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  createButton: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
  },
  createButtonText: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 18,
    color: "white",
  },
});
