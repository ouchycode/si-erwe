"use client";

import MapComponent from "@/components/MapComponent";
import { PageHeader } from "@/components/ui/PageHeader";

export default function PetaWilayahPage() {
  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans">
      <PageHeader
        category="Profil Lingkungan"
        title="Peta Wilayah Interaktif"
        description="Jelajahi batas wilayah, lokasi sekretariat RW, serta titik sebaran Poskamling dan Fasilitas Umum di RW 04 Pabuaran."
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-16 relative z-10">
        <div className="bg-white border border-slate-100 shadow-sm rounded-xs flex flex-col lg:flex-row min-h-[600px] overflow-hidden">
          
          {/* Map Area */}
          <div className="flex-1 bg-gray-200 min-h-[600px] relative z-0">
            <MapComponent />
          </div>

        </div>
      </div>
    </div>
  );
}
