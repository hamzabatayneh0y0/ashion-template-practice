"use client";
import Header from "@/components/mycomponents/header/header";
import { usePathname } from "next/navigation";

export default function DisplayHeader() {
  const hiddenRoutes = ["/login", "/regester"];
  const path = usePathname();

  if (hiddenRoutes.includes(path)) return null;

  return <Header />;
}
