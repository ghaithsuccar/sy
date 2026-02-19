"use client";

import { ArrowUpRight } from "lucide-react";

import SignalGatewayShape from "@/components/sections/about/SignalGatewayShape";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Language } from "@/lib/use-language";
import { cn } from "@/lib/utils";

type MetricItem = {
  value: string;
  label: { en: string; ar: string };
};

const metrics: MetricItem[] = [
  {
    value: "450+",
    label: { en: "Projects delivered", ar: "\u0645\u0634\u0627\u0631\u064a\u0639 \u062a\u0645 \u062a\u0646\u0641\u064a\u0630\u0647\u0627" },
  },
  {
    value: "17+",
    label: { en: "Years of experience", ar: "\u0633\u0646\u0648\u0627\u062a \u062e\u0628\u0631\u0629" },
  },
  {
    value: "42+",
    label: { en: "Cities served", ar: "\u0645\u062f\u0646 \u0646\u062e\u062f\u0645\u0647\u0627" },
  },
  {
    value: "80%",
    label: { en: "Long-term clients", ar: "\u0639\u0645\u0644\u0627\u0621 \u0628\u0639\u0642\u0648\u062f \u0645\u0633\u062a\u0645\u0631\u0629" },
  },
];

export default function AboutUs({ language }: { language: Language }) {
  const isRTL = language === "ar";

  const copy = {
    label: { en: "Our Mission", ar: "\u0631\u0633\u0627\u0644\u062a\u0646\u0627" },
    heading: {
      en: "We build digital infrastructure that helps businesses scale with clarity, consistency, and measurable outcomes.",
      ar: "\u0646\u0628\u0646\u064a \u0628\u0646\u064a\u0629 \u0631\u0642\u0645\u064a\u0629 \u062a\u0633\u0627\u0639\u062f \u0627\u0644\u0634\u0631\u0643\u0627\u062a \u0639\u0644\u0649 \u0627\u0644\u062a\u0648\u0633\u0639 \u0628\u0648\u0636\u0648\u062d \u0648\u0627\u062a\u0633\u0627\u0642 \u0648\u0646\u062a\u0627\u0626\u062c \u0642\u0627\u0628\u0644\u0629 \u0644\u0644\u0642\u064a\u0627\u0633.",
    },
    body: {
      en: "At MASAR, every system we design improves visibility, simplifies operations, and connects marketing to real business growth.",
      ar: "\u0641\u064a \u0645\u0633\u0627\u0631\u060c \u0646\u0635\u0645\u0645 \u0643\u0644 \u0646\u0638\u0627\u0645 \u0628\u0647\u062f\u0641 \u062a\u062d\u0633\u064a\u0646 \u0627\u0644\u0638\u0647\u0648\u0631\u060c \u0648\u062a\u0628\u0633\u064a\u0637 \u0627\u0644\u062a\u0634\u063a\u064a\u0644\u060c \u0648\u0631\u0628\u0637 \u0627\u0644\u062a\u0633\u0648\u064a\u0642 \u0628\u0646\u0645\u0648 \u0623\u0639\u0645\u0627\u0644 \u062d\u0642\u064a\u0642\u064a.",
    },
    cta: { en: "Start Building With Us", ar: "\u0644\u0646\u0628\u062f\u0623 \u0627\u0644\u0628\u0646\u0627\u0621 \u0645\u0639\u064b\u0627" },
  };

  return (
    <section
      id="about"
      dir={isRTL ? "rtl" : "ltr"}
      className="relative overflow-hidden bg-[#F6F7F7] px-6 py-24 text-[#0F1F1E] dark:bg-[#070D0C] dark:text-[#EAF2EE]"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(78,209,178,0.12),rgba(78,209,178,0))]" />

      <div className="relative mx-auto w-full max-w-7xl space-y-12">
        <div className={cn("grid gap-8 lg:grid-cols-2 lg:gap-10", isRTL && "text-right")}>
          <div className="flex flex-col justify-center">
            <Badge
              variant="brand-outline"
              className={cn(
                "w-fit text-[11px] tracking-[0.18em]",
                isRTL && "mr-0 ml-auto arabic-text tracking-normal"
              )}
            >
              {copy.label[language]}
            </Badge>

            <h2
              className={cn(
                "mt-5 max-w-2xl text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-5xl",
                isRTL ? "arabic-text leading-[1.3]" : "font-brand-display"
              )}
            >
              {copy.heading[language]}
            </h2>

            <p
              className={cn(
                "mt-6 max-w-[64ch] text-base leading-8 text-[#4A5754] dark:text-[#A9B9B4]",
                isRTL && "mr-auto arabic-text"
              )}
            >
              {copy.body[language]}
            </p>

            <div className={cn("mt-8", isRTL && "flex justify-end")}>
              <Button
                asChild
                variant="brand-fill"
                className={cn(isRTL ? "arabic-text tracking-normal" : "tracking-[0.12em]")}
              >
                <a href="#contact">
                  {copy.cta[language]}
                  <ArrowUpRight className={cn("size-4", isRTL && "order-first")} />
                </a>
              </Button>
            </div>
          </div>

          <div className="relative min-h-[380px] overflow-hidden rounded-3xl border border-[#0F1F1E]/10 bg-transparent dark:border-white/15 dark:bg-transparent">
            <div className="absolute inset-0">
              <SignalGatewayShape />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => (
            <Card
              key={metric.value + metric.label.en}
              className="rounded-2xl border-[#0F1F1E]/10 bg-white/90 py-0 dark:border-white/15 dark:bg-[#0F1716]"
            >
              <CardContent className={cn("p-6", isRTL && "text-right")}>
                <p
                  className={cn(
                    "text-5xl font-semibold leading-none tracking-tight text-[#0F1F1E] dark:text-[#EAF2EE]",
                    isRTL ? "arabic-text" : "font-brand-display"
                  )}
                >
                  {metric.value}
                </p>
                <p className={cn("mt-4 text-base text-[#4A5754] dark:text-[#A9B9B4]", isRTL && "arabic-text")}>
                  {metric.label[language]}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
