"use client";

import { useCallback, useState } from "react";

export type Language = "en" | "ar";

export function useLanguage(initial: Language = "en") {
  const [language, setLanguage] = useState<Language>(initial);

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === "en" ? "ar" : "en"));
  }, []);

  return { language, setLanguage, toggleLanguage };
}
