import { Users, User, Phone, MapPin, Search } from "lucide-react";

// Data Dummy 10 RT (Bisa Anda sesuaikan dengan data asli Ketua RT di RW 12)
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
    <div className="min-h-screen bg-gray-50 pb-16 font-sans">
      {/* HERO SECTION */}
      <div className="bg-[#1a3a6b] relative overflow-hidden">
        {/* Dekorasi Background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400 opacity-10 rounded-full blur-2xl -translate-x-1/2 translate-y-1/2"></div>

        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              Daftar Pengurus RT
            </h1>
            <p className="text-[15px] md:text-[16px] text-blue-100 max-w-xl leading-relaxed">
              Mengenal lebih dekat para ujung tombak pelayanan warga. Berikut
              adalah daftar Ketua Rukun Tetangga (RT) di lingkungan RW 12
              Kelurahan Kutabumi.
            </p>
          </div>

          {/* Opsional: Kotak Pencarian / Info Tambahan */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 flex items-center gap-4 text-white w-full md:w-auto">
            <div className="w-10 h-10 bg-blue-400/20 rounded-full flex items-center justify-center shrink-0">
              <Users size={20} className="text-blue-100" />
            </div>
            <div>
              <p className="text-[12px] text-blue-100 font-medium uppercase tracking-wider">
                Total RT Aktif
              </p>
              <p className="text-2xl font-bold">10 Wilayah</p>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT: GRID KARTU RT */}
      <div className="max-w-6xl mx-auto px-6 -mt-8 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {DATA_RT.map((item) => (
            <div
              key={item.rt}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              {/* Header Kartu */}
              <div className="bg-gradient-to-r from-[#1a3a6b] to-[#2a508f] p-4 flex items-center justify-between">
                <h3 className="text-white font-bold text-lg">RT {item.rt}</h3>
                <span className="text-[11px] font-semibold bg-white/20 text-white px-2.5 py-1 rounded-full backdrop-blur-sm">
                  RW 12
                </span>
              </div>

              {/* Body Kartu */}
              <div className="p-5 flex flex-col gap-4">
                {/* Info Ketua */}
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center shrink-0 group-hover:bg-[#1a3a6b] transition-colors duration-300">
                    <User
                      size={20}
                      className="text-[#1a3a6b] group-hover:text-white transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider mb-0.5">
                      Ketua RT
                    </p>
                    <p className="text-[15px] font-bold text-gray-800 leading-tight">
                      {item.ketua}
                    </p>
                  </div>
                </div>

                <div className="w-full h-px bg-gray-100 my-0.5"></div>

                {/* Kontak & Lokasi */}
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center gap-3 text-[13px] text-gray-600">
                    <div className="w-6 h-6 rounded flex items-center justify-center bg-gray-50 shrink-0">
                      <MapPin size={14} className="text-gray-400" />
                    </div>
                    <span className="truncate">{item.lokasi}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[13px] text-gray-600">
                    <div className="w-6 h-6 rounded flex items-center justify-center bg-gray-50 shrink-0">
                      <Phone size={14} className="text-gray-400" />
                    </div>
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
