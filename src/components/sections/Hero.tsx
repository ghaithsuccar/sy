"use client";

import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
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
    <section id="hero" className="relative flex min-h-[95vh] flex-col overflow-hidden bg-[#FAFAFA] px-6">
      {/* 1. Three.js Particle Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }} gl={{ antialias: true, alpha: true }}>
          <Suspense fallback={null}>
            <MainParticles />
          </Suspense>
        </Canvas>
      </div>

      {/* 2. Main Content Overlay */}
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-grow flex-col items-center justify-center pb-28 text-center">
        <div className="space-y-12">

          {/* Logo / Brand Tag */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <Badge
              variant="brand-outline"
              className={cn(
                "rounded-full px-6 py-2.5 text-[11px] shadow-[0_12px_24px_rgba(11,28,24,0.12)]",
                isRTL ? "arabic-text tracking-normal" : "tracking-[0.24em]"
              )}
            >
              {language === "ar" ? "مسار للتسويق | وكالة رقمية حديثة" : "MASAR Marketing | AI-First Digital Agency"}
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
              variant="brand-fill"
              className={cn("group h-12 min-w-[220px] justify-center")}
            >
              <a href="#contact">
                <span>{content.primaryCta}</span>
              </a>
            </Button>

            <Button
              asChild
              variant="brand-outline"
              className={cn(
                "h-12 min-w-[220px] justify-center",
                isRTL && "[&_svg]:order-first [&_svg]:ml-0 [&_svg]:mr-4"
              )}
            >
              <a href="#services">
                <span>{content.secondaryCta}</span>
                <span className="inline-flex size-8 items-center justify-center rounded-full border border-[#4ED1B2] bg-[#4ED1B2]/20 transition-colors duration-200 group-hover:border-[#E6D8B8] group-hover:bg-[#E6D8B8]/35">
                  <ArrowRight className={cn("size-4 text-[#0F1F1E]", isRTL && "rotate-180")} />
                </span>
              </a>
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-14 left-0 right-0 z-10">
        <FloatingIconsStrip />
      </div>
    </section>
  );
}
