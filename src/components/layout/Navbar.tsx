"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  Info,
  Map,
  Camera
} from "lucide-react";

const NAV_ITEMS = [
  {
    label: "Profil",
    icon: User,
    children: [
      {
        label: "Profil RW",
        href: "/tentang-kami/profil",
        icon: User,
      },
      {
        label: "Struktur RW",
        href: "/tentang-kami/struktur-rw",
        icon: LayoutGrid,
      },
      {
        label: "Pengurus RT",
        href: "/tentang-kami/pengurus-rt",
        icon: Users,
      },
      {
        label: "Peta Wilayah",
        href: "/tentang-kami/peta-wilayah",
        icon: Map,
      },
    ],
  },
  {
    label: "Layanan Publik",
    icon: FileText,
    children: [
      {
        label: "Administrasi Kependudukan",
        href: "/layanan/administrasi-kependudukan",
        icon: FileText,
      },
      {
        label: "Keamanan Wilayah",
        href: "/layanan/keamanan-wilayah",
        icon: Shield,
      },
      {
        label: "Kebersihan Lingkungan",
        href: "/layanan/kebersihan-lingkungan",
        icon: Home,
      },
    ],
  },
  {
    label: "Informasi Publik",
    icon: Info,
    children: [
      {
        label: "Berita Terkini",
        href: "/informasi/berita",
        icon: Newspaper,
      },
      {
        label: "Statistik Warga",
        href: "/informasi/statistik",
        icon: BarChart2,
      },
      {
        label: "Rukun Kematian",
        href: "/informasi/rukem",
        icon: Heart,
      },
      {
        label: "Galeri Kegiatan",
        href: "/informasi/galeri",
        icon: Camera,
      },
    ],
  },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);
  const pathname = usePathname();

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
    <nav className="sticky top-0 z-50 font-sans shadow-md flex flex-col w-full">
      {/* TOP BAR - WHITE */}
      <div className="bg-white px-4 md:px-8 py-3 md:py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 md:gap-4 no-underline">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-brand-primary rounded-xs flex items-center justify-center shrink-0">
              <Building2 className="text-white w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm md:text-lg font-extrabold text-brand-primary leading-tight">
                Sekretariat RW 12 Kutabumi
              </span>
              <span className="text-[10px] md:text-xs text-gray-500 font-medium uppercase tracking-widest mt-0.5">
                Pemerintah Kabupaten Tangerang
              </span>
            </div>
          </Link>

          {/* Right info (Desktop) */}
          <div className="hidden md:flex items-center gap-6 text-gray-500 text-xs font-semibold">
            <span className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-xs border border-gray-100">
              <MapPin size={14} className="text-brand-primary" /> 
              Kutabumi, Tangerang
            </span>
            <span className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-xs border border-gray-100">
              <Calendar size={14} className="text-brand-primary" /> 
              {today}
            </span>
          </div>

          {/* MOBILE TOGGLE */}
          <button
            className="md:hidden p-2 text-gray-500 hover:text-brand-primary transition-colors cursor-pointer border-none bg-transparent"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* BOTTOM BAR - DARK BLUE */}
      <div className="hidden md:block bg-brand-primary text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center h-12">
          {/* Beranda */}
          <Link 
            href="/" 
            className={`flex items-center gap-2 h-full px-5 text-[13px] font-semibold transition-colors border-r border-white/10 no-underline ${
              pathname === "/" ? "bg-white/20" : "hover:bg-white/10"
            }`}
          >
            <Home size={16} /> 
            Beranda
          </Link>

          {/* Dropdowns */}
          {NAV_ITEMS.map((item) => {
            const isActive = item.children.some(child => pathname?.startsWith(child.href));
            return (
              <div key={item.label} className="relative group h-full flex items-center border-r border-white/10">
                <button 
                  className={`flex items-center gap-2 h-full px-5 text-[13px] font-semibold transition-colors bg-transparent border-none text-white cursor-pointer ${
                    isActive ? "bg-white/20" : "hover:bg-white/10"
                  }`}
                >
                  <item.icon size={16} />
                  {item.label}
                  <ChevronDown size={14} className="group-hover:rotate-180 transition-transform ml-1" />
                </button>
                
                {/* Dropdown Menu */}
                <div className="absolute left-0 top-full w-64 bg-white shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50 flex flex-col border-t-4 border-brand-primary">
                  {item.children.map(child => (
                    <Link 
                      key={child.href} 
                      href={child.href} 
                      className={`px-4 py-3 hover:bg-blue-50 text-[13px] font-semibold border-b border-gray-100 flex items-center gap-3 no-underline transition-colors ${
                        pathname === child.href ? "text-brand-primary bg-blue-50/50" : "text-gray-700"
                      }`}
                    >
                      <child.icon size={16} className={pathname === child.href ? "text-brand-primary" : "text-gray-400"} />
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
          
          {/* Hubungi Kami */}
          <Link 
            href="/hubungi-kami" 
            className={`flex items-center gap-2 h-full px-5 text-[13px] font-semibold transition-colors border-r border-white/10 no-underline ${
              pathname === "/hubungi-kami" ? "bg-white/20" : "hover:bg-white/10"
            }`}
          >
            <Phone size={16} /> 
            Hubungi Kami
          </Link>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-brand-primary text-white border-t border-white/10 shadow-md">
          <div className="flex flex-col">
            <Link
              href="/"
              className={`flex items-center gap-3 py-3.5 px-6 text-sm font-semibold no-underline transition-colors border-b border-white/10 ${
                pathname === "/" ? "bg-white/20" : "hover:bg-white/10"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Home size={16} />
              Beranda
            </Link>

            {NAV_ITEMS.map((item) => (
              <div key={item.label} className="border-b border-white/10 flex flex-col">
                <button
                  className="flex items-center justify-between w-full py-3.5 px-6 text-sm font-semibold hover:bg-white/10 transition-colors bg-transparent border-none text-white cursor-pointer"
                  onClick={() => toggleMobileGroup(item.label)}
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={16} />
                    {item.label}
                  </div>
                  <ChevronDown
                    size={15}
                    className={`transition-transform text-white/50 ${openMobileGroup === item.label ? "rotate-180" : ""}`}
                  />
                </button>

                {openMobileGroup === item.label && (
                  <div className="flex flex-col bg-brand-primary-hover">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`flex items-center gap-3 px-6 py-3 pl-12 text-[13px] font-medium no-underline transition-colors border-b border-white/5 last:border-0 ${
                          pathname === child.href ? "text-white bg-white/10" : "text-white/70 hover:text-white hover:bg-white/5"
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <child.icon size={14} className={pathname === child.href ? "text-white" : "opacity-70"} />
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <Link
              href="/hubungi-kami"
              className={`flex items-center gap-3 py-3.5 px-6 text-sm font-semibold no-underline transition-colors ${
                pathname === "/hubungi-kami" ? "bg-white/20" : "hover:bg-white/10"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Phone size={16} />
              Hubungi Kami
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
