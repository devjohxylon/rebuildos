import React from "react";
import { View, Text, Pressable } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Heart, Bell } from "lucide-react-native";
import { COLORS } from "@/constants/theme";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function Header() {
  const insets = useSafeAreaInsets();
  const heartScale = useSharedValue(1);
  const bellScale = useSharedValue(1);

  const heartStyle = useAnimatedStyle(() => ({
    transform: [{ scale: heartScale.value }],
  }));

  const bellStyle = useAnimatedStyle(() => ({
    transform: [{ scale: bellScale.value }],
  }));

  const bounceHeart = () => {
    heartScale.value = withSequence(
      withSpring(1.3, { damping: 8, stiffness: 400 }),
      withSpring(1, { damping: 10, stiffness: 200 })
    );
  };

  const bounceBell = () => {
    bellScale.value = withSequence(
      withSpring(1.3, { damping: 8, stiffness: 400 }),
      withSpring(1, { damping: 10, stiffness: 200 })
    );
  };

  return (
    <View
      style={{
        paddingTop: insets.top + 8,
        paddingHorizontal: 16,
        paddingBottom: 8,
        backgroundColor: COLORS.pink,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Logo */}
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <Text style={{ fontSize: 28 }}>🧁</Text>
        <View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "800",
              color: COLORS.hotpink,
              letterSpacing: -0.5,
            }}
          >
            Whisk & Wishes
          </Text>
          <Text style={{ fontSize: 10, color: COLORS.rose, fontWeight: "600" }}>
            ✨ Magical Recipes ✨
          </Text>
        </View>
      </View>

      {/* Actions */}
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        <AnimatedPressable
          onPress={bounceBell}
          style={[
            bellStyle,
            {
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: COLORS.white,
              alignItems: "center",
              justifyContent: "center",
              shadowColor: COLORS.hotpink,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 3,
            },
          ]}
        >
          <Bell size={20} color={COLORS.hotpink} />
        </AnimatedPressable>

        <AnimatedPressable
          onPress={bounceHeart}
          style={[
            heartStyle,
            {
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: COLORS.hotpink,
              alignItems: "center",
              justifyContent: "center",
              shadowColor: COLORS.hotpink,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 8,
              elevation: 3,
            },
          ]}
        >
          <Heart size={20} color={COLORS.white} fill={COLORS.white} />
        </AnimatedPressable>
      </View>
    </View>
  );
}
