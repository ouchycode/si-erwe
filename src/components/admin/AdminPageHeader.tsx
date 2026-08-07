import { ReactNode } from "react";

export function AdminPageHeader({
  title,
  subtitle,
  action,
  category,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  category?: string;
}) {
  return (
    <div className="mb-6 rounded-xs bg-brand-primary px-6 py-7 shadow-sm sm:px-8">
      {category && (
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
          {category}
        </p>
      )}
      <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">{title}</h1>
          {subtitle && <p className="mt-1.5 text-sm text-white/70">{subtitle}</p>}
        </div>
        {action && (
          <div className="shrink-0 [&_button]:!bg-white [&_button]:!text-brand-primary [&_button]:hover:!bg-slate-100">
            {action}
          </div>
        )}
      </div>
    </div>
  );
}
