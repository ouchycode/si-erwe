import { PageHeader } from "@/components/ui/PageHeader";
import { Recycle, Truck } from "lucide-react";
import Image from "next/image";

export const metadata = { title: "Kebersihan Lingkungan - RW 04 Pabuaran, Kota Tangerang" };

export default function KebersihanLingkungan() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <PageHeader
        category="Layanan Warga"
        title="Kebersihan Lingkungan"
        description="Layanan kebersihan dan pengelolaan lingkungan RW 04 Pabuaran, Kota Tangerang"
      />

      <div className="relative z-10 -mt-16">
        
        {/* Section 1: Petugas Kebersihan (Hero Banner) */}
        <section className="bg-white shadow-[0_-8px_30px_-15px_rgba(0,0,0,0.1)] overflow-hidden">
          <div className="relative h-[400px] md:h-[500px] w-full">
            <Image 
              src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=1200&auto=format&fit=crop" 
              alt="Petugas Kebersihan" 
              fill 
              className="object-cover"
            />
            {/* Gradient overlay and title */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent flex items-end">
              <div className="max-w-7xl mx-auto w-full px-4 md:px-8 pb-12 md:pb-16">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-xs flex items-center justify-center shrink-0 border border-white/30 text-white">
                    <Truck size={28} />
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold text-white shadow-sm">
                    Petugas Kebersihan
                  </h2>
                </div>
              </div>
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 text-lg text-gray-600 leading-relaxed">
              <p>
                Kebersihan lingkungan RW 04 Pabuaran dijaga oleh tim kebersihan khusus yang berdedikasi tinggi. Petugas kebersihan bertugas setiap hari untuk mengumpulkan sampah dari rumah-rumah warga dan memastikan fasilitas umum serta jalanan tetap bersih dan nyaman untuk seluruh warga.
              </p>
              <p>
                Pengangkutan sampah dilakukan menggunakan armada gerobak motor (bentor) yang beroperasi sesuai jadwal rutin harian. Selain pengangkutan sampah dari rumah ke rumah, petugas kebersihan juga membantu dalam pemeliharaan taman, penyapuan jalan raya utama, dan pembersihan saluran air (drainase) secara berkala untuk mencegah genangan air saat musim hujan.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Sistem Pengelolaan Sampah (Tinted Cardless) */}
        <section className="bg-emerald-50/50 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="flex-1 space-y-6">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center shrink-0 shadow-sm text-white">
                    <Recycle size={24} />
                  </div>
                  <h2 className="text-3xl font-bold text-emerald-950">
                    Sistem Pengelolaan Sampah
                  </h2>
                </div>
                <div className="text-emerald-900/80 space-y-6 text-lg leading-relaxed">
                  <p>
                    Pengelolaan sampah di RW 04 Pabuaran dilakukan dengan sistem yang terpadu dan berwawasan lingkungan. Warga diimbau untuk memisahkan sampah organik dan anorganik sebelum diangkut oleh petugas. Sampah anorganik bernilai ekonomis dapat disetorkan secara kolektif ke Bank Sampah yang dikelola oleh kader PKK dan Karang Taruna setempat.
                  </p>
                  <p>
                    Sistem pengelolaan ini didukung oleh iuran kebersihan warga yang dikelola secara transparan oleh pengurus RW. Dana tersebut dialokasikan sepenuhnya untuk kesejahteraan petugas kebersihan, perawatan armada angkut, serta pengadaan alat kebersihan lingkungan. Dengan sinergi yang baik antara warga dan petugas, RW 04 Pabuaran berkomitmen menciptakan lingkungan yang asri, bersih, hijau, dan bebas dari penyakit menular.
                  </p>
                </div>
              </div>
              <div className="w-full lg:w-5/12 relative aspect-square lg:aspect-[4/3] rounded-xs overflow-hidden shadow-xl rotate-2 hover:rotate-0 transition-transform duration-500">
                <Image 
                  src="https://images.unsplash.com/photo-1604187351574-c75ca79f5807?q=80&w=800&auto=format&fit=crop" 
                  alt="Sistem Pengelolaan Sampah" 
                  fill 
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
