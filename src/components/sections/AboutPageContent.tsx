"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ArrowRight, Check, Gauge, Sparkles, Target, Workflow, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";

import AboutOrbScene from "@/components/sections/about/AboutOrbScene";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Language } from "@/lib/use-language";
import { cn } from "@/lib/utils";

type Highlight = {
  key: string;
  icon: LucideIcon;
  title: { en: string; ar: string };
  body: { en: string; ar: string };
};

type StoryPoint = {
  key: string;
  year: string;
  title: { en: string; ar: string };
  body: { en: string; ar: string };
};

type ValueItem = {
  key: string;
  title: { en: string; ar: string };
  body: { en: string; ar: string };
};

type ProcessItem = {
  key: string;
  step: string;
  title: { en: string; ar: string };
  body: { en: string; ar: string };
};

type CapabilityGroup = {
  key: string;
  title: { en: string; ar: string };
  items: { en: string; ar: string }[];
};

type ProofItem = {
  key: string;
  value: string;
  label: { en: string; ar: string };
  body: { en: string; ar: string };
};

type ComparisonColumnKey = "speed" | "flexibility" | "quality" | "scalability" | "cost";

type ComparisonScore = "yes" | "mixed" | "no";

type ComparisonColumn = {
  key: ComparisonColumnKey;
  label: { en: string; ar: string };
};

type ComparisonRow = {
  key: string;
  name: { en: string; ar: string };
  body: { en: string; ar: string };
  scores: Record<ComparisonColumnKey, ComparisonScore>;
  highlight?: boolean;
};

const highlights: Highlight[] = [
  {
    key: "strategy",
    icon: Target,
    title: { en: "Business-First Strategy", ar: "استراتيجية تبدأ من هدف العمل" },
    body: {
      en: "Every channel and campaign decision maps to concrete business outcomes.",
      ar: "كل قرار في القنوات والحملات يرتبط بنتيجة تجارية واضحة.",
    },
  },
  {
    key: "execution",
    icon: Workflow,
    title: { en: "Execution Ownership", ar: "ملكية واضحة للتنفيذ" },
    body: {
      en: "From planning to launch, we own delivery quality and timeline discipline.",
      ar: "من التخطيط حتى الإطلاق نتحمل مسؤولية جودة التنفيذ والانضباط الزمني.",
    },
  },
  {
    key: "visibility",
    icon: Gauge,
    title: { en: "Clear Performance Visibility", ar: "وضوح كامل في الأداء" },
    body: {
      en: "Simple reporting connects spend, operations, and growth decisions.",
      ar: "تقارير واضحة تربط الإنفاق والتشغيل وقرارات النمو.",
    },
  },
];

const storyPoints: StoryPoint[] = [
  {
    key: "2019",
    year: "2019",
    title: { en: "Founded in Damascus", ar: "انطلقت من دمشق" },
    body: {
      en: "MASAR began by helping local businesses replace fragmented marketing with structured systems.",
      ar: "بدأت مسار بمساعدة الشركات المحلية على استبدال التسويق المتفرق بأنظمة واضحة.",
    },
  },
  {
    key: "2022",
    year: "2022",
    title: { en: "Expanded into full-funnel operations", ar: "توسعت إلى تشغيل كامل المسار" },
    body: {
      en: "We moved from campaign execution into integrated infrastructure: web, automation, and attribution.",
      ar: "انتقلنا من تنفيذ الحملات إلى بنية متكاملة تشمل الويب والأتمتة وتتبع النتائج.",
    },
  },
  {
    key: "today",
    year: "Today",
    title: { en: "AI-ready growth systems", ar: "أنظمة نمو جاهزة للذكاء الاصطناعي" },
    body: {
      en: "Our approach is built for modern search behavior and continuous platform shifts.",
      ar: "منهجنا مصمم لسلوك البحث الحديث والتغير المستمر في المنصات.",
    },
  },
];

const values: ValueItem[] = [
  {
    key: "clarity",
    title: { en: "Clarity", ar: "الوضوح" },
    body: {
      en: "Clear scope, measurable outcomes, and explicit ownership from day one.",
      ar: "نطاق واضح ونتائج قابلة للقياس ومسؤوليات محددة منذ اليوم الأول.",
    },
  },
  {
    key: "accountability",
    title: { en: "Accountability", ar: "المسؤولية" },
    body: {
      en: "We report progress transparently and optimize based on evidence, not assumptions.",
      ar: "نشارك التقدم بشفافية ونحسن العمل وفق البيانات لا الافتراضات.",
    },
  },
  {
    key: "practical-innovation",
    title: { en: "Practical Innovation", ar: "ابتكار عملي" },
    body: {
      en: "We adopt new tools only when they improve speed, quality, or growth.",
      ar: "نعتمد الأدوات الجديدة فقط عندما ترفع الجودة أو السرعة أو النمو.",
    },
  },
  {
    key: "partnership",
    title: { en: "Long-Term Partnership", ar: "شراكة طويلة المدى" },
    body: {
      en: "We build systems your internal team can sustain and scale over time.",
      ar: "نبني أنظمة يستطيع فريقك الداخلي تشغيلها وتوسيعها مع الوقت.",
    },
  },
];

