"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

export type MegaMenuLinkItem = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

export type MegaMenuPreview = {
  title: string;
  href: string;
  imageSrc: string;
  badge?: string;
};

type MegaMenuContentProps = {
  columns: [MegaMenuLinkItem[], MegaMenuLinkItem[]];
  preview: MegaMenuPreview;
  isRTL: boolean;
  onItemSelect?: () => void;
};

export default function MegaMenuContent({
  columns,
  preview,
  isRTL,
  onItemSelect,
}: MegaMenuContentProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 4 }}
      animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.16, ease: "easeOut" }}
      className={cn(
        "grid grid-cols-1 gap-8 px-6 py-6 md:grid-cols-[minmax(0,1.15fr)_minmax(320px,1fr)] md:px-10",
        isRTL && "md:grid-cols-[minmax(320px,1fr)_minmax(0,1.15fr)]"
      )}
    >
      <div className={cn("grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6", isRTL && "text-right")}>
        {columns.map((column, columnIndex) => (
          <ul key={columnIndex} className="space-y-2">
            {column.map((item) => {
              const Icon = item.icon;

              return (
                <li key={item.title}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.href}
                      onClick={onItemSelect}
                      className={cn(
                        "group rounded-xl p-3 transition-colors hover:bg-white/80 focus-visible:ring-2 focus-visible:ring-[#0F1F1E]/15 dark:hover:bg-white/8 dark:focus-visible:ring-white/20",
                        isRTL && "arabic-text"
                      )}
                    >
                      <div className={cn("flex items-start gap-3", isRTL && "flex-row-reverse")}>
                        <Icon
                          className="mt-0.5 size-[1.15rem] shrink-0 text-[#2F6F5E] [stroke-width:1.9] transition-colors duration-200 group-hover:text-[#1E8C73] dark:text-[#63DCC1] dark:group-hover:text-[#94F4E0]"
                          aria-hidden="true"
                        />
                        <span className="space-y-1">
                          <span className="block text-[1.05rem] font-medium leading-tight text-[#20201A] dark:text-[#EEF7F3]">
                            {item.title}
                          </span>
                          <span className="block text-sm leading-6 text-[#6F6F66] dark:text-[#A9B9B4]">{item.description}</span>
                        </span>
                      </div>
                    </Link>
                  </NavigationMenuLink>
                </li>
              );
            })}
          </ul>
        ))}
      </div>

      <NavigationMenuLink asChild>
        <Link
          href={preview.href}
          onClick={onItemSelect}
          className={cn(
            "relative flex min-h-[260px] overflow-hidden rounded-xl border border-black/5 bg-[#ded8ca] p-4 md:min-h-[300px] dark:border-white/15 dark:bg-[#1B2624]",
            isRTL && "order-first md:order-none"
          )}
        >
          {preview.badge ? (
            <span className="absolute start-4 top-4 z-10 rounded-full bg-[#D56A39] px-2.5 py-0.5 text-xs font-semibold text-white">
              {preview.badge}
            </span>
          ) : null}
          <Image
            src={preview.imageSrc}
            alt={preview.title}
            fill
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-cover"
            priority={false}
          />
          <div className="relative z-10 mt-auto w-full rounded-lg bg-black/20 p-3 text-white backdrop-blur-[2px] dark:bg-black/35">
            <p className={cn("text-xl font-semibold leading-tight", isRTL && "arabic-text text-right")}>
              {preview.title}
            </p>
          </div>
        </Link>
      </NavigationMenuLink>
    </motion.div>
  );
}
