import React from "react";

interface PageHeaderProps {
  title: string;
  category?: string;
  description?: string;
  rightContent?: React.ReactNode;
}

export function PageHeader({
  title,
  category,
  description,
  rightContent,
}: PageHeaderProps) {
  return (
    <div className="border-b-[3px] border-brand-primary bg-wd-maroon-dark">
      <div className="wd-container flex flex-col justify-between gap-6 py-7 md:flex-row md:items-end">
        <div>
          {category && (
            <p className="wd-heading mb-1 text-xs tracking-[2px] text-white/70">
              {category}
            </p>
          )}
          <h1 className="wd-heading text-2xl font-bold tracking-[1px] text-white md:text-[28px]">
            {title}
          </h1>
          {description && (
            <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-white/80">
              {description}
            </p>
          )}
        </div>

        {rightContent && <div className="shrink-0">{rightContent}</div>}
      </div>
    </div>
  );
}
