"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Building2,
  ChevronDown,
  Menu,
  X,
  MapPin,
  Calendar,
  User,
  LayoutGrid,
  Users,
  FileText,
  Shield,
  Home,
  Newspaper,
  BarChart2,
  Heart,
  Phone,
} from "lucide-react";

const NAV_ITEMS = [
  {
    label: "Tentang Kami",
    children: [
      {
        label: "Profil RW",
        href: "/tentang-kami/profil",
        icon: User,
        sub: "Sejarah & visi misi RW 12",
      },
      {
        label: "Struktur RW",
        href: "/tentang-kami/struktur-rw",
        icon: LayoutGrid,
        sub: "Susunan pengurus RW periode ini",
      },
      {
        label: "Pengurus RT",
        href: "/tentang-kami/pengurus-rt",
        icon: Users,
        sub: "Daftar ketua & pengurus tiap RT",
      },
    ],
  },
  {
    label: "Layanan",
    children: [
      {
        label: "Administrasi Kependudukan",
        href: "/layanan/administrasi-kependudukan",
        icon: FileText,
        sub: "KTP, KK, surat domisili & pengantar",
      },
      {
        label: "Keamanan Wilayah",
        href: "/layanan/keamanan-wilayah",
        icon: Shield,
        sub: "Jadwal siskamling & lapor gangguan",
      },
      {
        label: "Kebersihan Lingkungan",
        href: "/layanan/kebersihan-lingkungan",
        icon: Home,
        sub: "Jadwal sampah & kerja bakti",
      },
    ],
  },
  {
    label: "Informasi",
    children: [
      {
        label: "Berita Terkini",
        href: "/informasi/berita",
        icon: Newspaper,
        sub: "Pengumuman & info kegiatan terbaru",
      },
      {
        label: "Statistik Warga",
        href: "/informasi/statistik",
        icon: BarChart2,
        sub: "Data demografi & grafik kependudukan",
      },
      {
        label: "Rukun Kematian",
        href: "/informasi/rukem",
        icon: Heart,
        sub: "Info layanan & keanggotaan RUKEM",
      },
    ],
  },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);

  const toggleMobileGroup = (label: string) => {
    setOpenMobileGroup((prev) => (prev === label ? null : label));
  };

  const today = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <nav className="bg-white sticky top-0 z-50 border-b border-gray-200 shadow-sm font-sans">
      {/* TOP BAR */}
      <div className="bg-brand-primary text-white/80 text-xs px-6 py-1.5 flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <MapPin size={11} className="opacity-70" />
          Kel. Kutabumi, Kec. Pasar Kemis, Kab. Tangerang
        </span>
        <span className="hidden sm:flex items-center gap-1.5">
          <Calendar size={11} className="opacity-70" />
          {today}
        </span>
      </div>

      {/* MAIN BAR */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 no-underline">
          <div className="w-10 h-10 bg-brand-primary rounded-xs flex items-center justify-center shrink-0">
            <Building2 size={20} className="text-white" />
          </div>
          <div className="w-px h-8 bg-gray-200 mx-1" />
          <div>
            <p className="text-sm font-extrabold text-brand-primary leading-tight">
              RW 12 Kutabumi
            </p>
            <p className="text-[10px] text-gray-400 font-medium tracking-widest uppercase">
              Kutabumi · Tangerang
            </p>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center h-16 gap-0.5">
          <Link
            href="/"
            className="flex items-center h-16 px-4 text-[13px] font-semibold text-gray-600 hover:text-brand-primary relative group no-underline transition-colors"
          >
            Beranda
            <span className="absolute bottom-0 left-4 right-4 h-[2.5px] bg-brand-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
          </Link>

          {NAV_ITEMS.map((item) => (
            <div
              key={item.label}
              className="relative group h-16 flex items-center"
            >
              <button className="flex items-center gap-1 h-16 px-4 text-[13px] font-semibold text-gray-600 hover:text-brand-primary relative transition-colors cursor-pointer border-none bg-transparent">
                {item.label}
                <ChevronDown
                  size={14}
                  className="transition-transform group-hover:rotate-180"
                />
                <span className="absolute bottom-0 left-4 right-4 h-[2.5px] bg-brand-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </button>

              {/* Dropdown */}
              <div className="absolute left-0 top-full w-72 bg-white border border-gray-200 border-t-[3px] border-t-brand-primary shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-1 group-hover:translate-y-0 transition-all duration-150 z-50 py-1.5">
                {item.children.map((child) => {
                  const Icon = child.icon;
                  return (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="flex items-start gap-3 px-4 py-3 hover:bg-blue-50 border-b border-gray-100 last:border-b-0 no-underline group/item transition-colors"
                    >
                      <div className="w-8 h-8 bg-blue-50 rounded-xs border border-blue-100 flex items-center justify-center shrink-0 group-hover/item:bg-brand-primary group-hover/item:border-brand-primary transition-colors">
                        <Icon size={15} className="text-brand-primary group-hover/item:text-white transition-colors" />
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold text-gray-800 group-hover/item:text-brand-primary transition-colors leading-tight">
                          {child.label}
                        </p>
                        <p className="text-[11.5px] text-gray-400 mt-0.5 leading-snug">
                          {child.sub}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}

          <Link
            href="/hubungi-kami"
            className="ml-3 flex items-center gap-2 bg-brand-primary hover:bg-brand-primary-hover text-white text-sm font-bold px-5 py-2 rounded-xs no-underline transition-all hover:-translate-y-px shadow-sm"
          >
            <Phone size={14} />
            Hubungi Kami
          </Link>
        </div>

        {/* MOBILE TOGGLE */}
        <button
          className="md:hidden p-2 text-gray-500 hover:text-brand-primary transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
            <Link
              href="/"
              className="flex items-center gap-2.5 py-3 px-3 rounded-xs text-sm font-semibold text-gray-700 hover:bg-blue-50 hover:text-brand-primary no-underline transition-colors border-b border-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Beranda
            </Link>

            {NAV_ITEMS.map((item) => (
              <div
                key={item.label}
                className="border-b border-gray-100 last:border-b-0"
              >
                <button
                  className="flex items-center justify-between w-full py-3 px-3 rounded-xs text-sm font-semibold text-gray-700 hover:bg-blue-50 hover:text-brand-primary transition-colors bg-transparent border-none cursor-pointer"
                  onClick={() => toggleMobileGroup(item.label)}
                >
                  {item.label}
                  <ChevronDown
                    size={15}
                    className={`transition-transform text-gray-400 ${openMobileGroup === item.label ? "rotate-180" : ""}`}
                  />
                </button>

                {openMobileGroup === item.label && (
                  <div className="flex flex-col gap-1 pb-2 pl-2">
                    {item.children.map((child) => {
                      const Icon = child.icon;
                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-blue-50 no-underline group/mi transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <div className="w-7 h-7 bg-blue-50 border border-blue-100 rounded-xs flex items-center justify-center shrink-0">
                            <Icon size={14} className="text-brand-primary" />
                          </div>
                          <div>
                            <p className="text-[13px] font-semibold text-gray-700 group-hover/mi:text-brand-primary leading-tight">
                              {child.label}
                            </p>
                            <p className="text-[11px] text-gray-400 leading-snug">
                              {child.sub}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}

            <Link
              href="/hubungi-kami"
              className="flex items-center justify-center gap-2 mt-2 bg-brand-primary text-white text-sm font-bold px-4 py-2.5 rounded-xs no-underline hover:bg-brand-primary-hover transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Phone size={14} />
              Hubungi Kami
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
