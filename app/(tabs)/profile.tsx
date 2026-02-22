import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import Animated, {
  FadeInDown,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Settings,
  BookOpen,
  Award,
  Bell,
  CircleHelp,
  ChevronRight,
  Heart,
} from "lucide-react-native";
import * as Haptics from "expo-haptics";
import { COLORS, SHADOWS } from "@/constants/theme";
import { RECIPES } from "@/constants/recipes";
import { useRecipeStore } from "@/store/useRecipeStore";
import Wishy from "@/components/Wishy";
import SparkleBackground from "@/components/SparkleBackground";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  subtitle: string;
  color: string;
  delay: number;
}

function MenuItem({ icon, label, subtitle, color, delay }: MenuItemProps) {
  const scale = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    scale.value = withSequence(
      withSpring(0.96, { damping: 15, stiffness: 400 }),
      withSpring(1, { damping: 10, stiffness: 200 })
    );
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <Animated.View entering={FadeInDown.delay(delay).duration(500)}>
      <AnimatedPressable
        onPress={handlePress}
        style={[
          animStyle,
          {
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: COLORS.white,
            borderRadius: 20,
            padding: 16,
            marginBottom: 10,
            ...SHADOWS.soft,
          },
        ]}
      >
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: 14,
            backgroundColor: color + "20",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </View>
        <View style={{ flex: 1, marginLeft: 14 }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "700",
              color: COLORS.dark,
            }}
          >
            {label}
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: COLORS.gray,
              marginTop: 2,
            }}
          >
            {subtitle}
          </Text>
        </View>
        <ChevronRight size={20} color={COLORS.gray} />
      </AnimatedPressable>
    </Animated.View>
  );
}

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { favorites } = useRecipeStore();

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.pink }}>
      <SparkleBackground count={6} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Profile Header */}
        <View
          style={{
            paddingTop: insets.top + 16,
            alignItems: "center",
            paddingBottom: 24,
          }}
        >
          <Animated.View entering={FadeInDown.delay(100).duration(600)}>
            <View
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                backgroundColor: COLORS.white,
                alignItems: "center",
                justifyContent: "center",
                ...SHADOWS.card,
              }}
            >
              <Wishy size="large" showSparkles={false} />
            </View>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(200).duration(600)}
            style={{ alignItems: "center", marginTop: 16 }}
          >
            <Text
              style={{
                fontSize: 22,
                fontWeight: "800",
                color: COLORS.dark,
              }}
            >
              Little Baker 👩‍🍳
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: COLORS.hotpink,
                fontWeight: "600",
                marginTop: 4,
              }}
            >
              ✨ Baking dreams come true ✨
            </Text>
          </Animated.View>

          {/* Stats */}
          <Animated.View
            entering={FadeInDown.delay(300).duration(600)}
            style={{
              flexDirection: "row",
              marginTop: 20,
              gap: 12,
            }}
          >
            <View
              style={{
                backgroundColor: COLORS.white,
                borderRadius: 20,
                paddingHorizontal: 24,
                paddingVertical: 16,
                alignItems: "center",
                ...SHADOWS.soft,
              }}
            >
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "800",
                  color: COLORS.hotpink,
                }}
              >
                {favorites.length}
              </Text>
              <Text
                style={{
                  fontSize: 11,
                  color: COLORS.gray,
                  fontWeight: "600",
                  marginTop: 2,
                }}
              >
                Favorites
              </Text>
            </View>
            <View
              style={{
                backgroundColor: COLORS.white,
                borderRadius: 20,
                paddingHorizontal: 24,
                paddingVertical: 16,
                alignItems: "center",
                ...SHADOWS.soft,
              }}
            >
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "800",
                  color: COLORS.lavender,
                }}
              >
                {RECIPES.length}
              </Text>
              <Text
                style={{
                  fontSize: 11,
                  color: COLORS.gray,
                  fontWeight: "600",
                  marginTop: 2,
                }}
              >
                Recipes
              </Text>
            </View>
            <View
              style={{
                backgroundColor: COLORS.white,
                borderRadius: 20,
                paddingHorizontal: 24,
                paddingVertical: 16,
                alignItems: "center",
                ...SHADOWS.soft,
              }}
            >
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "800",
                  color: COLORS.mint,
                }}
              >
                5
              </Text>
              <Text
                style={{
                  fontSize: 11,
                  color: COLORS.gray,
                  fontWeight: "600",
                  marginTop: 2,
                }}
              >
                Baked
              </Text>
            </View>
          </Animated.View>
        </View>

        {/* Menu Items */}
        <View style={{ paddingHorizontal: 16 }}>
          <MenuItem
            icon={<BookOpen size={22} color={COLORS.hotpink} />}
            label="My Recipes"
            subtitle="View your saved recipes"
            color={COLORS.hotpink}
            delay={400}
          />
          <MenuItem
            icon={<Award size={22} color="#7C3AED" />}
            label="Achievements"
            subtitle="5 badges earned"
            color={COLORS.lavender}
            delay={500}
          />
          <MenuItem
            icon={<Heart size={22} color={COLORS.rose} />}
            label="Baking History"
            subtitle="Track your baking journey"
            color={COLORS.rose}
            delay={600}
          />
          <MenuItem
            icon={<Bell size={22} color={COLORS.mint} />}
            label="Notifications"
            subtitle="Recipe alerts and tips"
            color={COLORS.mint}
            delay={700}
          />
          <MenuItem
            icon={<Settings size={22} color={COLORS.gray} />}
            label="Settings"
            subtitle="App preferences"
            color={COLORS.gray}
            delay={800}
          />
          <MenuItem
            icon={<CircleHelp size={22} color={COLORS.butter} />}
            label="Help & Support"
            subtitle="FAQ and contact us"
            color={COLORS.butter}
            delay={900}
          />
        </View>

        {/* Version */}
        <Animated.View
          entering={FadeInDown.delay(1000).duration(500)}
          style={{ alignItems: "center", marginTop: 24 }}
        >
          <Text
            style={{
              fontSize: 12,
              color: COLORS.gray,
              fontWeight: "500",
            }}
          >
            Whisk & Wishes v1.0.0 🧁
          </Text>
          <Text
            style={{
              fontSize: 11,
              color: COLORS.blush,
              marginTop: 4,
            }}
          >
            Made with 💖 and sprinkles
          </Text>
        </Animated.View>
      </ScrollView>
    </View>
  );
}
