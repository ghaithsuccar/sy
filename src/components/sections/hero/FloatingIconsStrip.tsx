"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRightToLine,
  Box,
  Braces,
  CircleCheck,
  Code2,
  Command,
  Copy,
  CornerDownLeft,
  Grip,
  LayoutGrid,
  Pencil,
  RefreshCw,
  Scan,
  Share2,
  Sparkle,
  Sparkles,
  SquareCode,
} from "lucide-react";

type StripItem = {
  Icon: LucideIcon;
  label: string;
};

const stripItems: StripItem[] = [
  { Icon: LayoutGrid, label: "Grid" },
  { Icon: Sparkle, label: "Discover" },
  { Icon: Code2, label: "Code" },
  { Icon: Grip, label: "Layout" },
  { Icon: Command, label: "Command" },
  { Icon: CornerDownLeft, label: "Flow" },
  { Icon: Share2, label: "Share" },
  { Icon: CircleCheck, label: "Check" },
  { Icon: SquareCode, label: "Snippet" },
  { Icon: Sparkles, label: "Create" },
  { Icon: Pencil, label: "Edit" },
  { Icon: ArrowRightToLine, label: "Output" },
  { Icon: Braces, label: "Logic" },
  { Icon: RefreshCw, label: "Sync" },
  { Icon: Scan, label: "Scan" },
  { Icon: Sparkles, label: "Polish" },
  { Icon: Box, label: "Deploy" },
  { Icon: Copy, label: "Copy" },
];

export function FloatingIconsStrip() {
  const reducedMotion = !!useReducedMotion();
  const loopItems = [...stripItems, ...stripItems, ...stripItems];

  return (
    <div dir="ltr" className="relative mx-auto w-full max-w-7xl overflow-hidden px-2">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#FAFAFA] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#FAFAFA] to-transparent" />

      <motion.div
        className="flex min-w-max items-center gap-3 py-3 md:gap-4 md:py-4"
        initial={reducedMotion ? false : { opacity: 0 }}
        animate={reducedMotion ? { opacity: 1 } : { opacity: 1, x: ["0%", "-33.3333%"] }}
        transition={{
          opacity: { duration: reducedMotion ? 0 : 0.2 },
          x: { duration: reducedMotion ? 0 : 56, ease: "linear", repeat: reducedMotion ? 0 : Infinity },
        }}
        aria-hidden="true"
      >
        {loopItems.map((item, index) => (
          <motion.div
            key={`${item.label}-${index}`}
            className="flex h-[66px] w-[66px] shrink-0 items-center justify-center rounded-full border border-[#D9DDE8] bg-[#F3F4F8]/92 md:h-[78px] md:w-[78px]"
            animate={reducedMotion ? {} : { y: [0, -2.5, 0, 2.5, 0] }}
            transition={{
              duration: reducedMotion ? 0 : 8.5 + (index % 6) * 0.35,
              repeat: reducedMotion ? 0 : Infinity,
              ease: "easeInOut",
              delay: reducedMotion ? 0 : index * 0.06,
            }}
          >
            <item.Icon className="size-6 text-[#181A20] md:size-7" strokeWidth={1.9} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
