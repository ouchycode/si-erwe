"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { api, resolveImageUrl } from "@/lib/api";
import { getSettingsClient } from "@/lib/settings";
import type { Berita } from "@/lib/types";

export default function Hero() {
  const [slides, setSlides] = useState<Berita[]>([]);
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    api
      .get<{ data: Berita[] }>("/berita?per_page=5")
      .then((res) => setSlides(res.data))
      .catch(() => {});

    getSettingsClient()
      .then((groups) => {
        setHeroImage(resolveImageUrl(groups.hero?.gambar as string | undefined) ?? null);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (slides.length < 2) return;
    stopTimer();
    timerRef.current = setInterval(
      () => setActive((p) => (p + 1) % slides.length),
      6000
    );
    return stopTimer;
  }, [slides.length, stopTimer]);

  const hasSlides = slides.length > 0;

  return (
    <section className="relative mb-7 overflow-hidden bg-wd-maroon-darker">
      {!hasSlides ? (
        /* Slide sambutan saat belum ada berita */
        <div className="is-active relative flex min-h-[420px] items-center md:min-h-[380px]">
          <div className="absolute inset-0">
            {heroImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={heroImage} alt="" aria-hidden="true" className="h-full w-full object-cover" />
            ) : null}
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(46,12,17,0.95)_0%,rgba(46,12,17,0.8)_55%,rgba(46,12,17,0.45)_100%)]" />
          </div>
          <div className="wd-container relative z-10">
            <div className="max-w-[820px] py-12 text-white" data-aos="fade-up">
              <span className="wd-cat !bg-brand-primary !text-white">Selamat Datang</span>
              <h2 className="wd-heading mt-4 text-2xl font-bold leading-tight tracking-[0.5px] md:text-3xl">
                Sekretariat RW 004, rapi dan mudah diakses.
              </h2>
              <p className="mt-2 max-w-xl text-sm text-white/85">
                Satu pintu untuk informasi warga, layanan administrasi, dan
                komunikasi lingkungan yang lebih tertib.
              </p>
              <Link href="/tentang-kami/profil" className="wd-btn mt-5">
                Profil RW
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <>
          {slides.map((post, i) => (
            <div
              key={post.id}
              className={`relative flex min-h-[420px] items-center transition-opacity duration-500 md:min-h-[380px] ${
                i === active ? "!flex opacity-100" : "hidden opacity-0"
              }`}
              aria-hidden={i !== active}
            >
              <div className="absolute inset-0">
                {post.gambar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={resolveImageUrl(post.gambar) ?? ""}
                    alt=""
                    aria-hidden="true"
                    className={`h-full w-full object-cover ${i === active ? "animate-[wdSlideFade_0.5s_ease]" : ""}`}
                  />
                ) : null}
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(46,12,17,0.95)_0%,rgba(46,12,17,0.82)_55%,rgba(46,12,17,0.45)_100%)]" />
              </div>

              <div className="wd-container relative z-10">
                <div className="max-w-[820px] py-12 text-white">
                  <span className="wd-cat !bg-brand-primary !text-white">{post.kategori}</span>
                  <h2 className="wd-heading mt-4 text-xl font-bold leading-snug tracking-[0.5px] md:text-3xl">
                    {post.judul}
                  </h2>
                  <p className="mt-2 hidden max-w-xl text-sm leading-relaxed text-white/85 md:block line-clamp-2">
                    {post.ringkasan}
                  </p>
                  <Link href={`/informasi/berita/${post.slug}`} className="wd-btn mt-5">
                    Baca Selengkapnya
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {/* Dots */}
          <div className="absolute bottom-4 right-4 z-10 flex gap-2 md:right-6">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Slide ${i + 1}`}
                onClick={() => setActive(i)}
                className={`h-2.5 cursor-pointer border-0 p-0 transition-all duration-200 ${
                  i === active
                    ? "w-6 rounded-full bg-brand-primary"
                    : "w-2.5 rounded-full bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
