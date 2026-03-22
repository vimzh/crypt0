import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import Svg, { Path, Circle } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";

type GasTier = "slow" | "normal" | "fast";

const tiers: {
  id: GasTier;
  name: string;
  time: string;
  gwei: string;
  usd: string;
  dotColor: string;
}[] = [
  { id: "slow", name: "Slow", time: "~5 min", gwei: "4-5 GWEI", usd: "$0.82", dotColor: "#4CAF50" },
  { id: "normal", name: "Normal", time: "~2 min", gwei: "8-9 GWEI", usd: "$1.09", dotColor: "#804FB0" },
  { id: "fast", name: "Fast", time: "~30 sec", gwei: "12-15 GWEI", usd: "$1.56", dotColor: "#F44336" },
];

const CloseIcon = ({ size = 20, color = "white" }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M18 6L6 18"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M6 6L18 18"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const GasSettings = () => {
  const navigation = useNavigation();
  const [selectedTier, setSelectedTier] = useState<GasTier>("normal");
  const [maxBaseFee, setMaxBaseFee] = useState("");
  const [priorityFee, setPriorityFee] = useState("");

  return (
    <View className="absolute inset-0 justify-end bg-black/60">
      <Pressable className="flex-1" onPress={() => navigation.goBack()} />

      <View className="rounded-t-2xl bg-[#1a1a1a] p-6">
        {/* Header */}
        <View className="mb-4 flex-row items-center justify-between">
          <Text className="text-white" style={styles.headerText}>
            Network Fee
          </Text>
          <Pressable onPress={() => navigation.goBack()} className="h-8 w-8 items-center justify-center">
            <CloseIcon size={20} color="white" />
          </Pressable>
        </View>

        {/* Gas tier options */}
        <View className="gap-3">
          {tiers.map((tier) => (
            <Pressable
              key={tier.id}
              onPress={() => setSelectedTier(tier.id)}
              className="flex-row items-center justify-between rounded-lg bg-[#323232] p-4"
              style={[
                styles.card,
                selectedTier === tier.id && styles.cardSelected,
              ]}
            >
              <View className="flex-row items-center gap-2">
                <Svg width={8} height={8}>
                  <Circle cx={4} cy={4} r={4} fill={tier.dotColor} />
                </Svg>
                <View>
                  <Text className="text-white" style={styles.tierName}>
                    {tier.name}
                  </Text>
                  <Text className="text-white/60" style={styles.tierDetail}>
                    {tier.time}
                  </Text>
                </View>
              </View>
              <View className="items-end">
                <Text className="text-white" style={styles.tierUsd}>
                  {tier.usd}
                </Text>
                <Text className="text-white/60" style={styles.tierDetail}>
                  {tier.gwei}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>

        {/* Custom section */}
        <View className="mt-4">
          <Text className="mb-1 text-white/60" style={styles.inputLabel}>
            Max base fee (GWEI)
          </Text>
          <TextInput
            value={maxBaseFee}
            onChangeText={setMaxBaseFee}
            placeholder="0"
            placeholderTextColor="rgba(255,255,255,0.3)"
            selectionColor="#804FB0"
            keyboardType="numeric"
            className="mb-3 rounded bg-[#323232] p-3 text-white"
            style={styles.inputText}
          />

          <Text className="mb-1 text-white/60" style={styles.inputLabel}>
            Priority fee (GWEI)
          </Text>
          <TextInput
            value={priorityFee}
            onChangeText={setPriorityFee}
            placeholder="0"
            placeholderTextColor="rgba(255,255,255,0.3)"
            selectionColor="#804FB0"
            keyboardType="numeric"
            className="rounded bg-[#323232] p-3 text-white"
            style={styles.inputText}
          />
        </View>

        {/* Save button */}
        <Pressable
          onPress={() => navigation.goBack()}
          className="mt-4 w-full items-center justify-center rounded bg-white p-4"
        >
          <Text className="text-[black]" style={styles.buttonText}>
            Save
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 18,
  },
  tierName: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 14,
  },
  tierDetail: {
    fontFamily: "IBMPlexMono_400Regular",
    fontSize: 12,
  },
  tierUsd: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 14,
  },
  inputLabel: {
    fontFamily: "IBMPlexMono_400Regular",
    fontSize: 12,
  },
  inputText: {
    fontFamily: "IBMPlexMono_400Regular",
    fontSize: 14,
  },
  buttonText: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 18,
  },
  card: {
    borderWidth: 1,
    borderColor: "transparent",
  },
  cardSelected: {
    borderColor: "#804FB0",
  },
});
