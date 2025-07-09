import { ReactNode } from "react";

export const metadata = {
  title: "Login - Access Your Account",
  description:
    "Login to manage your profile, orders, and saved items securely.",
};
export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
