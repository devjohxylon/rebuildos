import React, { useEffect } from "react";
import { View, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { COLORS } from "@/constants/theme";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = (SCREEN_WIDTH - 48) / 2;

export default function SkeletonCard() {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.7, { duration: 800 }),
        withTiming(0.3, { duration: 800 })
      ),
      -1,
      true
    );
  }, []);

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View
      style={{
        width: CARD_WIDTH,
        backgroundColor: COLORS.bgCard,
        borderRadius: 24,
        overflow: "hidden",
        marginBottom: 16,
        shadowColor: COLORS.hotpink,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 3,
      }}
    >
      <Animated.View
        style={[
          animStyle,
          {
            width: "100%",
            height: CARD_WIDTH * 0.85,
            backgroundColor: COLORS.bgElevated,
            borderRadius: 24,
          },
        ]}
      />
      <View style={{ padding: 12 }}>
        <Animated.View
          style={[
            animStyle,
            {
              width: "80%",
              height: 14,
              backgroundColor: COLORS.bgElevated,
              borderRadius: 8,
              marginBottom: 8,
            },
          ]}
        />
        <Animated.View
          style={[
            animStyle,
            {
              width: "50%",
              height: 10,
              backgroundColor: COLORS.bgElevated,
              borderRadius: 6,
            },
          ]}
        />
      </View>
    </View>
  );
}
