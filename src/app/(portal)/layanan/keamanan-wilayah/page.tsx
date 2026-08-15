import { PageHeader } from "@/components/ui/PageHeader";
import { ContentSection } from "@/components/ui/ContentSection";
import { Video, MapPin, ShieldAlert } from "lucide-react";
import MapComponent from "@/components/MapComponent";
import Image from "next/image";
import { getSettings, getGroup } from "@/lib/settings";

export const metadata = { title: "Keamanan Wilayah - RW 04 Pabuaran, Kota Tangerang" };

const DEFAULTS = {
  deskripsi: "Perangkat pengamanan wilayah RW 04 Pabuaran, Kota Tangerang",
  s1Judul: "Petugas Keamanan",
  s1Teks: [
    "Sistem keamanan lingkungan RW 04 dikelola oleh tim keamanan yang terlatih dan berdedikasi tinggi. Mereka bertugas secara bergilir 24 jam untuk memastikan kenyamanan dan ketertiban seluruh warga.",
    "Warga juga diwajibkan melapor jika ada tamu yang menginap lebih dari 1x24 jam melalui Ketua RT masing-masing demi meminimalisir potensi gangguan keamanan.",
  ],
  s1Gambar: "https://images.unsplash.com/photo-1584433144859-1fc3ab64a957?q=80&w=1000&auto=format&fit=crop",
  s2Judul: "Sistem Pengawasan CCTV",
  s2Teks: [
    "Sebagai komitmen dalam meningkatkan keamanan, wilayah RW 04 kini telah dilengkapi dengan puluhan titik kamera pengawas (CCTV) yang menjangkau area strategis seperti gerbang masuk utama, persimpangan blok, dan fasilitas umum.",
  ],
  s2List: [
    "Pemantauan terpusat di Pos Keamanan Utama",
    "Rekaman disimpan secara otomatis selama 14 hari",
    "Dapat diakses oleh warga jika ada keperluan mendesak dengan izin pengurus",
  ],
  s2Gambar: "https://images.unsplash.com/photo-1557591941937-e2e1bb93e52?q=80&w=1000&auto=format&fit=crop",
  s3Judul: "Lokasi Pos Keamanan (Poskamling)",
  s3Teks: [
    "Pos Keamanan Utama berada di dekat Gerbang Utama Pabuaran untuk memastikan pemantauan lalu lalang secara maksimal. Beberapa pos bantuan juga tersebar di tiap blok yang dikoordinasikan secara berkala.",
  ],
};

export default async function KeamananWilayah() {
  const settings = await getSettings();
  const g = (key: string, fallback: unknown) =>
    getGroup(settings, "keamanan_wilayah", key) ?? fallback;

  const s1Teks = g("s1Teks", DEFAULTS.s1Teks) as string[];
  const s2Teks = g("s2Teks", DEFAULTS.s2Teks) as string[];
  const s2List = g("s2List", DEFAULTS.s2List) as string[];
  const s3Teks = g("s3Teks", DEFAULTS.s3Teks) as string[];

  return (
    <div className="min-h-screen bg-white font-sans pb-20">
      <PageHeader
        category="Layanan Warga"
        title="Keamanan Wilayah"
        description={(g("deskripsi", DEFAULTS.deskripsi) as string) || DEFAULTS.deskripsi}
      />

      {/* Section 1: Petugas Keamanan */}
      <ContentSection>
        <div data-aos="fade-up" className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-brand-primary/10 rounded-xs flex items-center justify-center shrink-0 text-brand-primary">
                <ShieldAlert size={24} />
              </div>
              <h2 data-aos="fade-up" className="text-3xl font-bold text-slate-800">
                {(g("s1Judul", DEFAULTS.s1Judul) as string) || DEFAULTS.s1Judul}
              </h2>
            </div>
            <div data-aos="fade-up" className="text-gray-600 space-y-6 text-lg leading-relaxed">
              {s1Teks.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          <div data-aos="fade-up" className="relative h-[400px] lg:h-[500px] w-full rounded-xs overflow-hidden shadow-xl">
            <Image
              src={(g("s1Gambar", DEFAULTS.s1Gambar) as string) || DEFAULTS.s1Gambar}
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
          <div data-aos="fade-up" className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative h-[400px] lg:h-[500px] w-full rounded-xs overflow-hidden shadow-xl order-2 lg:order-1">
              <Image
                src={(g("s2Gambar", DEFAULTS.s2Gambar) as string) || DEFAULTS.s2Gambar}
                alt="Sistem Pengawasan CCTV"
                fill
                className="object-cover"
              />
            </div>

            <div data-aos="fade-up" className="order-1 lg:order-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-white rounded-xs flex items-center justify-center shrink-0 text-brand-primary shadow-sm">
                  <Video size={24} />
                </div>
                <h2 data-aos="fade-up" className="text-3xl font-bold text-slate-800">
                  {(g("s2Judul", DEFAULTS.s2Judul) as string) || DEFAULTS.s2Judul}
                </h2>
              </div>
              <div data-aos="fade-up" className="text-gray-600 space-y-6 text-lg leading-relaxed">
                {s2Teks.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                <ul className="space-y-3 mt-4">
                  {s2List.map((item, idx) => (
                    <li data-aos="fade-up" key={idx} className="flex items-start gap-3">
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
          <h2 data-aos="fade-up" className="text-3xl md:text-4xl font-bold text-slate-800 mb-8">
            {(g("s3Judul", DEFAULTS.s3Judul) as string) || DEFAULTS.s3Judul}
          </h2>
          <p data-aos="fade-up" className="text-gray-600 text-lg leading-relaxed mb-12">
            {(s3Teks[0] as string) || DEFAULTS.s3Teks[0]}
          </p>

          <div data-aos="fade-up" className="w-full h-[400px] bg-slate-100 rounded-xs overflow-hidden shadow-md relative">
            <MapComponent />
          </div>
        </div>
      </section>
    </div>
  );
}