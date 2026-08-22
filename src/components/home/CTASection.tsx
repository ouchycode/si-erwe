import Link from "next/link";
import { Phone } from "lucide-react";

export default function CTASection() {
  return (
    <section className="bg-[linear-gradient(135deg,#4a141d,#7a1f2b)] text-white">
      <div className="wd-container">
        <div className="flex flex-col justify-between gap-6 py-10 md:flex-row md:items-center">
          <div data-aos="fade-up" className="max-w-xl">
            <p className="wd-heading mb-1.5 text-xs tracking-[2px] text-white/60 uppercase">
              Butuh Bantuan?
            </p>
            <h2 className="wd-heading text-lg font-semibold tracking-[0.5px] leading-snug md:text-2xl">
              Ada pertanyaan atau butuh layanan administrasi?
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-white/70">
              Hubungi sekretariat RW 004 atau kunjungi halaman layanan untuk
              informasi prosedur lengkap.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Link href="/hubungi-kami" className="wd-btn wd-btn--light">
              <Phone size={16} />
              Hubungi Kami
            </Link>
            <Link
              href="/layanan/administrasi-kependudukan"
              className="wd-btn !bg-wd-maroon-darker hover:!bg-black/40"
            >
              Layanan Administrasi
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
