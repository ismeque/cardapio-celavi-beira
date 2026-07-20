import type { Metadata, Viewport } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "@/context/LocaleContext";
import { CartProvider } from "@/context/CartContext";
import { ToastProvider } from "@/context/ToastContext";
import { RESTAURANT } from "@/data/menu";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${RESTAURANT.name} — Cardápio Digital`,
  description: `Explore o magnífico cardápio do ${RESTAURANT.name}. Bebidas premium, gastronomia e experiências únicas.`,
  applicationName: `${RESTAURANT.name} — Cardápio`,
  keywords: ["cardápio", "menu", "restaurante", "bar", "lounge", RESTAURANT.name],
  authors: [{ name: RESTAURANT.name }],
  icons: {
    icon: "/icon-celavi.png",
    apple: "/icon-celavi.png",
  },
  openGraph: {
    title: `${RESTAURANT.name} — Cardápio Digital`,
    description: "Nosso magnífico cardápio. Descubra bebidas premium e alta gastronomia.",
    type: "website",
    locale: "pt_MZ",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0c",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt"
      className={`${inter.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LocaleProvider>
          <ToastProvider>
            <CartProvider>{children}</CartProvider>
          </ToastProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
