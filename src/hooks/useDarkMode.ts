import { Preferences } from "@capacitor/preferences";

const darkModeClass = "ion-palette-dark"

const toggleDarkMode = async (enable: boolean) => {
  enable
    ? document.documentElement.classList.add(darkModeClass)
    : document.documentElement.classList.remove(darkModeClass);

    const isDark = checkDarkMode();

    await Preferences.set({
      key: 'dark',
      value: String(isDark)
    });

    return isDark;
};

const checkDarkMode = () => {
  return document.documentElement.classList.contains(darkModeClass);
};

export const useDarkMode = () => {
  return {toggleDarkMode, checkDarkMode};
};
