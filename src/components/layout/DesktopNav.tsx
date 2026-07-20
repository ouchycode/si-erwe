"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ChevronDown, Phone } from "lucide-react";
import { NAV_ITEMS } from "@/lib/navigation";

export default function DesktopNav() {
  const pathname = usePathname();

  return (
    <div className="hidden md:block bg-brand-primary text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center h-11">
        <Link
          href="/"
          className={`flex items-center gap-2 h-full px-5 text-xs font-semibold border-r border-white/10 no-underline ${
            pathname === "/" ? "bg-white/20" : ""
          }`}
        >
          <Home size={16} />
          Beranda
        </Link>

        {NAV_ITEMS.map((item) => {
          const isActive = item.children.some((child) =>
            pathname?.startsWith(child.href)
          );
          return (
            <div
              key={item.label}
              className="relative group h-full flex items-center border-r border-white/10"
            >
              <button
                className={`flex items-center gap-2 h-full px-5 text-xs font-semibold bg-transparent border-none text-white cursor-pointer ${
                  isActive ? "bg-white/20" : ""
                }`}
              >
                <item.icon size={16} />
                {item.label}
                <ChevronDown size={14} className="ml-1" />
              </button>

              <div className="absolute left-0 top-full w-64 bg-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-150 z-50 flex flex-col border-t-4 border-brand-primary shadow-lg rounded-b-sm">
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className={`group px-4 py-3 border-b border-gray-100 flex items-start gap-3 no-underline transition-colors ${
                      pathname === child.href
                        ? "text-brand-primary bg-slate-50"
                        : "text-gray-700"
                    }`}
                  >
                    <child.icon size={16} className="mt-0.5 shrink-0 text-gray-400 transition-colors group-hover:text-brand-primary" />
                    <span className="flex flex-col gap-0.5">
                      <span className="text-[13px] font-semibold leading-tight">{child.label}</span>
                      <span className={`text-[11px] font-normal leading-snug ${
                        pathname === child.href ? "text-brand-primary/75" : "text-gray-500"
                      }`}>{child.description}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}

        <Link
          href="/hubungi-kami"
          className={`flex items-center gap-2 h-full px-5 text-xs font-semibold border-r border-white/10 no-underline ${
            pathname === "/hubungi-kami" ? "bg-white/20" : ""
          }`}
        >
          <Phone size={16} />
          Hubungi Kami
        </Link>
      </div>
    </div>
  );
}
