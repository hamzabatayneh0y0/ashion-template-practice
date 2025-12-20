import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Ashion",
  description: "استعرض أفضل المنتجات بأسعار منافسة وجودة عالية.",
  openGraph: {
    title: "Ashion Store",
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
    title: "Ashion Store",
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
    <html lang={locale} className={theme} dir={locale == "en" ? "ltr" : "rtl"}>
      <head>
        <link rel="icon" href="/logo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body
        className={`${arabicFont.className} font-myfont antialiased dark:bg-gray-900 dark:text-white`}
      >
        <Theme>
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
        </Theme>
      </body>
    </html>
  );
}
