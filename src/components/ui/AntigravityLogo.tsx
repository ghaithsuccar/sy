"use client";

import { useState } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

type AntigravityLogoProps = {
  className?: string;
  imageClassName?: string;
  alt?: string;
  priority?: boolean;
};

export function AntigravityLogo({
  className,
  imageClassName,
  alt = "MASAR Marketing logo",
  priority = false,
}: AntigravityLogoProps) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <span className={cn("relative inline-flex overflow-hidden", className)}>
      {imageFailed ? (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-full w-full"
          aria-label={alt}
          role="img"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      ) : (
        <Image
          src="/masar-logo-trimmed.png"
          alt={alt}
          width={711}
          height={227}
          priority={priority}
          className={cn(
            "h-full w-full object-contain object-left dark:brightness-0 dark:invert",
            imageClassName
          )}
          onError={() => setImageFailed(true)}
        />
      )}
    </span>
  );
}
