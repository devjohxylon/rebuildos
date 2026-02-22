import React, { useEffect, useMemo } from "react";
import { View, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from "react-native-reanimated";

const HEARTS = ["💖", "💗", "💕", "🩷", "❤️", "✨", "🌸"];

interface FloatingHeartsProps {
  trigger: number;
  originX?: number;
  originY?: number;
}

function SingleHeart({
  delay,
  char,
  startX,
  startY,
}: {
  delay: number;
  char: string;
  startX: number;
  startY: number;
}) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(0);
  const translateX = useSharedValue(0);
  const scale = useSharedValue(0.3);
  const rotation = useSharedValue(0);

  useEffect(() => {
    const targetX = (Math.random() - 0.5) * 120;
    const targetY = -(80 + Math.random() * 100);

    opacity.value = withDelay(
      delay,
      withTiming(1, { duration: 200 }, () => {
        opacity.value = withDelay(400, withTiming(0, { duration: 500 }));
      })
    );

    translateY.value = withDelay(
      delay,
      withTiming(targetY, {
        duration: 1100,
        easing: Easing.out(Easing.cubic),
      })
    );

    translateX.value = withDelay(
      delay,
      withTiming(targetX, {
        duration: 1100,
        easing: Easing.out(Easing.cubic),
      })
    );

    scale.value = withDelay(
      delay,
      withTiming(1 + Math.random() * 0.5, { duration: 400 }, () => {
        scale.value = withTiming(0.3, { duration: 700 });
      })
    );

    rotation.value = withDelay(
      delay,
      withTiming((Math.random() - 0.5) * 60, { duration: 1100 })
    );
  }, []);

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
      { rotate: `${rotation.value}deg` },
    ],
  }));

  return (
    <Animated.Text
      style={[
        animStyle,
        {
          position: "absolute",
          left: startX,
          top: startY,
          fontSize: 20 + Math.random() * 10,
        },
      ]}
    >
      {char}
    </Animated.Text>
  );
}

export default function FloatingHearts({
  trigger,
  originX = Dimensions.get("window").width / 2,
  originY = Dimensions.get("window").height / 2,
}: FloatingHeartsProps) {
  const hearts = useMemo(() => {
    if (trigger === 0) return [];
    return Array.from({ length: 8 }, (_, i) => ({
      id: `${trigger}-${i}`,
      delay: i * 60,
      char: HEARTS[i % HEARTS.length],
      startX: originX - 10 + (Math.random() - 0.5) * 20,
      startY: originY - 10,
    }));
  }, [trigger, originX, originY]);

  if (hearts.length === 0) return null;

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
      {hearts.map((heart) => (
        <SingleHeart
          key={heart.id}
          delay={heart.delay}
          char={heart.char}
          startX={heart.startX}
          startY={heart.startY}
        />
      ))}
    </View>
  );
}
