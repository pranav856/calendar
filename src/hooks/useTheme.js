import { useEffect } from "react";

import usePersistentState from "./usePersistentState";

import { STORAGE_KEYS } from "../config/storageKeys";

import { APP_CONFIG } from "../config/appConfig";

export default function useTheme() {

  const [themeMode, setThemeMode] =
    usePersistentState(
      STORAGE_KEYS.THEME,
      APP_CONFIG.DEFAULT_THEME
    );

  useEffect(() => {

    document.body.classList.toggle(
      "light-theme",
      themeMode === "light"
    );

  }, [themeMode]);

  const toggleTheme = () => {

    setThemeMode(prev =>
      prev === "dark"
        ? "light"
        : "dark"
    );

  };

  return {

    themeMode,

    setThemeMode,

    toggleTheme

  };

}