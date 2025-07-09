import Loading from "@/components/mycomponents/loader/loading";
import ProductCard from "@/components/mycomponents/productCard/productCard";
import Carousel from "./carousel";
import Rate from "@/components/mycomponents/rate/rate";
import Money from "@/components/mycomponents/currency/money";
import Actions from "./actions";
import { getTranslations } from "next-intl/server";

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

export default async function ProductDetails({
  searchParams,
}: {
  searchParams: { id: number; label: string; beforesale: string };
}) {
  const t = await getTranslations();

  let product: productType | null = null;
  let sugestions: productType[] | null = null;
  const beforesale = searchParams.beforesale;
  const label = searchParams.label;

  try {
    const F = await fetch(
      `https://fakestoreapi.com/products/${searchParams.id}`
    );
    if (!F.ok) throw "fetch error";
    const data = await F.json();
    product = data;

    const F2 = await fetch(
      `https://fakestoreapi.com/products/category/${product?.category}`
    );
    if (!F2.ok) throw "fetch error";
    const data2 = await F2.json();
    sugestions = data2;
  } catch (erorr) {
    console.log(erorr);
  }

  if (!product) return <Loading />;

  return (
    <div className="productdetails ">
      <div className="container m-auto flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between py-12 transition-all duration-300">
        <div className="carousel lg:basis-[50%] p-5">
          <Carousel img={product.image} />
        </div>

        <div className="info p-5 flex flex-col gap-5 lg:mx-12 transition-all duration-300 lg:basis-[50%]">
          <h2 className="font-[500] text-3xl">{product.title}</h2>
          <Rate rate={product.rating.rate} />

          <p>
            {label == "sale" && (
              <span className="line-through text-gray-300 text-2xl">
                <Money m={parseFloat(beforesale)} />
              </span>
            )}{" "}
            <span
              className={`${
                label == "sale" ? "text-red-500" : ""
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
          {t("relatedProducts")}
        </h2>
        <div className="sugestions grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5 gap-5 transition-all duration-300">
          {sugestions &&
            sugestions
              .filter((e) => e.id !== product.id)
              .map((e: productType) => (
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
