import type { Metadata } from "next";
import { Cairo, Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MASAR Marketing | AI-First Digital Infrastructure Partner",
  description:
    "MASAR Marketing is a modern AI-first agency in Damascus helping Syrian businesses and foreign investors build visibility, automation, and future-ready digital systems.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jakarta.variable} ${inter.variable} ${cairo.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
