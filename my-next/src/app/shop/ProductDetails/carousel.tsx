"use client";
import { useEffect, useState } from "react";
import {
  Carousel as UICarousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Image from "next/image";
export default function Carousel({ img }: { img: string }) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div>
      <UICarousel setApi={setApi}>
        <CarouselContent>
          <CarouselItem>
            <Image
              src={img}
              alt="product image"
              loading="lazy"
              width={300}
              height={300}
              style={{ width: "100%" }}
            />
          </CarouselItem>
          <CarouselItem>
            <Image
              src={img}
              alt="product image"
              loading="lazy"
              width={300}
              height={300}
              style={{ width: "100%" }}
            />
          </CarouselItem>
          <CarouselItem>
            <Image
              src={img}
              alt="product image"
              loading="lazy"
              width={300}
              height={300}
              style={{ width: "100%" }}
            />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious
          style={{ backgroundColor: "black" }}
          className="left-0 top-[80%] translate-y-[-50%]"
        />
        <CarouselNext
          style={{ backgroundColor: "black" }}
          className="right-0 top-[80%] translate-y-[-50%]"
        />
      </UICarousel>
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={`w-3 h-3 rounded-full ${
              current - 1 === index ? "bg-black" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
