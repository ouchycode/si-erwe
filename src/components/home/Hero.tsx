"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { resolveImageUrl } from "@/lib/api";
import { getSettingsClient } from "@/lib/settings";

export default function Hero() {
  const [heroImage, setHeroImage] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    getSettingsClient()
      .then((groups) => {
        if (!active) return;
        const gambar = groups.hero?.gambar as string | undefined;
        setHeroImage(resolveImageUrl(gambar) ?? null);
      })
      .catch(() => {
        // biarkan tanpa gambar
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-stone-950">
      <div className="absolute inset-0">
        {heroImage ? (
          <Image
            src={heroImage}
            alt="Lingkungan RW 04"
            fill
            priority
            className="object-cover opacity-55"
          />
        ) : null}
        <div className="absolute inset-0 bg-[linear-gradient(135deg,_rgba(122,31,43,0.48),_rgba(0,0,0,0.34))]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[64vh] max-w-7xl items-center px-4 py-20 md:px-8 md:py-28">
        <div data-aos="fade-up" className="max-w-3xl text-white">
          <h1 className="max-w-2xl text-3xl font-medium leading-tight tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.30)] md:text-5xl">
            Sekretariat RW 04, rapi dan mudah diakses.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/85 drop-shadow-[0_1px_5px_rgba(0,0,0,0.22)] md:text-base">
            Satu pintu untuk informasi warga, layanan administrasi, dan
            komunikasi lingkungan yang lebih tertib.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/layanan/administrasi-kependudukan"
              className="inline-flex items-center gap-2 rounded-xs bg-card px-4 py-2.5 text-sm font-semibold text-foreground no-underline transition-colors"
            >
              Administrasi Kependudukan
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/hubungi-kami"
              className="inline-flex items-center gap-2 rounded-xs border border-white/20 bg-transparent px-4 py-2.5 text-sm font-semibold text-white no-underline transition-colors"
            >
              Hubungi Kami
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
