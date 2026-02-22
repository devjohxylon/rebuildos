import React, { useEffect, useMemo } from "react";
import { View, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from "react-native-reanimated";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const CONFETTI_CHARS = ["🎉", "🎊", "✨", "💖", "🌟", "🩷", "💫", "🎀", "⭐", "🧁"];
const CONFETTI_COLORS = ["#FF69B4", "#C4B5FD", "#67E8B5", "#FDE68A", "#FF8FAB", "#BAE6FD"];

interface ConfettiPiece {
  id: number;
  isEmoji: boolean;
  char?: string;
  color?: string;
  startX: number;
  delay: number;
  targetX: number;
  targetY: number;
  rotation: number;
  size: number;
}

function ConfettiItem({ piece }: { piece: ConfettiPiece }) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(-50);
  const translateX = useSharedValue(piece.startX);
  const rotate = useSharedValue(0);
  const scale = useSharedValue(0);

  useEffect(() => {
    opacity.value = withDelay(
      piece.delay,
      withTiming(1, { duration: 200 }, () => {
        opacity.value = withDelay(800, withTiming(0, { duration: 400 }));
      })
    );

    translateY.value = withDelay(
      piece.delay,
      withTiming(piece.targetY, {
        duration: 1400,
        easing: Easing.out(Easing.quad),
      })
    );

    translateX.value = withDelay(
      piece.delay,
      withTiming(piece.targetX, {
        duration: 1400,
        easing: Easing.out(Easing.quad),
      })
    );

    rotate.value = withDelay(
      piece.delay,
      withTiming(piece.rotation, {
        duration: 1400,
      })
    );

    scale.value = withDelay(
      piece.delay,
      withTiming(1, { duration: 300 }, () => {
        scale.value = withDelay(600, withTiming(0, { duration: 500 }));
      })
    );
  }, []);

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { rotate: `${rotate.value}deg` },
      { scale: scale.value },
    ],
  }));

  if (piece.isEmoji) {
    return (
      <Animated.Text
        style={[
          animStyle,
          {
            position: "absolute",
            fontSize: piece.size,
          },
        ]}
      >
        {piece.char}
      </Animated.Text>
    );
  }

  return (
    <Animated.View
      style={[
        animStyle,
        {
          position: "absolute",
          width: piece.size,
          height: piece.size * 0.6,
          backgroundColor: piece.color,
          borderRadius: 2,
        },
      ]}
    />
  );
}

interface ConfettiExplosionProps {
  trigger: number;
}

export default function ConfettiExplosion({ trigger }: ConfettiExplosionProps) {
  const pieces = useMemo(() => {
    if (trigger === 0) return [];

    const result: ConfettiPiece[] = [];
    const centerX = SCREEN_WIDTH / 2;

    for (let i = 0; i < 30; i++) {
      const isEmoji = i < 10;
      result.push({
        id: i,
        isEmoji,
        char: isEmoji ? CONFETTI_CHARS[i % CONFETTI_CHARS.length] : undefined,
        color: !isEmoji ? CONFETTI_COLORS[i % CONFETTI_COLORS.length] : undefined,
        startX: centerX - 10 + (Math.random() - 0.5) * 40,
        delay: Math.random() * 300,
        targetX: (Math.random() - 0.5) * SCREEN_WIDTH * 0.8,
        targetY: SCREEN_HEIGHT * 0.3 + Math.random() * SCREEN_HEIGHT * 0.4,
        rotation: (Math.random() - 0.5) * 720,
        size: isEmoji ? 16 + Math.random() * 12 : 8 + Math.random() * 6,
      });
    }
    return result;
  }, [trigger]);

  if (pieces.length === 0) return null;

  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: "none",
        zIndex: 999,
      }}
    >
      {pieces.map((piece) => (
        <ConfettiItem key={`${trigger}-${piece.id}`} piece={piece} />
      ))}
    </View>
  );
}
