import { ReactNode } from "react";

export const metadata = {
  title: "My Account - Manage Profile",
  description:
    "Update your personal information, track orders, and manage settings.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
