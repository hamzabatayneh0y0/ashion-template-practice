"use client";
import { useTranslations } from "next-intl";
import BlogItem from "@/components/mycomponents/blogItem/blogItem";
import blog1 from "../../images/blog-1.jpg";
import blog2 from "../../images/blog-2.jpg";
import blog3 from "../../images/blog-3.jpg";
import blog4 from "../../images/blog-4.jpg";
import blog5 from "../../images/blog-5.jpg";
import blog6 from "../../images/blog-6.jpg";
import blog7 from "../../images/blog-7.jpg";
import blog8 from "../../images/blog-8.jpg";
import blog9 from "../../images/blog-9.jpg";

import { StaticImageData } from "next/image";
import { useState } from "react";
import Title from "@/components/mycomponents/title/title";

interface bloginfo {
  src: StaticImageData;
  text: string;
  auth: string;
  date: string;
  id: number;
}

export default function Blog() {
  const t = useTranslations();
  const data: bloginfo[] = [
    {
      src: blog1,
      text: t("blog.noBadBlood"),
      auth: t("author"),
      date: t("date"),
      id: 1,
    },
    {
      src: blog2,
      text: t("blog.amfCannes"),
      auth: t("author"),
      date: t("date"),
      id: 2,
    },
    {
      src: blog3,
      text: t("blog.amfCannes"),
      auth: t("author"),
      date: t("date"),
      id: 3,
    },
    {
      src: blog4,
      text: t("blog.amfCannes"),
      auth: t("author"),
      date: t("date"),
      id: 4,
    },
    {
      src: blog5,
      text: t("blog.amfCannes"),
      auth: t("author"),
      date: t("date"),
      id: 5,
    },
    {
      src: blog6,
      text: t("blog.amfCannes"),
      auth: t("author"),
      date: t("date"),
      id: 6,
    },
    {
      src: blog7,
      text: t("blog.amfCannes"),
      auth: t("author"),
      date: t("date"),
      id: 7,
    },
    {
      src: blog8,
      text: t("blog.amfCannes"),
      auth: t("author"),
      date: t("date"),
      id: 8,
    },
    {
      src: blog9,
      text: t("blog.amfCannes"),
      auth: t("author"),
      date: t("date"),
      id: 9,
    },
    {
      src: blog7,
      text: t("blog.amfCannes"),
      auth: t("author"),
      date: t("date"),
      id: 10,
    },
    {
      src: blog8,
      text: t("blog.amfCannes"),
      auth: t("author"),
      date: t("date"),
      id: 11,
    },
  ];

  const [load, setLoad] = useState<boolean>(false);

  function handleClick() {
    setLoad((prv) => !prv);
  }

  return (
    <div className="blog py-12 container m-auto max-sm:my-4 flex flex-col">
      <Title />
      <div
        className={`items columns-1 md:columns-2 lg:columns-3 overflow-hidden  ${
          load ? "max-h-[3000px]" : "max-h-[1300px] "
        } duration-[0.5s]`}
      >
        {data.map((e) => {
          return (
            <div key={e.id} className={"break-inside-avoid"}>
              <BlogItem src={e.src} text={e.text} auth={e.auth} date={e.date} />
            </div>
          );
        })}
      </div>
      <button
        className="cursor-pointer bg-red-500 text-white rounded-md capitalize font-bold py-3 px-5 m-auto mt-8 transition-all"
        onClick={handleClick}
      >
        {load ? t("blog.loadLess") : t("blog.loadMore")}
      </button>
    </div>
  );
}
