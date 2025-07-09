"use client";

import Money from "@/components/mycomponents/currency/money";
import { useUser } from "@/components/mycomponents/usercontext/contextProvider";
import { useState } from "react";
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

export default function Order({ products }: { products: productType[] }) {
  const t = useTranslations("order");
  const { state } = useUser();
  const [pay, setpay] = useState("");
  const cartProducts = products.filter((e) =>
    state.products.some((p) => p.productId === e.id && p.cart)
  );
  let tSum: number = 0;

  return (
    <ul className="bg-gray-200 container m-auto flex flex-col gap-3 p-5 my-5 rounded-md h-fit md:basis-[40%]">
      <li className="text-2xl font-bold pb-2 border-b-2 border-gray-400">
        {t("your_order")}
      </li>
      <li className="flex justify-between items-center text-2xl font-bold pb-2 border-b-2 border-gray-400">
        <span>{t("product")}</span> <span>{t("total")}</span>
      </li>
      <ol className="list-decimal" style={{ listStyle: "initial" }}>
        {cartProducts.map((e, i) => {
          const quantity =
            state.products.find((p) => p.productId === e.id)?.quantity || 0;
          tSum += quantity * e.price;
          return (
            <li key={e.id} className="flex justify-between items-center ">
              <span>
                {i + 1} {e.title} ({quantity})
              </span>
              <Money m={quantity * e.price} />
            </li>
          );
        })}
      </ol>
      <li className="flex justify-between items-center text-2xl pb-2 font-bold border-b-2 border-gray-400">
        <span>{t("total")}</span> <Money m={tSum} />
      </li>
      {state.logedin && (
        <li>
          <label htmlFor="" className="flex gap-2 cursor-pointer">
            <input type="checkbox" /> {t("create_account")}
          </label>
        </li>
      )}
      <li className="cursor-pointer">
        <label className="flex gap-2 cursor-pointer">
          <input
            type="radio"
            name="payment"
            value={"Cheque"}
            checked={pay === "Cheque"}
            onChange={(e) => {
              setpay(e.target.value);
            }}
          />{" "}
          {t("cheque_payment")}
        </label>
      </li>
      <li>
        <label className="flex gap-2 cursor-pointer">
          <input
            type="radio"
            name="payment"
            value={"PayPal"}
            checked={pay === "PayPal"}
            onChange={(e) => {
              setpay(e.target.value);
            }}
          />{" "}
          {t("paypal")}
        </label>
      </li>
      <button
        type="submit"
        form="my-form"
        className="bg-red-500 rounded-full cursor-pointer text-white py-2 px-6 flex items-center text-2xl w-fit m-auto"
      >
        {t("place_order")}
      </button>
    </ul>
  );
}
