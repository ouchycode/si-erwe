"use client";

import { useCallback, useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

const THEME_KEY = "rw_theme";
let cache: boolean | undefined;

function readStored(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const t = localStorage.getItem(THEME_KEY);
    return t ? t === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
  } catch {
    return false;
  }
}

function readSnapshot(): boolean {
  if (cache === undefined) cache = readStored();
  return cache;
}

const listeners = new Set<() => void>();
function subscribe(cb: () => void): () => void {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}
function emit(): void {
  cache = undefined;
  listeners.forEach((cb) => cb());
}

export function applyTheme(dark: boolean): void {
  if (typeof window === "undefined") return;
  const root = document.documentElement;
  if (dark) {
    root.classList.add("dark");
    try {
      localStorage.setItem(THEME_KEY, "dark");
    } catch {
      /* noop */
    }
  } else {
    root.classList.remove("dark");
    try {
      localStorage.setItem(THEME_KEY, "light");
    } catch {
      /* noop */
    }
  }
  emit();
}

export default function ThemeToggle({
  variant = "default",
}: {
  variant?: "default" | "navbar";
}) {
  const dark = useSyncExternalStore(
    subscribe,
    readSnapshot,
    () => false
  );

  const toggleTheme = useCallback(() => {
    applyTheme(!readStored());
  }, []);

  if (variant === "navbar") {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={dark ? "Aktifkan mode terang" : "Aktifkan mode gelap"}
        title={dark ? "Mode terang" : "Mode gelap"}
        className="inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full border-none bg-white/15 text-white transition-colors hover:bg-white/30"
      >
        {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={dark ? "Aktifkan mode terang" : "Aktifkan mode gelap"}
      title={dark ? "Mode terang" : "Mode gelap"}
      className="inline-flex items-center justify-center rounded-xs border border-slate-200 bg-slate-50 p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-800 cursor-pointer"
    >
      {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  );
}