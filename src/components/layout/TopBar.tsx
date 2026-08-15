"use client";

import Link from "next/link";
import { Building2, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { resolveImageUrl } from "@/lib/api";
import { getSettingsClient } from "@/lib/settings";

const DEFAULT_NAMA = "DARMA BAKTI RW 04";
const DEFAULT_TAGLINE = "Kota Tangerang";

export default function TopBar({
  isOpen,
  onToggle,
  initialIdentitas,
}: {
  isOpen: boolean;
  onToggle: () => void;
  initialIdentitas?: {
    logo?: string;
    nama?: string;
    tagline?: string;
  };
}) {
  const [logo, setLogo] = useState<string | undefined>(() =>
    initialIdentitas?.logo ? resolveImageUrl(initialIdentitas.logo) : undefined
  );
  const [nama, setNama] = useState(initialIdentitas?.nama || DEFAULT_NAMA);
  const [tagline, setTagline] = useState(
    initialIdentitas?.tagline || DEFAULT_TAGLINE
  );

  useEffect(() => {
    getSettingsClient()
      .then((groups) => {
        const ident = groups.identitas;
        setNama((ident?.nama as string) || DEFAULT_NAMA);
        setTagline((ident?.tagline as string) || DEFAULT_TAGLINE);
        setLogo(
          typeof ident?.logo === "string" ? resolveImageUrl(ident.logo) : undefined
        );
      })
      .catch(() => {});
  }, []);

  return (
    <div className="bg-card px-4 md:px-8 py-3 md:py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 md:gap-4 no-underline">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-brand-primary rounded-xs flex items-center justify-center shrink-0 overflow-hidden">
            {logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={logo}
                alt={nama}
                className="h-full w-full object-cover"
              />
            ) : (
              <Building2 className="text-white w-5 h-5 md:w-6 md:h-6" />
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-sm md:text-base font-bold text-brand-primary leading-tight">
              {nama}
            </span>
            <span className="text-[10px] md:text-xs text-gray-500 font-medium uppercase tracking-widest mt-0.5">
              {tagline}
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            className="md:hidden p-2 text-gray-500 hover:text-brand-primary transition-colors cursor-pointer border-none bg-transparent"
            onClick={onToggle}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </div>
  );
}