"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Home, Phone, Search } from "lucide-react";
import { NAV_ITEMS } from "@/lib/navigation";

export default function MobileMenu({
  isOpen,
  openGroup,
  onToggleGroup,
  onClose,
}: {
  isOpen: boolean;
  openGroup: string | null;
  onToggleGroup: (label: string) => void;
  onClose: () => void;
}) {
  const pathname = usePathname();
  if (!isOpen) return null;

  const linkClass = (active: boolean) =>
    `wd-heading flex items-center gap-3 border-b border-white/10 px-[18px] py-3 text-sm font-medium tracking-[0.5px] text-white no-underline transition-colors ${
      active ? "bg-wd-maroon-darker" : "hover:bg-wd-maroon-deep"
    }`;

  return (
    <div className="border-t border-white/15 bg-wd-maroon-dark text-white md:hidden">
      <form
        action="/informasi/berita"
        method="GET"
        role="search"
        className="mx-[18px] mt-3 flex items-center overflow-hidden rounded-full border border-white/25 bg-wd-maroon-darker"
      >
        <input
          type="search"
          name="q"
          placeholder="Cari berita…"
          minLength={2}
          aria-label="Cari berita"
          className="w-full border-none bg-transparent px-4 py-2 font-sans text-[13px] text-white outline-none placeholder:text-white/50"
        />
        <button
          type="submit"
          aria-label="Cari"
          className="flex size-9 shrink-0 cursor-pointer items-center justify-center border-none bg-transparent text-white"
        >
          <Search size={16} />
        </button>
      </form>

      <div className="flex flex-col pt-2">
        <Link href="/" className={linkClass(pathname === "/")} onClick={onClose}>
          <Home size={16} />
          Beranda
        </Link>

        {NAV_ITEMS.map((item) => {
          const groupActive = item.children.some((child) =>
            pathname?.startsWith(child.href)
          );
          return (
            <div key={item.label} className="flex flex-col border-b border-white/10">
              <button
                className={`wd-heading flex w-full cursor-pointer items-center justify-between border-none bg-transparent px-[18px] py-3 text-left text-sm font-medium tracking-[0.5px] text-white ${
                  openGroup === item.label ? "bg-wd-maroon-deep" : ""
                }`}
                onClick={() => onToggleGroup(item.label)}
              >
                <span>{item.label}</span>
                <ChevronDown
                  size={15}
                  className={`transition-transform ${openGroup === item.label ? "rotate-180" : ""}`}
                />
              </button>

              {openGroup === item.label && (
                <div className="flex flex-col bg-wd-maroon-darker">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={onClose}
                      className={`wd-heading flex items-center gap-2 border-b border-white/5 py-2.5 pl-9 pr-4 text-[13px] no-underline last:border-0 ${
                        pathname === child.href || groupActive
                          ? "text-white"
                          : "text-white/75 hover:text-white"
                      }`}
                    >
                      <child.icon size={14} className="shrink-0" />
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        <Link
          href="/hubungi-kami"
          className={linkClass(pathname === "/hubungi-kami")}
          onClick={onClose}
        >
          <Phone size={16} />
          Hubungi Kami
        </Link>
      </div>
    </div>
  );
}
