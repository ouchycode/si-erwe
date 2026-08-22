"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Kembali ke atas"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-24 right-4 z-[70] flex size-11 cursor-pointer items-center justify-center rounded-full border-none bg-wd-maroon-dark text-white shadow-[0_3px_10px_rgba(0,0,0,0.22)] transition-all duration-250 hover:bg-brand-primary md:right-6 ${
        show
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-2.5 opacity-0"
      }`}
    >
      <ArrowUp size={22} />
    </button>
  );
}
