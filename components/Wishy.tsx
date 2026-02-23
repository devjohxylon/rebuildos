import React from "react";
import { View, Text } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";

interface WishyProps {
  size?: "small" | "medium" | "large" | "hero";
  message?: string;
  showSparkles?: boolean;
}

export default function Wishy({
  size = "medium",
  message,
  showSparkles = true,
}: WishyProps) {
  const bounce = useSharedValue(0);
  const sparkleOpacity = useSharedValue(0.5);

  const sizeMap = {
    small: 40,
    medium: 64,
    large: 96,
    hero: 140,
  };

  const fontSize = {
    small: 24,
    medium: 40,
    large: 64,
    hero: 90,
  };

  useEffect(() => {
    bounce.value = withRepeat(
      withSequence(
        withTiming(-6, { duration: 800 }),
        withTiming(0, { duration: 800 })
      ),
      -1,
      true
    );

    sparkleOpacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 600 }),
        withTiming(0.3, { duration: 600 })
      ),
      -1,
      true
    );
  }, []);

  const bounceStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: bounce.value }],
  }));

  const sparkleStyle = useAnimatedStyle(() => ({
    opacity: sparkleOpacity.value,
  }));

  const dim = sizeMap[size];
  const fSize = fontSize[size];

  return (
    <View style={{ alignItems: "center" }}>
      <Animated.View
        style={[
          bounceStyle,
          {
            width: dim,
            height: dim,
            alignItems: "center",
            justifyContent: "center",
          },
        ]}
      >
        {showSparkles && (
          <>
            <Animated.Text
              style={[
                sparkleStyle,
                {
                  position: "absolute",
                  top: -4,
                  right: -2,
                  fontSize: fSize * 0.25,
                },
              ]}
            >
              🐾
            </Animated.Text>
            <Animated.Text
              style={[
                sparkleStyle,
                {
                  position: "absolute",
                  top: 2,
                  left: -4,
                  fontSize: fSize * 0.2,
                },
              ]}
            >
              💖
            </Animated.Text>
          </>
        )}
        <Text style={{ fontSize: fSize, textAlign: "center" }}>🐱</Text>
      </Animated.View>
      {message && (
        <Text
          style={{
            fontSize: size === "hero" ? 14 : 11,
            color: "#FF69B4",
            fontWeight: "600",
            marginTop: 4,
            textAlign: "center",
          }}
        >
          {message}
        </Text>
      )}
    </View>
  );
}
