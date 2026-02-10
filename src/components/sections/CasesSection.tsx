"use client";

import { motion } from "framer-motion";
import { ArrowRight, Building2, Factory, HeartPulse } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Language } from "@/lib/use-language";
import { cn } from "@/lib/utils";

type CaseStudy = {
  key: string;
  icon: LucideIcon;
  sector: { en: string; ar: string };
  title: { en: string; ar: string };
  challenge: { en: string; ar: string };
  system: { en: string; ar: string };
  impact: { en: string; ar: string };
};

const caseStudies: CaseStudy[] = [
  {
    key: "healthcare",
    icon: HeartPulse,
    sector: { en: "Healthcare", ar: "الرعاية الصحية" },
    title: { en: "Private Clinic Group", ar: "مجموعة عيادات خاصة" },
    challenge: {
      en: "Leads were spread across calls, WhatsApp, and forms with no unified tracking.",
      ar: "كانت الطلبات موزعة بين الاتصالات وواتساب والنماذج بدون تتبع موحد.",
    },
    system: {
      en: "We introduced campaign landing pages, source tracking, and one lead board for the team.",
      ar: "قمنا ببناء صفحات حملات مع تتبع المصادر ولوحة موحدة لإدارة العملاء المحتملين.",
    },
    impact: {
      en: "Response flow became measurable, and follow-up ownership was clear by channel.",
      ar: "أصبح مسار الرد قابلا للقياس، وتوزعت مسؤولية المتابعة بوضوح حسب القناة.",
    },
  },
  {
    key: "real-estate",
    icon: Building2,
    sector: { en: "Real Estate", ar: "العقارات" },
    title: { en: "Damascus Property Portfolio", ar: "محفظة عقارية في دمشق" },
    challenge: {
      en: "Listings lacked structure and had weak local-search visibility for target districts.",
      ar: "صفحات العقارات كانت غير منظمة مع ظهور ضعيف في البحث المحلي للمناطق المستهدفة.",
    },
    system: {
      en: "We rebuilt listing templates, map profile signals, and location-specific SEO hubs.",
      ar: "أعدنا بناء قوالب الصفحات وإشارات الخرائط ومراكز محتوى سيو مخصصة لكل منطقة.",
    },
    impact: {
      en: "Discovery channels became predictable and media spend decisions were data-backed.",
      ar: "أصبحت قنوات الاكتشاف أكثر استقرارا، وقرارات الإنفاق الإعلاني مبنية على بيانات.",
    },
  },
  {
    key: "manufacturing",
    icon: Factory,
    sector: { en: "Manufacturing", ar: "التصنيع" },
    title: { en: "B2B Export Supplier", ar: "مورد تصدير B2B" },
    challenge: {
      en: "International inquiries were unqualified and consumed heavy manual coordination.",
      ar: "الاستفسارات الخارجية كانت غير مؤهلة وتستهلك وقتا كبيرا في التنسيق اليدوي.",
    },
    system: {
      en: "We deployed multilingual qualification forms, routing logic, and CRM-ready handoff.",
      ar: "نفذنا نماذج تأهيل متعددة اللغات مع منطق توزيع تلقائي وربط جاهز مع CRM.",
    },
    impact: {
      en: "Sales focused on high-intent opportunities with a cleaner pipeline handover.",
      ar: "أصبح فريق المبيعات يركز على الفرص الجادة مع تسليم أنظف لخط سير العملاء.",
    },
  },
];

