"use client";

import { useState } from "react";
import TopBar from "./TopBar";
import DesktopNav from "./DesktopNav";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);

  const toggleMobileGroup = (label: string) => {
    setOpenMobileGroup((prev) => (prev === label ? null : label));
  };

  return (
    <nav className="sticky top-0 z-50 font-sans flex flex-col w-full">
      <TopBar isOpen={isMobileMenuOpen} onToggle={() => setIsMobileMenuOpen((p) => !p)} />
      <DesktopNav />
      <MobileMenu
        isOpen={isMobileMenuOpen}
        openGroup={openMobileGroup}
        onToggleGroup={toggleMobileGroup}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </nav>
  );
}
