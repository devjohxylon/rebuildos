import React from "react";
import { View, Text, ScrollView } from "react-native";
import Animated, { FadeInDown, FadeIn } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS } from "@/constants/theme";
import { RECIPES } from "@/constants/recipes";
import { useRecipeStore } from "@/store/useRecipeStore";
import RecipeCard from "@/components/RecipeCard";
import Wishy from "@/components/Wishy";
import SparkleBackground from "@/components/SparkleBackground";

export default function FavoritesScreen() {
  const insets = useSafeAreaInsets();
  const { favorites } = useRecipeStore();

  const favoriteRecipes = RECIPES.filter((r) => favorites.includes(r.id));

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.pink }}>
      <SparkleBackground count={6} />

      {/* Header */}
      <View
        style={{
          paddingTop: insets.top + 8,
          paddingHorizontal: 16,
          paddingBottom: 12,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "800",
            color: COLORS.dark,
          }}
        >
          My Favorites 💖
        </Text>
        <Text
          style={{
            fontSize: 13,
            color: COLORS.gray,
            marginTop: 4,
          }}
        >
          {favoriteRecipes.length} saved recipe
          {favoriteRecipes.length !== 1 ? "s" : ""}
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
      >
        {favoriteRecipes.length === 0 ? (
          <Animated.View
            entering={FadeIn.duration(600)}
            style={{ alignItems: "center", paddingTop: 60 }}
          >
            <Wishy size="hero" message="No favorites yet!" />
            <Text
              style={{
                fontSize: 15,
                color: COLORS.gray,
                textAlign: "center",
                marginTop: 16,
                lineHeight: 22,
                paddingHorizontal: 40,
              }}
            >
              Tap the 💖 on any recipe to save it here. Wishy will keep them
              safe for you!
            </Text>
          </Animated.View>
        ) : (
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              paddingTop: 8,
            }}
          >
            {favoriteRecipes.map((recipe, index) => (
              <Animated.View
                key={recipe.id}
                entering={FadeInDown.delay(index * 100).duration(500)}
              >
                <RecipeCard recipe={recipe} index={index} />
              </Animated.View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
