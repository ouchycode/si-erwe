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
    <div className="min-h-screen font-sans pb-16">
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
              className={`wd-chip !text-xs ${!kategori ? "is-active" : ""}`}
            >
              Semua
            </Link>
            {kategoris.map((k) => (
              <Link
                key={k}
                href={`/informasi/berita?kategori=${encodeURIComponent(k)}`}
                className={`wd-chip !text-xs ${kategori === k ? "is-active" : ""}`}
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
                className="w-full md:w-56 rounded-md border border-gray-300 bg-white py-2 pl-9 pr-3 text-sm text-gray-700 outline-none transition-colors focus:border-brand-primary"
              />
            </div>
            <button type="submit" className="wd-btn !py-2 !text-[13px]">
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

                className="wd-card wd-lift group flex flex-col overflow-hidden no-underline"
              >
                <div className="relative h-[190px] w-full overflow-hidden bg-gray-100">
                  {berita.gambar ? (
                    <Image
                      src={resolveImageUrl(berita.gambar) ?? ""}
                      alt={berita.judul}
                      fill
                      priority={index === 0}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="wd-heading flex h-full items-center justify-center bg-brand-light tracking-[1px] text-brand-primary opacity-80">
                      RW 004
                    </div>
                  )}
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-brand-primary px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
                    <Tag size={10} />
                    {berita.kategori}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className="wd-heading flex items-center gap-1.5 text-xs tracking-[1px] text-brand-primary uppercase">
                    <Calendar size={12} />
                    {berita.tanggal}
                  </div>

                  <h3 className="wd-heading mt-2 line-clamp-2 flex-1 text-base font-semibold leading-snug text-slate-800 transition-colors group-hover:text-brand-primary">
                    {berita.judul}
                  </h3>

                  <p className="mb-4 mt-2 line-clamp-2 text-sm leading-relaxed text-gray-500">
                    {berita.ringkasan}
                  </p>

                  <div className="wd-heading mt-auto inline-flex items-center gap-1.5 text-[13px] tracking-[0.5px] text-brand-primary uppercase">
                    Baca Selengkapnya
                    <ChevronRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {lastPage > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2">
            {currentPage > 1 && (
              <Link
                href={`/informasi/berita?${new URLSearchParams({ page: String(currentPage - 1), ...(kategori ? { kategori } : {}), ...(q ? { q } : {}) })}`}
                className="wd-heading inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-3.5 py-2 text-[13px] tracking-[0.5px] text-gray-600 no-underline transition-colors hover:border-brand-primary hover:bg-brand-primary hover:text-white"
              >
                <ChevronLeft size={14} />
                Sebelumnya
              </Link>
            )}
            <span className="wd-heading px-2 text-sm tracking-[0.5px] text-gray-500">
              Halaman {currentPage} dari {lastPage}
            </span>
            {currentPage < lastPage && (
              <Link
                href={`/informasi/berita?${new URLSearchParams({ page: String(currentPage + 1), ...(kategori ? { kategori } : {}), ...(q ? { q } : {}) })}`}
                className="wd-heading inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-3.5 py-2 text-[13px] tracking-[0.5px] text-gray-600 no-underline transition-colors hover:border-brand-primary hover:bg-brand-primary hover:text-white"
              >
                Berikutnya
                <ChevronRight size={14} />
              </Link>
            )}
          </div>
        )}

        <div className="mt-6 flex justify-center">
          <p className="text-sm text-gray-400">Menampilkan {total} berita</p>
        </div>
      </ContentSection>
    </div>
  );
}
