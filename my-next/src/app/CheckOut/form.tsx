"use client";

import { useUser } from "@/components/mycomponents/usercontext/contextProvider";
import { ChangeEvent, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { RegesterValidation } from "@/functoins/validation";
import Alert from "@/components/mycomponents/formAletrt/formAlert";
import { useRouter } from "next/navigation";

export default function FormCheckOut() {
  const t = useTranslations("checkoutform");
  const router = useRouter();
  const { state, dispatch } = useUser();
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    country: "",
    address: "",
    apartment: "",
    city: "",
    postcode: "",
    phone: "",
    email: "",
    account: false,
    password: "",
    note: false,
    order_notes: "",
    coupon: "",
  });
  useEffect(() => {
    if (state.logedin)
      setForm({
        first_name: `${state.first_name || ""}`,
        last_name: `${state.last_name || ""}`,
        country: `${state.country || ""}`,
        address: `${state.address || ""}`,
        apartment: `${state.apartment || ""}`,
        city: `${state.city || ""}`,
        postcode: ``,
        phone: `${state.phone || ""}`,
        email: `${state.email || ""}`,
        account: state.logedin,
        password: `${state.password || ""}`,
        note: false,
        order_notes: "",
        coupon: "",
      });
  }, [state]);
  const [error, setError] = useState<string | undefined>(undefined);

  function handleChang(e: ChangeEvent<HTMLInputElement>) {
    const { name, value, checked } = e.target as HTMLInputElement;
    if (name === "account" || name === "note") {
      setForm({ ...form, [name]: checked });
    } else setForm({ ...form, [name]: value });
  }
  return (
    <form
      id="my-form"
      className="md:basis-[60%]"
      onSubmit={(e) => {
        e.preventDefault();

        const validation = RegesterValidation(t).safeParse({
          first_name: form.first_name,
          last_name: form.last_name,
          phone: form.phone,
          email: form.email,
          password: form.password,
          password2: form.password,

          country: form.country,
          address: form.address,
          apartment: form.apartment,
          city: form.city,
        });

        if (!validation.success) {
          setError(validation.error.issues[0].message);
        } else {
          setError(undefined);

          dispatch({
            type: "register",
            payload: {
              first_name: form.first_name,
              last_name: form.last_name,
              phone: form.phone,
              email: form.email,
              password: form.password,
              country: form.country,
              address: form.address,
              apartment: form.apartment,
              city: form.city,
            },
          });
          router.push("/");
        }
      }}
    >
      {Object.entries(form).map(([key, val]) => {
        if (key === "account" && state.logedin) return null;
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
                key !== "account" && key !== "note" ? " w-full " : ""
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

      {error && <Alert type="error" message={error} />}
    </form>
  );
}
