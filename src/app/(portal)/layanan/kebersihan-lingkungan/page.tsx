import { PageHeader } from "@/components/ui/PageHeader";
import { Recycle, Truck } from "lucide-react";
import Image from "next/image";
import { getSettings, getGroup } from "@/lib/settings";

export const metadata = { title: "Kebersihan Lingkungan - RW 004 Pabuaran, Kota Tangerang" };

const DEFAULTS = {
  deskripsi: "Layanan kebersihan dan pengelolaan lingkungan RW 004 Pabuaran, Kota Tangerang",
  s1Judul: "Petugas Kebersihan",
  s1Teks: [
    "Kebersihan lingkungan RW 004 Pabuaran dijaga oleh tim kebersihan khusus yang berdedikasi tinggi. Petugas kebersihan bertugas setiap hari untuk mengumpulkan sampah dari rumah-rumah warga dan memastikan fasilitas umum serta jalanan tetap bersih dan nyaman untuk seluruh warga.",
    "Pengangkutan sampah dilakukan menggunakan armada gerobak motor (bentor) yang beroperasi sesuai jadwal rutin harian. Selain pengangkutan sampah dari rumah ke rumah, petugas kebersihan juga membantu dalam pemeliharaan taman, penyapuan jalan raya utama, dan pembersihan saluran air (drainase) secara berkala untuk mencegah genangan air saat musim hujan.",
  ],
  s1Gambar: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=1200&auto=format&fit=crop",
  s2Judul: "Sistem Pengelolaan Sampah",
  s2Teks: [
    "Pengelolaan sampah di RW 004 Pabuaran dilakukan dengan sistem yang terpadu dan berwawasan lingkungan. Warga diimbau untuk memisahkan sampah organik dan anorganik sebelum diangkut oleh petugas. Sampah anorganik bernilai ekonomis dapat disetorkan secara kolektif ke Bank Sampah yang dikelola oleh kader PKK dan Karang Taruna setempat.",
    "Sistem pengelolaan ini didukung oleh iuran kebersihan warga yang dikelola secara transparan oleh pengurus RW. Dana tersebut dialokasikan sepenuhnya untuk kesejahteraan petugas kebersihan, perawatan armada angkut, serta pengadaan alat kebersihan lingkungan. Dengan sinergi yang baik antara warga dan petugas, RW 004 Pabuaran berkomitmen menciptakan lingkungan yang asri, bersih, hijau, dan bebas dari penyakit menular.",
  ],
  s2Gambar: "https://images.unsplash.com/photo-1604187351574-c75ca79f5807?q=80&w=800&auto=format&fit=crop",
};

export default async function KebersihanLingkungan() {
  const settings = await getSettings();
  const g = (key: string, fallback: unknown) =>
    getGroup(settings, "kebersihan_lingkungan", key) ?? fallback;

  const s1Teks = g("s1Teks", DEFAULTS.s1Teks) as string[];
  const s2Teks = g("s2Teks", DEFAULTS.s2Teks) as string[];

  return (
    <div className="min-h-screen bg-white font-sans pb-20">
      <PageHeader
        category="Layanan Warga"
        title="Kebersihan Lingkungan"
        description={(g("deskripsi", DEFAULTS.deskripsi) as string) || DEFAULTS.deskripsi}
      />

      <div className="relative z-10 -mt-16">
        {/* Section 1: Petugas Kebersihan (Hero Banner) */}
        <section className="bg-white shadow-[0_-8px_30px_-15px_rgba(0,0,0,0.1)] overflow-hidden">
          <div className="relative h-[400px] md:h-[500px] w-full">
            <Image
              src={(g("s1Gambar", DEFAULTS.s1Gambar) as string) || DEFAULTS.s1Gambar}
              alt="Petugas Kebersihan"
              fill
              loading="eager"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent flex items-end">
              <div className="max-w-7xl mx-auto w-full px-4 md:px-8 pb-12 md:pb-16">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-xs flex items-center justify-center shrink-0 border border-white/30 text-white">
                    <Truck size={28} />
                  </div>
                  <h2 data-aos="fade-up" className="text-4xl md:text-5xl font-bold text-white shadow-sm">
                    {(g("s1Judul", DEFAULTS.s1Judul) as string) || DEFAULTS.s1Judul}
                  </h2>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
            <div data-aos="fade-up" className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 text-lg text-gray-600 leading-relaxed">
              {s1Teks.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: Sistem Pengelolaan Sampah (Tinted Cardless) */}
        <section className="bg-emerald-50/50 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div data-aos="fade-up" className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="flex-1 space-y-6">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center shrink-0 shadow-sm text-white">
                    <Recycle size={24} />
                  </div>
                  <h2 data-aos="fade-up" className="text-3xl font-bold text-emerald-950">
                    {(g("s2Judul", DEFAULTS.s2Judul) as string) || DEFAULTS.s2Judul}
                  </h2>
                </div>
                <div data-aos="fade-up" className="text-emerald-900/80 space-y-6 text-lg leading-relaxed">
                  {s2Teks.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
              <div data-aos="fade-up" className="w-full lg:w-5/12 relative aspect-square lg:aspect-[4/3] rounded-xs overflow-hidden shadow-xl rotate-2 hover:rotate-0 transition-transform duration-500">
                <Image
                  src={(g("s2Gambar", DEFAULTS.s2Gambar) as string) || DEFAULTS.s2Gambar}
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