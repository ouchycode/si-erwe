"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Home, Phone } from "lucide-react";
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

  return (
    <div className="md:hidden bg-brand-primary text-white border-t border-white/10">
      <div className="flex flex-col">
        <Link
          href="/"
          className={`flex items-center gap-3 py-3.5 px-6 text-sm font-semibold no-underline border-b border-white/10 ${
            pathname === "/" ? "bg-white/20" : ""
          }`}
          onClick={onClose}
        >
          <Home size={16} />
          Beranda
        </Link>

        {NAV_ITEMS.map((item) => (
          <div key={item.label} className="border-b border-white/10 flex flex-col">
            <button
              className="flex items-center justify-between w-full py-3.5 px-6 text-sm font-semibold bg-transparent border-none text-white cursor-pointer"
              onClick={() => onToggleGroup(item.label)}
            >
              <div className="flex items-center gap-3">
                <item.icon size={16} />
                {item.label}
              </div>
              <ChevronDown size={15} className="text-white/50" />
            </button>

            {openGroup === item.label && (
              <div className="flex flex-col bg-brand-primary-hover">
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className={`flex items-start gap-3 px-6 py-3 pl-12 text-[13px] font-medium no-underline border-b border-white/5 last:border-0 ${
                      pathname === child.href ? "text-white bg-white/10" : "text-white/70"
                    }`}
                    onClick={onClose}
                  >
                    <child.icon size={14} className={`mt-0.5 shrink-0 ${
                      pathname === child.href ? "text-white" : "text-white/70"
                    }`} />
                    <span className="flex flex-col gap-0.5">
                      <span className="text-sm font-semibold leading-tight">{child.label}</span>
                      <span className="text-[11px] font-normal leading-snug text-white/60">{child.description}</span>
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}

        <Link
          href="/hubungi-kami"
          className={`flex items-center gap-3 py-3.5 px-6 text-sm font-semibold no-underline transition-colors ${
            pathname === "/hubungi-kami" ? "bg-white/20" : ""
          }`}
          onClick={onClose}
        >
          <Phone size={16} />
          Hubungi Kami
        </Link>
      </div>
    </div>
  );
}
