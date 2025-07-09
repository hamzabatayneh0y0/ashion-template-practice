import { useTranslations } from "next-intl";

export default function Label({
  type,
}: {
  type: "new" | "sale" | "out of stock" | "none";
}) {
  const t = useTranslations();
  const text: string =
    type === "new"
      ? t("new")
      : type === "sale"
      ? t("sale")
      : type === "out of stock"
      ? t("outOfStock")
      : "";

  const classes = {
    new: "bg-green-500",
    sale: "bg-red-500",
    "out of stock": "bg-black",
    none: "",
  };

  return (
    <span
      className={`label absolute top-0 left-0 py-[2%] px-[5%] text-white uppercase ${classes[type]}`}
    >
      {text}
    </span>
  );
}
