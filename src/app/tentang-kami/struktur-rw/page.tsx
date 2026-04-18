import {
  User,
  Shield,
  Trash2,
  Heart,
  HardHat,
  FileText,
  Wallet,
} from "lucide-react";

const BIDANG = [
  {
    bidang: "Keamanan & Ketertiban",
    icon: Shield,
    tugas: "Siskamling & koordinasi keamanan lingkungan.",
    koordinator: "Nama Penanggung Jawab",
  },
  {
    bidang: "Kebersihan & Lingkungan",
    icon: Trash2,
    tugas: "Pengelolaan sampah & program kerja bakti.",
    koordinator: "Nama Penanggung Jawab",
  },
  {
    bidang: "Pembangunan & Sarana",
    icon: HardHat,
    tugas: "Perawatan jalan & infrastruktur wilayah.",
    koordinator: "Nama Penanggung Jawab",
  },
  {
    bidang: "Sosial & Kerohanian",
    icon: Heart,
    tugas: "Kegiatan keagamaan & santunan warga.",
    koordinator: "Nama Penanggung Jawab",
  },
];

export default function StrukturRW() {
  return (
    <div className="min-h-screen bg-white pb-20 font-sans">
      {/* HERO */}
      <div className="bg-[#1a3a6b] px-6 md:px-16 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-semibold tracking-widest text-blue-300/70 uppercase mb-4">
            Tentang Kami
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4 tracking-tight">
            Struktur Organisasi RW 12
          </h1>
          <p className="text-[15px] text-blue-100/80 max-w-xl leading-relaxed">
            Sinergi pengurus dalam melayani dan mengelola lingkungan demi
            kenyamanan seluruh warga RW 12 Kutabumi periode 2024–2027.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-16 py-16">
        {/* KETUA RW */}
        <div className="mb-3">
          <p className="text-[11px] font-semibold tracking-widest text-gray-400 uppercase mb-6">
            Pimpinan
          </p>
          <div className="flex items-center gap-5 bg-[#f8f9fc] border border-gray-100 rounded-md px-7 py-6 max-w-sm">
            <div className="w-12 h-12 bg-[#1a3a6b] rounded-md flex items-center justify-center shrink-0">
              <User size={22} className="text-white" />
            </div>
            <div>
              <p className="text-[11px] font-semibold tracking-widest text-gray-400 uppercase mb-0.5">
                Ketua RW 12
              </p>
              <p className="text-[16px] font-bold text-gray-900">
                Nama Ketua RW
              </p>
            </div>
          </div>
        </div>

        {/* Connector line */}
        <div className="w-px h-8 bg-gray-200 ml-11 mb-3" />

        {/* SEKRETARIS & BENDAHARA */}
        <div className="mb-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl">
            {[
              {
                jabatan: "Sekretaris",
                nama: "Nama Sekretaris",
                icon: FileText,
              },
              { jabatan: "Bendahara", nama: "Nama Bendahara", icon: Wallet },
            ].map(({ jabatan, nama, icon: Icon }) => (
              <div
                key={jabatan}
                className="flex items-center gap-4 bg-[#f8f9fc] border border-gray-100 hover:border-[#1a3a6b]/20 rounded-md px-6 py-5 transition-colors"
              >
                <div className="w-10 h-10 bg-blue-50 rounded-md flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-[#1a3a6b]" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold tracking-widest text-gray-400 uppercase mb-0.5">
                    {jabatan}
                  </p>
                  <p className="text-[14px] font-bold text-gray-900">{nama}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Connector line */}
        <div className="w-px h-8 bg-gray-200 ml-11 mb-3" />

        {/* BIDANG */}
        <div>
          <p className="text-[11px] font-semibold tracking-widest text-gray-400 uppercase mb-6">
            Bidang & Seksi Operasional
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {BIDANG.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.bidang}
                  className="bg-[#f8f9fc] border border-gray-100 hover:border-[#1a3a6b]/20 rounded-md p-5 flex flex-col gap-3 transition-colors"
                >
                  <div className="w-9 h-9 bg-white border border-gray-100 rounded-md flex items-center justify-center">
                    <Icon size={17} className="text-[#1a3a6b]" />
                  </div>
                  <div>
                    <h4 className="text-[13.5px] font-bold text-gray-900 leading-snug mb-1">
                      {item.bidang}
                    </h4>
                    <p className="text-[12px] text-gray-400 leading-relaxed">
                      {item.tugas}
                    </p>
                  </div>
                  <div className="border-t border-gray-100 pt-3 mt-auto">
                    <p className="text-[10.5px] text-gray-400 font-semibold uppercase tracking-widest mb-0.5">
                      Koordinator
                    </p>
                    <p className="text-[13px] font-bold text-gray-700">
                      {item.koordinator}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
