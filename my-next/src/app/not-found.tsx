import { useTranslations } from "next-intl";
import "./found.css";
export default function NotFound() {
  const t = useTranslations();
  return (
    <div className="notFound h-[100vh]">
      <h2 className="text-3xl flex justify-center items-center w-full h-full text-red-500 py-12">
        <span className="">{t("not_found")}</span>
      </h2>
    </div>
  );
}
