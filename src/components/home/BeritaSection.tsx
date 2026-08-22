import { api, resolveImageUrl } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import SectionTitle from "@/components/ui/SectionTitle";
import type { Berita } from "@/lib/types";

export default async function BeritaSection() {
  const res = await api
    .get<{ data: Berita[] }>("/berita?per_page=3")
    .catch(() => ({ data: [] as Berita[] }));
  const beritaList = res.data;

  return (
    <section className="wd-container mb-7">
      <SectionTitle title="Kabar Lingkungan" href="/informasi/berita" />

      {beritaList.length === 0 ? (
        <div className="wd-card py-10 text-center text-sm text-gray-400">
          Belum ada berita.
        </div>
      ) : (
        <div
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          data-aos="fade-up"
        >
          {beritaList.map((news, index) => (
            <Link
              key={news.id}
              href={`/informasi/berita/${news.slug}`}
              className="wd-card wd-lift group flex flex-col overflow-hidden no-underline"
            >
              <div className="relative h-[190px] w-full overflow-hidden bg-gray-100">
                {news.gambar ? (
                  <Image
                    src={resolveImageUrl(news.gambar) ?? ""}
                    alt={news.judul}
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
                <span className="absolute left-3 top-3 rounded-full bg-brand-primary px-2.5 py-1 font-heading text-[10px] uppercase tracking-[0.5px] text-white">
                  {news.kategori}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-4">
                <span className="wd-heading text-xs tracking-[1px] text-brand-primary">
                  {news.tanggal}
                </span>
                <h3 className="wd-heading mt-1.5 line-clamp-2 text-[17px] font-semibold leading-snug text-slate-800 transition-colors group-hover:text-brand-primary">
                  {news.judul}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-gray-500">
                  {news.ringkasan}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
