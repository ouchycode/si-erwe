import { Target, Eye, BookOpen, MapPin, Users, Home } from "lucide-react";

export default function ProfilRW() {
  return (
    <div className="min-h-screen bg-white pb-20 font-sans">
      {/* HERO */}
      <div className="bg-[#1a3a6b] px-6 md:px-16 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-semibold tracking-widest text-blue-300/70 uppercase mb-4">
            Tentang Kami
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4 tracking-tight">
            Profil & Sejarah RW 12
          </h1>
          <p className="text-[15px] text-blue-100/80 max-w-xl leading-relaxed">
            Mengenal lebih dekat lingkungan RW 12 Kelurahan Kutabumi — bersama
            membangun kehidupan bertetangga yang rukun, aman, dan sejahtera.
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-6 md:px-16 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* KIRI: Sejarah + Visi Misi */}
          <div className="lg:col-span-2 flex flex-col gap-10">
            {/* Sejarah */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 bg-blue-50 rounded-md flex items-center justify-center">
                  <BookOpen size={18} className="text-[#1a3a6b]" />
                </div>
                <h2 className="text-lg font-bold text-gray-900">
                  Sejarah Singkat
                </h2>
              </div>
              <div className="text-[14.5px] text-gray-500 leading-relaxed flex flex-col gap-3">
                <p>
                  RW 12 Kelurahan Kutabumi, Kecamatan Pasar Kemis, dibentuk
                  seiring dengan perkembangan pesat pemukiman di wilayah
                  Kabupaten Tangerang. Pada awalnya, wilayah ini hanya terdiri
                  dari beberapa Rukun Tetangga yang terus berkembang hingga
                  sekarang.
                </p>
                <p>
                  Seiring bertambahnya jumlah penduduk, RW 12 kini menaungi 10
                  RT. Warga RW 12 dikenal dengan semangat kegotongroyongannya
                  yang tinggi, multikultural, dan aktif dalam berbagai kegiatan
                  sosial kemasyarakatan.
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100" />

            {/* Visi & Misi */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Visi */}
              <div className="bg-[#1a3a6b] rounded-md p-6 text-white flex flex-col gap-4">
                <div className="flex items-center gap-2.5">
                  <Eye size={18} className="text-blue-300" />
                  <h2 className="text-sm font-bold tracking-wide uppercase text-blue-200">
                    Visi
                  </h2>
                </div>
                <p className="text-[14px] text-blue-50/90 leading-relaxed italic">
                  "Terwujudnya lingkungan RW 12 yang Aman, Bersih, Guyub, dan
                  Sejahtera berlandaskan nilai-nilai Ketuhanan dan Gotong
                  Royong."
                </p>
              </div>

              {/* Misi */}
              <div className="bg-[#f8f9fc] border border-gray-100 rounded-md p-6 flex flex-col gap-4">
                <div className="flex items-center gap-2.5">
                  <Target size={18} className="text-[#1a3a6b]" />
                  <h2 className="text-sm font-bold tracking-wide uppercase text-gray-500">
                    Misi
                  </h2>
                </div>
                <ul className="flex flex-col gap-3 text-[13.5px] text-gray-600 leading-relaxed">
                  {[
                    "Meningkatkan sistem keamanan lingkungan terpadu.",
                    "Menggalakkan program kebersihan dan penghijauan.",
                    "Mendorong partisipasi aktif warga dalam kegiatan sosial.",
                    "Mengoptimalkan pelayanan administrasi warga berbasis digital.",
                  ].map((misi, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="text-[#1a3a6b] font-bold text-xs mt-0.5 shrink-0">
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
          <div className="flex flex-col gap-5">
            {/* Info Wilayah */}
            <div className="border border-gray-100 rounded-md p-6 bg-white">
              <p className="text-[11px] font-semibold tracking-widest text-gray-400 uppercase mb-5">
                Informasi Wilayah
              </p>
              <div className="flex flex-col divide-y divide-gray-100">
                {[
                  {
                    icon: Home,
                    label: "Jumlah RT",
                    value: "10 Rukun Tetangga",
                  },
                  {
                    icon: Users,
                    label: "Total Kepala Keluarga",
                    value: "± 450 KK",
                  },
                  {
                    icon: MapPin,
                    label: "Luas Wilayah",
                    value: "± 5.2 Hektar",
                  },
                ].map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="w-9 h-9 bg-blue-50 rounded-md flex items-center justify-center shrink-0">
                      <Icon size={16} className="text-[#1a3a6b]" />
                    </div>
                    <div>
                      <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">
                        {label}
                      </p>
                      <p className="text-[14px] font-bold text-gray-800">
                        {value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Peta */}
            <div className="border border-gray-100 rounded-md overflow-hidden bg-white">
              <div className="w-full h-52 bg-gray-100 relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31733.626359765858!2d106.56149175249561!3d-6.170685987340061!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ff228c2ddcb5%3A0x6b4458f28b78912e!2sKutabumi%2C%20Kec.%20Pasar%20Kemis%2C%20Kabupaten%20Tangerang%2C%20Banten!5e0!3m2!1sid!2sid!4v1713456789012!5m2!1sid!2sid"
                  className="absolute inset-0 w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Peta Kutabumi"
                />
              </div>
              <p className="text-[11.5px] text-center text-gray-400 py-3 font-medium">
                Peta Lokasi RW 12 Kutabumi
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
