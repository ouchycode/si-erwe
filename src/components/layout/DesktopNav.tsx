"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Home, Phone, Search } from "lucide-react";
import { useState } from "react";
import { NAV_ITEMS } from "@/lib/navigation";
import ThemeToggle from "./ThemeToggle";

export default function DesktopNav({
  isMobileMenuOpen,
  onToggleMenu,
}: {
  isMobileMenuOpen: boolean;
  onToggleMenu: () => void;
}) {
  const pathname = usePathname();
  const [query, setQuery] = useState("");

  const linkBase =
    "wd-heading flex h-full items-center gap-2 px-4 text-[13px] font-medium tracking-[0.5px] text-white no-underline transition-colors lg:px-[18px] lg:text-sm";

  return (
    <div className="bg-brand-primary shadow-[0_2px_8px_rgba(0,0,0,0.18)]">
      <div className="wd-container">
        <div className="flex items-stretch justify-between gap-3">
          {/* Menu desktop */}
          <ul className="hidden flex-wrap items-stretch md:flex">
            <li className="flex items-stretch">
              <Link
                href="/"
                className={`${linkBase} ${pathname === "/" ? "bg-brand-primary-hover" : "hover:bg-brand-primary-hover"}`}
              >
                <Home size={15} />
                Beranda
              </Link>
            </li>
            {NAV_ITEMS.map((item) => {
              const isActive = item.children.some((child) =>
                pathname?.startsWith(child.href)
              );
              return (
                <li key={item.label} className="group relative flex items-stretch">
                  <button
                    className={`${linkBase} cursor-pointer border-none bg-transparent ${
                      isActive ? "bg-brand-primary-hover" : ""
                    }`}
                  >
                    {item.label}
                    <ChevronDown size={14} />
                  </button>

                  <div className="invisible absolute left-0 top-full z-50 w-72 translate-y-1 flex-col rounded-b-sm border-t-[3px] border-wd-maroon-dark bg-wd-maroon-dark opacity-0 shadow-xl transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-hover:flex">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`flex items-start gap-3 border-b border-white/5 px-4 py-3 no-underline transition-colors last:border-0 hover:bg-wd-maroon-deep ${
                          pathname === child.href ? "text-white bg-wd-maroon-deep" : "text-white/85"
                        }`}
                      >
                        <child.icon size={16} className="mt-0.5 shrink-0 text-white/60" />
                        <span>
                          <span className="block text-[13px] font-semibold leading-tight">
                            {child.label}
                          </span>
                          <span className="mt-0.5 block text-[11px] leading-snug text-white/55">
                            {child.description}
                          </span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </li>
              );
            })}
            <li className="flex items-stretch">
              <Link
                href="/hubungi-kami"
                className={`${linkBase} ${pathname === "/hubungi-kami" ? "bg-brand-primary-hover" : "hover:bg-brand-primary-hover"}`}
              >
                <Phone size={15} />
                Hubungi Kami
              </Link>
            </li>
          </ul>

          <div className="flex items-center gap-2 py-1.5">
            {/* Pencarian */}
            <form
              action="/informasi/berita"
              method="GET"
              role="search"
              className="hidden overflow-hidden rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.15)] md:flex"
            >
              <input
                type="search"
                name="q"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari berita…"
                minLength={2}
                aria-label="Cari berita"
                className="w-44 border-none bg-transparent px-3 py-[7px] font-sans text-[13px] text-gray-800 outline-none lg:w-[190px]"
              />
              <button
                type="submit"
                aria-label="Cari"
                className="flex w-[34px] shrink-0 cursor-pointer items-center justify-center border-none bg-wd-maroon-dark text-white transition-colors hover:bg-wd-maroon-darker"
              >
                <Search size={16} />
              </button>
            </form>

            <ThemeToggle variant="navbar" />

            {/* Hamburger mobile */}
            <button
              type="button"
              onClick={onToggleMenu}
              aria-label={isMobileMenuOpen ? "Tutup menu" : "Buka menu"}
              aria-expanded={isMobileMenuOpen}
              className="cursor-pointer border-none bg-transparent p-2 text-xl leading-none text-white transition-colors hover:bg-white/15 md:hidden"
            >
              {isMobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
