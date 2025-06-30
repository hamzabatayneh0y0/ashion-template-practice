"use client";
import { useCur } from "./currencyProvider";

export default function Money({ m }: { m: number }) {
  const { cur } = useCur();
  const x = cur === "us" ? `${m}us` : `${(m / 1.41).toFixed(2)}jd`;
  return <span>{x}</span>;
}
