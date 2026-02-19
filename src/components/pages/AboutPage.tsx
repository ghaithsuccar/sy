"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";

import Navbar from "@/components/layout/Navbar";
import AboutPageContent from "@/components/sections/AboutPageContent";
import AboutHero from "@/components/sections/AboutHero";
import type { Language } from "@/lib/use-language";
import { cn } from "@/lib/utils";

type AboutPageProps = {
  language: Language;
};

export default function AboutPage({ language }: AboutPageProps) {
  const router = useRouter();
  const isRTL = language === "ar";

  const handleToggleLanguage = useCallback(() => {
    router.push(language === "ar" ? "/en/about" : "/ar/about");
  }, [language, router]);

  return (
    <div
      id="top"
      lang={language}
      dir={isRTL ? "rtl" : "ltr"}
      className={cn(
        "min-h-screen bg-white text-[#0F1F1E] dark:bg-[#070D0C] dark:text-[#EAF2EE]",
        language === "ar" ? "font-cairo" : "font-brand"
      )}
    >
      <Navbar language={language} onToggleLanguage={handleToggleLanguage} />
      <main>
        <AboutHero language={language} />
        <AboutPageContent language={language} />
      </main>
    </div>
  );
}
