"use client";

import { motion } from "framer-motion";
import { Activity, BarChart3, CheckCircle2, Clock3, FileCheck2, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import type { Language } from "@/lib/use-language";
import { cn } from "@/lib/utils";

type ProofItem = {
  key: string;
  icon: LucideIcon;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  image: string;
};

const proofItems: ProofItem[] = [
  {
    key: "baseline",
    icon: Activity,
    title: { en: "Baseline Mapping", ar: "تحديد خط الأساس" },
    description: {
      en: "Current state mapped before rollout.",
      ar: "توثيق الحالة الحالية قبل أي تنفيذ.",
    },
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80",
  },
  {
    key: "implementation",
    icon: FileCheck2,
    title: { en: "Implementation Log", ar: "سجل التنفيذ" },
    description: {
      en: "Every change tagged by owner and channel.",
      ar: "كل تعديل مرتبط بالمسؤول والقناة.",
    },
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=900&q=80",
  },
  {
    key: "monitoring",
    icon: BarChart3,
    title: { en: "Continuous Monitoring", ar: "مراقبة مستمرة" },
    description: {
      en: "Weekly review loops to keep momentum.",
      ar: "مراجعات أسبوعية تحافظ على الزخم.",
    },
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
  },
  {
    key: "handoff",
    icon: CheckCircle2,
    title: { en: "Operational Handoff", ar: "تسليم تشغيلي" },
    description: {
      en: "Clear next actions for the internal team.",
      ar: "خطوات واضحة للفريق بعد التسليم.",
    },
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80",
  },
  {
    key: "availability",
    icon: Clock3,
    title: { en: "24/7 Visibility", ar: "رؤية 24/7" },
    description: {
      en: "Live signal on traffic, leads, and pipeline.",
      ar: "مؤشرات مباشرة للزيارات والعملاء وخط السير.",
    },
    image: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80",
  },
  {
    key: "growth",
    icon: TrendingUp,
    title: { en: "Scalable Growth Path", ar: "مسار نمو قابل للتوسع" },
    description: {
      en: "Scale without losing quality control.",
      ar: "توسع منظم بدون فقدان جودة التنفيذ.",
    },
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
  },
];

export default function ProofsSection({ language }: { language: Language }) {
  const isRTL = language === "ar";

  const copy = {
    eyebrow: { en: "Proof Layer", ar: "طبقة الإثبات" },
    heading: {
      en: "Real proof.\nReal operations.\nReal growth.",
      ar: "إثبات حقيقي.\nتشغيل واضح.\nنمو قابل للقياس.",
    },
    description: {
      en: "Less claims, more evidence. Every phase is visible and accountable.",
      ar: "وعود أقل، نتائج أوضح. كل مرحلة قابلة للمتابعة والمساءلة.",
    },
    cta: { en: "Start a Proof-Led Plan", ar: "ابدأ خطة مبنية على الإثبات" },
    metricLabel: { en: "Tracked Milestones", ar: "مراحل متتبعة" },
    metricValue: { en: "100%", ar: "100%" },
    metricLabel2: { en: "Review Cycle", ar: "دورة المراجعة" },
    metricValue2: { en: "Weekly", ar: "أسبوعية" },
  };

  return (
    <section id="proofs" dir={isRTL ? "rtl" : "ltr"} className="relative z-20 overflow-hidden bg-white px-6 py-28 text-[#0F1F1E] dark:bg-[#070D0C] dark:text-[#EAF2EE]">
      <div className="pointer-events-none absolute right-0 top-0 h-[360px] w-[48vw] bg-[radial-gradient(circle_at_top_right,_rgba(78,209,178,0.18),_transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl space-y-12">
        <div className={cn("grid gap-8 lg:grid-cols-[1.05fr_0.95fr]", isRTL && "text-right")}>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <span
              className={cn(
                "inline-flex items-center rounded-full border border-[#0F1F1E]/15 px-4 py-2 text-[11px] dark:border-white/20",
                isRTL ? "arabic-text tracking-normal" : "uppercase tracking-[0.2em]"
              )}
            >
              {copy.eyebrow[language]}
            </span>

            <h2
              className={cn(
                "max-w-3xl whitespace-pre-line text-balance text-5xl font-semibold leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl",
                isRTL ? "arabic-text leading-[1.1]" : "font-brand-display"
              )}
            >
              {copy.heading[language]}
            </h2>

            <p className={cn("max-w-[62ch] text-xl leading-9 text-[#4A5754] dark:text-[#A9B9B4]", isRTL && "arabic-text")}>{copy.description[language]}</p>

            <Button
              asChild
              variant="light-outline"
              className={cn("h-12 px-7", isRTL ? "arabic-text tracking-normal" : "uppercase tracking-[0.16em]")}
            >
              <a href="#contact">{copy.cta[language]}</a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-4 sm:grid-cols-2"
          >
            <div className="relative overflow-hidden rounded-2xl border border-[#0F1F1E]/10 dark:border-white/15 sm:col-span-2">
              <Image
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1400&q=80"
                alt=""
                width={1400}
                height={900}
                className="h-44 w-full object-cover sm:h-52"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1F1E]/35 to-transparent" />
            </div>

            <div className="rounded-2xl border border-[#0F1F1E]/10 bg-[#F7FBFA] p-4 dark:border-white/15 dark:bg-[#0F1716]">
              <p className={cn("text-xs text-[#5A6B66] dark:text-[#9FB1AB]", isRTL ? "arabic-text" : "uppercase tracking-[0.16em]")}>{copy.metricLabel[language]}</p>
              <p className={cn("mt-2 text-4xl font-semibold text-[#0F1F1E]", isRTL ? "arabic-text" : "font-brand-display")}>
                {copy.metricValue[language]}
              </p>
            </div>

            <div className="rounded-2xl border border-[#0F1F1E]/10 bg-[#F7FBFA] p-4 dark:border-white/15 dark:bg-[#0F1716]">
              <p className={cn("text-xs text-[#5A6B66] dark:text-[#9FB1AB]", isRTL ? "arabic-text" : "uppercase tracking-[0.16em]")}>{copy.metricLabel2[language]}</p>
              <p className={cn("mt-2 text-4xl font-semibold text-[#0F1F1E]", isRTL ? "arabic-text" : "font-brand-display")}>
                {copy.metricValue2[language]}
              </p>
            </div>
          </motion.div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {proofItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.key}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="group overflow-hidden rounded-2xl border border-[#0F1F1E]/10 bg-white dark:border-white/15 dark:bg-[#0F1716]"
              >
                <div className="relative h-36 overflow-hidden">
                  <Image
                    src={item.image}
                    alt=""
                    width={900}
                    height={600}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
                </div>

                <div className={cn("space-y-3 p-5", isRTL && "text-right")}>
                  <div className={cn("flex items-center gap-2.5", isRTL && "flex-row-reverse")}>
                    <span className="inline-flex size-7 items-center justify-center rounded-full border border-[#0F1F1E]/12 text-[#0F1F1E] dark:border-white/20 dark:text-[#DDE8E3]">
                      <Icon className="size-3.5" />
                    </span>
                    <p className={cn("text-sm font-medium text-[#5A6B66] dark:text-[#9FB1AB]", isRTL ? "arabic-text" : "uppercase tracking-[0.12em]")}>
                      {language === "ar" ? `المرحلة ${index + 1}` : `Step ${index + 1}`}
                    </p>
                  </div>

                  <h3
                    className={cn(
                      "text-3xl font-semibold leading-tight tracking-tight text-[#0F1F1E] dark:text-[#EAF2EE]",
                      isRTL ? "arabic-text" : "font-brand-display"
                    )}
                  >
                    {item.title[language]}
                  </h3>

                  <p className={cn("text-base leading-7 text-[#4A5754] dark:text-[#A9B9B4]", isRTL && "arabic-text")}>{item.description[language]}</p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
