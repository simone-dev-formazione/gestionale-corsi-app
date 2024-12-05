import { create } from "zustand";


interface ThemeStore {
    theme: boolean;
    setGlobalTheme: (value: boolean) => void
}

export const useThemeStore = create<ThemeStore>()((set) => ({
    theme: false,
    setGlobalTheme: (value) => {set({theme: value})}
}));