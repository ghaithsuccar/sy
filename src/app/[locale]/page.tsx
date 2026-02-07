import HomePage from "@/components/pages/HomePage";

type Locale = "en" | "ar";

export default async function LocalePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: routeLocale } = await params;
  const locale: Locale = routeLocale === "ar" ? "ar" : "en";
  return <HomePage language={locale} />;
}
