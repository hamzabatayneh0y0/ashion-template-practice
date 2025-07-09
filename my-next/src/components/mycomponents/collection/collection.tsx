"use client";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export default function Collection() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const t = useTranslations("home");

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div
      className={`cllection flex py-12 px-3 justify-center bg-[url(../images/banner-1.jpg)] bg-no-repeat bg-cover bg-center`}
    >
      <div className="slider w-fit text-center text-black">
        <Carousel
          dir="ltr"
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 2000,
              stopOnInteraction: false,
            }),
          ]}
        >
          <CarouselContent>
            {[1, 2, 3].map((_, i) => (
              <CarouselItem className="w-full" key={i}>
                <p className="sm:text-2xl text-red-500">
                  {t("chloeCollection")}
                </p>
                <h1 className="font-[cookie,cursive] text-4xl sm:text-6xl my-3">
                  {t("projectJacket")}
                </h1>
                <Link
                  className="mt-5 font-bold border-b-3 p-2 border-red-700 block w-fit m-auto"
                  href={"/shop"}
                >
                  {t("shopNow")}
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`w-3 h-3 rounded-full ${
                current - 1 === index ? "bg-red-500" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
