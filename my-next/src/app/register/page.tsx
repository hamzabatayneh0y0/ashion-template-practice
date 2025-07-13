"use client";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { useTranslations } from "next-intl";
import { RegesterValidation } from "@/functoins/validation";
import Alert from "@/components/mycomponents/formAletrt/formAlert";
import { useUser } from "@/components/mycomponents/usercontext/contextProvider";
import { useRouter } from "next/navigation";

export default function Regester() {
  const { dispatch } = useUser();
  const t = useTranslations();
  const [formlogin, setFormLogIn] = useState({
    first_name: ``,
    last_name: ``,
    email: ``,
    password: ``,
    password2: ``,
    country: ``,
    address: ``,
    apartment: ``,
    city: ``,
    phone: ``,
  });
  const router = useRouter();

  const [error, setError] = useState<string | undefined>(undefined);
  const [showPassword, setShowPassword] = useState(false);

  function handleChang(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormLogIn({ ...formlogin, [name]: value });
  }

  return (
    <div className="login flex justify-center items-center p-2">
      <form
        noValidate
        className="flex justify-between items-center flex-col basis-full p-5 sm:p-12 gap-5 border-2 border-gray-400 rounded-sm"
        onSubmit={(e) => {
          e.preventDefault();
          const validation = RegesterValidation(t).safeParse(formlogin);
          if (!validation.success) {
            setError(validation.error.issues[0].message);
          } else {
            dispatch({ type: "register", payload: { ...formlogin } });
            router.push("/");
            setError(undefined);
            setFormLogIn({
              first_name: ``,
              last_name: ``,
              email: ``,
              password: ``,
              password2: ``,
              country: ``,
              address: ``,
              apartment: ``,
              city: ``,
              phone: ``,
            });
          }
        }}
      >
        {Object.entries(formlogin).map(([key, val], i) => {
          return (
            <input
              key={i}
              type={
                key === "password" || key === "password2"
                  ? showPassword
                    ? "text"
                    : "password"
                  : "text"
              }
              name={key}
              value={val}
              className="p-2 sm:p-5 sm:text-2xl rounded-sm max-w-full w-full border-2 border-gray-400 focus:outline-none transition-all"
              placeholder={t(key)}
              onChange={handleChang}
            />
          );
        })}

        <button
          type="button"
          className="cursor-pointer"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? t("hide_password") : t("show_password")}
        </button>

        {error && <Alert type="error" message={error} />}

        <input
          type="submit"
          value={t("register")}
          className="bg-blue-500 rounded-sm px-7 py-3 text-white font-bold transition-all hover:bg-blue-600 cursor-pointer"
        />

        <p className="text-gray-500 font-medium uppercase text-center transition-all">
          {t("have_account")}{" "}
          <Link className="text-blue-500" href={"/login"}>
            {t("Login")}
          </Link>
        </p>
      </form>
    </div>
  );
}
