"use client";
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
interface bloginfo {
  src: StaticImageData;
  text: string;
  auth: string;
  date: string;
  id: number;
}
const data: bloginfo[] = [
  {
    src: blog1,
    text: "No Bad Blood! The Reason Why Tamr Judge Finally Made Up With...",
    auth: "Ema Timahe",
    date: "Seb 17, 2019",
    id: 1,
  },

  {
    src: blog2,
    text: "Amf Cannes Red Carpet Celebrities Kendall Jenner, Pamela...",
    auth: "Ema Timahe",
    date: "Seb 17, 2019",
    id: 2,
  },
  {
    src: blog3,
    text: "Amf Cannes Red Carpet Celebrities Kendall Jenner, Pamela...",
    auth: "Ema Timahe",
    date: "Seb 17, 2019",
    id: 3,
  },
  {
    src: blog4,
    text: "Amf Cannes Red Carpet Celebrities Kendall Jenner, Pamela...",
    auth: "Ema Timahe",
    date: "Seb 17, 2019",
    id: 4,
  },
  {
    src: blog5,
    text: "Amf Cannes Red Carpet Celebrities Kendall Jenner, Pamela...",
    auth: "Ema Timahe",
    date: "Seb 17, 2019",
    id: 5,
  },
  {
    src: blog6,
    text: "Amf Cannes Red Carpet Celebrities Kendall Jenner, Pamela...",
    auth: "Ema Timahe",
    date: "Seb 17, 2019",
    id: 6,
  },

  {
    src: blog7,
    text: "Amf Cannes Red Carpet Celebrities Kendall Jenner, Pamela...",
    auth: "Ema Timahe",
    date: "Seb 17, 2019",
    id: 7,
  },
  {
    src: blog8,
    text: "Amf Cannes Red Carpet Celebrities Kendall Jenner, Pamela...",
    auth: "Ema Timahe",
    date: "Seb 17, 2019",
    id: 8,
  },
  {
    src: blog9,
    text: "Amf Cannes Red Carpet Celebrities Kendall Jenner, Pamela...",
    auth: "Ema Timahe",
    date: "Seb 17, 2019",
    id: 9,
  },

  {
    src: blog7,
    text: "Amf Cannes Red Carpet Celebrities Kendall Jenner, Pamela...",
    auth: "Ema Timahe",
    date: "Seb 17, 2019",
    id: 10,
  },
  {
    src: blog8,
    text: "Amf Cannes Red Carpet Celebrities Kendall Jenner, Pamela...",
    auth: "Ema Timahe",
    date: "Seb 17, 2019",
    id: 11,
  },
];
export default function Blog() {
  const [load, setLoad] = useState<boolean>(false);
  function handleClick() {
    setLoad((prv) => {
      return !prv;
    });
  }
  return (
    <div className="blog py-12 container m-auto max-sm:my-4 flex flex-col">
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
        className="cursor-pointer bg-gray-400 rounded-md capitalize font-bold py-3 px-5 m-auto mt-8 transition-all"
        onClick={handleClick}
      >
        {load ? "Load less posts" : "Load more posts"}
      </button>
    </div>
  );
}
