import { View, Text, TextInput, Pressable, ScrollView, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path, Circle as SvgCircle } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { BackArrow } from "../../components/BackArrow";
import type { WalletStackParamList } from "../../navigation/types";

// -- SVG Icons --

const SearchIcon = () => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <SvgCircle cx={11} cy={11} r={8} />
    <Path d="M21 21l-4.35-4.35" />
  </Svg>
);

// -- Data --

type Contact = {
  name: string;
  address: string;
  network: string;
  color: string;
};

const contacts: Contact[] = [
  { name: "Alice", color: "#E84142", address: "0xFaa...893E", network: "Ethereum" },
  { name: "Bob", color: "#627EEA", address: "0x7Bc...3a21", network: "Ethereum" },
  { name: "Charlie", color: "#8247E5", address: "0xAf1...8b44", network: "Polygon" },
  { name: "Treasury", color: "#F0B90B", address: "0x3De...9f12", network: "BSC" },
  { name: "Savings", color: "#0052FF", address: "bc1q...e3b5", network: "Bitcoin" },
];

// -- Contact Card --

const ContactCard = ({ contact }: { contact: Contact }) => (
  <View className="flex-row items-center gap-3 bg-[#1a1a1a] rounded-lg p-4 mb-2">
    <View style={[styles.avatar, { backgroundColor: contact.color }]}>
      <Text style={styles.avatarLetter}>{contact.name[0]}</Text>
    </View>
    <View>
      <Text style={styles.contactName}>{contact.name}</Text>
      <Text style={styles.contactAddress}>{contact.address}</Text>
      <View style={styles.networkBadge}>
        <Text style={styles.networkText}>{contact.network}</Text>
      </View>
    </View>
  </View>
);

// -- Main Screen --

export const AddressBook = () => {
  const navigation = useNavigation<NativeStackNavigationProp<WalletStackParamList>>();
  return (
    <View className="flex-1 bg-black">
      <StatusBar style="light" />

      <SafeAreaView className="flex-1" edges={["top"]}>
        {/* Navbar */}
        <View className="flex-row items-center justify-between px-4 py-2">
          <Pressable onPress={() => navigation.goBack()} className="w-10">
            <BackArrow />
          </Pressable>
          <Text style={styles.navTitle}>Address Book</Text>
          <Pressable className="w-10 items-end">
            <Text style={styles.addButton}>+</Text>
          </Pressable>
        </View>

        {/* Search Bar */}
        <View className="mx-4 mt-2">
          <View style={styles.searchBar} className="flex-row items-center h-10 px-3 rounded gap-2">
            <SearchIcon />
            <TextInput
              placeholder="Search contacts"
              placeholderTextColor="rgba(255,255,255,0.6)"
              style={styles.searchInput}
            />
          </View>
        </View>

        {/* Contact List */}
        <ScrollView className="px-4 mt-4">
          {contacts.map((contact) => (
            <ContactCard key={contact.name} contact={contact} />
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
  addButton: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 24,
    color: "#804FB0",
  },
  searchBar: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 4,
  },
  searchInput: {
    flex: 1,
    fontFamily: "IBMPlexMono_400Regular",
    fontSize: 12,
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
  contactName: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 14,
    color: "white",
  },
  contactAddress: {
    fontFamily: "IBMPlexMono_400Regular",
    fontSize: 12,
    color: "rgba(255,255,255,0.6)",
    marginTop: 2,
  },
  networkBadge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginTop: 4,
  },
  networkText: {
    fontFamily: "IBMPlexMono_400Regular",
    fontSize: 10,
    color: "rgba(255,255,255,0.5)",
  },
});
