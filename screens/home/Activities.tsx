import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path, Circle, Line, Rect } from "react-native-svg";
import React from "react";

// -- SVG Icon Components --

const SettingsIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <Circle cx={12} cy={12} r={3} />
    <Path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </Svg>
);

const SortIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <Line x1={4} y1={6} x2={20} y2={6} />
    <Line x1={4} y1={12} x2={16} y2={12} />
    <Line x1={4} y1={18} x2={12} y2={18} />
  </Svg>
);

// -- Types --

type TagPill = {
  amount: string;
  token: string;
  direction: "In" | "Out";
  color: string;
};

type ActivityItem = {
  description: React.ReactNode;
  images?: number;
  tags: TagPill[];
};

type ActivitySection = {
  title: string;
  items: ActivityItem[];
};

// -- Helpers --

const P = ({ children }: { children: React.ReactNode }) => (
  <Text style={styles.descriptionText}>{children}</Text>
);

const H = ({ children }: { children: React.ReactNode }) => (
  <Text style={styles.highlightText}>{children}</Text>
);

// -- Tag Pill Component --

const Tag = ({ tag }: { tag: TagPill }) => (
  <View style={styles.tagPill} className="flex-row items-center gap-1.5">
    <View style={[styles.tagDot, { backgroundColor: tag.color }]} />
    <Text style={styles.tagText}>
      {tag.amount} {tag.token}{" "}
      <Text style={styles.tagDirection}>{tag.direction}</Text>
    </Text>
  </View>
);

// -- Image Placeholder --

const ImagePlaceholder = () => (
  <View style={styles.imagePlaceholder} />
);

// -- Section Separator --

const SectionHeader = ({ title }: { title: string }) => (
  <View className="flex-row items-center gap-3">
    <Text style={styles.sectionTitle}>{title}</Text>
    <View className="flex-1 h-px bg-white/10" />
  </View>
);

// -- Activity Data --

const sections: ActivitySection[] = [
  {
    title: "Yesterday",
    items: [
      {
        description: (
          <P>
            Bought <H>Bean#2210</H>, <H>Bean#3021</H> on <H>OpenSea</H>
          </P>
        ),
        images: 2,
        tags: [
          { amount: "0.48", token: "ETH", direction: "Out", color: "#627EEA" },
        ],
      },
      {
        description: (
          <P>
            Swapped <H>1,000 USDC</H> for <H>1,239,029.221 RFD</H> on{" "}
            <H>Uniswap V2</H>
          </P>
        ),
        tags: [
          { amount: "1,239,029.221", token: "RFD", direction: "In", color: "#20BCA4" },
          { amount: "1,000", token: "USDC", direction: "Out", color: "#2775CA" },
        ],
      },
    ],
  },
  {
    title: "This Week",
    items: [
      {
        description: (
          <P>
            Pooled <H>100 USDC</H> on <H>Compound</H>
          </P>
        ),
        tags: [
          { amount: "100", token: "USDC", direction: "Out", color: "#2775CA" },
        ],
      },
      {
        description: (
          <P>
            Approved <H>150.0k FLC</H> on <H>0xc344...fe82</H>
          </P>
        ),
        tags: [],
      },
      {
        description: (
          <P>
            Swapped <H>0.3270 ETH</H> for <H>50.0K FLC</H> on{" "}
            <H>Uniswap V3</H>
          </P>
        ),
        tags: [
          { amount: "50.0K", token: "FLC", direction: "In", color: "#E84142" },
          { amount: "0.3270", token: "ETH", direction: "Out", color: "#627EEA" },
        ],
      },
      {
        description: (
          <P>
            Bought <H>1 Azuki Elemental</H> on <H>Blur Lend</H>
          </P>
        ),
        images: 1,
        tags: [
          { amount: "0.4621", token: "ETH", direction: "Out", color: "#627EEA" },
        ],
      },
    ],
  },
];

// -- Main Screen --

export const Activities = () => {

  return (
    <View className="flex-1 bg-black">
      <StatusBar style="light" />

      <SafeAreaView className="flex-1" edges={["top"]}>
        {/* Top Navbar */}
        <View className="flex-row items-center justify-between px-4 py-2">
          <Pressable>
            <SettingsIcon />
          </Pressable>
          <Text style={styles.navTitle}>Activities</Text>
          <Pressable>
            <SortIcon />
          </Pressable>
        </View>

        {/* Activity List */}
        <ScrollView className="flex-1 px-4 mt-4">
          {sections.map((section, sIdx) => (
            <View key={section.title} style={sIdx > 0 ? { marginTop: 24 } : undefined}>
              <SectionHeader title={section.title} />
              <View style={{ gap: 8, marginTop: 12 }}>
                {section.items.map((item, iIdx) => (
                  <View key={iIdx}>
                    {item.description}

                    {item.images && item.images > 0 && (
                      <View className="flex-row gap-2 mt-2">
                        {Array.from({ length: item.images }).map((_, i) => (
                          <ImagePlaceholder key={i} />
                        ))}
                      </View>
                    )}

                    {item.tags.length > 0 && (
                      <View className="flex-row flex-wrap gap-2 mt-2">
                        {item.tags.map((tag, tIdx) => (
                          <Tag key={tIdx} tag={tag} />
                        ))}
                      </View>
                    )}
                  </View>
                ))}
              </View>
            </View>
          ))}
          {/* Bottom spacing for scroll */}
          <View style={{ height: 24 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  navTitle: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 12,
    color: "white",
  },
  sectionTitle: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.6)",
  },
  descriptionText: {
    fontFamily: "IBMPlexMono_400Regular",
    fontSize: 14,
    color: "white",
    lineHeight: 20,
  },
  highlightText: {
    fontFamily: "IBMPlexMono_400Regular",
    fontSize: 14,
    color: "#7B3FE4",
  },
  imagePlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 4,
    backgroundColor: "#333",
  },
  tagPill: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 4,
    padding: 8,
  },
  tagDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  tagText: {
    fontFamily: "IBMPlexMono_500Medium",
    fontSize: 12,
    color: "white",
  },
  tagDirection: {
    color: "rgba(255, 255, 255, 0.6)",
  },
});
