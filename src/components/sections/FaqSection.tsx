"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import type { Language } from "@/lib/use-language";
import { cn } from "@/lib/utils";

type FaqSectionProps = {
  language: Language;
};

type FaqItem = {
  q: string;
  a: string;
};

const faqs: Record<Language, FaqItem[]> = {
  en: [
    {
      q: "Why choose MASAR for digital growth?",
      a: "We combine strategy, creative execution, and automation in one connected system that drives measurable business outcomes.",
    },
    {
      q: "How fast can we launch?",
      a: "After discovery and scope alignment, most projects start within 5-10 business days with a clear execution timeline.",
    },
    {
      q: "Do you handle Arabic and English markets?",
      a: "Yes. We build bilingual content structures, ad systems, and conversion journeys tailored for both audiences.",
    },
    {
      q: "What services are included?",
      a: "Web systems, performance campaigns, creative content, SEO visibility, and automation flows built around your goals.",
    },
    {
      q: "How do you track performance?",
      a: "We monitor qualified leads, conversion rates, and channel ROI, then optimize continuously through data-driven iterations.",
    },
  ],
  ar: [
    {
      q: "لماذا تختار مسار للنمو الرقمي؟",
      a: "نحن ندمج الاستراتيجية والتنفيذ الإبداعي والأتمتة ضمن نظام واحد يحقق نتائج أعمال قابلة للقياس.",
    },
    {
      q: "كم يستغرق إطلاق المشروع؟",
      a: "بعد جلسة الاكتشاف واعتماد النطاق نبدأ غالبا خلال 5-10 أيام عمل مع خطة تنفيذ واضحة.",
    },
    {
      q: "هل تديرون السوق العربي والإنجليزي؟",
      a: "نعم. نبني مسارات محتوى وإعلانات وتحويل ثنائية اللغة مهيأة لكل جمهور.",
    },
    {
      q: "ما الخدمات التي تقدمونها؟",
      a: "أنظمة مواقع، حملات أداء، محتوى إبداعي، تحسين الظهور، وسير أتمتة مرتبط بأهداف النمو.",
    },
    {
      q: "كيف يتم قياس النتائج؟",
      a: "نقيس جودة العملاء المحتملين ومعدلات التحويل والعائد على القنوات ثم نحسن الأداء بشكل مستمر.",
    },
  ],
};

