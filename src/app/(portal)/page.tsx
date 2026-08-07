import Hero from "@/components/home/Hero";
import LayananSection from "@/components/home/LayananSection";
import BeritaSection from "@/components/home/BeritaSection";
import CTASection from "@/components/home/CTASection";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <Hero />
      <LayananSection />
      <BeritaSection />
      <CTASection />
    </div>
  );
}

