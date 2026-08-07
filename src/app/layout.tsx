import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Sekretariat RW 04 Pabuaran",
    default: "Sekretariat RW 04 Pabuaran, Karawaci",
  },
  description: "Situs resmi Sekretariat RW 04 Pabuaran, Karawaci, Kota Tangerang.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning className={`h-full antialiased ${figtree.variable} font-sans`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function () {
  try {
    var t = localStorage.getItem('rw_theme');
    var dark = t ? t === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (dark) document.documentElement.classList.add('dark');
  } catch (e) {}
})();`,
          }}
        />
      </head>
      <body className="min-h-full bg-gray-100 font-sans">
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
