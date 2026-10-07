import { useEffect, useState } from "react";

const THEME_STORAGE_KEY = "mvds-theme";
const THEME_CHANGE_EVENT = "mvds-theme-change";

function getSystemTheme() {
  if (typeof window === "undefined") {
    return "light";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(nextTheme) {
  if (typeof document === "undefined") {
    return;
  }

  const resolvedTheme = nextTheme === "system" ? getSystemTheme() : nextTheme;
  document.documentElement.classList.toggle("dark", resolvedTheme === "dark");
}

export function useThemePreference() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") {
      return "dark";
    }

    return window.localStorage.getItem(THEME_STORAGE_KEY) ?? "dark";
  });

  useEffect(() => {
    applyTheme(theme);

    if (typeof window !== "undefined") {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
      window.dispatchEvent(
        new CustomEvent(THEME_CHANGE_EVENT, {
          detail: theme,
        }),
      );
    }
  }, [theme]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    function handleChange() {
      if (theme === "system") {
        applyTheme("system");
      }
    }

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    function handleThemeChange(event) {
      setTheme(event.detail);
    }

    function handleStorage(event) {
      if (event.key === THEME_STORAGE_KEY && event.newValue) {
        setTheme(event.newValue);
      }
    }

    window.addEventListener(THEME_CHANGE_EVENT, handleThemeChange);
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener(THEME_CHANGE_EVENT, handleThemeChange);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  return {
    resolvedTheme: theme === "system" ? getSystemTheme() : theme,
    setTheme,
    theme,
  };
}
