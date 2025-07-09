import HomeFeature from "@/components/mycomponents/homeFeatures/homeFeatures";
import Image from "next/image";
import { FaCar } from "react-icons/fa";
import { FaMoneyBill1 } from "react-icons/fa6";
import { IoIosSettings } from "react-icons/io";
import { MdOutlinePayment } from "react-icons/md";
import blog4 from "../images/blog-4.jpg";

import Link from "next/link";
import HomeCategory from "@/components/mycomponents/homeCategory/homeCategory";
import NewProduct from "@/components/mycomponents/newProduct/newProduct";
import HomeTimmer from "@/components/mycomponents/homeTimmer/homeTimmer";
import { Suspense } from "react";
import Trend from "@/components/mycomponents/trend/trend";
import Loading from "./loading";
import Collection from "@/components/mycomponents/collection/collection";
import { useTranslations } from "next-intl";

type categorydata = {
  classname: string;
  title: string;
  disc: string;
  cat: string;
};

export default function Home() {
  const t = useTranslations("home");
  const year = new Date().getFullYear();

  const data: categorydata[] = [
    {
      classname: "1",
      title: "womenTitle",
      disc: "womenDisc",
      cat: "women's clothing",
    },
    {
      classname: "2",
      title: "menTitle",
      disc: "menDisc",
      cat: "men's clothing",
    },
    {
      classname: "3",
      title: "kidTitle",
      disc: "kidDisc",
      cat: "men's clothing",
    },
    {
      classname: "4",
      title: "cosTitle",
      disc: "cosDisc",
      cat: "jewelery",
    },
    {
      classname: "5",
      title: "accTitle",
      disc: "accDisc",
      cat: "jewelery",
    },
  ];

  return (
    <div className="Home">
      <div className="homecategory flex flex-col lg:flex-row">
        <div className="lg:basis-[50%] p-2">
          <HomeCategory
            classname="1"
            title={data[0].title}
            disc={data[0].disc}
            cat={data[0].cat}
          />
        </div>
        <div className="lg:basis-[50%] grid grid-cols-1 md:grid-cols-2">
          {data.map((e, i) => {
            if (i > 0)
              return (
                <div key={i} className="p-2">
                  <HomeCategory
                    classname={data[i].classname}
                    title={data[i].title}
                    disc={data[i].disc}
                    cat={data[i].cat}
                  />
                </div>
              );
            else return null;
          })}
        </div>
      </div>

      <NewProduct />

      <Collection />

      <Suspense fallback={<Loading />}>
        <Trend />
      </Suspense>

      <div className="discount container m-auto py-12 flex flex-col lg:flex-row">
        <Image
          src={blog4}
          alt="blog5image"
          loading="lazy"
          className="basis-full lg:basis-1/2 w-full"
        />
        <div className="date basis-full lg:basis-1/2 text-center p-5 lg:p-12 bg-gray-200 z-0 relative before:absolute before:w-[35%] before:aspect-square before:bg-white before:top[50%] before:left[50%] before:translate-x-[-50%] before:-z-1 before:rounded-full">
          <p className="m-5">{t("discount")}</p>
          <h2 className={`font-[cookie,cursive] text-red-700 text-6xl m-5`}>
            {t("summer")} {year}
          </h2>
          <p className="m-5 uppercase">
            {t("sale")}
            <span className="text-red-700 mx-3 font-bold text-2xl"> 50%</span>
          </p>
          <p className="m-8 flex justify-between items-center flex-wrap text-black">
            <HomeTimmer />
          </p>
          <Link
            className="mt-5 font-bold border-b-3 p-2  border-red-700 block w-fit m-auto"
            href={"/shop"}
          >
            {t("shopNow")}
          </Link>
        </div>
      </div>
      <div className="features flex flex-wrap justify-center  container m-auto py-12 ">
        <HomeFeature
          icon={<FaCar className="text-red-500 text-5xl " />}
          title={t("feature1")}
          discreption={t("feature1Desc")}
        />
        <HomeFeature
          icon={<FaMoneyBill1 className="text-red-500 text-5xl" />}
          title={t("feature2")}
          discreption={t("feature2Desc")}
        />
        <HomeFeature
          icon={<IoIosSettings className="text-red-500 text-5xl " />}
          title={t("feature3")}
          discreption={t("feature3Desc")}
        />
        <HomeFeature
          icon={<MdOutlinePayment className="text-red-500 text-5xl " />}
          title={t("feature4")}
          discreption={t("feature4Desc")}
        />
      </div>
    </div>
  );
}
