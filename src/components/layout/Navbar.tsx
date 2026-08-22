"use client";

import { useState } from "react";
import TopBar from "./TopBar";
import DesktopNav from "./DesktopNav";
import MobileMenu from "./MobileMenu";

export default function Navbar({
  identitas,
  heroImage,
}: {
  identitas?: {
    logo?: string;
    nama?: string;
    tagline?: string;
  };
  heroImage?: string | null;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);

  const toggleMobileGroup = (label: string) => {
    setOpenMobileGroup((prev) => (prev === label ? null : label));
  };

  return (
    <>
      <TopBar identitas={identitas} heroImage={heroImage} />
      <nav className="sticky top-0 z-50 w-full">
        <DesktopNav
          isMobileMenuOpen={isMobileMenuOpen}
          onToggleMenu={() => setIsMobileMenuOpen((p) => !p)}
        />
        <MobileMenu
          isOpen={isMobileMenuOpen}
          openGroup={openMobileGroup}
          onToggleGroup={toggleMobileGroup}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      </nav>
    </>
  );
}
