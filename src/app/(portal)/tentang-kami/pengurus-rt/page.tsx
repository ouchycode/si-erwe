import { Users, User, Phone, MapPin } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";

const DATA_RT = [
  {
    rt: "01",
    ketua: "Lorem Ipsum",
    lokasi: "Blok A, Dolor Sit Amet",
    telp: "0812-XXXX-XXXX",
  },
  {
    rt: "02",
    ketua: "Consectetur Adipiscing",
    lokasi: "Blok B, Elit Sed",
    telp: "0812-XXXX-XXXX",
  },
  {
    rt: "03",
    ketua: "Do Eiusmod",
    lokasi: "Blok C, Tempor Incididunt",
    telp: "0812-XXXX-XXXX",
  },
  {
    rt: "04",
    ketua: "Ut Labore",
    lokasi: "Blok D, Et Dolore",
    telp: "0812-XXXX-XXXX",
  },
  {
    rt: "05",
    ketua: "Magna Aliqua",
    lokasi: "Blok E, Ut Enim",
    telp: "0812-XXXX-XXXX",
  },
  {
    rt: "06",
    ketua: "Ad Minim",
    lokasi: "Blok F, Veniam Quis",
    telp: "0812-XXXX-XXXX",
  },
  {
    rt: "07",
    ketua: "Nostrud Exercitation",
    lokasi: "Blok G, Ullamco Laboris",
    telp: "0812-XXXX-XXXX",
  },
  {
    rt: "08",
    ketua: "Nisi Ut Aliquip",
    lokasi: "Blok H, Ex Ea Commodo",
    telp: "0812-XXXX-XXXX",
  },
];

export default function PengurusRT() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <PageHeader
        category="Tentang Kami"
        title="Daftar Pengurus RT"
        description="Para ujung tombak pelayanan warga di lingkungan RW 12 Kutabumi."
        rightContent={
          <div className="flex items-center gap-4 bg-white/10 border border-white/20 rounded-xs px-6 py-4 shrink-0">
            <div className="w-10 h-10 bg-white/10 rounded-xs flex items-center justify-center">
              <Users size={18} className="text-blue-200" />
            </div>
            <div>
              <p className="text-xs text-blue-300/80 font-bold uppercase tracking-widest mb-0.5">
                Total RT Aktif
              </p>
              <p className="text-2xl font-extrabold text-white">8 Wilayah</p>
            </div>
          </div>
        }
      />

      {/* GRID — pulls up over the PageHeader */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {DATA_RT.map((item) => (
            <div
              key={item.rt}
              className="bg-white border border-gray-200 rounded-xs overflow-hidden transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 group"
            >
              {/* Header */}
              <div className="bg-brand-primary px-5 py-4 flex items-center justify-between">
                <h3 className="text-white font-extrabold text-base tracking-wide">
                  RT {item.rt}
                </h3>
                <span className="text-[10px] font-bold text-blue-300/80 uppercase tracking-widest">
                  RW 12
                </span>
              </div>

              {/* Body */}
              <div className="p-5 flex flex-col gap-4">
                {/* Ketua */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-brand-primary border border-brand-primary-hover text-white rounded-xs flex items-center justify-center shrink-0 shadow-sm group-hover:bg-brand-primary-hover transition-colors duration-200">
                    <User size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">
                      Ketua RT
                    </p>
                    <p className="text-sm font-bold text-gray-900 leading-tight">
                      {item.ketua}
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-100" />

                {/* Kontak & Lokasi */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2.5 text-sm text-gray-500">
                    <MapPin size={13} className="text-gray-300 shrink-0" />
                    <span className="truncate">{item.lokasi}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-gray-500">
                    <Phone size={13} className="text-gray-300 shrink-0" />
                    <span>{item.telp}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
