"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import InteractiveVideoSection from "@/components/sections/InteractiveVideoSection";
import ServicesGrid from "@/components/sections/ServicesGrid";
import ProcessSection from "@/components/sections/ProcessSection";
import AboutUs from "@/components/sections/AboutUs";
import CasesSection from "@/components/sections/CasesSection";
import FaqSection from "@/components/sections/FaqSection";
import ProofsSection from "@/components/sections/ProofsSection";
import { cn } from "@/lib/utils";
import type { Language } from "@/lib/use-language";

type HomePageProps = {
  language: Language;
};

function HeroServicesDivider() {
  return (
    <div
      aria-hidden="true"
      className="relative h-28 overflow-hidden bg-white dark:bg-[#070D0C]"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#0F1F1E]/28 to-transparent dark:via-white/22" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#0F1F1E]/18 to-transparent dark:via-white/16" />
      <div className="absolute left-1/2 top-1/2 h-24 w-[min(90%,840px)] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,rgba(78,209,178,0.24),transparent_70%)] dark:bg-[radial-gradient(circle,rgba(78,209,178,0.18),transparent_72%)]" />
      <div className="absolute inset-x-0 top-1/2 h-10 -translate-y-1/2 bg-[linear-gradient(90deg,rgba(230,216,184,0),rgba(230,216,184,0.6),rgba(78,209,178,0.5),rgba(230,216,184,0.6),rgba(230,216,184,0))] dark:bg-[linear-gradient(90deg,rgba(12,20,18,0),rgba(30,49,44,0.88),rgba(37,88,76,0.72),rgba(30,49,44,0.88),rgba(12,20,18,0))]" />
      <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-[#0F1F1E]/28 to-transparent dark:via-white/24" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#0F1F1E]/18 bg-white shadow-[0_10px_20px_rgba(12,20,18,0.14)] dark:border-white/20 dark:bg-[#0F1716] dark:shadow-[0_10px_22px_rgba(0,0,0,0.32)]">
          <span className="h-4 w-4 rotate-45 rounded-[3px] border border-[#0F1F1E]/12 bg-[#4ED1B2]/80 dark:border-white/16 dark:bg-[#4ED1B2]/72" />
        </div>
      </div>
    </div>
  );
}

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
        <HeroServicesDivider />
        <ServicesGrid language={language} />
        <ProcessSection language={language} />
        <AboutUs language={language} />
        <CasesSection language={language} />
        <FaqSection language={language} />
        <InteractiveVideoSection language={language} />
        <ProofsSection language={language} />
      </main>
      <div id="contact">
        <Footer language={language} onToggleLanguage={handleToggleLanguage} />
      </div>
    </div>
  );
}
