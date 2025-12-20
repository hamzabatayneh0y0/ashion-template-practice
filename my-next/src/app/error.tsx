"use client";

import Link from "next/link";

export default function Error() {
  return (
    <div className="error my-4">
      <p className="text-3xl font-sans">ERROR...</p>

      <br />

      <Link className="text-black text-2xl" href="/">
        Go To Home
      </Link>
    </div>
  );
}
