import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Animated, { FadeInDown, SlideInDown } from "react-native-reanimated";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  ArrowLeft,
  Plus,
  Minus,
  Camera,
  ChefHat,
  Sparkles,
} from "lucide-react-native";
import * as Haptics from "expo-haptics";
import { COLORS, SHADOWS } from "@/constants/theme";
import { CATEGORIES } from "@/constants/recipes";
import { useRecipeStore } from "@/store/useRecipeStore";

const DIFFICULTY_OPTIONS = ["Easy", "Medium", "Hard"] as const;

const PLACEHOLDER_IMAGES = [
  "https://images.unsplash.com/photo-1486427944544-d2561f9e0d61?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1558303926-f5bde2a2fa6a?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&h=600&fit=crop",
];

export default function AddRecipeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { addCustomRecipe } = useRecipeStore();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("cakes");
  const [difficulty, setDifficulty] = useState<"Easy" | "Medium" | "Hard">("Easy");
  const [servings, setServings] = useState(8);
  const [timeMinutes, setTimeMinutes] = useState("30");
  const [ingredients, setIngredients] = useState<string[]>([""]);
  const [steps, setSteps] = useState<string[]>([""]);

  const addIngredient = () => {
    setIngredients([...ingredients, ""]);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const removeIngredient = (index: number) => {
    if (ingredients.length <= 1) return;
    setIngredients(ingredients.filter((_, i) => i !== index));
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const updateIngredient = (index: number, value: string) => {
    const updated = [...ingredients];
    updated[index] = value;
    setIngredients(updated);
  };

  const addStep = () => {
    setSteps([...steps, ""]);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const removeStep = (index: number) => {
    if (steps.length <= 1) return;
    setSteps(steps.filter((_, i) => i !== index));
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const updateStep = (index: number, value: string) => {
    const updated = [...steps];
    updated[index] = value;
    setSteps(updated);
  };

  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert("Oops!", "Please give your recipe a name~ 🐱");
      return;
    }

    const validIngredients = ingredients.filter((i) => i.trim());
    const validSteps = steps.filter((s) => s.trim());

    if (validIngredients.length === 0) {
      Alert.alert("Oops!", "Add at least one ingredient~ 🧂");
      return;
    }

    if (validSteps.length === 0) {
      Alert.alert("Oops!", "Add at least one step~ 👩‍🍳");
      return;
    }

    const recipe = {
      id: "custom-" + Date.now(),
      title: title.trim(),
      description: description.trim() || "A custom recipe made with love!",
      category,
      difficulty,
      servings,
      time: `${timeMinutes} min`,
      rating: 5.0,
      image: PLACEHOLDER_IMAGES[Math.floor(Math.random() * PLACEHOLDER_IMAGES.length)],
      ingredients: validIngredients,
      steps: validSteps,
      isPro: false,
    };

    addCustomRecipe(recipe);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert(
      "Recipe Saved! 🎉",
      `"${recipe.title}" has been added to your collection!`,
      [{ text: "Yay! 🐱", onPress: () => router.back() }]
    );
  };

  const filteredCategories = CATEGORIES.filter((c) => c.id !== "all");

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.bg }}>
      {/* Header */}
      <View
        style={{
          paddingTop: insets.top + 8,
          paddingHorizontal: 16,
          paddingBottom: 12,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: COLORS.bg,
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
        <Text
          style={{
            fontSize: 18,
            fontWeight: "800",
            color: COLORS.white,
          }}
        >
          New Recipe 🐱
        </Text>
        <Pressable
          onPress={handleSave}
          style={{
            backgroundColor: COLORS.hotpink,
            paddingHorizontal: 18,
            paddingVertical: 10,
            borderRadius: 16,
            ...SHADOWS.button,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: "700",
              color: "#FFF",
            }}
          >
            Save
          </Text>
        </Pressable>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Recipe Name */}
          <Animated.View entering={FadeInDown.delay(100).duration(500)}>
            <Text style={labelStyle}>Recipe Name</Text>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="e.g., Kitty's Chocolate Cake"
              placeholderTextColor={COLORS.gray}
              style={inputStyle}
            />
          </Animated.View>

          {/* Description */}
          <Animated.View entering={FadeInDown.delay(150).duration(500)}>
            <Text style={labelStyle}>Description</Text>
            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder="What makes this recipe special?"
              placeholderTextColor={COLORS.gray}
              multiline
              numberOfLines={3}
              style={[inputStyle, { height: 80, textAlignVertical: "top" }]}
            />
          </Animated.View>

          {/* Category */}
          <Animated.View entering={FadeInDown.delay(200).duration(500)}>
            <Text style={labelStyle}>Category</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ marginBottom: 16 }}
            >
              {filteredCategories.map((cat) => (
                <Pressable
                  key={cat.id}
                  onPress={() => {
                    setCategory(cat.id);
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  }}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 14,
                    paddingVertical: 10,
                    borderRadius: 16,
                    backgroundColor:
                      category === cat.id ? COLORS.hotpink : COLORS.bgCard,
                    marginRight: 8,
                    gap: 6,
                  }}
                >
                  <Text style={{ fontSize: 14 }}>{cat.emoji}</Text>
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: "600",
                      color:
                        category === cat.id ? "#FFF" : COLORS.white,
                    }}
                  >
                    {cat.label}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </Animated.View>

          {/* Difficulty */}
          <Animated.View entering={FadeInDown.delay(250).duration(500)}>
            <Text style={labelStyle}>Difficulty</Text>
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                marginBottom: 16,
              }}
            >
              {DIFFICULTY_OPTIONS.map((diff) => (
                <Pressable
                  key={diff}
                  onPress={() => {
                    setDifficulty(diff);
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  }}
                  style={{
                    flex: 1,
                    paddingVertical: 12,
                    borderRadius: 16,
                    backgroundColor:
                      difficulty === diff ? COLORS.hotpink : COLORS.bgCard,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: "700",
                      color:
                        difficulty === diff ? "#FFF" : COLORS.white,
                    }}
                  >
                    {diff}
                  </Text>
                </Pressable>
              ))}
            </View>
          </Animated.View>

          {/* Servings & Time */}
          <Animated.View
            entering={FadeInDown.delay(300).duration(500)}
            style={{ flexDirection: "row", gap: 12, marginBottom: 16 }}
          >
            <View style={{ flex: 1 }}>
              <Text style={labelStyle}>Servings</Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: COLORS.bgCard,
                  borderRadius: 16,
                  padding: 12,
                  justifyContent: "space-between",
                }}
              >
                <Pressable
                  onPress={() => servings > 1 && setServings(servings - 1)}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    backgroundColor: COLORS.bgElevated,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Minus size={16} color={COLORS.hotpink} />
                </Pressable>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "800",
                    color: COLORS.hotpink,
                  }}
                >
                  {servings}
                </Text>
                <Pressable
                  onPress={() => servings < 50 && setServings(servings + 1)}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    backgroundColor: COLORS.hotpink,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Plus size={16} color="#FFF" />
                </Pressable>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={labelStyle}>Time (min)</Text>
              <TextInput
                value={timeMinutes}
                onChangeText={setTimeMinutes}
                keyboardType="number-pad"
                placeholder="30"
                placeholderTextColor={COLORS.gray}
                style={inputStyle}
              />
            </View>
          </Animated.View>

          {/* Ingredients */}
          <Animated.View entering={FadeInDown.delay(350).duration(500)}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Text style={labelStyle}>Ingredients 🧂</Text>
              <Pressable
                onPress={addIngredient}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: COLORS.hotpink + "30",
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 12,
                  gap: 4,
                }}
              >
                <Plus size={14} color={COLORS.hotpink} />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "600",
                    color: COLORS.hotpink,
                  }}
                >
                  Add
                </Text>
              </Pressable>
            </View>
            {ingredients.map((ingredient, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 8,
                  gap: 8,
                }}
              >
                <TextInput
                  value={ingredient}
                  onChangeText={(val) => updateIngredient(index, val)}
                  placeholder={`e.g., 2 cups flour`}
                  placeholderTextColor={COLORS.gray}
                  style={[inputStyle, { flex: 1, marginBottom: 0 }]}
                />
                {ingredients.length > 1 && (
                  <Pressable
                    onPress={() => removeIngredient(index)}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 12,
                      backgroundColor: COLORS.coral + "30",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Minus size={16} color={COLORS.coral} />
                  </Pressable>
                )}
              </View>
            ))}
          </Animated.View>

          {/* Steps */}
          <Animated.View
            entering={FadeInDown.delay(400).duration(500)}
            style={{ marginTop: 8 }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Text style={labelStyle}>Steps 👩‍🍳</Text>
              <Pressable
                onPress={addStep}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: COLORS.lavender + "30",
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 12,
                  gap: 4,
                }}
              >
                <Plus size={14} color={COLORS.lavender} />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "600",
                    color: COLORS.lavender,
                  }}
                >
                  Add
                </Text>
              </Pressable>
            </View>
            {steps.map((step, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  marginBottom: 8,
                  gap: 8,
                }}
              >
                <View
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 14,
                    backgroundColor: COLORS.hotpink,
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "800",
                      color: "#FFF",
                    }}
                  >
                    {index + 1}
                  </Text>
                </View>
                <TextInput
                  value={step}
                  onChangeText={(val) => updateStep(index, val)}
                  placeholder={`Step ${index + 1}...`}
                  placeholderTextColor={COLORS.gray}
                  multiline
                  style={[
                    inputStyle,
                    {
                      flex: 1,
                      marginBottom: 0,
                      minHeight: 48,
                      textAlignVertical: "top",
                    },
                  ]}
                />
                {steps.length > 1 && (
                  <Pressable
                    onPress={() => removeStep(index)}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 12,
                      backgroundColor: COLORS.coral + "30",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: 6,
                    }}
                  >
                    <Minus size={16} color={COLORS.coral} />
                  </Pressable>
                )}
              </View>
            ))}
          </Animated.View>

          {/* Save button (bottom) */}
          <Animated.View
            entering={SlideInDown.delay(500).duration(500)}
            style={{ marginTop: 20 }}
          >
            <Pressable
              onPress={handleSave}
              style={{
                backgroundColor: COLORS.hotpink,
                borderRadius: 24,
                paddingVertical: 18,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                ...SHADOWS.button,
              }}
            >
              <Sparkles size={20} color="#FFF" />
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "800",
                  color: "#FFF",
                }}
              >
                Save Recipe
              </Text>
            </Pressable>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const labelStyle = {
  fontSize: 14,
  fontWeight: "700" as const,
  color: COLORS.white,
  marginBottom: 8,
};

const inputStyle = {
  backgroundColor: COLORS.bgCard,
  borderRadius: 16,
  padding: 14,
  fontSize: 14,
  color: COLORS.white,
  marginBottom: 16,
};
