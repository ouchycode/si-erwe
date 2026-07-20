import { PageHeader } from "@/components/ui/PageHeader";
import { Video, MapPin, ShieldAlert } from "lucide-react";
import Image from "next/image";

export const metadata = { title: "Keamanan Wilayah - RW 04 Pabuaran, Kota Tangerang" };

export default function KeamananWilayah() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <PageHeader
        category="Layanan Warga"
        title="Keamanan Wilayah"
        description="Perangkat pengamanan wilayah RW 04 Pabuaran, Kota Tangerang"
      />

      <div className="relative z-10 -mt-16">
        
        {/* Section 1: Petugas Keamanan */}
        <section className="bg-white shadow-[0_-8px_30px_-15px_rgba(0,0,0,0.1)] pt-16 md:pt-24 pb-16 md:pb-24">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
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
                    Keamanan wilayah RW 04 Pabuaran dijaga oleh dua regu keamanan, yaitu <strong>Cakra</strong> dan <strong>Pasoepati</strong>, yang masing-masing beranggotakan 15 personel. Para petugas ini bertugas menjaga ketertiban dan keamanan lingkungan melalui penjagaan di tiga gerbang utama wilayah, serta melakukan patroli berkala di seluruh area pemukiman.
                  </p>
                  <p>
                    Dengan jumlah personel yang memadai dan sistem kerja yang terstruktur, petugas keamanan selalu siap merespons permintaan warga apabila terjadi situasi yang membutuhkan bantuan atau penanganan cepat. Kehadiran dua regu keamanan ini menjadi garda terdepan dalam memastikan lingkungan RW 04 tetap aman, kondusif, dan tertib setiap hari.
                  </p>
                </div>
              </div>
              <div className="relative h-[400px] lg:h-[500px] w-full rounded-xs overflow-hidden shadow-xl">
                <Image 
                  src="https://images.unsplash.com/photo-1544922116-bb4d2bcf3db2?q=80&w=1000&auto=format&fit=crop" 
                  alt="Petugas Keamanan" 
                  fill 
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

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
                  <div className="w-12 h-12 bg-brand-primary/10 rounded-xs flex items-center justify-center shrink-0 text-brand-primary">
                    <Video size={24} />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-800">
                    Sistem Pengawasan CCTV
                  </h2>
                </div>
                <div className="text-gray-600 space-y-6 text-lg leading-relaxed">
                  <p>
                    Untuk meningkatkan keamanan, RW 04 Pabuaran telah dilengkapi dengan 145 titik kamera CCTV yang mencakup hampir seluruh sudut gang dan jalan. Pemantauan dilakukan secara terpusat melalui <strong>Central Control Room (CCR)</strong> oleh dua operator yang bekerja bergantian, memastikan setiap aktivitas terekam dan dapat diawasi secara <em>real-time</em>. Rekaman CCTV disimpan dengan durasi retensi hingga 30 hari terakhir, sehingga data video dapat ditinjau kembali jika diperlukan.
                  </p>
                  <p>
                    Bagi warga yang membutuhkan akses rekaman untuk keperluan tertentu, Sekretariat RW 04 Pabuaran menyediakan prosedur resmi melalui formulir permohonan yang harus diisi terlebih dahulu. Dengan sistem pengawasan yang terintegrasi dan operasional yang profesional, fasilitas CCTV ini menjadi elemen penting dalam menjaga keamanan, mendeteksi potensi gangguan, serta memberikan rasa aman bagi seluruh warga RW 04 Pabuaran, Kota Tangerang.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Map */}
        <section className="bg-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex flex-col items-center text-center mb-12">
              <div className="w-16 h-16 bg-slate-100 rounded-xs flex items-center justify-center text-slate-600 mb-6">
                <MapPin size={32} />
              </div>
              <h2 className="text-3xl font-bold text-slate-800 mb-4">
                Peta Pengawasan Wilayah
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl">
                Area cakupan pengawasan petugas keamanan dan titik persebaran CCTV di lingkungan RW 04 Pabuaran.
              </p>
            </div>
            <div className="w-full h-[500px] bg-slate-100 rounded-xs overflow-hidden relative shadow-xl">
              <iframe 
                src="https://maps.google.com/maps?q=Pabuaran,+Karawaci,+Tangerang+City,+Banten&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                className="w-full h-full border-0" 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
