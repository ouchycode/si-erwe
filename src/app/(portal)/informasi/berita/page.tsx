import Image from "next/image";
import Link from "next/link";
import { Calendar, ChevronRight, Tag } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContentSection } from "@/components/ui/ContentSection";
import { BERITA_DUMMY } from "@/lib/dummyData";

export const metadata = { title: "Berita Terkini" };

export default function BeritaTerkini() {
  return (
    <div className="min-h-screen bg-white font-sans pb-20">
      <PageHeader
        category="Pusat Informasi"
        title="Berita Terkini"
        description="Update kegiatan, pengumuman, dan informasi terbaru dari lingkungan RW 04 Pabuaran."
      />

      <ContentSection>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {BERITA_DUMMY.map((berita) => (
                <Link
                  key={berita.id}
                  href={`/informasi/berita/${berita.id}`}
                  className="group flex flex-col bg-slate-50 rounded-xs overflow-hidden no-underline transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                >
                  <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
                    <Image
                      src={berita.gambar}
                      alt={berita.judul}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
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

            <div className="flex justify-center mt-12">
              <p className="text-sm text-gray-400 font-medium">
                Menampilkan {BERITA_DUMMY.length} berita
              </p>
            </div>
      </ContentSection>
    </div>
  );
}
