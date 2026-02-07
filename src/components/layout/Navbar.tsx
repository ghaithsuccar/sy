"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";
import type { Language } from "@/lib/use-language";

const navItems = [
  {
    href: "#services",
    label: { en: "Services", ar: "الخدمات" },
  },
  {
    href: "#case-studies",
    label: { en: "Case Studies", ar: "دراسات الحالة" },
  },
  {
    href: "#about",
    label: { en: "About", ar: "من نحن" },
  },
];

type NavbarProps = {
  language: Language;
  onToggleLanguage: () => void;
};

export default function Navbar({ language, onToggleLanguage }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isRTL = language === "ar";

  const labels = useMemo(
    () => ({
      contact: language === "ar" ? "تواصل معنا" : "Contact Us",
      language: language === "ar" ? "EN" : "AR",
      menu: language === "ar" ? "القائمة" : "Menu",
    }),
    [language]
  );

  return (
    <header className="sticky top-0 z-50 border-b border-[#E2E8F0] bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5">
        <Link href="#top" className="flex items-center gap-2 text-xl font-bold tracking-tight text-[#0F1F1E]">
          <span>OUJ</span>
          <span className="h-6 w-[2px] bg-[#4ED1B2]"></span>
          <span className="font-bold">أوج</span>
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-[#0F1F1E]/70 transition-colors hover:text-[#0F1F1E]"
            >
              {item.label[language]}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-6 md:flex">
          <button
            type="button"
            onClick={onToggleLanguage}
            className="text-xs font-bold uppercase tracking-widest text-[#0F1F1E]/60 transition-colors hover:text-[#0F1F1E]"
          >
            {labels.language}
          </button>
          <Link
            href="#contact"
            className="border-2 border-[#0F1F1E] bg-[#0F1F1E] px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-transparent hover:text-[#0F1F1E]"
          >
            {labels.contact}
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label={labels.menu}
          className="inline-flex items-center justify-center p-2 text-[#0F1F1E] md:hidden"
        >
          <Menu size={24} />
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              className="absolute inset-0 h-full w-full bg-[#0F1F1E]/40 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
              aria-label="Close"
            />
            <motion.aside
              initial={{ x: isRTL ? -320 : 320 }}
              animate={{ x: 0 }}
              exit={{ x: isRTL ? -320 : 320 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={cn(
                "absolute top-0 h-full w-80 bg-white p-8 shadow-2xl",
                isRTL ? "left-0" : "right-0"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0F1F1E]/40">
                  {labels.menu}
                </span>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-[#0F1F1E]"
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="mt-12 flex flex-col gap-6">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-xl font-bold tracking-tight text-[#0F1F1E]"
                  >
                    {item.label[language]}
                  </Link>
                ))}
              </div>

              <div className="mt-12 flex flex-col gap-4">
                <button
                  type="button"
                  onClick={() => {
                    onToggleLanguage();
                    setIsOpen(false);
                  }}
                  className="border border-[#0F1F1E]/10 py-4 text-sm font-bold uppercase tracking-widest text-[#0F1F1E]"
                >
                  {labels.language}
                </button>
                <Link
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="bg-[#0F1F1E] py-4 text-center text-sm font-bold uppercase tracking-widest text-white"
                >
                  {labels.contact}
                </Link>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

