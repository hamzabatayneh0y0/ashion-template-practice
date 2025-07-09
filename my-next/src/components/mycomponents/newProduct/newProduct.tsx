"use client";
import { useEffect, useState } from "react";
import style from "./newproduct.module.css";
import ProductCard from "../productCard/productCard";
import Loading from "../loader/loading";
import NewCard from "../newCard/newCard";
import { useTranslations } from "next-intl";

export default function NewProduct() {
  const t = useTranslations("newProduct");
  const [cat, setCat] = useState(t("all"));
  const [products, setProducts] = useState();

  function handleActive(e: React.MouseEvent<HTMLSpanElement>) {
    setCat(e.currentTarget.innerHTML);
  }

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

  return (
    <div className="newproducts container m-auto py-12 px-2 transition-all duration-300">
      <div className="title font-[--font-cookie] flex justify-between flex-wrap flex-row sm:items-center gap-5">
        <h3 className="text-3xl font-[500] ">
          <span className="border-b-2 border-red-700">
            {t("title").split(" ")[0]}
          </span>{" "}
          {t("title").split(" ")[1]}
        </h3>

        <div className="categories flex sm:justify-between sm:basis-[50%] max-sm:flex-wrap">
          <span
            onClick={handleActive}
            className={`${
              cat === t("all") ? style.active : ""
            } text-[20px] cursor-pointer p-3 transition-all`}
          >
            {t("all")}
          </span>
          <span
            onClick={handleActive}
            className={`${
              cat == t("women") ? style.active : ""
            } cursor-pointer p-3 text-[20px] transition-all`}
          >
            {t("women")}
          </span>
          <span
            onClick={handleActive}
            className={`${
              cat == t("men") ? style.active : ""
            } cursor-pointer p-3 text-[20px] transition-all`}
          >
            {t("men")}
          </span>
          <span
            onClick={handleActive}
            className={`${
              cat == t("kids") ? style.active : ""
            } cursor-pointer p-3 text-[20px] transition-all`}
          >
            {t("kids")}
          </span>
          <span
            onClick={handleActive}
            className={`${
              cat == t("accessories") ? style.active : ""
            } cursor-pointer p-3 text-[20px] transition-all`}
          >
            {t("accessories")}
          </span>
          <span
            onClick={handleActive}
            className={`${
              cat == t("cosmetics") ? style.active : ""
            } cursor-pointer p-3 text-[20px] transition-all`}
          >
            {t("cosmetics")}
          </span>
        </div>
      </div>

      <div className="products grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5 gap-5 transition-all duration-300">
        <NewCard show={cat === t("all") || cat === t("men")}>
          <ProductCard
            row={false}
            product={products ? products[0] : undefined}
            label="new"
            beforesale={0}
          />
        </NewCard>
        <NewCard show={cat === t("all") || cat === t("accessories")}>
          <ProductCard
            row={false}
            product={products ? products[5] : undefined}
            label="none"
            beforesale={0}
          />
        </NewCard>
        <NewCard show={cat === t("all") || cat === t("men")}>
          <ProductCard
            row={false}
            product={products ? products[2] : undefined}
            label="out of stock"
            beforesale={0}
          />
        </NewCard>
        <NewCard show={cat === t("all") || cat === t("men")}>
          <ProductCard
            row={false}
            product={products ? products[3] : undefined}
            label="none"
            beforesale={0}
          />
        </NewCard>
        <NewCard show={cat === t("all") || cat === t("women")}>
          <ProductCard
            row={false}
            product={products ? products[15] : undefined}
            label="new"
            beforesale={0}
          />
        </NewCard>
        <NewCard show={cat === t("all") || cat === t("women")}>
          <ProductCard
            row={false}
            product={products ? products[19] : undefined}
            label="sale"
            beforesale={49.0}
          />
        </NewCard>
        <NewCard show={cat === t("all") || cat === t("women")}>
          <ProductCard
            row={false}
            product={products ? products[18] : undefined}
            label="out of stock"
            beforesale={0}
          />
        </NewCard>
        <NewCard show={cat === t("all") || cat === t("accessories")}>
          <ProductCard
            row={false}
            product={products ? products[7] : undefined}
            label="sale"
            beforesale={59.0}
          />
        </NewCard>
        <NewCard show={cat === t("all") || cat === t("cosmetics")}>
          <ProductCard
            row={false}
            product={products ? products[7] : undefined}
            label="sale"
            beforesale={59.0}
          />
        </NewCard>

        <NewCard show={cat === t("all") || cat === t("kids")}>
          <ProductCard
            row={false}
            product={products ? products[17] : undefined}
            label="none"
            beforesale={59.0}
          />
        </NewCard>
      </div>
    </div>
  );
}
