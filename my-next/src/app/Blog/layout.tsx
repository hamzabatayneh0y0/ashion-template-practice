import { ReactNode } from "react";

export const metadata = {
  title: "Blogs - News & Updates",
  description:
    "Read our latest articles, tips, and updates from the world of shopping and lifestyle.",
};
export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
