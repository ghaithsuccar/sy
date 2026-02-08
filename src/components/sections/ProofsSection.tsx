"use client";

import { motion } from "framer-motion";
import { Activity, BarChart3, CheckCircle2, FileCheck2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Language } from "@/lib/use-language";
import { cn } from "@/lib/utils";

type ProofSignal = {
  key: string;
  value: { en: string; ar: string };
  label: { en: string; ar: string };
};

type ProofStep = {
  key: string;
  icon: LucideIcon;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
};

const proofSignals: ProofSignal[] = [
  {
    key: "tracking",
    value: { en: "100%", ar: "100%" },
    label: { en: "Milestones tracked in a shared delivery board", ar: "تتبع كامل للمراحل ضمن لوحة تنفيذ مشتركة" },
  },
  {
    key: "reporting",
    value: { en: "Weekly", ar: "أسبوعي" },
    label: { en: "Decision report covering traffic, leads, and quality", ar: "تقرير قرار يغطي الزيارات والعملاء المحتملين وجودة التنفيذ" },
  },
  {
    key: "dashboards",
    value: { en: "Live", ar: "مباشر" },
    label: { en: "Visibility dashboards across SEO, campaigns, and CRM", ar: "لوحات متابعة مباشرة عبر السيو والحملات وCRM" },
  },
  {
    key: "validation",
    value: { en: "Post-Launch", ar: "بعد الإطلاق" },
    label: { en: "Validation sheet for speed, UX, and data integrity", ar: "قائمة تحقق للأداء وتجربة المستخدم وسلامة البيانات" },
  },
];

const proofSteps: ProofStep[] = [
  {
    key: "baseline",
    icon: Activity,
    title: { en: "Baseline Mapping", ar: "تحديد خط الأساس" },
    description: {
      en: "We document the current state before any rollout so every future claim has a reference point.",
      ar: "نوثق الوضع الحالي قبل أي تنفيذ حتى يكون لكل نتيجة لاحقة مرجع واضح.",
    },
  },
  {
    key: "implementation",
    icon: FileCheck2,
    title: { en: "Implementation Log", ar: "سجل التنفيذ" },
    description: {
      en: "Each change is logged by owner, channel, and expected business effect.",
      ar: "كل تعديل يتم تسجيله مع المسؤول والقناة والأثر المتوقع على الأعمال.",
    },
  },
  {
    key: "monitoring",
    icon: BarChart3,
    title: { en: "Continuous Monitoring", ar: "مراقبة مستمرة" },
    description: {
      en: "Weekly review cycles expose gaps early and keep momentum on high-impact actions.",
      ar: "دورات مراجعة أسبوعية تكشف الفجوات مبكرا وتحافظ على الزخم في الإجراءات الأعلى أثرا.",
    },
  },
  {
    key: "handoff",
    icon: CheckCircle2,
    title: { en: "Operational Handoff", ar: "تسليم تشغيلي" },
    description: {
      en: "Teams receive what changed, why it changed, and what to optimize next.",
      ar: "يتسلم الفريق ما تم تغييره ولماذا تم تغييره وما يجب تحسينه لاحقا.",
    },
  },
];

