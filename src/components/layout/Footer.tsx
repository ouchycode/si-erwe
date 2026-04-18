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
  //   Instagram,
  //   Facebook,
  Clock,
  AlertCircle,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  // State untuk accordion di tampilan mobile
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

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

  return (
    <footer className="bg-[#1a3a6b] text-white font-sans border-t-4 border-blue-500">
      <div className="hidden md:block max-w-6xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-4 gap-8">
          <div className="flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-3 no-underline">
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center shrink-0 border border-white/20">
                <Building2 size={24} className="text-white" />
              </div>
              <div>
                <p className="text-xl font-bold text-white leading-tight">
                  SI-RW 12
                </p>
                <p className="text-[11px] text-white/70 font-medium tracking-widest uppercase mt-0.5">
                  Kutabumi · Tangerang
                </p>
              </div>
            </Link>
            <p className="text-[13px] text-white/70 leading-relaxed">
              Platform digital terpadu untuk pelayanan administrasi, pusat
              informasi, dan pendataan warga RW 12.
            </p>
          </div>

          <div className="flex flex-col gap-5">
            <h3 className="text-[16px] font-bold text-white tracking-wide">
              Akses Cepat
            </h3>
            <ul className="flex flex-col gap-3.5 p-0 m-0 list-none">
              {QUICK_LINKS.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className="text-[13px] text-white/70 hover:text-white flex items-center gap-2 group no-underline transition-colors"
                  >
                    <ChevronRight
                      size={14}
                      className="text-white/30 group-hover:text-white group-hover:translate-x-1 transition-all"
                    />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-5">
            <h3 className="text-[16px] font-bold text-white tracking-wide">
              Info Penting
            </h3>
            <div className="flex items-start gap-3">
              <Clock size={18} className="text-blue-300 shrink-0 mt-0.5" />
              <div>
                <p className="text-[13px] font-semibold text-white mb-1">
                  Jam Layanan Sekretariat
                </p>
                <p className="text-[13px] text-white/70 leading-relaxed">
                  Senin - Jumat: 19:00 - 22:00 WIB
                  <br />
                  Sabtu - Minggu: 09:00 - 15:00 WIB
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 mt-2 border-t border-white/10 pt-4">
              <AlertCircle size={18} className="text-red-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-[13px] font-semibold text-white mb-2">
                  Kontak Darurat
                </p>
                <ul className="flex flex-col gap-2 p-0 m-0 list-none text-[13px] text-white/70">
                  <li className="flex justify-between items-center gap-4">
                    <span>Keamanan</span>
                    <a
                      href="tel:08123456789"
                      className="text-blue-300 hover:text-white"
                    >
                      0812-3456-7890
                    </a>
                  </li>
                  <li className="flex justify-between items-center gap-4">
                    <span>Polsek</span>
                    <a
                      href="tel:110"
                      className="text-blue-300 hover:text-white"
                    >
                      110
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <h3 className="text-[16px] font-bold text-white tracking-wide">
              Hubungi Kami
            </h3>
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <ul className="flex flex-col gap-4 p-0 m-0 list-none">
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="text-blue-300 shrink-0 mt-0.5" />
                  <span className="text-[13px] text-white/80 leading-relaxed">
                    <strong>Gedung Serbaguna RW 12</strong>
                    <br />
                    Kelurahan Kutabumi, Kab. Tangerang
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-blue-300 shrink-0" />
                  <span className="text-[13px] text-white/80">
                    +62 811-2222-3333
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="block md:hidden px-5 pt-8 pb-6">
        <div className="flex flex-col items-center text-center gap-3 mb-8">
          <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center border border-white/20">
            <Building2 size={24} className="text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">SI-RW 12 Kutabumi</h2>
            <p className="text-[12px] text-white/70 mt-1 px-4 leading-relaxed">
              Platform digital terpadu pelayanan warga RW 12.
            </p>
          </div>
        </div>

        {/* Mobile Accordions */}
        <div className="flex flex-col gap-2 border-t border-white/10 pt-4">
          <div className="border-b border-white/10">
            <button
              onClick={() => toggleSection("akses")}
              className="w-full flex items-center justify-between py-4 text-[14px] font-semibold text-white bg-transparent border-none"
            >
              Akses Cepat
              <ChevronDown
                size={18}
                className={`transition-transform text-white/50 ${openSection === "akses" ? "rotate-180" : ""}`}
              />
            </button>
            {openSection === "akses" && (
              <ul className="flex flex-col gap-3 pb-4 px-2 list-none m-0">
                {QUICK_LINKS.map((item, idx) => (
                  <li key={idx}>
                    <Link
                      href={item.href}
                      className="text-[13px] text-white/70 flex items-center gap-2 no-underline"
                    >
                      <ChevronRight size={14} className="text-white/30" />{" "}
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="border-b border-white/10">
            <button
              onClick={() => toggleSection("info")}
              className="w-full flex items-center justify-between py-4 text-[14px] font-semibold text-white bg-transparent border-none"
            >
              Info Penting & Darurat
              <ChevronDown
                size={18}
                className={`transition-transform text-white/50 ${openSection === "info" ? "rotate-180" : ""}`}
              />
            </button>
            {openSection === "info" && (
              <div className="flex flex-col gap-4 pb-5 px-2">
                <div>
                  <p className="text-[13px] font-semibold text-white flex items-center gap-2 mb-1">
                    <Clock size={14} className="text-blue-300" /> Jam Layanan
                  </p>
                  <p className="text-[12px] text-white/70 pl-6">
                    Sen-Jum: 19:00-22:00
                    <br />
                    Sab-Min: 09:00-15:00
                  </p>
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-red-300 flex items-center gap-2 mb-1">
                    <AlertCircle size={14} /> Darurat
                  </p>
                  <p className="text-[12px] text-white/70 pl-6">
                    Keamanan: 0812-3456-7890
                    <br />
                    Polsek: 110
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Accordion 3: Hubungi Kami */}
          <div className="border-b border-white/10">
            <button
              onClick={() => toggleSection("kontak")}
              className="w-full flex items-center justify-between py-4 text-[14px] font-semibold text-white bg-transparent border-none"
            >
              Kontak Sekretariat
              <ChevronDown
                size={18}
                className={`transition-transform text-white/50 ${openSection === "kontak" ? "rotate-180" : ""}`}
              />
            </button>
            {openSection === "kontak" && (
              <ul className="flex flex-col gap-3 pb-5 px-2 list-none m-0">
                <li className="flex items-start gap-3">
                  <MapPin size={16} className="text-blue-300 mt-0.5" />
                  <span className="text-[12px] text-white/70">
                    Gedung Serbaguna RW 12
                    <br />
                    Kutabumi, Tangerang
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={16} className="text-blue-300" />
                  <span className="text-[12px] text-white/70">
                    +62 811-2222-3333
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={16} className="text-blue-300" />
                  <span className="text-[12px] text-white/70">
                    admin@rw12.id
                  </span>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* ========================================= */}
      {/* 3. BOTTOM BAR (Tampil di Web & Mobile)    */}
      {/* ========================================= */}
      <div className="max-w-6xl mx-auto px-5 md:px-6">
        <div className="py-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[12px] md:text-[12.5px] text-white/50 text-center md:text-left">
            &copy; {currentYear} Sistem Informasi RW 12 Kutabumi.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <Link
              href="/privasi"
              className="text-[12px] md:text-[12.5px] text-white/50 hover:text-white transition-colors no-underline"
            >
              Privasi
            </Link>
            <span className="w-1 h-1 bg-white/20 rounded-full"></span>
            <Link
              href="/syarat"
              className="text-[12px] md:text-[12.5px] text-white/50 hover:text-white transition-colors no-underline"
            >
              Syarat
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
