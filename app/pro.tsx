import React from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import Animated, {
  FadeInDown,
  FadeIn,
  SlideInDown,
} from "react-native-reanimated";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ArrowLeft, Crown, Check, Star, Sparkles, Lock } from "lucide-react-native";
import * as Haptics from "expo-haptics";
import { COLORS, SHADOWS } from "@/constants/theme";
import { useProStore } from "@/store/useProStore";
import SparkleBackground from "@/components/SparkleBackground";

const FEATURES = [
  { icon: "🐱", title: "All 150+ Recipes", desc: "Unlock every single recipe in the collection" },
  { icon: "👑", title: "Exclusive Pastries", desc: "Pro-only gourmet baking recipes" },
  { icon: "🎀", title: "No Limits", desc: "Unlimited custom recipe storage" },
  { icon: "✨", title: "Early Access", desc: "New recipes added weekly, you get them first" },
  { icon: "🌙", title: "Dark Kitty Themes", desc: "Exclusive theme customization" },
  { icon: "🐾", title: "Support Kitty Devs", desc: "Help us keep baking new features" },
];

export default function ProScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { isPro, activatePro } = useProStore();

  const handleSubscribe = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    activatePro();
    router.back();
  };

  const handleRestore = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    activatePro();
    router.back();
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <SparkleBackground count={15} />

      {/* Header */}
      <View
        style={{
          paddingTop: insets.top + 8,
          paddingHorizontal: 16,
          paddingBottom: 8,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Pressable
          onPress={() => router.back()}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: COLORS.bgCard,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ArrowLeft size={22} color={COLORS.white} />
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Crown */}
        <Animated.View
          entering={FadeInDown.delay(100).duration(600)}
          style={{ alignItems: "center", marginTop: 16 }}
        >
          <View
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: COLORS.gold + "20",
              alignItems: "center",
              justifyContent: "center",
              ...SHADOWS.glow,
            }}
          >
            <Text style={{ fontSize: 50 }}>👑</Text>
          </View>
        </Animated.View>

        {/* Title */}
        <Animated.View
          entering={FadeInDown.delay(200).duration(600)}
          style={{ alignItems: "center", marginTop: 20, paddingHorizontal: 32 }}
        >
          <Text
            style={{
              fontSize: 28,
              fontWeight: "900",
              color: COLORS.gold,
              textAlign: "center",
            }}
          >
            Whisk & Wishes Pro
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
            Unlock all recipes and become the ultimate kitty baker
          </Text>
        </Animated.View>

        {/* Features */}
        <View style={{ paddingHorizontal: 20, marginTop: 28 }}>
          {FEATURES.map((feature, index) => (
            <Animated.View
              key={index}
              entering={FadeInDown.delay(300 + index * 80).duration(500)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: COLORS.bgCard,
                borderRadius: 20,
                padding: 16,
                marginBottom: 10,
                gap: 14,
                ...SHADOWS.soft,
              }}
            >
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 16,
                  backgroundColor: COLORS.bgElevated,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontSize: 24 }}>{feature.icon}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "700",
                    color: COLORS.white,
                  }}
                >
                  {feature.title}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: COLORS.gray,
                    marginTop: 2,
                  }}
                >
                  {feature.desc}
                </Text>
              </View>
              <Check size={18} color={COLORS.mint} />
            </Animated.View>
          ))}
        </View>

        {/* Pricing */}
        <Animated.View
          entering={SlideInDown.delay(800).duration(600)}
          style={{ paddingHorizontal: 20, marginTop: 20 }}
        >
          {/* Monthly */}
          <Pressable
            onPress={handleSubscribe}
            style={{
              backgroundColor: COLORS.hotpink,
              borderRadius: 24,
              paddingVertical: 20,
              paddingHorizontal: 24,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              ...SHADOWS.button,
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "800",
                  color: COLORS.white,
                }}
              >
                Monthly Plan
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: COLORS.white + "CC",
                  marginTop: 2,
                }}
              >
                Billed monthly, cancel anytime
              </Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "900",
                  color: COLORS.white,
                }}
              >
                $4.99
              </Text>
              <Text
                style={{
                  fontSize: 11,
                  color: COLORS.white + "CC",
                }}
              >
                /month
              </Text>
            </View>
          </Pressable>

          {/* Yearly */}
          <Pressable
            onPress={handleSubscribe}
            style={{
              backgroundColor: COLORS.bgCard,
              borderRadius: 24,
              paddingVertical: 20,
              paddingHorizontal: 24,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 12,
              borderWidth: 2,
              borderColor: COLORS.gold,
              ...SHADOWS.card,
            }}
          >
            <View>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "800",
                    color: COLORS.gold,
                  }}
                >
                  Yearly Plan
                </Text>
                <View
                  style={{
                    backgroundColor: COLORS.gold,
                    paddingHorizontal: 8,
                    paddingVertical: 2,
                    borderRadius: 8,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: "800",
                      color: COLORS.bg,
                    }}
                  >
                    SAVE 50%
                  </Text>
                </View>
              </View>
              <Text
                style={{
                  fontSize: 12,
                  color: COLORS.gray,
                  marginTop: 2,
                }}
              >
                Best value! Billed yearly
              </Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "900",
                  color: COLORS.gold,
                }}
              >
                $29.99
              </Text>
              <Text style={{ fontSize: 11, color: COLORS.gray }}>
                /year
              </Text>
            </View>
          </Pressable>
        </Animated.View>

        {/* Restore */}
        <Animated.View
          entering={FadeIn.delay(1000).duration(500)}
          style={{ alignItems: "center", marginTop: 20 }}
        >
          <Pressable onPress={handleRestore}>
            <Text
              style={{
                fontSize: 13,
                fontWeight: "600",
                color: COLORS.lavender,
              }}
            >
              Restore Purchase
            </Text>
          </Pressable>
        </Animated.View>

        <Animated.View
          entering={FadeIn.delay(1100).duration(500)}
          style={{ alignItems: "center", marginTop: 16, paddingHorizontal: 40 }}
        >
          <Text
            style={{
              fontSize: 10,
              color: COLORS.gray,
              textAlign: "center",
              lineHeight: 16,
            }}
          >
            Subscriptions auto-renew unless cancelled at least 24 hours before
            the end of the current period. Manage in Settings.
          </Text>
        </Animated.View>
      </ScrollView>
    </View>
  );
}
