import Image from "next/image";
import { Users, User, Phone, MapPin } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContentSection } from "@/components/ui/ContentSection";
import { getInitials } from "@/lib/utils";

export const metadata = { title: "Pengurus RT" };

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const DATA_RT = [
  { rt: "01", ketua: "Ajib",             lokasi: "Blok A", telp: "0812-9000-0001", foto: "/images/pengurus/AJIB.png" },
  { rt: "02", ketua: "Anisa",            lokasi: "Blok B", telp: "0812-9000-0002", foto: "/images/pengurus/ANISA.png" },
  { rt: "03", ketua: "Arthadena",         lokasi: "Blok C", telp: "0812-9000-0003", foto: "/images/pengurus/ARTHADENA.png" },
  { rt: "04", ketua: "Giska",            lokasi: "Blok D", telp: "0812-9000-0004", foto: "/images/pengurus/GISKA.png" },
  { rt: "05", ketua: "Muhammad Lutfhi Nabhan", lokasi: "Blok E", telp: "0812-9000-0005", foto: "/images/pengurus/MUHAMMAD LUTFHI NABHAN.png" },
  { rt: "06", ketua: "Putri",            lokasi: "Blok F", telp: "0812-9000-0006", foto: "/images/pengurus/PUTRI.png" },
  { rt: "07", ketua: "Adin",             lokasi: "Blok G", telp: "0812-9000-0007", foto: "/images/pengurus/ADIN.png" },
  { rt: "08", ketua: "Tiara",            lokasi: "Blok H", telp: "0812-9000-0008", foto: "/images/pengurus/TIARA.png" },
];

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function PengurusRT() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <PageHeader
        title="Daftar Pengurus RT"
        description="Para ujung tombak pelayanan warga di lingkungan RW 04 Pabuaran — mengelola 8 wilayah RT dengan semangat gotong royong."
        rightContent={
          <div className="flex items-center gap-4 bg-white/10 border border-white/20 rounded-xs px-6 py-4 shrink-0">
            <div className="w-10 h-10 bg-white/10 rounded-xs flex items-center justify-center">
              <Users size={18} className="text-white/70" />
            </div>
            <div>
              <p className="text-xs text-white/40 font-bold uppercase tracking-widest mb-0.5">
                Total RT Aktif
              </p>
              <p className="text-2xl font-bold text-white">8 Wilayah</p>
            </div>
          </div>
        }
      />

      {/* DAFTAR RT */}
      <ContentSection className="pb-8 md:pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {DATA_RT.map((item) => (
            <div
              key={item.rt}
              className="group bg-slate-50 rounded-xs overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="bg-brand-primary px-5 py-4 flex items-center justify-between">
                <h3 className="text-white font-bold text-base tracking-wide">
                  RT {item.rt}
                </h3>
                <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">
                  RW 04
                </span>
              </div>
              <div className="p-5 flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="w-24 h-24 rounded-full bg-brand-light text-brand-primary flex items-center justify-center border border-brand-primary/10 shrink-0 font-bold text-lg overflow-hidden relative shadow-md">
                    <Image src={item.foto} alt={item.ketua} fill className="object-cover object-top" sizes="96px" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">Ketua RT</p>
                    <p className="text-sm font-bold text-slate-800 leading-tight">{item.ketua}</p>
                  </div>
                </div>
                <div className="border-t border-gray-100" />
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-xs bg-white flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin size={13} className="text-gray-400" />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">Wilayah</p>
                      <p className="text-sm text-gray-600">{item.lokasi}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-xs bg-white flex items-center justify-center shrink-0 mt-0.5">
                      <Phone size={13} className="text-gray-400" />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">Kontak</p>
                      <p className="text-sm text-gray-600">{item.telp}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ContentSection>

      <section className="bg-slate-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="bg-white rounded-xs shadow-sm p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xs flex items-center justify-center shrink-0 icon-badge shadow-sm">
                <User size={18} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800 mb-0.5">Periode Kepengurusan 2024 — 2027</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Seluruh Ketua RT berada di bawah koordinasi langsung Ketua RW 04 Pabuaran.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-center shrink-0">
              <div>
                <p className="text-2xl font-bold text-brand-primary">8</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">RT Aktif</p>
              </div>
              <div className="w-px h-10 bg-gray-100" />
              <div>
                <p className="text-2xl font-bold text-brand-primary">±350</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Kepala Keluarga</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
