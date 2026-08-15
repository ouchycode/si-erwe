import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AccessibilityWidget from "@/components/layout/AccessibilityWidget";
import { getSettings, getGroup } from "@/lib/settings";

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();
  const initial = {
    logo: getGroup<string>(settings, "identitas", "logo"),
    nama: getGroup<string>(settings, "identitas", "nama"),
    tagline: getGroup<string>(settings, "identitas", "tagline"),
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar initialIdentitas={initial} />
      <main className="flex-1">{children}</main>
      <Footer />
      <AccessibilityWidget />
    </div>
  );
}
