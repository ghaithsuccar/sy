"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import type { Language } from "@/lib/use-language";
import { cn } from "@/lib/utils";

type SiteFooterProps = {
  language: Language;
};

export default function SiteFooter({ language }: SiteFooterProps) {
  const isRTL = language === "ar";
  const year = new Date().getFullYear();

  const labels = {
    title: isRTL ? "مسار للتسويق" : "MASAR Marketing",
    description: isRTL
      ? "وكالة رقمية حديثة في دمشق تساعد الشركات السورية والمستثمرين على بناء حضور رقمي حقيقي عبر التسويق الحديث، الأتمتة، وأنظمة جاهزة للذكاء الاصطناعي."
      : "A modern Damascus-based agency helping Syrian businesses and foreign investors build real online presence through modern marketing, automation, and AI-ready systems.",
    cta: isRTL ? "احجز استشارة" : "Book a Strategy Call",
    portfolio: isRTL ? "الخدمات" : "Services",
    social: isRTL ? "السوشال" : "Social",
    contact: isRTL ? "التواصل" : "Contact",
    rights: isRTL ? `© ${year} MASAR Marketing. جميع الحقوق محفوظة.` : `© ${year} MASAR Marketing. All rights reserved.`,
    terms: isRTL ? "الشروط والأحكام" : "Terms and Conditions",
    privacy: isRTL ? "سياسة الخصوصية" : "Privacy Policy",
  };

  return (
    <footer
      dir={isRTL ? "rtl" : "ltr"}
      className="relative z-20 bg-black px-6 pb-8 pt-20 sm:pb-10 sm:pt-24"
    >
      <div className="mx-auto w-full max-w-6xl rounded-2xl bg-[#F3F5F7] p-7 text-[#111827] sm:p-10">
        <div className={cn("grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]", isRTL && "text-right")}>
          <div className="space-y-5">
            <div className={cn("flex items-center gap-4", isRTL && "flex-row-reverse")}>
              <div className="flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-[#0E1D1A] via-[#18453D] to-[#4ED1B2] text-[11px] font-bold tracking-[0.08em] text-white">
                MASAR
              </div>
              <h3 className={cn("text-3xl font-semibold tracking-tight", isRTL && "arabic-text")}>{labels.title}</h3>
            </div>
            <p className={cn("max-w-sm text-lg leading-relaxed text-[#4B5563]", isRTL && "arabic-text")}>
              {labels.description}
            </p>
            <Button variant="brand-fill" className={cn("h-12 px-7", isRTL && "arabic-text")}>
              {labels.cta}
            </Button>
          </div>

          <div className="space-y-3">
            <h4 className={cn("text-xs font-semibold uppercase tracking-[0.2em] text-[#374151]", isRTL && "arabic-text tracking-normal")}>
              {labels.portfolio}
            </h4>
            <ul className="space-y-2 text-base text-[#4B5563]">
              <li><Link href="#services" className="hover:text-[#111827]">{isRTL ? "تطوير الويب والاستضافة" : "Web Development & Hosting"}</Link></li>
              <li><Link href="#services" className="hover:text-[#111827]">{isRTL ? "التصميم والهوية" : "Design & Branding"}</Link></li>
              <li><Link href="#services" className="hover:text-[#111827]">{isRTL ? "الأتمتة والظهور الرقمي" : "Automation & AI Visibility"}</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className={cn("text-xs font-semibold uppercase tracking-[0.2em] text-[#374151]", isRTL && "arabic-text tracking-normal")}>
              {labels.social}
            </h4>
            <ul className="space-y-2 text-base text-[#4B5563]">
              <li><Link href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[#111827]">Instagram</Link></li>
              <li><Link href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-[#111827]">LinkedIn</Link></li>
              <li><Link href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-[#111827]">Facebook</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className={cn("text-xs font-semibold uppercase tracking-[0.2em] text-[#374151]", isRTL && "arabic-text tracking-normal")}>
              {labels.contact}
            </h4>
            <ul className="space-y-2 text-base text-[#4B5563]">
              <li><a href="tel:+963000000000" className="hover:text-[#111827]">+963 000 000 000</a></li>
              <li><a href="mailto:hello@masarmarketing.com" className="hover:text-[#111827]">hello@masarmarketing.com</a></li>
              <li>{isRTL ? "دمشق - سوريا" : "Damascus - Syria"}</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-[#D1D5DB] pt-6">
          <div className={cn("flex flex-col gap-3 text-sm text-[#6B7280] sm:flex-row sm:items-center sm:justify-between", isRTL && "sm:flex-row-reverse")}>
            <p className={isRTL ? "arabic-text" : ""}>{labels.rights}</p>
            <div className={cn("flex items-center gap-6", isRTL && "flex-row-reverse")}>
              <Link href="#" className={cn("hover:text-[#111827]", isRTL && "arabic-text")}>{labels.terms}</Link>
              <Link href="#" className={cn("hover:text-[#111827]", isRTL && "arabic-text")}>{labels.privacy}</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
