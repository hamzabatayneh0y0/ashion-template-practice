"use client";
import Link from "next/link";
import style from "./homeCategory.module.css";
import { useTranslations } from "next-intl";

type data = {
  classname: string;
  title: string;
  disc: string;
  cat: string;
};

export default function HomeCategory({ classname, title, disc, cat }: data) {
  const i: string = style["cat" + classname];
  const t = useTranslations("home");

  return (
    <div
      className={`category bg-no-repeat bg-cover bg-center p-12 transition-all text-black flex flex-col justify-center ar:items-end w-full h-full ${i}`}
    >
      <h2 className="text-6xl font-[cookie] lg:text-5xl">{t(title)}</h2>
      <p className="text-gray-400 mt-5 ar:text-black text-2xl mb-8 sm:max-w-1/2">
        {t(disc)}
      </p>
      <Link
        href={`/shop/?cat=${cat}`}
        className="mt-5 font-bold border-b-3 p-2 text-black border-red-700 block w-fit"
      >
        {t("shopNow")}
      </Link>
    </div>
  );
}
