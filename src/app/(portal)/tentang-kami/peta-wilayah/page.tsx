import MapComponent from "@/components/MapComponent";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContentSection } from "@/components/ui/ContentSection";

export default function PetaWilayahPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <PageHeader
        category="Profil Lingkungan"
        title="Peta Wilayah Interaktif"
        description="Jelajahi batas wilayah, lokasi sekretariat RW, serta titik sebaran Poskamling dan Fasilitas Umum di RW 004 Pabuaran."
      />

      <ContentSection className="pt-0 md:pt-0 pb-0 md:pb-0">
        {/* Map Area */}
        <div className="w-full bg-gray-200 h-[600px] md:h-[700px] relative z-0" data-aos="fade-up">
          <MapComponent />
        </div>
      </ContentSection>
    </div>
  );
}
