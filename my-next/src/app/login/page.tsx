"use client";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { useTranslations } from "next-intl";

interface loginForm {
  email: string;
  password: string;
}

export default function Login() {
  const t = useTranslations("login");
  const [formlogin, setFormLogIn] = useState<loginForm>({
    email: "",
    password: "",
  });
  const dis: boolean | undefined = Object.values(formlogin).every((e) => {
    return e.trim() !== "";
  });

  function handleChang(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target; // هنا استخدمت name بدل type (في الكود الأصلي كان type وهذا غلط)
    setFormLogIn({ ...formlogin, [name]: value });
  }

  return (
    <div className="login h-screen flex justify-center items-center p-2">
      <form
        action={""}
        className={
          "flex justify-between items-center flex-col basis-full p-5 sm:p-12 gap-5 border-2 border-gray-400 rounded-sm md:basis-1/2 h-1/2"
        }
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          type="email"
          name="email"
          autoComplete="true"
          value={formlogin.email}
          className="p-2 sm:p-5 sm:text-2xl rounded-sm max-w-full w-full border-2  border-gray-400 focus:outline-none inset-shadow-sm/20 transition-all "
          placeholder={t("email_placeholder")}
          onChange={handleChang}
        />
        <input
          type="password"
          name="password"
          value={formlogin.password}
          className="p-2 sm:p-5 sm:text-2xl rounded-sm max-w-full w-full border-2  border-gray-400 focus:outline-none inset-shadow-sm/20 transition-all"
          placeholder={t("password_placeholder")}
          onChange={handleChang}
        />

        <input
          type="submit"
          disabled={!dis}
          value={t("login_button")}
          className={`bg-blue-500 rounded-sm px-7 py-3 text-white font-bold transition-all ${
            !dis
              ? "cursor-not-allowed pointer-events-none bg-gray-500"
              : "hover:bg-blue-600 cursor-pointer "
          }`}
        />
        <p className="text-gray-500 font-medium uppercase text-center transition-all">
          {t("no_account")}{" "}
          <Link className="text-blue-500" href={"/regester"}>
            {t("register_page")}
          </Link>{" "}
        </p>
      </form>
    </div>
  );
}
