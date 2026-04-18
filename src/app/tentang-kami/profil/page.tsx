import { Target, Eye, BookOpen, MapPin, Users, Home } from "lucide-react";

export default function ProfilRW() {
  return (
    <div className="min-h-screen bg-gray-50 pb-16 font-sans">
      {/* HERO SECTION */}
      <div className="bg-[#1a3a6b] relative overflow-hidden">
        {/* Dekorasi Background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400 opacity-10 rounded-full blur-2xl -translate-x-1/2 translate-y-1/2"></div>

        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            Profil & Sejarah RW 12
          </h1>
          <p className="text-[15px] md:text-[16px] text-blue-100 max-w-2xl leading-relaxed">
            Mengenal lebih dekat lingkungan RW 12 Kelurahan Kutabumi.
            Bersama-sama membangun tata kehidupan bertetangga yang rukun, aman,
            sehat, dan sejahtera.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* KOLOM KIRI: Sejarah & Visi Misi */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {/* Card Sejarah */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-[#1a3a6b]">
                  <BookOpen size={20} />
                </div>
                <h2 className="text-xl font-bold text-gray-800">
                  Sejarah Singkat
                </h2>
              </div>
              <div className="prose prose-sm text-gray-600 leading-relaxed">
                <p className="mb-4">
                  RW 12 Kelurahan Kutabumi, Kecamatan Pasar Kemis, dibentuk
                  seiring dengan perkembangan pesat pemukiman di wilayah
                  Kabupaten Tangerang. Pada awalnya, wilayah ini hanya terdiri
                  dari beberapa Rukun Tetangga (RT) yang terus berkembang hingga
                  sekarang.
                </p>
                <p>
                  Seiring berjalannya waktu dan bertambahnya jumlah penduduk, RW
                  12 terus berkembang dan kini menaungi 10 RT. Warga RW 12
                  dikenal dengan semangat kegotongroyongannya yang tinggi,
                  multikultural, dan aktif dalam berbagai kegiatan sosial
                  kemasyarakatan.
                </p>
              </div>
            </div>

            {/* Visi & Misi */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card Visi */}
              <div className="bg-[#1a3a6b] rounded-xl shadow-sm p-6 md:p-8 text-white relative overflow-hidden">
                <Eye
                  size={120}
                  className="absolute -bottom-6 -right-6 text-white/10"
                />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <Eye size={24} className="text-blue-300" />
                    <h2 className="text-xl font-bold">Visi</h2>
                  </div>
                  <p className="text-[14px] text-blue-50 leading-relaxed font-medium italic">
                    "Terwujudnya lingkungan RW 12 yang Aman, Bersih, Guyub, dan
                    Sejahtera berlandaskan nilai-nilai Ketuhanan dan Gotong
                    Royong."
                  </p>
                </div>
              </div>

              {/* Card Misi */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 relative overflow-hidden">
                <Target
                  size={120}
                  className="absolute -bottom-6 -right-6 text-gray-50"
                />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <Target size={24} className="text-[#1a3a6b]" />
                    <h2 className="text-xl font-bold text-gray-800">Misi</h2>
                  </div>
                  <ul className="flex flex-col gap-3 text-[14px] text-gray-600 leading-relaxed m-0 p-0 list-none">
                    <li className="flex items-start gap-2">
                      <span className="text-[#1a3a6b] font-bold mt-0.5">
                        1.
                      </span>
                      Meningkatkan sistem keamanan lingkungan terpadu.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#1a3a6b] font-bold mt-0.5">
                        2.
                      </span>
                      Menggalakkan program kebersihan dan penghijauan.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#1a3a6b] font-bold mt-0.5">
                        3.
                      </span>
                      Mendorong partisipasi aktif warga dalam kegiatan sosial.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#1a3a6b] font-bold mt-0.5">
                        4.
                      </span>
                      Mengoptimalkan pelayanan administrasi warga berbasis
                      digital.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* KOLOM KANAN: Statistik Singkat & Peta */}
          <div className="flex flex-col gap-6">
            {/* Card Statistik */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-[15px] font-bold text-gray-800 mb-5 border-b border-gray-100 pb-3">
                Informasi Wilayah
              </h3>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                    <Home size={18} className="text-[#1a3a6b]" />
                  </div>
                  <div>
                    <p className="text-[12px] text-gray-400 font-medium uppercase tracking-wider">
                      Jumlah RT
                    </p>
                    <p className="text-[16px] font-bold text-gray-800">
                      10 Rukun Tetangga
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                    <Users size={18} className="text-[#1a3a6b]" />
                  </div>
                  <div>
                    <p className="text-[12px] text-gray-400 font-medium uppercase tracking-wider">
                      Total Kepala Keluarga
                    </p>
                    <p className="text-[16px] font-bold text-gray-800">
                      ± 450 KK
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                    <MapPin size={18} className="text-[#1a3a6b]" />
                  </div>
                  <div>
                    <p className="text-[12px] text-gray-400 font-medium uppercase tracking-wider">
                      Luas Wilayah
                    </p>
                    <p className="text-[16px] font-bold text-gray-800">
                      ± 5.2 Hektar
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Peta Wilayah Real */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2 overflow-hidden flex flex-col">
              <div className="w-full h-48 bg-gray-200 rounded-lg overflow-hidden relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31733.626359765858!2d106.56149175249561!3d-6.170685987340061!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ff228c2ddcb5%3A0x6b4458f28b78912e!2sKutabumi%2C%20Kec.%20Pasar%20Kemis%2C%20Kabupaten%20Tangerang%2C%20Banten!5e0!3m2!1sid!2sid!4v1713456789012!5m2!1sid!2sid"
                  className="absolute inset-0 w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Peta Kutabumi"
                ></iframe>
              </div>
              <p className="text-[12px] text-center text-gray-500 py-3 font-medium">
                Peta Lokasi RW 12 Kutabumi
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
