"use client";

import { Facebook, Instagram, Linkedin, Moon, Sun, Youtube } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

import FooterGlobe from "@/components/layout/FooterGlobe";
import { AntigravityLogo } from "@/components/ui/AntigravityLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Language } from "@/lib/use-language";
import { cn } from "@/lib/utils";

type FooterProps = {
  language: Language;
  onToggleLanguage: () => void;
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

export default function Footer({ language, onToggleLanguage }: FooterProps) {
  const isRTL = language === "ar";
  const { resolvedTheme, setTheme } = useTheme();
  const year = new Date().getFullYear();
  const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0 },
  };

  const copy = {
    brand: isRTL ? "\u0645\u0633\u0627\u0631 \u0644\u0644\u062a\u0633\u0648\u064a\u0642" : "MASAR Marketing",
    description: isRTL
      ? "\u0646\u0628\u0646\u064a \u062d\u0636\u0648\u0631\u0627 \u0631\u0642\u0645\u064a\u0627 \u062d\u062f\u064a\u062b\u0627 \u0644\u0644\u0634\u0631\u0643\u0627\u062a \u0641\u064a \u0633\u0648\u0631\u064a\u0627 \u0648\u0644\u0644\u0645\u0633\u062a\u062b\u0645\u0631\u064a\u0646 \u0639\u0628\u0631 \u0627\u0644\u062a\u0633\u0648\u064a\u0642 \u0627\u0644\u062d\u062f\u064a\u062b\u060c \u0627\u0644\u0623\u062a\u0645\u062a\u0629\u060c \u0648\u0623\u0646\u0638\u0645\u0629 \u062c\u0627\u0647\u0632\u0629 \u0644\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064a."
      : "We build modern digital presence for Syrian businesses and foreign investors through up-to-date marketing, automation, and AI-ready systems.",
    product: isRTL ? "\u0627\u0644\u0645\u0646\u062a\u062c" : "Product",
    company: isRTL ? "\u0627\u0644\u0634\u0631\u0643\u0629" : "Company",
    resources: isRTL ? "\u0627\u0644\u0645\u0648\u0627\u0631\u062f" : "Resources",
    contactTitle: isRTL ? "\u062a\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627" : "Quick Contact",
    contactEmail: isRTL ? "\u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a" : "Email",
    contactMessage: isRTL ? "\u0631\u0633\u0627\u0644\u0629 \u0645\u062e\u062a\u0635\u0631\u0629" : "Short message",
    contactAction: isRTL ? "\u0625\u0631\u0633\u0627\u0644" : "Send",
    socialTitle: isRTL ? "\u0627\u0628\u0642 \u0639\u0644\u0649 \u062a\u0648\u0627\u0635\u0644" : "Stay Connected",
    socialText: isRTL
      ? "\u062a\u0627\u0628\u0639 MASAR \u0644\u0644\u062a\u062d\u062f\u064a\u062b\u0627\u062a \u0648\u0627\u0644\u0631\u0624\u0649 \u0627\u0644\u062a\u0633\u0648\u064a\u0642\u064a\u0629."
      : "Follow MASAR for updates and practical digital insights.",
    rights: isRTL
      ? `\u00a9 ${year} MASAR Marketing. \u062c\u0645\u064a\u0639 \u0627\u0644\u062d\u0642\u0648\u0642 \u0645\u062d\u0641\u0648\u0638\u0629.`
      : `\u00a9 ${year} MASAR Marketing. All rights reserved.`,
    privacy: isRTL ? "\u0633\u064a\u0627\u0633\u0629 \u0627\u0644\u062e\u0635\u0648\u0635\u064a\u0629" : "Privacy Policy",
    terms: isRTL ? "\u0627\u0644\u0634\u0631\u0648\u0637 \u0648\u0627\u0644\u0623\u062d\u0643\u0627\u0645" : "Terms & Conditions",
    language: language === "ar" ? "EN" : "AR",
    theme: language === "ar" ? "\u062a\u0628\u062f\u064a\u0644 \u0627\u0644\u0648\u0636\u0639" : "Toggle theme",
  };
  const socialLinks = [
    { label: "Instagram", href: "https://instagram.com", icon: Instagram },
    { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
    { label: "Facebook", href: "https://facebook.com", icon: Facebook },
    { label: "YouTube", href: "https://youtube.com", icon: Youtube },
  ];

  const mapLabel = (item: FooterLink) => item.label[language];

  return (
    <section
      id="contact"
      dir={isRTL ? "rtl" : "ltr"}
      className="relative z-20 bg-white px-6 pt-5 text-[#0F1F1E] dark:bg-[#070D0C] dark:text-[#EAF2EE]"
    >
      <div className="mx-auto max-w-7xl pt-12">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          transition={{ staggerChildren: 0.09, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          dir="ltr"
          className={cn("relative grid min-h-[470px] grid-cols-1 gap-10 pb-4 lg:grid-cols-[1.6fr_1fr]", isRTL && "text-right")}
        >
          <div className="pointer-events-none absolute bottom-0 left-1/2 z-20 h-[330px] w-[min(100%,760px)] -translate-x-1/2 overflow-hidden">
            <div className="absolute inset-x-0 bottom-[-170px] h-[470px]">
              <FooterGlobe />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_66%,_#FFFFFF_96%)] dark:bg-[radial-gradient(circle_at_center,_transparent_66%,_#070D0C_96%)]" />
            </div>
          </div>

          <motion.div variants={fadeUp} className="relative z-10 max-w-[560px] space-y-4 bg-transparent">
            <div className="flex items-center gap-3 text-[#161611] dark:text-[#EAF2EE]">
              <AntigravityLogo
                alt={copy.brand}
                className="inline-flex h-20 aspect-[711/227] items-center justify-start"
              />
            </div>
            <p className={cn("max-w-[52ch] text-[0.96rem] leading-10 text-[#5D5D54] dark:text-[#A9B9B4]", isRTL && "arabic-text")}>{copy.description}</p>
          </motion.div>

          <motion.div variants={fadeUp} className={cn("relative z-10 grid grid-cols-3 gap-8 bg-transparent sm:gap-10", isRTL && "text-right")}>
            <div className="space-y-2.5">
              <h4 className={cn("text-[0.96rem] font-medium text-[#161611] dark:text-[#EAF2EE]", isRTL ? "arabic-text" : "uppercase tracking-[0.04em]")}>{copy.product}</h4>
              <ul className="space-y-1.5 text-[0.96rem] text-[#5D5D54] dark:text-[#A9B9B4]">
                {productLinks.map((item) => (
                  <li key={`${item.href}-${item.label.en}`}>
                    <Link
                      href={item.href}
                      className={cn(
                        "inline-flex items-center rounded-sm px-0.5 transition-colors duration-200 hover:text-[#1C1C16] dark:hover:text-[#EAF2EE]",
                        isRTL && "arabic-text"
                      )}
                    >
                      {mapLabel(item)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2.5">
              <h4 className={cn("text-[0.96rem] font-medium text-[#161611] dark:text-[#EAF2EE]", isRTL ? "arabic-text" : "uppercase tracking-[0.04em]")}>{copy.company}</h4>
              <ul className="space-y-1.5 text-[0.96rem] text-[#5D5D54] dark:text-[#A9B9B4]">
                {companyLinks.map((item) => (
                  <li key={`${item.href}-${item.label.en}`}>
                    <Link
                      href={item.href}
                      className={cn(
                        "inline-flex items-center rounded-sm px-0.5 transition-colors duration-200 hover:text-[#1C1C16] dark:hover:text-[#EAF2EE]",
                        isRTL && "arabic-text"
                      )}
                    >
                      {mapLabel(item)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2.5">
              <h4 className={cn("text-[0.96rem] font-medium text-[#161611] dark:text-[#EAF2EE]", isRTL ? "arabic-text" : "uppercase tracking-[0.04em]")}>{copy.resources}</h4>
              <ul className="space-y-1.5 text-[0.96rem] text-[#5D5D54] dark:text-[#A9B9B4]">
                {resourcesLinks.map((item) => (
                  <li key={`${item.href}-${item.label.en}`}>
                    <Link
                      href={item.href}
                      className={cn(
                        "inline-flex items-center rounded-sm px-0.5 transition-colors duration-200 hover:text-[#1C1C16] dark:hover:text-[#EAF2EE]",
                        isRTL && "arabic-text"
                      )}
                    >
                      {mapLabel(item)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative z-30 col-span-full flex items-center justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={onToggleLanguage}
                aria-label="Toggle language"
                className={cn(
                  "h-9 rounded-full border border-black/10 bg-white/55 px-4 text-[11px] font-semibold text-[#4D4D45] transition-colors hover:bg-[#ECEAE5] hover:text-[#181814] dark:border-white/20 dark:bg-white/5 dark:text-[#D6DDD8] dark:hover:bg-white/12 dark:hover:text-white",
                  isRTL ? "arabic-text tracking-normal" : "uppercase tracking-[0.22em]"
                )}
              >
                {copy.language}
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                aria-label={copy.theme}
                className="h-9 rounded-full border border-black/10 bg-white/55 px-3 text-[#4D4D45] transition-colors hover:bg-[#ECEAE5] hover:text-[#181814] dark:border-white/20 dark:bg-white/5 dark:text-[#D6DDD8] dark:hover:bg-white/12 dark:hover:text-white"
              >
                <Moon className="size-4 dark:hidden" />
                <Sun className="hidden size-4 dark:block" />
              </Button>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className={cn(
              "relative z-10 col-span-full mt-auto flex flex-col gap-6 pb-2 lg:flex-row lg:items-start lg:justify-between",
              isRTL && "lg:flex-row-reverse"
            )}
          >
            <form className="flex w-full max-w-[240px] flex-col gap-2.5" onSubmit={(event) => event.preventDefault()}>
              <p className={cn("text-xs font-medium text-[#161611] dark:text-[#EAF2EE]", isRTL ? "arabic-text" : "uppercase tracking-[0.12em]")}>
                {copy.contactTitle}
              </p>
              <Input
                name="email"
                type="email"
                placeholder={copy.contactEmail}
                className={cn(
                  "h-9 rounded-xl border-black/10 bg-transparent text-sm text-[#0F1F1E] placeholder:text-[#5D5D54]/75 focus-visible:ring-[#4ED1B2] dark:border-white/20 dark:bg-[#0B1413] dark:text-[#EAF2EE] dark:placeholder:text-[#A9B9B4]/70",
                  isRTL && "arabic-text"
                )}
              />
              <textarea
                name="message"
                rows={2}
                placeholder={copy.contactMessage}
                className={cn(
                  "min-h-20 w-full resize-none rounded-xl border border-black/10 bg-transparent px-3 py-2 text-sm text-[#0F1F1E] outline-none placeholder:text-[#5D5D54]/75 focus-visible:ring-2 focus-visible:ring-[#4ED1B2] dark:border-white/20 dark:bg-[#0B1413] dark:text-[#EAF2EE] dark:placeholder:text-[#A9B9B4]/70",
                  isRTL && "arabic-text"
                )}
              />
              <div className={cn("pt-1", isRTL && "text-right")}>
                <Button
                  type="submit"
                  variant="light-solid"
                  className={cn(
                    "h-9 px-4 text-[11px]",
                    isRTL ? "arabic-text" : "uppercase tracking-[0.1em]"
                  )}
                >
                  {copy.contactAction}
                </Button>
              </div>
            </form>

            <div className={cn("flex w-full max-w-[300px] flex-col gap-2.5 lg:items-end", isRTL ? "items-end lg:items-start" : "items-start")}>
              <div className={cn("space-y-2", isRTL ? "text-right lg:text-left" : "lg:text-right")}>
                <p className={cn("text-xs font-medium text-[#161611] dark:text-[#EAF2EE]", isRTL ? "arabic-text" : "uppercase tracking-[0.12em]")}>
                  {copy.socialTitle}
                </p>
                <p className={cn("text-sm leading-7 text-[#5D5D54] dark:text-[#A9B9B4]", isRTL && "arabic-text")}>{copy.socialText}</p>
              </div>

              <div className={cn("flex flex-wrap items-center gap-2 pt-1", isRTL && "justify-end")}>
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="inline-flex size-8 items-center justify-center rounded-xl border border-black/10 text-[#34413F] transition-colors duration-200 hover:border-[#4ED1B2] hover:text-[#22C7AC] dark:border-white/20 dark:text-[#D6E1DD] dark:hover:text-[#5CE1C4]"
                  >
                    <social.icon className="size-3.5" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          className={cn("relative z-10 mt-1 flex items-center justify-between gap-4 pb-3", isRTL && "flex-row-reverse")}
        >
          <p className={cn("text-sm text-[#8A93A6] dark:text-[#A9B9B4]", isRTL && "arabic-text text-right")}>{copy.rights}</p>
          <div className={cn("flex items-center gap-4 text-sm text-[#8A93A6] dark:text-[#A9B9B4]", isRTL && "arabic-text flex-row-reverse")}>
            <Link href="#" className="transition-colors duration-200 hover:text-[#5D5D54] dark:hover:text-[#EAF2EE]">
              {copy.privacy}
            </Link>
            <span aria-hidden="true">|</span>
            <Link href="#" className="transition-colors duration-200 hover:text-[#5D5D54] dark:hover:text-[#EAF2EE]">
              {copy.terms}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
