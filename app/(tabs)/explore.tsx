import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
} from "react-native";
import Animated, { FadeInDown, FadeIn } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Search, X, SlidersHorizontal } from "lucide-react-native";
import { COLORS, SHADOWS } from "@/constants/theme";
import { RECIPES, CATEGORIES } from "@/constants/recipes";
import { useRecipeStore } from "@/store/useRecipeStore";
import RecipeCard from "@/components/RecipeCard";
import Wishy from "@/components/Wishy";
import SparkleBackground from "@/components/SparkleBackground";

const DIFFICULTY_FILTERS = ["All", "Easy", "Medium", "Hard"] as const;

export default function ExploreScreen() {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeDifficulty, setActiveDifficulty] = useState<string>("All");
  const [showFilters, setShowFilters] = useState(false);
  const { customRecipes } = useRecipeStore();

  const allRecipes = useMemo(
    () => [...RECIPES, ...customRecipes],
    [customRecipes]
  );

  const filteredRecipes = useMemo(() => {
    let results = allRecipes;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      results = results.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.category.toLowerCase().includes(q)
      );
    }

    if (activeCategory !== "all") {
      results = results.filter((r) => r.category === activeCategory);
    }

    if (activeDifficulty !== "All") {
      results = results.filter((r) => r.difficulty === activeDifficulty);
    }

    return results;
  }, [searchQuery, activeCategory, activeDifficulty, allRecipes]);

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <SparkleBackground count={6} />

      <View
        style={{
          paddingTop: insets.top + 8,
          paddingHorizontal: 16,
          paddingBottom: 12,
          backgroundColor: COLORS.bg,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "800",
            color: COLORS.white,
            marginBottom: 16,
          }}
        >
          Explore 🔍
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: COLORS.bgCard,
            borderRadius: 20,
            paddingHorizontal: 16,
            paddingVertical: 12,
            gap: 10,
            ...SHADOWS.soft,
          }}
        >
          <Search size={20} color={COLORS.hotpink} />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search yummy recipes..."
            placeholderTextColor={COLORS.gray}
            style={{
              flex: 1,
              fontSize: 15,
              color: COLORS.white,
              padding: 0,
            }}
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={() => setSearchQuery("")}>
              <X size={18} color={COLORS.gray} />
            </Pressable>
          )}
          <Pressable
            onPress={() => setShowFilters(!showFilters)}
            style={{
              width: 36,
              height: 36,
              borderRadius: 12,
              backgroundColor: showFilters
                ? COLORS.hotpink
                : COLORS.hotpink + "20",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SlidersHorizontal
              size={18}
              color={showFilters ? "#FFF" : COLORS.hotpink}
            />
          </Pressable>
        </View>

        {showFilters && (
          <Animated.View entering={FadeIn.duration(300)}>
            <Text
              style={{
                fontSize: 13,
                fontWeight: "700",
                color: COLORS.white,
                marginTop: 16,
                marginBottom: 8,
              }}
            >
              Difficulty
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {DIFFICULTY_FILTERS.map((diff) => (
                <Pressable
                  key={diff}
                  onPress={() => setActiveDifficulty(diff)}
                  style={{
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    borderRadius: 20,
                    backgroundColor:
                      activeDifficulty === diff
                        ? COLORS.lavender
                        : COLORS.bgCard,
                    marginRight: 8,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: "600",
                      color:
                        activeDifficulty === diff ? "#FFF" : COLORS.white,
                    }}
                  >
                    {diff}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </Animated.View>
        )}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 12 }}
        >
          {CATEGORIES.map((cat) => (
            <Pressable
              key={cat.id}
              onPress={() => setActiveCategory(cat.id)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 14,
                paddingVertical: 8,
                borderRadius: 20,
                backgroundColor:
                  activeCategory === cat.id
                    ? COLORS.hotpink
                    : COLORS.bgCard,
                marginRight: 8,
                gap: 4,
              }}
            >
              <Text style={{ fontSize: 14 }}>{cat.emoji}</Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "600",
                  color:
                    activeCategory === cat.id ? "#FFF" : COLORS.white,
                }}
              >
                {cat.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
      >
        <Text style={{ fontSize: 13, color: COLORS.gray, marginVertical: 12 }}>
          {filteredRecipes.length} sweet{filteredRecipes.length !== 1 ? "s" : ""}{" "}
          found 🐾
        </Text>

        {filteredRecipes.length === 0 ? (
          <View style={{ alignItems: "center", paddingTop: 40 }}>
            <Wishy size="hero" message="No recipes found... try something else!" />
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
                entering={FadeInDown.delay(index * 80).duration(400)}
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
