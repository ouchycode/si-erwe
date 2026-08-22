import { WhatsAppIcon } from "@/components/ui/brand-icons";
import { KONTAK } from "@/lib/constants";

const WA_MESSAGE = encodeURIComponent(
  "Halo Admin Sekretariat RW 004, saya ingin bertanya."
);

export default function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${KONTAK.waTelp}?text=${WA_MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat WhatsApp"
      className="group fixed bottom-6 right-4 z-[70] flex size-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-[0_4px_14px_rgba(0,0,0,0.28)] transition-transform duration-150 hover:scale-110 md:right-6"
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25d366] opacity-50 [animation-duration:2s]" />
      <WhatsAppIcon className="size-8" />
      <span className="pointer-events-none absolute right-[66px] whitespace-nowrap rounded-md bg-[#2c2c2c] px-2.5 py-1.5 text-xs text-white opacity-0 shadow-md transition-opacity duration-150 group-hover:opacity-100">
        Chat Admin
      </span>
    </a>
  );
}
