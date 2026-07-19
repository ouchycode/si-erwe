"use client";

import { useState, useEffect } from "react";
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
} from "lucide-react";

export default function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false);

  // States
  const [zoomLevel, setZoomLevel] = useState(100);
  const [highContrast, setHighContrast] = useState(false);
  const [grayscale, setGrayscale] = useState(false);
  const [highlightLinks, setHighlightLinks] = useState(false);
  const [dyslexiaFont, setDyslexiaFont] = useState(false);
  const [pauseAnimations, setPauseAnimations] = useState(false);
  const [readText, setReadText] = useState(false);

  // Apply Zoom
  useEffect(() => {
    document.documentElement.style.fontSize = `${zoomLevel}%`;
  }, [zoomLevel]);

  // Apply Grayscale & High Contrast
  useEffect(() => {
    let filter = "";
    if (grayscale) filter += "grayscale(100%) ";
    if (highContrast) filter += "contrast(150%) saturate(150%) ";
    document.documentElement.style.filter = filter.trim();
  }, [grayscale, highContrast]);

  // Apply Highlight Links
  useEffect(() => {
    if (highlightLinks) {
      document.body.classList.add("a11y-highlight-links");
    } else {
      document.body.classList.remove("a11y-highlight-links");
    }
  }, [highlightLinks]);

  // Apply Dyslexia Font
  useEffect(() => {
    if (dyslexiaFont) {
      document.body.classList.add("a11y-dyslexia");
    } else {
      document.body.classList.remove("a11y-dyslexia");
    }
  }, [dyslexiaFont]);

  // Apply Pause Animations
  useEffect(() => {
    if (pauseAnimations) {
      document.body.classList.add("a11y-no-animations");
    } else {
      document.body.classList.remove("a11y-no-animations");
    }
  }, [pauseAnimations]);

  // Text to Speech
  useEffect(() => {
    const handleMouseUp = () => {
      if (!readText) return;
      const selection = window.getSelection();
      if (selection && selection.toString().trim()) {
        const text = selection.toString();
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "id-ID";
        window.speechSynthesis.speak(utterance);
      }
    };

    if (readText) {
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      window.speechSynthesis.cancel();
      document.removeEventListener("mouseup", handleMouseUp);
    }

    return () => document.removeEventListener("mouseup", handleMouseUp);
  }, [readText]);

  // Add Global Styles for A11y dynamically to avoid cluttering globals.css if possible,
  // but better to just inject a style tag for these specific overrides.
  useEffect(() => {
    const styleId = "a11y-styles";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.innerHTML = `
        .a11y-highlight-links a {
          background-color: yellow !important;
          color: black !important;
          text-decoration: underline !important;
          text-decoration-thickness: 3px !important;
        }
        .a11y-dyslexia * {
          font-family: "Arial", "Verdana", sans-serif !important;
          letter-spacing: 0.1em !important;
          word-spacing: 0.2em !important;
          line-height: 1.6 !important;
        }
        .a11y-no-animations * {
          animation: none !important;
          transition: none !important;
          scroll-behavior: auto !important;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  const resetAll = () => {
    setZoomLevel(100);
    setHighContrast(false);
    setGrayscale(false);
    setHighlightLinks(false);
    setDyslexiaFont(false);
    setPauseAnimations(false);
    setReadText(false);
  };

  return (
    <>
      {/* Overlay (Optional) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-[9998] transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Main Button (Sticks to the right edge) */}
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

      {/* Sidebar Panel */}
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
            <span className="text-sm font-semibold text-gray-600">
              Pengaturan
            </span>
            <button
              onClick={resetAll}
              className="text-brand-primary text-xs flex items-center gap-1 cursor-pointer bg-transparent border-none font-bold"
            >
              <RotateCcw size={12} /> Reset Semua
            </button>
          </div>

          {/* Zoom */}
          <div className="flex items-center justify-between bg-slate-50 p-3 rounded-md border border-slate-100">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Type size={16} className="text-brand-primary" /> Ukuran Teks
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setZoomLevel(Math.max(80, zoomLevel - 10))}
                className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded cursor-pointer hover:bg-gray-100"
              >
                -
              </button>
              <span className="text-xs font-bold w-8 text-center">
                {zoomLevel}%
              </span>
              <button
                onClick={() => setZoomLevel(Math.min(150, zoomLevel + 10))}
                className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded cursor-pointer hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Feature Buttons */}
            <A11yButton
              active={highContrast}
              onClick={() => setHighContrast(!highContrast)}
              icon={<Contrast size={20} />}
              label="Kontras Tinggi"
            />
            <A11yButton
              active={grayscale}
              onClick={() => setGrayscale(!grayscale)}
              icon={<Palette size={20} />}
              label="Monokrom"
            />
            <A11yButton
              active={highlightLinks}
              onClick={() => setHighlightLinks(!highlightLinks)}
              icon={<LinkIcon size={20} />}
              label="Sorot Tautan"
            />
            <A11yButton
              active={dyslexiaFont}
              onClick={() => setDyslexiaFont(!dyslexiaFont)}
              icon={<BookOpen size={20} />}
              label="Font Disleksia"
            />
            <A11yButton
              active={pauseAnimations}
              onClick={() => setPauseAnimations(!pauseAnimations)}
              icon={<PauseCircle size={20} />}
              label="Hentikan Animasi"
            />
            <A11yButton
              active={readText}
              onClick={() => setReadText(!readText)}
              icon={<Volume2 size={20} />}
              label="Baca Teks"
            />
          </div>

          {readText && (
            <div className="mt-auto bg-blue-50 p-4 rounded-md text-xs text-blue-800 text-center border border-blue-100 font-medium">
              Mode Baca Teks Aktif: Blok (sorot) teks di halaman untuk
              mendengarkannya dibacakan.
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
