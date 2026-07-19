"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  ChevronRight,
  Mail,
  Camera,
  MessageSquare,
  Link as LinkIcon,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();

  // Basic breadcrumb logic
  const getBreadcrumbs = () => {
    if (!pathname || pathname === "/") return [{ label: "Beranda", href: "/" }];

    const paths = pathname.split("/").filter(Boolean);
    const breadcrumbs = [{ label: "Beranda", href: "/" }];

    let currentPath = "";
    paths.forEach((path) => {
      currentPath += `/${path}`;
      // Capitalize first letter and format
      const formatted =
        path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, " ");
      breadcrumbs.push({ label: formatted, href: currentPath });
    });

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <footer className="bg-slate-50 border-t border-slate-100 font-sans mt-auto">
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-12">
        {/* Breadcrumb Area */}
        <div className="flex items-center gap-2 mb-8 pb-5 border-b border-slate-100">
          {breadcrumbs.map((crumb, index) => {
            const isFirst = index === 0;
            const isLast = index === breadcrumbs.length - 1;

            return (
              <div key={crumb.href} className="flex items-center gap-2">
                {isFirst ? (
                  <Link href="/" className="text-gray-400">
                    <Home size={14} />
                  </Link>
                ) : isLast ? (
                  <span className="text-[13px] font-medium text-slate-800">
                    {crumb.label}
                  </span>
                ) : (
                  <span className="text-[13px] font-medium text-gray-400">
                    {crumb.label}
                  </span>
                )}
                {!isLast && (
                  <ChevronRight size={12} className="text-gray-300" />
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile Simplified Footer */}
        <div className="flex md:hidden flex-col items-center text-center gap-4 pb-4">
          <h4 className="text-base font-bold text-slate-800">
            Sekretariat RW 04
          </h4>
          <div className="text-sm text-gray-500 leading-relaxed">
            <p>Jl. Pabuaran Raya No.1A</p>
            <p>Pabuaran, Kec. Karawaci</p>
            <p>Kota Tangerang 15114</p>
          </div>
          <div className="flex items-center justify-center gap-3 mt-2">
            <a
              href="mailto:info@rw04pabuaran.id"
              className="w-10 h-10 rounded-sm border border-slate-200 flex items-center justify-center text-gray-500 hover:text-brand-primary hover:border-brand-primary hover:bg-red-50 transition-colors"
            >
              <Mail size={18} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-sm border border-slate-200 flex items-center justify-center text-gray-500 hover:text-brand-primary hover:border-brand-primary hover:bg-red-50 transition-colors"
            >
              <Camera size={18} />
            </a>
            <a
              href="https://wa.me/6281200000000"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-sm border border-slate-200 flex items-center justify-center text-gray-500 hover:text-brand-primary hover:border-brand-primary hover:bg-red-50 transition-colors"
            >
              <MessageSquare size={18} />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-sm border border-slate-200 flex items-center justify-center text-gray-500 hover:text-brand-primary hover:border-brand-primary hover:bg-red-50 transition-colors"
            >
              <LinkIcon size={18} />
            </a>
          </div>
        </div>

        {/* Desktop Footer Content */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {/* Col 1 */}
          <div className="flex flex-col gap-4 lg:col-span-1">
            <h4 className="text-sm font-bold uppercase tracking-wide text-slate-800">
              Sekretariat RW 04
            </h4>
            <div className="flex flex-col gap-1 text-sm text-gray-500 leading-relaxed">
              <p>Gedung Serbaguna RW 04</p>
              <p>Jl. Pabuaran Raya No.1A</p>
              <p>Pabuaran, Kec. Karawaci</p>
              <p>Kota Tangerang 15114</p>
            </div>
            <div className="flex items-center gap-3 mt-1">
              <a
                href="mailto:info@rw04pabuaran.id"
                className="w-9 h-9 rounded-sm border border-slate-200 flex items-center justify-center text-gray-500 hover:text-brand-primary hover:border-brand-primary hover:bg-red-50 transition-colors"
              >
                <Mail size={16} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-sm border border-slate-200 flex items-center justify-center text-gray-500 hover:text-brand-primary hover:border-brand-primary hover:bg-red-50 transition-colors"
              >
                <Camera size={16} />
              </a>
              <a
                href="https://wa.me/6281200000000"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-sm border border-slate-200 flex items-center justify-center text-gray-500 hover:text-brand-primary hover:border-brand-primary hover:bg-red-50 transition-colors"
              >
                <MessageSquare size={16} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-sm border border-slate-200 flex items-center justify-center text-gray-500 hover:text-brand-primary hover:border-brand-primary hover:bg-red-50 transition-colors"
              >
                <LinkIcon size={16} />
              </a>
            </div>
          </div>

          {/* Col 2 */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold uppercase tracking-wide text-slate-800">
              Tentang Kami
            </h4>
            <div className="flex flex-col gap-3">
              <Link
                href="/tentang-kami/profil"
                className="text-sm text-gray-500 w-fit hover:text-brand-primary transition-colors"
              >
                Profil
              </Link>
              <Link
                href="/tentang-kami/struktur-rw"
                className="text-sm text-gray-500 w-fit hover:text-brand-primary transition-colors"
              >
                Struktur RW
              </Link>
              <Link
                href="/tentang-kami/pengurus-rt"
                className="text-sm text-gray-500 w-fit hover:text-brand-primary transition-colors"
              >
                Pengurus RT
              </Link>
              <Link
                href="/tentang-kami/peta-wilayah"
                className="text-sm text-gray-500 w-fit hover:text-brand-primary transition-colors"
              >
                Peta Wilayah
              </Link>
            </div>
          </div>

          {/* Col 3 */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold uppercase tracking-wide text-slate-800">
              Layanan
            </h4>
            <div className="flex flex-col gap-3">
              <Link
                href="/layanan/administrasi-kependudukan"
                className="text-sm text-gray-500 w-fit hover:text-brand-primary transition-colors"
              >
                Administrasi Kependudukan
              </Link>
              <Link
                href="/layanan/keamanan-wilayah"
                className="text-sm text-gray-500 w-fit hover:text-brand-primary transition-colors"
              >
                Keamanan Wilayah
              </Link>
              <Link
                href="/layanan/kebersihan-lingkungan"
                className="text-sm text-gray-500 w-fit hover:text-brand-primary transition-colors"
              >
                Kebersihan Lingkungan
              </Link>
              <Link
                href="/layanan/posyandu"
                className="text-sm text-gray-500 w-fit hover:text-brand-primary transition-colors"
              >
                Layanan Posyandu
              </Link>
            </div>
          </div>

          {/* Col 4 */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold uppercase tracking-wide text-slate-800">
              Informasi
            </h4>
            <div className="flex flex-col gap-3">
              <Link
                href="/informasi/berita"
                className="text-sm text-gray-500 w-fit hover:text-brand-primary transition-colors"
              >
                Berita
              </Link>
              <Link
                href="/informasi/statistik"
                className="text-sm text-gray-500 w-fit hover:text-brand-primary transition-colors"
              >
                Statistik
              </Link>
              <Link
                href="/informasi/program-warga"
                className="text-sm text-gray-500 w-fit hover:text-brand-primary transition-colors"
              >
                Program Warga
              </Link>
              <Link
                href="/informasi/galeri"
                className="text-sm text-gray-500 w-fit hover:text-brand-primary transition-colors"
              >
                Galeri Kegiatan
              </Link>
            </div>
          </div>

          {/* Col 5 intentionally removed to keep the footer compact */}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-5">
          <div className="flex flex-col items-center justify-center gap-1.5 text-xs text-gray-400 text-center">
            <p>&copy; 2026 Sekretariat RW 04 Pabuaran.</p>
            <p>Developed by KKN UYM Threeverse Bytewizard Team 2026.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
