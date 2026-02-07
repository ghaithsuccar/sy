"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";

import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import ServicesGrid from "@/components/sections/ServicesGrid";
import AboutUs from "@/components/sections/AboutUs";
import { cn } from "@/lib/utils";
import type { Language } from "@/lib/use-language";

type HomePageProps = {
  language: Language;
};

export default function HomePage({ language }: HomePageProps) {
  const router = useRouter();
  const isRTL = language === "ar";

  const handleToggleLanguage = useCallback(() => {
    router.push(language === "ar" ? "/en" : "/ar");
  }, [language, router]);

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
      <Navbar language={language} onToggleLanguage={handleToggleLanguage} />
      <main>
        <Hero language={language} />
        <ServicesGrid language={language} />
        <AboutUs language={language} />
      </main>
    </div>
  );
}
