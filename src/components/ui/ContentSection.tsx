import React from "react";
import { cn } from "@/lib/utils";

interface ContentSectionProps {
  children: React.ReactNode;
  /** Additional classes for the <section> element */
  className?: string;
  /** Kept for API compatibility; both variants render the same white panel */
  bg?: "white" | "slate";
}

/**
 * Konten halaman di dalam kartu putih di atas body abu-abu (gaya webdesa).
 */
export function ContentSection({
  children,
  className,
}: ContentSectionProps) {
  return (
    <div className="relative z-10 mt-7">
      <section className={cn("wd-container", className)}>
        <div className="wd-card p-5 md:p-8">{children}</div>
      </section>
    </div>
  );
}