const processItems: ProcessItem[] = [
  {
    key: "discover",
    step: "01",
    title: { en: "Discover", ar: "الاستكشاف" },
    body: {
      en: "Audit current funnel, offers, and blockers to identify the real leverage point.",
      ar: "نراجع المسار الحالي والعروض والعوائق لتحديد نقطة التأثير الحقيقية.",
    },
  },
  {
    key: "architect",
    step: "02",
    title: { en: "Architect", ar: "التصميم" },
    body: {
      en: "Build a roadmap that aligns channels, operations, and conversion logic.",
      ar: "نصمم خارطة طريق تربط القنوات والتشغيل ومنطق التحويل.",
    },
  },
  {
    key: "execute",
    step: "03",
    title: { en: "Execute", ar: "التنفيذ" },
    body: {
      en: "Ship with tight QA and clear milestone ownership across teams.",
      ar: "ننطلق بضبط جودة دقيق ومسؤولية واضحة لكل مرحلة.",
    },
  },
  {
    key: "optimize",
    step: "04",
    title: { en: "Optimize", ar: "التحسين" },
    body: {
      en: "Iterate weekly based on signal quality, not just vanity metrics.",
      ar: "نطور أسبوعيا حسب جودة الإشارات وليس الأرقام الشكلية.",
    },
  },
];

const capabilityGroups: CapabilityGroup[] = [
  {
    key: "growth",
    title: { en: "Growth Marketing", ar: "تسويق النمو" },
    items: [
      { en: "SEO and AI search visibility", ar: "السيو والظهور في البحث المعتمد على الذكاء الاصطناعي" },
      { en: "Paid campaign operations", ar: "تشغيل الحملات الإعلانية" },
      { en: "Message and conversion refinement", ar: "تحسين الرسائل والتحويل" },
    ],
  },
  {
    key: "infrastructure",
    title: { en: "Digital Infrastructure", ar: "البنية الرقمية" },
    items: [
      { en: "Websites and landing systems", ar: "المواقع وأنظمة صفحات الهبوط" },
      { en: "Analytics and attribution setup", ar: "تهيئة التحليلات وتتبع النتائج" },
      { en: "Content and channel architecture", ar: "هيكلة المحتوى والقنوات" },
    ],
  },
  {
    key: "automation",
    title: { en: "Automation & Intelligence", ar: "الأتمتة والذكاء" },
    items: [
      { en: "Lead routing and workflow automation", ar: "توجيه العملاء المحتملين وأتمتة سير العمل" },
      { en: "CRM and operations integrations", ar: "تكامل إدارة العملاء مع التشغيل" },
      { en: "Decision-speed reporting pipelines", ar: "مسارات تقارير تسرع اتخاذ القرار" },
    ],
  },
];

const proofItems: ProofItem[] = [
  {
    key: "quality",
    value: "3.2x",
    label: { en: "Qualified Pipeline", ar: "نمو العملاء المؤهلين" },
    body: {
      en: "Higher intent inbound demand through tighter targeting and messaging.",
      ar: "طلب وارد بجودة أعلى عبر استهداف ورسائل أدق.",
    },
  },
  {
    key: "speed",
    value: "42%",
    label: { en: "Faster Response Operations", ar: "تحسن سرعة الاستجابة التشغيلية" },
    body: {
      en: "Automation reduced response lag and improved follow-up consistency.",
      ar: "الأتمتة خفضت التأخير وحسنت الاتساق في المتابعة.",
    },
  },
  {
    key: "clarity",
    value: "89%",
    label: { en: "Attribution Confidence", ar: "ثقة أعلى في قياس النتائج" },
    body: {
      en: "Cleaner tracking created stronger confidence in budget allocation.",
      ar: "تتبع أوضح رفع الثقة في قرارات توزيع الميزانية.",
    },
  },
];

const comparisonColumns: ComparisonColumn[] = [
  { key: "speed", label: { en: "Speed", ar: "السرعة" } },
  { key: "flexibility", label: { en: "Flexibility", ar: "المرونة" } },
  { key: "quality", label: { en: "Quality", ar: "الجودة" } },
  { key: "scalability", label: { en: "Scalability", ar: "القابلية للتوسع" } },
  { key: "cost", label: { en: "Cost Efficiency", ar: "كفاءة التكلفة" } },
];

const comparisonRows: ComparisonRow[] = [
  {
    key: "masar",
    name: { en: "MASAR", ar: "مسار" },
    body: {
      en: "Unified strategy, execution, and automation under one accountable team.",
      ar: "استراتيجية وتنفيذ وأتمتة موحدة ضمن فريق واحد بمسؤولية واضحة.",
    },
    scores: {
      speed: "yes",
      flexibility: "yes",
      quality: "yes",
      scalability: "yes",
      cost: "yes",
    },
    highlight: true,
  },
  {
    key: "agencies",
    name: { en: "Traditional Agencies", ar: "الوكالات التقليدية" },
    body: {
      en: "Useful for campaigns, but slower handoffs and fragmented operations are common.",
      ar: "مفيدة للحملات، لكن بطء التسليم وتشتت التشغيل يظهران غالبا.",
    },
    scores: {
      speed: "mixed",
      flexibility: "mixed",
      quality: "yes",
      scalability: "mixed",
      cost: "no",
    },
  },
  {
    key: "freelancers",
    name: { en: "Freelancers", ar: "المستقلون" },
    body: {
      en: "Fast for isolated tasks, but limited ownership across full-funnel growth.",
      ar: "سريعون في المهام الفردية، لكن الملكية محدودة عبر مسار النمو الكامل.",
    },
    scores: {
      speed: "yes",
      flexibility: "yes",
      quality: "mixed",
      scalability: "no",
      cost: "mixed",
    },
  },
  {
    key: "diy",
    name: { en: "Business Owner DIY", ar: "إدارة ذاتية من صاحب العمل" },
    body: {
      en: "Maximum control, but time cost and execution consistency become major bottlenecks.",
      ar: "تحكم كامل، لكن تكلفة الوقت وثبات التنفيذ يتحولان لعائق رئيسي.",
    },
    scores: {
      speed: "no",
      flexibility: "mixed",
      quality: "mixed",
      scalability: "no",
      cost: "no",
    },
  },
];

