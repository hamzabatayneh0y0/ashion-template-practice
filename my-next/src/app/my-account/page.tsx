"use client";
import getTheme from "@/functoins/getTheme";
import changeTheme from "@/functoins/changTheme";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import getLang from "@/functoins/getlang";
import changeLang from "@/functoins/changeLang";
import { useCur } from "@/components/mycomponents/currency/currencyProvider";
import getCurrency from "@/functoins/getCurrency";
import changeCur from "@/functoins/changeCur";

export default function MyAccount() {
  const [theme, setTheme] = useState<string>("");
  const [lang, setLang] = useState<string>("");
  const { cur, setCur } = useCur();

  const t = useTranslations();
  useEffect(() => {
    const c = async () => {
      const cookie: RequestCookie | undefined = await getTheme();
      if (cookie) {
        return setTheme(cookie.value);
      } else {
        return setTheme("system");
      }
    };
    c();
    const c2 = async () => {
      const cookie: RequestCookie | undefined = await getLang();
      if (cookie) {
        return setLang(cookie.value);
      } else {
        return setLang("en");
      }
    };
    c2();
    const c3 = async () => {
      const cookie: RequestCookie | undefined = await getCurrency();
      if (cookie) {
        return setCur(cookie.value);
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
      } else {
        // document.documentElement.classList.remove("dark");
        changeTheme("light");
      }
    }
  }, [theme]);

  useEffect(() => {
    if (lang == "") return;
    changeLang(lang);
    document.documentElement.dir = lang == "en" ? "ltr" : "rtl";
  }, [lang]);
  useEffect(() => {
    if (cur == "") return;
    changeCur(cur);
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
