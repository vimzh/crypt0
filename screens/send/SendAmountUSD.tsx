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
import Svg, { Path, Line } from "react-native-svg";

import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { BackArrow } from "../../components/BackArrow";
import type { WalletStackParamList } from "../../navigation/types";

// -- SVG Icon Components --

const CloseIcon = ({ size = 16 }: { size?: number }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Line x1={18} y1={6} x2={6} y2={18} />
    <Line x1={6} y1={6} x2={18} y2={18} />
  </Svg>
);

const SwapIcon = ({ size = 20 }: { size?: number }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Path d="M7 16V4m0 0L3 8m4-4l4 4" />
    <Path d="M17 8v12m0 0l4-4m-4 4l-4-4" />
  </Svg>
);

const GasIcon = ({ size = 14 }: { size?: number }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="rgba(255,255,255,0.5)"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Path d="M3 22V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v17" />
    <Path d="M15 10h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 4" />
    <Path d="M3 22h12" />
    <Path d="M7 8h4" />
  </Svg>
);

const MOCK_ADDRESS = "0xFaa32BA7A25460Bca971730B51058a...";
const MOCK_BALANCE_ETH = 2.23;
const MOCK_ETH_PRICE_USD = 702.63;
const MOCK_BALANCE_USD = MOCK_BALANCE_ETH * MOCK_ETH_PRICE_USD;

export const SendAmountUSD = () => {
  const navigation = useNavigation<NativeStackNavigationProp<WalletStackParamList>>();
  const [amount, setAmount] = useState("");
  const inputRef = useRef<TextInput>(null);

  const numericAmount = parseFloat(amount) || 0;
  const canSend = numericAmount > 0 && numericAmount <= MOCK_BALANCE_USD;

  const displayAmount = amount || "0";
  const ethEquivalent = numericAmount / MOCK_ETH_PRICE_USD;

  const handleMax = () => {
    setAmount(MOCK_BALANCE_USD.toFixed(2));
  };

  const handleClearAddress = () => {
    navigation.goBack();
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
                Send
              </Text>
            </View>

            <View className="w-11" />
          </View>

          {/* Address row */}
          <View className="mx-4 mt-4 flex-row items-center justify-between">
            <Text
              className="flex-1 text-white"
              style={styles.addressText}
              numberOfLines={1}
            >
              To: {MOCK_ADDRESS}
            </Text>
            <Pressable
              onPress={handleClearAddress}
              className="ml-2 h-8 w-8 items-center justify-center"
            >
              <CloseIcon size={14} />
            </Pressable>
          </View>

          {/* Content */}
          <View className="flex-1 items-center justify-center px-4">
            {/* Available balance */}
            <Text className="text-white/50" style={styles.balanceText}>
              {MOCK_BALANCE_ETH} ETH available
            </Text>

            {/* Amount display */}
            <Pressable
              onPress={() => inputRef.current?.focus()}
              className="mt-6 items-center"
            >
              <View className="flex-row items-center">
                {/* Max pill */}
                <Pressable
                  onPress={handleMax}
                  className="rounded-full border border-white/20 px-3 py-1"
                >
                  <Text className="text-white" style={styles.maxText}>
                    Max
                  </Text>
                </Pressable>

                {/* USD Amount */}
                <Text
                  className="mx-4 text-white"
                  style={styles.amountText}
                >
                  US${displayAmount}
                </Text>

                {/* Swap icon */}
                <Pressable className="h-8 w-8 items-center justify-center">
                  <SwapIcon size={20} />
                </Pressable>
              </View>

              {/* ETH equivalent */}
              <Text className="mt-2 text-white/60" style={styles.ethText}>
                {ethEquivalent.toFixed(6)} ETH
              </Text>
            </Pressable>
          </View>

          {/* Network fee */}
          <View className="mx-4 mb-4 flex-row items-center justify-center">
            <GasIcon size={14} />
            <Text className="ml-1 text-white/50" style={styles.feeText}>
              Network fee: ~$0.42
            </Text>
          </View>

          {/* Review button */}
          <View className="px-4 pb-4">
            <Pressable
              onPress={() => {}}
              className="w-full items-center justify-center bg-white p-4"
              style={{ opacity: 1 }}
            >
              <Text
                className="text-[black] text-lg"
                style={styles.buttonText}
              >
                Review
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
  addressText: {
    fontFamily: "IBMPlexMono_400Regular",
    fontSize: 14,
  },
  balanceText: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 12,
  },
  amountText: {
    fontFamily: "IBMPlexMono_600SemiBold",
    fontSize: 32,
  },
  ethText: {
    fontFamily: "IBMPlexMono_400Regular",
    fontSize: 12,
  },
  maxText: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 12,
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