function clampPercent(value: number) {
  return Math.min(100, Math.max(0, value));
}

function toPercent(event: ReactMouseEvent<HTMLElement>) {
  const rect = event.currentTarget.getBoundingClientRect();
  return {
    x: clampPercent(((event.clientX - rect.left) / rect.width) * 100),
    y: clampPercent(((event.clientY - rect.top) / rect.height) * 100),
  };
}

function getScrollParent(element: HTMLElement | null): HTMLElement | Window {
  let node = element?.parentElement ?? null;

  while (node) {
    const style = window.getComputedStyle(node);
    const overflowY = style.overflowY;
    const isScrollableY = overflowY === "auto" || overflowY === "scroll" || overflowY === "overlay";

    if (isScrollableY && node.scrollHeight > node.clientHeight + 1) {
      return node;
    }

    node = node.parentElement;
  }

  return window;
}

export default function AboutPageContent({ language }: { language: Language }) {
  const isRTL = language === "ar";
  const missionListRef = useRef<HTMLOListElement | null>(null);
  const missionMarkerRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const missionBaseRailRef = useRef<HTMLDivElement | null>(null);
  const missionFillRailRef = useRef<HTMLDivElement | null>(null);
  const missionActiveIndexRef = useRef(0);
  const [missionActiveIndex, setMissionActiveIndex] = useState(0);

  const stageXRaw = useMotionValue(50);
  const stageYRaw = useMotionValue(50);
  const stageX = useSpring(stageXRaw, { stiffness: 170, damping: 25, mass: 0.5 });
  const stageY = useSpring(stageYRaw, { stiffness: 170, damping: 25, mass: 0.5 });
  const stageGlow = useMotionTemplate`radial-gradient(460px circle at ${stageX}% ${stageY}%, rgba(78,209,178,0.22), transparent 72%)`;

  const ctaXRaw = useMotionValue(50);
  const ctaYRaw = useMotionValue(50);
  const ctaX = useSpring(ctaXRaw, { stiffness: 200, damping: 24, mass: 0.44 });
  const ctaY = useSpring(ctaYRaw, { stiffness: 200, damping: 24, mass: 0.44 });
  const ctaGlow = useMotionTemplate`radial-gradient(420px circle at ${ctaX}% ${ctaY}%, rgba(230,216,184,0.3), transparent 72%)`;

  useEffect(() => {
    const list = missionListRef.current;
    const baseRail = missionBaseRailRef.current;
    const fillRail = missionFillRailRef.current;
    if (!list || !baseRail || !fillRail) {
      return;
    }

    let frameId = 0;
    let running = true;
    const geom = { top: -1, height: -1, progress: -1 };
    const scrollParent = getScrollParent(list);

    const tick = () => {
      if (!running) {
        return;
      }

      const list = missionListRef.current;
      const baseRail = missionBaseRailRef.current;
      const fillRail = missionFillRailRef.current;
      const markers = missionMarkerRefs.current.filter((marker): marker is HTMLSpanElement => Boolean(marker));

      if (list && baseRail && fillRail && markers.length > 1) {
        const listRect = list.getBoundingClientRect();
        const firstRect = markers[0].getBoundingClientRect();
        const lastRect = markers[markers.length - 1].getBoundingClientRect();

        const firstCenterRel = firstRect.top - listRect.top + firstRect.height / 2;
        const lastCenterRel = lastRect.top - listRect.top + lastRect.height / 2;
        const railTop = Math.max(0, firstCenterRel);
        const railHeight = Math.max(1, lastCenterRel - firstCenterRel);

        const parentRect =
          scrollParent instanceof Window
            ? { top: 0, height: window.innerHeight }
            : scrollParent.getBoundingClientRect();

        const probeViewportY = parentRect.top + parentRect.height * 0.46;
        const firstCenterViewport = firstRect.top + firstRect.height / 2;
        const lastCenterViewport = lastRect.top + lastRect.height / 2;
        const range = Math.max(1, lastCenterViewport - firstCenterViewport);
        const nextProgress = (probeViewportY - firstCenterViewport) / range;
        const clampedProgress = Math.max(0, Math.min(1, nextProgress));

        if (Math.abs(geom.top - railTop) > 0.5) {
          geom.top = railTop;
          baseRail.style.top = `${railTop}px`;
          fillRail.style.top = `${railTop}px`;
        }

        if (Math.abs(geom.height - railHeight) > 0.5) {
          geom.height = railHeight;
          baseRail.style.height = `${railHeight}px`;
          fillRail.style.height = `${railHeight}px`;
        }

        if (Math.abs(geom.progress - clampedProgress) > 0.0006) {
          geom.progress = clampedProgress;
          fillRail.style.transform = `scaleY(${clampedProgress})`;
        }

        const markerCount = markers.length;
        const nextActiveIndex =
          markerCount === 1
            ? 0
            : Math.max(
                0,
                Math.min(markerCount - 1, Math.floor((clampedProgress + 0.03) * (markerCount - 1)))
              );

        if (nextActiveIndex !== missionActiveIndexRef.current) {
          missionActiveIndexRef.current = nextActiveIndex;
          setMissionActiveIndex(nextActiveIndex);
        }
      }

      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);

    return () => {
      running = false;
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  const copy = {
    whoEyebrow: { en: "Who We Are", ar: "من نحن" },
    whoHeading: {
      en: "A strategic growth partner built for modern digital behavior.",
      ar: "شريك نمو استراتيجي مبني لسلوك رقمي حديث.",
    },
    whoBody: {
      en: "MASAR combines strategy, execution, and technology to create systems businesses can scale with confidence.",
      ar: "تجمع مسار بين الاستراتيجية والتنفيذ والتقنية لبناء أنظمة تستطيع الشركات توسيعها بثقة.",
    },
    storyEyebrow: { en: "Our Story", ar: "قصتنا" },
    storyHeading: {
      en: "How MASAR evolved from execution studio to growth infrastructure partner.",
      ar: "كيف تطورت مسار من جهة تنفيذ إلى شريك بنية نمو متكاملة.",
    },
    missionEyebrow: { en: "Mission & Values", ar: "الرسالة والقيم" },
    missionHeading: {
      en: "We make growth clearer, measurable, and more sustainable for ambitious teams.",
      ar: "نجعل النمو أوضح وأكثر قابلية للقياس والاستدامة للفرق الطموحة.",
    },
    missionBody: {
      en: "We build practical systems that align strategy, operations, and execution so your team can move faster with less friction.",
      ar: "نبني أنظمة عملية توحد الاستراتيجية والتشغيل والتنفيذ حتى يعمل فريقك بسرعة أكبر واحتكاك أقل.",
    },
    missionCta: { en: "Book a Strategy Call", ar: "احجز استشارة استراتيجية" },
    processEyebrow: { en: "How We Work", ar: "كيف نعمل" },
    processHeading: {
      en: "A disciplined process from diagnosis to optimization.",
      ar: "منهج منضبط من التشخيص حتى التحسين.",
    },
    capabilitiesEyebrow: { en: "Capabilities", ar: "القدرات" },
    capabilitiesHeading: {
      en: "Integrated expertise across growth, infrastructure, and automation.",
      ar: "خبرة مترابطة تجمع النمو والبنية الرقمية والأتمتة.",
    },
    proofEyebrow: { en: "Proof", ar: "الدلائل" },
    proofHeading: {
      en: "The metrics that matter in real business growth.",
      ar: "المؤشرات التي تهم في نمو الأعمال الحقيقي.",
    },
    compareEyebrow: { en: "Why Choose Us", ar: "لماذا نحن" },
    compareHeading: {
      en: "Compare your options before you commit.",
      ar: "قارن الخيارات بوضوح قبل اتخاذ القرار.",
    },
    compareBody: {
      en: "A side-by-side view of MASAR, traditional agencies, freelancers, and doing it in-house.",
      ar: "مقارنة مباشرة بين مسار والوكالات التقليدية والمستقلين والإدارة الذاتية داخليا.",
    },
    compareOption: { en: "Option", ar: "الخيار" },
    compareYes: { en: "Strong", ar: "قوي" },
    compareMixed: { en: "Partial", ar: "جزئي" },
    compareNo: { en: "Limited", ar: "محدود" },
    ctaEyebrow: { en: "Start Here", ar: "ابدأ من هنا" },
    ctaHeading: {
      en: "Build your next growth system with MASAR.",
      ar: "ابن نظام النمو القادم مع مسار.",
    },
    ctaBody: {
      en: "Book a strategy call and get a focused roadmap for your channels, operations, and next milestones.",
      ar: "احجز استشارة استراتيجية لتحصل على خارطة طريق مركزة لقنواتك وتشغيلك ومراحل التنفيذ التالية.",
    },
    ctaPrimary: { en: "Book a Strategy Call", ar: "احجز استشارة استراتيجية" },
    ctaSecondary: { en: "Explore Services", ar: "استكشف الخدمات" },
  };

  return (
    <>
      <section className="relative overflow-hidden bg-[#F6F7F7] px-6 py-24 dark:bg-[#0A1110]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[linear-gradient(180deg,rgba(78,209,178,0.15),rgba(78,209,178,0))]" />

        <div
          className="relative mx-auto w-full max-w-7xl overflow-hidden rounded-[38px] border border-[#0F1F1E]/10 bg-[linear-gradient(145deg,#FFFFFF,#F5F8F7)] px-6 py-8 dark:border-white/14 dark:bg-[linear-gradient(145deg,#101816,#0C1312)] sm:px-8 sm:py-10 lg:px-10"
          onMouseMove={(event) => {
            const { x, y } = toPercent(event);
            stageXRaw.set(x);
            stageYRaw.set(y);
          }}
          onMouseLeave={() => {
            stageXRaw.set(50);
            stageYRaw.set(50);
          }}
        >
          <motion.div className="pointer-events-none absolute inset-0" style={{ background: stageGlow }} />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[linear-gradient(180deg,rgba(230,216,184,0.26),rgba(230,216,184,0))] dark:bg-[linear-gradient(180deg,rgba(230,216,184,0.12),rgba(230,216,184,0))]" />

          <div className="relative grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div className={cn("space-y-6", isRTL && "text-right")}>
              <Badge
                variant="brand-outline"
                className={cn(
                  "rounded-full px-4 py-2 text-[11px]",
                  isRTL ? "mr-0 ml-auto arabic-text tracking-normal" : "tracking-[0.18em]"
                )}
              >
                {copy.whoEyebrow[language]}
              </Badge>

              <h2
                className={cn(
                  "max-w-3xl text-balance text-4xl font-semibold leading-tight tracking-tight text-[#0F1F1E] sm:text-5xl dark:text-[#EAF2EE]",
                  isRTL ? "arabic-text leading-[1.3]" : "font-brand-display"
                )}
              >
                {copy.whoHeading[language]}
              </h2>

              <p className={cn("max-w-[66ch] text-base leading-8 text-[#4A5754] dark:text-[#A9B9B4]", isRTL && "arabic-text")}>
                {copy.whoBody[language]}
              </p>

              <ul className="divide-y divide-[#0F1F1E]/10 border-y border-[#0F1F1E]/10 dark:divide-white/15 dark:border-white/15">
                {highlights.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <li
                      key={item.key}
                      className={cn(
                        "group grid gap-3 py-4 transition-colors duration-200 sm:grid-cols-[46px_1fr]",
                        isRTL && "sm:grid-cols-[1fr_46px]"
                      )}
                    >
                      <div
                        className={cn(
                          "flex items-start gap-3",
                          isRTL ? "sm:order-2 sm:justify-end sm:text-right" : "sm:items-center"
                        )}
                      >
                        <span className={cn("text-xs font-semibold text-[#5A6B66] dark:text-[#9EB1AB]", !isRTL && "tracking-[0.16em]")}>
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <Icon className="size-4 shrink-0 text-[#1E8C73] dark:text-[#6FE8CF]" />
                      </div>

                      <div className={cn("space-y-1", isRTL && "sm:order-1 sm:text-right")}>
                        <h3
                          className={cn(
                            "text-lg font-semibold leading-tight text-[#0F1F1E] transition-colors duration-200 group-hover:text-[#1E8C73] dark:text-[#EAF2EE] dark:group-hover:text-[#84F2DD]",
                            isRTL ? "arabic-text" : "font-brand-display"
                          )}
                        >
                          {item.title[language]}
                        </h3>
                        <p className={cn("text-sm leading-7 text-[#4A5754] dark:text-[#A9B9B4]", isRTL && "arabic-text")}>
                          {item.body[language]}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="relative h-[360px] overflow-hidden rounded-[30px] border border-[#0F1F1E]/10 bg-[radial-gradient(circle_at_24%_18%,rgba(230,216,184,0.42),transparent_44%),linear-gradient(145deg,#F9FFFD,#EDF8F5)] dark:border-white/15 dark:bg-[radial-gradient(circle_at_24%_18%,rgba(230,216,184,0.1),transparent_44%),linear-gradient(145deg,#101C1A,#0B1312)] sm:h-[430px]">
              <div className="absolute inset-0">
                <AboutOrbScene />
              </div>
              <div className="pointer-events-none absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-full border border-[#0F1F1E]/10 bg-white/58 px-4 py-2 text-xs text-[#4A5754] backdrop-blur-md dark:border-white/15 dark:bg-white/8 dark:text-[#A9B9B4]">
                <span className={cn(isRTL && "arabic-text")}>
                  {language === "ar" ? "حرك المؤشر للتفاعل مع المشهد" : "Move pointer to interact with scene"}
                </span>
                <span className={cn("font-semibold", !isRTL && "tracking-[0.14em]")}>
                  {language === "ar" ? "ثلاثي الأبعاد" : "3D"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white px-6 py-24 dark:bg-[#070D0C]">
        <div className="relative mx-auto w-full max-w-7xl">
          <header className={cn("max-w-3xl space-y-4", isRTL && "mr-auto text-right")}>
            <Badge
              variant="brand-outline"
              className={cn(
                "rounded-full px-4 py-2 text-[11px]",
                isRTL ? "mr-0 ml-auto arabic-text tracking-normal" : "tracking-[0.18em]"
              )}
            >
              {copy.storyEyebrow[language]}
            </Badge>
            <h2
              className={cn(
                "text-4xl font-semibold leading-tight tracking-tight text-[#0F1F1E] sm:text-5xl dark:text-[#EAF2EE]",
                isRTL ? "arabic-text leading-[1.3]" : "font-brand-display"
              )}
            >
              {copy.storyHeading[language]}
            </h2>
          </header>

          <ol className="mt-12 divide-y divide-[#0F1F1E]/10 border-y border-[#0F1F1E]/10 dark:divide-white/15 dark:border-white/15">
            {storyPoints.map((point) => (
              <li key={point.key} className={cn("grid gap-4 py-8 sm:grid-cols-[120px_1fr] sm:gap-8", isRTL && "sm:grid-cols-[1fr_120px]")}>
                <p
                  className={cn(
                    "text-sm font-semibold text-[#1E8C73] dark:text-[#77EFD8]",
                    isRTL ? "sm:order-2 sm:text-right arabic-text" : "tracking-[0.16em]"
                  )}
                >
                  {point.year}
                </p>

                <div className={cn("space-y-2", isRTL && "sm:order-1 sm:text-right")}>
                  <h3
                    className={cn(
                      "text-2xl font-semibold leading-tight tracking-tight text-[#0F1F1E] dark:text-[#EAF2EE]",
                      isRTL ? "arabic-text leading-[1.3]" : "font-brand-display"
                    )}
                  >
                    {point.title[language]}
                  </h3>
                  <p className={cn("max-w-[66ch] text-sm leading-7 text-[#4A5754] dark:text-[#A9B9B4]", isRTL && "arabic-text")}>
                    {point.body[language]}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#F6F7F7] px-6 py-24 dark:bg-[#0A1110]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-[linear-gradient(180deg,rgba(78,209,178,0.13),rgba(78,209,178,0))]" />

        <div className={cn("relative mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start", isRTL && "lg:[direction:rtl]")}>
          <div className={cn("space-y-7", isRTL && "text-right")}>
            <Badge
              variant="brand-outline"
              className={cn(
                "rounded-full px-4 py-2 text-[11px]",
                isRTL ? "mr-0 ml-auto arabic-text tracking-normal" : "tracking-[0.18em]"
              )}
            >
              {copy.missionEyebrow[language]}
            </Badge>
            <h2
              className={cn(
                "max-w-4xl text-balance text-4xl font-semibold leading-tight tracking-tight text-[#0F1F1E] sm:text-5xl dark:text-[#EAF2EE]",
                isRTL ? "arabic-text leading-[1.3]" : "font-brand-display"
              )}
            >
              {copy.missionHeading[language]}
            </h2>

            <p className={cn("max-w-[64ch] text-base leading-8 text-[#4A5754] dark:text-[#A9B9B4]", isRTL && "arabic-text")}>
              {copy.missionBody[language]}
            </p>

            <div className={cn("pt-1", isRTL && "flex justify-end")}>
              <Button asChild variant="brand" className="group h-12 min-w-[220px] justify-center gap-2.5">
                <Link href={`/${language}#contact`}>
                  <span>{copy.missionCta[language]}</span>
                  <ArrowRight className={cn("size-4 transition-transform duration-200 group-hover:translate-x-0.5", isRTL && "rotate-180")} />
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div
              ref={missionBaseRailRef}
              className={cn(
                "pointer-events-none absolute z-10 w-[2px] bg-[#0F1F1E]/14 dark:bg-white/18",
                isRTL ? "right-[13px]" : "left-[13px]"
              )}
              style={{ top: 0, height: 0 }}
            />
            <div
              ref={missionFillRailRef}
              className={cn(
                "pointer-events-none absolute z-10 w-[2px] origin-top bg-[#4ED1B2] shadow-[0_0_12px_rgba(78,209,178,0.55)] will-change-transform",
                isRTL ? "right-[13px]" : "left-[13px]"
              )}
              style={{ top: 0, height: 0, transform: "scaleY(0)" }}
            />

            <ol ref={missionListRef} className="space-y-10 sm:space-y-12">
              {values.map((value, index) => {
                const isAccent = index <= missionActiveIndex;
                return (
                  <li
                    key={value.key}
                    className={cn(
                      "relative pl-16",
                      isRTL ? "pr-16 pl-0 text-right" : "text-left"
                    )}
                  >
                    <span
                      ref={(element) => {
                        missionMarkerRefs.current[index] = element;
                      }}
                      className={cn(
                        "absolute top-1 z-30 inline-flex size-7 items-center justify-center rounded-full border-2 bg-[#F6F7F7] text-[10px] font-semibold shadow-[0_0_0_6px_#F6F7F7] dark:bg-[#0A1110] dark:shadow-[0_0_0_6px_#0A1110]",
                        isRTL ? "right-0" : "left-0",
                        isAccent
                          ? "border-[#4ED1B2] text-[#1E8C73] dark:text-[#7EF0DB]"
                          : "border-[#0F1F1E]/16 text-[#70807B] dark:border-white/24 dark:text-[#97AAA4]"
                      )}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <h3
                      className={cn(
                        "text-[2rem] font-semibold leading-tight tracking-tight text-[#0F1F1E] dark:text-[#EAF2EE] sm:text-[2.25rem]",
                        isRTL ? "arabic-text leading-[1.25]" : "font-brand-display"
                      )}
                    >
                      {value.title[language]}
                    </h3>
                    <p className={cn("mt-2 max-w-[56ch] text-base leading-8 text-[#4A5754] dark:text-[#A9B9B4]", isRTL && "arabic-text")}>
                      {value.body[language]}
                    </p>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white px-6 py-24 dark:bg-[#070D0C]">
        <div className="relative mx-auto w-full max-w-7xl">
          <header className={cn("max-w-3xl space-y-4", isRTL && "mr-auto text-right")}>
            <Badge
              variant="brand-outline"
              className={cn(
                "rounded-full px-4 py-2 text-[11px]",
                isRTL ? "mr-0 ml-auto arabic-text tracking-normal" : "tracking-[0.18em]"
              )}
            >
              {copy.processEyebrow[language]}
            </Badge>
            <h2
              className={cn(
                "text-4xl font-semibold leading-tight tracking-tight text-[#0F1F1E] sm:text-5xl dark:text-[#EAF2EE]",
                isRTL ? "arabic-text leading-[1.3]" : "font-brand-display"
              )}
            >
              {copy.processHeading[language]}
            </h2>
          </header>

          <div className="relative mt-12">
            <div className="pointer-events-none absolute left-0 right-0 top-[15px] hidden h-px bg-gradient-to-r from-transparent via-[#4ED1B2]/70 to-transparent xl:block" />
            <ol className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
              {processItems.map((item) => (
                <li key={item.key} className={cn("relative space-y-3", isRTL && "text-right")}>
                  <div className={cn("flex items-center gap-3", isRTL && "justify-end")}>
                    <span className="inline-flex size-8 items-center justify-center rounded-full border border-[#4ED1B2]/60 bg-[#4ED1B2]/10 text-xs font-semibold text-[#1E8C73] dark:text-[#7FEFDC]">
                      {item.step}
                    </span>
                    <span className="h-px w-10 bg-[#0F1F1E]/12 dark:bg-white/18 xl:hidden" />
                  </div>
                  <h3
                    className={cn(
                      "text-2xl font-semibold leading-tight tracking-tight text-[#0F1F1E] dark:text-[#EAF2EE]",
                      isRTL ? "arabic-text leading-[1.3]" : "font-brand-display"
                    )}
                  >
                    {item.title[language]}
                  </h3>
                  <p className={cn("text-sm leading-7 text-[#4A5754] dark:text-[#A9B9B4]", isRTL && "arabic-text")}>
                    {item.body[language]}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#F6F7F7] px-6 py-24 dark:bg-[#0A1110]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-[linear-gradient(180deg,rgba(78,209,178,0.13),rgba(78,209,178,0))]" />

        <div className="relative mx-auto w-full max-w-7xl">
          <header className={cn("max-w-3xl space-y-4", isRTL && "mr-auto text-right")}>
            <Badge
              variant="brand-outline"
              className={cn(
                "rounded-full px-4 py-2 text-[11px]",
                isRTL ? "mr-0 ml-auto arabic-text tracking-normal" : "tracking-[0.18em]"
              )}
            >
              {copy.capabilitiesEyebrow[language]}
            </Badge>
            <h2
              className={cn(
                "text-4xl font-semibold leading-tight tracking-tight text-[#0F1F1E] sm:text-5xl dark:text-[#EAF2EE]",
                isRTL ? "arabic-text leading-[1.3]" : "font-brand-display"
              )}
            >
              {copy.capabilitiesHeading[language]}
            </h2>
          </header>

          <div className={cn("mt-12 grid gap-8 lg:grid-cols-3", isRTL && "lg:[direction:rtl]")}>
            {capabilityGroups.map((group, index) => (
              <div
                key={group.key}
                className={cn(
                  "space-y-4",
                  index !== 0 && "lg:border-l lg:border-[#0F1F1E]/10 lg:pl-8 dark:lg:border-white/14",
                  isRTL && index !== 0 && "lg:border-r lg:border-l-0 lg:pr-8 lg:pl-0"
                )}
              >
                <h3
                  className={cn(
                    "text-2xl font-semibold leading-tight tracking-tight text-[#0F1F1E] dark:text-[#EAF2EE]",
                    isRTL ? "arabic-text leading-[1.3]" : "font-brand-display"
                  )}
                >
                  {group.title[language]}
                </h3>
                <ul className="space-y-2.5">
                  {group.items.map((item) => (
                    <li
                      key={item.en}
                      className={cn("flex items-start gap-2 text-sm leading-7 text-[#4A5754] dark:text-[#A9B9B4]", isRTL && "flex-row-reverse text-right arabic-text")}
                    >
                      <Sparkles className="mt-1 size-3.5 shrink-0 text-[#2F6F5E] dark:text-[#82EED9]" />
                      <span>{item[language]}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white px-6 py-24 dark:bg-[#070D0C]">
        <div className="relative mx-auto w-full max-w-7xl">
          <header className={cn("max-w-3xl space-y-4", isRTL && "mr-auto text-right")}>
            <Badge
              variant="brand-outline"
              className={cn(
                "rounded-full px-4 py-2 text-[11px]",
                isRTL ? "mr-0 ml-auto arabic-text tracking-normal" : "tracking-[0.18em]"
              )}
            >
              {copy.proofEyebrow[language]}
            </Badge>
            <h2
              className={cn(
                "text-4xl font-semibold leading-tight tracking-tight text-[#0F1F1E] sm:text-5xl dark:text-[#EAF2EE]",
                isRTL ? "arabic-text leading-[1.3]" : "font-brand-display"
              )}
            >
              {copy.proofHeading[language]}
            </h2>
          </header>

          <ol className="mt-12 divide-y divide-[#0F1F1E]/10 border-y border-[#0F1F1E]/10 dark:divide-white/15 dark:border-white/15">
            {proofItems.map((item) => (
              <li
                key={item.key}
                className={cn(
                  "grid gap-3 py-7 transition-colors duration-200 hover:text-[#1E8C73] dark:hover:text-[#8CF3DF] sm:grid-cols-[1fr_auto]",
                  isRTL && "sm:grid-cols-[auto_1fr]"
                )}
              >
                <div className={cn("space-y-2", isRTL && "sm:order-2 sm:text-right")}>
                  <p className={cn("text-xs font-semibold text-[#5A6B66] dark:text-[#9FB1AB]", !isRTL && "tracking-[0.14em]")}>
                    {item.label[language]}
                  </p>
                  <p className={cn("max-w-[66ch] text-sm leading-7 text-[#4A5754] dark:text-[#A9B9B4]", isRTL && "arabic-text")}>
                    {item.body[language]}
                  </p>
                </div>

                <p
                  className={cn(
                    "text-4xl font-semibold leading-none tracking-tight text-[#0F1F1E] dark:text-[#EAF2EE] sm:self-center",
                    isRTL ? "sm:order-1 arabic-text" : "font-brand-display"
                  )}
                >
                  {item.value}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#F6F7F7] px-6 py-24 dark:bg-[#0A1110]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-[linear-gradient(180deg,rgba(78,209,178,0.13),rgba(78,209,178,0))]" />

        <div className="relative mx-auto w-full max-w-7xl">
          <header className={cn("max-w-3xl space-y-4", isRTL && "mr-auto text-right")}>
            <Badge
              variant="brand-outline"
              className={cn(
                "rounded-full px-4 py-2 text-[11px]",
                isRTL ? "mr-0 ml-auto arabic-text tracking-normal" : "tracking-[0.18em]"
              )}
            >
              {copy.compareEyebrow[language]}
            </Badge>
            <h2
              className={cn(
                "text-4xl font-semibold leading-tight tracking-tight text-[#0F1F1E] sm:text-5xl dark:text-[#EAF2EE]",
                isRTL ? "arabic-text leading-[1.3]" : "font-brand-display"
              )}
            >
              {copy.compareHeading[language]}
            </h2>
            <p className={cn("max-w-[68ch] text-base leading-8 text-[#4A5754] dark:text-[#A9B9B4]", isRTL && "arabic-text")}>
              {copy.compareBody[language]}
            </p>
          </header>

          <div className="relative mt-12 overflow-hidden rounded-[34px] border border-[#0F1F1E]/10 dark:border-white/15">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(125deg,rgba(78,209,178,0.16),rgba(78,209,178,0)_48%,rgba(230,216,184,0.18))] dark:bg-[linear-gradient(125deg,rgba(78,209,178,0.1),rgba(78,209,178,0)_48%,rgba(230,216,184,0.1))]" />
            <div className="relative overflow-x-auto">
              <table className={cn("w-full min-w-[960px] border-separate border-spacing-0", isRTL && "[direction:rtl]")}>
                <thead>
                  <tr className="bg-[#0F1F1E]/4 dark:bg-white/[0.05]">
                    <th
                      className={cn(
                        "w-[36%] min-w-[320px] px-6 py-5 text-sm font-semibold text-[#1C312E] dark:text-[#DCE9E4]",
                        isRTL ? "text-right arabic-text" : "text-left tracking-[0.08em]"
                      )}
                    >
                      {copy.compareOption[language]}
                    </th>
                    {comparisonColumns.map((column) => (
                      <th
                        key={column.key}
                        className={cn(
                          "px-5 py-5 text-center text-sm font-semibold text-[#1C312E] dark:text-[#DCE9E4]",
                          isRTL ? "arabic-text" : "tracking-[0.08em]"
                        )}
                      >
                        {column.label[language]}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {comparisonRows.map((row, rowIndex) => (
                    <tr
                      key={row.key}
                      className={cn(
                        row.highlight && "bg-[#4ED1B2]/10 dark:bg-[#4ED1B2]/14"
                      )}
                    >
                      <th
                        className={cn(
                          "px-6 py-6 align-top",
                          rowIndex !== 0 && "border-t border-[#0F1F1E]/10 dark:border-white/14"
                        )}
                      >
                        <div className={cn("space-y-2", isRTL ? "text-right" : "text-left")}>
                          <p
                            className={cn(
                              "text-2xl font-semibold leading-tight text-[#0F1F1E] dark:text-[#EAF2EE]",
                              isRTL ? "arabic-text leading-[1.3]" : "font-brand-display"
                            )}
                          >
                            {row.name[language]}
                          </p>
                          <p className={cn("max-w-[42ch] text-sm leading-7 text-[#4A5754] dark:text-[#A9B9B4]", isRTL && "arabic-text")}>
                            {row.body[language]}
                          </p>
                        </div>
                      </th>

                      {comparisonColumns.map((column) => {
                        const score = row.scores[column.key];
                        const isYes = score === "yes";
                        const isMixed = score === "mixed";

                        return (
                          <td
                            key={`${row.key}-${column.key}`}
                            className={cn(
                              "px-5 py-6 text-center align-middle",
                              rowIndex !== 0 && "border-t border-[#0F1F1E]/10 dark:border-white/14"
                            )}
                          >
                            <span
                              className={cn(
                                "mx-auto inline-flex size-9 items-center justify-center rounded-full border",
                                isYes && "border-[#4ED1B2]/80 bg-[#4ED1B2]/16 text-[#1E8C73] dark:text-[#85F2DE]",
                                isMixed && "border-[#E6D8B8]/80 bg-[#E6D8B8]/22 text-[#5E5035] dark:text-[#EADCBF]",
                                !isYes && !isMixed && "border-[#D97C7C]/65 bg-[#D97C7C]/14 text-[#A33B3B] dark:text-[#F0A2A2]"
                              )}
                            >
                              {isYes ? (
                                <Check className="size-4" />
                              ) : isMixed ? (
                                <span className="text-sm font-semibold leading-none">~</span>
                              ) : (
                                <X className="size-4" />
                              )}
                            </span>

                            <span
                              className={cn(
                                "mt-1.5 block text-[11px] font-medium text-[#5D6D68] dark:text-[#94A9A2]",
                                isRTL && "arabic-text"
                              )}
                            >
                              {isYes
                                ? copy.compareYes[language]
                                : isMixed
                                ? copy.compareMixed[language]
                                : copy.compareNo[language]}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white px-6 pb-28 pt-24 dark:bg-[#070D0C]">
        <div
          className="relative mx-auto w-full max-w-7xl overflow-hidden rounded-[36px] border border-[#0F1F1E]/10 bg-[linear-gradient(145deg,#FFFFFF,#F4F8F7)] px-6 py-10 dark:border-white/15 dark:bg-[linear-gradient(145deg,#101816,#0B1211)] sm:px-10 sm:py-12"
          onMouseMove={(event) => {
            const { x, y } = toPercent(event);
            ctaXRaw.set(x);
            ctaYRaw.set(y);
          }}
          onMouseLeave={() => {
            ctaXRaw.set(50);
            ctaYRaw.set(50);
          }}
        >
          <motion.div className="pointer-events-none absolute inset-0" style={{ background: ctaGlow }} />
          <div className={cn("relative z-10 max-w-4xl", isRTL && "mr-auto text-right")}>
            <Badge
              variant="brand-outline"
              className={cn(
                "rounded-full px-4 py-2 text-[11px]",
                isRTL ? "mr-0 ml-auto arabic-text tracking-normal" : "tracking-[0.18em]"
              )}
            >
              {copy.ctaEyebrow[language]}
            </Badge>
            <h2
              className={cn(
                "mt-5 text-4xl font-semibold leading-tight tracking-tight text-[#0F1F1E] sm:text-5xl dark:text-[#EAF2EE]",
                isRTL ? "arabic-text leading-[1.3]" : "font-brand-display"
              )}
            >
              {copy.ctaHeading[language]}
            </h2>
            <p className={cn("mt-4 max-w-[68ch] text-base leading-8 text-[#4A5754] dark:text-[#A9B9B4]", isRTL && "arabic-text")}>
              {copy.ctaBody[language]}
            </p>

            <div className={cn("mt-8 flex flex-wrap items-center gap-4", isRTL && "justify-end")}>
              <Button asChild variant="brand" className="h-12 min-w-[220px] justify-center">
                <Link href={`/${language}#contact`}>{copy.ctaPrimary[language]}</Link>
              </Button>
              <Button asChild variant="secondary" className="group h-12 min-w-[220px] justify-center gap-2.5">
                <Link href={`/${language}#services`}>
                  <span className={cn(isRTL && "leading-none")}>{copy.ctaSecondary[language]}</span>
                  <ArrowRight className={cn("size-4", isRTL && "rotate-180")} />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
