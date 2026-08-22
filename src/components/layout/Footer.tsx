"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SOCIAL_LINKS } from "@/lib/navigation";
import { ALAMAT } from "@/lib/constants";
import { getSettingsClient } from "@/lib/settings";
import { resolveImageUrl } from "@/lib/api";
import type { SekretariatAlamat } from "@/lib/types";

const MENU_JELAJAHI = [
  { label: "Beranda", href: "/" },
  { label: "Profil RW", href: "/tentang-kami/profil" },
  { label: "Struktur RW", href: "/tentang-kami/struktur-rw" },
  { label: "Peta Wilayah", href: "/tentang-kami/peta-wilayah" },
  { label: "Hubungi Kami", href: "/hubungi-kami" },
];

const MENU_LAYANAN = [
  { label: "Berita Terkini", href: "/informasi/berita" },
  { label: "Galeri Kegiatan", href: "/informasi/galeri" },
  { label: "Statistik Warga", href: "/informasi/statistik" },
  { label: "Program Warga", href: "/informasi/program-warga" },
  { label: "Layanan Warga", href: "/layanan/administrasi-kependudukan" },
];

export default function Footer({ identitas }: { identitas?: { logo?: string; nama?: string } }) {
  const [alamat, setAlamat] = useState<SekretariatAlamat>(ALAMAT);
  const [logo, setLogo] = useState<string | undefined>(() =>
    identitas?.logo ? resolveImageUrl(identitas.logo) : undefined
  );
  const [nama, setNama] = useState(identitas?.nama || "Darma Bakti RW 004");

  useEffect(() => {
    getSettingsClient()
      .then((groups) => {
        const s = groups.alamat?.sekretariat as SekretariatAlamat | undefined;
        if (s) setAlamat({ ...ALAMAT, ...s });
        if (typeof groups.identitas?.nama === "string")
          setNama(groups.identitas.nama);
        if (typeof groups.identitas?.logo === "string")
          setLogo(resolveImageUrl(groups.identitas.logo));
      })
      .catch(() => {});
  }, []);

  return (
    <footer className="mt-auto bg-wd-maroon-dark text-[14px] text-white/75">
      <div className="wd-container pb-8 pt-11">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Tentang */}
          <div className="lg:col-span-2 md:col-span-2">
            <h4 className="wd-heading mb-3.5 text-[15px] font-semibold tracking-[1px] text-white">
              {nama}
            </h4>
            <div className="flex items-start gap-3">
              {logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={logo}
                  alt={nama}
                  className="h-16 w-auto shrink-0 rounded-xs bg-white/95 object-contain p-1 shadow-[0_2px_8px_rgba(0,0,0,0.25)]"
                />
              ) : null}
              <p className="m-0 leading-relaxed">
                Sekretariat Rukun Warga 004, Kelurahan {alamat.kelurahan},
                Kecamatan {alamat.kecamatan}, {alamat.kota}. Satu pintu
                informasi dan layanan warga.
              </p>
            </div>
            <div className="mt-4 flex gap-2">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="flex size-9 items-center justify-center rounded-full bg-white/10 text-white/80 no-underline transition-colors hover:bg-white/20 hover:text-white"
                >
                  <link.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Jelajahi */}
          <div>
            <h4 className="wd-heading mb-3.5 text-[15px] font-semibold tracking-[1px] text-white">
              Jelajahi
            </h4>
            <ul className="m-0 list-none space-y-2 p-0">
              {MENU_JELAJAHI.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/75 no-underline transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Informasi & Layanan */}
          <div>
            <h4 className="wd-heading mb-3.5 text-[15px] font-semibold tracking-[1px] text-white">
              Informasi
            </h4>
            <ul className="m-0 list-none space-y-2 p-0">
              {MENU_LAYANAN.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/75 no-underline transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="wd-container flex flex-col items-center justify-between gap-1 py-4 sm:flex-row">
          <span className="wd-heading text-[12px] tracking-[0.5px] uppercase text-white/60">
            © {new Date().getFullYear()} {nama}
          </span>
          <span className="wd-heading text-[12px] tracking-[0.5px] uppercase text-white/60">
            Developed by KKN UYM Threeverse Bytewizard Team 2026
          </span>
        </div>
      </div>
    </footer>
  );
}
