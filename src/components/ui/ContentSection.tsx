import React from "react";
import { cn } from "@/lib/utils";

interface ContentSectionProps {
  children: React.ReactNode;
  /** Additional classes for the <section> element */
  className?: string;
  /** Background color variant */
  bg?: "white" | "slate";
}

/**
 * Full-width content section that overlaps the PageHeader.
 * Replaces the repeated `<div className="relative z-10 -mt-16"><section ...>` pattern.
 */
export function ContentSection({
  children,
  className,
  bg = "white",
}: ContentSectionProps) {
  return (
    <div className="relative z-10 -mt-16">
      <section
        className={cn(
          bg === "white"
            ? "bg-white shadow-[0_-8px_30px_-15px_rgba(0,0,0,0.1)]"
            : "bg-slate-50",
          "pt-16 md:pt-24 pb-16 md:pb-24",
          className,
        )}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">{children}</div>
      </section>
    </div>
  );
}
