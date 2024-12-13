const toggleDarkMode = (enable: boolean) => {
  enable
    ? document.documentElement.classList.add("ion-palette-dark")
    : document.documentElement.classList.remove("ion-palette-dark");

    return checkDarkMode();
};

const checkDarkMode = () => {
  return document.documentElement.classList.contains("ion-palette-dark");
};

export const useDarkMode = () => {
  return {toggleDarkMode, checkDarkMode};
};
