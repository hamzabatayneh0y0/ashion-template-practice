"use client";
import Image from "next/image";
import style from "./header.module.css";
import logo from "../../../images/logo.png";
import Link from "next/link";
import { CiSearch, CiMenuBurger } from "react-icons/ci";
import { MdOutlineShoppingBag } from "react-icons/md";
import { GoHeart } from "react-icons/go";
import { useRef, useState } from "react";
import { useTranslations } from "next-intl";

export default function Header() {
  const [appear, setAppear] = useState<boolean>(false);
  const [ul, setUl] = useState<boolean>(false);
  const open = useRef<HTMLDivElement | null>(null);
  const t = useTranslations();

  function handleAppear() {
    setAppear((prv) => !prv);
  }

  return (
    <div className="header flex justify-between items-center py-12 px-5 shadow-lg ">
      <Image src={logo} alt={"logo"} width={150} className="" />
      <div
        ref={open}
        className={`max-lg:shadow-lgx p-5 flex grow lg:justify-between lg:items-center gap-8 text-2xl xl:text-3xl transition-all navlinks ${
          style.navlinks
        } max-lg:w-[300px] ${appear ? style.show : " "} `}
      >
        <Image
          src={logo}
          alt={"logo"}
          width={150}
          className={`max-lg:order-2 lg:hidden ${style.rtl}`}
        />
        <div
          className={`flex justify-end gap-8 lg:grow max-lg:order-3 ${style.sidelinks} `}
        >
          <Link className={style.link} href={"/"}>
            {t("Home")}
          </Link>
          <Link className={style.link} href={"/shop"}>
            {t("Shop")}
          </Link>
          <div
            className={
              style.pages +
              " max-lg:flex  max-lg:justify-center max-lg:flex-col"
            }
          >
            <Link
              className={`${style.link}`}
              href={"/#"}
              onClick={() => {
                setUl((prv) => !prv);
              }}
            >
              {t("Pages")}
            </Link>
            <div
              className={`${style.tr} ${
                ul ? style.openul : ""
              }  transition-all  lg:absolute lg:left-0   lg:bg-gray-950 lg:text-white text-2xl font-normal z-[222] `}
            >
              <ul className={`p-5 flex flex-col gap-4`}>
                <Link className={style.link} href={"/ProductDetails"}>
                  {t("Product Details")}
                </Link>
                <Link className={style.link} href={"/CheckOut"}>
                  {t("Check Out")}
                </Link>
                <Link className={style.link} href={"/Blog"}>
                  {t("Blog")}
                </Link>
                <Link className={style.link} href={"/BlogDetails"}>
                  {t("Blog Details")}
                </Link>
              </ul>
            </div>
          </div>
          <Link className={style.link} href={"/contact"}>
            {t("Contact")}
          </Link>

          <p className="text-2xl text-gray-500">
            <Link href={"/login"}>{t("Login")}</Link>/
            <Link href={"/register"}>{t("Register")}</Link>
          </p>
        </div>
        <div className="header-icons flex gap-5 me-5 text-3xl font-bold max-lg:mt-20 max-lg:justify-end max-lg:w-full">
          <CiSearch className="cursor-pointer" />
          <Link href={"/favorite"}>
            <GoHeart className="hover:text-red-500" />
          </Link>
          <Link href={"/cart"}>
            <MdOutlineShoppingBag />
          </Link>
        </div>
      </div>
      <CiMenuBurger
        className="blok lg:hidden text-4xl cursor-pointer"
        onClick={handleAppear}
      />
      <div
        className={`shadow lg:invisible fixed w-full h-full bg-black top-0 left-0 opacity-15 z-[889] ${
          appear ? "visible" : "invisible"
        } transition-all`}
        onClick={() => {
          setAppear(false);
          setUl(false);
        }}
      ></div>
    </div>
  );
}
