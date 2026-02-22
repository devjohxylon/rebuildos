import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  Dimensions,
} from "react-native";
import Animated, { FadeInDown, FadeIn } from "react-native-reanimated";
import { COLORS } from "@/constants/theme";
import { RECIPES, CATEGORIES } from "@/constants/recipes";
import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import CategoryChip from "@/components/CategoryChip";
import RecipeCard from "@/components/RecipeCard";
import SkeletonCard from "@/components/SkeletonCard";
import SparkleBackground from "@/components/SparkleBackground";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

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

  const filteredRecipes =
    activeCategory === "all"
      ? RECIPES
      : RECIPES.filter((r) => r.category === activeCategory);

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.pink }}>
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
        {/* Hero Banner */}
        <HeroBanner />

        {/* Categories */}
        <Animated.View entering={FadeInDown.delay(200).duration(600)}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "800",
              color: COLORS.dark,
              marginHorizontal: 16,
              marginBottom: 12,
            }}
          >
            Categories ✨
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

        {/* Trending Sweeties */}
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
            <Text
              style={{
                fontSize: 18,
                fontWeight: "800",
                color: COLORS.dark,
              }}
            >
              Trending Sweeties 🍰
            </Text>
            <Text
              style={{
                fontSize: 13,
                fontWeight: "600",
                color: COLORS.hotpink,
              }}
            >
              See all
            </Text>
          </View>

          {/* Recipe Grid */}
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
                  entering={FadeInDown.delay(index * 100).duration(500)}
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
