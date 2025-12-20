// "use client";

// import React, { useEffect, useState } from "react";
// import { useTranslations } from "next-intl";
// import ProductCard from "../productCard/productCard";
// import Loading from "@/app/loading";

// interface productType {
//   category: string;
//   description: string;
//   id: number;
//   image: string;
//   price: number;
//   rating: {
//     count: number;
//     rate: number;
//   };
//   title: string;
// }

// export default function TrendClient() {
//   const t = useTranslations();
//   const [data, setData] = useState<productType[]>([]);

//   useEffect(() => {
//     const controller = new AbortController();
//     const fetchData = async () => {
//       try {
//         const res = await fetch("https://fakestoreapi.com/products", {
//           signal: controller.signal,
//         });
//         if (!res.ok) throw "fetch error";
//         const json = await res.json();
//         setData(json);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchData();
//     return () => {
//       controller.abort();
//     };
//   }, []);

//   if (data.length === 0) return <Loading />;

//   if (!data || data.length === 0)
//     return <div className="text-gray-500">No products found</div>;

//   const getProduct = (idx: number) =>
//     idx >= 0 && idx < data.length ? data[idx] : undefined;

//   const hot = t("hotTrend") || "Hot Trend";
//   const best = t("bestSeller") || "Best Seller";

//   const hotParts = hot.split(" ");
//   const bestParts = best.split(" ");

//   return (
//     <div className="trend container m-auto py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-3">
//       <div className="flex flex-col gap-5">
//         <h2 className="text-2xl font-[--font-cookie]">
//           <span className="border-b-2 border-red-500">
//             {hotParts[0] || hot}
//           </span>{" "}
//           {hotParts[1] || ""}
//         </h2>
//         {getProduct(1) && (
//           <ProductCard
//             row
//             product={getProduct(1)}
//             label="none"
//             beforesale={0}
//           />
//         )}
//         {getProduct(5) && (
//           <ProductCard
//             row
//             product={getProduct(5)}
//             label="none"
//             beforesale={0}
//           />
//         )}
//         {getProduct(19) && (
//           <ProductCard
//             row
//             product={getProduct(19)}
//             label="none"
//             beforesale={0}
//           />
//         )}
//       </div>

//       <div className="flex flex-col gap-5">
//         <h2 className="text-2xl font-[--font-cookie]">
//           <span className="border-b-2 border-red-500">
//             {bestParts[0] || best}
//           </span>{" "}
//           {bestParts[1] || ""}
//         </h2>
//         {getProduct(3) && (
//           <ProductCard
//             row
//             product={getProduct(3)}
//             label="none"
//             beforesale={0}
//           />
//         )}
//         {getProduct(19) && (
//           <ProductCard
//             row
//             product={getProduct(19)}
//             label="none"
//             beforesale={0}
//           />
//         )}
//         {getProduct(2) && (
//           <ProductCard
//             row
//             product={getProduct(2)}
//             label="none"
//             beforesale={0}
//           />
//         )}
//       </div>

//       <div className="flex flex-col gap-5">
//         <h2 className="text-2xl font-[--font-cookie]">
//           <span className="border-b-2 border-red-500">
//             {t("featured") || "Featured"}
//           </span>
//         </h2>
//         {getProduct(5) && (
//           <ProductCard
//             row
//             product={getProduct(5)}
//             label="none"
//             beforesale={0}
//           />
//         )}
//         {getProduct(17) && (
//           <ProductCard
//             row
//             product={getProduct(17)}
//             label="none"
//             beforesale={0}
//           />
//         )}
//         {getProduct(6) && (
//           <ProductCard
//             row
//             product={getProduct(6)}
//             label="none"
//             beforesale={0}
//           />
//         )}
//       </div>
//     </div>
//   );
// }
"use server";
import { getTranslations } from "next-intl/server";

import ProductCard from "../productCard/productCard";

// import Loading from "@/app/loading";

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

export default async function Trend() {
  const t = await getTranslations();

  let data: productType[] = [];

  try {
    const res = await fetch("https://fakestoreapi.com/products", {
      cache: "no-store",
    });

    data = await res.json();
  } catch (err) {
    console.log(err);
  }

  // if (!data.length) return <></>;

  return (
    <div className="trend container m-auto py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-3">
      <div className="flex flex-col gap-5">
        <h2 className="text-2xl font-[--font-cookie]">
          <span className="border-b-2 border-red-500">
            {t("hotTrend").split(" ")[0]}
          </span>{" "}
          {t("hotTrend").split(" ")[1]}
        </h2>

        <ProductCard row product={data[1]} label="none" beforesale={0} />
        <ProductCard row product={data[5]} label="none" beforesale={0} />
        <ProductCard row product={data[19]} label="none" beforesale={0} />
      </div>

      <div className="flex flex-col gap-5">
        <h2 className="text-2xl font-[--font-cookie]">
          <span className="border-b-2 border-red-500">
            {t("bestSeller").split(" ")[0]}
          </span>
          {t("bestSeller").split(" ")[1]}
        </h2>

        <ProductCard row product={data[3]} label="none" beforesale={0} />
        <ProductCard row product={data[19]} label="none" beforesale={0} />
        <ProductCard row product={data[2]} label="none" beforesale={0} />
      </div>

      <div className="flex flex-col gap-5">
        <h2 className="text-2xl font-[--font-cookie]">
          <span className="border-b-2 border-red-500">{t("featured")}</span>
        </h2>

        <ProductCard row product={data[5]} label="none" beforesale={0} />
        <ProductCard row product={data[17]} label="none" beforesale={0} />
        <ProductCard row product={data[6]} label="none" beforesale={0} />
      </div>
    </div>
  );
}
