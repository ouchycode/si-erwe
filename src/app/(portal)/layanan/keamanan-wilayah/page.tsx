import { PageHeader } from "@/components/ui/PageHeader";
import { ContentSection } from "@/components/ui/ContentSection";
import { Video, MapPin, ShieldAlert } from "lucide-react";
import MapComponent from "@/components/MapComponent";
import Image from "next/image";

export const metadata = { title: "Keamanan Wilayah - RW 04 Pabuaran, Kota Tangerang" };

export default function KeamananWilayah() {
  return (
    <div className="min-h-screen bg-white font-sans pb-20">
      <PageHeader
        category="Layanan Warga"
        title="Keamanan Wilayah"
        description="Perangkat pengamanan wilayah RW 04 Pabuaran, Kota Tangerang"
      />

      {/* Section 1: Petugas Keamanan */}
      <ContentSection>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-brand-primary/10 rounded-xs flex items-center justify-center shrink-0 text-brand-primary">
                <ShieldAlert size={24} />
              </div>
              <h2 className="text-3xl font-bold text-slate-800">
                Petugas Keamanan
              </h2>
            </div>
            <div className="text-gray-600 space-y-6 text-lg leading-relaxed">
              <p>
                Sistem keamanan lingkungan RW 04 dikelola oleh tim keamanan yang terlatih dan berdedikasi tinggi. Mereka bertugas secara bergilir 24 jam untuk memastikan kenyamanan dan ketertiban seluruh warga.
              </p>
              <p>
                Warga juga diwajibkan melapor jika ada tamu yang menginap lebih dari 1x24 jam melalui Ketua RT masing-masing demi meminimalisir potensi gangguan keamanan.
              </p>
            </div>
          </div>
          
          <div className="relative h-[400px] lg:h-[500px] w-full rounded-xs overflow-hidden shadow-xl">
            <Image 
              src="https://images.unsplash.com/photo-1584433144859-1fc3ab64a957?q=80&w=1000&auto=format&fit=crop" 
              alt="Petugas Keamanan" 
              fill 
              loading="eager"
              className="object-cover"
            />
          </div>
        </div>
      </ContentSection>

      {/* Section 2: Sistem Pengawasan CCTV */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative h-[400px] lg:h-[500px] w-full rounded-xs overflow-hidden shadow-xl order-2 lg:order-1">
              <Image 
                src="https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=1000&auto=format&fit=crop" 
                alt="Sistem Pengawasan CCTV" 
                fill 
                className="object-cover"
              />
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-white rounded-xs flex items-center justify-center shrink-0 text-brand-primary shadow-sm">
                  <Video size={24} />
                </div>
                <h2 className="text-3xl font-bold text-slate-800">
                  Sistem Pengawasan CCTV
                </h2>
              </div>
              <div className="text-gray-600 space-y-6 text-lg leading-relaxed">
                <p>
                  Sebagai komitmen dalam meningkatkan keamanan, wilayah RW 04 kini telah dilengkapi dengan puluhan titik kamera pengawas (CCTV) yang menjangkau area strategis seperti gerbang masuk utama, persimpangan blok, dan fasilitas umum.
                </p>
                <ul className="space-y-3 mt-4">
                  {[
                    "Pemantauan terpusat di Pos Keamanan Utama",
                    "Rekaman disimpan secara otomatis selama 14 hari",
                    "Dapat diakses oleh warga jika ada keperluan mendesak dengan izin pengurus"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-brand-primary font-bold text-xs">✓</span>
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Poskamling */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <div className="w-16 h-16 bg-slate-50 rounded-xs flex items-center justify-center shadow-sm text-slate-800 mb-8 mx-auto border border-slate-100">
            <MapPin size={32} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-8">
            Lokasi Pos Keamanan (Poskamling)
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-12">
            Pos Keamanan Utama berada di dekat Gerbang Utama Pabuaran untuk memastikan pemantauan lalu lalang secara maksimal. Beberapa pos bantuan juga tersebar di tiap blok yang dikoordinasikan secara berkala.
          </p>
          
          <div className="w-full h-[400px] bg-slate-100 rounded-xs overflow-hidden shadow-md relative">
            <MapComponent />
          </div>
        </div>
      </section>
    </div>
  );
}
