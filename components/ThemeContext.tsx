import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem("theme");
        if (savedTheme) {
          setTheme(savedTheme as Theme);
        }
      } catch (error) {
        console.error("Failed to load theme:", error);
      }
    };

    loadTheme();
  }, []);

  const toggleTheme = async () => {
    try {
      const newTheme = theme === "light" ? "dark" : "light";
      setTheme(newTheme);
      await AsyncStorage.setItem("theme", newTheme);
    } catch (error) {
      console.error("Failed to save theme:", error);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
