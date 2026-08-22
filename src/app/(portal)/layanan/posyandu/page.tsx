import { PageHeader } from "@/components/ui/PageHeader";
import { Users, HeartPulse } from "lucide-react";
import Image from "next/image";
import { ContentSection } from "@/components/ui/ContentSection";
import { getSettings, getGroup } from "@/lib/settings";
import { resolveImageUrl } from "@/lib/api";

export const metadata = { title: "Pos Pelayanan Terpadu (Posyandu) - RW 004 Pabuaran, Kota Tangerang" };

const DEFAULTS = {
  deskripsi: "Pos Pelayanan Terpadu kesehatan ibu, anak, dan lanjut usia RW 004 Pabuaran, Kota Tangerang",
  s1Judul: "Kader Posyandu & Pelayanan",
  s1Teks: [
    "Layanan Posyandu RW 004 Pabuaran digerakkan oleh para kader kesehatan yang terlatih dan berdedikasi tinggi. Mereka bertugas memberikan pelayanan kesehatan dasar bagi ibu hamil, bayi, balita, serta warga lanjut usia (lansia) di lingkungan sekitar.",
    "Kader juga memberikan edukasi kesehatan kepada masyarakat untuk meningkatkan kesadaran gizi dan kualitas hidup warga sejak usia dini.",
  ],
  s1Kutipan:
    "Dengan jadwal rutin yang diadakan setiap bulan, kader Posyandu memantau tumbuh kembang balita melalui penimbangan berat badan, pengukuran tinggi badan, serta pemberian makanan tambahan (PMT) bergizi.",
  s1Gambar: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop",
  s2Judul: "Fasilitas & Layanan Kesehatan",
  s2Teks: [
    "Gedung Posyandu RW 004 Pabuaran dilengkapi dengan fasilitas yang memadai untuk menunjang kegiatan pelayanan kesehatan secara optimal. Bekerja sama dengan tenaga kesehatan dari Puskesmas setempat, kami menyediakan layanan imunisasi dasar lengkap, pemeriksaan ibu hamil, hingga pengecekan kesehatan preventif seperti tekanan darah dan gula darah bagi lansia.",
    "Partisipasi aktif warga sangat diharapkan dalam setiap kegiatan Posyandu yang diselenggarakan. Dengan fasilitas yang mudah dijangkau dan pelayanan yang ramah serta profesional, kami berkomitmen untuk mewujudkan generasi penerus yang sehat, kuat, dan cerdas, sekaligus menjaga kesejahteraan kesehatan para lansia di lingkungan RW 004 Pabuaran.",
  ],
  s2Gambar: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1200&auto=format&fit=crop",
};

export default async function PosyanduPage() {
  const settings = await getSettings();
  const g = (key: string, fallback: unknown) =>
    getGroup(settings, "posyandu", key) ?? fallback;

  const s1Teks = g("s1Teks", DEFAULTS.s1Teks) as string[];
  const s2Teks = g("s2Teks", DEFAULTS.s2Teks) as string[];

  return (
    <div className="min-h-screen font-sans pb-16">
      <PageHeader
        category="Layanan Warga"
        title="Pos Pelayanan Terpadu (Posyandu)"
        description={(g("deskripsi", DEFAULTS.deskripsi) as string) || DEFAULTS.deskripsi}
      />

      {/* Kader Posyandu & Pelayanan (Cardless Editorial) */}
      <ContentSection className="relative overflow-hidden">
        {/* Decorative blob */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-50 rounded-full blur-[100px] opacity-60 pointer-events-none -translate-y-1/2 translate-x-1/3"></div>

        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div data-aos="fade-up" className="w-full lg:w-5/12 relative aspect-[4/5] rounded-xs overflow-hidden shadow-xl">
              <Image
                src={resolveImageUrl(g("s1Gambar", DEFAULTS.s1Gambar) as string) || DEFAULTS.s1Gambar}
                alt="Kader Posyandu"
                fill
                priority
                className="object-cover"
              />
            </div>

            <div className="w-full lg:w-7/12 flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-brand-primary/10 rounded-xs flex items-center justify-center shrink-0 text-brand-primary">
                  <Users size={28} />
                </div>
                <h2 data-aos="fade-up" className="text-3xl font-bold text-slate-800">
                  {(g("s1Judul", DEFAULTS.s1Judul) as string) || DEFAULTS.s1Judul}
                </h2>
              </div>
              <div data-aos="fade-up" className="text-gray-600 space-y-6 text-lg leading-relaxed">
                {s1Teks[0] && <p>{s1Teks[0]}</p>}
                {s1Teks[1] && (
                  <blockquote className="pl-6 border-l-4 border-brand-primary text-slate-800 font-medium italic text-xl my-8 py-2">
                    &ldquo;{(g("s1Kutipan", DEFAULTS.s1Kutipan) as string) || DEFAULTS.s1Kutipan}&rdquo;
                  </blockquote>
                )}
                {s1Teks.slice(1).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Fasilitas & Layanan Kesehatan (Cardless Center Heavy) */}
      <section className="bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 md:px-8 pt-16 md:pt-24 pb-12 text-center">
          <div className="w-16 h-16 bg-rose-500 rounded-xs flex items-center justify-center shadow-lg shadow-rose-200 text-white mb-8 mx-auto rotate-3">
            <HeartPulse size={32} />
          </div>
          <h2 data-aos="fade-up" className="text-3xl md:text-4xl font-bold text-slate-800 mb-8">
            {(g("s2Judul", DEFAULTS.s2Judul) as string) || DEFAULTS.s2Judul}
          </h2>
          <div data-aos="fade-up" className="space-y-6">
            {s2Teks.map((p, i) => (
              <p key={i} className="text-gray-600 text-lg leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </div>

        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 pb-16 md:pb-24">
          <div data-aos="fade-up" className="relative h-[400px] md:h-[600px] w-full rounded-xs overflow-hidden shadow-xl">
            <Image
              src={resolveImageUrl(g("s2Gambar", DEFAULTS.s2Gambar) as string) || DEFAULTS.s2Gambar}
              alt="Fasilitas Layanan Kesehatan"
              fill
              className="object-cover object-center"
            />
          </div>
        </div>
      </section>
    </div>
  );
}