"use server";
import { cookies } from "next/headers";

export default async function getTheme() {
  const cookieStore = await cookies();
  const v = cookieStore.get("theme");
  return v;
}
