import Image from "next/image";
import Link from "next/link";
import { Calendar, ChevronRight, Search, Tag } from "lucide-react";

const BERITA_DUMMY = [
  {
    id: 1,
    title: "Lorem Ipsum Dolor Sit Amet Consectetur",
    date: "15 April 2026",
    category: "Lorem Ipsum",
    image: "/images/berita/iuran.png",
    snippet:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    id: 2,
    title: "Dolor Sit Amet Consectetur Adipiscing",
    date: "10 April 2026",
    category: "Dolor Sit",
    image: "/images/berita/iuran.png",
    snippet:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 3,
    title: "Sed Do Eiusmod Tempor Incididunt",
    date: "05 April 2026",
    category: "Amet Elit",
    image: "/images/berita/iuran.png",
    snippet:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.",
  },
  {
    id: 4,
    title: "Ut Labore Et Dolore Magna Aliqua",
    date: "28 Maret 2026",
    category: "Consectetur",
    image: "/images/berita/iuran.png",
    snippet:
      "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
  },
];

const KATEGORI_COLOR: Record<string, string> = {
  "Lorem Ipsum": "bg-blue-50 text-blue-700",
  "Dolor Sit": "bg-green-50 text-green-700",
  "Amet Elit": "bg-amber-50 text-amber-700",
  Consectetur: "bg-purple-50 text-purple-700",
};

import { PageHeader } from "@/components/ui/PageHeader";

export default function BeritaTerkini() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <PageHeader
        category="Pusat Informasi"
        title="Lorem Ipsum Dolor"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        rightContent={
          <div className="hidden md:flex items-center gap-0 bg-white rounded-xs overflow-hidden border border-gray-200 shrink-0 w-72 shadow-sm">
            <input
              type="text"
              placeholder="Cari berita..."
              className="flex-1 px-4 py-2.5 text-sm text-gray-700 outline-none bg-transparent"
            />
            <button className="bg-brand-primary border-l border-brand-primary-hover text-white px-3.5 py-2.5 hover:bg-brand-primary-hover transition-colors cursor-pointer">
              <Search size={15} />
            </button>
          </div>
        }
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-16 relative z-10">
        {/* Search mobile */}
        <div className="flex md:hidden items-center bg-white border border-gray-200 rounded-xs overflow-hidden mb-6 shadow-sm">
          <input
            type="text"
            placeholder="Cari berita..."
            className="flex-1 px-4 py-2.5 text-sm text-gray-700 outline-none"
          />
          <button className="bg-brand-primary text-white px-3.5 py-2.5 hover:bg-brand-primary-hover transition-colors cursor-pointer border-none">
            <Search size={15} />
          </button>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BERITA_DUMMY.map((berita) => (
            <Link
              key={berita.id}
              href={`/informasi/berita/${berita.id}`}
              className="group flex flex-col bg-white border border-gray-200 rounded-xs overflow-hidden no-underline transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              {/* Gambar */}
              <div className="relative w-full h-48 bg-gray-100 overflow-hidden border-b border-gray-100">
                <Image
                  src={berita.image}
                  alt={berita.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span
                  className={`absolute top-3 left-3 inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-xs bg-brand-primary text-white shadow-sm`}
                >
                  <Tag size={10} />
                  {berita.category}
                </span>
              </div>

              {/* Konten */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-3 font-mono uppercase tracking-wider">
                  <Calendar size={12} />
                  {berita.date}
                </div>

                <h3 className="text-base font-bold text-gray-900 leading-snug mb-3 group-hover:text-brand-primary transition-colors line-clamp-2 flex-1">
                  {berita.title}
                </h3>

                <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-5">
                  {berita.snippet}
                </p>

                <div className="flex items-center gap-1.5 text-sm font-bold text-brand-primary mt-auto">
                  Baca Selengkapnya
                  <ChevronRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* PAGINATION */}
        <div className="flex justify-center mt-12 gap-1.5">
          <button className="w-9 h-9 rounded-xs border border-gray-200 flex items-center justify-center text-gray-300 bg-white cursor-not-allowed">
            <ChevronRight size={15} className="rotate-180" />
          </button>
          <button className="w-9 h-9 rounded-xs bg-brand-primary text-white font-bold text-sm">
            1
          </button>
          <button className="w-9 h-9 rounded-xs border border-gray-200 bg-white text-gray-500 font-bold text-sm hover:bg-gray-50 transition-colors cursor-pointer">
            2
          </button>
          <button className="w-9 h-9 rounded-xs border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer">
            <ChevronRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
