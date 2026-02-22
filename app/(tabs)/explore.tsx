import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  Dimensions,
} from "react-native";
import Animated, { FadeInDown, FadeIn } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Search, X, SlidersHorizontal } from "lucide-react-native";
import { COLORS, SHADOWS } from "@/constants/theme";
import { RECIPES, CATEGORIES } from "@/constants/recipes";
import RecipeCard from "@/components/RecipeCard";
import Wishy from "@/components/Wishy";
import SparkleBackground from "@/components/SparkleBackground";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const DIFFICULTY_FILTERS = ["All", "Easy", "Medium", "Hard"] as const;

export default function ExploreScreen() {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeDifficulty, setActiveDifficulty] = useState<string>("All");
  const [showFilters, setShowFilters] = useState(false);

  const filteredRecipes = useMemo(() => {
    let results = RECIPES;

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
  }, [searchQuery, activeCategory, activeDifficulty]);

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.pink }}>
      <SparkleBackground count={6} />

      {/* Header */}
      <View
        style={{
          paddingTop: insets.top + 8,
          paddingHorizontal: 16,
          paddingBottom: 12,
          backgroundColor: COLORS.pink,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "800",
            color: COLORS.dark,
            marginBottom: 16,
          }}
        >
          Explore 🔍
        </Text>

        {/* Search Bar */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: COLORS.white,
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
              color: COLORS.dark,
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
                : COLORS.hotpink + "15",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SlidersHorizontal
              size={18}
              color={showFilters ? COLORS.white : COLORS.hotpink}
            />
          </Pressable>
        </View>

        {/* Filters */}
        {showFilters && (
          <Animated.View entering={FadeIn.duration(300)}>
            {/* Difficulty filter */}
            <Text
              style={{
                fontSize: 13,
                fontWeight: "700",
                color: COLORS.dark,
                marginTop: 16,
                marginBottom: 8,
              }}
            >
              Difficulty
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {DIFFICULTY_FILTERS.map((diff) => (
                <Pressable
                  key={diff}
                  onPress={() => setActiveDifficulty(diff)}
                  style={{
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    borderRadius: 20,
                    backgroundColor:
                      activeDifficulty === diff ? COLORS.lavender : COLORS.white,
                    marginRight: 8,
                    ...SHADOWS.soft,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: "600",
                      color:
                        activeDifficulty === diff ? "#7C3AED" : COLORS.dark,
                    }}
                  >
                    {diff}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </Animated.View>
        )}

        {/* Category chips */}
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
                  activeCategory === cat.id ? COLORS.hotpink : COLORS.white,
                marginRight: 8,
                gap: 4,
                ...SHADOWS.soft,
              }}
            >
              <Text style={{ fontSize: 14 }}>{cat.emoji}</Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "600",
                  color:
                    activeCategory === cat.id ? COLORS.white : COLORS.dark,
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
        {/* Results count */}
        <Text
          style={{
            fontSize: 13,
            color: COLORS.gray,
            marginVertical: 12,
          }}
        >
          {filteredRecipes.length} sweet{filteredRecipes.length !== 1 ? "s" : ""}{" "}
          found 🍭
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
