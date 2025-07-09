"use client";
import changeTheme from "@/functoins/changTheme";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import changeLang from "@/functoins/changeLang";
import { useCur } from "@/components/mycomponents/currency/currencyProvider";
import changeCur from "@/functoins/changeCur";
import Image from "next/image";
import { useUser } from "@/components/mycomponents/usercontext/contextProvider";
import { MdEdit, MdSave, MdVisibility, MdVisibilityOff } from "react-icons/md";

export default function MyAccount() {
  const { state, dispatch } = useUser();

  const [theme, setTheme] = useState<string>("");
  const [lang, setLang] = useState<string>("");
  const { cur, setCur } = useCur();
  const t = useTranslations();

  const [editMode, setEditMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    name: state.name,
    email: state.email,
    password: state.password,
    country: state.location.country,
    city: state.location.city,
  });

  useEffect(() => {
    setForm({
      name: state.name,
      email: state.email,
      password: state.password,
      country: state.location.country,
      city: state.location.city,
    });
  }, [state]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSave() {
    dispatch({
      type: "updateInfo",
      payload: {
        username: form.name,
        useremail: form.email,
        userpassword: form.password,
        userlocation: {
          country: form.country,
          city: form.city,
        },
      },
    });
    setEditMode(false);
  }
  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result;
      dispatch({
        type: "img",
        payload: { userimg: base64 || "/icon-7797704_640.png" },
      });
    };
    if (file) reader.readAsDataURL(file);
  }

  useEffect(() => {
    const c = async () => {
      const cookie: string | null = localStorage.getItem("theme");
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (theme === "") return;

    if (theme === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      localStorage.setItem("theme", "system");

      if (isDark) {
        changeTheme("dark");
      } else {
        changeTheme("light");
      }
    } else {
      if (theme === "dark") {
        changeTheme("dark");
        localStorage.setItem("theme", "dark");
      } else {
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
    <div className="container m-auto px-3 py-12">
      <div className="p-2 border-b-2 border-gray-200">
        <Image
          src={state.img.toString() || "/icon-7797704_640.png"}
          alt="user image"
          width={100}
          height={100}
          className="rounded-full shadow-sm"
        />
        <label className="m-2 cursor-pointer hover:text-red-500 transition-all">
          <span className="m-2 cursor-pointer hover:text-red-500 transition-all">
            {t("change_profile_image")}
          </span>
          <input
            type="file"
            className="cursor-pointer hidden"
            onChange={handleImageChange}
          />
        </label>
      </div>
      <div>
        <h2 className="uppercase border-t-2 pt-2 text-3xl border-gray-200 mb-4">
          {t("info")}
        </h2>

        <div className="space-y-4 text-2xl">
          <div className="flex flex-wrap gap-2 ">
            <label>{t("name")}:</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              readOnly={!editMode}
              className={` p-1 rounded border-2 outline-0 ${
                editMode ? "border-gray-300" : "border-transparent"
              }`}
            />
          </div>

          <div className="flex flex-wrap gap-2 ">
            <label>{t("email")}:</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              readOnly={!editMode}
              className={`p-1 rounded border-2  outline-0 ${
                editMode ? "border-gray-300" : "border-transparent"
              }`}
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <label>{t("password")}:</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              readOnly={!editMode}
              className={`p-1 rounded border-2 outline-0 ${
                editMode ? "border-gray-300" : "border-transparent"
              }`}
            />
            <button
              onClick={() => setShowPassword((prev) => !prev)}
              className="text-xl"
            >
              {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
            </button>
          </div>

          <div className="flex flex-wrap gap-2 ">
            <label>{t("country")}:</label>
            <input
              type="text"
              name="country"
              value={form.country}
              onChange={handleChange}
              readOnly={!editMode}
              className={` p-1 rounded border-2 outline-0 ${
                editMode ? "border-gray-300" : "border-transparent"
              }`}
            />
          </div>

          <div>
            <label>{t("city")}:</label>
            <input
              type="text"
              name="city"
              value={form.city}
              onChange={handleChange}
              readOnly={!editMode}
              className={`ml-2 p-1 rounded border-2 outline-0 ${
                editMode ? "border-gray-300" : "border-transparent"
              }`}
            />
          </div>
        </div>

        {/* الأزرار */}
        <div className="mt-5">
          {!editMode ? (
            <button
              onClick={() => setEditMode(true)}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
            >
              <MdEdit /> {t("edit_info")}
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="flex items-center gap-2 text-green-600 hover:text-green-800"
            >
              <MdSave /> {t("save_info")}
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-12 mt-12">
        <h2 className="uppercase border-t-2 pt-2 text-3xl border-gray-200">
          {t("setting")}
        </h2>
        <p className="flex justify-between">
          <span className="text-2xl">{t("theme")}: </span>
          <select
            className="dark:bg-gray-950 outline-0 py-1 px-5  rounded-sm border-2 cursor-pointer"
            value={theme}
            id="theme"
            onChange={(e) => setTheme(e.target.value)}
          >
            <option className=" cursor-pointer" value="dark">
              {t("dark")}
            </option>
            <option className=" cursor-pointer" value="light">
              {t("light")}
            </option>
            <option className=" cursor-pointer" value="system">
              {t("system")}
            </option>
          </select>
        </p>
        <p className="flex justify-between">
          <span className="text-2xl">{t("language")}: </span>
          <select
            className="dark:bg-gray-950 outline-0 py-1 px-5 rounded-sm border-2 cursor-pointer"
            value={lang}
            id="lang"
            onChange={(e) => setLang(e.target.value)}
          >
            <option className=" cursor-pointer" value="ar">
              {t("arabic")}
            </option>
            <option className=" cursor-pointer" value="en">
              {t("english")}
            </option>
          </select>
        </p>

        <p className="flex justify-between">
          <span className="text-2xl">{t("currency")}: </span>
          <select
            className="dark:bg-gray-950 outline-0 py-1 px-5 rounded-sm border-2 cursor-pointer"
            value={cur}
            id="cur"
            onChange={(e) => setCur(e.target.value)}
          >
            <option className=" cursor-pointer" value="jd">
              {t("jd")}
            </option>
            <option className=" cursor-pointer" value="us">
              {t("us")}
            </option>
          </select>
        </p>
      </div>
    </div>
  );
}
