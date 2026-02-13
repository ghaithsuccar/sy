"use client";

import Image from "next/image";

import type { Language } from "@/lib/use-language";
import { cn } from "@/lib/utils";

type MetricItem = {
  value: string;
  label: { en: string; ar: string };
};

const metrics: MetricItem[] = [
  {
    value: "450+",
    label: { en: "Projects delivered", ar: "مشاريع تم تنفيذها" },
  },
  {
    value: "17+",
    label: { en: "Years of experience", ar: "سنوات خبرة" },
  },
  {
    value: "42+",
    label: { en: "Cities served", ar: "مدن نخدمها" },
  },
  {
    value: "80%",
    label: { en: "Long-term clients", ar: "عملاء بعقود مستمرة" },
  },
];

export default function AboutUs({ language }: { language: Language }) {
  const isRTL = language === "ar";

  const copy = {
    label: { en: "Our Mission", ar: "رسالتنا" },
    heading: {
      en: "We build digital infrastructure that helps businesses scale with clarity, consistency, and measurable outcomes.",
      ar: "نبني بنية رقمية تساعد الشركات على التوسع بوضوح واتساق ونتائج قابلة للقياس.",
    },
    body: {
      en: "At MASAR, every system we design is built to improve visibility, simplify operations, and connect marketing to real business growth.",
      ar: "في مسار، نصمم كل نظام بهدف تحسين الظهور، وتبسيط التشغيل، وربط التسويق بنمو أعمال حقيقي.",
    },
    cta: { en: "Let's Collaborate", ar: "لنبدأ التعاون" },
  };

  return (
    <section
      id="about"
      dir={isRTL ? "rtl" : "ltr"}
      className="relative z-20 overflow-hidden bg-[#F6F7F7] px-6 py-24 text-[#010101] dark:bg-[#070D0C] dark:text-[#EAF2EE]"
    >
      <div className="mx-auto w-full max-w-7xl space-y-10">
        <div className={cn("grid items-stretch gap-8 lg:grid-cols-2", isRTL && "lg:grid-cols-[1fr_1fr]")}>
          <div className={cn("flex flex-col justify-center", isRTL && "text-right")}>
            <p
              className={cn(
                "inline-flex items-center gap-2 text-sm font-medium text-[#696969]",
                isRTL && "justify-end gap-2.5 arabic-text"
              )}
            >
              <span className="inline-block size-2 rounded-full bg-[#24BB36]" aria-hidden="true" />
              <span>{copy.label[language]}</span>
            </p>

            <h2
              className={cn(
                "mt-5 text-balance text-4xl font-semibold leading-tight tracking-tight text-[#010101] sm:text-5xl",
                isRTL ? "arabic-text" : "font-inter"
              )}
            >
              {copy.heading[language]}
            </h2>

            <p className={cn("mt-6 max-w-[64ch] text-xl leading-9 text-[#696969]", isRTL && "mr-auto arabic-text")}>
              {copy.body[language]}
            </p>

            <div className={cn("mt-8", isRTL && "flex justify-end")}>
              <a
                href="#contact"
                className={cn(
                  "inline-flex h-14 items-center justify-center rounded-full bg-[#24BB36] px-7 text-2xl font-semibold text-white",
                  "transition-all duration-300 hover:bg-[#1EA62E] hover:shadow-[0_14px_30px_rgba(30,166,46,0.25)]",
                  isRTL && "arabic-text text-xl"
                )}
              >
                {copy.cta[language]}
              </a>
            </div>
          </div>

          <div className="relative min-h-[340px] overflow-hidden rounded-2xl lg:min-h-[430px]">
            <Image
              src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1400&q=80"
              alt={language === "ar" ? "فريق يعمل في الحقل" : "Team working on a farm field"}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority={false}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => (
            <article
              key={metric.value + metric.label.en}
              className={cn(
                "flex min-h-[220px] flex-col justify-between rounded-[24px] bg-[#ECECEC] p-7",
                "dark:bg-[#101817]"
              )}
            >
              <p
                className={cn(
                  "text-6xl font-semibold leading-none tracking-tight text-[#010101] dark:text-[#EAF2EE]",
                  isRTL && "arabic-text"
                )}
              >
                {metric.value}
              </p>
              <p className={cn("text-3xl text-[#5F6368] dark:text-[#A9B9B4]", isRTL && "arabic-text")}>
                {metric.label[language]}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
