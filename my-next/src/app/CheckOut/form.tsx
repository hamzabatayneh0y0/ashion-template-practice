"use client";

import { useUser } from "@/components/mycomponents/usercontext/contextProvider";
import { ChangeEvent, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { RegesterValidation } from "@/functoins/validation";
import Alert from "@/components/mycomponents/formAletrt/formAlert";

export default function FormCheckOut() {
  const t = useTranslations("checkoutform");
  const tgeneral = useTranslations();
  const { state, dispatch } = useUser();
  const [show, setShow] = useState(false);
  const [alert, setAlert] = useState<string | undefined>(undefined);
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
  }, [state.logedin]);
  const [error, setError] = useState<string | undefined>(undefined);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  function handleChang(e: ChangeEvent<HTMLInputElement>) {
    const { name, value, checked } = e.target as HTMLInputElement;
    if (name === "account" || name === "note") {
      setForm({ ...form, [name]: checked });
    } else setForm({ ...form, [name]: value });
  }
  return (
    <form
      role="form"
      id="my-form"
      className="md:basis-[60%]"
      onSubmit={(e) => {
        e.preventDefault();

        const validation = RegesterValidation(tgeneral).safeParse({
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
          setAlert(t("Done"));
          if (!state.logedin) {
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
          }
        }
      }}
    >
      {Object.entries(form).map(([key, val]) => {
        if (key === "account" && state.logedin) return null;
        return (
          <label key={key} htmlFor={key} className="text-2xl my-5 block">
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
              id={key}
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
      {alert && (
        <div
          onClick={() => {
            setAlert(undefined);
          }}
          className="bg-black/50 fixed top-0 left-0 w-full h-full text-center flex justify-center items-center"
        >
          <div className="basis-[50%]">
            {" "}
            <Alert type="success" message={alert} />
          </div>
        </div>
      )}
    </form>
  );
}
