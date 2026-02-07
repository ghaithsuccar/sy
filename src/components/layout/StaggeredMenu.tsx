"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { createPortal } from "react-dom";

import { cn } from "@/lib/utils";

type MenuItem = {
  label: string;
  href: string;
  ariaLabel?: string;
};

type SocialItem = {
  label: string;
  href: string;
};

type StaggeredMenuProps = {
  position?: "left" | "right";
  items: MenuItem[];
  socialItems?: SocialItem[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  menuLabel: string;
  closeLabel: string;
  accentColor?: string;
  colors?: [string, string];
  isRTL?: boolean;
  buttonClassName?: string;
  footer?: React.ReactNode;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
};

export default function StaggeredMenu({
  position = "right",
  items,
  socialItems = [],
  displaySocials = false,
  displayItemNumbering = false,
  menuLabel,
  closeLabel,
  accentColor = "#4ED1B2",
  colors = ["#E6D8B8", "#4ED1B2"],
  isRTL = false,
  buttonClassName,
  footer,
  onMenuOpen,
  onMenuClose,
}: StaggeredMenuProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const panelId = useId();
  const panelTitleId = `${panelId}-title`;
  const panelRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const side = position === "right" ? 1 : -1;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) {
      previousFocusRef.current = document.activeElement as HTMLElement | null;
      document.body.style.overflow = "hidden";
      onMenuOpen?.();
      window.setTimeout(() => panelRef.current?.focus(), 0);
    } else {
      document.body.style.overflow = "";
      onMenuClose?.();
      if (previousFocusRef.current === buttonRef.current) {
        buttonRef.current?.focus();
      }
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open, onMenuClose, onMenuOpen]);

  useEffect(() => {
    if (!open) return;

    const getFocusableElements = () => {
      const root = panelRef.current;
      if (!root) return [] as HTMLElement[];
      const nodes = root.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])'
      );
      return Array.from(nodes).filter((el) => !el.hasAttribute("disabled") && el.tabIndex !== -1);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = getFocusableElements();
      if (focusable.length === 0) {
        event.preventDefault();
        panelRef.current?.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const handleToggle = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    previousFocusRef.current = buttonRef.current;
    setOpen((prev) => !prev);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const overlayVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: prefersReducedMotion ? 0 : 0.2 } },
      exit: { opacity: 0, transition: { duration: prefersReducedMotion ? 0 : 0.2 } },
    }),
    [prefersReducedMotion]
  );

  const panelVariants = useMemo(
    () => ({
      hidden: { x: `${side * 110}%`, opacity: 0 },
      visible: {
        x: 0,
        opacity: 1,
        transition: { duration: prefersReducedMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] },
      },
      exit: {
        x: `${side * 110}%`,
        opacity: 0,
        transition: { duration: prefersReducedMotion ? 0 : 0.3, ease: [0.4, 0, 0.2, 1] },
      },
    }),
    [prefersReducedMotion, side]
  );

  const layerVariants = useCallback(
    (index: number) => ({
      hidden: { x: `${side * (120 + index * 10)}%` },
      visible: {
        x: 0,
        transition: {
          duration: prefersReducedMotion ? 0 : 0.5 + index * 0.08,
          ease: [0.22, 1, 0.36, 1],
        },
      },
      exit: {
        x: `${side * (120 + index * 10)}%`,
        transition: { duration: prefersReducedMotion ? 0 : 0.3, ease: [0.4, 0, 0.2, 1] },
      },
    }),
    [prefersReducedMotion, side]
  );

  const listVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: prefersReducedMotion ? 0 : 0.06, delayChildren: 0.12 },
      },
    }),
    [prefersReducedMotion]
  );

  const itemVariants = useMemo(
    () => ({
      hidden: { opacity: 0, x: side * 24 },
      visible: {
        opacity: 1,
        x: 0,
        transition: { duration: prefersReducedMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] },
      },
    }),
    [prefersReducedMotion, side]
  );

  const accentStyle = useMemo(
    () => ({ "--sm-accent": accentColor }) as CSSProperties,
    [accentColor]
  );

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        data-testid="staggered-menu-trigger"
        data-mounted={mounted ? "true" : "false"}
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup="dialog"
        onClick={handleToggle}
        className={cn(
          "relative inline-flex items-center gap-3 text-xs font-semibold tracking-[0.3em] text-[#0F1F1E] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0F1F1E]/40",
          isRTL ? "arabic-text" : "uppercase",
          buttonClassName
        )}
        style={{ color: open ? "#0F1F1E" : "#0F1F1E" }}
      >
        <span className="relative h-3 overflow-hidden leading-none">
          <motion.span
            className="block"
            animate={{ y: open ? "-100%" : "0%" }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
          >
            {menuLabel}
          </motion.span>
          <motion.span
            className="block"
            animate={{ y: open ? "0%" : "100%" }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
          >
            {closeLabel}
          </motion.span>
        </span>
        <span className="relative h-4 w-4">
          <motion.span
            className="absolute left-0 right-0 top-1/2 h-[2px] rounded-full bg-current"
            animate={{ rotate: open ? 45 : 0, y: open ? 0 : -4 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
          />
          <motion.span
            className="absolute left-0 right-0 top-1/2 h-[2px] rounded-full bg-current"
            animate={{ rotate: open ? -45 : 0, y: open ? 0 : 4 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
          />
        </span>
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                data-testid="staggered-menu-overlay"
                className="fixed inset-0 z-[120] overflow-hidden"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={overlayVariants}
              >
                <button
                  type="button"
                  data-testid="staggered-menu-backdrop"
                  aria-label="Close menu"
                  onClick={handleClose}
                  className="absolute inset-0 z-0 bg-black/45"
                />

                <div
                  className={cn(
                    "absolute inset-y-0 z-10 flex h-dvh w-screen lg:w-[clamp(260px,38vw,420px)]",
                    position === "right" ? "right-0" : "left-0"
                  )}
                >
                  <div className="absolute inset-0">
                    {colors.map((color, index) => (
                      <motion.div
                        key={`${color}-${index}`}
                        className="absolute inset-0"
                        style={{ background: color }}
                        variants={layerVariants(index)}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      />
                    ))}
                  </div>

                  <motion.aside
                    ref={panelRef}
                    data-testid="staggered-menu-panel"
                    id={panelId}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby={panelTitleId}
                    dir={isRTL ? "rtl" : "ltr"}
                    tabIndex={-1}
                    className={cn(
                      "relative z-10 flex h-dvh w-full flex-col gap-6 overflow-y-auto bg-white/95 px-6 pb-8 pt-24 text-[#0F1F1E] shadow-2xl backdrop-blur-xl",
                      isRTL &&
                        "arabic-text text-right [letter-spacing:normal] [text-transform:none] [font-variant:normal] [font-feature-settings:normal]"
                    )}
                    variants={panelVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <div className="flex items-center justify-between">
                      <p
                        id={panelTitleId}
                        className={cn(
                          "text-xs font-bold text-[#0F1F1E]/45",
                          isRTL ? "arabic-text" : "uppercase tracking-[0.25em]"
                        )}
                      >
                        {menuLabel}
                      </p>
                      <button
                        type="button"
                        onClick={handleClose}
                        aria-label={closeLabel}
                        className={cn(
                          "inline-flex items-center rounded-full border border-[#0F1F1E]/20 px-3 py-1 text-xs font-semibold text-[#0F1F1E] transition-colors hover:bg-[#0F1F1E]/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F1F1E]/40",
                          isRTL ? "arabic-text" : "uppercase tracking-[0.2em]"
                        )}
                      >
                        {closeLabel}
                      </button>
                    </div>

                    <motion.ul
                      className={cn("flex flex-col gap-4", isRTL && "items-end")}
                      variants={listVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {items.map((item, index) => (
                        <motion.li key={`${item.href}-${item.label}`} variants={itemVariants}>
                          <Link
                            href={item.href}
                            aria-label={item.ariaLabel ?? item.label}
                            onClick={handleClose}
                            className={cn(
                              "group flex items-baseline gap-4 text-[clamp(2.2rem,4vw,3.4rem)] font-semibold leading-none tracking-tight text-[#0F1F1E] transition-colors hover:text-[var(--sm-accent)]",
                              isRTL ? "arabic-text" : "uppercase"
                            )}
                            style={accentStyle}
                          >
                            <span>{item.label}</span>
                            {displayItemNumbering && (
                              <span
                                className="text-sm font-medium tracking-normal text-[var(--sm-accent)]"
                                style={accentStyle}
                              >
                                {String(index + 1).padStart(2, "0")}
                              </span>
                            )}
                          </Link>
                        </motion.li>
                      ))}
                    </motion.ul>

                    {displaySocials && socialItems.length > 0 && (
                      <div className="mt-6">
                        <p
                          className="text-sm font-semibold"
                          style={{ color: accentColor }}
                        >
                          Socials
                        </p>
                        <div className="mt-3 flex flex-wrap gap-4">
                          {socialItems.map((social) => (
                            <Link
                              key={social.href}
                              href={social.href}
                              className="text-base font-medium text-[#0F1F1E] transition-colors hover:text-[var(--sm-accent)]"
                              style={accentStyle}
                            >
                              {social.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {footer}
                  </motion.aside>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
