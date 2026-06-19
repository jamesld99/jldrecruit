import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SchemaScript } from "@/components/SchemaScript";
import {
  getLocalBusinessSchema,
  getOrganizationSchema,
  getProfessionalServiceSchema,
} from "@/lib/schema";
import { createMetadata } from "@/lib/metadata";
import { siteConfig, seoKeywords } from "@/lib/constants";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = createMetadata({
  title: siteConfig.name,
  description: siteConfig.description,
  path: "/",
  keywords: seoKeywords,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <body className={`${inter.variable} font-sans`}>
        <SchemaScript
          data={[
            getOrganizationSchema(),
            getProfessionalServiceSchema(),
            getLocalBusinessSchema(),
          ]}
        />
        <Header />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
