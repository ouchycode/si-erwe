import { api } from "@/lib/api";
import { FileText, Heart } from "lucide-react";
import Link from "next/link";
import SectionTitle from "@/components/ui/SectionTitle";
import type { Layanan } from "@/lib/types";

const LAYANAN_ICON: Record<string, React.ElementType> = {
  "administrasi-kependudukan": FileText,
  "posyandu": Heart,
};

// Slug layanan yang halamannya sudah tidak tersedia
const LAYANAN_DISABLED = new Set(["keamanan-wilayah", "kebersihan-lingkungan"]);

export default async function LayananSection() {
  const res = await api
    .get<{ data: Layanan[] }>("/layanan")
    .catch(() => ({ data: [] as Layanan[] }));
  const layananList = res.data.filter((l) => !LAYANAN_DISABLED.has(l.slug));
  return (
    <section className="wd-container mb-7">
      <SectionTitle title="Layanan Warga" />

      <div
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        data-aos="fade-up"
      >
        {layananList.map((item) => {
          const Icon = LAYANAN_ICON[item.slug] ?? FileText;

          return (
            <Link
              key={item.id}
              href={`/layanan/${item.slug}`}
              className="wd-card wd-lift group flex flex-col items-center gap-3 p-6 text-center no-underline hover:!border-brand-primary"
            >
              <span className="icon-badge flex size-14 items-center justify-center rounded-full !bg-brand-light !text-brand-primary group-hover:!bg-brand-primary group-hover:!text-white">
                <Icon size={24} strokeWidth={2} />
              </span>
              <span className="wd-heading text-sm font-medium tracking-[0.5px] text-slate-800 transition-colors group-hover:text-brand-primary">
                {item.nama}
              </span>
              <span className="line-clamp-2 text-[13px] leading-relaxed text-gray-500">
                {item.deskripsi}
              </span>
            </Link>
          );
        })}
      </div>

      {layananList.length === 0 && (
        <div className="py-10 text-center text-sm text-gray-400">
          Belum ada data layanan.
        </div>
      )}
    </section>
  );
}
