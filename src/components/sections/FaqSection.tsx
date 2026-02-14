"use client";

import { motion } from "framer-motion";
import { CircleHelp, MessageCircleMore } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Language } from "@/lib/use-language";
import { cn } from "@/lib/utils";

type FaqSectionProps = {
  language: Language;
};

type FaqItem = {
  id: string;
  q: string;
  a: string;
  tag: string;
};

const faqData: Record<Language, FaqItem[]> = {
  en: [
    {
      id: "faq-01",
      q: "What makes MASAR different from a typical marketing agency?",
      a: "MASAR runs as an operating layer, not only a campaign vendor. We connect strategy, execution, tracking, and automation into one measurable system.",
      tag: "Operating Model",
    },
    {
      id: "faq-02",
      q: "How long does onboarding and launch usually take?",
      a: "Most projects start in 5-10 business days after scope confirmation. The first phase includes setup, baseline mapping, and channel readiness.",
      tag: "Timeline",
    },
    {
      id: "faq-03",
      q: "Can you execute in both Arabic and English?",
      a: "Yes. We design bilingual pages, ad flows, and messaging frameworks for Arabic and English audiences without duplicating effort.",
      tag: "Bilingual Delivery",
    },
    {
      id: "faq-04",
      q: "Do you work with internal teams or fully managed?",
      a: "Both models are supported. We can operate as your full external team, or integrate with your internal marketing and sales workflows.",
      tag: "Team Integration",
    },
    {
      id: "faq-05",
      q: "What do you report to track progress?",
      a: "We report on qualified leads, conversion quality, cost efficiency, and channel contribution. Reviews are recurring and tied to clear next actions.",
      tag: "Reporting",
    },
    {
      id: "faq-06",
      q: "What do you need from us before starting?",
      a: "We need business goals, current channels, priorities, and decision owners. From there, we define scope and begin with a clear implementation plan.",
      tag: "Project Kickoff",
    },
  ],
  ar: [
    {
      id: "faq-01",
      q: "\u0645\u0627 \u0627\u0644\u0630\u064a \u064a\u0645\u064a\u0632 \u0645\u0633\u0627\u0631 \u0639\u0646 \u0648\u0643\u0627\u0644\u0629 \u062a\u0633\u0648\u064a\u0642 \u062a\u0642\u0644\u064a\u062f\u064a\u0629\u061f",
      a: "\u0645\u0633\u0627\u0631 \u064a\u0639\u0645\u0644 \u0643\u0637\u0628\u0642\u0629 \u062a\u0634\u063a\u064a\u0644\u064a\u0629 \u0645\u062a\u0643\u0627\u0645\u0644\u0629 \u0648\u0644\u064a\u0633 \u0643\u0645\u0646\u0641\u0630 \u062d\u0645\u0644\u0627\u062a \u0641\u0642\u0637. \u0646\u0631\u0628\u0637 \u0628\u064a\u0646 \u0627\u0644\u0627\u0633\u062a\u0631\u0627\u062a\u064a\u062c\u064a\u0629 \u0648\u0627\u0644\u062a\u0646\u0641\u064a\u0630 \u0648\u0627\u0644\u0642\u064a\u0627\u0633 \u0648\u0627\u0644\u0623\u062a\u0645\u062a\u0629 \u0641\u064a \u0646\u0638\u0627\u0645 \u0648\u0627\u062d\u062f.",
      tag: "\u0646\u0645\u0648\u0630\u062c \u0627\u0644\u062a\u0634\u063a\u064a\u0644",
    },
    {
      id: "faq-02",
      q: "\u0643\u0645 \u064a\u0633\u062a\u063a\u0631\u0642 \u0627\u0644\u0628\u062f\u0621 \u0648\u0627\u0644\u0625\u0637\u0644\u0627\u0642 \u0639\u0627\u062f\u0629\u061f",
      a: "\u063a\u0627\u0644\u0628\u064b\u0627 \u0646\u0628\u062f\u0623 \u062e\u0644\u0627\u0644 5 \u0625\u0644\u0649 10 \u0623\u064a\u0627\u0645 \u0639\u0645\u0644 \u0628\u0639\u062f \u062a\u062b\u0628\u064a\u062a \u0627\u0644\u0646\u0637\u0627\u0642. \u0648\u062a\u0634\u0645\u0644 \u0627\u0644\u0645\u0631\u062d\u0644\u0629 \u0627\u0644\u0623\u0648\u0644\u0649 \u0627\u0644\u0625\u0639\u062f\u0627\u062f \u0648\u062a\u062d\u062f\u064a\u062f \u062e\u0637 \u0627\u0644\u0623\u0633\u0627\u0633 \u0648\u062c\u0627\u0647\u0632\u064a\u0629 \u0627\u0644\u0642\u0646\u0648\u0627\u062a.",
      tag: "\u0627\u0644\u062c\u062f\u0648\u0644 \u0627\u0644\u0632\u0645\u0646\u064a",
    },
    {
      id: "faq-03",
      q: "\u0647\u0644 \u062a\u0646\u0641\u0630\u0648\u0646 \u0628\u0627\u0644\u0644\u063a\u062a\u064a\u0646 \u0627\u0644\u0639\u0631\u0628\u064a\u0629 \u0648\u0627\u0644\u0625\u0646\u062c\u0644\u064a\u0632\u064a\u0629\u061f",
      a: "\u0646\u0639\u0645. \u0646\u0635\u0645\u0645 \u0635\u0641\u062d\u0627\u062a \u0648\u0645\u0633\u0627\u0631\u0627\u062a \u0625\u0639\u0644\u0627\u0646\u064a\u0629 \u0648\u0631\u0633\u0627\u0626\u0644 \u0628\u0627\u0644\u0644\u063a\u062a\u064a\u0646 \u0628\u062f\u0648\u0646 \u062a\u0634\u062a\u064a\u062a \u0627\u0644\u062c\u0647\u062f \u0628\u064a\u0646 \u0627\u0644\u0641\u0631\u0642.",
      tag: "\u062a\u0646\u0641\u064a\u0630 \u062b\u0646\u0627\u0626\u064a \u0627\u0644\u0644\u063a\u0629",
    },
    {
      id: "faq-04",
      q: "\u0647\u0644 \u062a\u0639\u0645\u0644\u0648\u0646 \u0645\u0639 \u0641\u0631\u064a\u0642\u0646\u0627 \u0627\u0644\u062f\u0627\u062e\u0644\u064a \u0623\u0645 \u0628\u0625\u062f\u0627\u0631\u0629 \u0643\u0627\u0645\u0644\u0629\u061f",
      a: "\u0646\u062f\u0639\u0645 \u0627\u0644\u0646\u0645\u0637\u064a\u0646. \u064a\u0645\u0643\u0646 \u0644\u0645\u0633\u0627\u0631 \u0625\u062f\u0627\u0631\u0629 \u0627\u0644\u0645\u0644\u0641 \u0643\u0627\u0645\u0644\u0627\u064b \u0623\u0648 \u0627\u0644\u0627\u0646\u062f\u0645\u0627\u062c \u0645\u0639 \u0641\u0631\u064a\u0642\u0643 \u0627\u0644\u062d\u0627\u0644\u064a \u062d\u0633\u0628 \u0627\u0644\u0627\u062d\u062a\u064a\u0627\u062c.",
      tag: "\u062a\u0643\u0627\u0645\u0644 \u0627\u0644\u0641\u0631\u0642",
    },
    {
      id: "faq-05",
      q: "\u0645\u0627 \u0627\u0644\u0645\u0624\u0634\u0631\u0627\u062a \u0627\u0644\u062a\u064a \u062a\u0639\u0631\u0636\u0648\u0646\u0647\u0627 \u0641\u064a \u0627\u0644\u062a\u0642\u0627\u0631\u064a\u0631\u061f",
      a: "\u0646\u0639\u0631\u0636 \u062c\u0648\u062f\u0629 \u0627\u0644\u0639\u0645\u0644\u0627\u0621 \u0627\u0644\u0645\u062d\u062a\u0645\u0644\u064a\u0646 \u0648\u0643\u0641\u0627\u0621\u0629 \u0627\u0644\u062a\u062d\u0648\u064a\u0644 \u0648\u0643\u0644\u0641\u0629 \u0627\u0644\u0642\u0646\u0648\u0627\u062a \u0648\u0645\u0633\u0627\u0647\u0645\u0629 \u0643\u0644 \u0642\u0646\u0627\u0629\u060c \u0645\u0639 \u062e\u0637\u0648\u0627\u062a \u062a\u062d\u0633\u064a\u0646 \u0648\u0627\u0636\u062d\u0629 \u0641\u064a \u0643\u0644 \u062f\u0648\u0631\u0629.",
      tag: "\u0627\u0644\u0642\u064a\u0627\u0633 \u0648\u0627\u0644\u062a\u0642\u0627\u0631\u064a\u0631",
    },
    {
      id: "faq-06",
      q: "\u0645\u0627 \u0627\u0644\u0645\u0637\u0644\u0648\u0628 \u0645\u0646\u0627 \u0642\u0628\u0644 \u0628\u062f\u0621 \u0627\u0644\u0645\u0634\u0631\u0648\u0639\u061f",
      a: "\u0646\u062d\u062a\u0627\u062c \u0623\u0647\u062f\u0627\u0641 \u0627\u0644\u0623\u0639\u0645\u0627\u0644 \u0648\u0627\u0644\u0642\u0646\u0648\u0627\u062a \u0627\u0644\u062d\u0627\u0644\u064a\u0629 \u0648\u0627\u0644\u0623\u0648\u0644\u0648\u064a\u0627\u062a \u0648\u0623\u0635\u062d\u0627\u0628 \u0627\u0644\u0642\u0631\u0627\u0631. \u0628\u0639\u062f\u0647\u0627 \u0646\u0636\u0639 \u0627\u0644\u0646\u0637\u0627\u0642 \u0648\u062e\u0637\u0629 \u062a\u0646\u0641\u064a\u0630 \u0648\u0627\u0636\u062d\u0629.",
      tag: "\u0628\u062f\u0627\u064a\u0629 \u0627\u0644\u0645\u0634\u0631\u0648\u0639",
    },
  ],
};

