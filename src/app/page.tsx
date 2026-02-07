"use client";

import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import ServicesGrid from "@/components/sections/ServicesGrid";
import AboutUs from "@/components/sections/AboutUs";
import { useLanguage } from "@/lib/use-language";
import { cn } from "@/lib/utils";

export default function Home() {
  const { language, toggleLanguage } = useLanguage("en");
  const isRTL = language === "ar";

  return (
    <div
      id="top"
      lang={language}
      dir={isRTL ? "rtl" : "ltr"}
      className={cn(
        "min-h-screen bg-[#0A0A0A] text-[#F5F5F5]",
        language === "ar" ? "font-cairo" : "font-inter"
      )}
    >
      <Navbar language={language} onToggleLanguage={toggleLanguage} />
      <main>
        <Hero language={language} />
        <ServicesGrid language={language} />
        <AboutUs language={language} />
      </main>
    </div>
  );
}
