"use server";
import { cookies } from "next/headers";

export default async function getLang() {
  const cookieStore = await cookies();
  const v = cookieStore.get("lang");
  return v;
}