export default function ProofsSection({ language }: { language: Language }) {
  const isRTL = language === "ar";

  const copy = {
    eyebrow: { en: "Proof Layer", ar: "طبقة الإثبات" },
    heading: {
      en: "Evidence-first execution, not marketing claims",
      ar: "تنفيذ مبني على الأدلة وليس الوعود التسويقية",
    },
    description: {
      en: "Our proof model keeps strategy, production, and measurement connected so leadership teams can make confident decisions every sprint.",
      ar: "نموذج الإثبات لدينا يربط الاستراتيجية بالتنفيذ والقياس ليتمكن فريق الإدارة من اتخاذ قرارات واضحة في كل دورة.",
    },
    cta: { en: "Start a Proof-Led Plan", ar: "ابدأ خطة مبنية على الإثبات" },
    frameworkLabel: { en: "Proof Framework", ar: "إطار الإثبات" },
  };

  return (
    <section
      id="proofs"
      dir={isRTL ? "rtl" : "ltr"}
      className="relative z-20 overflow-hidden bg-[#0F1F1E] px-6 py-28 text-[#F6F7F7]"
    >
      <div className="pointer-events-none absolute left-0 top-16 size-80 rounded-full bg-[#4ED1B2]/12 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-10 size-96 rounded-full bg-[#E6D8B8]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl space-y-10">
        <div className={cn("grid gap-8 lg:grid-cols-[1fr_1.1fr]", isRTL && "text-right")}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-5"
          >
            <Badge
              variant="brand-outline"
              className={cn(
                "rounded-full border-[#4ED1B2]/70 bg-[#4ED1B2]/12 px-4 py-2 text-[11px] text-[#D4FFF4]",
                isRTL ? "arabic-text tracking-normal" : "tracking-[0.24em]"
              )}
            >
              {copy.eyebrow[language]}
            </Badge>
            <h2
              className={cn(
                "max-w-2xl text-4xl font-semibold leading-tight tracking-tight text-[#F6F7F7] sm:text-5xl",
                isRTL ? "arabic-text" : "font-[var(--font-jakarta)]"
              )}
            >
              {copy.heading[language]}
            </h2>
            <p className={cn("max-w-[58ch] text-[1.05rem] leading-8 text-white/72", isRTL && "arabic-text")}>
              {copy.description[language]}
            </p>
            <Button
              asChild
              variant="brand-outline"
              className={cn(
                "h-11 border-[#4ED1B2]/70 bg-transparent px-6 text-[#F6F7F7] shadow-none hover:bg-[#4ED1B2]/12 hover:text-white",
                isRTL ? "arabic-text tracking-normal" : "tracking-[0.16em]"
              )}
            >
              <a href="#contact">{copy.cta[language]}</a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-4 sm:grid-cols-2"
          >
            {proofSignals.map((signal) => (
              <Card key={signal.key} className="rounded-[26px] border-white/12 bg-white/4 py-0 text-white shadow-[0_12px_28px_rgba(3,10,9,0.35)]">
                <CardContent className={cn("space-y-2.5 p-5", isRTL && "text-right")}>
                  <p
                    className={cn(
                      "text-[1.8rem] font-semibold leading-none tracking-tight text-[#E6D8B8]",
                      isRTL ? "arabic-text" : "font-[var(--font-jakarta)]"
                    )}
                  >
                    {signal.value[language]}
                  </p>
                  <p className={cn("text-sm leading-7 text-white/78", isRTL && "arabic-text")}>{signal.label[language]}</p>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-4"
        >
          <p className={cn("text-xs font-medium text-[#E6D8B8]", isRTL ? "arabic-text text-right" : "uppercase tracking-[0.22em]")}>
            {copy.frameworkLabel[language]}
          </p>
          <div className="grid gap-4 lg:grid-cols-4">
            {proofSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <Card key={step.key} className="rounded-[24px] border-white/12 bg-[#122825]/70 py-0 text-white">
                  <CardContent className={cn("flex h-full flex-col gap-3 p-5", isRTL && "text-right")}>
                    <div className={cn("flex items-center justify-between gap-2", isRTL && "flex-row-reverse")}>
                      <span className="inline-flex size-9 items-center justify-center rounded-full border border-[#4ED1B2]/45 bg-[#4ED1B2]/14 text-[#BFF9EA]">
                        <Icon className="size-4" />
                      </span>
                      <span className={cn("text-xs text-white/55", isRTL ? "arabic-text" : "uppercase tracking-[0.18em]")}>
                        {language === "ar" ? `المرحلة ${index + 1}` : `Step ${index + 1}`}
                      </span>
                    </div>
                    <h3
                      className={cn(
                        "text-xl font-semibold leading-tight text-[#F6F7F7]",
                        isRTL ? "arabic-text" : "font-[var(--font-jakarta)]"
                      )}
                    >
                      {step.title[language]}
                    </h3>
                    <p className={cn("text-sm leading-7 text-white/74", isRTL && "arabic-text")}>{step.description[language]}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
