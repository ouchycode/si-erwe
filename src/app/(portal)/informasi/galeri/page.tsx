"use client";

import { useState } from "react";
import Image from "next/image";
import { PageHeader } from "@/components/ui/PageHeader";
import { X, ZoomIn, Camera } from "lucide-react";

// Dummy data for gallery
const GALLERY_IMAGES = [
  { id: 1, src: "https://images.unsplash.com/photo-1596423735880-5f2a689b903e?q=80&w=800&auto=format&fit=crop", title: "Kerja Bakti Membersihkan Selokan", category: "Lingkungan" },
  { id: 2, src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800&auto=format&fit=crop", title: "Rapat Pengurus RW", category: "Administrasi" },
  { id: 3, src: "https://images.unsplash.com/photo-1541890289-b86df5baff0c?q=80&w=800&auto=format&fit=crop", title: "Lomba 17 Agustus", category: "Acara" },
  { id: 4, src: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=800&auto=format&fit=crop", title: "Bazaar Warga", category: "Acara" },
  { id: 5, src: "https://images.unsplash.com/photo-1603513492128-ba7bc9b3e143?q=80&w=800&auto=format&fit=crop", title: "Posyandu Balita", category: "Kesehatan" },
  { id: 6, src: "https://images.unsplash.com/photo-1599839619722-39751411ea63?q=80&w=800&auto=format&fit=crop", title: "Siskamling Malam", category: "Keamanan" },
  { id: 7, src: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=800&auto=format&fit=crop", title: "Penyuluhan Kesehatan", category: "Kesehatan" },
  { id: 8, src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800&auto=format&fit=crop", title: "Rapat Karang Taruna", category: "Pemuda" },
  { id: 9, src: "https://images.unsplash.com/photo-1526399232581-2ab5608b6336?q=80&w=800&auto=format&fit=crop", title: "Penanaman Pohon", category: "Lingkungan" },
];

export default function GaleriPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans">
      <PageHeader
        category="Dokumentasi"
        title="Galeri Kegiatan RW 04"
        description="Kumpulan foto dan dokumentasi kegiatan warga, rapat pengurus, serta momen-momen penting di lingkungan RW 04."
        rightContent={
          <div className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-xs px-5 py-4 shrink-0">
            <Camera size={16} className="text-white/70" />
            <div>
              <p className="text-[10.5px] text-white/40 font-semibold uppercase tracking-widest mb-0.5">
                Total Album
              </p>
              <p className="text-sm font-bold text-white leading-none">
                {GALLERY_IMAGES.length} Foto Tersedia
              </p>
            </div>
          </div>
        }
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-16 relative z-10">
        <div className="bg-white border border-slate-100 shadow-sm p-6 md:p-8 rounded-xs min-h-[500px]">
          
          {/* Masonry Grid */}
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-3 gap-6 space-y-6">
            {GALLERY_IMAGES.map((item) => (
              <div 
                key={item.id} 
                className="relative group overflow-hidden rounded-xs bg-gray-100 break-inside-avoid cursor-pointer border border-slate-100"
                onClick={() => setSelectedImage(item.src)}
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Overlay Hover */}
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
            ))}
          </div>

        </div>
      </div>

      {/* Lightbox Modal */}
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
