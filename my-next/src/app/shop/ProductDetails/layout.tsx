import { ReactNode } from "react";

export const metadata = {
  title: "Product Details - View Item Info",
  description:
    "Get in-depth information, reviews, and specifications about this product.",
};
export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
