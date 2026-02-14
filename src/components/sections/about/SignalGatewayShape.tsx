"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Code2,
  Facebook,
  Instagram,
  Linkedin,
  MapPin,
  Megaphone,
  Music2,
  Youtube,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { MouseEvent } from "react";

import { cn } from "@/lib/utils";

type SignalNode = {
  key: string;
  Icon: LucideIcon;
  label: string;
  color: string;
  x: number;
  y: number;
  floatDuration: number;
  floatDelay: number;
};

const nodes: SignalNode[] = [
  { key: "instagram", Icon: Instagram, label: "Instagram", color: "#D62976", x: 14, y: 24, floatDuration: 5.8, floatDelay: 0.2 },
  { key: "linkedin", Icon: Linkedin, label: "LinkedIn", color: "#0A66C2", x: 86, y: 22, floatDuration: 6.1, floatDelay: 0.45 },
  { key: "facebook", Icon: Facebook, label: "Facebook", color: "#1877F2", x: 16, y: 76, floatDuration: 5.6, floatDelay: 0.85 },
  { key: "youtube", Icon: Youtube, label: "YouTube", color: "#FF0033", x: 87, y: 74, floatDuration: 6.4, floatDelay: 0.35 },
  { key: "tiktok", Icon: Music2, label: "TikTok", color: "#111111", x: 33, y: 13, floatDuration: 6.2, floatDelay: 0.7 },
  { key: "google-ads", Icon: Megaphone, label: "Google Ads", color: "#0F9D58", x: 67, y: 13, floatDuration: 6.8, floatDelay: 0.15 },
  { key: "google-maps", Icon: MapPin, label: "Google Maps", color: "#DB4437", x: 31, y: 87, floatDuration: 6.3, floatDelay: 0.55 },
  { key: "web-dev", Icon: Code2, label: "Web Dev", color: "#4ED1B2", x: 69, y: 87, floatDuration: 5.9, floatDelay: 0.4 },
];

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function buildPath(node: SignalNode, index: number) {
  const centerX = 50;
  const centerY = 50;
  const midX = (centerX + node.x) / 2 + (index % 2 === 0 ? 6 : -6);
  const midY = (centerY + node.y) / 2 + (index % 3 === 0 ? -5 : 5);
  return `M ${centerX} ${centerY} Q ${midX} ${midY} ${node.x} ${node.y}`;
}

