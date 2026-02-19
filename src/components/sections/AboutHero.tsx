"use client";

import { ArrowRight, Compass, ShieldCheck, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Language } from "@/lib/use-language";
import { cn } from "@/lib/utils";

type Pillar = {
  key: string;
  icon: LucideIcon;
  title: { en: string; ar: string };
  body: { en: string; ar: string };
};

const pillars: Pillar[] = [
  {
    key: "clarity",
    icon: Compass,
    title: { en: "Clear Direction", ar: "اتجاه واضح" },
    body: { en: "Strategy before execution.", ar: "استراتيجية قبل التنفيذ." },
  },
  {
    key: "reliability",
    icon: ShieldCheck,
    title: { en: "Reliable Delivery", ar: "تنفيذ موثوق" },
    body: { en: "Systems built to last.", ar: "أنظمة مصممة للاستمرارية." },
  },
  {
    key: "innovation",
    icon: Sparkles,
    title: { en: "AI-Ready Thinking", ar: "تفكير جاهز للذكاء الاصطناعي" },
    body: { en: "Modern workflows for growth.", ar: "مسارات حديثة للنمو." },
  },
];

export default function AboutHero({ language }: { language: Language }) {
  const isRTL = language === "ar";

  const copy = {
    eyebrow: { en: "About MASAR", ar: "عن مسار" },
    heading: {
      en: "We design practical digital infrastructure for measurable business growth.",
      ar: "نصمم بنية رقمية عملية تدفع الأعمال نحو نمو قابل للقياس.",
    },
    description: {
      en: "MASAR is a Damascus-based digital partner helping businesses and investors build visibility, automation, and long-term growth systems.",
      ar: "مسار شريك رقمي من دمشق يساعد الشركات والمستثمرين على بناء الظهور، الأتمتة، وأنظمة نمو طويلة المدى.",
    },
    primaryCta: { en: "Book a Strategy Call", ar: "احجز استشارة استراتيجية" },
    secondaryCta: { en: "Explore Services", ar: "استكشف الخدمات" },
    cardEyebrow: { en: "Our Approach", ar: "منهجنا" },
    cardHeading: {
      en: "Built for focus, consistency, and execution speed.",
      ar: "مبني على التركيز، الاتساق، وسرعة التنفيذ.",
    },
    cardBody: {
      en: "Every engagement starts with business clarity, then moves into implementation with clear accountability.",
      ar: "كل تعاون يبدأ بوضوح تجاري، ثم ينتقل إلى التنفيذ مع مسؤوليات واضحة.",
    },
  };

  return (
    <section
      id="about-hero"
      dir={isRTL ? "rtl" : "ltr"}
      className="relative overflow-hidden bg-white px-6 pb-24 pt-36 text-[#0F1F1E] dark:bg-[#070D0C] dark:text-[#EAF2EE] sm:pb-28 lg:pt-40"
    >
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,rgba(230,216,184,0),rgba(230,216,184,0.18))] dark:bg-[linear-gradient(180deg,rgba(230,216,184,0),rgba(230,216,184,0.08))]" />

      <div className="relative mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[1.06fr_0.94fr] lg:items-center">
        <div className={cn("space-y-7", isRTL && "text-right")}>
          <Badge
            variant="brand-outline"
            className={cn(
              "w-fit rounded-full px-4 py-2 text-[11px]",
              isRTL ? "mr-0 ml-auto arabic-text tracking-normal" : "tracking-[0.18em]"
            )}
          >
            {copy.eyebrow[language]}
          </Badge>

          <h1
            className={cn(
              "max-w-3xl text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-[3.35rem]",
              isRTL ? "arabic-text leading-[1.28]" : "font-brand-display"
            )}
          >
            {copy.heading[language]}
          </h1>

          <p className={cn("max-w-[64ch] text-base leading-8 text-[#4A5754] dark:text-[#A9B9B4]", isRTL && "arabic-text")}>
            {copy.description[language]}
          </p>

          <div className={cn("flex flex-wrap items-center gap-4 pt-1", isRTL && "justify-end")}>
            <Button asChild variant="brand" className="h-12 min-w-[220px] justify-center">
              <Link href={`/${language}#contact`}>{copy.primaryCta[language]}</Link>
            </Button>

            <Button asChild variant="secondary" className="group h-12 min-w-[220px] justify-center gap-2.5">
              <Link href={`/${language}#services`}>
                <span className={cn(isRTL && "leading-none")}>{copy.secondaryCta[language]}</span>
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
              </Link>
            </Button>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[32px] border border-[#0F1F1E]/10 bg-[linear-gradient(145deg,#FFFFFF,#F4F8F7)] p-6 sm:p-8 dark:border-white/15 dark:bg-[linear-gradient(145deg,#101816,#0B1211)]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(78,209,178,0.2),transparent_58%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(78,209,178,0.16),transparent_62%)]" />

          <div className={cn("relative z-10", isRTL && "text-right")}>
            <p
              className={cn(
                "text-xs font-semibold text-[#5A6B66] dark:text-[#9FB1AB]",
                isRTL ? "arabic-text" : "tracking-[0.16em]"
              )}
            >
              {copy.cardEyebrow[language]}
            </p>

            <h2
              className={cn(
                "mt-4 text-3xl font-semibold leading-tight tracking-tight text-[#102320] dark:text-[#EDF6F2] sm:text-[2rem]",
                isRTL ? "arabic-text leading-[1.32]" : "font-brand-display"
              )}
            >
              {copy.cardHeading[language]}
            </h2>

            <p className={cn("mt-4 text-base leading-8 text-[#4A5754] dark:text-[#A9B9B4]", isRTL && "arabic-text")}>
              {copy.cardBody[language]}
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {pillars.map((pillar) => {
                const Icon = pillar.icon;

                return (
                  <div
                    key={pillar.key}
                    className="rounded-2xl border border-[#0F1F1E]/10 bg-white/75 p-4 dark:border-white/15 dark:bg-white/5"
                  >
                    <Icon className="size-5 text-[#1E8C73] dark:text-[#69E9CF]" />
                    <p className={cn("mt-3 text-sm font-semibold text-[#102320] dark:text-[#EDF6F2]", isRTL && "arabic-text")}>
                      {pillar.title[language]}
                    </p>
                    <p className={cn("mt-2 text-xs leading-6 text-[#5A6B66] dark:text-[#9FB1AB]", isRTL && "arabic-text")}>
                      {pillar.body[language]}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
