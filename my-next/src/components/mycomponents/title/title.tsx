"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Title() {
  const path = usePathname();
  const t = useTranslations("paths");
  return (
    <div className="py-12 md:text-2xl font-bold uppercase">
      <Link href={"/"}>{t("Home")}</Link> &gt;{" "}
      <Link href={`${path}`} className="text-gray-400">
        {t(`${path.split("/")[path.split("/").length - 1]}`)}
      </Link>
    </div>
  );
}
