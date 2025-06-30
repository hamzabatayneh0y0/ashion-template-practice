import Image, { StaticImageData } from "next/image";
import insta1 from "../../../images/insta-1.jpg";
import insta2 from "../../../images/insta-2.jpg";
import insta3 from "../../../images/insta-3.jpg";
import insta4 from "../../../images/insta-4.jpg";
import insta5 from "../../../images/insta-5.jpg";
import insta6 from "../../../images/insta-6.jpg";
import { FaInstagram } from "react-icons/fa";
import Link from "next/link";
import style from "./samples.module.css";
export default function Samples() {
  const images: StaticImageData[] = [
    insta1,
    insta2,
    insta3,
    insta4,
    insta5,
    insta6,
  ];
  return (
    <div className="samples p-y-12 flex flex-wrap justify-start text-2xl">
      {images.map((i, index) => {
        return (
          <div
            className={`basis-full md:basis-1/3 lg:basis-1/6 relative ${style.sample} `}
            key={index}
          >
            <span className="flex flex-col items-center gap-2 absolute top-[50%] left-[50%] translate-[-50%] w-full opacity-0 duration-[0.3s]">
              <FaInstagram />
              <Link href={"/#"}>@ ashion-shop</Link>
            </span>
            <Image src={i} loading="lazy" alt="alt" className="w-full" />
          </div>
        );
      })}
    </div>
  );
}
