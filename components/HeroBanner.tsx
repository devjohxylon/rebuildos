import React, { useEffect } from "react";
import { View, Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withSpring,
  FadeIn,
} from "react-native-reanimated";
import { COLORS } from "@/constants/theme";
import Wishy from "./Wishy";

export default function HeroBanner() {
  const sparkle1 = useSharedValue(0);
  const sparkle2 = useSharedValue(0);

  useEffect(() => {
    sparkle1.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1000 }),
        withTiming(0.3, { duration: 1000 })
      ),
      -1,
      true
    );
    sparkle2.value = withRepeat(
      withSequence(
        withTiming(0.3, { duration: 800 }),
        withTiming(1, { duration: 800 })
      ),
      -1,
      true
    );
  }, []);

  const sparkle1Style = useAnimatedStyle(() => ({
    opacity: sparkle1.value,
    transform: [{ scale: sparkle1.value }],
  }));

  const sparkle2Style = useAnimatedStyle(() => ({
    opacity: sparkle2.value,
    transform: [{ scale: sparkle2.value }],
  }));

  return (
    <Animated.View
      entering={FadeIn.duration(800)}
      style={{
        backgroundColor: COLORS.white,
        borderRadius: 28,
        padding: 24,
        marginHorizontal: 16,
        marginTop: 8,
        marginBottom: 16,
        flexDirection: "row",
        alignItems: "center",
        shadowColor: "#FF69B4",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.12,
        shadowRadius: 20,
        elevation: 6,
      }}
    >
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "800",
              color: COLORS.dark,
              lineHeight: 30,
            }}
          >
            What are we
          </Text>
          <Animated.Text style={[sparkle1Style, { fontSize: 18 }]}>
            ✨
          </Animated.Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "800",
              color: COLORS.hotpink,
              lineHeight: 30,
            }}
          >
            baking today?
          </Text>
          <Animated.Text style={[sparkle2Style, { fontSize: 18 }]}>
            🧁
          </Animated.Text>
        </View>
        <Text
          style={{
            fontSize: 13,
            color: COLORS.gray,
            marginTop: 6,
            lineHeight: 18,
          }}
        >
          Discover magical recipes with Wishy!
        </Text>
      </View>
      <Wishy size="large" showSparkles />
    </Animated.View>
  );
}
