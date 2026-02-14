"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { BarChart3, Boxes, ClipboardList, Rocket } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type TouchEvent as ReactTouchEvent,
} from "react";

import { Badge } from "@/components/ui/badge";
import type { Language } from "@/lib/use-language";
import { cn } from "@/lib/utils";

type ProcessStep = {
  key: string;
  icon: LucideIcon;
  title: { en: string; ar: string };
  body: { en: string; ar: string };
};

const processSteps: ProcessStep[] = [
  {
    key: "planning",
    icon: ClipboardList,
    title: { en: "Planning", ar: "\u0627\u0644\u062a\u062e\u0637\u064a\u0637" },
    body: {
      en: "Define goals, audience, and channel priorities with a clear execution scope.",
      ar: "\u062a\u062d\u062f\u064a\u062f \u0627\u0644\u0623\u0647\u062f\u0627\u0641 \u0648\u0627\u0644\u062c\u0645\u0647\u0648\u0631 \u0648\u0623\u0648\u0644\u0648\u064a\u0627\u062a \u0627\u0644\u0642\u0646\u0648\u0627\u062a \u0636\u0645\u0646 \u0646\u0637\u0627\u0642 \u062a\u0646\u0641\u064a\u0630\u064a \u0648\u0627\u0636\u062d.",
    },
  },
  {
    key: "development",
    icon: Boxes,
    title: { en: "Development", ar: "\u0627\u0644\u062a\u0646\u0641\u064a\u0630 \u0648\u0627\u0644\u0628\u0646\u0627\u0621" },
    body: {
      en: "Build pages, creatives, and automation flows as one connected system.",
      ar: "\u0628\u0646\u0627\u0621 \u0627\u0644\u0635\u0641\u062d\u0627\u062a \u0648\u0627\u0644\u0645\u062d\u062a\u0648\u0649 \u0648\u0633\u064a\u0631 \u0627\u0644\u0623\u062a\u0645\u062a\u0629 \u0636\u0645\u0646 \u0646\u0638\u0627\u0645 \u0648\u0627\u062d\u062f \u0645\u062a\u0631\u0627\u0628\u0637.",
    },
  },
  {
    key: "launch",
    icon: Rocket,
    title: { en: "Launch", ar: "\u0627\u0644\u0625\u0637\u0644\u0627\u0642" },
    body: {
      en: "Go live with tracking, ownership, and channel-by-channel accountability.",
      ar: "\u0625\u0637\u0644\u0627\u0642 \u0627\u0644\u062d\u0645\u0644\u0627\u062a \u0645\u0639 \u062a\u062a\u0628\u0639 \u0648\u0627\u0636\u062d \u0648\u0645\u0633\u0624\u0648\u0644\u064a\u0627\u062a \u0645\u062d\u062f\u062f\u0629 \u0644\u0643\u0644 \u0642\u0646\u0627\u0629.",
    },
  },
  {
    key: "optimization",
    icon: BarChart3,
    title: { en: "Optimization", ar: "\u0627\u0644\u062a\u062d\u0633\u064a\u0646 \u0627\u0644\u0645\u0633\u062a\u0645\u0631" },
    body: {
      en: "Review data weekly and refine performance for scalable growth.",
      ar: "\u0645\u0631\u0627\u062c\u0639\u0629 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a \u0623\u0633\u0628\u0648\u0639\u064a\u0627\u064b \u0648\u062a\u0637\u0648\u064a\u0631 \u0627\u0644\u0623\u062f\u0627\u0621 \u0644\u0646\u0645\u0648 \u0642\u0627\u0628\u0644 \u0644\u0644\u062a\u0648\u0633\u0639.",
    },
  },
];

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export default function ProcessSection({ language }: { language: Language }) {
  const isRTL = language === "ar";
  const stepCount = processSteps.length;
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const glowXRaw = useMotionValue(50);
  const glowYRaw = useMotionValue(50);
  const glowX = useSpring(glowXRaw, { stiffness: 180, damping: 24, mass: 0.45 });
  const glowY = useSpring(glowYRaw, { stiffness: 180, damping: 24, mass: 0.45 });
  const boardGlow = useMotionTemplate`radial-gradient(420px circle at ${glowX}% ${glowY}%, rgba(78,209,178,0.28), transparent 72%)`;

  const copy = {
    eyebrow: { en: "Execution Process", ar: "\u0622\u0644\u064a\u0629 \u0627\u0644\u062a\u0646\u0641\u064a\u0630" },
    heading: {
      en: "A structured process from planning to measurable growth.",
      ar: "\u0645\u0633\u0627\u0631 \u0645\u0646\u0638\u0645 \u0645\u0646 \u0627\u0644\u062a\u062e\u0637\u064a\u0637 \u062d\u062a\u0649 \u0646\u062a\u0627\u0626\u062c \u0642\u0627\u0628\u0644\u0629 \u0644\u0644\u0642\u064a\u0627\u0633.",
    },
    description: {
      en: "Drag the timeline or hover the board to reveal each phase.",
      ar: "\u0627\u0633\u062d\u0628 \u0627\u0644\u0645\u0633\u0627\u0631 \u0623\u0648 \u062d\u0631\u0643 \u0627\u0644\u0645\u0627\u0648\u0633 \u0644\u0627\u0633\u062a\u0639\u0631\u0627\u0636 \u0643\u0644 \u0645\u0631\u062d\u0644\u0629.",
    },
    interactionHint: {
      en: "Drag to move across steps",
      ar: "\u0627\u0633\u062d\u0628 \u0644\u0644\u062a\u0646\u0642\u0644 \u0628\u064a\u0646 \u0627\u0644\u0645\u0631\u0627\u062d\u0644",
    },
    stepPrefix: { en: "Step", ar: "\u0627\u0644\u0645\u0631\u062d\u0644\u0629" },
    ofLabel: { en: "of", ar: "\u0645\u0646" },
  };

  const indexToPercent = useCallback(
    (index: number) => {
      const visualIndex = isRTL ? stepCount - 1 - index : index;
      return (visualIndex / (stepCount - 1)) * 100;
    },
    [isRTL, stepCount]
  );

  const percentToIndex = useCallback(
    (percent: number) => {
      const visualIndex = Math.round((percent / 100) * (stepCount - 1));
      return isRTL ? stepCount - 1 - visualIndex : visualIndex;
    },
    [isRTL, stepCount]
  );

  const updateFromClientX = useCallback(
    (clientX: number) => {
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const percent = clamp(((clientX - rect.left) / rect.width) * 100, 0, 100);
      setActiveIndex(percentToIndex(percent));
    },
    [percentToIndex]
  );

  useEffect(() => {
    if (!isDragging) return;

    const handleMove = (event: MouseEvent) => updateFromClientX(event.clientX);
    const handleUp = () => setIsDragging(false);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
    };
  }, [isDragging, updateFromClientX]);

  const handleTrackMouseDown = (event: ReactMouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    updateFromClientX(event.clientX);
  };

  const handleTrackTouchStart = (event: ReactTouchEvent<HTMLDivElement>) => {
    updateFromClientX(event.touches[0].clientX);
  };

  const handleTrackTouchMove = (event: ReactTouchEvent<HTMLDivElement>) => {
    updateFromClientX(event.touches[0].clientX);
  };

  const handleBoardMouseMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = clamp(((event.clientX - rect.left) / rect.width) * 100, 0, 100);
    const y = clamp(((event.clientY - rect.top) / rect.height) * 100, 0, 100);
    glowXRaw.set(x);
    glowYRaw.set(y);
  };

  const handleBoardMouseLeave = () => {
    glowXRaw.set(50);
    glowYRaw.set(50);
  };

  const activeStep = processSteps[activeIndex];
  const ActiveIcon = activeStep.icon;
  const activePercent = indexToPercent(activeIndex);

  return (
    <section
      id="process"
      dir={isRTL ? "rtl" : "ltr"}
      className="relative overflow-hidden bg-white px-6 py-24 text-[#0F1F1E] dark:bg-[#070D0C] dark:text-[#EAF2EE]"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-56 w-[min(94%,980px)] -translate-x-1/2 bg-[radial-gradient(circle,rgba(78,209,178,0.14),transparent_68%)]" />

      <div className="relative mx-auto w-full max-w-7xl space-y-10">
        <header className={cn("mx-auto max-w-3xl space-y-4 text-center", isRTL && "text-right sm:text-center")}>
          <Badge
            variant="brand-outline"
            className={cn(
              "rounded-full px-4 py-2 text-[11px]",
              isRTL ? "arabic-text tracking-normal" : "tracking-[0.2em]"
            )}
          >
            {copy.eyebrow[language]}
          </Badge>
          <h2
            className={cn(
              "text-4xl font-semibold leading-tight tracking-tight sm:text-5xl",
              isRTL ? "arabic-text" : "font-[var(--font-jakarta)]"
            )}
          >
            {copy.heading[language]}
          </h2>
          <p className={cn("text-base leading-8 text-[#4A5754] dark:text-[#A9B9B4]", isRTL && "arabic-text")}>
            {copy.description[language]}
          </p>
        </header>

        <motion.div
          onMouseMove={handleBoardMouseMove}
          onMouseLeave={handleBoardMouseLeave}
          className="relative overflow-hidden rounded-[32px] border border-[#0F1F1E]/10 bg-[linear-gradient(150deg,#FFFFFF,#F4F8F7)] p-6 sm:p-8 lg:p-10 dark:border-white/15 dark:bg-[linear-gradient(150deg,#0F1716,#0A1211)]"
        >
          <motion.div className="pointer-events-none absolute inset-0" style={{ background: boardGlow }} />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(230,216,184,0.3),transparent_56%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(230,216,184,0.12),transparent_56%)]" />

          <div className="relative grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-6">
              <div className={cn("flex items-center justify-between gap-3", isRTL && "flex-row-reverse")}>
                <p className={cn("text-sm text-[#5A6B66] dark:text-[#A9B9B4]", isRTL && "arabic-text")}>
                  {copy.interactionHint[language]}
                </p>
                <p
                  className={cn(
                    "text-xs font-semibold text-[#5A6B66] dark:text-[#9FB1AB]",
                    isRTL ? "arabic-text" : "tracking-[0.16em]"
                  )}
                >
                  {copy.stepPrefix[language]} {String(activeIndex + 1).padStart(2, "0")} {copy.ofLabel[language]}{" "}
                  {String(stepCount).padStart(2, "0")}
                </p>
              </div>

              <div
                ref={trackRef}
                className={cn(
                  "relative h-24 select-none touch-none",
                  isDragging ? "cursor-grabbing" : "cursor-grab"
                )}
                onMouseDown={handleTrackMouseDown}
                onTouchStart={handleTrackTouchStart}
                onTouchMove={handleTrackTouchMove}
              >
                <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-[#0F1F1E]/10 dark:bg-white/14" />
                <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-[#4ED1B2]/65 to-transparent" />

                {processSteps.map((step, index) => {
                  const percent = indexToPercent(index);
                  const isActive = index === activeIndex;

                  return (
                    <button
                      key={step.key}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className="absolute top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
                      style={{ left: `${percent}%` }}
                      aria-label={`${copy.stepPrefix[language]} ${index + 1}: ${step.title[language]}`}
                    >
                      <span
                        className={cn(
                          "inline-flex size-8 items-center justify-center rounded-full border text-[11px] font-semibold transition-all duration-250",
                          isActive
                            ? "border-[#4ED1B2]/75 bg-[#4ED1B2]/18 text-[#0F1F1E] dark:text-[#EAF2EE]"
                            : "border-[#0F1F1E]/16 bg-white text-[#5A6B66] dark:border-white/25 dark:bg-[#0F1716] dark:text-[#A9B9B4]"
                        )}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </button>
                  );
                })}

                <motion.div
                  className="pointer-events-none absolute top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
                  animate={{ left: `${activePercent}%` }}
                  transition={{ type: "spring", stiffness: 220, damping: 22, mass: 0.55 }}
                >
                  <span className="inline-flex size-11 items-center justify-center rounded-full border border-[#1C5F52]/30 bg-[#4ED1B2] text-[#0F1F1E] shadow-[0_10px_22px_rgba(43,167,139,0.36)]">
                    <ActiveIcon className="size-5" />
                  </span>
                </motion.div>
              </div>

              <div className={cn("flex flex-wrap gap-2", isRTL && "justify-end")}>
                {processSteps.map((step, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <button
                      key={step.key}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={cn(
                        "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition-all",
                        isActive
                          ? "border-[#4ED1B2]/70 bg-[#4ED1B2]/14 text-[#0F1F1E] dark:text-[#EAF2EE]"
                          : "border-[#0F1F1E]/12 bg-white/80 text-[#5A6B66] hover:border-[#4ED1B2]/50 dark:border-white/20 dark:bg-[#0F1716] dark:text-[#9FB1AB]"
                      )}
                    >
                      <span className={cn("font-semibold", !isRTL && "tracking-[0.12em]")}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className={cn(isRTL && "arabic-text")}>{step.title[language]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="relative min-h-[280px] overflow-hidden rounded-[28px] border border-[#0F1F1E]/12 bg-[#0F1F1E] p-6 text-white dark:border-white/16 sm:p-7">
              <div className="pointer-events-none absolute -right-8 -top-14 text-[8.5rem] font-semibold leading-none text-white/8">
                {String(activeIndex + 1).padStart(2, "0")}
              </div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-[linear-gradient(180deg,transparent,rgba(78,209,178,0.16))]" />

              <motion.div
                key={`${language}-${activeStep.key}`}
                initial={{ opacity: 0, y: 14, filter: "blur(2px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className={cn("relative z-10 flex h-full flex-col", isRTL && "text-right")}
              >
                <span className={cn("text-xs font-semibold text-[#9FCBC0]", !isRTL && "tracking-[0.18em]")}>
                  {copy.stepPrefix[language]} {String(activeIndex + 1).padStart(2, "0")}
                </span>
                <h3
                  className={cn(
                    "mt-3 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl",
                    isRTL && "arabic-text"
                  )}
                >
                  {activeStep.title[language]}
                </h3>
                <p className={cn("mt-4 max-w-[48ch] text-base leading-8 text-[#D5E5E0]", isRTL && "arabic-text")}>
                  {activeStep.body[language]}
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
