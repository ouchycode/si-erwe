"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { NAV_ITEMS, SOCIAL_LINKS } from "@/lib/navigation";
import { ALAMAT } from "@/lib/constants";
import { getSettingsClient } from "@/lib/settings";
import type { SekretariatAlamat } from "@/lib/types";

const FOOTER_COLUMNS = [
  { header: "Tentang Kami", items: NAV_ITEMS[0].children },
  { header: "Layanan", items: NAV_ITEMS[1].children },
  { header: "Informasi", items: NAV_ITEMS[2].children },
];

export default function Footer() {
  const pathname = usePathname();
  const [alamat, setAlamat] = useState<SekretariatAlamat>(ALAMAT);

  useEffect(() => {
    getSettingsClient()
      .then((groups) => {
        const s = groups.alamat?.sekretariat as SekretariatAlamat | undefined;
        if (s) {
          setAlamat({ ...ALAMAT, ...s });
        }
      })
      .catch(() => {});
  }, []);

  const getBreadcrumbs = () => {
    if (!pathname || pathname === "/") return [{ label: "Beranda", href: "/" }];

    const paths = pathname.split("/").filter(Boolean);
    const breadcrumbs = [{ label: "Beranda", href: "/" }];

    let currentPath = "";
    paths.forEach((path) => {
      currentPath += `/${path}`;
      const formatted = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, " ");
      breadcrumbs.push({ label: formatted, href: currentPath });
    });

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <footer className="bg-slate-50 border-t border-slate-100 font-sans mt-auto">
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-12">
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
                  <span className="text-[13px] font-medium text-slate-800">{crumb.label}</span>
                ) : (
                  <span className="text-[13px] font-medium text-gray-400">{crumb.label}</span>
                )}
                {!isLast && <ChevronRight size={12} className="text-gray-300" />}
              </div>
            );
          })}
        </div>

        <div className="flex md:hidden flex-col items-center text-center gap-4 pb-4">
          <h4 className="text-base font-bold text-slate-800">Sekretariat RW 04</h4>
          <div className="text-sm text-gray-500 leading-relaxed">
            <p>{alamat.jalan}</p>
            <p>{alamat.kelurahan}, {alamat.kecamatan}</p>
            <p>{alamat.kota} {alamat.kodePos}</p>
          </div>
          <div className="flex items-center justify-center gap-3 mt-2">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-sm border border-slate-200 flex items-center justify-center text-gray-500 hover:text-brand-primary hover:border-brand-primary hover:bg-red-50 transition-colors"
              >
                <link.icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          <div className="flex flex-col gap-4 lg:col-span-1">
            <h4 className="text-sm font-bold uppercase tracking-wide text-slate-800">Sekretariat RW 04</h4>
            <div className="flex flex-col gap-1 text-sm text-gray-500 leading-relaxed">
              <p>{alamat.tempat}</p>
              <p>{alamat.jalan}</p>
              <p>{alamat.kelurahan}, {alamat.kecamatan}</p>
              <p>{alamat.kota} {alamat.kodePos}</p>
            </div>
            <div className="flex items-center gap-3 mt-1">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-sm border border-slate-200 flex items-center justify-center text-gray-500 hover:text-brand-primary hover:border-brand-primary hover:bg-red-50 transition-colors"
                >
                  <link.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <div key={col.header} className="flex flex-col gap-4">
              <h4 className="text-sm font-bold uppercase tracking-wide text-slate-800">{col.header}</h4>
              <div className="flex flex-col gap-3">
                {col.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm text-gray-500 w-fit hover:text-brand-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

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
