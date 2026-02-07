"use client";

import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import { Suspense } from "react";

import type { Language } from "@/lib/use-language";
import { cn } from "@/lib/utils";
import { MainParticles } from "./hero/MainParticles";
import { TypedHeader } from "./hero/TypedHeader";
import { FloatingIconsStrip } from "./hero/FloatingIconsStrip";

type HeroProps = {
  language: Language;
};

export default function Hero({ language }: HeroProps) {
  const isRTL = language === "ar";

  const content = {
    headline:
      language === "ar"
        ? "اختبر أوج النمو الرقمي"
        : "Experience the Peak of Digital Growth",
    subheadline:
      language === "ar"
        ? "أوج. شريكك التقني للذكاء الاصطناعي والأتمتة."
        : "Ouj. Your technical partner for AI and automation.",
    primaryCta: language === "ar" ? "ابدأ الآن" : "Start Project",
    secondaryCta: language === "ar" ? "خدماتنا" : "Our Services",
  };

  return (
    <section className="relative flex min-h-[95vh] flex-col overflow-hidden bg-[#FAFAFA] px-6">
      {/* 1. Three.js Particle Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }} gl={{ antialias: true, alpha: true }}>
          <Suspense fallback={null}>
            <MainParticles />
          </Suspense>
        </Canvas>
      </div>

      {/* 2. Main Content Overlay */}
      <div className="relative z-10 mx-auto flex flex-grow w-full max-w-5xl flex-col items-center justify-center text-center">
        <div className="space-y-12">

          {/* Logo / Brand Tag */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-xs font-semibold uppercase tracking-widest text-[#5F6368] shadow-sm ring-1 ring-[#E2E8F0]">
              {language === "ar" ? "أوج | مستقبل البنية التحتية" : "Ouj | Future Infrastructure"}
            </span>
          </motion.div>

          {/* Typed Header Component */}
          <TypedHeader text={content.headline} language={language} />

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mx-auto max-w-2xl text-xl font-normal leading-relaxed text-[#5F6368] sm:text-2xl"
          >
            {content.subheadline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-4"
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-[#202124] px-8 py-4 text-[15px] font-medium text-white shadow-lg transition-all hover:bg-[#000000] hover:shadow-xl hover:-translate-y-0.5"
            >
              <span>{content.primaryCta}</span>
              <svg
                className={cn("h-4 w-4 transition-transform group-hover:translate-x-1", isRTL && "rotate-180 group-hover:-translate-x-1")}
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>

            <a
              href="#services"
              className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-[15px] font-medium text-[#5F6368] transition-colors hover:bg-black/5 hover:text-[#202124]"
            >
              {content.secondaryCta}
            </a>
          </motion.div>
        </div>
      </div>

      {/* 3. Floating Icons Strip (Bottom) */}
      <div className="relative z-10 w-full pb-12">
        <FloatingIconsStrip />
      </div>
    </section>
  );
}
