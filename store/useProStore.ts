import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ProStore {
  isPro: boolean;
  activatePro: () => void;
  deactivatePro: () => void;
}

export const useProStore = create<ProStore>()(
  persist(
    (set) => ({
      isPro: false,

      activatePro: () => {
        set({ isPro: true });
      },

      deactivatePro: () => {
        set({ isPro: false });
      },
    }),
    {
      name: "whisk-pro-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
