"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { Language } from "@/lib/use-language";

type TypedHeaderProps = {
    text: string;
    language: Language;
};

export function TypedHeader({ text, language }: TypedHeaderProps) {
    const isRTL = language === "ar";

    // Split text into words, then characters
    const words = text.split(" ");

    // Container variants for staggering
    const containerAndCursor = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.03, delayChildren: 0.2 },
        }),
    };

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 200,
            } as const,
        },
        hidden: {
            opacity: 0,
            y: 5,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 200,
            } as const,
        },
    };

    return (
        <motion.h1
            key={text} // Force re-render when text/language changes
            className="landing-main-header relative flex flex-wrap justify-center gap-[0.25em] text-5xl font-medium tracking-tighter text-[#202124] sm:text-6xl md:text-7xl lg:text-8xl"
            variants={containerAndCursor}
            initial="hidden"
            animate="visible"
            style={{
                direction: isRTL ? "rtl" : "ltr",
                fontFamily: "var(--font-jakarta), sans-serif",
            }}
        >
            {words.map((word, index) => (
                <span key={index} className="inline-block whitespace-nowrap">
                    {word.split("").map((char, charIndex) => (
                        <motion.span
                            key={charIndex}
                            variants={child}
                            className="inline-block"
                        >
                            {char}
                        </motion.span>
                    ))}
                </span>
            ))}
        </motion.h1>
    );
}
