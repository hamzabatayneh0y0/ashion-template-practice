"use client";
import changeTheme from "@/functoins/changTheme";
import getTheme from "@/functoins/getTheme";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { useEffect } from "react";

export default function Theme() {
  useEffect(() => {
    const theme = async () => {
      const c: RequestCookie | undefined = await getTheme();
      if (!c) {
        const isDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;

        if (isDark) {
          changeTheme("dark");
          localStorage.setItem("theme", "dark");
        } else {
          changeTheme("light");
          localStorage.setItem("theme", "light");
        }
      } else {
        document.documentElement.classList.add(
          c.value === "dark" ? "dark" : "light"
        );
      }
    };
    theme();
  }, []);
  return null;
}
