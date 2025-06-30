"use server";
import { cookies } from "next/headers";

export default async function changeTheme(theme: string) {
  const cookieStore = await cookies();
  cookieStore.set("theme", `${theme}`);
}
