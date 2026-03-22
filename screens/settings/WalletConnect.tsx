import { View, Text, Pressable, StyleSheet } from "react-native";
import Svg, { Line, Path } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";

const CloseIcon = ({ size = 20 }: { size?: number }) => (
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

const CheckIcon = ({ size = 16 }: { size?: number }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="#22C55E"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Path d="M20 6L9 17l-5-5" />
  </Svg>
);

const permissions = [
  "View your balance and activity",
  "Request approval for transactions",
  "Send transaction requests",
];

export const WalletConnect = () => {
  const navigation = useNavigation();

  return (
    <View className="flex-1 justify-end bg-black/60">
      <Pressable className="flex-1" onPress={() => navigation.goBack()} />

      {/* Bottom sheet */}
      <View className="rounded-t-2xl bg-[#1a1a1a] p-6">
        {/* Header */}
        <View className="flex-row items-center justify-between">
          <Text className="text-white" style={styles.headerTitle}>
            Connect
          </Text>
          <Pressable
            onPress={() => navigation.goBack()}
            hitSlop={8}
            className="h-8 w-8 items-center justify-center"
          >
            <CloseIcon size={20} />
          </Pressable>
        </View>

        {/* dApp icon */}
        <View className="mt-6 items-center">
          <View
            className="h-16 w-16 items-center justify-center rounded-full"
            style={{ backgroundColor: "#FF007A" }}
          >
            <Text className="text-white" style={styles.dAppIconText}>
              U
            </Text>
          </View>
        </View>

        {/* dApp name */}
        <Text className="mt-3 text-center text-white" style={styles.dAppName}>
          Uniswap
        </Text>

        {/* URL */}
        <Text className="text-center text-white/60" style={styles.labelText}>
          app.uniswap.org
        </Text>

        {/* Permissions */}
        <View className="mt-6">
          <Text className="text-white/60" style={styles.labelText}>
            This app wants to:
          </Text>

          <View className="mt-2 gap-3 rounded-lg bg-[#323232] p-4">
            {permissions.map((perm) => (
              <View key={perm} className="flex-row items-center gap-3">
                <CheckIcon size={16} />
                <Text className="text-white" style={styles.permText}>
                  {perm}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Wallet row */}
        <View className="mt-4 flex-row items-center justify-between">
          <Text className="text-white/60" style={styles.labelText}>
            Wallet
          </Text>
          <Text className="text-white/60" style={styles.labelText}>
            rdpilot · 0x29e...76ef
          </Text>
        </View>

        {/* Network row */}
        <View className="mt-2 flex-row items-center justify-between">
          <Text className="text-white/60" style={styles.labelText}>
            Network
          </Text>
          <Text className="text-white" style={styles.labelText}>
            Ethereum
          </Text>
        </View>

        {/* Buttons */}
        <View className="mt-6 flex-row gap-3">
          <Pressable
            onPress={() => navigation.goBack()}
            className="flex-1 items-center justify-center border border-white p-4"
          >
            <Text className="text-white" style={styles.buttonText}>
              Reject
            </Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.goBack()}
            className="flex-1 items-center justify-center bg-white p-4"
          >
            <Text className="text-black" style={styles.buttonText}>
              Connect
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 18,
  },
  dAppIconText: {
    fontFamily: "IBMPlexMono_600SemiBold",
    fontSize: 24,
  },
  dAppName: {
    fontFamily: "IBMPlexMono_600SemiBold",
    fontSize: 24,
  },
  labelText: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 12,
  },
  permText: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 14,
  },
  buttonText: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 18,
  },
});
