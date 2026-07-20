"use client";

import Link from "next/link";
import { Building2, Menu, X } from "lucide-react";

export default function TopBar({
  isOpen,
  onToggle,
}: {
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="bg-white px-4 md:px-8 py-3 md:py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 md:gap-4 no-underline">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-brand-primary rounded-xs flex items-center justify-center shrink-0">
            <Building2 className="text-white w-5 h-5 md:w-6 md:h-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm md:text-base font-bold text-brand-primary leading-tight">DARMA BAKTI RW 04</span>
            <span className="text-[10px] md:text-xs text-gray-500 font-medium uppercase tracking-widest mt-0.5">Kota Tangerang</span>
          </div>
        </Link>

        <button
          className="md:hidden p-2 text-gray-500 hover:text-brand-primary transition-colors cursor-pointer border-none bg-transparent"
          onClick={onToggle}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </div>
  );
}
