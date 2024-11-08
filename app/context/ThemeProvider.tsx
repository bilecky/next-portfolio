"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
}

// Tworzymy kontekst z domyślną wartością null, którą nadpiszemy w providerze
const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<string>("dark"); // Domyślnie ustawiamy tryb ciemny

  // Pobieramy zapisany motyw z localStorage po załadowaniu komponentu
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Zapisujemy aktualny motyw w localStorage oraz dodajemy odpowiednią klasę do elementu <html>
  useEffect(() => {
    if (theme) {
      localStorage.setItem("theme", theme);
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Niestandardowy hook do korzystania z ThemeContext
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
