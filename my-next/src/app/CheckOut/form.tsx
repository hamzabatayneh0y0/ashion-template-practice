"use client";

import { useUser } from "@/components/mycomponents/usercontext/contextProvider";
import { ChangeEvent, useState } from "react";
import { useTranslations } from "next-intl";

export default function FormCheckOut() {
  const t = useTranslations("checkoutform");
  const { state } = useUser();
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    first_name: `${state.name.split(" ")[0] || ""}`,
    last_name: `${state.name.split(" ")[1] || ""}`,
    country: `${state.location.country || ""}`,
    address: ``,
    apartment: ``,
    city: `${state.location.city || ""}`,
    postcode: ``,
    phone: ``,
    email: `${state.email || ""}`,
    account: false,
    password: `${state.password || ""}`,
    note: false,
    order_notes: "",
    coupon: "",
  });

  function handleChang(e: ChangeEvent<HTMLInputElement>) {
    const { name, value, checked } = e.target as HTMLInputElement;
    if (name === "account" || name === "note") {
      setForm({ ...form, [name]: checked });
    } else setForm({ ...form, [name]: value });
  }

  return (
    <form id="my-form" className="md:basis-[60%]">
      {Object.entries(form).map(([key, val]) => {
        return (
          <label key={key} className="text-2xl my-5 block">
            {key !== "account" && key !== "note" ? (
              <p className="mb-2 font-[--font-cookie] capitalize">
                {key === "coupon" ? t("coupon") : t(key)}
                {key === "password" ? (
                  <span
                    onClick={() => setShow(!show)}
                    className="block text-[15px] hover:text-red-500 cursor-pointer"
                  >
                    {t("show_password")}
                  </span>
                ) : null}
              </p>
            ) : null}
            <input
              required={
                key !== "apartment" &&
                key !== "order_notes" &&
                key !== "coupon" &&
                key !== "note"
                  ? true
                  : false
              }
              className={`${
                key !== "account" && key !== "note" ? "w-full " : ""
              } outline-none border-2 border-gray-200 rounded-md p-2`}
              name={key}
              value={typeof val === "boolean" ? "" : val}
              onChange={handleChang}
              checked={typeof val === "boolean" ? val : undefined}
              type={
                key === "password"
                  ? show
                    ? "text"
                    : "password"
                  : key === "account" || key === "note"
                  ? "checkbox"
                  : key === "phone"
                  ? "tel"
                  : "text"
              }
            />
            {key === "account" || key === "note" ? (
              <span className="mx-2 font-[--font-cookie] capitalize cursor-pointer">
                {key === "account" ? t("account") : t("note")}
              </span>
            ) : null}
          </label>
        );
      })}
    </form>
  );
}
