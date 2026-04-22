import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("staylux_theme");

    if (storedTheme) {
      setDarkMode(storedTheme === "dark");
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("staylux_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("staylux_theme", "light");
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  const value = useMemo(
    () => ({
      darkMode,
      toggleTheme
    }),
    [darkMode]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

function ThemeToggle() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="w-11 h-11 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white flex items-center justify-center transition"
      aria-label="Toggle Theme"
    >
      {darkMode ? <FaSun /> : <FaMoon />}
    </button>
  );
}

function useTheme() {
  return useContext(ThemeContext);
}

export { ThemeProvider, ThemeToggle, useTheme };