"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";
import type { Language } from "@/lib/use-language";
import { cn } from "@/lib/utils";

const services = [
  {
    key: "web",
    category: { en: "Web", ar: "الويب" },
    title: { en: "Web Development & Hosting", ar: "تطوير المواقع والاستضافة" },
    image:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80",
  },
  {
    key: "branding",
    category: { en: "Branding", ar: "الهوية" },
    title: { en: "Graphic Design & Branding", ar: "التصميم والهوية البصرية" },
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    key: "automation",
    category: { en: "Automation", ar: "الأتمتة" },
    title: { en: "Automation Systems", ar: "أنظمة الأتمتة" },
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
  },
  {
    key: "seo",
    category: { en: "Visibility", ar: "الظهور الرقمي" },
    title: { en: "SEO, GMR & AI Visibility", ar: "السيو وخرائط جوجل والظهور في الذكاء الاصطناعي" },
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    key: "reputation",
    category: { en: "Trust", ar: "السمعة" },
    title: { en: "Reputation & Reviews", ar: "إدارة السمعة والتقييمات" },
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function ServicesGrid({ language }: { language: Language }) {
  const isRTL = language === "ar";
  const sectionRef = useRef<HTMLElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [trackBounds, setTrackBounds] = useState({ start: 0, end: 0 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const horizontalX = useTransform(
    scrollYProgress,
    [0.3, 0.82],
    [trackBounds.start, trackBounds.end]
  );
  const trackOpacity = useTransform(scrollYProgress, [0, 0.22, 0.3, 0.82, 0.9, 1], [0, 0, 1, 1, 0, 0]);
  const trackY = useTransform(scrollYProgress, [0.22, 0.3, 0.82, 0.9], [24, 0, 0, 24]);
  const headlineOpacity = useTransform(
    scrollYProgress,
    [0, 0.08, 0.22, 0.3, 0.82, 0.9, 1],
    [0.55, 1, 1, 0, 0, 1, 1]
  );
  const headlineScale = useTransform(
    scrollYProgress,
    [0, 0.08, 0.22, 0.3, 0.82, 0.9, 1],
    [0.97, 1, 1, 0.98, 0.98, 1, 1]
  );
  const headlineY = useTransform(scrollYProgress, [0, 0.08, 0.22, 0.3, 0.82, 0.9, 1], [20, 0, 0, -36, -36, 0, 0]);
  const headlineGlow = useTransform(scrollYProgress, [0.08, 0.22, 0.9, 1], [0.3, 1, 0.6, 0.6]);
  const headlineTextShadow = useTransform(
    headlineGlow,
    (value) => `0 0 ${value * 24}px rgba(15,31,30,0.12)`
  );

  useLayoutEffect(() => {
    const measure = () => {
      if (!stickyRef.current || !trackRef.current) return;
      const viewportWidth = stickyRef.current.clientWidth;
      const trackWidth = trackRef.current.scrollWidth;
      const overshoot = 220;
      const start = isRTL ? -trackWidth - overshoot : viewportWidth + overshoot;
      const end = isRTL ? viewportWidth + overshoot : -trackWidth - overshoot;
      setTrackBounds({ start, end });
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [isRTL]);

  return (
    <section
      id="services"
      ref={sectionRef}
      dir={isRTL ? "rtl" : "ltr"}
      className="relative h-[560vh] bg-white text-[#0F1F1E] dark:bg-[#070D0C] dark:text-[#EAF2EE]"
    >
      <div
        ref={stickyRef}
        className="sticky top-0 flex h-screen items-center overflow-hidden px-6"
      >
        <div className="relative mx-auto w-full max-w-6xl">
          <div className="relative flex min-h-[45vh] items-center justify-center">
            <motion.div
              style={{
                scale: headlineScale,
                opacity: headlineOpacity,
                y: headlineY,
              }}
              className={cn("relative z-10 text-center", isRTL && "text-right")}
            >
              <p
                className={cn(
                  "text-xs font-semibold text-[#5A6B66] dark:text-[#9FB1AB]",
                  isRTL ? "arabic-text" : "uppercase tracking-[0.35em]"
                )}
              >
                {isRTL ? "خدماتنا الأساسية" : "Core Services"}
              </p>
              <motion.h2
                className={cn(
                  "mt-4 text-4xl font-semibold tracking-tight text-[#0F1F1E]/85 dark:text-[#EAF2EE]/90 sm:text-5xl lg:text-6xl",
                  isRTL ? "arabic-text" : "font-[var(--font-jakarta)]"
                )}
                style={{ textShadow: headlineTextShadow }}
              >
                {isRTL ? "نبني بنية رقمية حديثة قابلة للنمو" : "WE BUILD MODERN DIGITAL INFRASTRUCTURE"}
              </motion.h2>
            </motion.div>
          </div>

          <motion.div
            ref={trackRef}
            style={{ x: horizontalX, opacity: trackOpacity, y: trackY }}
            className="absolute left-0 top-[52%] z-20 flex w-max -translate-y-1/2 items-center gap-6"
          >
            {services.map((service) => (
              <motion.div
                key={service.key}
                whileHover={{ y: -20, scale: 1.02 }}
                className="group"
              >
                <Card className="relative w-[280px] aspect-[9/16] overflow-hidden rounded-2xl border-0 bg-transparent p-0 text-white shadow-[0_22px_55px_rgba(15,31,30,0.2)] sm:w-[300px] lg:w-[320px]">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${service.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/22 to-transparent" />
                  <CardContent
                    className={cn(
                      "absolute inset-x-0 bottom-0 p-0 text-white",
                      isRTL && "text-right"
                    )}
                  >
                    <div className="bg-gradient-to-t from-[#060A09]/92 via-[#060A09]/52 to-transparent px-5 pb-5 pt-12">
                      <p
                        className={cn(
                          "text-[0.63rem] font-semibold text-[#8FE8D2]/95",
                          isRTL ? "arabic-text tracking-normal" : "uppercase tracking-[0.24em]"
                        )}
                      >
                        {service.category[language]}
                      </p>
                      <p
                        className={cn(
                          "mt-2 text-[1.55rem] font-semibold leading-[1.1] text-white",
                          isRTL ? "arabic-text" : "font-[var(--font-jakarta)]"
                        )}
                      >
                        {service.title[language]}
                      </p>
                      <span
                        className={cn(
                          "mt-3 block h-px w-16 bg-gradient-to-r from-[#6AEACB] to-transparent",
                          isRTL && "mr-auto"
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
