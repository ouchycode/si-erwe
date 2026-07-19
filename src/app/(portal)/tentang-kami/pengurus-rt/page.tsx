import { Users, User, Phone, MapPin } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/*  HELPERS                                                            */
/* ------------------------------------------------------------------ */

function getInitials(nama: string) {
  return nama
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function PengurusRT() {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
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

      {/* ═══ RT CARDS GRID ═══ */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {DATA_RT.map((item) => (
            <div
              key={item.rt}
              className="group bg-white border border-slate-100 rounded-xs overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
            >
              {/* Card Header */}
              <div className="bg-brand-primary px-5 py-4 flex items-center justify-between">
                <h3 className="text-white font-bold text-base tracking-wide">
                  RT {item.rt}
                </h3>
                <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">
                  RW 04
                </span>
              </div>

              {/* Card Body */}
              <div className="p-5 flex flex-col gap-4">
                {/* Avatar + Name */}
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-brand-light text-brand-primary flex items-center justify-center border border-brand-primary/10 shrink-0 font-bold text-sm">
                    {getInitials(item.ketua)}
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">
                      Ketua RT
                    </p>
                    <p className="text-sm font-bold text-slate-800 leading-tight">
                      {item.ketua}
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-100" />

                {/* Location & Phone */}
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-xs bg-slate-50 flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin size={13} className="text-gray-400" />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">
                        Wilayah
                      </p>
                      <p className="text-sm text-gray-600">{item.lokasi}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-xs bg-slate-50 flex items-center justify-center shrink-0 mt-0.5">
                      <Phone size={13} className="text-gray-400" />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">
                        Kontak
                      </p>
                      <p className="text-sm text-gray-600">{item.telp}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ SUMMARY BAR ═══ */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-10 relative z-10">
        <div className="bg-white border border-slate-100 rounded-xs shadow-sm p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xs flex items-center justify-center shrink-0 icon-badge shadow-sm">
                <User size={18} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800 mb-0.5">
                  Periode Kepengurusan 2024 — 2027
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Seluruh Ketua RT berada di bawah koordinasi langsung Ketua RW
                  04 Pabuaran.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-center shrink-0">
              <div>
                <p className="text-2xl font-bold text-brand-primary">8</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  RT Aktif
                </p>
              </div>
              <div className="w-px h-10 bg-gray-100" />
              <div>
                <p className="text-2xl font-bold text-brand-primary">±350</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Kepala Keluarga
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
