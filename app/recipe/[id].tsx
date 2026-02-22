import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Dimensions,
  Alert,
} from "react-native";
import { Image } from "expo-image";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
  FadeInDown,
  FadeIn,
  runOnJS,
  SlideInDown,
} from "react-native-reanimated";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  ArrowLeft,
  Heart,
  Clock,
  ChefHat,
  Users,
  Minus,
  Plus,
  Timer,
  Star,
  Check,
  Share2,
} from "lucide-react-native";
import * as Haptics from "expo-haptics";
import { COLORS, SHADOWS } from "@/constants/theme";
import { RECIPES } from "@/constants/recipes";
import { useRecipeStore } from "@/store/useRecipeStore";
import FloatingHearts from "@/components/FloatingHearts";
import ConfettiExplosion from "@/components/ConfettiExplosion";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const recipe = RECIPES.find((r) => r.id === id);

  const { isFavorite, toggleFavorite, toggleIngredient, isIngredientChecked } =
    useRecipeStore();

  const [servings, setServings] = useState(recipe?.servings ?? 4);
  const [heartTrigger, setHeartTrigger] = useState(0);
  const [confettiTrigger, setConfettiTrigger] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const favorited = recipe ? isFavorite(recipe.id) : false;

  // Animations
  const heartScale = useSharedValue(1);
  const backScale = useSharedValue(1);
  const headerOpacity = useSharedValue(0);

  const heartAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: heartScale.value }],
  }));

  const backAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: backScale.value }],
  }));

  // Cleanup timer
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const handleFavorite = useCallback(() => {
    if (!recipe) return;

    heartScale.value = withSequence(
      withSpring(0.5, { damping: 15, stiffness: 400 }),
      withSpring(1.4, { damping: 6, stiffness: 300 }),
      withSpring(1, { damping: 10, stiffness: 200 })
    );

    if (!favorited) {
      setHeartTrigger((t) => t + 1);
    }

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    toggleFavorite(recipe.id);
  }, [recipe, favorited]);

  const handleBack = useCallback(() => {
    backScale.value = withSequence(
      withSpring(0.9, { damping: 15, stiffness: 400 }),
      withSpring(1, { damping: 10, stiffness: 200 })
    );
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  }, []);

  const adjustServings = useCallback(
    (delta: number) => {
      const newVal = servings + delta;
      if (newVal >= 1 && newVal <= 24) {
        setServings(newVal);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    },
    [servings]
  );

  const startTimer = useCallback(() => {
    if (!recipe) return;

    // Parse time string to get minutes
    const minutes = parseInt(recipe.time) || 1;
    const totalSeconds = minutes * 60;

    if (timerRunning) {
      // Stop timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setTimerRunning(false);
      setTimerSeconds(0);
      return;
    }

    setTimerSeconds(totalSeconds);
    setTimerRunning(true);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    timerRef.current = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          setTimerRunning(false);
          setConfettiTrigger((t) => t + 1);
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          Alert.alert(
            "🎉 Time's Up!",
            `Your ${recipe.title} should be ready! Wishy is so excited! 🧁✨`,
            [{ text: "Yay! 🩷" }]
          );
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [recipe, timerRunning]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  if (!recipe) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.pink,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 18, color: COLORS.dark }}>
          Recipe not found 😢
        </Text>
      </View>
    );
  }

  const difficultyColor =
    recipe.difficulty === "Easy"
      ? COLORS.mint
      : recipe.difficulty === "Medium"
      ? COLORS.butter
      : COLORS.rose;

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.pink }}>
      <FloatingHearts trigger={heartTrigger} />
      <ConfettiExplosion trigger={confettiTrigger} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Hero Image */}
        <View style={{ position: "relative" }}>
          <Image
            source={{ uri: recipe.image }}
            style={{
              width: SCREEN_WIDTH,
              height: SCREEN_HEIGHT * 0.42,
            }}
            contentFit="cover"
            transition={400}
          />

          {/* Gradient overlay at bottom */}
          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 80,
              backgroundColor: "transparent",
            }}
          />

          {/* Curved bottom overlay */}
          <View
            style={{
              position: "absolute",
              bottom: -1,
              left: 0,
              right: 0,
              height: 30,
              backgroundColor: COLORS.pink,
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
            }}
          />

          {/* Top buttons */}
          <View
            style={{
              position: "absolute",
              top: insets.top + 8,
              left: 16,
              right: 16,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <AnimatedPressable
              onPress={handleBack}
              style={[
                backAnimStyle,
                {
                  width: 42,
                  height: 42,
                  borderRadius: 21,
                  backgroundColor: "rgba(255,255,255,0.9)",
                  alignItems: "center",
                  justifyContent: "center",
                  ...SHADOWS.button,
                },
              ]}
            >
              <ArrowLeft size={22} color={COLORS.dark} />
            </AnimatedPressable>

            <View style={{ flexDirection: "row", gap: 10 }}>
              <Pressable
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 21,
                  backgroundColor: "rgba(255,255,255,0.9)",
                  alignItems: "center",
                  justifyContent: "center",
                  ...SHADOWS.button,
                }}
              >
                <Share2 size={20} color={COLORS.dark} />
              </Pressable>

              <AnimatedPressable
                onPress={handleFavorite}
                style={[
                  heartAnimStyle,
                  {
                    width: 42,
                    height: 42,
                    borderRadius: 21,
                    backgroundColor: favorited
                      ? COLORS.hotpink
                      : "rgba(255,255,255,0.9)",
                    alignItems: "center",
                    justifyContent: "center",
                    ...SHADOWS.button,
                  },
                ]}
              >
                <Heart
                  size={20}
                  color={favorited ? COLORS.white : COLORS.hotpink}
                  fill={favorited ? COLORS.white : "transparent"}
                />
              </AnimatedPressable>
            </View>
          </View>
        </View>

        {/* Content */}
        <View style={{ paddingHorizontal: 20, marginTop: -4 }}>
          {/* Title & Rating */}
          <Animated.View entering={FadeInDown.delay(100).duration(500)}>
            <Text
              style={{
                fontSize: 26,
                fontWeight: "800",
                color: COLORS.dark,
                lineHeight: 32,
              }}
            >
              {recipe.title}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 6,
                marginTop: 8,
              }}
            >
              <Star size={16} color="#FDE68A" fill="#FDE68A" />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "700",
                  color: COLORS.dark,
                }}
              >
                {recipe.rating}
              </Text>
              <Text style={{ fontSize: 13, color: COLORS.gray }}>
                · {recipe.category.charAt(0).toUpperCase() + recipe.category.slice(1)}
              </Text>
            </View>
          </Animated.View>

          {/* Info badges */}
          <Animated.View
            entering={FadeInDown.delay(200).duration(500)}
            style={{
              flexDirection: "row",
              marginTop: 16,
              gap: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: COLORS.hotpink + "15",
                paddingHorizontal: 14,
                paddingVertical: 10,
                borderRadius: 16,
                gap: 6,
              }}
            >
              <Clock size={16} color={COLORS.hotpink} />
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "700",
                  color: COLORS.hotpink,
                }}
              >
                {recipe.time}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: difficultyColor + "25",
                paddingHorizontal: 14,
                paddingVertical: 10,
                borderRadius: 16,
                gap: 6,
              }}
            >
              <ChefHat size={16} color={difficultyColor} />
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "700",
                  color: difficultyColor,
                }}
              >
                {recipe.difficulty}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: COLORS.lavender + "30",
                paddingHorizontal: 14,
                paddingVertical: 10,
                borderRadius: 16,
                gap: 6,
              }}
            >
              <Users size={16} color="#7C3AED" />
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "700",
                  color: "#7C3AED",
                }}
              >
                {servings}
              </Text>
            </View>
          </Animated.View>

          {/* Description */}
          <Animated.View entering={FadeInDown.delay(250).duration(500)}>
            <Text
              style={{
                fontSize: 14,
                color: COLORS.gray,
                lineHeight: 22,
                marginTop: 16,
              }}
            >
              {recipe.description}
            </Text>
          </Animated.View>

          {/* Servings stepper */}
          <Animated.View
            entering={FadeInDown.delay(300).duration(500)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: COLORS.white,
              borderRadius: 20,
              padding: 16,
              marginTop: 20,
              ...SHADOWS.soft,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: "700",
                color: COLORS.dark,
              }}
            >
              Servings 🍽️
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 14,
              }}
            >
              <Pressable
                onPress={() => adjustServings(-1)}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  backgroundColor: COLORS.hotpink + "15",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Minus size={18} color={COLORS.hotpink} />
              </Pressable>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "800",
                  color: COLORS.hotpink,
                  minWidth: 30,
                  textAlign: "center",
                }}
              >
                {servings}
              </Text>
              <Pressable
                onPress={() => adjustServings(1)}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  backgroundColor: COLORS.hotpink,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Plus size={18} color={COLORS.white} />
              </Pressable>
            </View>
          </Animated.View>

          {/* Ingredients */}
          <Animated.View
            entering={FadeInDown.delay(400).duration(500)}
            style={{ marginTop: 24 }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "800",
                color: COLORS.dark,
                marginBottom: 14,
              }}
            >
              Ingredients 🧂
            </Text>
            {recipe.ingredients.map((ingredient, index) => {
              const checked = isIngredientChecked(recipe.id, index);
              return (
                <Pressable
                  key={index}
                  onPress={() => {
                    toggleIngredient(recipe.id, index);
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  }}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: COLORS.white,
                    borderRadius: 16,
                    padding: 14,
                    marginBottom: 8,
                    gap: 12,
                    ...SHADOWS.soft,
                  }}
                >
                  <View
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 13,
                      borderWidth: 2,
                      borderColor: checked ? COLORS.mint : COLORS.blush,
                      backgroundColor: checked ? COLORS.mint : "transparent",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {checked && <Check size={14} color={COLORS.white} />}
                  </View>
                  <Text
                    style={{
                      flex: 1,
                      fontSize: 14,
                      color: checked ? COLORS.gray : COLORS.dark,
                      textDecorationLine: checked ? "line-through" : "none",
                      lineHeight: 20,
                    }}
                  >
                    {ingredient}
                  </Text>
                </Pressable>
              );
            })}
          </Animated.View>

          {/* Steps */}
          <Animated.View
            entering={FadeInDown.delay(500).duration(500)}
            style={{ marginTop: 24 }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "800",
                color: COLORS.dark,
                marginBottom: 14,
              }}
            >
              Steps 👩‍🍳
            </Text>
            {recipe.steps.map((step, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  backgroundColor: COLORS.white,
                  borderRadius: 20,
                  padding: 16,
                  marginBottom: 10,
                  gap: 14,
                  ...SHADOWS.soft,
                }}
              >
                <View
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    backgroundColor: COLORS.hotpink,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "800",
                      color: COLORS.white,
                    }}
                  >
                    {index + 1}
                  </Text>
                </View>
                <Text
                  style={{
                    flex: 1,
                    fontSize: 14,
                    color: COLORS.dark,
                    lineHeight: 22,
                  }}
                >
                  {step}
                </Text>
              </View>
            ))}
          </Animated.View>

          {/* Baking Timer Button */}
          <Animated.View
            entering={SlideInDown.delay(600).duration(600)}
            style={{ marginTop: 24, marginBottom: 20 }}
          >
            <Pressable
              onPress={startTimer}
              style={{
                backgroundColor: timerRunning ? COLORS.rose : COLORS.hotpink,
                borderRadius: 24,
                paddingVertical: 18,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                ...SHADOWS.button,
              }}
            >
              <Timer size={22} color={COLORS.white} />
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "800",
                  color: COLORS.white,
                }}
              >
                {timerRunning
                  ? `⏱ ${formatTime(timerSeconds)} — Tap to Stop`
                  : `Start Baking Timer ✨`}
              </Text>
            </Pressable>
          </Animated.View>

          {/* Big Favorite Button */}
          <Animated.View entering={SlideInDown.delay(700).duration(600)}>
            <Pressable
              onPress={handleFavorite}
              style={{
                backgroundColor: favorited ? COLORS.hotpink : COLORS.white,
                borderRadius: 24,
                paddingVertical: 18,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                borderWidth: favorited ? 0 : 2,
                borderColor: COLORS.hotpink,
                ...SHADOWS.button,
              }}
            >
              <Heart
                size={22}
                color={favorited ? COLORS.white : COLORS.hotpink}
                fill={favorited ? COLORS.white : "transparent"}
              />
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "800",
                  color: favorited ? COLORS.white : COLORS.hotpink,
                }}
              >
                {favorited ? "Saved to Favorites 💖" : "Add to Favorites"}
              </Text>
            </Pressable>
          </Animated.View>
        </View>
      </ScrollView>
    </View>
  );
}
