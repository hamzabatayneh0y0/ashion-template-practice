"use client";
import Image from "next/image";
import Rate from "../rate/rate";
import Money from "../currency/money";
import Label from "../label/Label";
import style from "./productCard.module.css";
import { MdOutlineShoppingBag, MdOutlineZoomOutMap } from "react-icons/md";
import { GoHeart } from "react-icons/go";
import { useUser } from "../usercontext/contextProvider";
import Link from "next/link";
import { useZoom } from "../zoom/zoomProvider";
import { useEffect, useState } from "react";
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
export default function ProductCard({
  product,
  row,
  label,
  beforesale,
}: {
  product: productType | undefined;
  row: boolean;
  label: "new" | "sale" | "out of stock" | "none";
  beforesale: number;
}) {
  const { open, setOpen } = useZoom();
  const { state, dispatch } = useUser();
  const [fav, setfav] = useState(false);
  const [cart, setcart] = useState(false);
  useEffect(() => {
    setfav(
      state.products?.some((e) => e.productId === product?.id && e.favorite)
    );

    setcart(state.products?.some((e) => e.productId === product?.id && e.cart));
  }, [state.products, product?.id]);

  function handleZoom() {
    setOpen({
      img: product?.image ? product.image : "",
      display: !open.display,
    });
  }

  function handleFavorite() {
    dispatch({
      type: "favorite",
      payload: {
        id: product?.id,
      },
    });
  }
  function handleCart() {
    dispatch({
      type: "cart",
      payload: {
        id: product?.id,
      },
    });
  }

  if (!product) return null;
  return (
    <>
      <div
        className={`productCard flex  transition-all duration-300 h-full ${
          row
            ? "flex-row items-start"
            : "flex-col gap-5 justify-between items-center"
        } `}
      >
        <div
          className={`${
            style.img
          } border-2 overflow-hidden flex items-center justify-center p-2 ${
            row ? "basis-[50%] h-fit" : "h-[300px] w-full"
          } border-black relative`}
        >
          <Image
            src={product.image}
            alt="product image"
            loading="lazy"
            width={300}
            height={200}
            style={{ height: "200px", width: "auto" }}
          />
          <Label type={label} />
          <div
            className={`${style.icons} absolute left-[50%] top-[85%] translate-[-50%] flex justify-center items-end gap-3 w-full`}
          >
            <MdOutlineZoomOutMap
              title="zoom"
              onClick={handleZoom}
              className={`${style.icon1} bg-white text-black  rounded-full text-4xl p-1  w-[15%] h-[15%] cursor-pointer `}
            />
            <GoHeart
              title="add to favourite"
              onClick={handleFavorite}
              className={`${
                style.icon2
              } bg-white text-black  hover:text-red-500 ${
                fav ? "text-red-500 " : ""
              } rounded-full text-4xl p-1  w-[15%] h-[15%] cursor-pointer `}
            />
            <MdOutlineShoppingBag
              title="add to cart"
              onClick={handleCart}
              className={`${
                style.icon3
              } bg-white text-black  hover:text-red-500 ${
                cart ? "text-red-500 " : ""
              } rounded-full  text-4xl p-1  w-[15%] h-[15%] cursor-pointer`}
            />
          </div>
        </div>

        <Link
          href={`/shop/ProductDetails/?id=${product.id.toString()}&label=${label}&beforesale=${beforesale.toString()}`}
          className={`${row ? "basis-[50%]" : ""} block p-2`}
        >
          <div
            className={`info flex flex-col ${
              row ? "basis-50% " : "justify-center items-center "
            }  gap-5`}
          >
            <h3 className="font-[500]">{product.title}</h3>
            <Rate rate={product.rating.rate} />
            <p className="">
              {label == "sale" ? (
                <span className="line-through text-gray-300">
                  <Money m={beforesale} />
                </span>
              ) : null}{" "}
              <span
                className={`${label == "sale" ? "text-red-500" : ""} font-bold`}
              >
                <Money m={product.price} />
              </span>
            </p>
          </div>
        </Link>
      </div>
    </>
  );
}
