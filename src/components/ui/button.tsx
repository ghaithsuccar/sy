import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold tracking-[0.01em] transition-[transform,box-shadow,background-color,color,border-color] duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/40 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "border border-[#20293D] bg-gradient-to-b from-[#1E2638] to-[#121827] text-white shadow-[0_14px_28px_rgba(10,16,31,0.28)] hover:-translate-y-0.5 hover:from-[#242E44] hover:to-[#161E30]",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border border-[#D2D8E4] bg-white text-[#1D2433] shadow-[0_6px_18px_rgba(9,15,27,0.08)] hover:-translate-y-0.5 hover:bg-[#F8FAFC]",
        secondary:
          "border border-[#D2D8E4] bg-white text-[#1D2433] shadow-[0_6px_18px_rgba(9,15,27,0.08)] hover:-translate-y-0.5 hover:bg-[#F8FAFC]",
        ghost:
          "text-[#4A5265] hover:bg-black/5 hover:text-[#121726] dark:hover:bg-accent/50",
        brand:
          "border border-[#4ED1B2]/60 bg-gradient-to-b from-[#59E2C1] to-[#3CBFA0] text-[#0E1D1A] shadow-[0_14px_28px_rgba(56,182,150,0.35)] hover:-translate-y-0.5 hover:from-[#62E9C8] hover:to-[#45C8A8]",
        "brand-fill":
          "h-12 rounded-full border border-[#1E4740] bg-gradient-to-r from-[#0B1715] via-[#12302A] to-[#1D5A4E] px-7 text-sm font-semibold tracking-[0.14em] uppercase text-white shadow-[0_16px_26px_rgba(15,31,30,0.3)] hover:-translate-y-0.5 hover:from-[#0D1D1A] hover:via-[#16423A] hover:to-[#22705F]",
        "brand-outline":
          "h-12 rounded-full border-2 border-[#4ED1B2] bg-transparent px-7 text-sm font-semibold tracking-[0.14em] uppercase text-[#0F1F1E] shadow-[0_10px_20px_rgba(15,31,30,0.12)] hover:-translate-y-0.5 hover:border-[#E6D8B8] hover:bg-[#4ED1B2]/10",
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
