import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import type { WalletStackParamList } from "../../navigation/types";

// -- Types --

type NotificationItem = {
  iconColor: string;
  title: string;
  message: string;
  timestamp: string;
};

type NotificationSection = {
  title: string;
  items: NotificationItem[];
};

// -- Back Arrow Icon --

const BackArrowIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M19 12H5" />
    <Path d="M12 19l-7-7 7-7" />
  </Svg>
);

// -- Section Header (same style as Activities) --

const SectionHeader = ({ title }: { title: string }) => (
  <View style={styles.sectionHeaderRow}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.sectionDivider} />
  </View>
);

// -- Notification Card --

const NotificationCard = ({ item }: { item: NotificationItem }) => (
  <View style={styles.card}>
    <View style={[styles.iconCircle, { backgroundColor: item.iconColor }]} />
    <View style={styles.cardContent}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardMessage}>{item.message}</Text>
      <Text style={styles.cardTimestamp}>{item.timestamp}</Text>
    </View>
  </View>
);

// -- Notification Data --

const sections: NotificationSection[] = [
  {
    title: "Today",
    items: [
      {
        iconColor: "#22C55E",
        title: "ETH Received",
        message: "You received 0.5 ETH from 0xAb3...f21e",
        timestamp: "2 hours ago",
      },
      {
        iconColor: "#7B3FE4",
        title: "Swap Completed",
        message: "Swapped 100 USDC for 0.063 ETH",
        timestamp: "5 hours ago",
      },
    ],
  },
  {
    title: "Yesterday",
    items: [
      {
        iconColor: "#F97316",
        title: "Price Alert",
        message: "ETH is up 5.2% in the last 24h",
        timestamp: "Yesterday at 3:45 PM",
      },
      {
        iconColor: "#3B82F6",
        title: "NFT Sold",
        message: "Your Bean#2210 was sold for 0.24 ETH",
        timestamp: "Yesterday at 11:20 AM",
      },
    ],
  },
  {
    title: "This Week",
    items: [
      {
        iconColor: "#EF4444",
        title: "Security Alert",
        message: "New device login detected",
        timestamp: "3 days ago",
      },
      {
        iconColor: "#6B7280",
        title: "App Update",
        message: "Version 1.1.0 is available",
        timestamp: "5 days ago",
      },
    ],
  },
];

// -- Main Screen --

type NotificationsProps = NativeStackScreenProps<WalletStackParamList, "Notifications">;

export const Notifications = ({ navigation }: NotificationsProps) => {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <SafeAreaView style={styles.flex} edges={["top"]}>
        {/* Navbar */}
        <View style={styles.navbar}>
          <Pressable onPress={() => navigation.goBack()} style={styles.navSide}>
            <BackArrowIcon />
          </Pressable>
          <Text style={styles.navTitle}>Notifications</Text>
          <View style={styles.navSide} />
        </View>

        {/* Notification List */}
        <ScrollView style={styles.scrollView}>
          {sections.map((section, sIdx) => (
            <View key={section.title} style={sIdx > 0 ? { marginTop: 24 } : undefined}>
              <SectionHeader title={section.title} />
              <View style={styles.sectionItems}>
                {section.items.map((item, iIdx) => (
                  <NotificationCard key={iIdx} item={item} />
                ))}
              </View>
            </View>
          ))}
          <View style={{ height: 24 }} />
        </ScrollView>
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
  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  sectionTitle: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.6)",
  },
  sectionDivider: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  sectionItems: {
    gap: 8,
    marginTop: 12,
  },
  card: {
    backgroundColor: "#1a1a1a",
    borderRadius: 8,
    padding: 16,
    marginBottom: 2,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 14,
    color: "white",
  },
  cardMessage: {
    fontFamily: "IBMPlexMono_400Regular",
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.6)",
    marginTop: 4,
  },
  cardTimestamp: {
    fontFamily: "IBMPlexMono_400Regular",
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.3)",
    marginTop: 4,
  },
});
