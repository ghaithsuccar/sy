import type { Metadata } from "next";
import { Cairo, Plus_Jakarta_Sans, Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
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
  icons: {
    icon: "/masar-logo.png",
    shortcut: "/masar-logo.png",
    apple: "/masar-logo.png",
  },
  openGraph: {
    images: [
      {
        url: "/masar-logo.png",
        width: 1080,
        height: 1080,
        alt: "MASAR Marketing logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/masar-logo.png"],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${jakarta.variable} ${inter.variable} ${cairo.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
