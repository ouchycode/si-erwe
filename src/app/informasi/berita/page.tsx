import Image from "next/image";
import Link from "next/link";
import { Calendar, ChevronRight, Search, Tag } from "lucide-react";

const BERITA_DUMMY = [
  {
    id: 1,
    title: "Pendaftaran Turnamen E-Sports MLBB Antar RT",
    date: "15 April 2026",
    category: "Karang Taruna",
    image: "/images/berita/iuran.png",
    snippet:
      "Karang Taruna RW 12 resmi membuka pendaftaran turnamen Mobile Legends: Bang Bang (MLBB) untuk mempererat solidaritas pemuda antar RT. Pendaftaran ditutup minggu depan.",
  },
  {
    id: 2,
    title: "Pelatihan Dasar Frontend Developer untuk Pemuda",
    date: "10 April 2026",
    category: "Pendidikan",
    image: "/images/berita/iuran.png",
    snippet:
      "Merespon antusiasme warga terhadap dunia digital, pengurus mengadakan workshop pengenalan pembuatan web dengan React dan Tailwind CSS di Balai Warga.",
  },
  {
    id: 3,
    title: "Jadwal Kerja Bakti Massal Persiapan Musim Hujan",
    date: "05 April 2026",
    category: "Kegiatan Warga",
    image: "/images/berita/iuran.png",
    snippet:
      "Menjelang puncak musim hujan, seluruh warga RW 12 dihimbau mengikuti kerja bakti pembersihan selokan utama pada hari Minggu pagi mendatang.",
  },
  {
    id: 4,
    title: "Pembaruan Sistem Pembayaran Iuran Warga",
    date: "28 Maret 2026",
    category: "Pengumuman",
    image: "/images/berita/iuran.png",
    snippet:
      "Kini pembayaran iuran keamanan dan kebersihan dapat dilakukan melalui transfer bank atau e-wallet ke kas resmi Bendahara RW.",
  },
];

const KATEGORI_COLOR: Record<string, string> = {
  "Karang Taruna": "bg-blue-50 text-blue-700",
  Pendidikan: "bg-green-50 text-green-700",
  "Kegiatan Warga": "bg-amber-50 text-amber-700",
  Pengumuman: "bg-purple-50 text-purple-700",
};

export default function BeritaTerkini() {
  return (
    <div className="min-h-screen bg-white pb-20 font-sans">
      {/* HERO */}
      <div className="bg-[#1a3a6b] px-6 md:px-16 py-16 md:py-24">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <p className="text-xs font-semibold tracking-widest text-blue-300/70 uppercase mb-4">
              Pusat Informasi
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4 tracking-tight">
              Berita & Pengumuman
            </h1>
            <p className="text-[15px] text-blue-100/80 max-w-xl leading-relaxed">
              Informasi terbaru mengenai kegiatan, program kerja, dan pengumuman
              penting di lingkungan RW 12 Kutabumi.
            </p>
          </div>

          {/* Search desktop */}
          <div className="hidden md:flex items-center gap-0 bg-white rounded-md overflow-hidden border border-white/10 shrink-0 w-72">
            <input
              type="text"
              placeholder="Cari berita..."
              className="flex-1 px-4 py-2.5 text-[13px] text-gray-700 outline-none bg-transparent"
            />
            <button className="bg-[#1a3a6b] border-l border-white/10 text-white px-3.5 py-2.5 hover:bg-[#14306e] transition-colors cursor-pointer">
              <Search size={15} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-16 py-12">
        {/* Search mobile */}
        <div className="flex md:hidden items-center bg-white border border-gray-100 rounded-md overflow-hidden mb-8">
          <input
            type="text"
            placeholder="Cari berita..."
            className="flex-1 px-4 py-2.5 text-[13px] text-gray-700 outline-none"
          />
          <button className="bg-[#1a3a6b] text-white px-3.5 py-2.5 hover:bg-[#14306e] transition-colors cursor-pointer border-none">
            <Search size={15} />
          </button>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {BERITA_DUMMY.map((berita) => (
            <Link
              key={berita.id}
              href={`/informasi/berita/${berita.id}`}
              className="group flex flex-col bg-white border border-gray-100 hover:border-gray-200 rounded-md overflow-hidden no-underline transition-colors"
            >
              {/* Gambar */}
              <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
                <Image
                  src={berita.image}
                  alt={berita.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span
                  className={`absolute top-3 left-3 inline-flex items-center gap-1 text-[10.5px] font-semibold px-2.5 py-1 rounded-sm ${KATEGORI_COLOR[berita.category] ?? "bg-gray-100 text-gray-600"}`}
                >
                  <Tag size={10} />
                  {berita.category}
                </span>
              </div>

              {/* Konten */}
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-1.5 text-[11.5px] text-gray-400 mb-3">
                  <Calendar size={12} />
                  {berita.date}
                </div>

                <h3 className="text-[15px] font-bold text-gray-900 leading-snug mb-2.5 group-hover:text-[#1a3a6b] transition-colors line-clamp-2 flex-1">
                  {berita.title}
                </h3>

                <p className="text-[12.5px] text-gray-400 leading-relaxed line-clamp-2 mb-5">
                  {berita.snippet}
                </p>

                <div className="flex items-center gap-1.5 text-[12px] font-semibold text-[#1a3a6b] mt-auto group-hover:gap-2.5 transition-all">
                  Baca Selengkapnya
                  <ChevronRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* PAGINATION */}
        <div className="flex justify-center mt-12 gap-1.5">
          <button className="w-9 h-9 rounded-md border border-gray-100 flex items-center justify-center text-gray-300 bg-white cursor-not-allowed">
            <ChevronRight size={15} className="rotate-180" />
          </button>
          <button className="w-9 h-9 rounded-md bg-[#1a3a6b] text-white font-bold text-[13px]">
            1
          </button>
          <button className="w-9 h-9 rounded-md border border-gray-100 bg-white text-gray-500 font-bold text-[13px] hover:bg-gray-50 transition-colors cursor-pointer">
            2
          </button>
          <button className="w-9 h-9 rounded-md border border-gray-100 bg-white flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer">
            <ChevronRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
