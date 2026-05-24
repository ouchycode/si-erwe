import { LAYANAN_DUMMY, Layanan } from "@/lib/dummyData";
import { FileText, Shield, Trash2, ArrowRight } from "lucide-react";
import Link from "next/link";

const LAYANAN_ICON: Record<string, React.ElementType> = {
  "administrasi-kependudukan": FileText,
  "keamanan-wilayah": Shield,
  "kebersihan-lingkungan": Trash2,
};

export default function LayananSection() {
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

        {/* 3 Column Minimal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {LAYANAN_DUMMY.map((item: Layanan) => {
            const Icon = LAYANAN_ICON[item.slug] ?? FileText;
            
            // Functional Colors
            let iconColor = "text-brand-primary";
            let iconHoverBg = "group-hover:bg-brand-primary";
            let textColorHover = "group-hover:text-brand-primary";
            
            if (item.slug === "administrasi-kependudukan") {
              iconColor = "text-blue-700";
              iconHoverBg = "group-hover:bg-blue-700";
              textColorHover = "group-hover:text-blue-700";
            } else if (item.slug === "keamanan-wilayah") {
              iconColor = "text-red-700";
              iconHoverBg = "group-hover:bg-red-700";
              textColorHover = "group-hover:text-red-700";
            } else if (item.slug === "kebersihan-lingkungan") {
              iconColor = "text-emerald-700";
              iconHoverBg = "group-hover:bg-emerald-700";
              textColorHover = "group-hover:text-emerald-700";
            }
            
            return (
              <Link
                key={item.id}
                href={`/layanan/${item.slug}`}
                className="group flex flex-col bg-white rounded-xs border border-gray-200 p-6 md:p-8 outline-none transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1 no-underline"
              >
                <div className={`w-12 h-12 md:w-14 md:h-14 bg-gray-50 border border-gray-200 rounded-xs flex items-center justify-center mb-5 ${iconHoverBg} group-hover:text-white transition-colors duration-300 ${iconColor}`}>
                  <Icon size={24} strokeWidth={2} />
                </div>
                
                <h3 className={`text-lg md:text-xl font-bold text-gray-900 mb-2 ${textColorHover} transition-colors`}>
                  {item.nama}
                </h3>
                
                <p className="text-gray-600 text-sm md:text-base mb-6 flex-1 leading-relaxed">
                  Panduan lengkap dan alur pelayanan {item.nama.toLowerCase()} untuk seluruh warga.
                </p>
                
                <div className={`flex items-center text-sm md:text-base font-bold text-gray-900 ${textColorHover} transition-colors`}>
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
