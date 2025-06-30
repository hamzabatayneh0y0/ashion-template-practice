"use server";
import { cookies } from "next/headers";

export default async function deleteTheme() {
  const cookieStore = await cookies();
  cookieStore.delete("theme");
}
