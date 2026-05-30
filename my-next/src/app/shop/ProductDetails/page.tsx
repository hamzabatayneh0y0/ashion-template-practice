"use client";

import { useEffect, useState } from "react";
import Loading from "@/components/mycomponents/loader/loading";
import ProductCard from "@/components/mycomponents/productCard/productCard";
import Carousel from "./carousel";
import Rate from "@/components/mycomponents/rate/rate";
import Money from "@/components/mycomponents/currency/money";
import Actions from "./actions";
import Title from "@/components/mycomponents/title/title";
import { useSearchParams } from "next/navigation";

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

export default function ProductDetails() {
  const [product, setProduct] = useState<productType | null>(null);
  const [suggestions, setSuggestions] = useState<productType[] | null>(null);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();

  const id = searchParams.get("id") || "1";
  const label = searchParams.get("label") || "none";
  const beforesale = searchParams.get("beforesale") || "0";

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const res = await fetch(`https://fakestoreapi.com/products/${id || 1}`);

        if (!res.ok) throw new Error("fetch error");

        const data: productType = await res.json();
        setProduct(data);

        const res2 = await fetch(
          `https://fakestoreapi.com/products/category/${data.category}`,
        );

        if (!res2.ok) throw new Error("fetch error");

        const data2: productType[] = await res2.json();
        setSuggestions(data2);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  if (loading || !product) return <Loading />;

  const productId = product.id;

  return (
    <div className="productdetails px-4">
      <Title />

      <div className="container m-auto flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between py-12">
        <div className="carousel lg:basis-[50%] p-5">
          <Carousel img={product.image} />
        </div>

        <div className="info p-5 flex flex-col gap-5 lg:mx-12 lg:basis-[50%]">
          <h2 className="font-[500] text-3xl">{product.title}</h2>

          <Rate rate={product.rating.rate} />

          <p>
            {label === "sale" && (
              <span className="line-through text-gray-300 text-2xl">
                <Money m={parseFloat(beforesale)} />
              </span>
            )}{" "}
            <span
              className={`${
                label === "sale" ? "text-red-500" : ""
              } font-bold text-3xl`}
            >
              <Money m={product.price} />
            </span>
          </p>

          <p>{product.description}</p>

          <Actions id={product.id} />
        </div>
      </div>

      <div className="relatedproducts py-12 container m-auto flex flex-col justify-center items-center">
        <h2 className="text-2xl ar:text-5xl text-center uppercase font-[500] font-[--font-cookie]">
          Related Products
        </h2>

        <div className="sugestions grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5 gap-5">
          {suggestions &&
            suggestions
              .filter((e) => e.id !== productId)
              .map((e) => (
                <ProductCard
                  key={e.id}
                  row={false}
                  product={e}
                  label="none"
                  beforesale={0}
                />
              ))}
        </div>
      </div>
    </div>
  );
}
