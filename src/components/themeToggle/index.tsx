import "./themeToggle.css";
import { useState, useEffect } from "react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

    return isDarkMode ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  function toggleTheme() {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.className = newTheme;
  }

  return (
    <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle theme">
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}
