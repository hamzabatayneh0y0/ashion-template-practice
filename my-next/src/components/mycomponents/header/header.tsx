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
import { useRouter } from "next/navigation";
import { useUser } from "../usercontext/contextProvider";
import { FaPlus } from "react-icons/fa";

export default function Header() {
  const cat: string[] = [
    "all",
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing",
  ];
  const { state, dispatch } = useUser();
  const [appear, setAppear] = useState<boolean>(false);
  const [ul, setUl] = useState<boolean>(false);
  const open = useRef<HTMLDivElement | null>(null);
  const [search, setSearch] = useState("");
  const [openSearch, setOpenSerach] = useState(false);
  const t = useTranslations();
  const router = useRouter();
  function handleAppear() {
    setAppear((prv) => {
      return !prv;
    });
  }

  return (
    <div className="header flex justify-between items-center py-12 px-5 shadow-lg ">
      <Image src={logo} alt={"logo"} width={150} className="" />
      <div
        ref={open}
        className={` dark:bg-gray-900 bg-white max-lg:shadow-lgx p-5 flex grow lg:justify-between lg:items-center gap-8 text-2xl xl:text-3xl transition-all navlinks ${
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
          <Link
            onClick={() => {
              setAppear(false);
            }}
            className={style.link}
            href={"/"}
          >
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
              className={`${style.link} ${style.pages} flex justify-between gap-1 items-center`}
              href={""}
              onClick={() => {
                setUl((prv) => !prv);
              }}
            >
              <span> {t("Pages")}</span>
              <FaPlus className={`${style.plus} plus `} />
            </Link>
            <div
              className={`${style.tr} ${
                ul ? style.openul : ""
              }  transition-all  lg:absolute lg:left-0   lg:bg-gray-950 lg:text-white text-2xl font-normal z-[222] `}
            >
              <ul className={`p-5 flex flex-col gap-4`}>
                <Link
                  onClick={() => {
                    setAppear(false);
                  }}
                  className={style.link}
                  href={"/CheckOut"}
                >
                  {t("Check Out")}
                </Link>
                <Link
                  onClick={() => {
                    setAppear(false);
                  }}
                  className={style.link}
                  href={"/Blog"}
                >
                  {t("Blog")}
                </Link>
              </ul>
            </div>
          </div>
          <Link
            className={style.link}
            href={"/contact"}
            onClick={() => {
              setAppear(false);
            }}
          >
            {t("Contact")}
          </Link>

          <p className="text-2xl text-gray-500">
            {!state.logedin ? (
              <>
                <Link
                  onClick={() => {
                    setAppear(false);
                  }}
                  href={"/login"}
                >
                  {t("Login")}
                </Link>
                {" / "}
                <Link
                  onClick={() => {
                    setAppear(false);
                  }}
                  href={"/register"}
                >
                  {t("Register")}
                </Link>
              </>
            ) : (
              <Link
                onClick={() => {
                  setAppear(false);
                  dispatch({ type: "logout" });
                }}
                href={"/"}
              >
                {t("LogOut")}
              </Link>
            )}
          </p>
        </div>
        <div className="header-icons lg:m-0 flex gap-5 me-5 items-center text-3xl font-bold max-lg:mt-20 max-lg:justify-end max-lg:w-full">
          <CiSearch
            className="cursor-pointer"
            onClick={() => {
              setAppear(false);
              setOpenSerach(true);
              setSearch("");
            }}
          />
          <Link
            onClick={() => {
              setAppear(false);
            }}
            href={"/favorite"}
          >
            <GoHeart className="hover:text-red-500" />
          </Link>
          <Link
            onClick={() => {
              setAppear(false);
            }}
            href={"/cart"}
          >
            <MdOutlineShoppingBag />
          </Link>
          <Link
            onClick={() => {
              setAppear(false);
            }}
            href={"/my-account"}
          >
            {" "}
            <Image
              src={
                state.img.toString() && state.logedin
                  ? state.img.toString()
                  : "/icon-7797704_640.png"
              }
              alt="user image"
              width={50}
              height={50}
              className="rounded-full shadow-sm"
              style={{ width: "50px", height: "50px" }}
            />
          </Link>
        </div>
      </div>
      <CiMenuBurger
        className="blok lg:hidden text-4xl cursor-pointer"
        onClick={() => {
          handleAppear();
        }}
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

      <div
        className={`search fixed left-0 top-0 w-full h-full text-black dark:bg-black/50 dark:text-white  bg-white/50 z-[999] ${
          openSearch ? "scale-100" : "scale-0"
        } transition-all duration-300 flex justify-center items-center`}
        onClick={(e) => {
          if (e.target instanceof HTMLDivElement) setOpenSerach(false);
        }}
      >
        <div className="content basis-[50%]">
          <input
            placeholder={t("searchPlaceholder")}
            className="border-b-2 border-gray-200 p-2 shadow-sm rounded-sm outline-0 w-full"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                const r = cat.filter((e) => search === t(e));

                router.push(`/shop/?cat=${r}`);
                setOpenSerach(false);
                setAppear(false);
              }
            }}
            onClick={() => setOpenSerach(true)}
          />
          <ul className="menu dark:bg-black bg-white">
            {cat.map((e, i) => {
              return (
                <li
                  onClick={() => {
                    router.push(`/shop/?cat=${e}`);

                    setSearch(e);
                    setOpenSerach(false);
                    setAppear(false);
                  }}
                  key={i}
                  className={`font-[500] p-3 border-b-2 border-gray-200 cursor-pointer hover:p-4 transition-all ${
                    t(e).toLowerCase().includes(search.toLowerCase())
                      ? "block"
                      : "hidden"
                  }`}
                >
                  {t(e)}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
