import Image from "next/image";
import Link from "next/link";
import { Calendar, ChevronLeft, ChevronRight, Search, Tag } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContentSection } from "@/components/ui/ContentSection";
import { api, resolveImageUrl } from "@/lib/api";
import type { Berita, Paginated } from "@/lib/types";

export const dynamic = "force-dynamic";
export const metadata = { title: "Berita Terkini" };

const PER_PAGE = 9;

export default async function BeritaTerkini({
  searchParams,
}: {
  searchParams: Promise<{ kategori?: string; q?: string; page?: string }>;
}) {
  const { kategori, q, page } = await searchParams;
  const currentPage = Math.max(1, Number(page) || 1);

  const params = new URLSearchParams({ per_page: String(PER_PAGE), page: String(currentPage) });
  if (kategori) params.set("kategori", kategori);
  if (q) params.set("q", q);

  const result = await api
    .get<Paginated<Berita>>(`/berita?${params.toString()}`)
    .catch(() => null);

  const beritaList = result?.data ?? [];
  const total = result?.meta.total ?? 0;
  const lastPage = result?.meta.last_page ?? 1;
  const kategoris = Array.from(new Set(beritaList.map((b) => b.kategori).filter(Boolean)));

  return (
    <div className="min-h-screen bg-white font-sans pb-20">
      <PageHeader
        category="Pusat Informasi"
        title="Berita Terkini"
        description="Update kegiatan, pengumuman, dan informasi terbaru dari lingkungan RW 004 Pabuaran."
      />

      <ContentSection>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            <Link
              href="/informasi/berita"
              className={`text-xs font-semibold px-3 py-1.5 rounded-xs transition-colors no-underline border ${
                !kategori
                  ? "bg-brand-primary text-white border-brand-primary"
                  : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-gray-100"
              }`}
            >
              Semua
            </Link>
            {kategoris.map((k) => (
              <Link
                key={k}
                href={`/informasi/berita?kategori=${encodeURIComponent(k)}`}
                className={`text-xs font-semibold px-3 py-1.5 rounded-xs transition-colors no-underline border ${
                  kategori === k
                    ? "bg-brand-primary text-white border-brand-primary"
                    : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-gray-100"
                }`}
              >
                {k}
              </Link>
            ))}
          </div>

          <form action="/informasi/berita" method="GET" className="flex items-center gap-2">
            {kategori ? <input type="hidden" name="kategori" value={kategori} /> : null}
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="q"
                defaultValue={q ?? ""}
                placeholder="Cari berita..."
                className="w-full md:w-56 pl-9 pr-3 py-2 text-sm rounded-xs border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-semibold text-white bg-brand-primary hover:bg-brand-primary-hover rounded-xs transition-colors cursor-pointer border-none"
            >
              Cari
            </button>
          </form>
        </div>

        {beritaList.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 font-medium">Belum ada berita yang cocok.</p>
          </div>
        ) : (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            data-aos="fade-up"
          >
            {beritaList.map((berita, index) => (
              <Link
                key={berita.id}
                href={`/informasi/berita/${berita.slug}`}
                data-aos="fade-up"

                className="group flex flex-col bg-slate-50 rounded-xs overflow-hidden no-underline transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
                  {berita.gambar ? (
                    <Image
                      src={resolveImageUrl(berita.gambar) ?? ""}
                      alt={berita.judul}
                      fill
                      priority={index === 0}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm font-medium">
                      Media tidak tersedia
                    </div>
                  )}
                  <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-xs bg-brand-primary text-white shadow-sm">
                    <Tag size={10} />
                    {berita.kategori}
                  </span>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-3 font-mono uppercase tracking-wider">
                    <Calendar size={12} />
                    {berita.tanggal}
                  </div>

                  <h3 className="text-base font-bold text-slate-800 leading-snug mb-3 group-hover:text-brand-primary transition-colors line-clamp-2 flex-1">
                    {berita.judul}
                  </h3>

                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-5">
                    {berita.ringkasan}
                  </p>

                  <div className="flex items-center gap-1.5 text-sm font-bold text-brand-primary mt-auto">
                    Baca Selengkapnya
                    <ChevronRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {lastPage > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            {currentPage > 1 && (
              <Link
                href={`/informasi/berita?${new URLSearchParams({ page: String(currentPage - 1), ...(kategori ? { kategori } : {}), ...(q ? { q } : {}) })}`}
                className="inline-flex items-center gap-1 px-3 py-2 text-sm font-semibold text-slate-600 border border-slate-200 rounded-xs hover:bg-slate-50 no-underline"
              >
                <ChevronLeft size={14} />
                Sebelumnya
              </Link>
            )}
            <span className="text-sm text-gray-400 font-medium px-2">
              Halaman {currentPage} dari {lastPage}
            </span>
            {currentPage < lastPage && (
              <Link
                href={`/informasi/berita?${new URLSearchParams({ page: String(currentPage + 1), ...(kategori ? { kategori } : {}), ...(q ? { q } : {}) })}`}
                className="inline-flex items-center gap-1 px-3 py-2 text-sm font-semibold text-slate-600 border border-slate-200 rounded-xs hover:bg-slate-50 no-underline"
              >
                Berikutnya
                <ChevronRight size={14} />
              </Link>
            )}
          </div>
        )}

        <div className="flex justify-center mt-6">
          <p className="text-sm text-gray-400 font-medium">Menampilkan {total} berita</p>
        </div>
      </ContentSection>
    </div>
  );
}
