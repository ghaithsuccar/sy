"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import type { Language } from "@/lib/use-language";

const navItems = [
  {
    href: "#services",
    label: { en: "Services", ar: "Ø§Ù„Ø®Ø¯Ù…Ø§Øª" },
  },
  {
    href: "#case-studies",
    label: { en: "Case Studies", ar: "Ø¯Ø±Ø§Ø³Ø§Øª Ø§Ù„Ø­Ø§Ù„Ø©" },
  },
  {
    href: "#about",
    label: { en: "About", ar: "Ù…Ù† Ù†Ø­Ù†" },
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
      contact: language === "ar" ? "ØªÙˆØ§ØµÙ„ Ù…Ø¹Ù†Ø§" : "Contact Us",
      language: language === "ar" ? "EN" : "AR",
      menu: language === "ar" ? "Ø§Ù„Ù‚Ø§Ø¦Ù…Ø©" : "Menu",
    }),
    [language]
  );

  return (
    <header className="sticky top-0 z-50 border-b border-[#E2E8F0] bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5">
        <Link href="#top" className="flex items-center gap-2 text-xl font-bold tracking-tight text-[#0F1F1E]">
          <span>OUJ</span>
          <span className="h-6 w-[2px] bg-[#4ED1B2]"></span>
          <span className="font-bold">Ø£ÙˆØ¬</span>
        </Link>

        <NavigationMenu viewport={false} className="hidden md:flex">
          <NavigationMenuList className="gap-10">
            {navItems.map((item) => (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink
                  asChild
                  className="bg-transparent p-0 text-sm font-semibold text-[#0F1F1E]/70 shadow-none hover:bg-transparent hover:text-[#0F1F1E] focus:bg-transparent"
                >
                  <Link href={item.href}>{item.label[language]}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden items-center gap-6 md:flex">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onToggleLanguage}
            className="h-auto text-xs font-bold uppercase tracking-widest text-[#0F1F1E]/60 transition-colors hover:bg-transparent hover:text-[#0F1F1E]"
          >
            {labels.language}
          </Button>
          <Button
            asChild
            size="sm"
            className="h-auto rounded-full border-2 border-[#0F1F1E] bg-[#0F1F1E] px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-transparent hover:text-[#0F1F1E]"
          >
            <Link href="#contact">{labels.contact}</Link>
          </Button>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={labels.menu}
              className="text-[#0F1F1E] md:hidden"
            >
              <Menu size={24} />
            </Button>
          </SheetTrigger>
          <SheetContent side={isRTL ? "left" : "right"} className={cn("w-80 p-0", isRTL && "text-right")}>
            <SheetHeader className="border-b border-border px-6 py-5">
              <SheetTitle className="text-xs font-bold uppercase tracking-[0.2em] text-[#0F1F1E]/40">
                {labels.menu}
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-1 flex-col gap-6 px-6 py-10">
              {navItems.map((item) => (
                <SheetClose key={item.href} asChild>
                  <Link
                    href={item.href}
                    className="text-xl font-bold tracking-tight text-[#0F1F1E]"
                  >
                    {item.label[language]}
                  </Link>
                </SheetClose>
              ))}
            </div>
            <div className="mt-auto flex flex-col gap-4 px-6 pb-8">
              <SheetClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  onClick={onToggleLanguage}
                  className="h-auto border-[#0F1F1E]/10 py-4 text-sm font-bold uppercase tracking-widest text-[#0F1F1E]"
                >
                  {labels.language}
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <Button
                  asChild
                  className="h-auto bg-[#0F1F1E] py-4 text-sm font-bold uppercase tracking-widest text-white"
                >
                  <Link href="#contact">{labels.contact}</Link>
                </Button>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
