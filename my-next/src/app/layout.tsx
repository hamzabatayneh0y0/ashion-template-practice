import type { Metadata } from "next";
import { Geist, Geist_Mono, IBM_Plex_Sans_Arabic } from "next/font/google";
import { Cookie } from "next/font/google";
import "./globals.css";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { getLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import CurrencyProvider from "@/components/mycomponents/currency/currencyProvider";
import DisplayHeader from "@/functoins/displayHeader";
import DisplayFooter from "@/functoins/displayFooter";
import DisplaySamples from "@/functoins/displaySamples";
import { cookies } from "next/headers";
import UserProvider from "@/components/mycomponents/usercontext/contextProvider";
import ZoomProvider from "@/components/mycomponents/zoom/zoomProvider";
import Zoom from "@/components/mycomponents/zoom/zoom";
import Theme from "@/components/mycomponents/theme/theme";

export const font = Cookie({
  variable: "--font-cookie-sans",
  subsets: ["latin"],
  weight: ["400"],
});
const arabicFont = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  variable: "--font-myFont",
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ashion",
  description: "استعرض أفضل المنتجات بأسعار منافسة وجودة عالية.",
  openGraph: {
    title: "المتجر - تصفح منتجاتنا",
    description: "استعرض أفضل المنتجات بأسعار منافسة وجودة عالية.",
    url: "https://ashion-template-practice.vercel.app",
    siteName: "متجري الإلكتروني",
    images: [
      {
        url: "https://ashion-template-practice.vercel.app/logo.png",
        width: 1200,
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const cookieTheme: RequestCookie | undefined = cookieStore.get("theme");
  const cur: RequestCookie | undefined = cookieStore.get("currency");
  const c: string = cur ? cur.value : "us";
  const theme: string = cookieTheme ? cookieTheme.value : "";
  const locale = await getLocale();
  return (
    <html
      lang={locale}
      className={theme + " " + locale}
      data-theme={theme}
      dir={locale == "en" ? "ltr" : "rtl"}
    >
      <head>
        <link rel="icon" href="/logo.png" />
        <link rel="icon" type="image/png" href="/favicon.png" sizes="32x32" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${arabicFont.variable} antialiased dark:bg-gray-900 dark:text-white`}
      >
        <Theme />
        <UserProvider>
          <CurrencyProvider c={c}>
            <NextIntlClientProvider>
              <DisplayHeader />
              <ZoomProvider>
                {children}
                <Zoom />
              </ZoomProvider>
              <DisplaySamples />
              <DisplayFooter />
            </NextIntlClientProvider>
          </CurrencyProvider>
        </UserProvider>
      </body>
    </html>
  );
}
