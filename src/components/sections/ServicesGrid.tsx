"use client";

import type { LucideIcon } from "lucide-react";
import {
  Bot,
  Brush,
  Globe2,
  Megaphone,
  Search,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";

import type { Language } from "@/lib/use-language";
import { cn } from "@/lib/utils";

type ServiceCard = {
  key: string;
  icon: LucideIcon;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  image: string;
};

const services: ServiceCard[] = [
  {
    key: "web",
    icon: Globe2,
    title: { en: "Web Development & Hosting", ar: "تطوير المواقع والاستضافة" },
    description: {
      en: "Conversion-ready websites with stable deployment and hosting infrastructure.",
      ar: "مواقع مهيأة للتحويل مع بنية نشر واستضافة مستقرة.",
    },
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1200&q=80",
  },
  {
    key: "branding",
    icon: Brush,
    title: { en: "Graphic Design & Branding", ar: "التصميم والهوية البصرية" },
    description: {
      en: "Visual systems that keep your brand consistent across every touchpoint.",
      ar: "أنظمة بصرية تحافظ على اتساق العلامة عبر كل نقاط التفاعل.",
    },
    image: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1200&q=80",
  },
  {
    key: "automation",
    icon: Bot,
    title: { en: "Automation Systems", ar: "أنظمة الأتمتة" },
    description: {
      en: "Connected workflows that route leads and reduce repetitive manual work.",
      ar: "سير عمل مترابط يوجه العملاء المحتملين ويقلل المهام اليدوية المتكررة.",
    },
    image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ce?auto=format&fit=crop&w=1200&q=80",
  },
  {
    key: "visibility",
    icon: Search,
    title: { en: "SEO, Maps & AI Visibility", ar: "السيو والخرائط والظهور بالذكاء الاصطناعي" },
    description: {
      en: "Search-ready structure for stronger visibility in Google and AI-driven discovery.",
      ar: "بنية ظهور قوية في جوجل ونتائج الاكتشاف المعتمدة على الذكاء الاصطناعي.",
    },
    image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&w=1200&q=80",
  },
  {
    key: "reputation",
    icon: ShieldCheck,
    title: { en: "Reputation & Reviews", ar: "إدارة السمعة والتقييمات" },
    description: {
      en: "Review and trust frameworks that strengthen buyer confidence.",
      ar: "منظومة تقييمات وثقة تعزز قناعة العميل قبل اتخاذ القرار.",
    },
    image: "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    key: "campaigns",
    icon: Megaphone,
    title: { en: "Campaign Operations", ar: "تشغيل الحملات الإعلانية" },
    description: {
      en: "Performance-focused campaign execution with clear channel accountability.",
      ar: "تشغيل حملات مبني على الأداء مع وضوح المسؤولية لكل قناة.",
    },
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1200&q=80",
  },
];

const easeClass = "[transition-timing-function:cubic-bezier(0.4,0,0.2,1)]";

export default function ServicesGrid({ language }: { language: Language }) {
  const isRTL = language === "ar";

  const copy = {
    eyebrow: { en: "Core Services", ar: "الخدمات الأساسية" },
    heading: {
      en: "Service Layers Built For Measurable Growth",
      ar: "طبقات خدمات مبنية لنمو قابل للقياس",
    },
    description: {
      en: "Six integrated services delivered as one modern operating model.",
      ar: "ست خدمات مترابطة تُدار ضمن نموذج تشغيلي حديث واحد.",
    },
  };

  return (
    <section
      id="services"
      dir={isRTL ? "rtl" : "ltr"}
      className="relative overflow-hidden bg-[#F6F7F7] px-6 py-24 dark:bg-[#070D0C]"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(78,209,178,0.12),rgba(78,209,178,0))]" />

      <div className="relative mx-auto w-full max-w-7xl">
        <header className="mx-auto mb-12 max-w-3xl text-center">
          <p
            className={cn(
              "text-xs font-semibold text-[#696969] uppercase tracking-[0.24em]",
              isRTL && "arabic-text tracking-normal"
            )}
          >
            {copy.eyebrow[language]}
          </p>
          <h2
            className={cn(
              "mt-4 text-4xl font-semibold tracking-tight text-[#010101] sm:text-5xl",
              isRTL ? "arabic-text" : "font-brand-display"
            )}
          >
            {copy.heading[language]}
          </h2>
          <p className={cn("mt-4 text-base leading-7 text-[#696969]", isRTL && "arabic-text")}>
            {copy.description[language]}
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <article
                key={service.key}
                className={cn(
                  "group relative h-[310px] overflow-hidden rounded-[24px] border border-[#0F1F1E]/10 bg-white p-7 shadow-[0_14px_30px_rgba(9,20,18,0.08)] dark:border-white/14 dark:bg-[#0F1716] dark:shadow-[0_16px_32px_rgba(0,0,0,0.34)]",
                  "transition-transform duration-500",
                  easeClass,
                  "hover:scale-[1.02]"
                )}
              >
                <div
                  className={cn(
                    "absolute inset-0 opacity-0 transition-opacity duration-500",
                    easeClass,
                    "group-hover:opacity-100"
                  )}
                  aria-hidden="true"
                >
                  <Image
                    src={service.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>

                <div
                  className={cn(
                    "absolute inset-0 opacity-0 transition-opacity duration-500",
                    easeClass,
                    "bg-[#0F1F1E]/40 group-hover:opacity-100"
                  )}
                  aria-hidden="true"
                />

                <div className={cn("relative z-10 flex h-full flex-col", isRTL && "items-end text-right")}>
                  <span
                    className={cn(
                      "inline-flex size-14 items-center justify-center rounded-full",
                      "border border-[#4ED1B2]/55 bg-transparent text-[#4ED1B2]",
                      "transition-all duration-500",
                      easeClass,
                      "group-hover:border-white/35 group-hover:bg-white/18 group-hover:text-white group-hover:backdrop-blur-md"
                    )}
                  >
                    <Icon className="size-6" />
                  </span>

                  <div className="mt-auto max-w-[88%]">
                    <h3
                      className={cn(
                        "text-2xl font-semibold leading-tight text-[#010101]",
                        "transition-colors duration-500",
                        easeClass,
                        "group-hover:text-white",
                        isRTL && "arabic-text"
                      )}
                    >
                      {service.title[language]}
                    </h3>
                    <p
                      className={cn(
                        "mt-3 text-base leading-7 text-[#696969]",
                        "transition-colors duration-500",
                        easeClass,
                        "group-hover:text-white",
                        isRTL && "arabic-text"
                      )}
                    >
                      {service.description[language]}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
