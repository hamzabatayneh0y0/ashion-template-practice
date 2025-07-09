"use client";

import { Slider } from "@/components/ui/slider";
import { useEffect, useState } from "react";
import Money from "@/components/mycomponents/currency/money";
import Products from "./fetchproducts";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "@/components/mycomponents/loader/loading";
import { useTranslations } from "next-intl";

export default function Shop() {
  const router = useRouter();
  const fromSearch = useSearchParams();
  const t = useTranslations("shop");
  const cat: string[] = [
    "all",
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing",
  ];
  const [choosedCat, setChoosedCat] = useState<string>();
  const [price, setPrice] = useState<number>();
  useEffect(() => {
    setChoosedCat(fromSearch.get("cat") || "all");
    setPrice(parseInt(fromSearch.get("price") || "100"));
  }, []);

  useEffect(() => {
    setChoosedCat(fromSearch.get("cat") || "all");
    setPrice(parseInt(fromSearch.get("price") || "100"));
  }, [fromSearch]);

  useEffect(() => {
    if (choosedCat && price)
      router.push(`/shop/?cat=${choosedCat}&price=${price?.toString()}`);
  }, [choosedCat, price]);

  if (!price && !choosedCat) return <Loading />;

  return (
    <div className="shop container m-auto flex flex-col gap-5 lg:flex-row py-12">
      <div className="filter flex gap-5 max-sm:flex-col justify-between items-start lg:justify-start lg:flex-col lg:basis-[40%] p-2">
        <div className="categories basis-[40%] lg:w-full lg:basis-[fit-content] max-sm:w-full">
          <h2 className="text-2xl font-[--font-cookie]">
            <span className="border-b-2 border-red-500">{t("categories")}</span>
          </h2>
          <ul>
            {cat.map((e, i) => {
              return (
                <li key={i} className="font-[500] border-b-2 border-gray-200 ">
                  <label className="flex gap-2 p-3 cursor-pointer">
                    <input
                      className="p-2"
                      type="checkbox"
                      checked={e === choosedCat}
                      onChange={(e) => {
                        setChoosedCat(e.target.value);
                      }}
                      value={e}
                    />
                    {t(e)}
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="price flex flex-col gap-2 basis-[40%] lg:w-full p-2 max-sm:w-full">
          <h2 className="text-2xl font-[--font-cookie]">
            <span className="border-b-2 border-red-500">{t("shop")}</span>{" "}
            {t("byPrice")}
          </h2>
          <div className="slider">
            <Slider
              defaultValue={[price || 100]}
              max={100}
              step={1}
              onValueChange={([val]) => setPrice(val)}
            />
            <div dir="ltr" className="flex justify-between">
              <span>
                <Money m={0} />
              </span>
              <span>
                <Money m={price || 100} />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:basis[60%]">
        <Products cat={choosedCat || "all"} price={price || 100} />
      </div>
    </div>
  );
}
