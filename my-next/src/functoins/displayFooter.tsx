"use client";
import Footer from "@/components/mycomponents/footer/footer";
import { usePathname } from "next/navigation";

export default function DisplayFooter() {
  const hiddenRoutes = ["/login", "/regester", "/not-found"];
  const path = usePathname();

  if (hiddenRoutes.includes(path)) return null;

  return <Footer />;
}
