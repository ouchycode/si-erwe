import { api, resolveImageUrl } from "@/lib/api";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Berita } from "@/lib/types";

export default async function BeritaSection() {
  const res = await api
    .get<{ data: Berita[] }>("/berita?per_page=3")
    .catch(() => ({ data: [] as Berita[] }));
  const beritaList = res.data;

  return (
    <section className="bg-white py-20 border-b border-slate-100">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl text-center md:text-left mx-auto md:mx-0">
            <h2 data-aos="fade-up" className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 tracking-tight">
              Kabar Lingkungan
            </h2>
            <p data-aos="fade-up" className="text-base md:text-lg text-gray-600 leading-relaxed">
              Agenda kegiatan dan pengumuman terbaru dari pengurus lingkungan
              Rukun Warga 04.
            </p>
          </div>
          <Link
            href="/informasi/berita"
            className="hidden md:inline-flex items-center justify-center font-bold text-gray-700 bg-slate-50 hover:bg-gray-100 hover:text-brand-primary border border-slate-100 px-6 py-3 rounded-xs transition-colors duration-300 no-underline"
          >
            Lihat Indeks
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>

        {/* 3 Column Minimal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          {beritaList.map((news, index) => (
            <Link
              key={news.id}
              href={`/informasi/berita/${news.slug}`}
              data-aos="fade-up"

              className="group bg-white rounded-xs border border-slate-100 outline-none transition-colors duration-300 overflow-hidden no-underline flex flex-col"
            >
              {/* Image Container */}
              <div className="relative w-full h-52 bg-gray-100 overflow-hidden border-b border-slate-100">
                {news.gambar ? (
                  <Image
                    src={resolveImageUrl(news.gambar) ?? ""}
                    alt={news.judul}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm font-medium">
                    Media tidak tersedia
                  </div>
                )}
                {/* Category Pill */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="text-[10px] md:text-xs font-bold px-3 py-1.5 rounded-xs bg-brand-primary text-white border border-brand-primary-hover">
                    {news.kategori}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 flex flex-col flex-1">
                <span className="text-xs font-mono text-gray-500 mb-3 block uppercase tracking-wider font-semibold">
                  {news.tanggal}
                </span>

                <h3 className="text-lg md:text-xl font-bold text-slate-800 leading-snug mb-3 group-hover:text-brand-primary transition-colors line-clamp-2">
                  {news.judul}
                </h3>

                <p className="text-sm md:text-base text-gray-600 line-clamp-2 md:line-clamp-3 leading-relaxed">
                  {news.ringkasan}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {beritaList.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-400 font-medium">Belum ada berita.</p>
          </div>
        )}

        {/* Mobile Action Button */}
        <div className="text-center md:hidden">
          <Link
            href="/informasi/berita"
            className="inline-flex w-full items-center justify-center font-bold text-gray-700 bg-slate-50 hover:bg-gray-100 hover:text-brand-primary border border-slate-100 px-6 py-3.5 rounded-xs transition-colors no-underline"
          >
            Lihat Indeks
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}
