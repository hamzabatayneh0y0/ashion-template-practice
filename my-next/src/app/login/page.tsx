"use client";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
interface loginForm {
  email: string;
  password: string;
}
export default function Login() {
  const [formlogin, setFormLogIn] = useState<loginForm>({
    email: "",
    password: "",
  });
  const dis: boolean | undefined = Object.values(formlogin).every((e) => {
    return e.trim() !== "";
  });

  function handleChang(e: ChangeEvent<HTMLInputElement>) {
    const { type, value } = e.target as HTMLInputElement;
    setFormLogIn({ ...formlogin, [type]: value });
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
          placeholder="type your email"
          onChange={handleChang}
        />
        <input
          type="password"
          name="password"
          value={formlogin.password}
          className="p-2 sm:p-5 sm:text-2xl rounded-sm max-w-full w-full border-2  border-gray-400 focus:outline-none inset-shadow-sm/20 transition-all"
          placeholder="type your password"
          onChange={handleChang}
        />

        <input
          type="submit"
          disabled={!dis}
          value={"login"}
          className={`bg-gray-500 rounded-sm px-7 py-3 text-white font-bold transition-all ${
            !dis
              ? "cursor-not-allowed pointer-events-none"
              : "hover:bg-gray-600 cursor-pointer "
          }`}
        />
        <p className="text-gray-500 font-medium uppercase text-center transition-all">
          if you do not have accout please got to{" "}
          <Link className="text-blue-500" href={"/regester"}>
            regester
          </Link>{" "}
          page
        </p>
      </form>
    </div>
  );
}
