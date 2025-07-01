"use client";
import changeTheme from "@/functoins/changTheme";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import changeLang from "@/functoins/changeLang";
import { useCur } from "@/components/mycomponents/currency/currencyProvider";
import changeCur from "@/functoins/changeCur";

export default function MyAccount() {
  const [theme, setTheme] = useState<string>("");
  const [lang, setLang] = useState<string>("");
  const { cur, setCur } = useCur();
  const t = useTranslations();
  useEffect(() => {
    const c = async () => {
      const cookie: string | null = localStorage.getItem("theme");
      console.log(cookie);
      if (cookie) {
        return setTheme(cookie);
      } else {
        return setTheme("system");
      }
    };
    c();
    const c2 = async () => {
      const cookie: string | null = localStorage.getItem("lang");
      if (cookie) {
        return setLang(cookie);
      } else {
        return setLang("en");
      }
    };
    c2();
    const c3 = async () => {
      const cookie: string | null = localStorage.getItem("currency");
      if (cookie) {
        return setCur(cookie);
      } else {
        return setCur("us");
      }
    };
    c3();
  }, []);

  useEffect(() => {
    if (theme === "") return;

    if (theme === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

      if (isDark) {
        // document.documentElement.classList.add("dark");
        changeTheme("dark");
        localStorage.setItem("theme", "dark");
      } else {
        // document.documentElement.classList.remove("dark");
        changeTheme("light");
        localStorage.setItem("theme", "light");
      }
    } else {
      if (theme === "dark") {
        // document.documentElement.classList.add("dark");
        changeTheme("dark");
        localStorage.setItem("theme", "dark");
      } else {
        // document.documentElement.classList.remove("dark");
        changeTheme("light");
        localStorage.setItem("theme", "light");
      }
    }
  }, [theme]);

  useEffect(() => {
    if (lang == "") return;
    changeLang(lang);
    localStorage.setItem("lang", lang);
    document.documentElement.dir = lang == "en" ? "ltr" : "rtl";
  }, [lang]);
  useEffect(() => {
    if (cur == "") return;
    changeCur(cur);
    localStorage.setItem("currency", cur);
  }, [cur]);
  return (
    <div className="">
      <select
        className="dark:bg-gray-950"
        value={theme}
        id="theme"
        onChange={(e) => setTheme(e.target.value)}
      >
        <option value="dark">{t("dark")}</option>
        <option value="light">{t("light")}</option>
        <option value="system">{t("system")}</option>
      </select>
      <select
        className="dark:bg-gray-950"
        value={lang}
        id="lang"
        onChange={(e) => setLang(e.target.value)}
      >
        <option value="ar">عربي</option>
        <option value="en">english</option>
      </select>
      <select
        className="dark:bg-gray-950"
        value={cur}
        id="cur"
        onChange={(e) => setCur(e.target.value)}
      >
        <option value="jd">jd</option>
        <option value="us">us</option>
      </select>
    </div>
  );
}
