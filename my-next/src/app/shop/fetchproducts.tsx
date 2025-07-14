"use client";

import Loading from "@/components/mycomponents/loader/loading";
import ProductCard from "@/components/mycomponents/productCard/productCard";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

interface productType {
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

export default function Products({
  cat,
  price,
}: {
  cat: string;
  price: number;
}) {
  const t = useTranslations("fetchproducts");
  const [products, setProducts] = useState<productType[]>();

  useEffect(() => {
    const controller = new AbortController();
    const Fetch = async () => {
      try {
        const F = await fetch("https://fakestoreapi.com/products", {
          signal: controller.signal,
        });
        if (!F.ok) throw "fetch error";
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
    cat !== "all"
      ? e.category === cat && e.price >= 0 && e.price <= price
      : e.price >= 0 && e.price <= price && e.category !== "electronics"
  );

  if (favoriteProducts.length === 0)
    return (
      <h2 className="text-3xl flex justify-center items-center w-full h-full text-red-500 py-12">
        <span>{t("notFound")}</span>
      </h2>
    );

  return (
    <div className="products items-start grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5 gap-5 transition-all duration-300 py-12">
      {favoriteProducts.map((e: productType) => (
        <ProductCard
          key={e.id}
          row={false}
          product={e}
          label="none"
          beforesale={0}
        />
      ))}
    </div>
  );
}
