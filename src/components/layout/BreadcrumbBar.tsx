"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

export default function BreadcrumbBar() {
  const pathname = usePathname();
  if (!pathname || pathname === "/") return null;

  const crumbs = [{ label: "Beranda", href: "/" }];
  let current = "";
  pathname
    .split("/")
    .filter(Boolean)
    .forEach((seg) => {
      current += `/${seg}`;
      crumbs.push({
        label:
          seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, " "),
        href: current,
      });
    });

  return (
    <div className="border-b border-slate-200 bg-white">
      <div className="wd-container py-3">
        <nav
          aria-label="Breadcrumb"
          className="wd-heading flex flex-wrap items-center gap-2 text-[13px] tracking-[0.5px] text-gray-500"
        >
          {crumbs.map((crumb, i) => {
            const isLast = i === crumbs.length - 1;
            return (
              <span key={crumb.href} className="flex items-center gap-2">
                {isLast ? (
                  <span className="text-brand-primary">{crumb.label}</span>
                ) : (
                  <Link
                    href={crumb.href}
                    className="text-gray-500 no-underline transition-colors hover:text-brand-primary hover:underline"
                  >
                    {crumb.label}
                  </Link>
                )}
                {!isLast && (
                  <ChevronRight size={12} className="text-gray-300" />
                )}
              </span>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
