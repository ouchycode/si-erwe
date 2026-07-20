"use client";

import { useState } from "react";
import {
  Accessibility,
  Type,
  Contrast,
  Palette,
  Link as LinkIcon,
  BookOpen,
  PauseCircle,
  Volume2,
  RotateCcw,
  X,
  Eye,
  MousePointer2,
  Space,
  ImageOff,
  SquareMinus
} from "lucide-react";
import { useAccessibility } from "@/lib/useAccessibility";

export default function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const a11y = useAccessibility();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-[9998] transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {a11y.readingGuide && (
        <div
          className="fixed left-0 right-0 h-10 border-y-4 border-brand-primary bg-black/10 z-[9997] pointer-events-none transition-transform duration-75 ease-out"
          style={{ top: `${Math.max(0, a11y.mouseY - 20)}px` }}
        />
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed top-1/2 -translate-y-1/2 right-0 z-[9999] w-12 py-4 bg-brand-primary text-white rounded-l-md flex flex-col items-center justify-center gap-2 hover:bg-brand-primary-hover hover:w-14 transition-colors outline-none focus:ring-2 focus:ring-brand-light cursor-pointer border-none ${isOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}
        aria-label="Buka Menu Aksesibilitas"
      >
        <Accessibility size={24} />
        <span
          style={{ writingMode: "vertical-rl" }}
          className="text-[10px] font-bold tracking-widest uppercase"
        >
          Bantuan
        </span>
      </button>

      <div
        className={`fixed top-0 right-0 h-full w-[320px] bg-white border-l border-slate-200 z-[10000] font-sans flex flex-col transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="bg-brand-primary text-white px-5 py-4 flex items-center justify-between shrink-0">
          <h3 className="font-bold text-lg flex items-center gap-2 m-0 leading-none">
            <Accessibility size={20} />
            Aksesibilitas
          </h3>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white cursor-pointer bg-transparent border-none outline-none"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-5">
          <div className="flex justify-between items-center pb-2 border-b border-gray-100">
            <span className="text-sm font-semibold text-gray-600">Pengaturan</span>
            <button
              onClick={a11y.resetAll}
              className="text-brand-primary text-xs flex items-center gap-1 cursor-pointer bg-transparent border-none font-bold"
            >
              <RotateCcw size={12} /> Reset Semua
            </button>
          </div>

          <div className="flex items-center justify-between bg-slate-50 p-3 rounded-md border border-slate-100">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Type size={16} className="text-brand-primary" /> Ukuran Teks
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => a11y.set("zoomLevel", Math.max(80, a11y.zoomLevel - 10))}
                className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded cursor-pointer hover:bg-gray-100"
              >-</button>
              <span className="text-xs font-bold w-8 text-center">{a11y.zoomLevel}%</span>
              <button
                onClick={() => a11y.set("zoomLevel", Math.min(150, a11y.zoomLevel + 10))}
                className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded cursor-pointer hover:bg-gray-100"
              >+</button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <A11yButton active={a11y.highContrast} onClick={() => a11y.toggle("highContrast")} icon={<Contrast size={20} />} label="Kontras Tinggi" />
            <A11yButton active={a11y.grayscale} onClick={() => a11y.toggle("grayscale")} icon={<Palette size={20} />} label="Monokrom" />
            <A11yButton active={a11y.highlightLinks} onClick={() => a11y.toggle("highlightLinks")} icon={<LinkIcon size={20} />} label="Sorot Tautan" />
            <A11yButton active={a11y.colorBlind} onClick={() => a11y.toggle("colorBlind")} icon={<Eye size={20} />} label="Ramah Buta Warna" />
            <A11yButton active={a11y.dyslexiaFont} onClick={() => a11y.toggle("dyslexiaFont")} icon={<BookOpen size={20} />} label="Font Disleksia" />
            <A11yButton active={a11y.pauseAnimations} onClick={() => a11y.toggle("pauseAnimations")} icon={<PauseCircle size={20} />} label="Hentikan Animasi" />
            <A11yButton active={a11y.readText} onClick={() => a11y.toggle("readText")} icon={<Volume2 size={20} />} label="Baca Teks" />
            <A11yButton active={a11y.largeCursor} onClick={() => a11y.toggle("largeCursor")} icon={<MousePointer2 size={20} />} label="Kursor Besar" />
            <A11yButton active={a11y.readingGuide} onClick={() => a11y.toggle("readingGuide")} icon={<SquareMinus size={20} />} label="Panduan Baca" />
            <A11yButton active={a11y.textSpacing} onClick={() => a11y.toggle("textSpacing")} icon={<Space size={20} />} label="Jarak Teks" />
            <A11yButton active={a11y.hideImages} onClick={() => a11y.toggle("hideImages")} icon={<ImageOff size={20} />} label="Sembunyikan Gambar" />
          </div>

          {a11y.readText && (
            <div className="mt-auto bg-blue-50 p-4 rounded-md text-xs text-blue-800 text-center border border-blue-100 font-medium">
              Mode Baca Teks Aktif: Blok (sorot) teks di halaman untuk mendengarkannya dibacakan.
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function A11yButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-2 p-4 rounded-md border-2 transition-all cursor-pointer outline-none ${
        active
          ? "bg-brand-light border-brand-primary text-brand-primary shadow-sm"
          : "bg-white border-gray-100 text-gray-500 hover:border-gray-300 hover:bg-slate-50"
      }`}
    >
      <div className={active ? "text-brand-primary" : "text-gray-400"}>
        {icon}
      </div>
      <span className="text-[11px] font-bold text-center leading-tight">
        {label}
      </span>
    </button>
  );
}
