import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-xl border border-transparent px-3 py-1 text-xs font-semibold tracking-[0.16em] uppercase w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/40 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow,background-color,border-color,transform] duration-200 overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-[#20293D] bg-gradient-to-b from-[#1E2638] to-[#121827] text-white shadow-[0_8px_18px_rgba(10,16,31,0.24)] [a&]:hover:-translate-y-0.5",
        secondary:
          "border border-[#D2D8E4] bg-white/90 text-[#2A3140] shadow-[0_8px_16px_rgba(12,18,34,0.08)] [a&]:hover:-translate-y-0.5",
        brand:
          "border border-[#2C5D55] bg-gradient-to-r from-[#0E1D1A] to-[#1A3A35] text-[#E6FFF8] shadow-[0_10px_22px_rgba(7,18,16,0.28)] hover:border-[#E6D8B8]",
        "brand-outline":
          "border border-[#4ED1B2]/80 bg-white/66 text-[#12342D] shadow-[0_10px_18px_rgba(11,28,24,0.14)] backdrop-blur-md hover:border-[#E6D8B8] hover:bg-[#4ED1B2]/12 hover:text-[#0F1F1E]",
        destructive:
          "bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border-[#D2D8E4] bg-transparent text-[#3A4254] [a&]:hover:bg-white/60 [a&]:hover:text-[#111827]",
        ghost: "[a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        link: "text-primary underline-offset-4 [a&]:hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
