import { View, Text, Pressable, StyleSheet } from "react-native";
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

const DetailRow = ({
  label,
  value,
  valueColor = "text-white",
  icon,
}: {
  label: string;
  value: string;
  valueColor?: string;
  icon?: React.ReactNode;
}) => (
  <View className="flex-row items-center justify-between">
    <Text className="text-white/60" style={styles.detailLabel}>
      {label}
    </Text>
    <View className="flex-row items-center">
      {icon}
      <Text className={valueColor} style={styles.detailValue}>
        {value}
      </Text>
    </View>
  </View>
);

export const TokenApproval = () => {
  const navigation = useNavigation();

  return (
    <View className="flex-1 justify-end bg-black/60">
      <Pressable className="flex-1" onPress={() => navigation.goBack()} />

      {/* Bottom sheet */}
      <View className="rounded-t-2xl bg-[#1a1a1a] p-6">
        {/* Header */}
        <View className="flex-row items-center justify-between">
          <Text className="text-white" style={styles.headerTitle}>
            Approve Token
          </Text>
          <Pressable
            onPress={() => navigation.goBack()}
            hitSlop={8}
            className="h-8 w-8 items-center justify-center"
          >
            <CloseIcon size={20} />
          </Pressable>
        </View>

        {/* dApp info row */}
        <View className="mt-4 flex-row items-center">
          <View
            className="h-10 w-10 items-center justify-center rounded-full"
            style={{ backgroundColor: "#FF007A" }}
          >
            <Text className="text-white" style={styles.dAppIconText}>
              U
            </Text>
          </View>
          <View className="ml-3">
            <Text className="text-white" style={styles.dAppName}>
              Uniswap
            </Text>
            <Text className="text-white/60" style={styles.dAppUrl}>
              app.uniswap.org
            </Text>
          </View>
        </View>

        {/* Warning box */}
        <View
          className="mt-4 rounded-lg p-3"
          style={styles.warningBox}
        >
          <Text className="text-white/60" style={styles.warningText}>
            This will allow Uniswap to spend your USDC
          </Text>
        </View>

        {/* Details card */}
        <View className="mt-4 gap-3 rounded-lg bg-[#323232] p-4">
          <DetailRow
            label="Token"
            value="USDC"
            icon={
              <View
                className="mr-2 h-5 w-5 items-center justify-center rounded-full"
                style={{ backgroundColor: "#2775CA" }}
              >
                <Text className="text-white" style={styles.tokenIconText}>
                  $
                </Text>
              </View>
            }
          />
          <DetailRow
            label="Amount"
            value="Unlimited"
            valueColor="text-[#BC3C20]"
          />
          <DetailRow label="Network" value="Ethereum" />
          <DetailRow label="Network fee" value="~$1.23" />
        </View>

        {/* Buttons */}
        <View className="mt-6 flex-row gap-3">
          <Pressable
            onPress={() => navigation.goBack()}
            className="flex-1 items-center justify-center border border-white p-4"
            style={styles.rejectButton}
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
              Approve
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
    fontSize: 16,
  },
  dAppName: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 14,
  },
  dAppUrl: {
    fontFamily: "IBMPlexMono_400Regular",
    fontSize: 12,
  },
  warningBox: {
    backgroundColor: "rgba(188,60,32,0.1)",
    borderWidth: 1,
    borderColor: "#BC3C20",
  },
  warningText: {
    fontFamily: "IBMPlexMono_400Regular",
    fontSize: 12,
  },
  detailLabel: {
    fontFamily: "IBMPlexMono_400Regular",
    fontSize: 12,
  },
  detailValue: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 12,
  },
  tokenIconText: {
    fontFamily: "IBMPlexMono_600SemiBold",
    fontSize: 10,
  },
  rejectButton: {
    backgroundColor: "transparent",
  },
  buttonText: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 18,
  },
});
