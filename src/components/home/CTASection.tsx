import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

export default function CTASection() {
  return (
    <section className="bg-brand-primary py-16 border-b border-brand-primary-hover">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div data-aos="fade-up" className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-3">
              Butuh Bantuan?
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-3 tracking-tight">
              Ada pertanyaan atau butuh layanan administrasi?
            </h2>
            <p className="text-sm md:text-base text-white/60 leading-relaxed">
              Hubungi sekretariat RW 004 atau kunjungi halaman layanan untuk
              informasi prosedur lengkap.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/hubungi-kami"
              className="inline-flex items-center justify-center gap-2 rounded-xs bg-white px-5 py-3 text-sm font-bold text-brand-primary no-underline hover:bg-slate-50 transition-colors"
            >
              <Phone size={16} />
              Hubungi Kami
            </Link>
            <Link
              href="/layanan/administrasi-kependudukan"
              className="inline-flex items-center justify-center gap-2 rounded-xs border border-white/20 bg-transparent px-5 py-3 text-sm font-bold text-white no-underline hover:bg-white/10 transition-colors"
            >
              Layanan Administrasi
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
