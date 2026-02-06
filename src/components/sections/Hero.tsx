"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";
import { Suspense, useRef } from "react";
import type { Group } from "three";

import type { Language } from "@/lib/use-language";
import { cn } from "@/lib/utils";

type HeroProps = {
  language: Language;
};

function MarketingShape() {
  const groupRef = useRef<Group>(null);

  useFrame(({ clock, mouse }) => {
    const group = groupRef.current;
    if (!group) return;

    const t = clock.getElapsedTime();
    group.rotation.y = t * 0.25 + mouse.x * 0.8;
    group.rotation.x = t * 0.12 + mouse.y * 0.6;
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <torusKnotGeometry args={[1, 0.35, 120, 16]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.6} roughness={0.2} />
      </mesh>
      {[0, 1, 2].map((index) => (
        <mesh
          key={index}
          position={[
            Math.cos((index / 3) * Math.PI * 2) * 2,
            Math.sin((index / 3) * Math.PI * 2) * 1.2,
            Math.sin((index / 3) * Math.PI * 2) * 1.4,
          ]}
        >
          <sphereGeometry args={[0.22, 32, 32]} />
          <meshStandardMaterial color="#F5F5F5" emissive="#D4AF37" emissiveIntensity={0.2} />
        </mesh>
      ))}
    </group>
  );
}

export default function Hero({ language }: HeroProps) {
  const isRTL = language === "ar";

  const content = {
    headline:
      language === "ar"
        ? "ارتقِ بأعمالك إلى أوج الذكاء الاصطناعي والتسويق"
        : "Elevate Your Business to the Zenith of AI & Marketing.",
    subheadline:
      language === "ar"
        ? "نركز على تحسين محركات البحث، وأتمتة الذكاء الاصطناعي، والنمو المحلي لأعمالك في سوريا."
        : "Focused on SEO, AI automation, and local growth for Syrian businesses.",
    primaryCta: language === "ar" ? "ابدأ عبر واتساب" : "Start via WhatsApp",
    secondaryCta: language === "ar" ? "شاهد أعمالنا" : "View Our Work",
  };

  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div
        className={cn(
          "mx-auto grid w-full max-w-6xl items-center gap-16 px-6 lg:grid-cols-2",
          isRTL ? "lg:text-right" : "lg:text-left"
        )}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={cn("space-y-6", isRTL ? "lg:order-2" : "lg:order-1")}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/50">
            Ouj Marketing
          </p>
          <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
            {content.headline}
          </h1>
          <p className="max-w-xl text-base leading-7 text-white/70 sm:text-lg">
            {content.subheadline}
          </p>
          <div
            className={cn(
              "flex flex-wrap gap-4",
              isRTL ? "justify-end" : "justify-start"
            )}
          >
            <a
              href="https://wa.me/963000000000"
              className="rounded-full bg-[#D4AF37] px-6 py-3 text-sm font-semibold uppercase tracking-widest text-black shadow-[0_0_30px_rgba(212,175,55,0.35)] transition-transform hover:scale-[1.02]"
            >
              {content.primaryCta}
            </a>
            <a
              href="#case-studies"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-white/80 transition-colors hover:border-white/50 hover:text-white"
            >
              {content.secondaryCta}
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={cn(
            "relative flex items-center justify-center",
            isRTL ? "lg:order-1" : "lg:order-2"
          )}
        >
          <div className="relative h-72 w-72 sm:h-80 sm:w-80">
            <motion.div
              className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,#D4AF37_0%,rgba(212,175,55,0.15)_45%,rgba(10,10,10,0)_70%)] blur-xl"
              animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="absolute inset-0">
              <Canvas
                camera={{ position: [0, 0, 5], fov: 45 }}
                gl={{ antialias: true, alpha: true }}
              >
                <Suspense fallback={null}>
                  <ambientLight intensity={0.6} />
                  <directionalLight position={[4, 4, 6]} intensity={1.2} />
                  <pointLight position={[-4, -2, 2]} intensity={0.6} color="#D4AF37" />
                  <MarketingShape />
                </Suspense>
              </Canvas>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
