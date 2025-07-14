"use client";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { useTranslations } from "next-intl";
import { LogIn } from "@/functoins/validation";
import Alert from "@/components/mycomponents/formAletrt/formAlert";
import { useRouter } from "next/navigation";
import { useUser } from "@/components/mycomponents/usercontext/contextProvider";
interface loginForm {
  email: string;
  password: string;
}

export default function Login() {
  const t = useTranslations();
  const [error, setError] = useState<string | undefined>();
  const router = useRouter();
  const { dispatch } = useUser();
  const [formlogin, setFormLogIn] = useState<loginForm>({
    email: "",
    password: "",
  });
  const dis: boolean | undefined = Object.values(formlogin).every((e) => {
    return e.trim() !== "";
  });

  function handleChang(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormLogIn({ ...formlogin, [name]: value });
  }

  return (
    <div className="login h-screen flex justify-center items-center p-2">
      <form
        noValidate
        action={""}
        className={
          "flex justify-between items-center flex-col basis-full p-5 sm:p-12 gap-5 border-2 border-gray-400 rounded-sm md:basis-1/2 "
        }
        onSubmit={(e) => {
          e.preventDefault();
          const validation = LogIn(t).safeParse(formlogin);
          if (!validation.success) {
            setError(validation.error._zod.def[0].message);
          } else {
            const val = localStorage.getItem("user");
            if (val) {
              const user = JSON.parse(val);
              if (
                user.email === formlogin.email &&
                user.password === formlogin.password
              ) {
                router.push("/");
                setError(undefined);
                setFormLogIn({ email: "", password: "" });
                dispatch({ type: "login" });
              }
            }
            router.push("/");
            setError(undefined);
            setFormLogIn({ email: "", password: "" });
          }
        }}
      >
        <input
          dir="ltr"
          type="email"
          name="email"
          autoComplete="true"
          value={formlogin.email}
          className="p-2 sm:p-5 sm:text-2xl rounded-sm max-w-full w-full border-2  border-gray-400 focus:outline-none inset-shadow-sm/20 transition-all "
          placeholder={t("email_placeholder")}
          onChange={handleChang}
        />
        <input
          dir="ltr"
          type="password"
          name="password"
          value={formlogin.password}
          className="p-2 sm:p-5 sm:text-2xl rounded-sm max-w-full w-full border-2  border-gray-400 focus:outline-none inset-shadow-sm/20 transition-all"
          placeholder={t("password_placeholder")}
          onChange={handleChang}
        />
        {error && <Alert type="error" message={error} />}
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
          <Link className="text-blue-500" href={"/register"}>
            {t("register_page")}
          </Link>{" "}
        </p>
      </form>
    </div>
  );
}
