"use client";

import { useUser } from "@/components/mycomponents/usercontext/contextProvider";
import { useEffect, useState } from "react";
import { GoHeart } from "react-icons/go";
import { MdOutlineShoppingBag } from "react-icons/md";
import { useTranslations } from "next-intl";

export default function Actions({ id }: { id: number }) {
  const t = useTranslations();
  const { state, dispatch } = useUser();
  const my = state.products.find((e) => e.productId === id);
  const active = "text-red-500";
  const fav = state.products.some((e) => e.productId === id && e.favorite);
  const cart = state.products.some((e) => e.productId === id && e.cart);

  const [q, setQ] = useState(1);
  const [s, sets] = useState("");
  const [c, setc] = useState("");

  useEffect(() => {
    if (my) {
      setQ(my.quantity);
      setc(my.color ?? "");
      sets(my.size ?? "");
    }
  }, [my]);

  useEffect(() => {
    if (fav || cart) {
      dispatch({
        type: "update",
        payload: {
          id: id,
          size: s,
          color: c,
          quantity: q,
        },
      });
    }
  }, [s, q, c, fav, cart, dispatch, id]);

  function handleSize(e: React.MouseEvent<HTMLSpanElement>) {
    const size = e.currentTarget.getAttribute("data-size") || "";
    sets(size);
  }

  function handleColor(e: React.MouseEvent<HTMLSpanElement>) {
    const color = e.currentTarget.getAttribute("data-color") || "";
    setc(color);
  }

  return (
    <div className="flex flex-col gap-2">
      <span>
        {t("product.quantity")}:
        <span className="border-1 border-gray-100 rounded-full inline-flex justify-between py-2 px-5 ">
          <span
            className="w-12 cursor-pointer text-center select-none"
            onClick={() => setQ((prv) => Math.max(1, prv - 1))}
          >
            -
          </span>
          {q}
          <span
            className="w-12 cursor-pointer text-center select-none"
            onClick={() => setQ((prv) => prv + 1)}
          >
            +
          </span>
        </span>
      </span>

      <span
        onClick={() =>
          dispatch({
            type: "cart",
            payload: { id, size: s, color: c, quantity: q },
          })
        }
        className={`bg-red-500 rounded-full cursor-pointer ${
          cart ? "text-green-500" : "text-white"
        } py-2 px-6 flex items-center text-2xl w-fit`}
      >
        <MdOutlineShoppingBag /> <span>{t("product.addToCart")}</span>
      </span>

      <span>
        <GoHeart
          onClick={() =>
            dispatch({
              type: "favorite",
              payload: { id, size: s, color: c, quantity: q },
            })
          }
          className={`bg-white hover:text-red-500 ${
            fav ? "text-red-500" : ""
          } rounded-full p-1 shadow-lg w-12 h-12 cursor-pointer `}
        />
      </span>

      <span className="flex gap-3 text-2xl">
        {t("product.sizes")}:
        {["XS", "S", "M", "L"].map((size) => (
          <span
            key={size}
            data-size={size}
            onClick={handleSize}
            className={`cursor-pointer ${s === size ? active : ""}`}
          >
            {size}
          </span>
        ))}
      </span>

      <span className="flex gap-3 text-2xl items-center">
        {t("product.colors")}:
        {["red", "black", "blue"].map((color) => (
          <span
            key={color}
            data-color={color}
            onClick={handleColor}
            className={`outline-2 p-2 cursor-pointer ${
              c === color ? "outline-red-500" : "outline-transparent"
            } bg-${color}-600 w-12 h-12 rounded-full transition-all duration-300`}
            style={{ backgroundColor: color }}
          ></span>
        ))}
      </span>
    </div>
  );
}
