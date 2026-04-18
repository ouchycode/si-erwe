import {
  User,
  Shield,
  Trash2,
  Heart,
  HardHat,
  Users,
  FileText,
  Wallet,
  ChevronDown,
} from "lucide-react";

export default function StrukturRW() {
  return (
    <div className="min-h-screen bg-gray-50 pb-16 font-sans">
      {/* HERO SECTION */}
      <div className="bg-[#1a3a6b] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400 opacity-10 rounded-full blur-2xl -translate-x-1/2 translate-y-1/2"></div>

        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 relative z-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            Struktur Organisasi RW 12
          </h1>
          <p className="text-[15px] md:text-[16px] text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Sinergi pengurus dalam melayani dan mengelola lingkungan demi
            kenyamanan seluruh warga RW 12 Kelurahan Kutabumi periode 2024 -
            2027.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-12 relative z-20">
        {/* TOP LEVEL: KETUA RW */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-2xl shadow-md border-t-4 border-[#1a3a6b] p-6 w-full max-w-sm text-center group hover:shadow-lg transition-all">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#1a3a6b] transition-colors">
              <User
                size={40}
                className="text-[#1a3a6b] group-hover:text-white"
              />
            </div>
            <h3 className="text-lg font-bold text-gray-800">Nama Ketua RW</h3>
            <p className="text-[#1a3a6b] font-semibold text-sm uppercase tracking-wider">
              Ketua RW 12
            </p>
          </div>
        </div>

        {/* SECOND LEVEL: SEKRETARIS & BENDAHARA */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16 relative">
          {/* Garis Penghubung (Desktop) */}
          <div className="hidden md:block absolute -top-12 left-1/2 w-px h-12 bg-gray-200"></div>

          {/* Sekretaris */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center gap-5 hover:border-blue-200 transition-all">
            <div className="w-16 h-16 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
              <FileText size={28} className="text-[#1a3a6b]" />
            </div>
            <div>
              <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">
                Sekretaris
              </p>
              <h4 className="text-[16px] font-bold text-gray-800">
                Nama Sekretaris
              </h4>
            </div>
          </div>

          {/* Bendahara */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center gap-5 hover:border-blue-200 transition-all">
            <div className="w-16 h-16 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
              <Wallet size={28} className="text-[#1a3a6b]" />
            </div>
            <div>
              <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">
                Bendahara
              </p>
              <h4 className="text-[16px] font-bold text-gray-800">
                Nama Bendahara
              </h4>
            </div>
          </div>
        </div>

        {/* THIRD LEVEL: SEKSI-SEKSI (BIDANG) */}
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold text-gray-800 flex items-center justify-center gap-2">
            <Users size={22} className="text-[#1a3a6b]" />
            Bidang & Seksi Operasional
          </h2>
          <div className="w-16 h-1 bg-[#1a3a6b] mx-auto mt-2 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              bidang: "Keamanan & Ketertiban",
              icon: Shield,
              color: "text-red-500",
              bg: "bg-red-50",
              tugas: "Siskamling & koordinasi keamanan.",
            },
            {
              bidang: "Kebersihan & Lingkungan",
              icon: Trash2,
              color: "text-green-500",
              bg: "bg-green-50",
              tugas: "Pengelolaan sampah & kerja bakti.",
            },
            {
              bidang: "Pembangunan & Sarana",
              icon: HardHat,
              color: "text-orange-500",
              bg: "bg-orange-50",
              tugas: "Perawatan jalan & infrastruktur.",
            },
            {
              bidang: "Sosial & Kerohanian",
              icon: Heart,
              color: "text-pink-500",
              bg: "bg-pink-50",
              tugas: "Kegiatan keagamaan & santunan.",
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all"
              >
                <div
                  className={`w-12 h-12 ${item.bg} rounded-lg flex items-center justify-center mb-4`}
                >
                  <Icon size={24} className={item.color} />
                </div>
                <h4 className="text-[15px] font-bold text-gray-800 mb-2">
                  {item.bidang}
                </h4>
                <p className="text-[12px] text-gray-500 leading-relaxed mb-4">
                  {item.tugas}
                </p>
                <div className="pt-4 border-t border-gray-50">
                  <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mb-1">
                    Koordinator
                  </p>
                  <p className="text-[13px] font-semibold text-gray-700 leading-tight">
                    Nama Penanggung Jawab
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