export default function SignalGatewayShape() {
  const pointerXRaw = useMotionValue(0.5);
  const pointerYRaw = useMotionValue(0.5);

  const pointerX = useSpring(pointerXRaw, { stiffness: 220, damping: 25, mass: 0.45 });
  const pointerY = useSpring(pointerYRaw, { stiffness: 220, damping: 25, mass: 0.45 });

  const px = useTransform(pointerX, (value) => `${value * 100}%`);
  const py = useTransform(pointerY, (value) => `${value * 100}%`);
  const glow = useMotionTemplate`radial-gradient(380px circle at ${px} ${py}, rgba(78,209,178,0.3), transparent 70%)`;

  const coreX = useTransform(pointerX, [0, 1], [-14, 14]);
  const coreY = useTransform(pointerY, [0, 1], [-12, 12]);
  const coreRotate = useTransform(pointerX, [0, 1], [-7, 7]);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = clamp((event.clientX - rect.left) / rect.width, 0, 1);
    const y = clamp((event.clientY - rect.top) / rect.height, 0, 1);
    pointerXRaw.set(x);
    pointerYRaw.set(y);
  };

  const handleMouseLeave = () => {
    pointerXRaw.set(0.5);
    pointerYRaw.set(0.5);
  };

  return (
    <div className="relative h-full w-full overflow-hidden rounded-3xl" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <motion.div className="pointer-events-none absolute inset-0" style={{ background: glow }} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_10%,rgba(230,216,184,0.3),transparent_44%)] dark:bg-[radial-gradient(circle_at_88%_10%,rgba(230,216,184,0.12),transparent_44%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.3),rgba(255,255,255,0))] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0))]" />

      <svg viewBox="0 0 100 100" className="pointer-events-none absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="gatewayPath" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4ED1B2" stopOpacity="0.66" />
            <stop offset="50%" stopColor="#E6D8B8" stopOpacity="0.52" />
            <stop offset="100%" stopColor="#4ED1B2" stopOpacity="0.28" />
          </linearGradient>
          <linearGradient id="gatewayPulse" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4ED1B2" stopOpacity="0" />
            <stop offset="50%" stopColor="#4ED1B2" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#4ED1B2" stopOpacity="0" />
          </linearGradient>
        </defs>

        {nodes.map((node, index) => (
          <motion.path
            key={`path-${node.key}`}
            d={buildPath(node, index)}
            fill="none"
            stroke="url(#gatewayPath)"
            strokeWidth="0.38"
            strokeLinecap="round"
            strokeDasharray="1.8 2.8"
            animate={{ strokeDashoffset: [0, -12] }}
            transition={{ repeat: Infinity, duration: 7 + (index % 3), ease: "linear" }}
          />
        ))}

        <motion.circle
          cx="50"
          cy="50"
          r="17"
          fill="none"
          stroke="url(#gatewayPulse)"
          strokeWidth="0.3"
          animate={{ r: [17, 19.5, 17], opacity: [0.45, 0.8, 0.45] }}
          transition={{ repeat: Infinity, duration: 3.4, ease: "easeInOut" }}
        />
      </svg>

      <motion.div
        className="absolute left-1/2 top-1/2 z-20 h-44 w-44 -translate-x-1/2 -translate-y-1/2 sm:h-52 sm:w-52"
        style={{ x: coreX, y: coreY, rotate: coreRotate }}
      >
        <motion.div
          className="absolute inset-0 rounded-[30%] border border-[#4ED1B2]/55"
          animate={{ rotate: [0, 360] }}
          transition={{ repeat: Infinity, duration: 24, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-[10%] rounded-[26%] border border-[#E6D8B8]/68"
          animate={{ rotate: [360, 0] }}
          transition={{ repeat: Infinity, duration: 19, ease: "linear" }}
        />
        <div className="absolute inset-[22%] rounded-[24%] border border-[#0F1F1E]/16 bg-white/68 backdrop-blur-sm dark:border-white/20 dark:bg-[#0F1716]/78" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-[#0F1F1E]/16 bg-[#4ED1B2]/82 shadow-[0_8px_20px_rgba(34,165,136,0.34)] dark:border-white/20">
            <span className="absolute inset-[24%] rounded-md border border-[#0F1F1E]/16 bg-white/45 dark:border-white/20 dark:bg-[#14231F]/46" />
          </div>
        </div>
      </motion.div>

      {nodes.map((node) => {
        const Icon = node.Icon;
        return (
          <motion.div
            key={node.key}
            className="absolute z-30 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            animate={{ y: [0, -7, 0], x: [0, 2, 0] }}
            transition={{ duration: node.floatDuration, repeat: Infinity, ease: "easeInOut", delay: node.floatDelay }}
          >
            <span
              className={cn(
                "inline-flex size-11 items-center justify-center rounded-full border border-white/42",
                "bg-white/88 shadow-[0_8px_18px_rgba(8,15,14,0.2)] dark:border-white/24 dark:bg-[#0F1716]/92"
              )}
              style={{ color: node.color }}
              aria-hidden="true"
            >
              <Icon className="size-5" strokeWidth={2.1} />
            </span>
            <span className="pointer-events-none absolute left-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap rounded-full border border-[#0F1F1E]/10 bg-white/88 px-2 py-0.5 text-[10px] font-medium text-[#4A5754] shadow-[0_4px_12px_rgba(8,15,14,0.08)] dark:border-white/18 dark:bg-[#0F1716]/92 dark:text-[#A9B9B4]">
              {node.label}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}
