import React, { useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import Animated, { FadeInDown, FadeIn, SlideInDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  ArrowLeft,
  Check,
  Trash2,
  ShoppingCart,
  X,
} from "lucide-react-native";
import * as Haptics from "expo-haptics";
import { COLORS, SHADOWS } from "@/constants/theme";
import { usePantryStore } from "@/store/usePantryStore";
import Wishy from "@/components/Wishy";
import SparkleBackground from "@/components/SparkleBackground";

export default function GroceryScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const {
    groceryList,
    toggleGroceryItem,
    removeGroceryItem,
    clearCheckedItems,
    clearGroceryList,
  } = usePantryStore();

  const uncheckedItems = groceryList.filter((i) => !i.checked);
  const checkedItems = groceryList.filter((i) => i.checked);

  // Group unchecked by recipe
  const groupedUnchecked = useMemo(() => {
    const groups: Record<string, typeof groceryList> = {};
    for (const item of uncheckedItems) {
      const key = item.recipeTitle || "Other";
      if (!groups[key]) groups[key] = [];
      groups[key].push(item);
    }
    return groups;
  }, [uncheckedItems]);

  const handleClearAll = () => {
    Alert.alert(
      "Clear Grocery List?",
      "This will remove all items from your list.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear All",
          style: "destructive",
          onPress: () => clearGroceryList(),
        },
      ]
    );
  };

  const handleClearChecked = () => {
    clearCheckedItems();
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <SparkleBackground count={4} />

      {/* Header */}
      <View
        style={{
          paddingTop: insets.top + 8,
          paddingHorizontal: 16,
          paddingBottom: 12,
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
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
          <ArrowLeft size={20} color={COLORS.white} />
        </Pressable>

        <View style={{ flex: 1 }}>
          <Text
            style={{ fontSize: 20, fontWeight: "800", color: COLORS.white }}
          >
            Grocery List
          </Text>
          <Text style={{ fontSize: 12, color: COLORS.gray }}>
            {uncheckedItems.length} item{uncheckedItems.length !== 1 ? "s" : ""}{" "}
            to get
          </Text>
        </View>

        {groceryList.length > 0 && (
          <Pressable
            onPress={handleClearAll}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: COLORS.rose + "20",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Trash2 size={18} color={COLORS.rose} />
          </Pressable>
        )}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
      >
        {groceryList.length === 0 ? (
          <Animated.View
            entering={FadeIn.duration(600)}
            style={{ alignItems: "center", paddingTop: 60 }}
          >
            <Wishy size="hero" message="Your grocery list is empty!" />
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
              Open any recipe and tap "Add Missing to Grocery List" to add
              ingredients you need!
            </Text>
          </Animated.View>
        ) : (
          <>
            {/* Unchecked items grouped by recipe */}
            {Object.entries(groupedUnchecked).map(
              ([recipeTitle, items], groupIdx) => (
                <Animated.View
                  key={recipeTitle}
                  entering={FadeInDown.delay(groupIdx * 80).duration(400)}
                  style={{ marginBottom: 20 }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: "700",
                      color: COLORS.lavender,
                      marginBottom: 8,
                    }}
                  >
                    {recipeTitle}
                  </Text>

                  {items.map((item) => (
                    <View
                      key={item.id}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: COLORS.bgCard,
                        borderRadius: 14,
                        paddingVertical: 12,
                        paddingHorizontal: 14,
                        marginBottom: 6,
                        gap: 12,
                        ...SHADOWS.soft,
                      }}
                    >
                      <Pressable
                        onPress={() => {
                          toggleGroceryItem(item.id);
                          Haptics.impactAsync(
                            Haptics.ImpactFeedbackStyle.Light
                          );
                        }}
                        style={{
                          width: 26,
                          height: 26,
                          borderRadius: 13,
                          borderWidth: 2,
                          borderColor: COLORS.hotpink + "50",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {item.checked && (
                          <Check size={14} color={COLORS.mint} />
                        )}
                      </Pressable>

                      <Text
                        style={{
                          flex: 1,
                          fontSize: 14,
                          color: COLORS.white,
                          lineHeight: 20,
                        }}
                      >
                        {item.name}
                      </Text>

                      <Pressable
                        onPress={() => {
                          removeGroceryItem(item.id);
                          Haptics.impactAsync(
                            Haptics.ImpactFeedbackStyle.Light
                          );
                        }}
                      >
                        <X size={16} color={COLORS.gray} />
                      </Pressable>
                    </View>
                  ))}
                </Animated.View>
              )
            )}

            {/* Checked items */}
            {checkedItems.length > 0 && (
              <Animated.View entering={FadeIn.duration(400)}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: "700",
                      color: COLORS.gray,
                    }}
                  >
                    Got it! ({checkedItems.length})
                  </Text>
                  <Pressable onPress={handleClearChecked}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "700",
                        color: COLORS.mint,
                      }}
                    >
                      Clear checked
                    </Text>
                  </Pressable>
                </View>

                {checkedItems.map((item) => (
                  <View
                    key={item.id}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      backgroundColor: COLORS.bgCard + "80",
                      borderRadius: 14,
                      paddingVertical: 12,
                      paddingHorizontal: 14,
                      marginBottom: 6,
                      gap: 12,
                    }}
                  >
                    <Pressable
                      onPress={() => {
                        toggleGroceryItem(item.id);
                        Haptics.impactAsync(
                          Haptics.ImpactFeedbackStyle.Light
                        );
                      }}
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: 13,
                        backgroundColor: COLORS.mint,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Check size={14} color="#FFF" />
                    </Pressable>

                    <Text
                      style={{
                        flex: 1,
                        fontSize: 14,
                        color: COLORS.gray,
                        textDecorationLine: "line-through",
                      }}
                    >
                      {item.name}
                    </Text>

                    <Pressable
                      onPress={() => {
                        removeGroceryItem(item.id);
                        Haptics.impactAsync(
                          Haptics.ImpactFeedbackStyle.Light
                        );
                      }}
                    >
                      <X size={16} color={COLORS.gray} />
                    </Pressable>
                  </View>
                ))}
              </Animated.View>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
}
