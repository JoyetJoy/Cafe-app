import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useThemeStore = create(
  persist(
    (set) => ({
      darkMode: false,

      toggleTheme: () =>
        set((state) => ({ darkMode: !state.darkMode })),

      setDarkMode: (value) =>
        set(() => ({ darkMode: value })),
    }),
    {
      name: "theme-storage", // localStorage key
    }
  )
);