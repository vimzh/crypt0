import { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path, Circle } from "react-native-svg";

import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { BackArrow } from "../../components/BackArrow";
import type { WalletStackParamList } from "../../navigation/types";

const MOCK_ETH_PRICE_USD = 702.63;

const QUICK_AMOUNTS = ["$50", "$100", "$250", "$500"];

const ChevronRight = ({ size = 16 }: { size?: number }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="rgba(255,255,255,0.6)"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Path d="M9 18l6-6-6-6" />
  </Svg>
);

export const BuyCrypto = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<WalletStackParamList>>();
  const [amount, setAmount] = useState("");
  const [selectedQuick, setSelectedQuick] = useState<string | null>(null);
  const inputRef = useRef<TextInput>(null);

  const numericAmount = parseFloat(amount) || 0;
  const ethEquivalent = numericAmount / MOCK_ETH_PRICE_USD;
  const displayAmount = amount ? `US$${amount}` : "US$0";

  const handleQuickAmount = (label: string) => {
    const value = label.replace("$", "");
    setSelectedQuick(label);
    setAmount(value);
  };

  return (
    <View className="flex-1 bg-[black]">
      <StatusBar style="light" />

      <SafeAreaView className="flex-1">
        <KeyboardAvoidingView
          className="flex-1"
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          {/* Navbar */}
          <View className="h-11 flex-row items-center px-4">
            <Pressable
              onPress={() => navigation.goBack()}
              className="h-11 w-11 items-center justify-center"
            >
              <BackArrow size={20} />
            </Pressable>

            <View className="flex-1 items-center justify-center">
              <Text className="text-white" style={styles.navTitle}>
                Buy
              </Text>
            </View>

            <View className="w-11" />
          </View>

          {/* Amount section */}
          <Pressable
            onPress={() => inputRef.current?.focus()}
            className="mt-8 items-center"
          >
            <Text className="text-white" style={styles.amountText}>
              {displayAmount}
            </Text>
            <Text className="mt-2 text-white/60" style={styles.ethEquiv}>
              ≈ {ethEquivalent.toFixed(6)} ETH
            </Text>
          </Pressable>

          {/* Quick amount pills */}
          <View className="mt-6 flex-row items-center justify-center gap-3">
            {QUICK_AMOUNTS.map((label) => (
              <Pressable
                key={label}
                onPress={() => handleQuickAmount(label)}
                className="rounded-[20px] px-4 py-2"
                style={[
                  styles.pill,
                  selectedQuick === label && styles.pillSelected,
                ]}
              >
                <Text className="text-white" style={styles.pillText}>
                  {label}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* Payment method */}
          <View className="mt-8 px-4">
            <Text className="text-white/60" style={styles.label}>
              Pay with
            </Text>
            <View className="mt-2 flex-row items-center justify-between rounded-lg bg-[#1a1a1a] p-4">
              <View className="flex-row items-center">
                <View className="h-6 w-6 items-center justify-center rounded-full bg-[#1A1F71]">
                  <Text
                    className="text-white"
                    style={{ fontSize: 8, fontFamily: "IBMPlexMono_600SemiBold" }}
                  >
                    V
                  </Text>
                </View>
                <Text className="ml-3 text-white" style={styles.cardText}>
                  Visa •••• 4242
                </Text>
              </View>
              <Pressable>
                <Text style={styles.changeText}>Change</Text>
              </Pressable>
            </View>
          </View>

          {/* Token selector */}
          <View className="mt-4 px-4">
            <Text className="text-white/60" style={styles.label}>
              You receive
            </Text>
            <View className="mt-2 flex-row items-center justify-between rounded-lg bg-[#1a1a1a] p-4">
              <View className="flex-row items-center">
                <View className="h-6 w-6 items-center justify-center rounded-full bg-[#627EEA]">
                  <Svg width={12} height={12} viewBox="0 0 24 24" fill="none">
                    <Path
                      d="M12 1.5l-7 10.167L12 15.5l7-3.833L12 1.5z"
                      fill="white"
                      opacity={0.6}
                    />
                    <Path
                      d="M12 15.5l-7-3.833L12 22.5l7-10.833L12 15.5z"
                      fill="white"
                    />
                  </Svg>
                </View>
                <Text className="ml-3 text-white" style={styles.cardText}>
                  Ethereum
                </Text>
              </View>
              <ChevronRight size={16} />
            </View>
          </View>

          <View className="flex-1" />

          {/* Network fee */}
          <View className="mx-4 mb-4 flex-row items-center justify-between">
            <Text className="text-white/60" style={styles.feeText}>
              Network fee
            </Text>
            <Text className="text-white/60" style={styles.feeText}>
              ~$2.99
            </Text>
          </View>

          {/* Continue button */}
          <View className="px-4 pb-4">
            <Pressable
              onPress={() => {}}
              className="w-full items-center justify-center bg-white p-4"
              style={{ opacity: numericAmount > 0 ? 1 : 0.3 }}
              disabled={numericAmount <= 0}
            >
              <Text
                className="text-[black] text-lg"
                style={styles.buttonText}
              >
                Continue
              </Text>
            </Pressable>
          </View>

          {/* Hidden TextInput for numeric keyboard */}
          <TextInput
            ref={inputRef}
            value={amount}
            onChangeText={(text) => {
              const cleaned = text.replace(/[^0-9.]/g, "");
              const parts = cleaned.split(".");
              if (parts.length > 2) return;
              if (parts[1] && parts[1].length > 2) return;
              setAmount(cleaned);
              setSelectedQuick(null);
            }}
            keyboardType="numeric"
            autoFocus
            style={styles.hiddenInput}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  navTitle: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 16,
  },
  amountText: {
    fontFamily: "IBMPlexMono_600SemiBold",
    fontSize: 32,
  },
  ethEquiv: {
    fontFamily: "IBMPlexMono_400Regular",
    fontSize: 12,
  },
  pill: {
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  pillSelected: {
    borderWidth: 1,
    borderColor: "#804FB0",
  },
  pillText: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 12,
  },
  label: {
    fontFamily: "IBMPlexMono_400Regular",
    fontSize: 12,
  },
  cardText: {
    fontFamily: "IBMPlexMono_400Regular",
    fontSize: 14,
  },
  changeText: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 12,
    color: "#A87AD7",
  },
  feeText: {
    fontFamily: "IBMPlexMono_400Regular",
    fontSize: 12,
  },
  buttonText: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 18,
  },
  hiddenInput: {
    position: "absolute",
    opacity: 0,
    height: 0,
    width: 0,
  },
});
