"use client";
import Samples from "@/components/mycomponents/samples/samples";
import { usePathname } from "next/navigation";

export default function DisplaySamples() {
  const hiddenRoutes = ["/login", "/regester"];
  const path = usePathname();

  if (hiddenRoutes.includes(path)) return null;

  return <Samples />;
}
