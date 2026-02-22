import React from "react";
import { Pressable, Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  runOnJS,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { COLORS, SHADOWS } from "@/constants/theme";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface CategoryChipProps {
  label: string;
  emoji: string;
  isActive: boolean;
  onPress: () => void;
}

export default function CategoryChip({
  label,
  emoji,
  isActive,
  onPress,
}: CategoryChipProps) {
  const scale = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    scale.value = withSequence(
      withSpring(0.9, { damping: 15, stiffness: 400 }),
      withSpring(1, { damping: 10, stiffness: 200 })
    );
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  return (
    <AnimatedPressable
      onPress={handlePress}
      style={[
        animStyle,
        {
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 18,
          paddingVertical: 10,
          borderRadius: 25,
          backgroundColor: isActive ? COLORS.hotpink : COLORS.white,
          marginRight: 10,
          gap: 6,
          ...(isActive ? SHADOWS.button : SHADOWS.soft),
        },
      ]}
    >
      <Text style={{ fontSize: 16 }}>{emoji}</Text>
      <Text
        style={{
          fontSize: 14,
          fontWeight: "700",
          color: isActive ? COLORS.white : COLORS.dark,
        }}
      >
        {label}
      </Text>
    </AnimatedPressable>
  );
}