export default function FaqSection({ language }: FaqSectionProps) {
  const isRTL = language === "ar";
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupY, setPopupY] = useState(18);
  const rowRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const positionPopup = (index: number) => {
    const row = rowRefs.current[index];
    if (!row) return;
    setPopupY(row.offsetTop + row.offsetHeight / 2 - 104);
  };

  const activate = (index: number) => {
    setActiveIndex(index);
    setIsPopupVisible(true);
    requestAnimationFrame(() => positionPopup(index));
  };

  useEffect(() => {
    const onResize = () => positionPopup(activeIndex);
    window.addEventListener("resize", onResize);
    const frame = requestAnimationFrame(() => positionPopup(activeIndex));
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
    };
  }, [activeIndex, language]);

  return (
    <section
      id="faq"
      dir={isRTL ? "rtl" : "ltr"}
      className="relative overflow-hidden bg-white px-6 py-24 text-[#0F1F1E] dark:bg-[#070D0C] dark:text-[#EAF2EE]"
    >
      <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[0.72fr_1.28fr]">
        <div className={cn("space-y-4", isRTL && "text-right")}>
          <p
            className={cn(
              "text-xs font-semibold text-[#0F1F1E]/58 dark:text-[#E6D8B8]/82",
              isRTL ? "arabic-text tracking-normal" : "uppercase tracking-[0.28em]"
            )}
          >
            {language === "ar" ? "الأسئلة الشائعة" : "FAQ"}
          </p>
          <h2
            className={cn(
              "text-[clamp(4rem,14vw,12rem)] font-semibold leading-[0.9] text-[#0F1F1E]/16 dark:text-[#E6D8B8]/42",
              isRTL ? "arabic-text" : "font-[var(--font-jakarta)]"
            )}
          >
            FAQ
          </h2>
        </div>

        <div className="relative overflow-visible">
          <div className="space-y-1" onMouseLeave={() => setIsPopupVisible(false)}>
            {faqs[language].map((item, index) => {
              const isActive = activeIndex === index;
              return (
                <article key={item.q} className="border-b border-[#E6D8B8]/70 py-4 dark:border-[#2C3A36]">
                  <button
                    ref={(node) => {
                      rowRefs.current[index] = node;
                    }}
                    type="button"
                    onMouseEnter={() => activate(index)}
                    onFocus={() => activate(index)}
                    onClick={() => activate(index)}
                    onBlur={() => setIsPopupVisible(false)}
                    className={cn(
                      "flex w-full items-start gap-4 text-left transition-all duration-300",
                      isRTL && "flex-row-reverse text-right",
                      isActive ? "opacity-100" : "opacity-70 hover:opacity-100"
                    )}
                  >
                    <motion.span
                      animate={{ rotate: isActive ? 45 : 0, opacity: isActive ? 1 : 0.72 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      className="mt-0.5 text-4xl leading-none text-[#0F1F1E]/80 dark:text-[#E6D8B8]/85"
                    >
                      +
                    </motion.span>
                    <span
                      className={cn(
                        "block text-[1.95rem] font-medium leading-tight tracking-tight text-[#0F1F1E] dark:text-[#EAF2EE] sm:text-[2.2rem]",
                        isRTL && "arabic-text"
                      )}
                    >
                      {item.q}
                    </span>
                  </button>
                </article>
              );
            })}
          </div>

          <AnimatePresence>
            {isPopupVisible && (
              <motion.aside
                aria-live="polite"
                className={cn(
                  "pointer-events-none absolute top-0 hidden w-[29rem] rounded-3xl border border-[#4ED1B2]/28 bg-white/90 p-7 shadow-[0_24px_64px_rgba(15,31,30,0.15)] backdrop-blur-xl lg:block dark:border-[#4ED1B2]/34 dark:bg-[#111C19]/90",
                  isRTL ? "left-0" : "right-0"
                )}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ y: popupY, opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98, y: popupY - 8 }}
                transition={{ type: "spring", stiffness: 210, damping: 27, mass: 0.86 }}
              >
                <div className="mb-5 h-1.5 w-20 rounded-full bg-gradient-to-r from-[#4ED1B2] via-[#E6D8B8] to-transparent" />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${language}-${activeIndex}`}
                    initial={{ opacity: 0, y: 10, filter: "blur(2px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -8, filter: "blur(2px)" }}
                    transition={{ duration: 0.24, ease: "easeOut" }}
                  >
                    <p
                      className={cn(
                        "text-xs font-semibold uppercase tracking-[0.24em] text-[#0F1F1E]/58 dark:text-[#E6D8B8]/72",
                        isRTL && "arabic-text tracking-normal"
                      )}
                    >
                      {language === "ar" ? "الإجابة" : "Answer"}
                    </p>
                    <p className={cn("mt-4 text-[1.14rem] leading-[1.85] text-[#0F1F1E]/84 dark:text-[#E6D8B8]/86", isRTL && "arabic-text")}>
                      {faqs[language][activeIndex]?.a}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </motion.aside>
            )}
          </AnimatePresence>

          <div className="mt-6 rounded-2xl border border-[#E6D8B8]/70 bg-[#FDFBF6] p-5 lg:hidden dark:border-[#4ED1B2]/30 dark:bg-[#101A18]">
            <p
              className={cn(
                "text-xs font-semibold uppercase tracking-[0.2em] text-[#0F1F1E]/58 dark:text-[#E6D8B8]/70",
                isRTL && "arabic-text tracking-normal"
              )}
            >
              {language === "ar" ? "الإجابة" : "Answer"}
            </p>
            <p className={cn("mt-3 text-base leading-relaxed text-[#0F1F1E]/82 dark:text-[#E6D8B8]/85", isRTL && "arabic-text")}>
              {faqs[language][activeIndex]?.a}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
