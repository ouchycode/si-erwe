import { useState, useEffect } from "react";

interface A11yState {
  zoomLevel: number;
  highContrast: boolean;
  grayscale: boolean;
  highlightLinks: boolean;
  dyslexiaFont: boolean;
  pauseAnimations: boolean;
  readText: boolean;
  colorBlind: boolean;
  largeCursor: boolean;
  readingGuide: boolean;
  textSpacing: boolean;
  hideImages: boolean;
}

function toggleBodyClass(flag: boolean, className: string) {
  if (flag) document.body.classList.add(className);
  else document.body.classList.remove(className);
}

const INITIAL: A11yState = {
  zoomLevel: 100,
  highContrast: false,
  grayscale: false,
  highlightLinks: false,
  dyslexiaFont: false,
  pauseAnimations: false,
  readText: false,
  colorBlind: false,
  largeCursor: false,
  readingGuide: false,
  textSpacing: false,
  hideImages: false,
};

const CLASS_TOGGLES: { key: keyof A11yState; className: string }[] = [
  { key: "highlightLinks", className: "a11y-highlight-links" },
  { key: "dyslexiaFont", className: "a11y-dyslexia" },
  { key: "pauseAnimations", className: "a11y-no-animations" },
  { key: "largeCursor", className: "a11y-large-cursor" },
  { key: "textSpacing", className: "a11y-text-spacing" },
  { key: "hideImages", className: "a11y-hide-images" },
];

export function useAccessibility() {
  const [state, setState] = useState<A11yState>(INITIAL);
  const [mouseY, setMouseY] = useState(0);

  const set = <K extends keyof A11yState>(key: K, value: A11yState[K]) =>
    setState((prev) => ({ ...prev, [key]: value }));

  const toggle = (key: keyof A11yState) =>
    setState((prev) => ({ ...prev, [key]: !prev[key] }));

  useEffect(() => {
    document.documentElement.style.fontSize = `${state.zoomLevel}%`;
  }, [state.zoomLevel]);

  useEffect(() => {
    let filter = "";
    if (state.grayscale) filter += "grayscale(100%) ";
    if (state.highContrast) filter += "contrast(150%) saturate(150%) ";
    if (state.colorBlind) filter += "sepia(50%) hue-rotate(-15deg) saturate(150%) ";
    document.documentElement.style.filter = filter.trim();
  }, [state.grayscale, state.highContrast, state.colorBlind]);

  const {
    highlightLinks,
    dyslexiaFont,
    pauseAnimations,
    largeCursor,
    textSpacing,
    hideImages,
  } = state;

  useEffect(() => {
    const flags = {
      highlightLinks,
      dyslexiaFont,
      pauseAnimations,
      largeCursor,
      textSpacing,
      hideImages,
    } as Record<(typeof CLASS_TOGGLES)[number]["key"], boolean>;
    CLASS_TOGGLES.forEach(({ key, className }) =>
      toggleBodyClass(flags[key], className)
    );
  }, [highlightLinks, dyslexiaFont, pauseAnimations, largeCursor, textSpacing, hideImages]);

  useEffect(() => {
    if (!state.readingGuide) return;
    const handleMouseMove = (e: MouseEvent) => setMouseY(e.clientY);
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [state.readingGuide]);

  useEffect(() => {
    const handleMouseUp = () => {
      const selection = window.getSelection();
      if (selection && selection.toString().trim()) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(selection.toString());
        utterance.lang = "id-ID";
        window.speechSynthesis.speak(utterance);
      }
    };

    if (state.readText) {
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      window.speechSynthesis.cancel();
      document.removeEventListener("mouseup", handleMouseUp);
    }

    return () => document.removeEventListener("mouseup", handleMouseUp);
  }, [state.readText]);

  const resetAll = () => {
    CLASS_TOGGLES.forEach(({ className }) => toggleBodyClass(false, className));
    document.documentElement.style.fontSize = "";
    document.documentElement.style.filter = "";
    setState(INITIAL);
  };

  return { ...state, mouseY, set, toggle, resetAll };
}
