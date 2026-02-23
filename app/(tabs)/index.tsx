import React, { useState, useCallback, useEffect, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  Pressable,
} from "react-native";
import Animated, { FadeInDown, FadeIn } from "react-native-reanimated";
import { useRouter } from "expo-router";
import { Crown } from "lucide-react-native";
import { COLORS } from "@/constants/theme";
import { RECIPES, CATEGORIES } from "@/constants/recipes";
import { useRecipeStore } from "@/store/useRecipeStore";
import { useProStore } from "@/store/useProStore";
import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import CategoryChip from "@/components/CategoryChip";
import RecipeCard from "@/components/RecipeCard";
import SkeletonCard from "@/components/SkeletonCard";
import SparkleBackground from "@/components/SparkleBackground";

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { isPro } = useProStore();
  const { customRecipes } = useRecipeStore();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setLoading(true);
    setTimeout(() => {
      setRefreshing(false);
      setLoading(false);
    }, 1500);
  }, []);

  const allRecipes = useMemo(
    () => [...RECIPES, ...customRecipes],
    [customRecipes]
  );

  const filteredRecipes = useMemo(() => {
    const results =
      activeCategory === "all"
        ? allRecipes
        : allRecipes.filter((r) => r.category === activeCategory);
    return results;
  }, [activeCategory, allRecipes]);

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <SparkleBackground count={8} />
      <Header />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={COLORS.hotpink}
            colors={[COLORS.hotpink]}
          />
        }
      >
        <HeroBanner />

        {!isPro && (
          <Animated.View entering={FadeIn.delay(300).duration(600)}>
            <Pressable
              onPress={() => router.push("/pro")}
              style={{
                marginHorizontal: 16,
                marginBottom: 16,
                backgroundColor: COLORS.bgCard,
                borderRadius: 20,
                padding: 16,
                flexDirection: "row",
                alignItems: "center",
                gap: 12,
                borderWidth: 1,
                borderColor: COLORS.gold + "40",
              }}
            >
              <Text style={{ fontSize: 28 }}>👑</Text>
              <View style={{ flex: 1 }}>
                <Text
                  style={{ fontSize: 15, fontWeight: "800", color: COLORS.gold }}
                >
                  Unlock All Recipes
                </Text>
                <Text style={{ fontSize: 12, color: COLORS.gray, marginTop: 2 }}>
                  Get access to 150+ exclusive baking recipes
                </Text>
              </View>
              <Crown size={20} color={COLORS.gold} />
            </Pressable>
          </Animated.View>
        )}

        <Animated.View entering={FadeInDown.delay(200).duration(600)}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "800",
              color: COLORS.white,
              marginHorizontal: 16,
              marginBottom: 12,
            }}
          >
            Categories
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
          >
            {CATEGORIES.map((cat) => (
              <CategoryChip
                key={cat.id}
                label={cat.label}
                emoji={cat.emoji}
                isActive={activeCategory === cat.id}
                onPress={() => setActiveCategory(cat.id)}
              />
            ))}
          </ScrollView>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(400).duration(600)}
          style={{ marginTop: 24, paddingHorizontal: 16 }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "800", color: COLORS.white }}>
              Trending Sweeties 🐱
            </Text>
            <Text style={{ fontSize: 13, fontWeight: "600", color: COLORS.hotpink }}>
              {filteredRecipes.length} recipes
            </Text>
          </View>

          {loading ? (
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              {[1, 2, 3, 4].map((i) => (
                <SkeletonCard key={i} />
              ))}
            </View>
          ) : (
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              {filteredRecipes.map((recipe, index) => (
                <Animated.View
                  key={recipe.id}
                  entering={FadeInDown.delay(index * 80).duration(500)}
                >
                  <RecipeCard recipe={recipe} index={index} />
                </Animated.View>
              ))}
            </View>
          )}
        </Animated.View>
      </ScrollView>
    </View>
  );
}
