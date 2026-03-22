import { View, Text, Pressable, StyleSheet } from "react-native";
import Svg, { Circle, Line, Path } from "react-native-svg";
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

const SettingsIcon = ({ size = 14 }: { size?: number }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="rgba(255,255,255,0.6)"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <Circle cx={12} cy={12} r={3} />
  </Svg>
);

export const SendConfirm = () => {
  const navigation = useNavigation();
  return (
    <View className="flex-1 justify-end bg-black/60">
      <Pressable className="flex-1" onPress={() => navigation.goBack()} />

      {/* Bottom modal card */}
      <View className="rounded-t-2xl bg-[#1a1a1a] px-5 pb-8 pt-5">
        {/* Header row */}
        <View className="flex-row items-center justify-between">
          <Text className="text-white" style={styles.headerTitle}>
            Sending
          </Text>
          <Pressable
            onPress={() => navigation.goBack()}
            hitSlop={8}
            className="h-8 w-8 items-center justify-center"
          >
            <CloseIcon size={20} />
          </Pressable>
        </View>

        {/* Token info */}
        <View className="mt-5 flex-row items-center">
          {/* ETH icon */}
          <View
            className="h-6 w-6 items-center justify-center rounded-full"
            style={{ backgroundColor: "#627EEA" }}
          >
            <Text className="text-white" style={styles.ethIconText}>
              E
            </Text>
          </View>
          <View className="ml-3">
            <Text className="text-white" style={styles.tokenAmount}>
              1 ETH
            </Text>
            <Text className="text-white/60" style={styles.labelText}>
              US$1566.87
            </Text>
          </View>
        </View>

        {/* Divider */}
        <View className="my-4 h-px bg-white/10" />

        {/* To label */}
        <Text className="text-white/60" style={styles.labelText}>
          To
        </Text>

        {/* Recipient */}
        <View className="mt-2 flex-row items-center">
          <View className="h-6 w-6 rounded-full bg-white/20" />
          <Text className="ml-3 text-white" style={styles.recipientText}>
            0xFaa...893E
          </Text>
        </View>

        {/* Divider */}
        <View className="my-4 h-px bg-white/10" />

        {/* Info rows */}
        <View className="flex-row items-center justify-between">
          <Text className="text-white/60" style={styles.labelText}>
            Network
          </Text>
          <Text className="text-white" style={styles.labelText}>
            Ethereum
          </Text>
        </View>

        <View className="mt-3 flex-row items-center justify-between">
          <Text className="text-white/60" style={styles.labelText}>
            Network fee
          </Text>
          <View className="flex-row items-center">
            <Text className="text-white" style={styles.labelText}>
              US$1.09 - US$1.23
            </Text>
            <Pressable className="ml-2" hitSlop={8}>
              <SettingsIcon size={14} />
            </Pressable>
          </View>
        </View>

        {/* Confirm button */}
        <Pressable
          onPress={() => navigation.goBack()}
          className="mt-6 w-full items-center justify-center bg-white p-4"
        >
          <Text className="text-black" style={styles.buttonText}>
            Confirm
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 18,
  },
  tokenAmount: {
    fontFamily: "IBMPlexMono_600SemiBold",
    fontSize: 24,
  },
  labelText: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 12,
  },
  recipientText: {
    fontFamily: "IBMPlexMono_400Regular",
    fontSize: 16,
  },
  ethIconText: {
    fontFamily: "IBMPlexMono_600SemiBold",
    fontSize: 12,
  },
  buttonText: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 18,
  },
});
