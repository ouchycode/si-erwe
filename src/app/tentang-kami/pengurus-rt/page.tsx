import { Users, User, Phone, MapPin } from "lucide-react";

const DATA_RT = [
  {
    rt: "01",
    ketua: "Bapak Budi Santoso",
    lokasi: "Blok A, Jl. Utama",
    telp: "0812-xxxx-0001",
  },
  {
    rt: "02",
    ketua: "Bapak Ahmad Yani",
    lokasi: "Blok B, Jl. Merpati",
    telp: "0812-xxxx-0002",
  },
  {
    rt: "03",
    ketua: "Bapak Cipto Mangunkusumo",
    lokasi: "Blok C, Jl. Nuri",
    telp: "0812-xxxx-0003",
  },
  {
    rt: "04",
    ketua: "Bapak Dwi Susanto",
    lokasi: "Blok D, Jl. Kenari",
    telp: "0812-xxxx-0004",
  },
  {
    rt: "05",
    ketua: "Bapak Eko Prasetyo",
    lokasi: "Blok E, Jl. Garuda",
    telp: "0812-xxxx-0005",
  },
  {
    rt: "06",
    ketua: "Ibu Fitriani",
    lokasi: "Blok F, Jl. Cendrawasih",
    telp: "0812-xxxx-0006",
  },
  {
    rt: "07",
    ketua: "Bapak Gunawan Wibisono",
    lokasi: "Blok G, Jl. Rajawali",
    telp: "0812-xxxx-0007",
  },
  {
    rt: "08",
    ketua: "Bapak Hendra Setiawan",
    lokasi: "Blok H, Jl. Kutilang",
    telp: "0812-xxxx-0008",
  },
  {
    rt: "09",
    ketua: "Bapak Iwan Fals",
    lokasi: "Blok I, Jl. Perkutut",
    telp: "0812-xxxx-0009",
  },
  {
    rt: "10",
    ketua: "Bapak Joko Widodo",
    lokasi: "Blok J, Jl. Cendana",
    telp: "0812-xxxx-0010",
  },
];

export default function PengurusRT() {
  return (
    <div className="min-h-screen bg-white pb-20 font-sans">
      {/* HERO */}
      <div className="bg-[#1a3a6b] px-6 md:px-16 py-16 md:py-24">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <p className="text-xs font-semibold tracking-widest text-blue-300/70 uppercase mb-4">
              Tentang Kami
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4 tracking-tight">
              Daftar Pengurus RT
            </h1>
            <p className="text-[15px] text-blue-100/80 max-w-xl leading-relaxed">
              Para ujung tombak pelayanan warga di lingkungan RW 12 Kelurahan
              Kutabumi.
            </p>
          </div>

          {/* Stat box */}
          <div className="flex items-center gap-4 bg-white/10 border border-white/10 rounded-md px-6 py-4 shrink-0">
            <div className="w-10 h-10 bg-white/10 rounded-md flex items-center justify-center">
              <Users size={18} className="text-blue-200" />
            </div>
            <div>
              <p className="text-[11px] text-blue-300/70 font-semibold uppercase tracking-widest mb-0.5">
                Total RT Aktif
              </p>
              <p className="text-2xl font-bold text-white">10 Wilayah</p>
            </div>
          </div>
        </div>
      </div>

      {/* GRID */}
      <div className="max-w-6xl mx-auto px-6 md:px-16 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {DATA_RT.map((item) => (
            <div
              key={item.rt}
              className="bg-white border border-gray-100 hover:border-[#1a3a6b]/20 rounded-md overflow-hidden transition-colors group"
            >
              {/* Header */}
              <div className="bg-[#1a3a6b] px-5 py-3.5 flex items-center justify-between">
                <h3 className="text-white font-bold text-sm tracking-wide">
                  RT {item.rt}
                </h3>
                <span className="text-[10px] font-semibold text-blue-200/70 uppercase tracking-widest">
                  RW 12
                </span>
              </div>

              {/* Body */}
              <div className="p-5 flex flex-col gap-4">
                {/* Ketua */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-blue-50 rounded-md flex items-center justify-center shrink-0 group-hover:bg-[#1a3a6b] transition-colors">
                    <User
                      size={16}
                      className="text-[#1a3a6b] group-hover:text-white transition-colors"
                    />
                  </div>
                  <div>
                    <p className="text-[10.5px] text-gray-400 font-semibold uppercase tracking-widest mb-0.5">
                      Ketua RT
                    </p>
                    <p className="text-[13.5px] font-bold text-gray-900 leading-tight">
                      {item.ketua}
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-100" />

                {/* Kontak & Lokasi */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2.5 text-[12.5px] text-gray-500">
                    <MapPin size={13} className="text-gray-300 shrink-0" />
                    <span className="truncate">{item.lokasi}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-[12.5px] text-gray-500">
                    <Phone size={13} className="text-gray-300 shrink-0" />
                    <span>{item.telp}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
