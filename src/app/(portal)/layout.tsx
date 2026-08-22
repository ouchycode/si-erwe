import Navbar from "@/components/layout/Navbar";
import BreadcrumbBar from "@/components/layout/BreadcrumbBar";
import Footer from "@/components/layout/Footer";
import AccessibilityWidget from "@/components/layout/AccessibilityWidget";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import BackToTop from "@/components/layout/BackToTop";
import { getSettings, getGroup } from "@/lib/settings";
import { resolveImageUrl } from "@/lib/api";

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();
  const identitas = {
    logo: getGroup<string>(settings, "identitas", "logo"),
    nama: getGroup<string>(settings, "identitas", "nama"),
    tagline: getGroup<string>(settings, "identitas", "tagline"),
  };
  const heroImage = resolveImageUrl(
    getGroup<string>(settings, "hero", "gambar")
  );

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#ededed]">
      <Navbar identitas={identitas} heroImage={heroImage ?? null} />
      <BreadcrumbBar />
      <main className="flex-1">{children}</main>
      <Footer identitas={identitas} />
      <AccessibilityWidget />
      <WhatsAppFloat />
      <BackToTop />
    </div>
  );
}
