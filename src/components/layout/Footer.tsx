"use client";

import Link from "next/link";

import FooterGlobe from "@/components/layout/FooterGlobe";
import { AntigravityLogo } from "@/components/ui/AntigravityLogo";
import type { Language } from "@/lib/use-language";
import { cn } from "@/lib/utils";

type FooterProps = {
  language: Language;
};

type FooterLink = {
  href: string;
  label: { en: string; ar: string };
};

const productLinks: FooterLink[] = [
  { href: "#services", label: { en: "Overview", ar: "\u0646\u0638\u0631\u0629 \u0639\u0627\u0645\u0629" } },
  { href: "#services", label: { en: "Pricing", ar: "\u0627\u0644\u0623\u0633\u0639\u0627\u0631" } },
  { href: "#services", label: { en: "Marketplace", ar: "\u0627\u0644\u0633\u0648\u0642" } },
  { href: "#services", label: { en: "Features", ar: "\u0627\u0644\u0645\u0645\u064a\u0632\u0627\u062a" } },
];

const companyLinks: FooterLink[] = [
  { href: "#about", label: { en: "About", ar: "\u0645\u0646 \u0646\u062d\u0646" } },
  { href: "#about", label: { en: "Team", ar: "\u0627\u0644\u0641\u0631\u064a\u0642" } },
  { href: "#about", label: { en: "Blog", ar: "\u0627\u0644\u0645\u062f\u0648\u0646\u0629" } },
  { href: "#about", label: { en: "Careers", ar: "\u0627\u0644\u0648\u0638\u0627\u0626\u0641" } },
];

const resourcesLinks: FooterLink[] = [
  { href: "#", label: { en: "Help", ar: "\u0627\u0644\u0645\u0633\u0627\u0639\u062f\u0629" } },
  { href: "#contact", label: { en: "Sales", ar: "\u0627\u0644\u0645\u0628\u064a\u0639\u0627\u062a" } },
  { href: "#services", label: { en: "Advertise", ar: "\u0627\u0644\u0625\u0639\u0644\u0627\u0646" } },
];

export default function Footer({ language }: FooterProps) {
  const isRTL = language === "ar";
  const year = new Date().getFullYear();

  const copy = {
    brand: isRTL ? "\u0645\u0633\u0627\u0631 \u0644\u0644\u062a\u0633\u0648\u064a\u0642" : "MASAR Marketing",
    description: isRTL
      ? "\u0646\u0628\u0646\u064a \u062d\u0636\u0648\u0631\u0627 \u0631\u0642\u0645\u064a\u0627 \u062d\u062f\u064a\u062b\u0627 \u0644\u0644\u0634\u0631\u0643\u0627\u062a \u0641\u064a \u0633\u0648\u0631\u064a\u0627 \u0648\u0644\u0644\u0645\u0633\u062a\u062b\u0645\u0631\u064a\u0646 \u0639\u0628\u0631 \u0627\u0644\u062a\u0633\u0648\u064a\u0642 \u0627\u0644\u062d\u062f\u064a\u062b\u060c \u0627\u0644\u0623\u062a\u0645\u062a\u0629\u060c \u0648\u0623\u0646\u0638\u0645\u0629 \u062c\u0627\u0647\u0632\u0629 \u0644\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064a."
      : "We build modern digital presence for Syrian businesses and foreign investors through up-to-date marketing, automation, and AI-ready systems.",
    product: isRTL ? "\u0627\u0644\u0645\u0646\u062a\u062c" : "Product",
    company: isRTL ? "\u0627\u0644\u0634\u0631\u0643\u0629" : "Company",
    resources: isRTL ? "\u0627\u0644\u0645\u0648\u0627\u0631\u062f" : "Resources",
    rights: isRTL
      ? `\u00a9 ${year} MASAR Marketing. \u062c\u0645\u064a\u0639 \u0627\u0644\u062d\u0642\u0648\u0642 \u0645\u062d\u0641\u0648\u0638\u0629.`
      : `\u00a9 ${year} MASAR Marketing. All rights reserved.`,
  };

  const mapLabel = (item: FooterLink) => item.label[language];

  return (
    <section
      dir={isRTL ? "rtl" : "ltr"}
      className="relative z-20 bg-[#F6F7F9] px-6 pt-5 text-[#0F172A]"
    >
      <div className="mx-auto max-w-7xl border-t border-black/10 pt-12">
        <div
          className={cn(
            "relative grid min-h-[620px] grid-cols-1 gap-12 pb-28 lg:grid-cols-[1.6fr_1fr]",
            isRTL && "text-right"
          )}
        >
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[420px] overflow-hidden">
            <div className="absolute inset-x-0 bottom-[-140px] h-[560px]">
              <FooterGlobe />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_52%,_#F6F7F9_88%)]" />
            </div>
          </div>

          <div className="relative z-10 max-w-[560px] space-y-4">
            <div className={cn("flex items-center gap-3", isRTL && "flex-row-reverse")}>
              <AntigravityLogo className="size-8" />
              <p className={cn("text-[2.2rem] font-semibold tracking-tight", isRTL && "arabic-text")}>{copy.brand}</p>
            </div>
            <p className={cn("text-[1.08rem] leading-8 text-[#667085]", isRTL && "arabic-text")}>{copy.description}</p>
          </div>

          <div className={cn("relative z-10 grid grid-cols-3 gap-8 sm:gap-10", isRTL && "text-right")}>
            <div className="space-y-2.5">
              <h4 className={cn("text-[2rem] font-semibold", isRTL && "arabic-text")}>{copy.product}</h4>
              <ul className="space-y-1.5 text-[1.15rem] text-[#667085]">
                {productLinks.map((item) => (
                  <li key={`${item.href}-${item.label.en}`}>
                    <Link href={item.href} className={cn("hover:text-[#0F172A]", isRTL && "arabic-text")}>
                      {mapLabel(item)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2.5">
              <h4 className={cn("text-[2rem] font-semibold", isRTL && "arabic-text")}>{copy.company}</h4>
              <ul className="space-y-1.5 text-[1.15rem] text-[#667085]">
                {companyLinks.map((item) => (
                  <li key={`${item.href}-${item.label.en}`}>
                    <Link href={item.href} className={cn("hover:text-[#0F172A]", isRTL && "arabic-text")}>
                      {mapLabel(item)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2.5">
              <h4 className={cn("text-[2rem] font-semibold", isRTL && "arabic-text")}>{copy.resources}</h4>
              <ul className="space-y-1.5 text-[1.15rem] text-[#667085]">
                {resourcesLinks.map((item) => (
                  <li key={`${item.href}-${item.label.en}`}>
                    <Link href={item.href} className={cn("hover:text-[#0F172A]", isRTL && "arabic-text")}>
                      {mapLabel(item)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="relative z-10 pb-6">
          <p className={cn("text-sm text-[#8A93A6]", isRTL && "arabic-text text-right")}>{copy.rights}</p>
        </div>
      </div>
    </section>
  );
}
