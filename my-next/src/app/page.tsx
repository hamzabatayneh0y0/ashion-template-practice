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
    }, 1000);
    return () => {
      clearInterval(t);
    };
  }, []);
  return (
    <div className="Home">
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
          <p className="m-8 flex justify-between items-center flex-wrap">
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
