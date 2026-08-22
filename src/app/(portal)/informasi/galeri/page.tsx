"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContentSection } from "@/components/ui/ContentSection";
import { X, ZoomIn, Camera } from "lucide-react";
import { api, resolveImageUrl } from "@/lib/api";
import type { GaleriItem, Paginated } from "@/lib/types";

export default function GaleriPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [items, setItems] = useState<GaleriItem[] | null>(null);
  const [total, setTotal] = useState(0);
  const [kategori, setKategori] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const params = new URLSearchParams({ per_page: "60" });
    if (kategori) params.set("kategori", kategori);

    api
      .get<Paginated<GaleriItem>>(`/galeri?${params.toString()}`)
      .then((res) => {
        if (!active) return;
        setItems(res.data);
        setTotal(res.meta.total);
      })
      .catch(() => {
        if (!active) return;
        setItems([]);
        setTotal(0);
      });

    return () => {
      active = false;
    };
  }, [kategori]);

  const loading = items === null;
  const kategoris = Array.from(new Set((items ?? []).map((i) => i.category).filter(Boolean)));

  return (
    <div className="min-h-screen font-sans pb-16">
      <PageHeader
        category="Dokumentasi"
        title="Galeri Kegiatan RW 004"
        description="Kumpulan foto dan dokumentasi kegiatan warga, rapat pengurus, serta momen-momen penting di lingkungan RW 004."
        rightContent={
          <div className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-xs px-5 py-4 shrink-0">
            <Camera size={16} className="text-white/70" />
            <div>
              <p className="text-[10.5px] text-white/40 font-semibold uppercase tracking-widest mb-0.5">
                Total Album
              </p>
              <p className="text-sm font-bold text-white leading-none">
                {total} Foto Tersedia
              </p>
            </div>
          </div>
        }
      />

      <ContentSection className="min-h-[500px]">
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setKategori(null)}
            className={`px-4 py-2 text-xs font-semibold transition-all rounded-xs cursor-pointer border-none ${
              !kategori
                ? "text-brand-primary bg-brand-light shadow-sm"
                : "text-gray-500 hover:text-gray-700 bg-slate-50 shadow-sm"
            }`}
          >
            Semua
          </button>
          {kategoris.map((k) => (
            <button
              key={k}
              onClick={() => setKategori(k)}
              className={`px-4 py-2 text-xs font-semibold transition-all rounded-xs cursor-pointer border-none ${
                kategori === k
                  ? "text-brand-primary bg-brand-light shadow-sm"
                  : "text-gray-500 hover:text-gray-700 bg-slate-50 shadow-sm"
              }`}
            >
              {k}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20">
            <p className="text-gray-400 font-medium">Memuat galeri...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 font-medium">Belum ada foto untuk kategori ini.</p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-3 gap-6 space-y-6" data-aos="fade-up">
            {items.map((item, index) => {
              const src = resolveImageUrl(item.image) ?? "";
              return (
                <div
                  key={item.id}
                  className="relative group overflow-hidden rounded-xs bg-gray-100 break-inside-avoid cursor-pointer shadow-sm hover:shadow-md transition-shadow"
                  data-aos="fade-up"

                  onClick={() => setSelectedImage(src)}
                >
                  <Image
                    src={src}
                    alt={item.title}
                    width={800}
                    height={600}
                    priority={index === 0}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-brand-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-4">
                    <ZoomIn size={32} className="mb-3 text-white/80 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/70 mb-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                      {item.category}
                    </span>
                    <h3 className="text-center font-semibold text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                      {item.title}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </ContentSection>

      {selectedImage && (
        <div
          className="fixed inset-0 z-[99999] bg-black/95 flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors bg-transparent border-none cursor-pointer p-2"
            onClick={() => setSelectedImage(null)}
          >
            <X size={32} />
          </button>

          <div
            className="relative w-full max-w-5xl max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage}
              alt="Preview"
              width={1600}
              height={1200}
              className="w-auto h-auto max-w-full max-h-[90vh] object-contain rounded-sm shadow-2xl"
              priority
            />
          </div>
        </div>
      )}
    </div>
  );
}
