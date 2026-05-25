"use client";

import { LAYANAN_DUMMY, Layanan } from "@/lib/dummyData";
import { FileText, Shield, Trash2, ArrowRight, FileCheck, Megaphone, CreditCard } from "lucide-react";
import Link from "next/link";
import { useFeatures } from "@/context/FeatureContext";

const LAYANAN_ICON: Record<string, React.ElementType> = {
  "administrasi-kependudukan": FileText,
  "keamanan-wilayah": Shield,
  "kebersihan-lingkungan": Trash2,
  "e-surat": FileCheck,
  "lapor-warga": Megaphone,
  "iuran-warga": CreditCard,
};

export default function LayananSection() {
  const { features } = useFeatures();

  // Memisahkan layanan berdasarkan tipe modul
  const standardModules = LAYANAN_DUMMY.filter(item => item.modulType === "Standar");
  
  // Memfilter modul premium berdasarkan status aktif dari Context
  const premiumModules = LAYANAN_DUMMY.filter(item => {
    if (item.modulType !== "Premium") return false;
    
    // Pengecekan Feature Toggle
    if (item.slug === "e-surat" && !features.isESuratActive) return false;
    if (item.slug === "lapor-warga" && !features.isLaporActive) return false;
    if (item.slug === "iuran-warga" && !features.isIuranActive) return false;
    
    return true;
  });

  return (
    <section className="bg-gray-50 py-20 border-b border-gray-200">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        
        {/* Header */}
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Layanan Publik</h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl">
            Prosedur layanan administrasi maupun lingkungan terpadu untuk memudahkan warga.
          </p>
        </div>

        {/* Modul Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
          {[...standardModules, ...premiumModules].map((item: Layanan) => {
            const Icon = LAYANAN_ICON[item.slug] ?? FileText;
            
                                    
            const isPremium = item.modulType === "Premium";
            const linkHref = isPremium ? `/${item.slug}` : `/layanan/${item.slug}`;
            const linkTarget = isPremium ? "_blank" : "_self";
            
            return (
              <Link
                key={item.id}
                href={linkHref}
                target={linkTarget}
                className="group flex flex-col bg-white rounded-xs border border-gray-200 p-6 md:p-8 outline-none transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1 no-underline relative overflow-hidden"
              >
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xs flex items-center justify-center mb-5 icon-badge shadow-sm`}>
                  <Icon size={24} strokeWidth={2} />
                </div>
                <h3 className={`text-lg md:text-xl font-bold text-gray-900 mb-2 group-hover:text-brand-primary transition-colors`}>{item.nama}</h3>
                <p className="text-gray-600 text-sm md:text-base mb-6 flex-1 leading-relaxed">{item.deskripsi}</p>
                <div className={`flex items-center text-sm md:text-base font-bold text-gray-900 group-hover:text-brand-primary transition-colors`}>
                  Akses Layanan <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
