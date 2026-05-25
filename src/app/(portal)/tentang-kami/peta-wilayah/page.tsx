"use client";

import dynamic from "next/dynamic";
import { PageHeader } from "@/components/ui/PageHeader";
import { MapPin, Info } from "lucide-react";

// Dynamically import MapComponent to prevent SSR issues with Leaflet
const MapComponent = dynamic(() => import("@/components/MapComponent"), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-100 animate-pulse flex flex-col items-center justify-center text-gray-400">
      <MapPin size={48} className="mb-4 opacity-50" />
      <p className="font-semibold">Memuat Peta Interaktif...</p>
    </div>
  )
});

export default function PetaWilayahPage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans">
      <PageHeader
        category="Profil Lingkungan"
        title="Peta Wilayah Interaktif"
        description="Jelajahi batas wilayah, lokasi sekretariat RW, serta titik sebaran Poskamling dan Fasilitas Umum di RW 12 Kutabumi."
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-16 relative z-10">
        <div className="bg-white border border-gray-200 shadow-sm rounded-xs flex flex-col lg:flex-row min-h-[600px] overflow-hidden">
          
          {/* Sidebar Info */}
          <div className="w-full lg:w-80 bg-gray-50 border-b lg:border-b-0 lg:border-r border-gray-200 p-6 flex flex-col shrink-0">
            <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
              <Info size={20} className="text-brand-primary" />
              Legenda Peta
            </h3>

            <div className="space-y-4 flex-1">
              {/* Legenda Item 1 */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold text-xs shrink-0 border-2 border-white shadow-sm">
                  RW
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm m-0">Sekretariat RW 12</p>
                  <p className="text-xs text-gray-500 mt-1">Pusat pelayanan warga dan kesekretariatan.</p>
                </div>
              </div>

              {/* Legenda Item 2 */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center font-bold text-xs shrink-0 border-2 border-white shadow-sm">
                  P
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm m-0">Poskamling</p>
                  <p className="text-xs text-gray-500 mt-1">Titik pos keamanan di masing-masing RT.</p>
                </div>
              </div>

              {/* Legenda Item 3 */}
              <div className="flex items-start gap-3">
                <MapPin size={32} className="text-blue-500 shrink-0 transform -translate-y-1" />
                <div>
                  <p className="font-semibold text-gray-900 text-sm m-0">Fasilitas Umum</p>
                  <p className="text-xs text-gray-500 mt-1">Taman, sarana olahraga, atau balai pertemuan.</p>
                </div>
              </div>
              
              {/* Legenda Item 4 */}
              <div className="flex items-start gap-3 mt-6 pt-4 border-t border-gray-200">
                <div className="w-8 h-4 border-2 border-brand-primary border-dashed bg-brand-primary/10 mt-1 shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900 text-sm m-0">Batas Wilayah</p>
                  <p className="text-xs text-gray-500 mt-1">Estimasi cakupan administratif RW 12.</p>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-blue-50 p-4 rounded-xs border border-blue-100">
              <p className="text-xs text-blue-800 leading-relaxed font-medium">
                Gunakan jari untuk menggeser (*drag*) atau dua jari untuk *zoom* (di HP). Jika menggunakan mouse, gunakan tombol + / - di pojok kanan bawah peta.
              </p>
            </div>
          </div>

          {/* Map Area */}
          <div className="flex-1 bg-gray-200 min-h-[400px] relative z-0">
            <MapComponent />
          </div>

        </div>
      </div>
    </div>
  );
}
