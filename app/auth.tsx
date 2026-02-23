import React from "react";
import { View, Text, Pressable, Dimensions } from "react-native";
import Animated, {
  FadeInDown,
  FadeIn,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import { COLORS, SHADOWS } from "@/constants/theme";
import { useAuthStore } from "@/store/useAuthStore";
import SparkleBackground from "@/components/SparkleBackground";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function AuthScreen() {
  const router = useRouter();
  const { login, loginAsGuest } = useAuthStore();

  const handleGoogleLogin = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    login({
      id: "google-" + Date.now(),
      name: "Little Baker",
      email: "baker@example.com",
      provider: "google",
    });
    router.replace("/(tabs)");
  };

  const handleAppleLogin = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    login({
      id: "apple-" + Date.now(),
      name: "Little Baker",
      email: "baker@example.com",
      provider: "apple",
    });
    router.replace("/(tabs)");
  };

  const handleGuestLogin = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    loginAsGuest();
    router.replace("/(tabs)");
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <SparkleBackground count={12} />

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 32,
        }}
      >
        {/* Mascot */}
        <Animated.View entering={FadeInDown.delay(100).duration(800)}>
          <Text style={{ fontSize: 100, textAlign: "center" }}>🐱</Text>
        </Animated.View>

        {/* Title */}
        <Animated.View
          entering={FadeInDown.delay(300).duration(600)}
          style={{ alignItems: "center", marginTop: 16 }}
        >
          <Text
            style={{
              fontSize: 32,
              fontWeight: "900",
              color: COLORS.hotpink,
              letterSpacing: -1,
            }}
          >
            Whisk & Wishes
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: COLORS.gray,
              marginTop: 8,
              textAlign: "center",
              lineHeight: 20,
            }}
          >
            Your purrfect baking companion{"\n"}with magical recipes
          </Text>
        </Animated.View>

        {/* Cat paw divider */}
        <Animated.View
          entering={FadeIn.delay(500).duration(600)}
          style={{ marginVertical: 32 }}
        >
          <Text style={{ fontSize: 24, textAlign: "center" }}>
            🐾 🐾 🐾
          </Text>
        </Animated.View>

        {/* Google Login */}
        <Animated.View
          entering={FadeInDown.delay(600).duration(500)}
          style={{ width: "100%" }}
        >
          <Pressable
            onPress={handleGoogleLogin}
            style={{
              backgroundColor: COLORS.white,
              borderRadius: 20,
              paddingVertical: 16,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              ...SHADOWS.card,
            }}
          >
            <Text style={{ fontSize: 20 }}>G</Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "700",
                color: "#333",
              }}
            >
              Continue with Google
            </Text>
          </Pressable>
        </Animated.View>

        {/* Apple Login */}
        <Animated.View
          entering={FadeInDown.delay(700).duration(500)}
          style={{ width: "100%", marginTop: 14 }}
        >
          <Pressable
            onPress={handleAppleLogin}
            style={{
              backgroundColor: "#000",
              borderRadius: 20,
              paddingVertical: 16,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              ...SHADOWS.card,
            }}
          >
            <Text style={{ fontSize: 20, color: "#FFF" }}></Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "700",
                color: "#FFF",
              }}
            >
              Continue with Apple
            </Text>
          </Pressable>
        </Animated.View>

        {/* Guest */}
        <Animated.View
          entering={FadeInDown.delay(800).duration(500)}
          style={{ marginTop: 24 }}
        >
          <Pressable onPress={handleGuestLogin}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "600",
                color: COLORS.lavender,
                textAlign: "center",
              }}
            >
              Skip for now ~ browse as guest
            </Text>
          </Pressable>
        </Animated.View>

        {/* Footer */}
        <Animated.View
          entering={FadeIn.delay(1000).duration(600)}
          style={{ position: "absolute", bottom: 50 }}
        >
          <Text
            style={{
              fontSize: 11,
              color: COLORS.gray,
              textAlign: "center",
            }}
          >
            Made with love by kitty bakers everywhere
          </Text>
          <Text
            style={{
              fontSize: 11,
              color: COLORS.hotpink,
              textAlign: "center",
              marginTop: 4,
            }}
          >
            🐱 meow ~
          </Text>
        </Animated.View>
      </View>
    </View>
  );
}
