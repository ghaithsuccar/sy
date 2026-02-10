"use client";

import {
  BookOpenText,
  Boxes,
  BriefcaseBusiness,
  CloudCog,
  Code2,
  Database,
  FileCode2,
  Facebook,
  Globe,
  Instagram,
  Linkedin,
  LifeBuoy,
  Mail,
  MapPin,
  Moon,
  Newspaper,
  Phone,
  ShieldCheck,
  Sparkles,
  Sun,
  Users,
  Youtube,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTheme } from "next-themes";

import MegaMenuContent, { type MegaMenuLinkItem } from "@/components/layout/MegaMenuContent";
import StaggeredMenu from "@/components/layout/StaggeredMenu";
import { AntigravityLogo } from "@/components/ui/AntigravityLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Textarea } from "@/components/ui/textarea";
import type { Language } from "@/lib/use-language";
import { cn } from "@/lib/utils";

const mobileNavItems = [
  {
    href: "#services",
    label: { en: "Services", ar: "الخدمات" },
  },
  {
    href: "#case-studies",
    label: { en: "Solutions", ar: "الحلول" },
  },
  {
    href: "#about",
    label: { en: "About MASAR", ar: "عن مسار" },
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
    label: { en: "Services", ar: "الخدمات" },
    columns: [
      [
        {
          title: "Web Development",
          description: "Fast, modern websites and landing pages built for growth",
          href: "#",
          icon: Code2,
        },
        {
          title: "Branding & Design",
          description: "Brand identity systems, visual assets, and creative direction",
          href: "#",
          icon: Sparkles,
        },
        {
          title: "Basic Web Apps",
          description: "Practical internal tools and client-facing web applications",
          href: "#",
          icon: Boxes,
        },
      ],
      [
        {
          title: "Hosting",
          description: "Reliable hosting and deployment for business-critical websites",
          href: "#",
          icon: CloudCog,
        },
        {
          title: "Technical Support",
          description: "Ongoing support, updates, and continuous optimization",
          href: "#",
          icon: LifeBuoy,
        },
        {
          title: "Launch Packages",
          description: "Structured packages for startups and expanding businesses",
          href: "#",
          icon: BriefcaseBusiness,
        },
      ],
    ],
    preview: {
      title: { en: "Core Services for Modern Business Growth", ar: "خدمات أساسية للنمو الرقمي الحديث" },
      href: "#",
      imageSrc: "/mega/products-preview.svg",
    },
  },
  {
    key: "solutions",
    label: { en: "Visibility", ar: "الظهور الرقمي" },
    columns: [
      [
        {
          title: "SEO",
          description: "Modern SEO foundations for local and international visibility",
          href: "#",
          icon: Globe,
        },
        {
          title: "Google Maps (GMR)",
          description: "Map profile optimization, local authority, and presence signals",
          href: "#",
          icon: MapPin,
        },
        {
          title: "Citations",
          description: "Clean and consistent business listings across key platforms",
          href: "#",
          icon: Boxes,
        },
      ],
      [
        {
          title: "AI Search Presence",
          description: "Structured content for AI overviews and next-gen discovery",
          href: "#",
          icon: ShieldCheck,
        },
        {
          title: "Reputation Management",
          description: "Reviews, ratings, and trust signals that improve conversion",
          href: "#",
          icon: Users,
        },
        {
          title: "Content Optimization",
          description: "Practical content strategy aligned with user intent and search",
          href: "#",
          icon: BookOpenText,
        },
      ],
    ],
    preview: {
      title: { en: "Be Visible in Search and AI Platforms", ar: "كن مرئيا في البحث ومنصات الذكاء الاصطناعي" },
      href: "#",
      imageSrc: "/mega/solutions-preview.svg",
    },
  },
  {
    key: "platform",
    label: { en: "Automation", ar: "الأتمتة" },
    columns: [
      [
        {
          title: "Lead Routing",
          description: "Route leads automatically to the right team and channel",
          href: "#",
          icon: CloudCog,
        },
        {
          title: "Follow-up Workflows",
          description: "Automated follow-up messages and reminders across channels",
          href: "#",
          icon: ShieldCheck,
        },
        {
          title: "Reporting Pipelines",
          description: "Simple dashboards for campaign, lead, and revenue visibility",
          href: "#",
          icon: Newspaper,
        },
      ],
      [
        {
          title: "CRM Integrations",
          description: "Integrate your website and forms with practical CRM workflows",
          href: "#",
          icon: Database,
        },
        {
          title: "Operations Automation",
          description: "Reduce manual tasks with reliable internal automations",
          href: "#",
          icon: ShieldCheck,
        },
        {
          title: "Scalable Systems",
          description: "Future-ready systems built for growth and stability",
          href: "#",
          icon: Globe,
        },
      ],
    ],
    preview: {
      title: { en: "Automation that Saves Time and Cost", ar: "أتمتة عملية توفر الوقت والتكلفة" },
      href: "#",
      imageSrc: "/mega/platform-preview.svg",
      badge: { en: "AI-First", ar: "مدعوم بالذكاء الاصطناعي" },
    },
  },
  {
    key: "resources",
    label: { en: "Resources", ar: "الموارد" },
    columns: [
      [
        {
          title: "Our Story",
          description: "Why MASAR exists and how we approach digital infrastructure",
          href: "#",
          icon: Newspaper,
        },
        {
          title: "Case Use Scenarios",
          description: "Practical examples for Syrian businesses and new investors",
          href: "#case-studies",
          icon: BriefcaseBusiness,
        },
        {
          title: "Service Scope",
          description: "Clear service scope, deliverables, and implementation paths",
          href: "#",
          icon: FileCode2,
        },
      ],
      [
        {
          title: "Methodology",
          description: "Modern methods updated with changes in search and AI systems",
          href: "#proofs",
          icon: Sparkles,
        },
        {
          title: "FAQ",
          description: "Simple answers about timelines, pricing, and collaboration",
          href: "#",
          icon: Users,
        },
        {
          title: "Contact",
          description: "Talk to MASAR and plan your next digital growth phase",
          href: "#contact",
          icon: MapPin,
        },
      ],
    ],
    preview: {
      title: { en: "Modern, Practical, Future-Ready", ar: "حلول حديثة وعملية وجاهزة للمستقبل" },
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
  const { resolvedTheme, setTheme } = useTheme();
  const [activeDesktopMenu, setActiveDesktopMenu] = useState<MenuKey | "">("");
  const [hasScrolled, setHasScrolled] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(84);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastOpenKeyRef = useRef<MenuKey | "">("");
  const navRef = useRef<HTMLElement | null>(null);

  const labels = useMemo(
    () => ({
      language: language === "ar" ? "EN" : "AR",
      theme: language === "ar" ? "تبديل الوضع" : "Toggle theme",
      menu: language === "ar" ? "القائمة" : "Menu",
      contact: language === "ar" ? "تواصل معنا" : "Contact Us",
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

  const isHeaderHidden = hasScrolled && !activeDesktopMenu;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[transform,opacity,color,background-color,border-color] duration-200",
        isHeaderHidden ? "-translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100",
        "border-b border-transparent bg-transparent"
      )}
    >
      <nav
        ref={navRef}
        dir="ltr"
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
          className={cn("flex items-center gap-3 text-[#161611] dark:text-[#EAF2EE]", isRTL && "flex-row-reverse")}
        >
          <AntigravityLogo
            alt="MASAR Marketing"
            priority
            className="inline-flex h-14 aspect-[711/227] items-center justify-start"
          />
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
                  id={`main-nav-trigger-${item.key}`}
                  aria-controls={`main-nav-content-${item.key}`}
                  data-mega-menu-trigger={item.key}
                  onClick={(event) => {
                    event.preventDefault();
                    clearCloseTimeout();
                    setActiveDesktopMenu((prev) => (prev === item.key ? "" : item.key));
                  }}
                  className={cn(
                    "h-10 rounded-full bg-transparent px-4 text-[0.96rem] font-medium text-[#5D5D54] hover:bg-[#ECEAE5] hover:text-[#1C1C16] data-[state=open]:bg-[#ECEAE5] data-[state=open]:text-[#1C1C16] dark:text-[#C9D4CF] dark:hover:bg-white/10 dark:hover:text-white dark:data-[state=open]:bg-white/12 dark:data-[state=open]:text-white",
                    isRTL ? "arabic-text" : "uppercase tracking-[0.04em]"
                  )}
                >
                  {item.label[language]}
                </NavigationMenuTrigger>
                <NavigationMenuContent
                  id={`main-nav-content-${item.key}`}
                  onMouseEnter={clearCloseTimeout}
                  onMouseLeave={scheduleClose}
                  className="md:!fixed md:!left-1/2 md:!right-auto md:!mt-0 md:!w-[min(1120px,calc(100vw-2rem))] md:!max-w-none md:!-translate-x-1/2 !overflow-visible !rounded-2xl !border !border-black/10 bg-[#F8F8F6] !p-0 shadow-[0_22px_40px_rgba(12,12,11,0.08)] dark:!border-[#D9FFF4]/40 dark:bg-[#0F1716] dark:shadow-[0_22px_40px_rgba(0,0,0,0.45),0_0_0_1px_rgba(217,255,244,0.24)]"
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
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            aria-label={labels.theme}
            className={cn(
              "hidden h-10 rounded-full bg-transparent px-2.5 text-[#4D4D45] transition-colors hover:bg-[#ECEAE5] hover:text-[#181814] dark:text-[#D6DDD8] dark:hover:bg-white/10 dark:hover:text-white md:inline-flex",
              isRTL && "order-2"
            )}
          >
            <Moon className="size-4 dark:hidden" />
            <Sun className="hidden size-4 dark:block" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onToggleLanguage}
            aria-label="Toggle language"
            className={cn(
              "hidden h-auto bg-transparent px-0 text-[11px] font-semibold text-[#4D4D45] transition-colors hover:bg-transparent hover:text-[#181814] dark:text-[#D6DDD8] dark:hover:text-white md:inline-flex",
              isRTL ? "arabic-text tracking-normal" : "uppercase tracking-[0.22em]"
            )}
          >
            {labels.language}
          </Button>

          <span className="hidden h-5 w-px bg-black/15 dark:bg-white/20 md:block" aria-hidden="true" />

                    <StaggeredMenu
            position={isRTL ? "left" : "right"}
            items={menuItems}
            menuLabel={labels.contact}
            closeLabel={labels.close}
            accentColor="#4ED1B2"
            triggerIconColor="currentColor"
            colors={["#E6D8B8", "#4ED1B2"]}
            buttonClassName={cn(
              "h-10 rounded-full bg-transparent px-4 text-[0.96rem] font-medium text-[#5D5D54] hover:bg-[#ECEAE5] hover:text-[#1C1C16] dark:text-[#C9D4CF] dark:hover:bg-white/10 dark:hover:text-white",
              isRTL ? "arabic-text tracking-normal" : "uppercase tracking-[0.04em]"
            )}
            isRTL={isRTL}
            customContent={
              <div className="flex flex-col gap-6">
                <div className="space-y-2">
                  <h3 className={cn("text-3xl font-semibold tracking-tight text-[#0F1F1E] dark:text-[#EAF2EE]", isRTL && "arabic-text")}>
                    {language === "ar" ? "لنبن حضورك الرقمي الحديث" : "Build Your Modern Digital Presence"}
                  </h3>
                  <p className={cn("text-sm text-[#0F1F1E]/65 dark:text-[#B8C9C3]", isRTL && "arabic-text")}>
                    {language === "ar"
                      ? "شاركنا أهدافك وسنقترح لك نظاما عمليا للتسويق والأتمتة خلال 24 ساعة."
                      : "Share your goals and we will propose a practical marketing and automation roadmap within 24 hours."}
                  </p>
                </div>

                <div className="grid gap-3 text-sm text-[#0F1F1E] dark:text-[#D6E5E0]">
                  <a href="mailto:hello@masarmarketing.com" className="inline-flex items-center gap-2 hover:text-[#22C7AC] dark:hover:text-[#6DEDD3]">
                    <Mail className="size-4" />
                    <span>hello@masarmarketing.com</span>
                  </a>
                  <a href="tel:+963000000000" className="inline-flex items-center gap-2 hover:text-[#22C7AC] dark:hover:text-[#6DEDD3]">
                    <Phone className="size-4" />
                    <span>+963 000 000 000</span>
                  </a>
                  <p className="inline-flex items-center gap-2">
                    <MapPin className="size-4" />
                    <span>{language === "ar" ? "دمشق، سوريا" : "Damascus, Syria"}</span>
                  </p>
                </div>

                <div className={cn("flex flex-wrap items-center gap-2", isRTL && "justify-end")}>
                  {[
                    { label: "Instagram", href: "https://instagram.com", icon: Instagram },
                    { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
                    { label: "Facebook", href: "https://facebook.com", icon: Facebook },
                    { label: "YouTube", href: "https://youtube.com", icon: Youtube },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.label}
                      className="inline-flex size-10 items-center justify-center rounded-full border border-[#0F1F1E]/10 bg-white/60 text-[#0F1F1E]/75 transition-colors hover:border-[#4ED1B2] hover:text-[#22C7AC] dark:border-white/20 dark:bg-white/10 dark:text-[#D6E5E0] dark:hover:border-[#5CE1C4] dark:hover:text-[#7BF3DB]"
                    >
                      <social.icon className="size-4" />
                    </a>
                  ))}
                </div>

                <form id="contact-drawer-form" className="space-y-3" onSubmit={(event) => event.preventDefault()}>
                  <div className="space-y-2">
                    <Label
                      htmlFor="contact-name"
                      className={cn("text-xs font-semibold uppercase tracking-[0.14em]", isRTL && "arabic-text tracking-normal")}
                    >
                      {language === "ar" ? "الاسم" : "Name"}
                    </Label>
                    <Input
                      id="contact-name"
                      name="name"
                      placeholder={language === "ar" ? "اسمك الكامل" : "Your full name"}
                      className="h-10 rounded-xl border border-[#0F1F1E]/20 bg-white/70 text-[#0F1F1E] placeholder:text-[#6F7A77] dark:border-white/20 dark:bg-white/10 dark:text-[#EAF2EE] dark:placeholder:text-[#A8BCB6]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="contact-email"
                      className={cn("text-xs font-semibold uppercase tracking-[0.14em]", isRTL && "arabic-text tracking-normal")}
                    >
                      {language === "ar" ? "البريد الإلكتروني" : "Email"}
                    </Label>
                    <Input
                      id="contact-email"
                      name="email"
                      type="email"
                      placeholder="name@company.com"
                      className="h-10 rounded-xl border border-[#0F1F1E]/20 bg-white/70 text-[#0F1F1E] placeholder:text-[#6F7A77] dark:border-white/20 dark:bg-white/10 dark:text-[#EAF2EE] dark:placeholder:text-[#A8BCB6]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="contact-message"
                      className={cn("text-xs font-semibold uppercase tracking-[0.14em]", isRTL && "arabic-text tracking-normal")}
                    >
                      {language === "ar" ? "الرسالة" : "Message"}
                    </Label>
                    <Textarea
                      id="contact-message"
                      name="message"
                      placeholder={language === "ar" ? "أخبرنا عن مشروعك..." : "Tell us about your project..."}
                      className="min-h-28 resize-none rounded-xl border border-[#0F1F1E]/20 bg-white/70 text-[#0F1F1E] placeholder:text-[#6F7A77] dark:border-white/20 dark:bg-white/10 dark:text-[#EAF2EE] dark:placeholder:text-[#A8BCB6]"
                    />
                  </div>
                </form>
              </div>
            }
            footer={
              <div className="mt-auto flex flex-col gap-3 pt-2">
                <Button
                  type="button"
                  variant="dark-outline"
                  onClick={onToggleLanguage}
                  className={cn(
                    "h-12 px-7 text-sm",
                    isRTL ? "arabic-text" : "uppercase tracking-widest"
                  )}
                >
                  {labels.language}
                </Button>
                <Button
                  type="submit"
                  form="contact-drawer-form"
                  variant="dark-solid"
                  className={cn(
                    "h-12 px-7 text-sm",
                    isRTL ? "arabic-text" : "uppercase tracking-widest"
                  )}
                >
                  {language === "ar" ? "إرسال الطلب" : "Send Request"}
                </Button>
              </div>
            }
          />
        </div>
      </nav>
    </header>
  );
}

