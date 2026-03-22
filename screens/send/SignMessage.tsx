import { View, Text, Pressable, ScrollView, StyleSheet } from "react-native";
import Svg, { Line } from "react-native-svg";
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

export const SignMessage = () => {
  const navigation = useNavigation();

  return (
    <View className="flex-1 justify-end bg-black/60">
      <Pressable className="flex-1" onPress={() => navigation.goBack()} />

      {/* Bottom sheet */}
      <View className="rounded-t-2xl bg-[#1a1a1a] p-6">
        {/* Header */}
        <View className="flex-row items-center justify-between">
          <Text className="text-white" style={styles.headerTitle}>
            Sign Message
          </Text>
          <Pressable
            onPress={() => navigation.goBack()}
            hitSlop={8}
            className="h-8 w-8 items-center justify-center"
          >
            <CloseIcon size={20} />
          </Pressable>
        </View>

        {/* dApp info */}
        <View className="mt-5 items-center">
          <View
            className="h-12 w-12 items-center justify-center rounded-full"
            style={{ backgroundColor: "#2081E2" }}
          >
            <Text className="text-white" style={styles.dAppIconText}>
              O
            </Text>
          </View>
          <Text className="mt-2 text-white" style={styles.dAppName}>
            OpenSea
          </Text>
          <Text className="text-white/60" style={styles.labelText}>
            opensea.io
          </Text>
        </View>

        {/* Message label */}
        <Text className="mt-6 text-white/60" style={styles.labelText}>
          Message
        </Text>

        {/* Message content */}
        <View
          className="mt-2 rounded-lg bg-[#323232] p-4"
          style={{ maxHeight: 200 }}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text className="text-white" style={styles.messageText}>
              {"Welcome to OpenSea!\n\nClick to sign in and accept the OpenSea Terms of Service.\n\nThis request will not trigger a blockchain transaction or cost any gas fees.\n\nWallet address:\n0x29e...76ef\n\nNonce:\n8a7f3c2e"}
            </Text>
          </ScrollView>
        </View>

        {/* Account row */}
        <View className="mt-4 flex-row items-center justify-between">
          <Text className="text-white/60" style={styles.labelText}>
            Account
          </Text>
          <Text className="text-white" style={styles.labelText}>
            rdpilot (0x29e...76ef)
          </Text>
        </View>

        {/* Network row */}
        <View className="mt-3 flex-row items-center justify-between">
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
              Sign
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
    fontSize: 20,
  },
  dAppName: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 16,
  },
  labelText: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 12,
  },
  messageText: {
    fontFamily: "IBMPlexMono_400Regular",
    fontSize: 12,
  },
  buttonText: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 18,
  },
});
