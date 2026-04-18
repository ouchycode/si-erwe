import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white min-h-[88vh] flex items-center px-6 md:px-16">
      {/* Background photo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/lingkungan-rw.png')",
          opacity: 0.07,
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl w-full py-24">
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-[1.05] tracking-tight mb-6">
          Portal Informasi
          <br />
          Warga RW 12
        </h1>

        <p className="text-gray-400 text-base md:text-lg max-w-md mb-12 leading-relaxed">
          Berwibawa, Peduli, Resik, Tertib, Aman dan Serasi
        </p>

        <div className="flex items-center gap-6">
          <Link
            href="/layanan"
            className="inline-flex items-center gap-3 bg-[#1a3a6b] hover:bg-[#14306e] text-white text-sm font-semibold px-6 py-3.5 rounded-md no-underline transition-colors"
          >
            Layanan Warga
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
