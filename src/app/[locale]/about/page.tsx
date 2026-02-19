import AboutPage from "@/components/pages/AboutPage";

type Locale = "en" | "ar";

export default async function AboutLocalePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: routeLocale } = await params;
  const locale: Locale = routeLocale === "ar" ? "ar" : "en";
  return <AboutPage language={locale} />;
}
