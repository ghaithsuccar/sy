import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold tracking-[0.01em] transition-[transform,box-shadow,background-color,color,border-color] duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/40 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        "light-solid":
          "border border-[#0F1F1E] bg-[#0F1F1E] text-white shadow-[0_12px_24px_rgba(15,31,30,0.16)] hover:-translate-y-0.5 hover:bg-[#16302B] dark:border-white dark:bg-white dark:text-[#0D1715] dark:hover:bg-[#EAF2EE]",
        "light-outline":
          "border border-[#0F1F1E]/25 bg-transparent text-[#0F1F1E] shadow-[0_8px_18px_rgba(9,15,27,0.08)] hover:-translate-y-0.5 hover:bg-[#0F1F1E]/[0.06] dark:border-white/35 dark:text-white dark:hover:bg-white/10",
        "dark-solid":
          "border border-[#1E4740] bg-gradient-to-r from-[#0B1715] via-[#12302A] to-[#1D5A4E] text-white shadow-[0_16px_26px_rgba(15,31,30,0.3)] hover:-translate-y-0.5 hover:from-[#0D1D1A] hover:via-[#16423A] hover:to-[#22705F]",
        "dark-outline":
          "border border-[#0F1F1E]/35 bg-transparent text-[#0F1F1E] shadow-[0_10px_20px_rgba(15,31,30,0.12)] hover:-translate-y-0.5 hover:bg-[#0F1F1E]/[0.06] dark:border-white/30 dark:text-white dark:hover:bg-white/10",
        default:
          "border border-[#0F1F1E] bg-[#0F1F1E] text-white shadow-[0_12px_24px_rgba(15,31,30,0.16)] hover:-translate-y-0.5 hover:bg-[#16302B] dark:border-white dark:bg-white dark:text-[#0D1715] dark:hover:bg-[#EAF2EE]",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border border-[#0F1F1E]/25 bg-transparent text-[#0F1F1E] shadow-[0_8px_18px_rgba(9,15,27,0.08)] hover:-translate-y-0.5 hover:bg-[#0F1F1E]/[0.06] dark:border-white/35 dark:text-white dark:hover:bg-white/10",
        secondary:
          "border border-[#0F1F1E]/25 bg-transparent text-[#0F1F1E] shadow-[0_8px_18px_rgba(9,15,27,0.08)] hover:-translate-y-0.5 hover:bg-[#0F1F1E]/[0.06] dark:border-white/35 dark:text-white dark:hover:bg-white/10",
        ghost:
          "text-[#4A5265] hover:bg-black/5 hover:text-[#121726] dark:hover:bg-accent/50",
        brand:
          "border border-[#4ED1B2]/60 bg-gradient-to-b from-[#59E2C1] to-[#3CBFA0] text-[#0E1D1A] shadow-[0_14px_28px_rgba(56,182,150,0.35)] hover:-translate-y-0.5 hover:from-[#62E9C8] hover:to-[#45C8A8]",
        "brand-fill":
          "h-12 border border-[#1E4740] bg-gradient-to-r from-[#0B1715] via-[#12302A] to-[#1D5A4E] px-7 text-sm font-semibold tracking-[0.14em] uppercase text-white shadow-[0_16px_26px_rgba(15,31,30,0.3)] hover:-translate-y-0.5 hover:from-[#0D1D1A] hover:via-[#16423A] hover:to-[#22705F]",
        "brand-outline":
          "h-12 border border-[#0F1F1E]/35 bg-transparent px-7 text-sm font-semibold tracking-[0.14em] uppercase text-[#0F1F1E] shadow-[0_10px_20px_rgba(15,31,30,0.12)] hover:-translate-y-0.5 hover:bg-[#0F1F1E]/[0.06] dark:border-white/30 dark:text-white dark:hover:bg-white/10",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-5 py-2.5 has-[>svg]:px-4",
        xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-9 gap-1.5 px-4 has-[>svg]:px-3",
        lg: "h-11 px-7 has-[>svg]:px-5",
        icon: "size-9",
        "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
