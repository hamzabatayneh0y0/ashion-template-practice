import { ReactNode } from "react";

export const metadata = {
  title: "Checkout - Finalize Your Order",
  description:
    "Review your cart, enter shipping details, and complete your purchase.",
  openGraph: {
    title: "المتجر - تصفح منتجاتنا",
    description: "استعرض أفضل المنتجات بأسعار منافسة وجودة عالية.",
    url: "https://ashion-template-practice.vercel.app",
    siteName: "متجري الإلكتروني",
    images: [
      {
        url: "https://ashion-template-practice.vercel.app/logo.png",
        width: 1000,
        height: 630,
        alt: "صورة صفحة المتجر",
      },
    ],
    type: "website",
    locale: "ar_JO",
  },
  twitter: {
    card: "summary_large_image",
    title: "المتجر - تصفح منتجاتنا",
    description: "استعرض أفضل المنتجات بأسعار منافسة وجودة عالية.",
    images: ["https://ashion-template-practice.vercel.app/logo.png"],
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
