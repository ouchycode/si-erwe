import { api } from "@/lib/api";
import { FileText, Shield, Trash2, Heart, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Layanan } from "@/lib/types";

const LAYANAN_ICON: Record<string, React.ElementType> = {
  "administrasi-kependudukan": FileText,
  "keamanan-wilayah": Shield,
  "kebersihan-lingkungan": Trash2,
  "posyandu": Heart,
};

export default async function LayananSection() {
  const res = await api
    .get<{ data: Layanan[] }>("/layanan")
    .catch(() => ({ data: [] as Layanan[] }));
  const layananList = res.data;
  return (
    <section className="bg-slate-50 py-20 border-b border-slate-100">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 tracking-tight">
            Layanan Publik
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl">
            Prosedur layanan administrasi maupun lingkungan terpadu untuk
            memudahkan warga.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12">
          {layananList.map((item) => {
            const Icon = LAYANAN_ICON[item.slug] ?? FileText;

            return (
              <Link
                key={item.id}
                href={`/layanan/${item.slug}`}
                className="group flex flex-col bg-white rounded-xs border border-slate-100 p-6 md:p-8 outline-none transition-all duration-300 no-underline relative overflow-hidden hover:shadow-md"
              >
                <div
                  className={`w-12 h-12 md:w-14 md:h-14 rounded-xs flex items-center justify-center mb-5 icon-badge shadow-sm`}
                >
                  <Icon size={24} strokeWidth={2} />
                </div>
                <h3
                  className={`text-lg md:text-xl font-bold text-slate-800 mb-2 group-hover:text-brand-primary transition-colors`}
                >
                  {item.nama}
                </h3>
                <p className="text-gray-600 text-sm md:text-base mb-6 flex-1 leading-relaxed line-clamp-3">
                  {item.deskripsi}
                </p>
                <div
                  className={`flex items-center text-sm md:text-base font-bold text-slate-800 group-hover:text-brand-primary transition-colors`}
                >
                  Akses Layanan{" "}
                  <ArrowRight
                    size={18}
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
