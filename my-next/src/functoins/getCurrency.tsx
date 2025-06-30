"use server";
import { cookies } from "next/headers";

export default async function getCurrency() {
  const cookieStore = await cookies();
  const v = cookieStore.get("currency");
  return v;
}
