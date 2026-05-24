"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ChevronRight, Globe, Mail, Phone, ExternalLink } from "lucide-react";

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
      const formatted = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, " ");
      breadcrumbs.push({ label: formatted, href: currentPath });
    });
    
    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 font-sans mt-auto">
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-12">
        {/* Breadcrumb Area */}
        <div className="flex items-center gap-2 mb-10 pb-6 border-b border-gray-200">
          {breadcrumbs.map((crumb, index) => (
            <div key={crumb.href} className="flex items-center gap-2">
              {index === 0 ? (
                <Link href="/" className="text-gray-400 hover:text-brand-primary transition-colors">
                  <Home size={14} />
                </Link>
              ) : (
                <Link
                  href={crumb.href}
                  className={`text-xs font-medium transition-colors hover:text-brand-primary ${
                    index === breadcrumbs.length - 1 ? "text-gray-900" : "text-gray-500"
                  }`}
                >
                  {crumb.label}
                </Link>
              )}
              {index < breadcrumbs.length - 1 && (
                <ChevronRight size={12} className="text-gray-300" />
              )}
            </div>
          ))}
        </div>

        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
          {/* Col 1 */}
          <div className="flex flex-col gap-4 lg:col-span-1">
            <h4 className="text-sm font-bold text-gray-900">Sekretariat RW 12</h4>
            <div className="flex flex-col gap-1 text-xs text-gray-500 leading-relaxed">
              <p>Gedung Serbaguna RW 12</p>
              <p>Jl. Kutabumi Raya No.1A</p>
              <p>Kutabumi, Kec. Pasar Kemis</p>
              <p>Kab. Tangerang 15560</p>
            </div>
            {/* Social Icons */}
            <div className="flex items-center gap-2 mt-2">
              {[
                { icon: Globe, href: "#" },
                { icon: Mail, href: "mailto:admin@rw12.id" },
                { icon: Phone, href: "tel:081122223333" },
                { icon: ExternalLink, href: "#" },
              ].map((social, idx) => {
                const Icon = social.icon;
                return (
                  <a
                    key={idx}
                    href={social.href}
                    className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 text-gray-500 hover:text-brand-primary hover:border-brand-primary hover:bg-blue-50 transition-all bg-white"
                  >
                    <Icon size={12} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Col 2 */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold text-gray-900">Tentang Kami</h4>
            <div className="flex flex-col gap-3">
              <Link href="/tentang-kami/profil" className="text-xs text-gray-500 hover:text-brand-primary transition-colors w-fit">Profil</Link>
              <Link href="/tentang-kami/struktur-rw" className="text-xs text-gray-500 hover:text-brand-primary transition-colors w-fit">Struktur RW</Link>
              <Link href="/tentang-kami/pengurus-rt" className="text-xs text-gray-500 hover:text-brand-primary transition-colors w-fit">Pengurus RT</Link>
              <Link href="/tentang-kami/peta-wilayah" className="text-xs text-gray-500 hover:text-brand-primary transition-colors w-fit">Peta Wilayah</Link>
            </div>
          </div>

          {/* Col 3 */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold text-gray-900">Layanan</h4>
            <div className="flex flex-col gap-3">
              <Link href="/layanan/administrasi-kependudukan" className="text-xs text-gray-500 hover:text-brand-primary transition-colors w-fit">Administrasi Kependudukan</Link>
              <Link href="/layanan/e-surat" className="text-xs text-gray-500 hover:text-brand-primary transition-colors w-fit">E-Surat Pengantar</Link>
              <Link href="/layanan/lapor-warga" className="text-xs text-gray-500 hover:text-brand-primary transition-colors w-fit">Lapor Warga</Link>
              <Link href="/layanan/iuran-warga" className="text-xs text-gray-500 hover:text-brand-primary transition-colors w-fit">Pembayaran Iuran</Link>
              <Link href="/layanan/keamanan-wilayah" className="text-xs text-gray-500 hover:text-brand-primary transition-colors w-fit">Keamanan Wilayah</Link>
              <Link href="/layanan/kebersihan-lingkungan" className="text-xs text-gray-500 hover:text-brand-primary transition-colors w-fit">Kebersihan Lingkungan</Link>
            </div>
          </div>

          {/* Col 4 */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold text-gray-900">Informasi</h4>
            <div className="flex flex-col gap-3">
              <Link href="/informasi/berita" className="text-xs text-gray-500 hover:text-brand-primary transition-colors w-fit">Berita</Link>
              <Link href="/informasi/statistik" className="text-xs text-gray-500 hover:text-brand-primary transition-colors w-fit">Statistik</Link>
              <Link href="/informasi/rukem" className="text-xs text-gray-500 hover:text-brand-primary transition-colors w-fit">Rukun Kematian</Link>
              <Link href="/informasi/galeri" className="text-xs text-gray-500 hover:text-brand-primary transition-colors w-fit">Galeri Kegiatan</Link>
            </div>
          </div>

          {/* Col 5 */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold text-gray-900">Lainnya</h4>
            <div className="flex flex-col gap-3">
              <Link href="/hubungi-kami" className="text-xs text-gray-500 hover:text-brand-primary transition-colors w-fit">Hubungi Kami</Link>
              <Link href="#" className="text-xs text-gray-500 hover:text-brand-primary transition-colors w-fit">Kebijakan Privasi</Link>
              <Link href="#" className="text-xs text-gray-500 hover:text-brand-primary transition-colors w-fit">Kredit Situs</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-5">
          <p className="text-[10px] text-gray-400 text-center">
            &copy; {currentYear} Sekretariat RW 12 Kutabumi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