export default function FaqSection({ language }: FaqSectionProps) {
  const isRTL = language === "ar";

  const copy = {
    eyebrow: { en: "FAQ", ar: "\u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0634\u0627\u0626\u0639\u0629" },
    heading: {
      en: "Everything you need before kickoff.",
      ar: "\u0643\u0644 \u0645\u0627 \u062a\u062d\u062a\u0627\u062c\u0647 \u0642\u0628\u0644 \u0628\u062f\u0621 \u0627\u0644\u062a\u0646\u0641\u064a\u0630.",
    },
    description: {
      en: "A practical overview of timeline, workflow, and collaboration model.",
      ar: "\u0646\u0638\u0631\u0629 \u0639\u0645\u0644\u064a\u0629 \u0639\u0644\u0649 \u0627\u0644\u062c\u062f\u0648\u0644 \u0627\u0644\u0632\u0645\u0646\u064a \u0648\u0622\u0644\u064a\u0629 \u0627\u0644\u0639\u0645\u0644 \u0648\u0646\u0645\u0648\u0630\u062c \u0627\u0644\u062a\u0639\u0627\u0648\u0646.",
    },
    supportTitle: { en: "Need a quick answer?", ar: "\u062a\u062d\u062a\u0627\u062c \u0631\u062f\u0627\u064b \u0633\u0631\u064a\u0639\u0627\u064b\u061f" },
    supportBody: {
      en: "Send your case and we will map the best start path in one call.",
      ar: "\u0627\u0631\u0633\u0644 \u062d\u0627\u0644\u062a\u0643 \u0648\u0633\u0646\u062d\u062f\u062f \u0623\u0641\u0636\u0644 \u0646\u0642\u0637\u0629 \u0628\u062f\u0627\u064a\u0629 \u062e\u0644\u0627\u0644 \u0645\u0643\u0627\u0644\u0645\u0629 \u0648\u0627\u062d\u062f\u0629.",
    },
    supportCta: { en: "Talk To MASAR", ar: "\u062a\u0648\u0627\u0635\u0644 \u0645\u0639 \u0645\u0633\u0627\u0631" },
    footer: {
      en: "Still comparing options? We can walk you through a no-pressure plan.",
      ar: "\u0645\u0627 \u0632\u0644\u062a \u062a\u0642\u0627\u0631\u0646 \u0627\u0644\u062e\u064a\u0627\u0631\u0627\u062a\u061f \u0646\u0631\u0627\u062c\u0639 \u0645\u0639\u0643 \u0627\u0644\u062e\u0637\u0629 \u0628\u0634\u0643\u0644 \u0639\u0645\u0644\u064a.",
    },
  };

  return (
    <section
      id="faq"
      dir={isRTL ? "rtl" : "ltr"}
      className="relative overflow-hidden bg-[#F6F7F7] px-6 py-24 text-[#0F1F1E] dark:bg-[#070D0C] dark:text-[#EAF2EE]"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-[linear-gradient(180deg,rgba(230,216,184,0.32),rgba(230,216,184,0))]" />

      <div className="relative mx-auto w-full max-w-7xl space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className={cn("grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end", isRTL && "text-right")}
        >
          <div className="space-y-4">
            <Badge
              variant="brand-outline"
              className={cn(
                "rounded-full px-4 py-2 text-[11px]",
                isRTL ? "arabic-text tracking-normal" : "tracking-[0.22em]"
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
            <p className={cn("max-w-[64ch] text-base leading-8 text-[#4A5754] dark:text-[#A9B9B4]", isRTL && "arabic-text")}>
              {copy.description[language]}
            </p>
          </div>

          <Card className="rounded-2xl border-[#0F1F1E]/10 bg-white/90 py-0 shadow-none dark:border-white/15 dark:bg-[#0F1716] lg:max-w-[360px]">
            <CardContent className={cn("space-y-3 p-4", isRTL && "text-right")}>
              <div className={cn("flex items-center gap-2.5", isRTL && "flex-row-reverse")}>
                <span className="inline-flex size-8 items-center justify-center rounded-full border border-[#0F1F1E]/12 bg-[#F7FBFA] text-[#0F1F1E] dark:border-white/20 dark:bg-[#12211E] dark:text-[#EAF2EE]">
                  <CircleHelp className="size-4" />
                </span>
                <p className={cn("text-sm font-medium text-[#0F1F1E] dark:text-[#EAF2EE]", isRTL && "arabic-text")}>
                  {copy.supportTitle[language]}
                </p>
              </div>
              <p className={cn("text-sm leading-7 text-[#4A5754] dark:text-[#A9B9B4]", isRTL && "arabic-text")}>
                {copy.supportBody[language]}
              </p>
              <div className={cn(isRTL && "text-right")}>
                <Button
                  asChild
                  variant="light-outline"
                  className={cn("h-10 px-5 text-xs", isRTL ? "arabic-text tracking-normal" : "tracking-[0.14em]")}
                >
                  <a href="#contact">{copy.supportCta[language]}</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.46, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        >
          <Card className="overflow-hidden rounded-3xl border-[#0F1F1E]/10 bg-white/90 py-0 shadow-[0_18px_34px_rgba(9,20,18,0.09)] dark:border-white/15 dark:bg-[#0F1716]">
            <CardContent className="p-4 sm:p-6">
              <Accordion
                key={language}
                type="single"
                collapsible
                defaultValue={faqData[language][0]?.id}
                className="space-y-3"
              >
                {faqData[language].map((item, index) => (
                  <AccordionItem
                    key={item.id}
                    value={item.id}
                    className="overflow-hidden rounded-2xl border border-[#0F1F1E]/10 bg-[#FCFDFC] px-4 transition-colors data-[state=open]:border-[#4ED1B2]/55 data-[state=open]:bg-white dark:border-white/15 dark:bg-[#0F1716] dark:data-[state=open]:bg-[#12201D]"
                  >
                    <AccordionTrigger
                      className={cn(
                        "py-5 hover:no-underline [&>svg]:mt-1 [&>svg]:text-[#7A8A8E]",
                        isRTL
                          ? "text-right [&>svg]:order-first [&>svg]:ml-3 [&>svg]:mr-0"
                          : "text-left [&>svg]:ml-3"
                      )}
                    >
                      <span className={cn("flex w-full items-start gap-3", isRTL && "justify-end")}>
                        <span className="inline-flex h-8 min-w-8 shrink-0 items-center justify-center rounded-full border border-[#0F1F1E]/12 bg-[#F6F7F7] px-2 text-[11px] font-semibold text-[#4A5754] dark:border-white/20 dark:bg-[#10201D] dark:text-[#A9B9B4]">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className={cn("min-w-0 flex-1", isRTL && "text-right")}>
                          <span
                            className={cn(
                              "block text-[1.03rem] font-semibold leading-7 text-[#0F1F1E] dark:text-[#EAF2EE] sm:text-[1.1rem]",
                              isRTL && "arabic-text"
                            )}
                          >
                            {item.q}
                          </span>
                          <Badge
                            variant="secondary"
                            className={cn(
                              "mt-2 rounded-full px-3 py-1 text-[10px] text-[#3A4254]",
                              isRTL ? "arabic-text tracking-normal" : "tracking-[0.16em]"
                            )}
                          >
                            {item.tag}
                          </Badge>
                        </span>
                      </span>
                    </AccordionTrigger>

                    <AccordionContent className={cn("pb-5", isRTL ? "pr-11 text-right" : "pl-11 text-left")}>
                      <p className={cn("text-[0.98rem] leading-8 text-[#4A5754] dark:text-[#A9B9B4]", isRTL && "arabic-text")}>
                        {item.a}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <div className={cn("mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#0F1F1E]/10 bg-[#F8F9F8] px-4 py-3 dark:border-white/15 dark:bg-[#11201D]", isRTL && "text-right")}>
                <div className={cn("flex items-center gap-2.5", isRTL && "flex-row-reverse")}>
                  <MessageCircleMore className="size-4 text-[#4ED1B2]" />
                  <p className={cn("text-sm text-[#4A5754] dark:text-[#A9B9B4]", isRTL && "arabic-text")}>
                    {copy.footer[language]}
                  </p>
                </div>
                <Button
                  asChild
                  variant="light-solid"
                  className={cn("h-9 px-4 text-[11px]", isRTL ? "arabic-text" : "tracking-[0.14em]")}
                >
                  <a href="#contact">{copy.supportCta[language]}</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
