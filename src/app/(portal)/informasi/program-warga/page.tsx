import Image from "next/image";
import {
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  MapPin,
  Recycle,
  Sprout,
  Users,
} from "lucide-react";
import { ContentSection } from "@/components/ui/ContentSection";
import { PageHeader } from "@/components/ui/PageHeader";
import { getSettings, getGroup } from "@/lib/settings";
import type { ProgramWargaItem, SekretariatKontak } from "@/lib/types";

export const metadata = { title: "Program Warga" };

const PROGRAM_ICON: Record<string, React.ElementType> = {
  KWT: Sprout,
  "Bank Sampah": Recycle,
};

const PROGRAM_IMAGES: Record<string, string> = {
  KWT: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=1200&auto=format&fit=crop",
  "Bank Sampah": "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=1200&auto=format&fit=crop",
};

const DEFAULT_PROGRAMS: ProgramWargaItem[] = [
  {
    nama: "KWT",
    subtitle: "Kelompok Wanita Tani",
    deskripsi: "Mengelola kebun lingkungan, bibit tanaman, dan kegiatan pangan keluarga bersama ibu-ibu warga RW 04.",
    detail: ["Kebun sayur bersama", "Pembibitan tanaman", "Edukasi pangan keluarga"],
    jadwal: { waktu: "Sabtu pekan ke-1", tempat: "Kebun RW 04" },
  },
  {
    nama: "Bank Sampah",
    subtitle: "Pengelolaan Sampah Terpilah",
    deskripsi: "Wadah setoran sampah bernilai guna agar lingkungan lebih bersih dan warga terbiasa memilah dari rumah.",
    detail: ["Setor sampah anorganik", "Pencatatan saldo warga", "Edukasi pilah sampah"],
    jadwal: { waktu: "Minggu pekan ke-2", tempat: "Balai Warga" },
  },
];

const ALUR = [
  "Hubungi kader atau Ketua RT setempat.",
  "Isi data warga yang ingin ikut kegiatan.",
  "Datang sesuai jadwal program di lokasi RW 04.",
];

export default async function ProgramWarga() {
  const settings = await getSettings();

  const daftar = getGroup<ProgramWargaItem[]>(settings, "program_warga", "daftar");
  const programList = daftar && daftar.length > 0 ? daftar : DEFAULT_PROGRAMS;
  const fallbackImages = Object.values(PROGRAM_IMAGES);
  const programs = programList.map((p, i) => ({
    icon: PROGRAM_ICON[p.nama] ?? Sprout,
    title: p.nama,
    subtitle: p.subtitle,
    image: PROGRAM_IMAGES[p.nama] ?? fallbackImages[i % fallbackImages.length],
    desc: p.deskripsi,
    detail: p.detail,
  }));

  const JADWAL = programList.map((p) => ({
    label: p.nama,
    waktu: p.jadwal?.waktu ?? "-",
    tempat: p.jadwal?.tempat ?? "-",
  }));

  const kontak = (settings?.kontak?.sekretariat as SekretariatKontak | undefined);
  const waUrl = kontak?.waTelp ? `https://wa.me/${kontak.waTelp}` : "https://wa.me/62812XXXXXXX";

  return (
    <div className="min-h-screen bg-white font-sans pb-20">
      <PageHeader
        category="Informasi Publik"
        title="Program Warga RW 04"
        description="Informasi kegiatan KWT dan Bank Sampah sebagai ruang gotong royong warga RW 04 Pabuaran."
      />

      <ContentSection>
        <div className="flex flex-col gap-12">
            {/* Program Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 max-w-4xl mx-auto">
              {programs.map(({ icon: Icon, title, subtitle, image, desc, detail }) => (
                <article
                  key={title}
                  className="bg-slate-50 rounded-xs shadow-sm overflow-hidden flex flex-col"
                >
                  <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                    <Image
                      src={image}
                      alt={`Kegiatan ${title}`}
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/75 to-transparent p-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white text-brand-primary rounded-xs flex items-center justify-center shrink-0 shadow-sm">
                          <Icon size={18} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-white/70 mb-1">
                            {subtitle}
                          </p>
                          <h2 className="text-xl font-bold text-white">{title}</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col gap-5 flex-1">
                    <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                    <div className="flex flex-col gap-2 pt-4 border-t border-slate-200 mt-auto">
                      {detail.map((item) => (
                        <div key={item} className="flex items-center gap-2.5 text-sm text-gray-600">
                          <CheckCircle2 size={14} className="text-brand-primary/50 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Jadwal & Cara Ikut */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <section className="lg:col-span-2 bg-slate-50 rounded-xs shadow-sm p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 bg-brand-primary/10 rounded-xs flex items-center justify-center shrink-0">
                    <CalendarDays size={16} className="text-brand-primary" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-1">
                      Jadwal Rutin
                    </p>
                    <h3 className="text-lg font-bold text-slate-800">Agenda Program</h3>
                  </div>
                </div>

                <div className="divide-y divide-slate-200 rounded-xs overflow-hidden">
                  {JADWAL.map((item) => (
                    <div key={item.label} className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-white px-5 py-4">
                      <div className="text-sm font-bold text-slate-800">{item.label}</div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <CalendarDays size={14} className="text-gray-400" />
                        {item.waktu}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin size={14} className="text-gray-400" />
                        {item.tempat}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <aside className="bg-brand-primary rounded-xs shadow-sm p-6 text-white">
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/10">
                  <div className="w-9 h-9 bg-white/10 rounded-xs flex items-center justify-center shrink-0">
                    <ClipboardList size={16} className="text-white/70" />
                  </div>
                  <h3 className="text-sm font-bold tracking-wide">Cara Ikut Program</h3>
                </div>
                <div className="flex flex-col gap-4">
                  {ALUR.map((item, index) => (
                    <div key={item} className="flex gap-3">
                      <span className="w-6 h-6 bg-white text-brand-primary rounded-xs flex items-center justify-center text-xs font-bold shrink-0">
                        {index + 1}
                      </span>
                      <p className="text-sm text-white/80 leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </aside>
            </div>

            {/* Koordinator */}
            <div className="bg-slate-50 rounded-xs shadow-sm p-6 flex flex-col md:flex-row md:items-center justify-between gap-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-brand-primary/10 rounded-xs flex items-center justify-center shrink-0">
                  <Users size={16} className="text-brand-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800 mb-1">Koordinator Program Warga</h3>
                  <p className="text-sm text-gray-500 leading-relaxed max-w-2xl">
                    Untuk pendaftaran dan informasi jadwal terbaru, warga dapat menghubungi kader melalui Ketua RT masing-masing.
                  </p>
                </div>
              </div>
              <a
                href={waUrl}
                className="inline-flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-primary-hover text-white text-sm font-bold px-5 py-3 rounded-xs no-underline transition-colors shrink-0"
              >
                Hubungi Kader
              </a>
            </div>
        </div>
      </ContentSection>
    </div>
  );
}
