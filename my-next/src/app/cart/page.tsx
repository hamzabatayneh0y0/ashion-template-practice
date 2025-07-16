"use client";

import { useUser } from "@/components/mycomponents/usercontext/contextProvider";
import { useEffect, useState } from "react";
import Loading from "../loading";
import { ProductType } from "@/components/mycomponents/usercontext/Type";
import Image from "next/image";
import Rate from "@/components/mycomponents/rate/rate";
import Link from "next/link";
import Money from "@/components/mycomponents/currency/money";
import { FaTrash } from "react-icons/fa";
import Quantity from "./quantity";
import { useTranslations } from "next-intl";
import Title from "@/components/mycomponents/title/title";

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

export default function Cart() {
  const t = useTranslations("cart");
  const { state, dispatch } = useUser();
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

  function handleTrash(Id: number) {
    dispatch({ type: "cart", payload: { id: Id } });
  }

  if (!products) return <Loading />;

  const cartProducts = products.filter((e) =>
    state.products.some((p: ProductType) => p.productId === e.id && p.cart)
  );

  if (cartProducts.length === 0)
    return (
      <h2 className="text-3xl flex justify-center items-center w-full h-full text-red-500 py-12 ">
        <span>{t("nothingFound")}</span>
      </h2>
    );

  return (
    <div className="cart container m-auto transition-all duration-300 py-12 overflow-x-scroll px-3">
      <Title />
      <table className="table-auto p-3 w-full">
        <tbody>
          <tr className="text-2xl border-b-2 border-gray-100">
            <th className="text-start p-1 md:p-3">{t("product")}</th>
            <th className="text-start p-1 md:p-5">{t("price")}</th>
            <th className="text-center p-1 md:p-3">{t("quantity")}</th>
            <th className="text-start p-1 md:p-3">{t("total")}</th>
            <th className="w-3 h-3"></th>
          </tr>
          {cartProducts.map((e: productType1) => {
            const quantity = state.products.find(
              (pr) => pr.productId === e.id
            )?.quantity;
            return (
              <tr key={e.id} className="border-b-2 border-gray-100">
                <td className="flex p-3 max-md:flex-col">
                  <Image
                    src={e.image}
                    alt="product image"
                    priority
                    width={200}
                    height={200}
                    style={{ width: "40%" }}
                  />
                  <Link
                    href={`/shop/ProductDetails/?id=${e.id}`}
                    className="mx-2 basis-[50%] block"
                  >
                    <div className="info flex flex-col gap-5">
                      <h3 className="font-bold">{e.title}</h3>
                      <Rate rate={e.rating.rate} />
                    </div>
                  </Link>
                </td>
                <td className="md:p-5 font-bold md:text-2xl">
                  <Money m={e.price} />
                </td>
                <Quantity
                  price={e.price}
                  quantity={quantity ? quantity : 1}
                  id={e.id}
                />
                <td className="p-3">
                  <FaTrash
                    className="hover:text-red-500 cursor-pointer"
                    onClick={() => {
                      handleTrash(e.id);
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
