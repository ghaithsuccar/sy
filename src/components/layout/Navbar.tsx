"use client";

import Link from "next/link";
import { useMemo } from "react";

import StaggeredMenu from "@/components/layout/StaggeredMenu";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import type { Language } from "@/lib/use-language";
import { cn } from "@/lib/utils";

const navItems = [
  {
    href: "#services",
    label: { en: "Services", ar: "\u0627\u0644\u062e\u062f\u0645\u0627\u062a" },
  },
  {
    href: "#case-studies",
    label: { en: "Case Studies", ar: "\u062f\u0631\u0627\u0633\u0627\u062a \u0627\u0644\u062d\u0627\u0644\u0629" },
  },
  {
    href: "#about",
    label: { en: "About", ar: "\u0645\u0646 \u0646\u062d\u0646" },
  },
];

type NavbarProps = {
  language: Language;
  onToggleLanguage: () => void;
};

export default function Navbar({ language, onToggleLanguage }: NavbarProps) {
  const isRTL = language === "ar";

  const labels = useMemo(
    () => ({
      contact: language === "ar" ? "\u062a\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627" : "Contact Us",
      language: language === "ar" ? "EN" : "AR",
      menu: language === "ar" ? "\u0627\u0644\u0642\u0627\u0626\u0645\u0629" : "Menu",
      close: language === "ar" ? "\u0625\u063a\u0644\u0627\u0642" : "Close",
    }),
    [language]
  );

  const menuItems = useMemo(
    () =>
      navItems.map((item) => ({
        href: item.href,
        label: item.label[language],
        ariaLabel: item.label[language],
      })),
    [language]
  );

  return (
    <header className="sticky top-0 z-50 border-b border-white/40 bg-white/80 backdrop-blur-xl shadow-[0_6px_30px_rgba(15,31,30,0.08)]">
      <nav
        aria-label="Primary"
        className={cn(
          "relative mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 py-4",
          isRTL && "flex-row-reverse"
        )}
      >
        <Link
          href="#top"
          aria-label="OUJ home"
          className="group flex items-center gap-3 text-[#0F1F1E]"
        >
          <span className="text-xl font-black tracking-tight">OUJ</span>
          <span className="h-6 w-[1px] bg-[#0F1F1E]/30" />
          <span className={cn("text-sm font-semibold tracking-[0.3em] uppercase", isRTL && "arabic-text")}>
            {"\u0623\u0648\u062c"}
          </span>
        </Link>

        <NavigationMenu viewport={false} className="hidden md:flex">
          <NavigationMenuList className="gap-10">
            {navItems.map((item) => (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink
                  asChild
                  className="bg-transparent p-0 text-sm font-semibold text-[#0F1F1E]/70 shadow-none hover:bg-transparent hover:text-[#0F1F1E] focus:bg-transparent"
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "relative transition-colors after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-[#4ED1B2] after:transition-all hover:after:w-full",
                      isRTL && "arabic-text"
                    )}
                  >
                    {item.label[language]}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className={cn("hidden items-center gap-6 md:flex", isRTL && "flex-row-reverse")}>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onToggleLanguage}
            aria-label="Toggle language"
            className={cn(
              "h-auto rounded-full border border-transparent px-3 py-2 text-xs font-bold text-[#0F1F1E]/70 transition-all hover:border-[#0F1F1E]/20 hover:bg-transparent hover:text-[#0F1F1E]",
              isRTL ? "arabic-text" : "uppercase tracking-widest"
            )}
          >
            {labels.language}
          </Button>
          <Button
            asChild
            size="sm"
            className={cn(
              "h-auto rounded-full border border-[#0F1F1E] bg-[#0F1F1E] px-6 py-2.5 text-xs font-bold text-white shadow-[0_12px_20px_rgba(15,31,30,0.25)] transition-all hover:-translate-y-0.5 hover:bg-transparent hover:text-[#0F1F1E]",
              isRTL ? "arabic-text" : "uppercase tracking-widest"
            )}
          >
            <Link href="#contact">{labels.contact}</Link>
          </Button>
        </div>

        <StaggeredMenu
          position={isRTL ? "left" : "right"}
          items={menuItems}
          menuLabel={labels.menu}
          closeLabel={labels.close}
          accentColor="#4ED1B2"
          colors={["#E6D8B8", "#4ED1B2"]}
          displayItemNumbering
          buttonClassName="rounded-full border border-[#0F1F1E]/20 bg-white px-3 py-2 shadow-sm hover:bg-[#0F1F1E]/5"
          isRTL={isRTL}
          footer={
            <div className="mt-auto flex flex-col gap-4 pt-8">
              <Button
                type="button"
                variant="outline"
                onClick={onToggleLanguage}
                className={cn(
                  "h-auto border-[#0F1F1E]/10 py-4 text-sm font-bold text-[#0F1F1E]",
                  isRTL ? "arabic-text" : "uppercase tracking-widest"
                )}
              >
                {labels.language}
              </Button>
              <Button
                asChild
                className={cn(
                  "h-auto bg-[#0F1F1E] py-4 text-sm font-bold text-white",
                  isRTL ? "arabic-text" : "uppercase tracking-widest"
                )}
              >
                <Link href="#contact">{labels.contact}</Link>
              </Button>
            </div>
          }
        />
      </nav>
    </header>
  );
}
