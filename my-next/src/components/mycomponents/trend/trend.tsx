"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import ProductCard from "../productCard/productCard";
import Loading from "@/app/loading";

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

export default function TrendClient() {
  const t = useTranslations();
  const [data, setData] = useState<productType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products", {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("fetch error");
        const json = await res.json();
        setData(json);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unknown error");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    return () => controller.abort();
  }, []);

  if (loading) return <Loading />;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!data || data.length === 0)
    return <div className="text-gray-500">No products found</div>;

  // helper to safely pick product by index
  const getProduct = (idx: number) =>
    idx >= 0 && idx < data.length ? data[idx] : undefined;

  // safe text extraction for t(...) in case translations missing
  const hot = t("hotTrend") || "Hot Trend";
  const best = t("bestSeller") || "Best Seller";

  const hotParts = hot.split(" ");
  const bestParts = best.split(" ");

  return (
    <div className="trend container m-auto py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-3">
      <div className="flex flex-col gap-5">
        <h2 className="text-2xl font-[--font-cookie]">
          <span className="border-b-2 border-red-500">
            {hotParts[0] || hot}
          </span>{" "}
          {hotParts[1] || ""}
        </h2>
        {getProduct(1) && (
          <ProductCard
            row
            product={getProduct(1)}
            label="none"
            beforesale={0}
          />
        )}
        {getProduct(5) && (
          <ProductCard
            row
            product={getProduct(5)}
            label="none"
            beforesale={0}
          />
        )}
        {getProduct(19) && (
          <ProductCard
            row
            product={getProduct(19)}
            label="none"
            beforesale={0}
          />
        )}
      </div>

      <div className="flex flex-col gap-5">
        <h2 className="text-2xl font-[--font-cookie]">
          <span className="border-b-2 border-red-500">
            {bestParts[0] || best}
          </span>{" "}
          {bestParts[1] || ""}
        </h2>
        {getProduct(3) && (
          <ProductCard
            row
            product={getProduct(3)}
            label="none"
            beforesale={0}
          />
        )}
        {getProduct(19) && (
          <ProductCard
            row
            product={getProduct(19)}
            label="none"
            beforesale={0}
          />
        )}
        {getProduct(2) && (
          <ProductCard
            row
            product={getProduct(2)}
            label="none"
            beforesale={0}
          />
        )}
      </div>

      <div className="flex flex-col gap-5">
        <h2 className="text-2xl font-[--font-cookie]">
          <span className="border-b-2 border-red-500">
            {t("featured") || "Featured"}
          </span>
        </h2>
        {getProduct(5) && (
          <ProductCard
            row
            product={getProduct(5)}
            label="none"
            beforesale={0}
          />
        )}
        {getProduct(17) && (
          <ProductCard
            row
            product={getProduct(17)}
            label="none"
            beforesale={0}
          />
        )}
        {getProduct(6) && (
          <ProductCard
            row
            product={getProduct(6)}
            label="none"
            beforesale={0}
          />
        )}
      </div>
    </div>
  );
}
