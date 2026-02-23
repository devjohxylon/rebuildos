import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  provider: "google" | "apple" | "guest";
}

interface AuthStore {
  user: User | null;
  isLoggedIn: boolean;
  isGuest: boolean;
  login: (user: User) => void;
  loginAsGuest: () => void;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,
      isGuest: false,

      login: (user: User) => {
        set({ user, isLoggedIn: true, isGuest: false });
      },

      loginAsGuest: () => {
        set({
          user: {
            id: "guest",
            name: "Little Baker",
            email: "",
            provider: "guest",
          },
          isLoggedIn: true,
          isGuest: true,
        });
      },

      logout: () => {
        set({ user: null, isLoggedIn: false, isGuest: false });
      },

      updateProfile: (updates: Partial<User>) => {
        const { user } = get();
        if (user) {
          set({ user: { ...user, ...updates } });
        }
      },
    }),
    {
      name: "whisk-auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
