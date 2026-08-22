import type { Metadata } from "next";
import { Oswald, Nunito_Sans } from "next/font/google";
import "./globals.css";
import AOSInit from "@/components/layout/AOSInit";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
});

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Sekretariat RW 004 Pabuaran",
    default: "Sekretariat RW 004 Pabuaran, Karawaci",
  },
  description: "Situs resmi Sekretariat RW 004 Pabuaran, Karawaci, Kota Tangerang.",
  verification: {
    google: "CZ44k-zzgO9eENqJDecl_5ZbJ2OfugWTGKRYQoQh_68",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning className={`h-full antialiased ${oswald.variable} ${nunitoSans.variable} font-sans`}>
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
        <AOSInit />
        {children}
      </body>
    </html>
  );
}
