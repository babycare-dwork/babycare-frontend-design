import type { Metadata } from "next";
import { Montserrat, Nunito, Nunito_Sans } from "next/font/google";
import "./globals.css";
import React from "react";
import RootProviders from "@/Provider/Providers";

// Display — rounded terminals echo the mark; every heading.
const nunito = Nunito({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-nunito",
  display: "swap",
});

// Text — paragraphs and UI.
const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-nunito-sans",
  display: "swap",
});

// Brand — the wordmark's face; eyebrows and stat numerals only.
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BabyCare MarketPlace",
  description:
    "Your trusted marketplace for baby products and parenting essentials.",
  keywords: "baby, babycare, marketplace, parenting, products, wellness",
  authors: [{ name: "BabyCare Team" }],
  creator: "BabyCare Team",
  openGraph: {
    title: "BabyCare MarketPlace",
    description:
      "Your trusted marketplace for baby products and parenting essentials.",
    url: "https://babycare-frontend-design.vercel.app",
    siteName: "BabyCare",
    images: [
      {
        url: "https://babycare-frontend-design.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "BabyCare MarketPlace",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BabyCare MarketPlace",
    description:
      "Your trusted marketplace for baby products and parenting essentials.",
    images: ["https://babycare-frontend-design.vercel.app/og-image.png"],
    creator: "@babycare",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunito.variable} ${nunitoSans.variable} ${montserrat.variable} antialiased`}
      >
        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  );
}
