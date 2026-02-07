"use client";

import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import { Suspense } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
        ? "\u0627\u0641\u0636\u0644 \u0648\u0643\u0627\u0644\u0629 \u062a\u0633\u0648\u064a\u0642 \u0641\u064a \u0633\u0648\u0631\u064a\u0627"
        : "Syria's Leading Marketing Agency",
    subheadline:
      language === "ar"
        ? "\u0646\u062d\u0648\u0644 \u0627\u0644\u0639\u0644\u0627\u0645\u0627\u062a \u0627\u0644\u062a\u062c\u0627\u0631\u064a\u0629 \u0627\u0644\u0633\u0648\u0631\u064a\u0629 \u0627\u0644\u0649 \u0642\u0635\u0635 \u0646\u062c\u0627\u062d \u0639\u0628\u0631 \u0627\u0644\u0627\u0633\u062a\u0631\u0627\u062a\u064a\u062c\u064a\u0629\u060c \u0627\u0644\u0645\u062d\u062a\u0648\u0649 \u0627\u0644\u0627\u0628\u062f\u0627\u0639\u064a\u060c \u0648\u0627\u0639\u0644\u0627\u0646\u0627\u062a \u0627\u0644\u0627\u062f\u0627\u0621."
        : "We turn Syrian brands into growth stories with strategy, creative content, and performance ads.",
    primaryCta: language === "ar" ? "\u0627\u062d\u062c\u0632 \u0627\u0633\u062a\u0634\u0627\u0631\u0629 \u0645\u062c\u0627\u0646\u064a\u0629" : "Book a Free Call",
    secondaryCta: language === "ar" ? "\u0634\u0627\u0647\u062f \u0627\u0639\u0645\u0627\u0644\u0646\u0627" : "See Our Work",
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
            <Badge
              variant="secondary"
              className={cn(
                "rounded-full bg-white px-5 py-2 text-xs font-semibold text-[#5F6368] shadow-sm ring-1 ring-[#E2E8F0]",
                isRTL ? "arabic-text" : "uppercase tracking-widest"
              )}
            >
              {language === "ar" ? "\u0627\u0648\u062c | \u0648\u0643\u0627\u0644\u0629 \u062a\u0633\u0648\u064a\u0642 \u0633\u0648\u0631\u064a\u0629" : "Ouj | Syrian Marketing Agency"}
            </Badge>
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
            <Button
              asChild
              className="group h-auto rounded-full bg-[#202124] px-8 py-4 text-[15px] font-medium text-white shadow-lg transition-all hover:bg-[#000000] hover:shadow-xl hover:-translate-y-0.5"
            >
              <a href="#contact">
                <span>{content.primaryCta}</span>
                <svg
                  className={cn("h-4 w-4 transition-transform group-hover:translate-x-1", isRTL && "rotate-180 group-hover:-translate-x-1")}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </Button>

            <Button
              asChild
              variant="ghost"
              className="h-auto rounded-full px-8 py-4 text-[15px] font-medium text-[#5F6368] transition-colors hover:bg-black/5 hover:text-[#202124]"
            >
              <a href="#services">{content.secondaryCta}</a>
            </Button>
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
