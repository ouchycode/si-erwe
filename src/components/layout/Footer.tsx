"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  ChevronRight,
  ChevronDown,
  Clock,
  AlertCircle,
} from "lucide-react";

const QUICK_LINKS = [
  { label: "Profil & Sejarah RW", href: "/tentang-kami/profil" },
  { label: "Struktur Pengurus", href: "/tentang-kami/struktur-rw" },
  {
    label: "Administrasi Kependudukan",
    href: "/layanan/administrasi-kependudukan",
  },
  { label: "Keamanan & Kebersihan", href: "/layanan/keamanan-wilayah" },
  { label: "Statistik Demografi Warga", href: "/informasi/statistik" },
  { label: "Layanan Rukun Kematian", href: "/informasi/rukem" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggle = (s: string) => setOpenSection((p) => (p === s ? null : s));

  return (
    <footer className="bg-[#1a3a6b] text-white font-sans">
      {/* DESKTOP */}
      <div className="hidden md:block max-w-6xl mx-auto px-6 md:px-16 pt-16 pb-10">
        <div className="grid grid-cols-4 gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3 no-underline">
              <div className="w-10 h-10 bg-white/10 rounded-md flex items-center justify-center shrink-0 border border-white/10">
                <Building2 size={18} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-white leading-tight">
                  SI-RW 12
                </p>
                <p className="text-[10px] text-white/50 font-medium tracking-widest uppercase">
                  Kutabumi · Tangerang
                </p>
              </div>
            </Link>
            <p className="text-[12.5px] text-white/50 leading-relaxed">
              Platform digital pelayanan administrasi, informasi, dan pendataan
              warga RW 12 Kutabumi.
            </p>
          </div>

          {/* Akses Cepat */}
          <div className="flex flex-col gap-4">
            <p className="text-[11px] font-semibold tracking-widest text-white/40 uppercase">
              Akses Cepat
            </p>
            <ul className="flex flex-col gap-3 p-0 m-0 list-none">
              {QUICK_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-2 text-[12.5px] text-white/60 hover:text-white no-underline transition-colors group"
                  >
                    <ChevronRight
                      size={13}
                      className="text-white/20 group-hover:text-white group-hover:translate-x-0.5 transition-all"
                    />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info Penting */}
          <div className="flex flex-col gap-4">
            <p className="text-[11px] font-semibold tracking-widest text-white/40 uppercase">
              Info Penting
            </p>
            <div className="flex items-start gap-3">
              <Clock size={14} className="text-white/40 shrink-0 mt-0.5" />
              <div>
                <p className="text-[12.5px] font-semibold text-white/80 mb-1">
                  Jam Layanan Sekretariat
                </p>
                <p className="text-[12px] text-white/50 leading-relaxed">
                  Senin – Jumat: 19.00 – 22.00 WIB
                  <br />
                  Sabtu – Minggu: 09.00 – 15.00 WIB
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 pt-4 border-t border-white/10">
              <AlertCircle
                size={14}
                className="text-white/40 shrink-0 mt-0.5"
              />
              <div>
                <p className="text-[12.5px] font-semibold text-white/80 mb-2">
                  Kontak Darurat
                </p>
                <div className="flex flex-col gap-1.5 text-[12px] text-white/50">
                  <div className="flex justify-between gap-4">
                    <span>Keamanan</span>
                    <a
                      href="tel:08123456789"
                      className="text-white/70 hover:text-white no-underline transition-colors"
                    >
                      0812-3456-7890
                    </a>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span>Polsek</span>
                    <a
                      href="tel:110"
                      className="text-white/70 hover:text-white no-underline transition-colors"
                    >
                      110
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Kontak */}
          <div className="flex flex-col gap-4">
            <p className="text-[11px] font-semibold tracking-widest text-white/40 uppercase">
              Sekretariat
            </p>
            <ul className="flex flex-col gap-3.5 p-0 m-0 list-none">
              <li className="flex items-start gap-3">
                <MapPin size={13} className="text-white/40 shrink-0 mt-0.5" />
                <span className="text-[12.5px] text-white/60 leading-relaxed">
                  Gedung Serbaguna RW 12
                  <br />
                  Kel. Kutabumi, Kab. Tangerang
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={13} className="text-white/40 shrink-0" />
                <span className="text-[12.5px] text-white/60">
                  +62 811-2222-3333
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={13} className="text-white/40 shrink-0" />
                <span className="text-[12.5px] text-white/60">
                  admin@rw12.id
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* MOBILE */}
      <div className="block md:hidden px-6 pt-10 pb-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-9 h-9 bg-white/10 rounded-md flex items-center justify-center border border-white/10">
            <Building2 size={16} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-white">SI-RW 12 Kutabumi</p>
            <p className="text-[10.5px] text-white/40 tracking-widest uppercase">
              Kutabumi · Tangerang
            </p>
          </div>
        </div>

        <div className="border-t border-white/10">
          {[
            {
              key: "akses",
              label: "Akses Cepat",
              content: (
                <ul className="flex flex-col gap-3 pb-4 px-1 list-none m-0">
                  {QUICK_LINKS.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="flex items-center gap-2 text-[12.5px] text-white/60 no-underline"
                      >
                        <ChevronRight size={13} className="text-white/20" />
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              ),
            },
            {
              key: "info",
              label: "Info & Darurat",
              content: (
                <div className="flex flex-col gap-3 pb-4 px-1 text-[12px] text-white/60">
                  <p>
                    <span className="text-white/80 font-semibold">
                      Jam Layanan:
                    </span>
                    <br />
                    Sen–Jum 19.00–22.00 · Sab–Min 09.00–15.00
                  </p>
                  <p>
                    <span className="text-white/80 font-semibold">
                      Darurat:
                    </span>
                    <br />
                    Keamanan: 0812-3456-7890 · Polsek: 110
                  </p>
                </div>
              ),
            },
            {
              key: "kontak",
              label: "Kontak Sekretariat",
              content: (
                <ul className="flex flex-col gap-3 pb-4 px-1 list-none m-0 text-[12.5px] text-white/60">
                  <li className="flex items-start gap-2.5">
                    <MapPin
                      size={13}
                      className="text-white/40 mt-0.5 shrink-0"
                    />
                    Gedung Serbaguna RW 12, Kutabumi
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Phone size={13} className="text-white/40 shrink-0" />
                    +62 811-2222-3333
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Mail size={13} className="text-white/40 shrink-0" />
                    admin@rw12.id
                  </li>
                </ul>
              ),
            },
          ].map(({ key, label, content }) => (
            <div key={key} className="border-b border-white/10">
              <button
                onClick={() => toggle(key)}
                className="w-full flex items-center justify-between py-4 text-[13px] font-semibold text-white/80 bg-transparent border-none cursor-pointer"
              >
                {label}
                <ChevronDown
                  size={15}
                  className={`transition-transform text-white/30 ${openSection === key ? "rotate-180" : ""}`}
                />
              </button>
              {openSection === key && content}
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 md:px-16 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[11.5px] text-white/30 text-center md:text-left">
            &copy; {currentYear} Sistem Informasi RW 12 Kutabumi.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/privasi"
              className="text-[11.5px] text-white/30 hover:text-white/70 no-underline transition-colors"
            >
              Privasi
            </Link>
            <span className="w-px h-3 bg-white/20" />
            <Link
              href="/syarat"
              className="text-[11.5px] text-white/30 hover:text-white/70 no-underline transition-colors"
            >
              Syarat
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
