"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import InteractiveVideoSection from "@/components/sections/InteractiveVideoSection";
import ServicesGrid from "@/components/sections/ServicesGrid";
import AboutUs from "@/components/sections/AboutUs";
import CasesSection from "@/components/sections/CasesSection";
import FaqSection from "@/components/sections/FaqSection";
import ProofsSection from "@/components/sections/ProofsSection";
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
        "min-h-screen bg-white text-[#0F1F1E] dark:bg-[#070D0C] dark:text-[#EAF2EE]",
        language === "ar" ? "font-cairo" : "font-inter"
      )}
    >
      <Navbar language={language} onToggleLanguage={handleToggleLanguage} />
      <main>
        <Hero language={language} />
        <ServicesGrid language={language} />
        <AboutUs language={language} />
        <InteractiveVideoSection language={language} />
        <CasesSection language={language} />
        <FaqSection language={language} />
        <ProofsSection language={language} />
      </main>
      <div id="contact">
        <Footer language={language} onToggleLanguage={handleToggleLanguage} />
      </div>
    </div>
  );
}
