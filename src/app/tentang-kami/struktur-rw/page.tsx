import {
  User,
  Shield,
  Trash2,
  Heart,
  HardHat,
  FileText,
  Wallet,
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";

const BIDANG = [
  {
    bidang: "Keamanan & Ketertiban",
    icon: Shield,
    tugas: "Siskamling & koordinasi keamanan lingkungan.",
    koordinator: "Lorem Ipsum",
    color: "text-red-700",
    bg: "bg-red-50",
    border: "border-red-100",
  },
  {
    bidang: "Kebersihan & Lingkungan",
    icon: Trash2,
    tugas: "Pengelolaan sampah & program kerja bakti.",
    koordinator: "Dolor Sit Amet",
    color: "text-emerald-700",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
  },
  {
    bidang: "Pembangunan & Sarana",
    icon: HardHat,
    tugas: "Perawatan jalan & infrastruktur wilayah.",
    koordinator: "Consectetur Adipiscing",
    color: "text-orange-700",
    bg: "bg-orange-50",
    border: "border-orange-100",
  },
  {
    bidang: "Sosial & Kerohanian",
    icon: Heart,
    tugas: "Kegiatan keagamaan & santunan warga.",
    koordinator: "Elit Sed Do",
    color: "text-purple-700",
    bg: "bg-purple-50",
    border: "border-purple-100",
  },
];

export default function StrukturRW() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <PageHeader
        category="Tentang Kami"
        title="Struktur Organisasi RW 12"
        description="Sinergi pengurus dalam melayani dan mengelola lingkungan demi kenyamanan seluruh warga RW 12 Kutabumi periode 2024–2027."
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-16 relative z-10">

        {/* KETUA RW */}
        <div className="mb-2">
          <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-5">
            Pimpinan
          </p>
          <div className="flex items-center gap-5 bg-white border border-gray-200 rounded-xs px-7 py-6 max-w-sm shadow-sm">
            <div className="w-12 h-12 bg-brand-primary rounded-xs flex items-center justify-center shrink-0">
              <User size={22} className="text-white" />
            </div>
            <div>
              <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-1">
                Ketua RW 12
              </p>
              <p className="text-lg font-extrabold text-gray-900">Lorem Ipsum Dolor</p>
            </div>
          </div>
        </div>

        {/* Connector line */}
        <div className="w-px h-8 bg-gray-200 ml-11 mb-2" />

        {/* SEKRETARIS & BENDAHARA */}
        <div className="mb-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
            {[
              { jabatan: "Sekretaris", nama: "Dolor Sit Amet", icon: FileText },
              { jabatan: "Bendahara", nama: "Consectetur Adipiscing", icon: Wallet },
            ].map(({ jabatan, nama, icon: Icon }) => (
              <div
                key={jabatan}
                className="flex items-center gap-4 bg-white border border-gray-200 rounded-xs px-6 py-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="w-10 h-10 bg-blue-50 border border-blue-100 rounded-xs flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-brand-primary" />
                </div>
                <div>
                  <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-0.5">
                    {jabatan}
                  </p>
                  <p className="text-sm font-bold text-gray-900">{nama}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Connector line */}
        <div className="w-px h-8 bg-gray-200 ml-11 mb-2" />

        {/* BIDANG */}
        <div>
          <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-5">
            Bidang & Seksi Operasional
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {BIDANG.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.bidang}
                  className="bg-white border border-gray-200 rounded-xs p-6 flex flex-col gap-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className={`w-10 h-10 rounded-xs border flex items-center justify-center ${item.bg} ${item.border}`}>
                    <Icon size={18} className={item.color} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 leading-snug mb-1">
                      {item.bidang}
                    </h4>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {item.tugas}
                    </p>
                  </div>
                  <div className="border-t border-gray-100 pt-3 mt-auto">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">
                      Koordinator
                    </p>
                    <p className="text-sm font-bold text-gray-700">
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
