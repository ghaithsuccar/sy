"use client";

import { motion } from "framer-motion";
import type { Language } from "@/lib/use-language";
import { cn } from "@/lib/utils";

type TypedHeaderProps = {
    text: string;
    language: Language;
};

export function TypedHeader({ text, language }: TypedHeaderProps) {
  const isRTL = language === "ar";

  // Split text into words; avoid per-letter splits for Arabic to preserve shaping
  const words = text.split(" ");

  // Container variants for staggering
  const containerAndCursor = {
    hidden: { opacity: 0 },
    visible: () => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.2 },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      } as const,
    },
    hidden: {
      opacity: 0,
      y: 5,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      } as const,
    },
  };

  return (
    <motion.h1
      key={text} // Force re-render when text/language changes
      className={cn(
        "relative flex flex-wrap justify-center gap-[0.25em] text-5xl font-medium text-[#202124] sm:text-6xl md:text-7xl lg:text-8xl",
        isRTL ? "arabic-text tracking-normal" : "landing-main-header tracking-tighter"
      )}
      variants={containerAndCursor}
      initial="hidden"
      animate="visible"
      style={{ direction: isRTL ? "rtl" : "ltr" }}
    >
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="inline-block whitespace-nowrap">
          {isRTL
            ? (
              <motion.span variants={child} className="inline-block">
                {word}
              </motion.span>
            )
            : word.split("").map((char, charIndex) => (
              <motion.span
                key={`${word}-${charIndex}`}
                variants={child}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
        </span>
      ))}
    </motion.h1>
  );
}