export default function CasesSection({ language }: { language: Language }) {
  const isRTL = language === "ar";

  const copy = {
    eyebrow: { en: "Case Scenarios", ar: "حالات تطبيقية" },
    heading: {
      en: "Structured delivery paths for real business contexts",
      ar: "مسارات تنفيذ منظمة لسيناريوهات أعمال حقيقية",
    },
    description: {
      en: "Each case starts with baseline mapping, then moves through implementation checkpoints to keep growth efforts auditable and practical.",
      ar: "كل حالة تبدأ بخريطة أساس واضحة، ثم تمر بنقاط تنفيذ مرحلية لضمان أن يكون النمو قابلا للتدقيق وعمليا.",
    },
    frameTitle: { en: "How MASAR runs each case", ar: "كيف ينفذ مسار كل حالة" },
    frameBody: {
      en: "Discovery -> Build -> Validation. The same framework is adapted by sector, team capacity, and operational maturity.",
      ar: "الاكتشاف -> البناء -> التحقق. نفس الإطار يتم تكييفه حسب القطاع وقدرة الفريق ومستوى الجاهزية التشغيلية.",
    },
    framePoints: {
      en: ["Clear ownership per channel", "Priority roadmap by business impact", "Measurable checkpoints every sprint"],
      ar: ["ملكية واضحة لكل قناة", "خارطة أولويات حسب أثر الأعمال", "نقاط قياس في كل دورة تنفيذ"],
    },
    challengeLabel: { en: "Challenge", ar: "التحدي" },
    systemLabel: { en: "System Built", ar: "الحل المنفذ" },
    impactLabel: { en: "Operational Shift", ar: "النتيجة التشغيلية" },
    cta: { en: "Discuss Your Case", ar: "ناقش حالتك معنا" },
  };

  return (
    <section
      id="case-studies"
      dir={isRTL ? "rtl" : "ltr"}
      className="relative z-20 bg-white px-6 py-28 text-[#0F1F1E] dark:bg-[#070D0C] dark:text-[#EAF2EE]"
    >
      <div className="mx-auto max-w-7xl space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className={cn("grid gap-8 lg:grid-cols-[1.2fr_0.8fr]", isRTL && "text-right")}
        >
          <div className="space-y-5">
            <Badge
              variant="brand-outline"
              className={cn(
                "rounded-full px-4 py-2 text-[11px]",
                isRTL ? "arabic-text tracking-normal" : "tracking-[0.24em]"
              )}
            >
              {copy.eyebrow[language]}
            </Badge>
            <h2
              className={cn(
                "max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl",
                isRTL ? "arabic-text" : "font-[var(--font-jakarta)]"
              )}
            >
              {copy.heading[language]}
            </h2>
            <p className={cn("max-w-[60ch] text-[1.05rem] leading-8 text-[#4A5754] dark:text-[#A9B9B4]", isRTL && "arabic-text")}>
              {copy.description[language]}
            </p>
            <Button
              asChild
              variant="light-solid"
              className={cn("h-11 px-6 text-xs", isRTL ? "arabic-text tracking-normal" : "tracking-[0.16em]")}
            >
              <a href="#contact">
                <span>{copy.cta[language]}</span>
              </a>
            </Button>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-[#0F1F1E]/10 bg-[#F8F9F8] p-6 text-[#0F1F1E] shadow-[0_14px_30px_rgba(7,16,15,0.08)] dark:border-white/15 dark:bg-[#0F1716] dark:text-[#EAF2EE]">
            <div className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-[#4ED1B2]/12 blur-2xl" />
            <p className={cn("text-xs font-medium text-[#1E4F45] dark:text-[#8ED9C8]", isRTL ? "arabic-text" : "uppercase tracking-[0.2em]")}>
              {copy.frameTitle[language]}
            </p>
            <p className={cn("mt-4 text-base leading-8 text-[#2D3B38] dark:text-[#B3C3BE]", isRTL && "arabic-text")}>{copy.frameBody[language]}</p>
            <ul className="mt-6 space-y-2.5">
              {copy.framePoints[language].map((point) => (
                <li key={point} className={cn("flex items-start gap-2.5 text-sm text-[#344643] dark:text-[#C2D0CB]", isRTL && "flex-row-reverse arabic-text")}>
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#4ED1B2]" aria-hidden="true" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <div className="grid gap-5 lg:grid-cols-3">
          {caseStudies.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.article
                key={item.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.48, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <Card className="h-full rounded-2xl border-[#0F1F1E]/10 bg-white/90 py-0 shadow-[0_16px_30px_rgba(9,20,18,0.08)]">
                  <CardContent className={cn("flex h-full flex-col gap-5 p-6", isRTL && "text-right")}>
                    <div className={cn("flex items-center justify-between gap-3", isRTL && "flex-row-reverse")}>
                      <Badge
                        variant="brand-outline"
                        className={cn("rounded-full px-3 py-1.5 text-[10px]", isRTL ? "arabic-text tracking-normal" : "tracking-[0.2em]")}
                      >
                        {item.sector[language]}
                      </Badge>
                      <span className="inline-flex size-9 items-center justify-center rounded-full border border-[#0F1F1E]/10 bg-[#F6F7F7] text-[#0F1F1E]">
                        <Icon className="size-4" />
                      </span>
                    </div>

                    <h3
                      className={cn(
                        "text-2xl font-semibold leading-tight tracking-tight text-[#0F1F1E]",
                        isRTL ? "arabic-text" : "font-[var(--font-jakarta)]"
                      )}
                    >
                      {item.title[language]}
                    </h3>

                    <div className="space-y-3">
                      <div className="rounded-2xl border border-[#0F1F1E]/10 bg-[#F8F8F5] p-3.5">
                        <p className={cn("text-[11px] font-medium text-[#5A6B66]", isRTL ? "arabic-text" : "uppercase tracking-[0.16em]")}>
                          {copy.challengeLabel[language]}
                        </p>
                        <p className={cn("mt-1.5 text-sm leading-7 text-[#243532]", isRTL && "arabic-text")}>{item.challenge[language]}</p>
                      </div>

                      <div className="rounded-2xl border border-[#4ED1B2]/30 bg-[#4ED1B2]/10 p-3.5">
                        <p className={cn("text-[11px] font-medium text-[#1E4F45]", isRTL ? "arabic-text" : "uppercase tracking-[0.16em]")}>
                          {copy.systemLabel[language]}
                        </p>
                        <p className={cn("mt-1.5 text-sm leading-7 text-[#163A35]", isRTL && "arabic-text")}>{item.system[language]}</p>
                      </div>

                      <div className="rounded-2xl border border-[#0F1F1E]/10 bg-white p-3.5">
                        <p className={cn("text-[11px] font-medium text-[#5A6B66]", isRTL ? "arabic-text" : "uppercase tracking-[0.16em]")}>
                          {copy.impactLabel[language]}
                        </p>
                        <p className={cn("mt-1.5 text-sm leading-7 text-[#243532]", isRTL && "arabic-text")}>{item.impact[language]}</p>
                      </div>
                    </div>

                    <a
                      href="#proofs"
                      className={cn(
                        "mt-auto inline-flex items-center gap-2 pt-1 text-sm font-medium text-[#0F1F1E] transition-colors hover:text-[#22C7AC]",
                        isRTL && "flex-row-reverse arabic-text"
                      )}
                    >
                      <span>{language === "ar" ? "عرض طبقة الإثبات" : "View proof layer"}</span>
                      <ArrowRight className={cn("size-4", isRTL && "rotate-180")} />
                    </a>
                  </CardContent>
                </Card>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
