"use client";

import ProductCard from "@/components/mycomponents/productCard/productCard";
import { useUser } from "@/components/mycomponents/usercontext/contextProvider";
import { useEffect, useState } from "react";
import Loading from "../loading";
import { ProductType } from "@/components/mycomponents/usercontext/Type";
import { useTranslations } from "next-intl";

interface productType1 {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: {
    count: number;
    rate: number;
  };
  title: string;
}

export default function Favorite() {
  const t = useTranslations("favorite");
  const { state } = useUser();
  const [products, setProducts] = useState<productType1[]>();

  useEffect(() => {
    const controller = new AbortController();

    const Fetch = async () => {
      try {
        const F = await fetch("https://fakestoreapi.com/products", {
          signal: controller.signal,
        });
        if (!F.ok) {
          throw "fetch error";
        }
        const data = await F.json();
        setProducts(data);
      } catch (erorr) {
        console.log(erorr);
      }
    };
    Fetch();
    return () => {
      controller.abort();
    };
  }, []);

  if (!products) return <Loading />;

  const favoriteProducts = products.filter((e) =>
    state.products.some((p: ProductType) => p.productId === e.id && p.favorite)
  );

  if (favoriteProducts.length === 0)
    return (
      <h2 className="text-3xl flex justify-center items-center w-full h-full text-red-500 py-12">
        <span>{t("nothing_found")}</span>
      </h2>
    );

  return (
    <div className="favorite container m-auto items-start grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5 gap-5 transition-all duration-300 py-12">
      {favoriteProducts.map((e: productType1) => {
        return (
          <ProductCard
            key={e.id}
            row={false}
            product={e}
            label="none"
            beforesale={0}
          />
        );
      })}
    </div>
  );
}
