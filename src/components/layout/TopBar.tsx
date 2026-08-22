import Link from "next/link";
import { Building2 } from "lucide-react";
import { resolveImageUrl } from "@/lib/api";

const DEFAULT_NAMA = "DARMA BAKTI RW 004";
const DEFAULT_TAGLINE = "Kel. Pabuaran · Kec. Karawaci · Kota Tangerang";

export default function TopBar({
  identitas,
  heroImage,
}: {
  identitas?: {
    logo?: string;
    nama?: string;
    tagline?: string;
  };
  heroImage?: string | null;
}) {
  const nama = identitas?.nama || DEFAULT_NAMA;
  const tagline = identitas?.tagline || DEFAULT_TAGLINE;
  const logo = identitas?.logo ? resolveImageUrl(identitas.logo) : undefined;

  return (
    <div className="relative flex min-h-[170px] items-center overflow-hidden bg-wd-maroon-dark md:min-h-[190px]">
      {heroImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={heroImage}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : null}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(30,7,11,0.94)_0%,rgba(74,20,29,0.82)_55%,rgba(74,20,29,0.55)_100%)]" />

      <div className="wd-container relative z-10 w-full">
        <Link href="/" className="flex items-center gap-4 py-7 text-white no-underline md:gap-[18px]">
          {logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={logo}
              alt={nama}
              className="h-16 w-auto shrink-0 rounded-xs bg-white/95 object-contain p-1 shadow-[0_2px_8px_rgba(0,0,0,0.25)] md:h-24"
            />
          ) : (
            <span className="flex size-16 shrink-0 items-center justify-center rounded-xs bg-white/95 text-wd-maroon-dark shadow-[0_2px_8px_rgba(0,0,0,0.25)] md:size-24">
              <Building2 className="size-8 md:size-10" />
            </span>
          )}
          <span>
            <span className="wd-heading block text-xl font-bold leading-tight tracking-[1px] md:text-[30px]">
              {nama}
            </span>
            <span className="wd-heading mt-1 block text-[11px] tracking-[2px] text-white/85 md:text-[13px] md:tracking-[3px]">
              {tagline}
            </span>
          </span>
        </Link>
      </div>
    </div>
  );
}
