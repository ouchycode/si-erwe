import type { Metadata } from "next";
import { Figtree, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

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

import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={cn(
        "h-full",
        "antialiased",
        figtree.variable,
        "font-sans",
        geist.variable,
      )}
    >
      <body className="min-h-full bg-gray-100 font-sans">
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
