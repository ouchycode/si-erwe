import Hero from "@/app/home/Hero";
import LayananSection from "@/app/home/LayananSection";
import BeritaSection from "@/app/home/BeritaSection";

export default function Home() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <Hero />
      <LayananSection />

      <BeritaSection />
    </div>
  );
}
