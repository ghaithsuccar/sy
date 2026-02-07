"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Language } from "@/lib/use-language";
import { cn } from "@/lib/utils";

const services = [
  {
    key: "web",
    category: { en: "Web Dev", ar: "تطوير ويب" },
    title: { en: "Web Dev & Hosting", ar: "تطوير واستضافة المواقع" },
    image:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80",
  },
  {
    key: "branding",
    category: { en: "Branding", ar: "الهوية" },
    title: { en: "Branding Systems", ar: "أنظمة العلامة التجارية" },
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    key: "automation",
    category: { en: "AI Automation", ar: "أتمتة ذكية" },
    title: { en: "AI Automation", ar: "الأتمتة بالذكاء الاصطناعي" },
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
  },
  {
    key: "seo",
    category: { en: "SEO / GMR", ar: "سيو / خرائط" },
    title: { en: "SEO & GMR", ar: "تحسين الظهور والخرائط" },
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    key: "reputation",
    category: { en: "Reputation", ar: "السمعة" },
    title: { en: "Reputation Mgmt", ar: "إدارة السمعة" },
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
    [0.07, 0.62],
    [trackBounds.start, trackBounds.end]
  );
  const trackOpacity = useTransform(scrollYProgress, [0.07, 0.62, 0.66], [1, 1, 0]);
  const trackY = useTransform(scrollYProgress, [0.62, 0.66], [0, 24]);
  const headlineOpacity = useTransform(
    scrollYProgress,
    [0, 0.12, 0.24, 0.56, 0.64, 0.72, 0.8],
    [1, 0.08, 0.35, 1, 1, 0.35, 0]
  );
  const headlineScale = useTransform(
    scrollYProgress,
    [0, 0.12, 0.24, 0.56, 0.64, 0.8],
    [1, 0.84, 0.88, 1, 1, 0.94]
  );
  const headlineY = useTransform(scrollYProgress, [0.72, 0.8], [0, -80]);
  const headlineGlow = useTransform(scrollYProgress, [0.46, 0.7], [0, 1]);
  const headlineTextShadow = useTransform(
    headlineGlow,
    (value) => `0 0 ${value * 24}px rgba(255,255,255,0.08)`
  );

  useLayoutEffect(() => {
    const measure = () => {
      if (!stickyRef.current || !trackRef.current) return;
      const viewportWidth = stickyRef.current.clientWidth;
      const trackWidth = trackRef.current.scrollWidth;
      const overshoot = 80;
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
      className="relative h-[240vh] bg-[#0A0A0A] text-white"
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
              className={cn("text-center", isRTL && "text-right")}
            >
              <p
                className={cn(
                  "text-xs font-semibold text-white/40",
                  isRTL ? "arabic-text" : "uppercase tracking-[0.35em]"
                )}
              >
                {isRTL ? "خدماتنا" : "Our Services"}
              </p>
              <h2
                className={cn(
                  "mt-4 text-4xl font-semibold tracking-tight text-white/70 sm:text-5xl lg:text-6xl",
                  isRTL ? "arabic-text" : "font-[var(--font-jakarta)]"
                )}
                style={{ textShadow: headlineTextShadow }}
              >
                {isRTL ? "نجعل علامتك التجارية لا تُنسى" : "WE MAKE BRANDS UNSKIPPABLE"}
              </h2>
            </motion.div>
          </div>

          <motion.div
            ref={trackRef}
            style={{ x: horizontalX, opacity: trackOpacity, y: trackY }}
            className="absolute left-0 top-[52%] flex w-max -translate-y-1/2 items-center gap-6"
          >
            {services.map((service) => (
              <motion.div
                key={service.key}
                whileHover={{ y: -20, scale: 1.02 }}
                className="group"
              >
                <Card className="relative w-[280px] aspect-[9/16] overflow-hidden rounded-[40px] border-0 bg-transparent p-0 text-white shadow-[0_22px_55px_rgba(15,31,30,0.2)] sm:w-[300px] lg:w-[320px]">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${service.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <Badge
                    variant="secondary"
                    className={cn(
                      "absolute top-5 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-[#0F1F1E]",
                      isRTL ? "right-5 arabic-text" : "left-5 uppercase tracking-[0.3em]"
                    )}
                  >
                    {service.category[language]}
                  </Badge>
                  <CardContent
                    className={cn(
                      "absolute bottom-5 left-5 right-5 rounded-2xl border border-white/25 bg-white/15 p-4 text-white backdrop-blur-md",
                      isRTL && "text-right"
                    )}
                  >
                    <p
                      className={cn(
                        "text-lg font-semibold",
                        isRTL ? "arabic-text" : "font-[var(--font-jakarta)]"
                      )}
                    >
                      {service.title[language]}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            <Button
              type="button"
              variant="secondary"
              className={cn(
                "group h-auto rounded-full border border-white/20 bg-white px-6 py-3 text-xs font-semibold text-[#0F1F1E] transition-all duration-300 hover:-translate-y-2 hover:bg-white/90 hover:text-[#0F1F1E]",
                isRTL ? "arabic-text" : "uppercase tracking-[0.3em]"
              )}
            >
              <span className="inline-flex items-center gap-3">
                {isRTL ? "عرض الكل" : "View All"}
                <ArrowRight className={cn("h-4 w-4", isRTL && "rotate-180")} />
              </span>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
