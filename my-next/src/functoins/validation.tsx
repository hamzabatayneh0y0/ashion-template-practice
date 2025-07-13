import * as z from "zod";
type TFunction = (key: string) => string;

export const LogIn = (t: TFunction) =>
  z.object({
    email: z.string().email({ message: t("invalid_email") }),
    password: z.string().min(6, { message: t("password_too_short") }),
  });

export const RegesterValidation = (t: TFunction) =>
  z
    .object({
      first_name: z.string().min(1, { message: t("first_name_required") }),
      last_name: z.string().min(1, { message: t("last_name_required") }),
      email: z.string().email({ message: t("invalid_email") }),
      password: z.string().min(6, { message: t("password_too_short") }),
      password2: z.string(),
      country: z.string().min(1, { message: t("country_required") }),
      address: z.string().min(1, { message: t("address_required") }),
      apartment: z.string().optional(),
      city: z.string().min(1, { message: t("city_required") }),
      phone: z.string().regex(/^(07\d{8}|\+9627\d{8}|009627\d{8})$/, {
        message: t("invalid_phone"),
      }),
    })
    .refine((data) => data.password === data.password2, {
      message: t("password_mismatch"),
    });
