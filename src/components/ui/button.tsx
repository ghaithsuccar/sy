import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const glassBase =
  "border backdrop-blur-md supports-[backdrop-filter]:backdrop-blur-md"

const glassPrimary =
  `${glassBase} border-[#7FE8D3]/80 bg-[#4ED1B2]/28 text-[#07211B] shadow-[0_18px_38px_rgba(33,137,115,0.34),inset_0_1px_0_rgba(255,255,255,0.42)] supports-[backdrop-filter]:bg-[#4ED1B2]/22 hover:border-[#A5F3E3] hover:bg-[#4ED1B2]/36 dark:border-[#7DEBD6]/75 dark:bg-[#4ED1B2]/24 dark:text-[#ECFFF9] dark:shadow-[0_18px_38px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.16)] dark:supports-[backdrop-filter]:bg-[#4ED1B2]/18 dark:hover:bg-[#4ED1B2]/32`

const glassSecondary =
  `${glassBase} border-[#E6D8B8]/55 bg-[#E6D8B8]/34 text-[#0F1F1E] shadow-[0_12px_28px_rgba(15,31,30,0.14),inset_0_1px_0_rgba(255,255,255,0.45)] supports-[backdrop-filter]:bg-[#E6D8B8]/26 hover:border-[#4ED1B2]/55 hover:bg-[#E6D8B8]/42 dark:border-[#E6D8B8]/40 dark:bg-[#E6D8B8]/16 dark:text-[#F6F7F7] dark:shadow-[0_14px_30px_rgba(0,0,0,0.34),inset_0_1px_0_rgba(255,255,255,0.1)] dark:supports-[backdrop-filter]:bg-[#E6D8B8]/12 dark:hover:border-[#4ED1B2]/62 dark:hover:bg-[#E6D8B8]/22`

const glassOutline =
  `${glassBase} border-[#0F1F1E]/25 bg-white/52 text-[#0F1F1E] shadow-[0_10px_22px_rgba(15,31,30,0.1),inset_0_1px_0_rgba(255,255,255,0.6)] supports-[backdrop-filter]:bg-white/40 hover:border-[#4ED1B2]/55 hover:bg-white/66 dark:border-white/26 dark:bg-white/10 dark:text-[#EAF2EE] dark:shadow-[0_14px_30px_rgba(0,0,0,0.34),inset_0_1px_0_rgba(255,255,255,0.08)] dark:supports-[backdrop-filter]:bg-white/8 dark:hover:border-[#4ED1B2]/62 dark:hover:bg-white/14`

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold tracking-[0.01em] transition-[transform,box-shadow,background-color,color,border-color] duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/40 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        "light-solid": glassPrimary,
        "light-outline": glassOutline,
        "dark-solid": glassPrimary,
        "dark-outline": glassOutline,
        default: glassPrimary,
        destructive:
          `${glassBase} border-[#EF4444]/65 bg-[#EF4444]/28 text-[#3D0A0A] shadow-[0_14px_28px_rgba(171,33,33,0.3),inset_0_1px_0_rgba(255,255,255,0.38)] supports-[backdrop-filter]:bg-[#EF4444]/22 hover:bg-[#EF4444]/36 dark:border-[#EF4444]/62 dark:bg-[#EF4444]/24 dark:text-[#FEE2E2] dark:supports-[backdrop-filter]:bg-[#EF4444]/18`,
        outline: glassOutline,
        secondary: glassSecondary,
        ghost:
          "text-[#4A5265] hover:bg-white/45 hover:text-[#121726] hover:backdrop-blur-sm dark:text-[#D6DDD8] dark:hover:bg-white/12 dark:hover:text-white",
        brand: glassPrimary,
        "brand-fill":
          `${glassPrimary} h-12 px-7 text-sm font-semibold tracking-[0.14em] uppercase`,
        "brand-outline":
          `${glassSecondary} h-12 px-7 text-sm font-semibold tracking-[0.14em] uppercase`,
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
