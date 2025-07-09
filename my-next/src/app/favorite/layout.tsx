import { ReactNode } from "react";

export const metadata = {
  title: "Favorites - Your Saved Items",
  description: "Review and manage your favorite products all in one place.",
};
export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
