"use client";
import Loading from "@/app/loading";
import changeTheme from "@/functoins/changTheme";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
export const ThemeContext = createContext<{
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}>({
  theme: "",
  setTheme: () => {},
});

export default function Theme({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState("");
  useEffect(() => {
    const c: string | null = localStorage.getItem("theme");
    if (!c) {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

      localStorage.setItem("theme", "system");
      setTheme("system");
      if (isDark) {
        changeTheme("dark");
        document.documentElement.classList.add("dark");
      } else {
        changeTheme("light");

        document.documentElement.classList.add("light");
      }
    } else {
      setTheme(c);
    }
  }, []);
  if (theme === "") return <Loading />;
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
export function useTheme() {
  const { theme, setTheme } = useContext(ThemeContext);
  return { theme, setTheme };
}
