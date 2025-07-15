import Loading from "../loading";
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
export default async function CheckOut() {
  let products: productType[] | null = null;
  try {
    const F = await fetch(`https://fakestoreapi.com/products`, {});
    if (!F.ok) {
      throw "fetch error";
    }
    const data = await F.json();
    products = data;
  } catch (erorr) {
    console.log(erorr);
  }
  if (!products) return <Loading />;

  return (
    <div className="checkout container m-auto md:flex gap-4 py-12 px-4">
      <FormCheckOut />
      <Order products={products} />
    </div>
  );
}
