import FooterGlobe from "@/components/layout/FooterGlobe";

export default function GlobeLabPage() {
  return (
    <main className="min-h-screen bg-[#f6f7f9] px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-2xl font-semibold text-[#0f172a]">Footer Globe Lab</h1>
        <div className="relative h-[620px] overflow-hidden rounded-2xl border border-black/10 bg-white">
          <FooterGlobe />
        </div>
      </div>
    </main>
  );
}
