// Your approach of using document.documentElement.classList.add("dark") is the right way to add the .dark class to the HTML element in React.

import { createContext, useContext, useState, useEffect } from "react";
export type Theme = "light" | "dark" | "system";

const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
} | null>(null);

type ThemeProviderProps = {
  children: React.ReactNode;
};

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>("system");

  const applyTheme = (currentTheme: Theme) => {
    const root = document.documentElement;
    root.classList.remove("dark");

    if (currentTheme === "dark") {
      root.classList.add("dark");
    } else if (currentTheme === "system") {
      // Check system preference
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        root.classList.add("dark");
      }
    }
  };

  // Initialize theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedTheme === "dark" || savedTheme === "light") {
      setTheme(savedTheme as Theme);
    } else {
      setTheme("system");
    }
  }, []);

  // Apply theme whenever it changes
  useEffect(() => {
    applyTheme(theme);
    if (theme === "dark") {
      localStorage.setItem("theme", "dark");
    } else if (theme === "light") {
      localStorage.setItem("theme", "light");
    } else if (theme === "system") {
      localStorage.removeItem("theme");
    }
  }, [theme]);

  // Listen for system theme changes when in system mode
  useEffect(() => {
    if (theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemThemeChange = () => {
      if (theme === "system") {
        applyTheme("system");
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);
    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
export const useTheme = () => {
  const context = useContext(ThemeContext);
  //null safety
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
