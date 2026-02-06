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
    <header className="sticky top-0 z-50 border-b border-white/10 bg-white/5 backdrop-blur-md">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="#top" className="flex items-center gap-2 text-lg font-semibold text-white">
          <span className="tracking-wide">Ouj</span>
          <span className="text-[#D4AF37]">|</span>
          <span className="font-semibold">أوج</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              {item.label[language]}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <button
            type="button"
            onClick={onToggleLanguage}
            className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white/80 transition-colors hover:border-[#D4AF37] hover:text-white"
          >
            {labels.language}
          </button>
          <Link
            href="#contact"
            className="rounded-full bg-[#D4AF37] px-5 py-2 text-xs font-semibold uppercase tracking-widest text-black transition-transform hover:scale-[1.02]"
          >
            {labels.contact}
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label={labels.menu}
          className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/10 p-2 text-white/80 transition-colors hover:text-white md:hidden"
        >
          <Menu size={20} />
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
              className="absolute inset-0 h-full w-full bg-black/60"
              onClick={() => setIsOpen(false)}
              aria-label="Close"
            />
            <motion.aside
              initial={{ x: isRTL ? -320 : 320, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: isRTL ? -320 : 320, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              className={cn(
                "absolute top-0 h-full w-72 bg-[#0A0A0A] px-6 py-6 shadow-2xl",
                isRTL ? "left-0" : "right-0"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold uppercase tracking-widest text-white/60">
                  {labels.menu}
                </span>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full border border-white/10 p-2 text-white/80"
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="mt-8 flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-base font-semibold text-white"
                  >
                    {item.label[language]}
                  </Link>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => {
                    onToggleLanguage();
                    setIsOpen(false);
                  }}
                  className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white/80"
                >
                  {labels.language}
                </button>
                <Link
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full bg-[#D4AF37] px-5 py-2 text-center text-xs font-semibold uppercase tracking-widest text-black"
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
