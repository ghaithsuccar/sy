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
  Library,
  Linkedin,
  LifeBuoy,
  Mail,
  MapPin,
  Newspaper,
  Phone,
  ShieldCheck,
  Sparkles,
  Users,
  Youtube,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

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
          icon: Newspaper,
        },
        {
          title: "Branding & Design",
          description: "Brand identity systems, visual assets, and creative direction",
          href: "#",
          icon: Users,
        },
        {
          title: "Basic Web Apps",
          description: "Practical internal tools and client-facing web applications",
          href: "#",
          icon: Globe,
        },
      ],
      [
        {
          title: "Hosting",
          description: "Reliable hosting and deployment for business-critical websites",
          href: "#",
          icon: Code2,
        },
        {
          title: "Technical Support",
          description: "Ongoing support, updates, and continuous optimization",
          href: "#",
          icon: BriefcaseBusiness,
        },
        {
          title: "Launch Packages",
          description: "Structured packages for startups and expanding businesses",
          href: "#",
          icon: FileCode2,
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
          icon: Sparkles,
        },
        {
          title: "Google Maps (GMR)",
          description: "Map profile optimization, local authority, and presence signals",
          href: "#",
          icon: Library,
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
          icon: LifeBuoy,
        },
        {
          title: "Content Optimization",
          description: "Practical content strategy aligned with user intent and search",
          href: "#",
          icon: CloudCog,
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
          icon: Database,
        },
      ],
      [
        {
          title: "CRM Integrations",
          description: "Integrate your website and forms with practical CRM workflows",
          href: "#",
          icon: Library,
        },
        {
          title: "Operations Automation",
          description: "Reduce manual tasks with reliable internal automations",
          href: "#",
          icon: Boxes,
        },
        {
          title: "Scalable Systems",
          description: "Future-ready systems built for growth and stability",
          href: "#",
          icon: BookOpenText,
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
          icon: BookOpenText,
        },
        {
          title: "Case Use Scenarios",
          description: "Practical examples for Syrian businesses and new investors",
          href: "#",
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
          href: "#",
          icon: Newspaper,
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
          href: "#",
          icon: LifeBuoy,
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
          <span className={cn("text-[1.8rem] font-semibold tracking-tight", isRTL && "arabic-text")}>MASAR</span>
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
                    "h-10 rounded-md bg-transparent px-4 text-[0.96rem] font-medium text-[#5D5D54] hover:bg-[#ECEAE5] hover:text-[#1C1C16] data-[state=open]:bg-[#ECEAE5] data-[state=open]:text-[#1C1C16]",
                    isRTL ? "arabic-text" : "uppercase tracking-[0.04em]"
                  )}
                >
                  {item.label[language]}
                </NavigationMenuTrigger>
                <NavigationMenuContent
                  id={`main-nav-content-${item.key}`}
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
            menuLabel={labels.contact}
            closeLabel={labels.close}
            accentColor="#4ED1B2"
            triggerIconColor="currentColor"
            colors={["#E6D8B8", "#4ED1B2"]}
            buttonClassName={cn(
              "h-10 rounded-md bg-transparent px-4 text-[0.96rem] font-medium text-[#5D5D54] hover:bg-[#ECEAE5] hover:text-[#1C1C16]",
              isRTL ? "arabic-text tracking-normal" : "uppercase tracking-[0.04em]"
            )}
            isRTL={isRTL}
            customContent={
              <div className="flex flex-col gap-6">
                <div className="space-y-2">
                  <h3 className={cn("text-3xl font-semibold tracking-tight text-[#0F1F1E]", isRTL && "arabic-text")}>
                    {language === "ar" ? "لنبن حضورك الرقمي الحديث" : "Build Your Modern Digital Presence"}
                  </h3>
                  <p className={cn("text-sm text-[#0F1F1E]/65", isRTL && "arabic-text")}>
                    {language === "ar"
                      ? "شاركنا أهدافك وسنقترح لك نظاما عمليا للتسويق والأتمتة خلال 24 ساعة."
                      : "Share your goals and we will propose a practical marketing and automation roadmap within 24 hours."}
                  </p>
                </div>

                <div className="grid gap-3 text-sm text-[#0F1F1E]">
                  <a href="mailto:hello@masarmarketing.com" className="inline-flex items-center gap-2 hover:text-[#22C7AC]">
                    <Mail className="size-4" />
                    <span>hello@masarmarketing.com</span>
                  </a>
                  <a href="tel:+963000000000" className="inline-flex items-center gap-2 hover:text-[#22C7AC]">
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
                      className="inline-flex size-10 items-center justify-center rounded-full border border-[#0F1F1E]/10 bg-white/60 text-[#0F1F1E]/75 transition-colors hover:border-[#4ED1B2] hover:text-[#22C7AC]"
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
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="contact-email"
                      className={cn("text-xs font-semibold uppercase tracking-[0.14em]", isRTL && "arabic-text tracking-normal")}
                    >
                      {language === "ar" ? "البريد الإلكتروني" : "Email"}
                    </Label>
                    <Input id="contact-email" name="email" type="email" placeholder="name@company.com" />
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
                      className="min-h-28 resize-none"
                    />
                  </div>
                </form>
              </div>
            }
            footer={
              <div className="mt-auto flex flex-col gap-3 pt-2">
                <Button
                  type="button"
                  variant="brand-outline"
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
                  variant="brand-fill"
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

