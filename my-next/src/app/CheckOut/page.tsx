"use client";

import { useEffect, useState } from "react";

import Title from "@/components/mycomponents/title/title";
import FormCheckOut from "./form";
import Order from "./orders";

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

export default function CheckOut() {
  const [products, setProducts] = useState<productType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products", {
          signal: controller.signal,
        });

        if (!res.ok) throw new Error("fetch error");

        const data = await res.json();
        setProducts(data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error(err);
          setError(true);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Failed to load checkout data</div>;

  return (
    <div className="checkout container m-auto py-12 px-4">
      <Title />

      <div className="md:flex gap-4">
        <FormCheckOut />
        <Order products={products} />
      </div>
    </div>
  );
}
