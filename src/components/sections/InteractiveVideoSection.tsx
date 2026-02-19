"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { Bot, Megaphone, Pause, Play, Radar, Sparkles } from "lucide-react";
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

import type { Language } from "@/lib/use-language";
import { cn } from "@/lib/utils";

type InteractiveVideoSectionProps = {
  language: Language;
};

type StoryItem = {
  id: string;
  icon: "strategy" | "visibility" | "content" | "automation";
  title: string;
  summary: string;
  color: string;
};

const videoSrc = "/Videos/Marketing-Plan-With-Digital-Technology-Concept-2026-01-28-05-00-16-Utc.mp4";

export default function InteractiveVideoSection({ language }: InteractiveVideoSectionProps) {
  const isRTL = language === "ar";
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(sectionRef, { amount: 0.35 });

  const [activeStory, setActiveStory] = useState(0);
  const [isVideoHovered, setIsVideoHovered] = useState(false);
  const [hoveredStory, setHoveredStory] = useState<number | null>(null);
  const [hasPointerMoved, setHasPointerMoved] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [supportsHover, setSupportsHover] = useState(true);

  const stories: StoryItem[] =
    language === "ar"
      ? [
          {
            id: "01",
            icon: "strategy",
            title: "خارطة النمو الرقمي",
            summary: "نحدد مسار النمو للعلامة عبر خطة واضحة تربط الرسالة بالنتائج.",
            color: "bg-[#0F1F1E] text-[#E6D8B8]",
          },
          {
            id: "02",
            icon: "visibility",
            title: "تعزيز الظهور",
            summary: "نرفع حضورك في القنوات التي يصل عبرها جمهورك بقرارات تسويقية دقيقة.",
            color: "bg-[#4ED1B2] text-[#0F1F1E]",
          },
          {
            id: "03",
            icon: "content",
            title: "محتوى بصري مؤثر",
            summary: "نحول الفكرة إلى تجربة بصرية حديثة تدعم الهوية وتزيد التفاعل.",
            color: "bg-[#E6D8B8] text-[#0F1F1E]",
          },
          {
            id: "04",
            icon: "automation",
            title: "أتمتة التحويلات",
            summary: "نربط التسويق بالأتمتة لتحويل الاهتمام إلى عملاء بخطوات منظمة.",
            color: "bg-[#0F1F1E] text-[#4ED1B2]",
          },
        ]
      : [
          {
            id: "01",
            icon: "strategy",
            title: "Digital Growth Blueprint",
            summary: "We map your growth path with a clear strategy tied to measurable outcomes.",
            color: "bg-[#0F1F1E] text-[#E6D8B8]",
          },
          {
            id: "02",
            icon: "visibility",
            title: "Visibility That Compounds",
            summary: "We strengthen your reach across the channels your customers already trust.",
            color: "bg-[#4ED1B2] text-[#0F1F1E]",
          },
          {
            id: "03",
            icon: "content",
            title: "High-Impact Creative Content",
            summary: "We turn ideas into modern visual assets built to increase engagement.",
            color: "bg-[#E6D8B8] text-[#0F1F1E]",
          },
          {
            id: "04",
            icon: "automation",
            title: "Automated Conversion Flow",
            summary: "We connect campaigns to automation so attention becomes qualified leads.",
            color: "bg-[#0F1F1E] text-[#4ED1B2]",
          },
        ];

  const labels = {
    stageTitle: language === "ar" ? "قسم فيديو تسويقي" : "Marketing Video Showcase",
    stageDesc:
      language === "ar"
        ? "تجربة بصرية حديثة تربط الاستراتيجية بالمحتوى والتحويل."
        : "A modern visual layer that connects strategy, content, and conversion.",
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updatePreference = () => setSupportsHover(mediaQuery.matches);

    updatePreference();
    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updatePreference);
      return () => mediaQuery.removeEventListener("change", updatePreference);
    }

    mediaQuery.addListener(updatePreference);
    return () => mediaQuery.removeListener(updatePreference);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isInView) {
      video.play().catch(() => undefined);
      return;
    }

    video.pause();
  }, [isInView]);

  useEffect(() => {
    if (!isInView || hoveredStory !== null) return;
    const interval = window.setInterval(() => {
      setActiveStory((previous) => (previous + 1) % stories.length);
    }, 3800);

    return () => window.clearInterval(interval);
  }, [hoveredStory, isInView, stories.length]);

  const isInteractiveHover = supportsHover ? isVideoHovered || hoveredStory !== null : true;

  const baseX = useMotionValue(0);
  const baseY = useMotionValue(0);
  const ctaX = useSpring(baseX, { stiffness: 280, damping: 30, mass: 0.55 });
  const ctaY = useSpring(baseY, { stiffness: 280, damping: 30, mass: 0.55 });

  const handleStagePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!stageRef.current || !supportsHover) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const paddedX = Math.max(95, Math.min(rect.width - 95, x));
    const paddedY = Math.max(70, Math.min(rect.height - 70, y));
    baseX.set(paddedX);
    baseY.set(paddedY);
    if (!hasPointerMoved) setHasPointerMoved(true);
  };

  const handleStagePointerEnter = () => {
    if (!stageRef.current || !supportsHover) return;
    const rect = stageRef.current.getBoundingClientRect();
    baseX.set(rect.width * 0.28);
    baseY.set(rect.height * 0.58);
  };

  const toggleVideoPlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
      return;
    }

    video.pause();
    setIsPlaying(false);
  };

  return (
    <section
      ref={sectionRef}
      dir={isRTL ? "rtl" : "ltr"}
      className="relative overflow-hidden bg-white px-6 py-20 text-[#0F1F1E] dark:bg-[#0F1F1E] dark:text-[#EAF2EE]"
    >
      <div
        className={cn(
          "mx-auto grid w-full max-w-7xl gap-7 lg:grid-cols-[0.85fr_1.75fr]",
          isRTL && "lg:grid-cols-[1.75fr_0.85fr]"
        )}
      >
        <div className={cn("relative bg-transparent p-2 sm:p-4", isRTL ? "lg:order-2" : "lg:order-1")}>
          <p
            className={cn(
              "text-[0.68rem] font-semibold text-[#0F1F1E]/65 dark:text-[#E6D8B8]/78",
              isRTL ? "arabic-text text-right tracking-normal" : "uppercase tracking-[0.28em]"
            )}
          >
            {language === "ar" ? "مسار التسويق" : "Marketing Flow"}
          </p>
          <h3
            className={cn(
              "mt-3 text-[2rem] font-semibold leading-none tracking-tight text-[#0F1F1E] dark:text-[#EAF2EE]",
              isRTL ? "arabic-text text-right" : "font-brand-display"
            )}
          >
            {language === "ar" ? "من الخطة إلى التحويل" : "From Strategy To Conversion"}
          </h3>
          <p className={cn("mt-3 text-sm leading-relaxed text-[#0F1F1E]/72 dark:text-[#E6D8B8]/80", isRTL && "arabic-text text-right")}>
            {language === "ar"
              ? "مراحل أساسية توضح كيف نبني الأداء التسويقي بما ينسجم مع محتوى الفيديو."
              : "Core stages showing how we build marketing performance in line with the video narrative."}
          </p>

          <div className="mt-7">
            {stories.map((story, index) => {
              const isActive = index === activeStory;
              return (
                <button
                  key={story.id}
                  type="button"
                  onMouseEnter={() => {
                    setActiveStory(index);
                    setHoveredStory(index);
                  }}
                  onMouseLeave={() => setHoveredStory(null)}
                  onFocus={() => {
                    setActiveStory(index);
                    setHoveredStory(index);
                  }}
                  onBlur={() => setHoveredStory(null)}
                  onClick={() => setActiveStory(index)}
                  className={cn(
                    "group flex w-full items-start gap-4 border-b border-[#E6D8B8]/60 px-0 py-4 text-left transition-all duration-200 dark:border-[#4ED1B2]/20",
                    isRTL && "flex-row-reverse text-right",
                    isActive
                      ? "text-[#0F1F1E] dark:text-[#EAF2EE]"
                      : "text-[#0F1F1E]/85 hover:text-[#0F1F1E] dark:text-[#E6D8B8]/80 dark:hover:text-[#EAF2EE]"
                  )}
                >
                  <span
                    className={cn(
                      "mt-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-transform duration-200 group-hover:scale-105",
                      story.color
                    )}
                  >
                    {story.icon === "strategy" && <Radar className="size-5" />}
                    {story.icon === "visibility" && <Megaphone className="size-5" />}
                    {story.icon === "content" && <Sparkles className="size-5" />}
                    {story.icon === "automation" && <Bot className="size-5" />}
                  </span>
                  <span className="min-w-0">
                    <span className={cn("block text-lg font-semibold leading-tight", isRTL && "arabic-text")}>
                      {story.title}
                    </span>
                    <span className={cn("mt-1 block text-sm leading-relaxed text-[#0F1F1E]/72 dark:text-[#E6D8B8]/80", isRTL && "arabic-text")}>
                      {story.summary}
                    </span>
                  </span>
                  <span className={cn("ml-auto mt-1 hidden text-[0.68rem] font-semibold text-[#0F1F1E]/48 lg:block", isRTL && "ml-0 mr-auto")}>
                    {story.id}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <motion.div
          className={cn(
            "relative overflow-hidden rounded-3xl border border-[#E6D8B8]/70 bg-[#F6F7F7] shadow-[0_10px_26px_rgba(15,31,30,0.09)] dark:border-[#4ED1B2]/25 dark:bg-[#0F1F1E]",
            isRTL ? "lg:order-1" : "lg:order-2"
          )}
          ref={stageRef}
          onHoverStart={() => {
            if (!supportsHover) return;
            setIsVideoHovered(true);
          }}
          onHoverEnd={() => {
            if (!supportsHover) return;
            setIsVideoHovered(false);
            setHoveredStory(null);
            setHasPointerMoved(false);
          }}
          onPointerEnter={handleStagePointerEnter}
          onPointerMove={handleStagePointerMove}
          onPointerLeave={() => {
            if (!supportsHover) return;
            setIsVideoHovered(false);
            setHoveredStory(null);
            setHasPointerMoved(false);
          }}
          onClick={toggleVideoPlayback}
        >
          <motion.video
            ref={videoRef}
            src={videoSrc}
            muted
            loop
            playsInline
            autoPlay
            preload="metadata"
            className="h-full min-h-[460px] w-full object-cover"
            animate={{ scale: supportsHover && isInteractiveHover ? 1.03 : 1 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-black/0" />

          <motion.div
            animate={{ opacity: isInteractiveHover ? 1 : 0.88, y: isInteractiveHover ? 0 : 6 }}
            transition={{ duration: 0.25 }}
            className={cn(
              "absolute bottom-0 left-0 right-0 p-6 text-white",
              isRTL ? "text-right" : "text-left"
            )}
          >
            <p
              className={cn(
                "max-w-[78%] text-2xl font-semibold tracking-tight",
                isRTL ? "ml-auto arabic-text" : "font-brand-display"
              )}
            >
              {labels.stageTitle}
            </p>
            <p className={cn("mt-1 max-w-[78%] text-sm text-white/85", isRTL && "ml-auto arabic-text")}>
              {stories[activeStory]?.summary ?? labels.stageDesc}
            </p>
            <p className={cn("mt-2 max-w-[78%] text-sm font-medium text-[#E6D8B8]", isRTL && "ml-auto arabic-text")}>
              {stories[activeStory]?.title}
            </p>
          </motion.div>

          <motion.button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              toggleVideoPlayback();
            }}
            animate={{
              opacity: supportsHover ? (isInteractiveHover ? 1 : 0) : 1,
              scale: supportsHover ? (isInteractiveHover ? 1 : 0.96) : 1,
            }}
            transition={{ duration: 0.25 }}
            className={cn(
              "absolute z-10 inline-flex items-center justify-center rounded-full bg-[#4ED1B2] text-[#0F1F1E] shadow-[0_8px_20px_rgba(78,209,178,0.38)] hover:bg-[#7BDEC7]",
              supportsHover
                ? "-translate-x-1/2 -translate-y-1/2 p-3"
                : cn("bottom-5 p-3.5", isRTL ? "left-5" : "right-5")
            )}
            style={
              supportsHover
                ? {
                    left: hasPointerMoved ? ctaX : "30%",
                    top: hasPointerMoved ? ctaY : "58%",
                  }
                : undefined
            }
            aria-label={isPlaying ? (isRTL ? "إيقاف الفيديو" : "Pause video") : (isRTL ? "تشغيل الفيديو" : "Play video")}
          >
            {isPlaying ? <Pause className="size-5 fill-current" /> : <Play className="size-5 fill-current" />}
          </motion.button>

          <div className={cn("absolute bottom-4 flex items-center gap-2", isRTL ? "left-6" : "right-6")}>
            {stories.map((story, index) => (
              <button
                key={story.id}
                type="button"
                onMouseEnter={() => {
                  setActiveStory(index);
                  setHoveredStory(index);
                }}
                onMouseLeave={() => setHoveredStory(null)}
                onFocus={() => {
                  setActiveStory(index);
                  setHoveredStory(index);
                }}
                onBlur={() => setHoveredStory(null)}
                onClick={(event) => {
                  event.stopPropagation();
                  setActiveStory(index);
                }}
                className={cn(
                  "h-2.5 rounded-full transition-all",
                  index === activeStory ? "w-7 bg-[#E6D8B8]" : "w-2.5 bg-[#4ED1B2]/60 hover:bg-[#4ED1B2]"
                )}
                aria-label={`Select story ${story.id}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
