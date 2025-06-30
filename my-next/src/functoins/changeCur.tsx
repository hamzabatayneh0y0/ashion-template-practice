"use server";
import { cookies } from "next/headers";

export default async function changeCur(cur: string) {
  const cookieStore = await cookies();
  cookieStore.set("currency", `${cur}`);
}
