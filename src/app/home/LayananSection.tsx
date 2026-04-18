import { LAYANAN_DUMMY, Layanan } from "@/lib/dummyData";
import { ArrowRight, FileText, Shield, Trash2 } from "lucide-react";
import Link from "next/link";

const LAYANAN_ICON: Record<string, React.ElementType> = {
  "administrasi-kependudukan": FileText,
  "keamanan-wilayah": Shield,
  "kebersihan-lingkungan": Trash2,
};

export default function LayananSection() {
  return (
    <section className="py-20 px-6 md:px-16 bg-[#f8f9fc] border-b border-gray-100">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-5">
          Layanan Warga
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {LAYANAN_DUMMY.map((item: Layanan) => {
            const Icon = LAYANAN_ICON[item.slug] ?? FileText;
            return (
              <Link
                key={item.id}
                href={`/layanan/${item.slug}`}
                className="group flex items-center gap-4 bg-white hover:bg-[#1a3a6b] border border-gray-100 rounded-md px-5 py-5 no-underline transition-colors duration-200"
              >
                <div className="w-9 h-9 rounded-sm bg-blue-50 group-hover:bg-white/10 flex items-center justify-center shrink-0 transition-colors">
                  <Icon
                    size={16}
                    className="text-[#1a3a6b] group-hover:text-white transition-colors"
                  />
                </div>
                <span className="text-sm font-semibold text-gray-700 group-hover:text-white transition-colors leading-snug flex-1">
                  {item.nama}
                </span>
                <ArrowRight
                  size={14}
                  className="shrink-0 text-gray-300 group-hover:text-white/60 group-hover:translate-x-0.5 transition-all"
                />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
