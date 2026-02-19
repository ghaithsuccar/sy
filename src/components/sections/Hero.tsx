"use client";

import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Suspense } from "react";

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
        ? "الوكالة الرقمية الحديثة للأعمال في سوريا"
        : "Modern Digital Growth for Businesses in Syria",
    subheadline:
      language === "ar"
        ? "في مسار للتسويق نبني حضورا رقميا حقيقيا للشركات السورية والمستثمرين عبر التسويق الحديث، الأتمتة، وأنظمة جاهزة للذكاء الاصطناعي."
        : "At MASAR Marketing, we help Syrian businesses and foreign investors build real online presence through modern marketing, automation, and AI-ready systems.",
    primaryCta: language === "ar" ? "احجز استشارة" : "Book a Strategy Call",
    secondaryCta: language === "ar" ? "استكشف خدماتنا" : "Explore Services",
  };

  return (
    <section id="hero" className="relative flex min-h-screen flex-col overflow-hidden bg-white px-6 dark:bg-[#070D0C]">
      {/* 1. Three.js Particle Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }} gl={{ antialias: true, alpha: true }}>
          <Suspense fallback={null}>
            <MainParticles />
          </Suspense>
        </Canvas>
      </div>

      {/* 2. Main Content Overlay */}
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-grow flex-col items-center justify-center py-24 text-center md:py-28">
        <div className="space-y-12">

          {/* Typed Header Component */}
          <TypedHeader text={content.headline} language={language} />

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mx-auto max-w-2xl text-xl font-normal leading-relaxed text-[#5F6368] dark:text-[#A9B9B4] sm:text-2xl"
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
              variant="brand"
              className={cn("group h-12 min-w-[220px] justify-center")}
            >
              <a href="#contact">
                <span>{content.primaryCta}</span>
              </a>
            </Button>

            <Button
              asChild
              variant="secondary"
              className={cn("group h-12 min-w-[220px] justify-center gap-2.5")}
            >
              <a href="#services">
                <span className={cn(isRTL && "leading-none")}>{content.secondaryCta}</span>
                <span
                  className={cn(
                    "inline-flex size-8 items-center justify-center rounded-full border border-[#4ED1B2] bg-[#4ED1B2]/20 transition-colors duration-200 group-hover:border-[#E6D8B8] group-hover:bg-[#E6D8B8]/35",
                    isRTL && "order-last"
                  )}
                >
                  <ArrowRight
                    className={cn(
                      "size-4 text-[#0F1F1E] dark:text-[#BFF7E8] group-hover:text-[#0F1F1E]",
                      isRTL && "rotate-180"
                    )}
                  />
                </span>
              </a>
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10 md:bottom-4">
        <FloatingIconsStrip language={language} />
      </div>
    </section>
  );
}
