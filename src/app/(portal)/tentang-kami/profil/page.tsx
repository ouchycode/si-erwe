import { Target, Eye, BookOpen, MapPin, Users, Home, Building2, Calendar } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContentSection } from "@/components/ui/ContentSection";
import MapComponent from "@/components/MapComponent";
import { getSettings, getGroup } from "@/lib/settings";
import type { ProfilUmum } from "@/lib/types";

export const metadata = { title: "Profil RW" };

const DEFAULT_UMUM: ProfilUmum = {
  periode: "2024 — 2027",
  jumlahKk: 350,
  jumlahRt: 5,
  kecamatan: "Karawaci",
  kelurahan: "Pabuaran",
};

const DEFAULT_SEJARAH = [
  "RW 04 Pabuaran, Kota Tangerang, dibentuk seiring dengan perkembangan pesat pemukiman di wilayah Kota Tangerang. Pada awalnya, wilayah ini hanya terdiri dari beberapa Rukun Tetangga yang terus berkembang hingga sekarang.",
  "Seiring bertambahnya jumlah penduduk, RW 04 kini menaungi 5 RT. Warga RW 04 dikenal dengan semangat kegotongroyongannya yang tinggi, multikultural, dan aktif dalam berbagai kegiatan sosial kemasyarakatan.",
];

const DEFAULT_VISI =
  "Terwujudnya lingkungan RW 04 yang Aman, Bersih, Guyub, dan Sejahtera berlandaskan nilai-nilai Ketuhanan dan Gotong Royong.";

const DEFAULT_MISI = [
  "Meningkatkan sistem keamanan lingkungan terpadu.",
  "Menggalakkan program kebersihan dan penghijauan.",
  "Mendorong partisipasi aktif warga dalam kegiatan sosial.",
  "Mengoptimalkan pelayanan administrasi warga berbasis digital.",
];

export default async function ProfilRW() {
  const settings = await getSettings();

  const umum = (getGroup<ProfilUmum>(settings, "profil", "umum") ?? DEFAULT_UMUM) as ProfilUmum;
  const visi = (getGroup<string>(settings, "profil", "visi") || DEFAULT_VISI) as string;
  const misi = (getGroup<string[]>(settings, "profil", "misi") ?? DEFAULT_MISI) as string[];
  const sejarah = (getGroup<string[]>(settings, "profil", "sejarah") ?? DEFAULT_SEJARAH) as string[];

  const wilayah = [
    { icon: Home, label: "Jumlah RT", value: `${umum.jumlahRt} Rukun Tetangga` },
    { icon: Users, label: "Total Kepala Keluarga", value: `± ${umum.jumlahKk} KK` },
    { icon: MapPin, label: "Kelurahan", value: umum.kelurahan },
    { icon: Calendar, label: "Kecamatan", value: umum.kecamatan },
  ];

  return (
    <div className="min-h-screen bg-white font-sans pb-20">
      <PageHeader
        category="Tentang Kami"
        title="Profil & Sejarah RW 04"
        description="Mengenal lebih dekat lingkungan RW 04 Pabuaran, Kota Tangerang — bersama membangun kehidupan bertetangga yang rukun, aman, dan sejahtera."
        rightContent={
          <div className="flex items-center gap-4 bg-white/10 border border-white/20 rounded-xs px-6 py-4 shrink-0">
            <div className="w-10 h-10 bg-white/10 rounded-xs flex items-center justify-center">
              <Building2 size={18} className="text-white/70" />
            </div>
            <div>
              <p className="text-xs text-white/40 font-bold uppercase tracking-widest mb-0.5">
                Periode Kepengurusan
              </p>
              <p className="text-2xl font-bold text-white">{umum.periode}</p>
            </div>
          </div>
        }
      />

      {/* CONTENT — pulls up over the PageHeader */}
      <ContentSection>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

              {/* KIRI: Sejarah + Visi Misi */}
              <div className="lg:col-span-2 flex flex-col gap-16">

                {/* Sejarah */}
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-xs bg-brand-primary/10 flex items-center justify-center shrink-0 text-brand-primary">
                      <BookOpen size={24} />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-800">Sejarah Singkat</h2>
                  </div>
                  <div className="text-lg text-gray-600 leading-relaxed flex flex-col gap-6">
                    {sejarah.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </div>

                {/* Visi & Misi */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Visi */}
                  <div className="bg-brand-primary rounded-xs p-8 text-white flex flex-col gap-6 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white/10 rounded-xs flex items-center justify-center shrink-0">
                        <Eye size={20} className="text-white/70" />
                      </div>
                      <h2 className="text-sm font-bold tracking-widest uppercase text-white/70">
                        Visi
                      </h2>
                    </div>
                    <p className="text-lg text-white/90 leading-relaxed italic">
                      &quot;{visi}&quot;
                    </p>
                  </div>

                  {/* Misi */}
                  <div className="bg-slate-50 rounded-xs p-8 flex flex-col gap-6 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white rounded-xs flex items-center justify-center shrink-0 shadow-sm text-gray-500">
                        <Target size={20} />
                      </div>
                      <h2 className="text-sm font-bold tracking-widest uppercase text-gray-500">
                        Misi
                      </h2>
                    </div>
                    <ul className="flex flex-col gap-4 text-base text-gray-600 leading-relaxed">
                      {misi.map((m, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="text-brand-primary font-bold mt-0.5 shrink-0 w-5">
                            {i + 1}.
                          </span>
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* KANAN: Info Wilayah + Peta */}
              <div className="flex flex-col gap-12">
                {/* Info Wilayah */}
                <div>
                  <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-8">
                    Informasi Wilayah
                  </p>
                  <div className="flex flex-col gap-6">
                    {wilayah.map(({ icon: Icon, label, value }) => (
                      <div key={label} className="flex items-center gap-5">
                        <div className={`w-12 h-12 rounded-xs flex items-center justify-center shrink-0 bg-brand-primary/10 text-brand-primary`}>
                          <Icon size={20} />
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">
                            {label}
                          </p>
                          <p className="text-base font-bold text-gray-800">{value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Peta */}
                <div className="rounded-xs overflow-hidden shadow-md">
                  <div className="w-full h-64 bg-gray-100 relative">
                    <MapComponent />
                  </div>
                  <div className="bg-slate-50 py-4">
                    <p className="text-sm text-center text-gray-500 font-medium">
                      Peta Lokasi RW 04 Pabuaran
                    </p>
                  </div>
                </div>
              </div>
            </div>
      </ContentSection>
    </div>
  );
}
