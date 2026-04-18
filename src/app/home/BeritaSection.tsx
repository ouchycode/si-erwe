import { BERITA_DUMMY } from "@/lib/dummyData";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const KATEGORI_COLOR: Record<string, string> = {
  Kegiatan: "bg-blue-50 text-blue-700",
  Kesehatan: "bg-green-50 text-green-700",
  Pengumuman: "bg-amber-50 text-amber-700",
};

export default function BeritaSection() {
  return (
    <section className="py-20 px-6 md:px-16 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-2">
              Terbaru
            </p>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              Berita & Pengumuman
            </h2>
          </div>
          <Link
            href="/informasi/berita"
            className="hidden sm:inline-flex items-center gap-2 bg-[#1a3a6b] hover:bg-[#14306e] text-white text-xs font-semibold px-4 py-2.5 rounded-md no-underline transition-colors"
          >
            Semua Berita <ArrowRight size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {BERITA_DUMMY.map((news) => (
            <Link
              key={news.id}
              href={`/informasi/berita/${news.id}`}
              className="group flex flex-col no-underline"
            >
              <div className="relative w-full aspect-4/3 rounded-md overflow-hidden bg-gray-100 mb-4">
                {news.gambar ? (
                  <Image
                    src={news.gambar}
                    alt={news.judul}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gray-100" />
                )}
              </div>
              <h3 className="text-sm font-bold text-gray-900 leading-snug mb-2 group-hover:text-[#1a3a6b] transition-colors line-clamp-3 flex-1">
                {news.judul}
              </h3>
              <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-4">
                {news.ringkasan}
              </p>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-[11px] text-gray-400">
                  {news.tanggal}
                </span>
                <span
                  className={`text-[10.5px] font-semibold px-2 py-0.5 rounded-sm ${KATEGORI_COLOR[news.kategori] ?? "bg-gray-100 text-gray-600"}`}
                >
                  {news.kategori}
                </span>
              </div>
            </Link>
          ))}
        </div>

        <Link
          href="/informasi/berita"
          className="sm:hidden mt-8 flex items-center justify-center gap-2 w-full py-3 rounded-md border border-gray-200 text-sm font-semibold text-gray-700 hover:border-[#1a3a6b] hover:text-[#1a3a6b] no-underline transition-colors"
        >
          Semua Berita <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
}
