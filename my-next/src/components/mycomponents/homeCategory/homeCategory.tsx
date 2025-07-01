import Link from "next/link";
import style from "./homeCategory.module.css";
import { CarouselItem } from "@/components/ui/carousel";
type data = {
  classname: string;
  title: string;
  disc: string;
};
export default function HomeCategory({ classname, title, disc }: data) {
  const i: string = style["cat" + classname];
  return (
    <CarouselItem>
      <div
        className={`category bg-no-repeat bg-cover bg-center p-5 transition-all sm:p-12 h-[600px] flex flex-col justify-center ${i}`}
      >
        <h2 className="text-4xl sm:text-6xl text-black">{title}</h2>
        <p className="text-gray-400 mt-5 text-2xl mb-8 sm:max-w-1/2">{disc}</p>
        <Link
          href={"/shop"}
          className="mt-5 font-bold border-b-3 p-2 text-black border-red-700 block w-fit "
        >
          Shop Now
        </Link>
      </div>
    </CarouselItem>
  );
}
