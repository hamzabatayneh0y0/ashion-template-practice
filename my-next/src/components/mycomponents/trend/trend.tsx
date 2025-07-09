import { getTranslations } from "next-intl/server";
import ProductCard from "../productCard/productCard";

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

  if (!data.length) return null;

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
        <ProductCard row product={data[10]} label="none" beforesale={0} />
      </div>

      <div className="flex flex-col gap-5">
        <h2 className="text-2xl font-[--font-cookie]">
          <span className="border-b-2 border-red-500">
            {t("bestSeller").split(" ")[0]}
          </span>{" "}
          {t("bestSeller").split(" ")[1]}
        </h2>
        <ProductCard row product={data[3]} label="none" beforesale={0} />
        <ProductCard row product={data[19]} label="none" beforesale={0} />
        <ProductCard row product={data[11]} label="none" beforesale={0} />
      </div>

      <div className="flex flex-col gap-5">
        <h2 className="text-2xl font-[--font-cookie]">
          <span className="border-b-2 border-red-500">{t("featured")}</span>
        </h2>
        <ProductCard row product={data[12]} label="none" beforesale={0} />
        <ProductCard row product={data[17]} label="none" beforesale={0} />
        <ProductCard row product={data[6]} label="none" beforesale={0} />
      </div>
    </div>
  );
}
