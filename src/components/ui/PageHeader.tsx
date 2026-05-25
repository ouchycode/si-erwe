import React from "react";

interface PageHeaderProps {
  category?: string;
  title: string;
  description?: string;
  rightContent?: React.ReactNode;
}

export function PageHeader({
  category,
  title,
  description,
  rightContent,
}: PageHeaderProps) {
  return (
    <div className="bg-brand-primary px-6 md:px-8 pt-16 md:pt-20 pb-28 md:pb-36 border-b border-brand-primary-hover">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>

          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4 tracking-tight">
            {title}
          </h1>
          {description && (
            <p className="text-base text-blue-100/80 max-w-2xl leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {rightContent && <div className="shrink-0">{rightContent}</div>}
      </div>
    </div>
  );
}
