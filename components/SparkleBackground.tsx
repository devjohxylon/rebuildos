import React, { useEffect, useMemo } from "react";
import { View, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
} from "react-native-reanimated";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const SPARKLE_CHARS = ["✨", "💖", "⭐", "🌸", "💫", "🩷", "✿"];

interface SparkleItem {
  id: number;
  char: string;
  x: number;
  y: number;
  size: number;
  delay: number;
}

function FloatingSparkle({ sparkle }: { sparkle: SparkleItem }) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(0.5);

  useEffect(() => {
    opacity.value = withDelay(
      sparkle.delay,
      withRepeat(
        withSequence(
          withTiming(0.7, { duration: 1500 }),
          withTiming(0, { duration: 1500 })
        ),
        -1,
        false
      )
    );

    translateY.value = withDelay(
      sparkle.delay,
      withRepeat(
        withSequence(
          withTiming(-20, { duration: 3000 }),
          withTiming(0, { duration: 0 })
        ),
        -1,
        false
      )
    );

    scale.value = withDelay(
      sparkle.delay,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 1500 }),
          withTiming(0.5, { duration: 1500 })
        ),
        -1,
        false
      )
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }, { scale: scale.value }],
  }));

  return (
    <Animated.Text
      style={[
        animatedStyle,
        {
          position: "absolute",
          left: sparkle.x,
          top: sparkle.y,
          fontSize: sparkle.size,
        },
      ]}
    >
      {sparkle.char}
    </Animated.Text>
  );
}

export default function SparkleBackground({ count = 12 }: { count?: number }) {
  const sparkles = useMemo<SparkleItem[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      char: SPARKLE_CHARS[i % SPARKLE_CHARS.length],
      x: Math.random() * (SCREEN_WIDTH - 30),
      y: Math.random() * (SCREEN_HEIGHT * 0.6),
      size: 8 + Math.random() * 10,
      delay: Math.random() * 3000,
    }));
  }, [count]);

  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: "none",
      }}
    >
      {sparkles.map((sparkle) => (
        <FloatingSparkle key={sparkle.id} sparkle={sparkle} />
      ))}
    </View>
  );
}
