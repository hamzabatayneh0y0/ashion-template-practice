import { ReactNode } from "react";

export const metadata = {
  title: "Cart - Review Your Items",
  description:
    "See what’s in your cart, edit quantities, and proceed to checkout.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
