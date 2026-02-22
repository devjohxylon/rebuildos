import React, { useCallback } from "react";
import { View, Text, Pressable, Dimensions } from "react-native";
import { Image } from "expo-image";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { Heart, Clock, Star } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useRecipeStore } from "@/store/useRecipeStore";
import { COLORS, SHADOWS } from "@/constants/theme";
import type { Recipe } from "@/constants/recipes";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = (SCREEN_WIDTH - 48) / 2;

interface RecipeCardProps {
  recipe: Recipe;
  index?: number;
}

export default function RecipeCard({ recipe, index = 0 }: RecipeCardProps) {
  const router = useRouter();
  const { isFavorite, toggleFavorite } = useRecipeStore();
  const favorited = isFavorite(recipe.id);

  const cardScale = useSharedValue(1);
  const heartScale = useSharedValue(1);
  const heartBurstOpacity = useSharedValue(0);

  const cardAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: cardScale.value }],
  }));

  const heartAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: heartScale.value }],
  }));

  const heartBurstStyle = useAnimatedStyle(() => ({
    opacity: heartBurstOpacity.value,
    transform: [{ scale: heartBurstOpacity.value * 2 }],
  }));

  const triggerHaptic = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  }, []);

  const handleCardPress = useCallback(() => {
    cardScale.value = withSequence(
      withSpring(0.95, { damping: 15, stiffness: 300 }),
      withSpring(1, { damping: 10, stiffness: 200 })
    );
    runOnJS(triggerHaptic)();
    router.push(`/recipe/${recipe.id}`);
  }, [recipe.id]);

  const handleHeartPress = useCallback(() => {
    heartScale.value = withSequence(
      withSpring(0.6, { damping: 15, stiffness: 400 }),
      withSpring(1.3, { damping: 8, stiffness: 300 }),
      withSpring(1, { damping: 10, stiffness: 200 })
    );

    if (!favorited) {
      heartBurstOpacity.value = withSequence(
        withTiming(1, { duration: 200 }),
        withTiming(0, { duration: 600 })
      );
    }

    runOnJS(triggerHaptic)();
    toggleFavorite(recipe.id);
  }, [recipe.id, favorited]);

  return (
    <AnimatedPressable
      onPress={handleCardPress}
      style={[
        cardAnimStyle,
        {
          width: CARD_WIDTH,
          backgroundColor: "#FFFFFF",
          borderRadius: 24,
          overflow: "hidden",
          marginBottom: 16,
          ...SHADOWS.card,
        },
      ]}
    >
      {/* Image */}
      <View style={{ position: "relative" }}>
        <Image
          source={{ uri: recipe.image }}
          style={{ width: "100%", height: CARD_WIDTH * 0.85, borderRadius: 24 }}
          contentFit="cover"
          transition={300}
        />

        {/* Heart button */}
        <Pressable
          onPress={handleHeartPress}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            width: 36,
            height: 36,
            borderRadius: 18,
            backgroundColor: "rgba(255,255,255,0.9)",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Animated.View style={heartAnimStyle}>
            <Heart
              size={18}
              color={favorited ? "#FF69B4" : "#D1D5DB"}
              fill={favorited ? "#FF69B4" : "transparent"}
            />
          </Animated.View>
          {/* Heart burst effect */}
          <Animated.Text
            style={[
              heartBurstStyle,
              {
                position: "absolute",
                fontSize: 20,
              },
            ]}
          >
            💖
          </Animated.Text>
        </Pressable>

        {/* Time badge */}
        <View
          style={{
            position: "absolute",
            bottom: 10,
            left: 10,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: COLORS.hotpink,
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 20,
            gap: 4,
          }}
        >
          <Clock size={12} color="#FFFFFF" />
          <Text style={{ color: "#FFFFFF", fontSize: 11, fontWeight: "700" }}>
            {recipe.time}
          </Text>
        </View>
      </View>

      {/* Content */}
      <View style={{ padding: 12 }}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "700",
            color: COLORS.dark,
            marginBottom: 6,
          }}
          numberOfLines={2}
        >
          {recipe.title}
        </Text>

        {/* Rating */}
        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
          <Star size={13} color="#FDE68A" fill="#FDE68A" />
          <Text
            style={{
              fontSize: 12,
              fontWeight: "600",
              color: COLORS.dark,
            }}
          >
            {recipe.rating}
          </Text>
          <Text style={{ fontSize: 11, color: COLORS.gray }}>
            · {recipe.difficulty}
          </Text>
        </View>
      </View>
    </AnimatedPressable>
  );
}
