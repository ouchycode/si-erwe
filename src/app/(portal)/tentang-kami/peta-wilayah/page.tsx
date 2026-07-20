"use client";

import MapComponent from "@/components/MapComponent";
import { PageHeader } from "@/components/ui/PageHeader";

export default function PetaWilayahPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <PageHeader
        category="Profil Lingkungan"
        title="Peta Wilayah Interaktif"
        description="Jelajahi batas wilayah, lokasi sekretariat RW, serta titik sebaran Poskamling dan Fasilitas Umum di RW 04 Pabuaran."
      />

      <div className="relative z-10 -mt-16">
        <section className="bg-white shadow-[0_-8px_30px_-15px_rgba(0,0,0,0.1)]">
          {/* Map Area */}
          <div className="w-full bg-gray-200 h-[600px] md:h-[700px] relative z-0">
            <MapComponent />
          </div>
        </section>
      </div>
    </div>
  );
}
