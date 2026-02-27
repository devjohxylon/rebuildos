import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface GroceryItem {
  id: string;
  name: string;
  recipeId?: string;
  recipeTitle?: string;
  checked: boolean;
}

interface PantryStore {
  // Pantry - ingredients the user has
  pantryItems: string[]; // pantry ingredient IDs
  addPantryItem: (id: string) => void;
  removePantryItem: (id: string) => void;
  togglePantryItem: (id: string) => void;
  hasPantryItem: (id: string) => boolean;
  clearPantry: () => void;

  // Grocery list
  groceryList: GroceryItem[];
  addToGroceryList: (items: Omit<GroceryItem, "id" | "checked">[]) => void;
  toggleGroceryItem: (id: string) => void;
  removeGroceryItem: (id: string) => void;
  clearCheckedItems: () => void;
  clearGroceryList: () => void;
}

export const usePantryStore = create<PantryStore>()(
  persist(
    (set, get) => ({
      pantryItems: [],

      addPantryItem: (id: string) => {
        const { pantryItems } = get();
        if (!pantryItems.includes(id)) {
          set({ pantryItems: [...pantryItems, id] });
        }
      },

      removePantryItem: (id: string) => {
        set({ pantryItems: get().pantryItems.filter((item) => item !== id) });
      },

      togglePantryItem: (id: string) => {
        const { pantryItems } = get();
        if (pantryItems.includes(id)) {
          set({ pantryItems: pantryItems.filter((item) => item !== id) });
        } else {
          set({ pantryItems: [...pantryItems, id] });
        }
      },

      hasPantryItem: (id: string) => {
        return get().pantryItems.includes(id);
      },

      clearPantry: () => {
        set({ pantryItems: [] });
      },

      groceryList: [],

      addToGroceryList: (items) => {
        const { groceryList } = get();
        const newItems: GroceryItem[] = items
          .filter(
            (item) =>
              !groceryList.some(
                (existing) =>
                  existing.name === item.name &&
                  existing.recipeId === item.recipeId
              )
          )
          .map((item) => ({
            ...item,
            id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
            checked: false,
          }));
        set({ groceryList: [...groceryList, ...newItems] });
      },

      toggleGroceryItem: (id: string) => {
        set({
          groceryList: get().groceryList.map((item) =>
            item.id === id ? { ...item, checked: !item.checked } : item
          ),
        });
      },

      removeGroceryItem: (id: string) => {
        set({
          groceryList: get().groceryList.filter((item) => item.id !== id),
        });
      },

      clearCheckedItems: () => {
        set({
          groceryList: get().groceryList.filter((item) => !item.checked),
        });
      },

      clearGroceryList: () => {
        set({ groceryList: [] });
      },
    }),
    {
      name: "whisk-pantry-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
