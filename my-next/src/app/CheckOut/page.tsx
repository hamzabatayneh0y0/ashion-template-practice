import Title from "@/components/mycomponents/title/title";
// import Loading from "../loading";
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
  let products: productType[];
  try {
    const F = await fetch(`https://fakestoreapi.com/products`, {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        Accept: "application/json",
      },
      next: { revalidate: 3600 },
    });
    if (!F.ok) {
      throw new Error(`Fetch error: ${F.status}`)
    }
    const data = await F.json();
    products = data;
  } catch (erorr) {
    console.log(erorr);
    throw erorr;
  }

  //if (!products) return <Loading />;

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
