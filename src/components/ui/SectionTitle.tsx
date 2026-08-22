import Link from "next/link";

export default function SectionTitle({
  title,
  href,
  linkLabel = "Lihat Semua",
  tone = "primary",
}: {
  title: string;
  href?: string;
  linkLabel?: string;
  tone?: "primary" | "dark";
}) {
  return (
    <div
      className={`wd-heading mb-6 flex items-center justify-between gap-3 px-4 py-2.5 text-white ${
        tone === "primary" ? "bg-brand-primary" : "bg-wd-maroon-dark"
      }`}
    >
      <span className="text-base font-semibold tracking-[1px]">{title}</span>
      {href ? (
        <Link
          href={href}
          className="whitespace-nowrap text-xs font-normal uppercase tracking-wide text-white opacity-90 no-underline transition-opacity hover:opacity-100 hover:underline"
        >
          {linkLabel} &raquo;
        </Link>
      ) : null}
    </div>
  );
}
