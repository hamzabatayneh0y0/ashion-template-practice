"use server";

import { cookies } from "next/headers";

export async function ClearAllCookies() {
  const all = (await cookies()).getAll();
  all.forEach(async (Cookie) => {
    await (await cookies()).delete(Cookie.name);
  });
  return null;
}
