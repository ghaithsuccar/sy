"use client";

import {
  BookOpenText,
  Boxes,
  BriefcaseBusiness,
  CloudCog,
  Code2,
  Database,
  FileCode2,
  Globe,
  Library,
  LifeBuoy,
  Newspaper,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import MegaMenuContent, { type MegaMenuLinkItem } from "@/components/layout/MegaMenuContent";
import StaggeredMenu from "@/components/layout/StaggeredMenu";
import { AntigravityLogo } from "@/components/ui/AntigravityLogo";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import type { Language } from "@/lib/use-language";
import { cn } from "@/lib/utils";

const mobileNavItems = [
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

type MenuKey = "products" | "solutions" | "platform" | "resources";

type MegaMenuItem = {
  key: MenuKey;
  label: { en: string; ar: string };
  columns: [MegaMenuLinkItem[], MegaMenuLinkItem[]];
  preview: {
    title: { en: string; ar: string };
    href: string;
    imageSrc: string;
    badge?: { en: string; ar: string };
  };
};

const megaMenuItems: MegaMenuItem[] = [
  {
    key: "products",
    label: { en: "Products", ar: "المنتجات" },
    columns: [
      [
        {
          title: "Insights",
          description: "Latest company news, updates, and announcements",
          href: "#",
          icon: Newspaper,
        },
        {
          title: "Culture",
          description: "Team values, stories, and experiences",
          href: "#",
          icon: Users,
        },
        {
          title: "API",
          description: "Programmatic access via secure REST endpoints",
          href: "#",
          icon: Globe,
        },
      ],
      [
        {
          title: "Engineering",
          description: "Technical guides, tutorials, and documentation",
          href: "#",
          icon: Code2,
        },
        {
          title: "Press",
          description: "Media mentions, interviews, and publications",
          href: "#",
          icon: BriefcaseBusiness,
        },
        {
          title: "CLI",
          description: "Command line tools for automation workflows",
          href: "#",
          icon: FileCode2,
        },
      ],
    ],
    preview: {
      title: { en: "Build Faster with Product APIs", ar: "أنجز أسرع مع واجهات المنتج" },
      href: "#",
      imageSrc: "/mega/products-preview.svg",
    },
  },
  {
    key: "solutions",
    label: { en: "Solutions", ar: "الحلول" },
    columns: [
      [
        {
          title: "Commerce",
          description: "End-to-end digital commerce foundations",
          href: "#",
          icon: Sparkles,
        },
        {
          title: "Customer Portal",
          description: "Unified user journeys with personalized experiences",
          href: "#",
          icon: Library,
        },
        {
          title: "Automation",
          description: "Operational workflows and internal tooling",
          href: "#",
          icon: Boxes,
        },
      ],
      [
        {
          title: "Finance",
          description: "Reliable payment and reconciliation infrastructure",
          href: "#",
          icon: ShieldCheck,
        },
        {
          title: "Healthcare",
          description: "Secure architecture for regulated environments",
          href: "#",
          icon: LifeBuoy,
        },
        {
          title: "Enterprise",
          description: "Scalable systems for large distributed teams",
          href: "#",
          icon: CloudCog,
        },
      ],
    ],
    preview: {
      title: { en: "Customizable UI Themes and Components", ar: "سمات وواجهات قابلة للتخصيص" },
      href: "#",
      imageSrc: "/mega/solutions-preview.svg",
    },
  },
  {
    key: "platform",
    label: { en: "Platform", ar: "المنصة" },
    columns: [
      [
        {
          title: "Hosting",
          description: "Global infrastructure for scalable web apps",
          href: "#",
          icon: CloudCog,
        },
        {
          title: "Auth",
          description: "Secure authentication and role-based access",
          href: "#",
          icon: ShieldCheck,
        },
        {
          title: "Database",
          description: "Reliable, low-latency storage for core data",
          href: "#",
          icon: Database,
        },
      ],
      [
        {
          title: "Components",
          description: "Reusable blocks for consistent interfaces",
          href: "#",
          icon: Library,
        },
        {
          title: "Tokens",
          description: "Design token system for branding consistency",
          href: "#",
          icon: Boxes,
        },
        {
          title: "SDKs",
          description: "Typed client libraries across major runtimes",
          href: "#",
          icon: BookOpenText,
        },
      ],
    ],
    preview: {
      title: { en: "Explore New Components", ar: "استكشف مكونات جديدة" },
      href: "#",
      imageSrc: "/mega/platform-preview.svg",
      badge: { en: "New", ar: "جديد" },
    },
  },
  {
    key: "resources",
    label: { en: "Resources", ar: "الموارد" },
    columns: [
      [
        {
          title: "Guides",
          description: "Step-by-step playbooks for modern teams",
          href: "#",
          icon: BookOpenText,
        },
        {
          title: "Case Studies",
          description: "How teams ship measurable outcomes",
          href: "#",
          icon: BriefcaseBusiness,
        },
        {
          title: "Documentation",
          description: "Reference material for APIs and tooling",
          href: "#",
          icon: FileCode2,
        },
      ],
      [
        {
          title: "Changelog",
          description: "Product releases and lifecycle updates",
          href: "#",
          icon: Newspaper,
        },
        {
          title: "Community",
          description: "Join discussions and share best practices",
          href: "#",
          icon: Users,
        },
        {
          title: "Support",
          description: "Help center and onboarding assistance",
          href: "#",
          icon: LifeBuoy,
        },
      ],
    ],
    preview: {
      title: { en: "Learn Faster with Expert Playbooks", ar: "تعلم أسرع مع أدلة الخبراء" },
      href: "#",
      imageSrc: "/mega/resources-preview.svg",
    },
  },
];

type NavbarProps = {
  language: Language;
  onToggleLanguage: () => void;
};

export default function Navbar({ language, onToggleLanguage }: NavbarProps) {
  const isRTL = language === "ar";
  const [activeDesktopMenu, setActiveDesktopMenu] = useState<MenuKey | "">("");
  const [heroInView, setHeroInView] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(84);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastOpenKeyRef = useRef<MenuKey | "">("");
  const navRef = useRef<HTMLElement | null>(null);

  const labels = useMemo(
    () => ({
      language: language === "ar" ? "EN" : "AR",
      menu: language === "ar" ? "القائمة" : "Menu",
      close: language === "ar" ? "إغلاق" : "Close",
      home: language === "ar" ? "الرئيسية" : "Home",
    }),
    [language]
  );

  const menuItems = useMemo(
    () =>
      mobileNavItems.map((item) => ({
        href: item.href,
        label: item.label[language],
        ariaLabel: item.label[language],
      })),
    [language]
  );

  const clearCloseTimeout = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    clearCloseTimeout();
    closeTimeoutRef.current = setTimeout(() => {
      setActiveDesktopMenu("");
    }, 130);
  }, [clearCloseTimeout]);

  const closeDesktopMenu = useCallback(
    (restoreFocus: boolean) => {
      const currentKey = lastOpenKeyRef.current;
      setActiveDesktopMenu("");
      if (!restoreFocus || !currentKey) return;

      requestAnimationFrame(() => {
        const trigger = document.querySelector<HTMLButtonElement>(
          `[data-mega-menu-trigger="${currentKey}"]`
        );
        trigger?.focus();
      });
    },
    []
  );

  useEffect(() => {
    if (!activeDesktopMenu) return;
    lastOpenKeyRef.current = activeDesktopMenu;
  }, [activeDesktopMenu]);

  useEffect(() => {
    return () => clearCloseTimeout();
  }, [clearCloseTimeout]);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeroInView(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const updateHeight = () => setHeaderHeight(nav.offsetHeight);
    updateHeight();

    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(nav);

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setHasScrolled(window.scrollY > 4);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHeaderTransparent = heroInView && !activeDesktopMenu;
  const isHeaderHidden = hasScrolled && !activeDesktopMenu;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-[transform,opacity,color,background-color,border-color] duration-200",
        isHeaderHidden ? "-translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100",
        isHeaderTransparent ? "border-b border-transparent bg-transparent" : "border-b border-black/10 bg-white/92 backdrop-blur-xl"
      )}
    >
      <nav
        ref={navRef}
        aria-label="Primary"
        onMouseEnter={clearCloseTimeout}
        onMouseLeave={scheduleClose}
        onKeyDown={(event) => {
          if (event.key === "Escape" && activeDesktopMenu) {
            event.preventDefault();
            closeDesktopMenu(true);
          }
        }}
        className="relative mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 py-5"
      >
        <Link
          href={`/${language}`}
          aria-label={labels.home}
          className={cn("flex items-center gap-3 text-[#161611]", isRTL && "flex-row-reverse")}
        >
          <AntigravityLogo className="size-5" />
          <span className={cn("text-[1.8rem] font-semibold tracking-tight", isRTL && "arabic-text")}>OUJ</span>
        </Link>

        <NavigationMenu
          viewport={false}
          value={activeDesktopMenu}
          onValueChange={(value) => setActiveDesktopMenu((value as MenuKey) || "")}
          className="absolute left-1/2 hidden -translate-x-1/2 md:flex"
        >
          <NavigationMenuList className={cn("gap-2", isRTL && "flex-row-reverse")}>
            {megaMenuItems.map((item) => (
              <NavigationMenuItem
                key={item.key}
                value={item.key}
                onMouseEnter={() => {
                  clearCloseTimeout();
                  setActiveDesktopMenu(item.key);
                }}
              >
                <NavigationMenuTrigger
                  data-mega-menu-trigger={item.key}
                  onClick={(event) => {
                    event.preventDefault();
                    clearCloseTimeout();
                    setActiveDesktopMenu((prev) => (prev === item.key ? "" : item.key));
                  }}
                  className={cn(
                    "h-10 rounded-md bg-transparent px-4 text-[0.96rem] font-medium text-[#5D5D54] hover:bg-[#ECEAE5] hover:text-[#1C1C16] data-[state=open]:bg-[#ECEAE5] data-[state=open]:text-[#1C1C16]",
                    isRTL && "arabic-text"
                  )}
                >
                  {item.label[language]}
                </NavigationMenuTrigger>
                <NavigationMenuContent
                  onMouseEnter={clearCloseTimeout}
                  onMouseLeave={scheduleClose}
                  className="md:!fixed md:!left-1/2 md:!right-auto md:!mt-0 md:!w-[min(1120px,calc(100vw-2rem))] md:!max-w-none md:!-translate-x-1/2 !overflow-visible !rounded-2xl !border !border-black/10 bg-[#F8F8F6] !p-0 shadow-[0_22px_40px_rgba(12,12,11,0.08)]"
                  style={{ top: `${headerHeight}px` }}
                >
                  <div className="w-full">
                    <MegaMenuContent
                      columns={item.columns}
                      preview={{
                        title: item.preview.title[language],
                        href: item.preview.href,
                        imageSrc: item.preview.imageSrc,
                        badge: item.preview.badge?.[language],
                      }}
                      isRTL={isRTL}
                      onItemSelect={() => closeDesktopMenu(false)}
                    />
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className={cn("flex items-center gap-3", isRTL && "flex-row-reverse")}>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onToggleLanguage}
            aria-label="Toggle language"
            className={cn(
              "hidden h-auto bg-transparent px-0 text-[11px] font-semibold text-[#4D4D45] transition-colors hover:bg-transparent hover:text-[#181814] md:inline-flex",
              isRTL ? "arabic-text tracking-normal" : "uppercase tracking-[0.22em]"
            )}
          >
            {labels.language}
          </Button>

          <span className="hidden h-5 w-px bg-black/15 md:block" aria-hidden="true" />

          <StaggeredMenu
          position={isRTL ? "left" : "right"}
          items={menuItems}
          menuLabel={labels.menu}
          closeLabel={labels.close}
          accentColor="#4ED1B2"
          triggerIconColor="#FF5B4A"
          colors={["#E6D8B8", "#4ED1B2"]}
          displayItemNumbering
          buttonClassName={cn(
            "px-0 py-0 text-sm font-bold tracking-[0.16em] text-[#101010] hover:bg-transparent",
            isRTL && "arabic-text tracking-normal"
          )}
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
                <Link href="#contact">{language === "ar" ? "تواصل معنا" : "Contact Us"}</Link>
              </Button>
            </div>
          }
          />
        </div>
      </nav>
    </header>
  );
}
