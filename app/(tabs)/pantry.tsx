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
import {
  Search,
  X,
  Package,
  ShoppingCart,
  ChevronRight,
  Check,
  Sparkles,
} from "lucide-react-native";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import { COLORS, SHADOWS } from "@/constants/theme";
import { RECIPES } from "@/constants/recipes";
import { useRecipeStore } from "@/store/useRecipeStore";
import { usePantryStore } from "@/store/usePantryStore";
import {
  PANTRY_INGREDIENTS,
  INGREDIENT_CATEGORIES,
  getRecipeMatch,
} from "@/constants/ingredients";
import RecipeCard from "@/components/RecipeCard";
import SparkleBackground from "@/components/SparkleBackground";
import Wishy from "@/components/Wishy";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

type TabMode = "pantry" | "recipes";

export default function PantryScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabMode>("pantry");
  const [searchQuery, setSearchQuery] = useState("");
  const { pantryItems, togglePantryItem, groceryList } = usePantryStore();
  const { customRecipes } = useRecipeStore();

  const allRecipes = useMemo(
    () => [...RECIPES, ...customRecipes],
    [customRecipes]
  );

  const filteredIngredients = useMemo(() => {
    if (!searchQuery.trim()) return PANTRY_INGREDIENTS;
    const q = searchQuery.toLowerCase();
    return PANTRY_INGREDIENTS.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const groupedIngredients = useMemo(() => {
    const groups: Record<string, typeof PANTRY_INGREDIENTS> = {};
    for (const cat of INGREDIENT_CATEGORIES) {
      const items = filteredIngredients.filter((i) => i.category === cat);
      if (items.length > 0) groups[cat] = items;
    }
    return groups;
  }, [filteredIngredients]);

  const matchedRecipes = useMemo(() => {
    if (pantryItems.length === 0) return [];
    return allRecipes
      .map((recipe) => ({
        recipe,
        match: getRecipeMatch(recipe.ingredients, pantryItems),
      }))
      .filter((r) => r.match.matched > 0)
      .sort((a, b) => b.match.percentage - a.match.percentage);
  }, [pantryItems, allRecipes]);

  const groceryCount = groceryList.filter((i) => !i.checked).length;

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <SparkleBackground count={6} />

      {/* Header */}
      <View
        style={{
          paddingTop: insets.top + 8,
          paddingHorizontal: 16,
          paddingBottom: 8,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{ fontSize: 24, fontWeight: "800", color: COLORS.white }}
          >
            My Pantry
          </Text>
          <Pressable
            onPress={() => router.push("/grocery")}
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: COLORS.mint + "20",
              paddingHorizontal: 14,
              paddingVertical: 8,
              borderRadius: 20,
              gap: 6,
            }}
          >
            <ShoppingCart size={16} color={COLORS.mint} />
            <Text
              style={{ fontSize: 13, fontWeight: "700", color: COLORS.mint }}
            >
              List{groceryCount > 0 ? ` (${groceryCount})` : ""}
            </Text>
          </Pressable>
        </View>

        <Text
          style={{ fontSize: 13, color: COLORS.gray, marginTop: 4 }}
        >
          {pantryItems.length} ingredient{pantryItems.length !== 1 ? "s" : ""}{" "}
          in your pantry
        </Text>

        {/* Tab toggle */}
        <View
          style={{
            flexDirection: "row",
            backgroundColor: COLORS.bgCard,
            borderRadius: 16,
            padding: 4,
            marginTop: 12,
          }}
        >
          <Pressable
            onPress={() => setActiveTab("pantry")}
            style={{
              flex: 1,
              paddingVertical: 10,
              borderRadius: 12,
              backgroundColor:
                activeTab === "pantry" ? COLORS.hotpink : "transparent",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 13,
                fontWeight: "700",
                color: activeTab === "pantry" ? "#FFF" : COLORS.gray,
              }}
            >
              My Ingredients
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setActiveTab("recipes")}
            style={{
              flex: 1,
              paddingVertical: 10,
              borderRadius: 12,
              backgroundColor:
                activeTab === "recipes" ? COLORS.hotpink : "transparent",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 13,
                fontWeight: "700",
                color: activeTab === "recipes" ? "#FFF" : COLORS.gray,
              }}
            >
              What Can I Make?
            </Text>
          </Pressable>
        </View>
      </View>

      {activeTab === "pantry" ? (
        /* ===== PANTRY TAB ===== */
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
        >
          {/* Search */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: COLORS.bgCard,
              borderRadius: 16,
              paddingHorizontal: 14,
              paddingVertical: 10,
              gap: 10,
              marginBottom: 16,
              ...SHADOWS.soft,
            }}
          >
            <Search size={18} color={COLORS.hotpink} />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search ingredients..."
              placeholderTextColor={COLORS.gray}
              style={{
                flex: 1,
                fontSize: 14,
                color: COLORS.white,
                padding: 0,
              }}
            />
            {searchQuery.length > 0 && (
              <Pressable onPress={() => setSearchQuery("")}>
                <X size={16} color={COLORS.gray} />
              </Pressable>
            )}
          </View>

          {/* Quick select hint */}
          {pantryItems.length === 0 && (
            <Animated.View
              entering={FadeIn.duration(400)}
              style={{
                backgroundColor: COLORS.hotpink + "15",
                borderRadius: 16,
                padding: 16,
                marginBottom: 16,
                flexDirection: "row",
                alignItems: "center",
                gap: 12,
              }}
            >
              <Sparkles size={20} color={COLORS.hotpink} />
              <Text
                style={{
                  flex: 1,
                  fontSize: 13,
                  color: COLORS.pink,
                  lineHeight: 20,
                }}
              >
                Tap ingredients you have at home! Then switch to "What Can I
                Make?" to find recipes.
              </Text>
            </Animated.View>
          )}

          {/* Ingredient groups */}
          {Object.entries(groupedIngredients).map(
            ([category, items], catIdx) => (
              <Animated.View
                key={category}
                entering={FadeInDown.delay(catIdx * 60).duration(400)}
                style={{ marginBottom: 20 }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "700",
                    color: COLORS.lavender,
                    marginBottom: 10,
                  }}
                >
                  {category}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: 8,
                  }}
                >
                  {items.map((item) => {
                    const selected = pantryItems.includes(item.id);
                    return (
                      <Pressable
                        key={item.id}
                        onPress={() => {
                          togglePantryItem(item.id);
                          Haptics.impactAsync(
                            Haptics.ImpactFeedbackStyle.Light
                          );
                        }}
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          backgroundColor: selected
                            ? COLORS.mint + "25"
                            : COLORS.bgCard,
                          borderRadius: 20,
                          paddingHorizontal: 12,
                          paddingVertical: 8,
                          gap: 6,
                          borderWidth: 1.5,
                          borderColor: selected
                            ? COLORS.mint
                            : COLORS.bgCard,
                        }}
                      >
                        {selected && (
                          <Check size={13} color={COLORS.mint} />
                        )}
                        <Text style={{ fontSize: 14 }}>{item.emoji}</Text>
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: "600",
                            color: selected
                              ? COLORS.mint
                              : COLORS.white,
                          }}
                        >
                          {item.name}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </Animated.View>
            )
          )}
        </ScrollView>
      ) : (
        /* ===== RECIPES TAB ===== */
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
        >
          {pantryItems.length === 0 ? (
            <View style={{ alignItems: "center", paddingTop: 60 }}>
              <Wishy
                size="hero"
                message="Add ingredients to your pantry first!"
              />
              <Text
                style={{
                  fontSize: 14,
                  color: COLORS.gray,
                  textAlign: "center",
                  marginTop: 16,
                  paddingHorizontal: 40,
                  lineHeight: 22,
                }}
              >
                Switch to "My Ingredients" and tap the items you have at home.
                Then come back here to see what you can make!
              </Text>
            </View>
          ) : matchedRecipes.length === 0 ? (
            <View style={{ alignItems: "center", paddingTop: 60 }}>
              <Wishy
                size="hero"
                message="No matching recipes yet!"
              />
              <Text
                style={{
                  fontSize: 14,
                  color: COLORS.gray,
                  textAlign: "center",
                  marginTop: 16,
                  paddingHorizontal: 40,
                  lineHeight: 22,
                }}
              >
                Try adding more ingredients to your pantry to unlock recipes!
              </Text>
            </View>
          ) : (
            <>
              <Text
                style={{
                  fontSize: 13,
                  color: COLORS.gray,
                  marginBottom: 12,
                }}
              >
                {matchedRecipes.length} recipe
                {matchedRecipes.length !== 1 ? "s" : ""} you can make
              </Text>

              {matchedRecipes.map(({ recipe, match }, index) => (
                <Animated.View
                  key={recipe.id}
                  entering={FadeInDown.delay(index * 60).duration(400)}
                >
                  <Pressable
                    onPress={() => router.push(`/recipe/${recipe.id}`)}
                    style={{
                      flexDirection: "row",
                      backgroundColor: COLORS.bgCard,
                      borderRadius: 20,
                      overflow: "hidden",
                      marginBottom: 12,
                      ...SHADOWS.card,
                    }}
                  >
                    <Animated.Image
                      source={{ uri: recipe.image }}
                      style={{ width: 100, height: 100 }}
                      resizeMode="cover"
                    />
                    <View
                      style={{
                        flex: 1,
                        padding: 12,
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: "700",
                          color: COLORS.white,
                          marginBottom: 4,
                        }}
                        numberOfLines={1}
                      >
                        {recipe.title}
                      </Text>

                      {/* Match percentage bar */}
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 8,
                          marginBottom: 6,
                        }}
                      >
                        <View
                          style={{
                            flex: 1,
                            height: 6,
                            backgroundColor: COLORS.bgElevated,
                            borderRadius: 3,
                          }}
                        >
                          <View
                            style={{
                              width: `${match.percentage}%`,
                              height: 6,
                              backgroundColor:
                                match.percentage === 100
                                  ? COLORS.mint
                                  : match.percentage >= 70
                                  ? COLORS.butter
                                  : COLORS.hotpink,
                              borderRadius: 3,
                            }}
                          />
                        </View>
                        <Text
                          style={{
                            fontSize: 11,
                            fontWeight: "700",
                            color:
                              match.percentage === 100
                                ? COLORS.mint
                                : match.percentage >= 70
                                ? COLORS.butter
                                : COLORS.hotpink,
                            minWidth: 36,
                          }}
                        >
                          {match.percentage}%
                        </Text>
                      </View>

                      <Text
                        style={{
                          fontSize: 11,
                          color: COLORS.gray,
                        }}
                        numberOfLines={1}
                      >
                        {match.matched}/{match.total} ingredients
                        {match.missing.length > 0 &&
                          ` · Need ${match.missing.length} more`}
                      </Text>
                    </View>
                    <View
                      style={{
                        justifyContent: "center",
                        paddingRight: 12,
                      }}
                    >
                      <ChevronRight size={18} color={COLORS.gray} />
                    </View>
                  </Pressable>
                </Animated.View>
              ))}
            </>
          )}
        </ScrollView>
      )}
    </View>
  );
}
