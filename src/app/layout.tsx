import type { Metadata } from "next";
import { Oswald, Roboto, Roboto_Condensed } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { FloatingActions } from "@/components/FloatingActions";
import { ElfsightScript } from "@/components/elfsight/ElfsightScript";
import { EmailListPopup } from "@/components/EmailListPopup";
import { ClickToCall } from "@/components/ClickToCall";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-roboto-condensed",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Skyline Gardens – Your local family garden center",
  description:
    "Skyline Gardens – your local family garden centre in Keswick Ridge, NB. Bedding plants, perennials, vegetables, succulents, hanging baskets, and more.",
  openGraph: {
    title: "Skyline Gardens",
    description: "Your local family garden centre in Keswick Ridge, NB",
    url: "https://www.skylinegardens.ca",
    siteName: "Skyline Gardens",
    locale: "en_CA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${oswald.variable} ${roboto.variable} ${robotoCondensed.variable}`}
    >
      <body className="bg-white antialiased">
        <ElfsightScript />
        <EmailListPopup />
        <ClickToCall />
        <Header />
        <FloatingActions />
        <main>{children}</main>
      </body>
    </html>
  );
}
