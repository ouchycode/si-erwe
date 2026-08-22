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
    <div className="mb-6 overflow-hidden rounded-xs bg-wd-maroon-dark border-b-[3px] border-brand-primary px-6 py-5 shadow-sm sm:px-7">
      {category && (
        <p className="wd-heading text-[10px] font-semibold uppercase tracking-[2px] text-white/50">
          {category}
        </p>
      )}
      <div className={category ? "mt-1.5" : ""}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="wd-heading text-xl font-bold uppercase tracking-[0.5px] text-white md:text-2xl">
              {title}
            </h1>
            {subtitle && <p className="mt-1.5 text-[13px] text-white/70">{subtitle}</p>}
          </div>
          {action && (
            <div className="shrink-0 [&_button]:!bg-white [&_button]:!text-brand-primary [&_button]:hover:!bg-slate-100">
              {action}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
