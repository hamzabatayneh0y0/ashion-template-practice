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
import { useTheme } from "@/components/mycomponents/theme/theme";
import Alert from "@/components/mycomponents/formAletrt/formAlert";

export default function MyAccount() {
  const { state, dispatch } = useUser();
  const [show, setShow] = useState(false);
  const { theme, setTheme } = useTheme();
  const [lang, setLang] = useState<string>("");
  const { cur, setCur } = useCur();
  const t = useTranslations();

  const [editMode, setEditMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    name: state.logedin ? state.first_name + " " + state.last_name : "",

    email: state.email,
    password: state.password,
    country: state.country,
    city: state.city,
  });

  useEffect(() => {
    setForm({
      name: state.logedin ? state.first_name + " " + state.last_name : "",
      email: state.email,
      password: state.password,
      country: state.country,
      city: state.city,
    });
  }, [state]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSave() {
    dispatch({
      type: "updateInfo",
      payload: {
        first_name: form.name?.split(" ")[0],
        last_name: form.name?.split(" ")[form.name.split(" ").length - 1],
        email: form.email,
        password: form.password,

        country: form.country,
        city: form.city,
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

        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
      } else {
        changeTheme("light");

        document.documentElement.classList.remove("dark");

        document.documentElement.classList.add("light");
      }
    } else {
      if (theme === "dark") {
        changeTheme("dark");
        localStorage.setItem("theme", "dark");
        document.documentElement.classList.remove("light");
        document.documentElement.classList.add("dark");
      } else {
        changeTheme("light");
        localStorage.setItem("theme", "light");
        document.documentElement.classList.remove("dark");
        document.documentElement.classList.add("light");
      }
    }
  }, [theme]);

  useEffect(() => {
    if (lang == "") return;
    changeLang(lang);
    localStorage.setItem("lang", lang);
    document.documentElement.dir = lang == "en" ? "ltr" : "rtl";
    document.documentElement.classList.remove("ar", "en");

    document.documentElement.classList.add(lang);
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
          src={
            state.img.toString() && state.logedin
              ? state.img.toString()
              : "/icon-7797704_640.png"
          }
          alt="user image"
          width={100}
          height={100}
          className="rounded-full shadow-sm"
          style={{ width: "100px", height: "100px" }}
        />
        {state.logedin ? (
          <>
            {" "}
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
          </>
        ) : null}
      </div>
      {state.logedin ? (
        <>
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
            <button
              data-modal-target="popup-modal"
              data-modal-toggle="popup-modal"
              type="button"
              onClick={() => {
                setShow(true);
              }}
              className="rounded-sm p-4 cursor-pointer shadow-sm text-white bg-red-500 dark:bg-black hover:shadow-lg uppercase me-auto transition-all hover:bg-red-600"
            >
              {t("delete_account")}
            </button>

            <div
              id="popup-modal"
              tabIndex={-1}
              onClick={(e) => {
                if (e.currentTarget === e.target) setShow(false);
              }}
              className={`${
                show ? "flex" : "hidden"
              } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
            >
              <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-950">
                  <button
                    type="button"
                    className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="popup-modal"
                  ></button>
                  <div className="p-4 md:p-5 text-center">
                    <div className="">
                      <Alert
                        type="error"
                        message={t(
                          "Are you sure you want to delete your account?"
                        )}
                      />
                    </div>
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400"></h3>
                    <button
                      data-modal-hide="popup-modal"
                      type="button"
                      onClick={() => {
                        setShow(false);
                        dispatch({ type: "delete" });
                      }}
                      className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                    >
                      {t("Yes, I&apos;m sure")}
                    </button>
                    <button
                      data-modal-hide="popup-modal"
                      type="button"
                      onClick={() => {
                        setShow(false);
                      }}
                      className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                      {t("No, cancel")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p className="p-5">{t("you are not logged in")}</p>
      )}
    </div>
  );
}
