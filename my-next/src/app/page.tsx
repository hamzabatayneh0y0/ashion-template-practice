"use client";
import HomeFeature from "@/components/mycomponents/homeFeatures/homeFeatures";
import Image from "next/image";
import { FaCar } from "react-icons/fa";
import { FaMoneyBill1 } from "react-icons/fa6";
import { IoIosSettings } from "react-icons/io";
import { MdOutlinePayment } from "react-icons/md";
import blog4 from "../images/blog-4.jpg";
import Link from "next/link";
import { useEffect, useState } from "react";
import moment from "moment";
import changeTheme from "@/functoins/changTheme";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import HomeCategory from "@/components/mycomponents/homeCategory/homeCategory";
import getTheme from "@/functoins/getTheme";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
type categorydata = {
  classname: string;
  title: string;
  disc: string;
};
const data: categorydata[] = [
  {
    classname: "1",
    title: "Women’s fashion",
    disc: "Sitamet, consectetur adipiscing elit, sed do eiusmod tempor incidid-unt labore edolore magna aliquapendisse ultrices gravida.",
  },
  {
    classname: "2",
    title: "Men’s fashion",
    disc: "358 items",
  },
  {
    classname: "3",
    title: "Kid’s fashion",
    disc: "273 items",
  },
  {
    classname: "4",
    title: "Cosmetics",
    disc: "159 items",
  },
  {
    classname: "5",
    title: "Accessories",
    disc: "792 items",
  },
];
export default function Home() {
  const year = new Date().getFullYear();
  const [timer, setTimer] = useState<number[]>([]);
  const l = moment().add(1, "month");

  useEffect(() => {
    const t = setInterval(() => {
      const now = moment();
      const duration: moment.Duration = moment.duration(l.diff(now));
      setTimer([
        duration.days(),
        duration.hours(),
        duration.minutes(),
        duration.seconds(),
      ]);

      const theme = async () => {
        const c: RequestCookie | undefined = await getTheme();
        if (!c) {
          const isDark = window.matchMedia(
            "(prefers-color-scheme: dark)"
          ).matches;

          if (isDark) {
            changeTheme("dark");
            localStorage.setItem("theme", "dark");
          } else {
            changeTheme("light");
            localStorage.setItem("theme", "light");
          }
        } else {
          document.documentElement.classList.add(
            c.value === "dark" ? "dark" : "light"
          );
        }
      };
      theme();
    }, 1000);
    return () => {
      clearInterval(t);
    };
  }, []);
  return (
    <div className="Home">
      <div className="homecategory">
        <div className="slider">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 2000,
              }),
            ]}
          >
            <CarouselContent>
              {data.map((e, i) => {
                return (
                  <HomeCategory
                    classname={e.classname}
                    title={e.title}
                    disc={e.disc}
                    key={i}
                  />
                );
              })}
            </CarouselContent>
          </Carousel>
        </div>
      </div>

      <div
        className={`cllection flex py-12 px-3 justify-center bg-[url(../images/banner-1.jpg)] bg-no-repeat bg-cover bg-center`}
      >
        <div className="slider basis-[30%] text-center text-black overflow-hidden">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 2000,
              }),
            ]}
          >
            <CarouselContent>
              <CarouselItem className="w-fit">
                <p className="text-2xl text-red-500">The Chloe Collection</p>
                <h1 className="font-[cookie,cursive] text-4xl sm:text-6xl my-3">
                  The Project Jacket
                </h1>
                <Link
                  className="mt-5 font-bold border-b-3 p-2  border-red-700 block w-fit m-auto"
                  href={"/shop"}
                >
                  Shop Now
                </Link>
              </CarouselItem>
              <CarouselItem className="w-fit">
                <p className="text-2xl text-red-500">The Chloe Collection</p>
                <h1 className="font-[cookie,cursive] text-4xl sm:text-6xl  my-3">
                  The Project Jacket
                </h1>
                <Link
                  className="mt-5 font-bold border-b-3 p-2  border-red-700 block w-fit m-auto"
                  href={"/shop"}
                >
                  Shop Now
                </Link>
              </CarouselItem>
              <CarouselItem className="w-fit">
                <p className="text-2xl text-red-500">The Chloe Collection</p>
                <h1 className="font-[cookie,cursive] text-4xl sm:text-6xl  my-3">
                  The Project Jacket
                </h1>
                <Link
                  className="mt-5 font-bold border-b-3 p-2  border-red-700 block w-fit m-auto"
                  href={"/shop"}
                >
                  Shop Now
                </Link>
              </CarouselItem>
            </CarouselContent>
          </Carousel>
        </div>
      </div>
      <div className="discount container m-auto py-12 flex flex-col lg:flex-row">
        <Image
          src={blog4}
          alt="blog5image"
          loading="lazy"
          className="basis-full lg:basis-1/2 w-full"
        />
        <div className="date basis-full lg:basis-1/2 text-center p-5 lg:p-12 bg-gray-200 z-0 relative before:absolute before:w-[35%] before:aspect-square before:bg-white before:top[50%] before:left[50%] before:translate-x-[-50%] before:-z-1 before:rounded-full">
          <p className="m-5">Discount</p>
          <h2 className={`font-[cookie,cursive] text-red-700 text-6xl m-5`}>
            Summer {year}
          </h2>
          <p className="m-5 uppercase">
            Sale{" "}
            <span className="text-red-700 mx-3 font-bold text-2xl"> 50%</span>
          </p>
          <p className="m-8 flex justify-between items-center flex-wrap text-black">
            <span className="text-2xl md:text-4xl font-[500] block">
              {timer[0]}
              <sub className="text-gray-400 text-[15px] md:text-[20px] p-1">
                Day
              </sub>
            </span>{" "}
            <span className="text-2xl md:text-4xl font-[500] block">
              {timer[1]}
              <sub className="text-gray-400 text-[15px] md:text-[20px] p-1">
                Hour
              </sub>
            </span>{" "}
            <span className="text-2xl md:text-4xl font-[500] block">
              {timer[2]}
              <sub className="text-gray-400 text-[15px] md:text-[20px]p-1">
                Minute
              </sub>
            </span>{" "}
            <span className="text-2xl md:text-4xl font-[500] block">
              {timer[3]}
              <sub className="text-gray-400 text-[15px] md:text-[20px]p-1">
                Second
              </sub>
            </span>
          </p>
          <Link
            className="mt-5 font-bold border-b-3 p-2  border-red-700 block w-fit m-auto"
            href={"/shop"}
          >
            Shop Now
          </Link>
        </div>
      </div>
      <div className="features flex flex-wrap justify-center  container m-auto py-12 ">
        <HomeFeature
          icon={<FaCar className="text-red-500 text-5xl " />}
          title="Free Shipping"
          discreption="For all oder over $99"
        />
        <HomeFeature
          icon={<FaMoneyBill1 className="text-red-500 text-5xl" />}
          title="Free Money Back Guarantee"
          discreption="If good have Problems"
        />
        <HomeFeature
          icon={<IoIosSettings className="text-red-500 text-5xl " />}
          title="Online Support 24/7"
          discreption="Dedicated support"
        />
        <HomeFeature
          icon={<MdOutlinePayment className="text-red-500 text-5xl " />}
          title="Payment Secure"
          discreption="100% secure payment

"
        />
      </div>
    </div>
  );
}
