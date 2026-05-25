import type { Metadata } from "next";
import { Figtree, Geist } from "next/font/google";
import "./globals.css";
import { FeatureProvider } from "@/context/FeatureContext";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SI-RW 12 Kutabumi",
  description: "Sistem Informasi RW 12 Kutabumi",
};

import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={cn("h-full", "antialiased", figtree.variable, "font-sans", geist.variable)}>
      <body className="min-h-full bg-gray-100 font-sans">
        <FeatureProvider>
          {children}
          <Toaster position="top-right" richColors />
        </FeatureProvider>
      </body>
    </html>
  );
}
