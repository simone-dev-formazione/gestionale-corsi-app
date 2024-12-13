import { Preferences } from "@capacitor/preferences";

const toggleDarkMode = async (enable: boolean) => {
  enable
    ? document.documentElement.classList.add("ion-palette-dark")
    : document.documentElement.classList.remove("ion-palette-dark");

    const isDark = checkDarkMode();

    await Preferences.set({
      key: 'dark',
      value: String(isDark)
    });

    return isDark;
};

const checkDarkMode = () => {
  return document.documentElement.classList.contains("ion-palette-dark");
};

export const useDarkMode = () => {
  return {toggleDarkMode, checkDarkMode};
};
