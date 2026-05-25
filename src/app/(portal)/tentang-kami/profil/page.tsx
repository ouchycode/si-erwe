import { Target, Eye, BookOpen, MapPin, Users, Home, Building2, Calendar } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";

export default function ProfilRW() {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <PageHeader
        category="Tentang Kami"
        title="Profil & Sejarah RW 12"
        description="Mengenal lebih dekat lingkungan RW 12 Kutabumi, Kab. Tangerang — bersama membangun kehidupan bertetangga yang rukun, aman, dan sejahtera."
        rightContent={
          <div className="flex items-center gap-4 bg-white/10 border border-white/20 rounded-xs px-6 py-4 shrink-0">
            <div className="w-10 h-10 bg-white/10 rounded-xs flex items-center justify-center">
              <Building2 size={18} className="text-blue-200" />
            </div>
            <div>
              <p className="text-xs text-blue-300/80 font-bold uppercase tracking-widest mb-0.5">
                Periode Kepengurusan
              </p>
              <p className="text-2xl font-bold text-white">2024 — 2027</p>
            </div>
          </div>
        }
      />

      {/* CONTENT — pulls up over the PageHeader */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">

          {/* KIRI: Sejarah + Visi Misi */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* Sejarah */}
            <div className="group bg-white rounded-xs border border-slate-100 shadow-sm p-8 hover:shadow-md transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xs flex items-center justify-center shrink-0 icon-badge shadow-sm">
                  <BookOpen size={18} />
                </div>
                <h2 className="text-xl font-bold text-slate-800">Sejarah Singkat</h2>
              </div>
              <div className="text-base text-gray-600 leading-relaxed flex flex-col gap-4">
                <p>
                  RW 12 Kutabumi, Kab. Tangerang, dibentuk seiring dengan
                  perkembangan pesat pemukiman di wilayah Kabupaten Tangerang. Pada
                  awalnya, wilayah ini hanya terdiri dari beberapa Rukun Tetangga
                  yang terus berkembang hingga sekarang.
                </p>
                <p>
                  Seiring bertambahnya jumlah penduduk, RW 12 kini menaungi 8 RT.
                  Warga RW 12 dikenal dengan semangat kegotongroyongannya yang
                  tinggi, multikultural, dan aktif dalam berbagai kegiatan sosial
                  kemasyarakatan.
                </p>
              </div>
            </div>

            {/* Visi & Misi */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Visi */}
              <div className="bg-brand-primary rounded-xs border border-brand-primary-hover p-8 text-white flex flex-col gap-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-xs flex items-center justify-center shrink-0">
                    <Eye size={18} className="text-blue-200" />
                  </div>
                  <h2 className="text-sm font-bold tracking-widest uppercase text-blue-200">
                    Visi
                  </h2>
                </div>
                <p className="text-base text-blue-50/90 leading-relaxed italic">
                  &quot;Terwujudnya lingkungan RW 12 yang Aman, Bersih, Guyub, dan
                  Sejahtera berlandaskan nilai-nilai Ketuhanan dan Gotong
                  Royong.&quot;
                </p>
              </div>

              {/* Misi */}
              <div className="group bg-white rounded-xs border border-slate-100 p-8 flex flex-col gap-4 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xs flex items-center justify-center shrink-0 icon-badge shadow-sm">
                    <Target size={18} />
                  </div>
                  <h2 className="text-sm font-bold tracking-widest uppercase text-gray-500">
                    Misi
                  </h2>
                </div>
                <ul className="flex flex-col gap-3 text-sm text-gray-600 leading-relaxed">
                  {[
                    "Meningkatkan sistem keamanan lingkungan terpadu.",
                    "Menggalakkan program kebersihan dan penghijauan.",
                    "Mendorong partisipasi aktif warga dalam kegiatan sosial.",
                    "Mengoptimalkan pelayanan administrasi warga berbasis digital.",
                  ].map((misi, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-brand-primary font-bold text-sm mt-0.5 shrink-0 w-5">
                        {i + 1}.
                      </span>
                      {misi}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* KANAN: Info Wilayah + Peta */}
          <div className="flex flex-col gap-6">
            {/* Info Wilayah */}
            <div className="bg-white rounded-xs border border-slate-100 shadow-sm p-6">
              <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-5">
                Informasi Wilayah
              </p>
              <div className="flex flex-col divide-y divide-gray-100">
                {[
                  { icon: Home, label: "Jumlah RT", value: "8 Rukun Tetangga", badgeStyle: "bg-brand-primary border border-brand-primary-hover text-white shadow-sm group-hover:bg-brand-primary-hover transition-colors duration-200" },
                  { icon: Users, label: "Total Kepala Keluarga", value: "± 350 KK", badgeStyle: "bg-brand-primary border border-brand-primary-hover text-white shadow-sm group-hover:bg-brand-primary-hover transition-colors duration-200" },
                  { icon: MapPin, label: "Kelurahan", value: "Kutabumi", badgeStyle: "bg-brand-primary border border-brand-primary-hover text-white shadow-sm group-hover:bg-brand-primary-hover transition-colors duration-200" },
                  { icon: Calendar, label: "Kecamatan", value: "Pasar Kemis", badgeStyle: "bg-brand-primary border border-brand-primary-hover text-white shadow-sm group-hover:bg-brand-primary-hover transition-colors duration-200" },
                ].map(({ icon: Icon, label, value}) => (
                  <div key={label} className="group flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                    <div className={`w-10 h-10 rounded-xs flex items-center justify-center shrink-0 icon-badge shadow-sm`}>
                      <Icon size={16} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-0.5">
                        {label}
                      </p>
                      <p className="text-sm font-bold text-gray-800">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Peta */}
            <div className="bg-white rounded-xs border border-slate-100 shadow-sm overflow-hidden">
              <div className="w-full h-52 bg-gray-100 relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2!2d106.9!3d-6.15!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f4a!2sPegangsaan+Dua!5e0!3m2!1sid!2sid!4v1713456789012!5m2!1sid!2sid"
                  className="absolute inset-0 w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Peta Kutabumi"
                />
              </div>
              <p className="text-xs text-center text-gray-400 py-3 font-medium">
                Peta Lokasi RW 12 Kutabumi, Kab. Tangerang
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
