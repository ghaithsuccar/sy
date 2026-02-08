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
                {isRTL ? "خدماتنا الأساسية" : "Core Services"}
              </p>
              <h2
                className={cn(
                  "mt-4 text-4xl font-semibold tracking-tight text-white/70 sm:text-5xl lg:text-6xl",
                  isRTL ? "arabic-text" : "font-[var(--font-jakarta)]"
                )}
                style={{ textShadow: headlineTextShadow }}
              >
                {isRTL ? "نبني بنية رقمية حديثة قابلة للنمو" : "WE BUILD MODERN DIGITAL INFRASTRUCTURE"}
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
                    variant="brand-outline"
                    className={cn(
                      "absolute top-5 rounded-full px-3.5 py-1.5 text-[10px] shadow-[0_12px_20px_rgba(6,18,25,0.3)]",
                      isRTL ? "right-5 arabic-text tracking-normal" : "left-5 tracking-[0.24em]"
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
              variant="brand-outline"
              className={cn(
                "group h-12 min-w-[210px] justify-start border-white/60 bg-[#0A0A0A]/35 text-white backdrop-blur-sm before:bg-[#4ED1B2]/28 hover:bg-[#0A0A0A]/55",
                "[&_svg]:text-white",
                isRTL ? "arabic-text" : "uppercase tracking-[0.3em]"
              )}
            >
              <span className="inline-flex items-center gap-3">
                {isRTL ? "عرض كل الخدمات" : "View All Services"}
                <span className="inline-flex size-8 items-center justify-center rounded-full border border-white/70 bg-white/15 transition-colors duration-200 group-hover:border-[#E6D8B8] group-hover:bg-[#E6D8B8]/28"><ArrowRight className={cn("size-4 text-white", isRTL && "rotate-180")} /></span>
              </span>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
