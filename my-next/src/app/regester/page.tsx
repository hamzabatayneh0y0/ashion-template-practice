"use client";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { useTranslations } from "next-intl";

interface loginForm {
  email: string;
  password: string;
  password2: string;
  name: string;
}

export default function Regester() {
  const t = useTranslations();
  const [formlogin, setFormLogIn] = useState<loginForm>({
    email: "",
    password: "",
    password2: "",
    name: "",
  });

  const [check, setCheck] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState(false);

  const dis: boolean = Object.values(formlogin).every((e) => e.trim() !== "");

  function handleChang(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormLogIn({ ...formlogin, [name]: value });
  }

  return (
    <div className="login h-screen flex justify-center items-center p-2">
      <form
        className="flex justify-between items-center flex-col basis-full p-5 sm:p-12 gap-5 border-2 border-gray-400 rounded-sm md:basis-1/2"
        onSubmit={(e) => {
          e.preventDefault();
          if (formlogin.password !== formlogin.password2) {
            setCheck(false);
          } else {
            setCheck(true);
          }
        }}
      >
        <input
          type="text"
          name="name"
          value={formlogin.name}
          className="p-2 sm:p-5 sm:text-2xl rounded-sm max-w-full w-full border-2 border-gray-400 focus:outline-none transition-all"
          placeholder={t("auth.name")}
          onChange={handleChang}
        />
        <input
          type="email"
          name="email"
          autoComplete="true"
          value={formlogin.email}
          className="p-2 sm:p-5 sm:text-2xl rounded-sm max-w-full w-full border-2 border-gray-400 focus:outline-none transition-all"
          placeholder={t("auth.email")}
          onChange={handleChang}
        />
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={formlogin.password}
          className="p-2 sm:p-5 sm:text-2xl rounded-sm max-w-full w-full border-2 border-gray-400 focus:outline-none transition-all"
          placeholder={t("auth.password")}
          onChange={handleChang}
        />
        <input
          type={showPassword ? "text" : "password"}
          name="password2"
          value={formlogin.password2}
          className="p-2 sm:p-5 sm:text-2xl rounded-sm max-w-full w-full border-2 border-gray-400 focus:outline-none transition-all"
          placeholder={t("auth.repeat_password")}
          onChange={handleChang}
        />
        <button
          type="button"
          className="cursor-pointer"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? t("auth.hide_password") : t("auth.show_password")}
        </button>

        {!check && (
          <p className="text-red-500 font-medium uppercase text-center transition-all">
            {t("auth.password_mismatch")}
          </p>
        )}

        <input
          type="submit"
          disabled={!dis}
          value={t("auth.register")}
          className={`bg-blue-500 rounded-sm px-7 py-3 text-white font-bold transition-all ${
            !dis
              ? "cursor-not-allowed pointer-events-none bg-gray-500"
              : "hover:bg-blue-600 cursor-pointer"
          }`}
        />
        <p className="text-gray-500 font-medium uppercase text-center transition-all">
          {t("auth.have_account")}{" "}
          <Link className="text-blue-500" href={"/login"}>
            {t("auth.login")}
          </Link>{" "}
        </p>
      </form>
    </div>
  );
}
