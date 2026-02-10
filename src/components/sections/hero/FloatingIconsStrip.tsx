"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Bot,
  Brush,
  Globe,
  MapPinned,
  Search,
} from "lucide-react";

type StripItem = {
  Icon: LucideIcon;
  label: { en: string; ar: string };
};

const stripItems: StripItem[] = [
  { Icon: Globe, label: { en: "Web Development", ar: "تطوير المواقع" } },
  { Icon: Brush, label: { en: "Branding & Design", ar: "الهوية والتصميم" } },
  { Icon: Bot, label: { en: "Automation Systems", ar: "أنظمة الأتمتة" } },
  { Icon: Search, label: { en: "SEO & AI Visibility", ar: "السيو والظهور بالذكاء الاصطناعي" } },
  { Icon: MapPinned, label: { en: "Google Maps Presence", ar: "الظهور في خرائط جوجل" } },
];

export function FloatingIconsStrip({ language = "en" }: { language?: "en" | "ar" }) {
  const reducedMotion = !!useReducedMotion();
  const loopItems = [...stripItems, ...stripItems];
  const isArabic = language === "ar";

  return (
    <div dir="ltr" className="relative mx-auto w-full max-w-4xl overflow-hidden px-2">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-14 bg-gradient-to-r from-white to-transparent dark:from-[#070D0C]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-14 bg-gradient-to-l from-white to-transparent dark:from-[#070D0C]" />

      <motion.div
        className="flex min-w-max items-center gap-7 py-4 md:gap-8"
        initial={reducedMotion ? false : { opacity: 0 }}
        animate={reducedMotion ? { opacity: 1 } : { opacity: 1, x: ["0%", "-50%"] }}
        transition={{
          opacity: { duration: reducedMotion ? 0 : 0.25 },
          x: { duration: reducedMotion ? 0 : 42, ease: "linear", repeat: reducedMotion ? 0 : Infinity },
        }}
        aria-hidden="true"
      >
        {loopItems.map((item, index) => (
          <div
            key={`${item.label.en}-${index}`}
            className="flex h-14 min-w-[250px] shrink-0 items-center justify-center gap-3.5 px-2"
          >
            <item.Icon className="size-7 text-[#1B2321] dark:text-[#D7E4DF]" strokeWidth={1.85} />
            <span
              className={`truncate text-[1.2rem] font-medium text-[#222A28] dark:text-[#DCE8E3] ${isArabic ? "arabic-text tracking-normal" : "tracking-[0.01em]"}`}
            >
              {item.label[language]}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
