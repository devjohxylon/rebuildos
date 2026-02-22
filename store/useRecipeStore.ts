import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface RecipeStore {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  checkedIngredients: Record<string, boolean>;
  toggleIngredient: (recipeId: string, index: number) => void;
  isIngredientChecked: (recipeId: string, index: number) => boolean;
  clearCheckedIngredients: (recipeId: string) => void;
}

export const useRecipeStore = create<RecipeStore>()(
  persist(
    (set, get) => ({
      favorites: [],

      toggleFavorite: (id: string) => {
        const { favorites } = get();
        if (favorites.includes(id)) {
          set({ favorites: favorites.filter((fId) => fId !== id) });
        } else {
          set({ favorites: [...favorites, id] });
        }
      },

      isFavorite: (id: string) => {
        return get().favorites.includes(id);
      },

      checkedIngredients: {},

      toggleIngredient: (recipeId: string, index: number) => {
        const key = `${recipeId}-${index}`;
        const { checkedIngredients } = get();
        set({
          checkedIngredients: {
            ...checkedIngredients,
            [key]: !checkedIngredients[key],
          },
        });
      },

      isIngredientChecked: (recipeId: string, index: number) => {
        const key = `${recipeId}-${index}`;
        return !!get().checkedIngredients[key];
      },

      clearCheckedIngredients: (recipeId: string) => {
        const { checkedIngredients } = get();
        const newChecked = { ...checkedIngredients };
        Object.keys(newChecked).forEach((key) => {
          if (key.startsWith(`${recipeId}-`)) {
            delete newChecked[key];
          }
        });
        set({ checkedIngredients: newChecked });
      },
    }),
    {
      name: "whisk-wishes-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ favorites: state.favorites }),
    }
  )
);
