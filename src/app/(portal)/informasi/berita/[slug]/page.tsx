import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  User,
  Tag,
  Share2,
  Link as LinkIcon,
  ChevronRight,
} from "lucide-react";
import { api, resolveImageUrl } from "@/lib/api";
import type { Berita, ApiMessage } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function DetailBerita({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const res = await api
    .get<ApiMessage<Berita>>(`/berita/${encodeURIComponent(slug)}`)
    .catch(() => null);

  const berita = res?.data;
  if (!berita) notFound();

  const indeks = await api
    .get<{ data: Berita[] }>(`/berita?per_page=9`)
    .catch(() => ({ data: [] as Berita[] }));
  const beritaLain = indeks.data.filter((b) => b.slug !== berita.slug).slice(0, 3);

  const gambar = resolveImageUrl(berita.gambar);

  return (
    <div className="min-h-screen bg-white font-sans pb-20">
      {/* BREADCRUMB */}
      <div className="bg-brand-primary px-6 md:px-16 py-5">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/informasi/berita"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium transition-colors no-underline"
          >
            <ArrowLeft size={16} />
            Kembali ke Indeks Berita
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-16 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10" data-aos="fade-up">
          {/* ARTIKEL UTAMA */}
          <div className="lg:col-span-2 flex flex-col gap-0 bg-slate-50 rounded-xs overflow-hidden shadow-sm">
            {/* Meta + Judul */}
            <div className="p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-500">
                <span className="inline-flex items-center gap-2 font-semibold text-brand-primary">
                  <Tag size={14} />
                  {berita.kategori}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar size={14} />
                  {berita.tanggal}
                </span>
              </div>

              <h1
                className="text-2xl md:text-3xl font-bold text-slate-800 leading-tight tracking-tight mb-6"
                data-aos="fade-up"
              >
                {berita.judul}
              </h1>

              <div className="flex items-center gap-3 py-4 border-t border-b border-slate-200">
                <div className="w-10 h-10 bg-white rounded-xs flex items-center justify-center shrink-0 shadow-sm">
                  <User size={18} className="text-brand-primary" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">
                    {berita.author ?? "Sekretariat RW 004"}
                  </p>
                  <p className="text-xs text-gray-400">{berita.views} kali dibaca</p>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            {gambar && (
              <div className="relative w-full aspect-video bg-gray-100">
                <Image
                  src={gambar}
                  alt={berita.judul}
                  fill
                  sizes="(max-width: 768px) 100vw, 66vw"
                  className="object-cover"
                />
              </div>
            )}

            {/* Konten */}
            <div
              className="p-6 md:p-8 prose prose-sm md:prose-base prose-slate max-w-none prose-headings:text-slate-800 prose-headings:font-bold prose-a:text-brand-primary leading-relaxed bg-white"
              dangerouslySetInnerHTML={{ __html: berita.konten || "" }}
            />

            {/* Share */}
            <div className="px-6 md:px-8 py-5 bg-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                <Share2 size={16} className="text-gray-400" />
                Bagikan berita ini
              </p>
              <div className="flex items-center gap-2">
                <button className="w-9 h-9 rounded-xs bg-[#1877F2] text-white flex items-center justify-center hover:opacity-80 transition-opacity border-none cursor-pointer shadow-sm">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </button>
                <button className="w-9 h-9 rounded-xs bg-black text-white flex items-center justify-center hover:opacity-80 transition-opacity border-none cursor-pointer shadow-sm">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.733-8.835L1.254 2.25H8.08l4.253 5.622 5.912-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </button>
                <button
                  className="w-9 h-9 rounded-xs bg-white text-gray-600 flex items-center justify-center hover:bg-slate-50 transition-colors cursor-pointer shadow-sm border-none"
                  type="button"
                >
                  <LinkIcon size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="flex flex-col gap-4" data-aos="fade-up">
            <div className="bg-slate-50 rounded-xs p-6 shadow-sm sticky top-24">
              <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-slate-200">
                <Tag size={16} className="text-brand-primary" />
                <h3 className="text-base font-bold text-slate-800">Berita Lainnya</h3>
              </div>

              <div className="flex flex-col divide-y divide-slate-200">
                {beritaLain.map((item) => (
                  <Link
                    key={item.id}
                    href={`/informasi/berita/${item.slug}`}
                    data-aos="fade-up"

                    className="group flex flex-col gap-1.5 py-4 first:pt-0 last:pb-0 no-underline"
                  >
                    <p className="text-sm font-semibold text-slate-700 group-hover:text-brand-primary transition-colors leading-snug line-clamp-2">
                      {item.judul}
                    </p>
                    <span className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Calendar size={12} />
                      {item.tanggal}
                    </span>
                  </Link>
                ))}
              </div>

              <Link
                href="/informasi/berita"
                className="mt-6 flex items-center justify-center gap-2 w-full py-3 bg-brand-primary hover:bg-brand-primary-hover text-white rounded-xs text-sm font-semibold transition-colors no-underline"
              >
                Lihat Semua Berita
                <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
