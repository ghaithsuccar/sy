"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import type { Language } from "@/lib/use-language";
import { cn } from "@/lib/utils";

export default function AboutUs({ language }: { language: Language }) {
  const isRTL = language === "ar";
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start 88%"],
  });
  const headingY = useTransform(scrollYProgress, [0, 1], [220, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.15, 1], [0, 0.7, 1]);
  const headingScale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);

  return (
    <section
      id="about"
      ref={sectionRef}
      dir={isRTL ? "rtl" : "ltr"}
      className="relative z-20 -mt-[55vh] flex h-screen items-center justify-center bg-[#0A0A0A] px-6 text-white"
    >
      <motion.div
        style={{ y: headingY, opacity: headingOpacity, scale: headingScale }}
        className={cn("mx-auto w-full max-w-6xl text-center", isRTL && "text-right")}
      >
        <h2
          className={cn(
            "text-6xl font-black italic tracking-tight sm:text-7xl lg:text-8xl",
            isRTL ? "arabic-text" : "font-[var(--font-jakarta)]"
          )}
        >
          {isRTL ? "عن مسار للتسويق" : "ABOUT MASAR"}
        </h2>
      </motion.div>
    </section>
  );
}
