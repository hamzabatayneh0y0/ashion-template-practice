"use client";
import logo from "../../../images/logo.png";
import Image from "next/image";
import pay1 from "../../../images/payment-1.png";
import pay2 from "../../../images/payment-2.png";
import pay3 from "../../../images/payment-3.png";
import pay4 from "../../../images/payment-4.png";
import pay5 from "../../../images/payment-5.png";
import Link from "next/link";
import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  FaFacebookF,
  FaYoutube,
  FaInstagram,
  FaPinterest,
  FaTwitter,
} from "react-icons/fa";

export default function Footer() {
  const t = useTranslations();
  const [footerEmail, setEmail] = useState<string>("");

  return (
    <div className="footer container py-12 m-auto ">
      <div className="info flex justify-between items-start max-lg:flex-wrap">
        <div className="main basis-full md:basis-[60%] lg:basis-[30%] p-5">
          <Image src={logo} alt={"logo"} loading="lazy" width={125} />
          <p className="my-3 text-2xl text-gray-400 ">
            {t("footerdescription")}
          </p>
          <div className="pay flex gap-3 my-2">
            <Link href={"/#"}>
              <Image src={pay1} alt="payment" />
            </Link>
            <Link href={"/#"}>
              <Image src={pay2} alt="payment" />
            </Link>
            <Link href={"/#"}>
              <Image src={pay3} alt="payment" />
            </Link>
            <Link href={"/#"}>
              <Image src={pay4} alt="payment" />
            </Link>
            <Link href={"/#"}>
              <Image src={pay5} alt="payment" />
            </Link>
          </div>
        </div>

        <ul className="quicklinks basis-full md:basis-[40%] lg:basis-[20%] p-5">
          <p className="title text-3xl font-bold mb-4">{t("Quick links")}</p>
          <li className="my-2">
            <Link href={"/#"} className="text-gray-400 text-2xl font-light">
              {t("About")}
            </Link>
          </li>
          <li className="my-2">
            <Link href={"/#"} className="text-gray-400 text-2xl font-light">
              {t("Blogs")}
            </Link>
          </li>
          <li className="my-2">
            <Link href={"/#"} className="text-gray-400 text-2xl font-light">
              {t("Contact")}
            </Link>
          </li>
          <li className="my-2">
            <Link href={"/#"} className="text-gray-400 text-2xl font-light">
              {t("FAQ")}
            </Link>
          </li>
        </ul>

        <ul className="account basis-full md:basis-[50%] lg:basis-[20%] p-5">
          <p className="title text-3xl font-bold mb-4">{t("Account")}</p>
          <li className="my-2">
            <Link
              href={"/my-account"}
              className="text-gray-400 text-2xl font-light"
            >
              {t("My Acccount")}
            </Link>
          </li>
          <li className="my-2">
            <Link href={"/#"} className="text-gray-400 text-2xl font-light">
              {t("Orders Tracking")}
            </Link>
          </li>
          <li className="my-2">
            <Link href={"/#"} className="text-gray-400 text-2xl font-light">
              {t("Checkout")}
            </Link>
          </li>
          <li className="my-2">
            <Link href={"/#"} className="text-gray-400 text-2xl font-light">
              {t("Wishlist")}
            </Link>
          </li>
        </ul>

        <div className="news basis-full md:basis-[50%] lg:basis-[30%] p-5 max-sm:max-w-full">
          <p className="title text-3xl font-bold mb-4">{t("News Letter")}</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            action=""
            className="rounded-full border-2 border-gray-300 flex justify-between p-2 max-sm:flex-col"
          >
            <input
              className="focus:outline-none p-2 text-gray-400"
              type="email"
              placeholder={t("type your email")}
              value={footerEmail}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="submit"
              value={t("SUBSCRIBE")}
              className="bg-red-500 rounded-full p-2 text-white"
            />
          </form>
          <div className="social flex justify-start items-center my-5 flex-wrap max-sm:justify-start gap-1 ">
            <Link
              href={"/#"}
              className="bg-gray-300 p-4  rounded-full dark:bg-gray-950"
            >
              <FaFacebookF />
            </Link>
            <Link
              href={"/#"}
              className="bg-gray-300 p-4  rounded-full dark:bg-gray-950"
            >
              <FaInstagram />
            </Link>
            <Link
              href={"/#"}
              className="bg-gray-300 p-4  rounded-full dark:bg-gray-950"
            >
              <FaYoutube />
            </Link>
            <Link
              href={"/#"}
              className="bg-gray-300 p-4  rounded-full dark:bg-gray-950"
            >
              <FaTwitter />
            </Link>
            <Link
              href={"/#"}
              className="bg-gray-300 p-4  rounded-full dark:bg-gray-950"
            >
              <FaPinterest />
            </Link>
          </div>
        </div>
      </div>

      <div className="copyright p-5 border-t-2 border-gray-300 text-center text-gray-400">
        <p>
          {t(
            "Copyright \u00a9 2025 All rights reserved | This template is made with by Colorlib"
          )}
        </p>
      </div>
    </div>
  );
}
