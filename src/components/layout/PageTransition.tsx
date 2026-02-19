"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

type PageTransitionProps = {
  children: React.ReactNode;
};

type Direction = 1 | -1;

const HOME_PATH_PATTERN = /^\/(en|ar)\/?$/;

function isHomePath(pathname: string) {
  return HOME_PATH_PATTERN.test(pathname);
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const direction: Direction = isHomePath(pathname) ? -1 : 1;

  if (prefersReducedMotion) {
    return <div className="overflow-x-clip">{children}</div>;
  }

  return (
    <div className="overflow-x-clip">
      <motion.div
        key={pathname}
        initial={{
          x: direction === -1 ? "-12vw" : "12vw",
          opacity: 0.58,
          scale: 0.992,
        }}
        animate={{ x: "0vw", opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="min-h-screen transform-gpu will-change-[transform,opacity]"
        style={{ backfaceVisibility: "hidden" }}
      >
        {children}
      </motion.div>
    </div>
  );
}
