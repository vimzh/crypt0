import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path, Rect, Line } from "react-native-svg";

import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import type { WalletStackParamList } from "../../navigation/types";

const defaultAvatar = require("../../assets/intro/default-avatar.png");

// -- SVG Icon Components --

const BackArrowIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M19 12H5" />
    <Path d="M12 19l-7-7 7-7" />
  </Svg>
);

const QrIcon = ({ size = 20, color = "white" }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <Rect x={2} y={2} width={8} height={8} rx={1} />
    <Rect x={14} y={2} width={8} height={8} rx={1} />
    <Rect x={2} y={14} width={8} height={8} rx={1} />
    <Rect x={14} y={14} width={4} height={4} rx={0.5} />
    <Line x1={22} y1={14} x2={22} y2={14.01} />
    <Line x1={18} y1={22} x2={22} y2={22} />
    <Line x1={22} y1={18} x2={22} y2={22} />
  </Svg>
);

const CopyIcon = ({ size = 20, color = "white" }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <Rect x={9} y={9} width={13} height={13} rx={2} ry={2} />
    <Path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </Svg>
);

const CloseIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Line x1={18} y1={6} x2={6} y2={18} />
    <Line x1={6} y1={6} x2={18} y2={18} />
  </Svg>
);

// -- Chain Icon Dots --

const ChainDot = ({ color }: { color: string }) => (
  <View style={[styles.chainDot, { backgroundColor: color }]} />
);

// -- QR Code Placeholder --

const QRCodePlaceholder = () => (
  <View style={styles.qrPlaceholder}>
    {Array.from({ length: 12 }).map((_, row) => (
      <View key={row} style={styles.qrRow}>
        {Array.from({ length: 12 }).map((_, col) => (
          <View
            key={col}
            style={[
              styles.qrCell,
              { backgroundColor: (row + col) % 2 === 0 || (row < 4 && col < 4) || (row < 4 && col > 7) || (row > 7 && col < 4) ? "#000" : "#fff" },
            ]}
          />
        ))}
      </View>
    ))}
  </View>
);

// -- Address Row --

type AddressRowProps = {
  label: string;
  address: string;
  chainColors: string[];
};

const AddressRow = ({ label, address, chainColors }: AddressRowProps) => (
  <View style={styles.addressRow}>
    <View style={styles.addressInfo}>
      <Text style={styles.addressLabel}>{label}</Text>
      <Text style={styles.addressValue}>{address}</Text>
      <View style={styles.chainDots}>
        {chainColors.map((color, i) => (
          <ChainDot key={i} color={color} />
        ))}
      </View>
    </View>
    <View style={styles.addressActions}>
      <Pressable style={styles.addressActionBtn}>
        <QrIcon size={18} color="rgba(255,255,255,0.6)" />
      </Pressable>
      <Pressable style={styles.addressActionBtn}>
        <CopyIcon size={18} color="rgba(255,255,255,0.6)" />
      </Pressable>
    </View>
  </View>
);

// -- Main Screen --

export const ReceiveQR = () => {
  const navigation = useNavigation<NativeStackNavigationProp<WalletStackParamList>>();
  return (
    <View className="flex-1 bg-black">
      <StatusBar style="light" />

      <SafeAreaView className="flex-1">
        {/* Navbar */}
        <View className="flex-row items-center justify-between px-4 py-2">
          <Pressable onPress={() => navigation.goBack()} style={styles.navSide}>
            <BackArrowIcon />
          </Pressable>
          <Text style={styles.navTitle}>Receive</Text>
          <View style={styles.navSide} />
        </View>

        {/* Address Rows (behind modal) */}
        <View className="px-4 mt-4">
          <AddressRow
            label="Ethereum address"
            address="0x52...e3b5"
            chainColors={["#627EEA", "#8247E5", "#E84142"]}
          />
          <AddressRow
            label="Bitcoin address"
            address="bc1q...e3b5"
            chainColors={["#F7931A"]}
          />
        </View>

        {/* QR Modal Card */}
        <View className="flex-1 justify-center items-center px-6">
          <View style={styles.modalCard}>
            {/* Close Button */}
            <Pressable style={styles.closeBtn} onPress={() => navigation.goBack()}>
              <CloseIcon />
            </Pressable>

            {/* QR Code */}
            <View className="items-center mt-4">
              <View style={styles.qrContainer}>
                <QRCodePlaceholder />
                {/* Avatar overlay */}
                <View style={styles.avatarOverlay}>
                  <Image source={defaultAvatar} style={styles.avatarImage} />
                </View>
              </View>
            </View>

            {/* Name + Address */}
            <View className="items-center mt-4">
              <Text style={styles.ensName}>rdpilot.eth</Text>
              <View className="flex-row items-center gap-2 mt-1">
                <Text style={styles.modalAddress}>0xAFa0...893E</Text>
                <Pressable>
                  <CopyIcon size={14} color="#999" />
                </Pressable>
              </View>
            </View>
          </View>
        </View>

        {/* Share Button */}
        <View className="px-4 pb-4">
          <Pressable style={styles.shareBtn}>
            <Text style={styles.shareBtnText}>Share</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  navSide: {
    width: 40,
  },
  navTitle: {
    fontFamily: "IBMPlexMono_400Regular",
    fontSize: 14,
    color: "white",
    textAlign: "center",
  },
  addressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingVertical: 12,
  },
  addressInfo: {
    flex: 1,
  },
  addressLabel: {
    fontFamily: "IBMPlexMono_400Regular",
    fontSize: 14,
    color: "#A87AD7",
  },
  addressValue: {
    fontFamily: "IBMPlexMono_400Regular",
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.6)",
    marginTop: 4,
  },
  chainDots: {
    flexDirection: "row",
    gap: 4,
    marginTop: 6,
  },
  chainDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  addressActions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 2,
  },
  addressActionBtn: {
    padding: 4,
  },
  modalCard: {
    backgroundColor: "white",
    borderRadius: 24,
    width: "100%",
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 28,
    position: "relative",
  },
  closeBtn: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 1,
    padding: 4,
  },
  qrContainer: {
    width: 240,
    height: 240,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  qrPlaceholder: {
    width: 240,
    height: 240,
    flexDirection: "column",
    padding: 12,
    backgroundColor: "white",
  },
  qrRow: {
    flexDirection: "row",
    flex: 1,
  },
  qrCell: {
    flex: 1,
  },
  avatarOverlay: {
    position: "absolute",
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  ensName: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 14,
    color: "black",
  },
  modalAddress: {
    fontFamily: "IBMPlexMono_400Regular",
    fontSize: 12,
    color: "#999",
  },
  shareBtn: {
    backgroundColor: "white",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  shareBtnText: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 18,
    color: "black",
  },
});
