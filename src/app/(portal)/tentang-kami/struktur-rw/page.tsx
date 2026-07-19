import type { LucideIcon } from "lucide-react";
import {
  Heart,
  HardHat,
  FileText,
  Shield,
  Trash2,
  User,
  Wallet,
  Crown,
  ChevronDown,
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata = { title: "Struktur RW" };



/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const KETUA = {
  jabatan: "Ketua RW 04",
  nama: "Muhamad Fadli Husna Mubarok",
  deskripsi: "Pimpinan utama dan pengarah seluruh kegiatan RW 04 Pabuaran.",
  icon: Crown,
  foto: "/images/pengurus/MUHAMAD FADLI HUSNA MUBAROK.png",
};

const WAKIL_INTI = [
  {
    jabatan: "Sekretaris",
    nama: "Kevin Ardiansyah",
    deskripsi: "Administrasi, surat-menyurat, dan dokumentasi kegiatan.",
    icon: FileText,
    foto: "/images/pengurus/KEVIN ARDIANSYAH.png",
  },
  {
    jabatan: "Bendahara",
    nama: "Fadhila",
    deskripsi: "Pencatatan dan pengelolaan keuangan RW.",
    icon: Wallet,
    foto: "/images/pengurus/FADHILA .png",
  },
];

const KOORDINATOR = [
  {
    jabatan: "Keamanan & Ketertiban",
    nama: "Bagus",
    deskripsi: "Koordinasi siskamling dan keamanan lingkungan.",
    icon: Shield,
    foto: "/images/pengurus/BAGUS.png",
  },
  {
    jabatan: "Kebersihan & Lingkungan",
    nama: "Soviyulloh",
    deskripsi: "Program kebersihan dan kerja bakti warga.",
    icon: Trash2,
    foto: "/images/pengurus/SOVIYULLOH.png",
  },
  {
    jabatan: "Pembangunan & Sarana",
    nama: "Umam",
    deskripsi: "Perawatan fasilitas dan infrastruktur wilayah.",
    icon: HardHat,
    foto: "/images/pengurus/UMAM.png",
  },
  {
    jabatan: "Sosial & Kerohanian",
    nama: "Devina",
    deskripsi: "Kegiatan sosial, keagamaan, dan santunan.",
    icon: Heart,
    foto: "/images/pengurus/Devina.png",
  },
];

/* ------------------------------------------------------------------ */
/*  COMPONENTS                                                         */
/* ------------------------------------------------------------------ */

function getInitials(nama: string) {
  return nama
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

/** Hierarchy connector line */
function ConnectorLine() {
  return (
    <div className="flex justify-center py-2">
      <ChevronDown size={18} className="text-gray-300" />
    </div>
  );
}

/** Reusable person card — works for every level of the hierarchy */
function PersonCard({
  jabatan,
  nama,
  deskripsi,
  icon: Icon,
  foto,
  variant = "default",
}: {
  jabatan: string;
  nama: string;
  deskripsi: string;
  icon: LucideIcon;
  foto?: string;
  variant?: "highlight" | "default";
}) {
  const isHighlight = variant === "highlight";

  return (
    <div
      className={`rounded-xs overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md ${
        isHighlight
          ? "bg-brand-primary border border-brand-primary-hover"
          : "bg-white border border-slate-100"
      }`}
    >
      <div className="p-6 flex flex-col items-center text-center gap-4">
        {/* Avatar */}
        <div
          className={`w-32 h-32 rounded-full flex items-center justify-center text-2xl font-bold tracking-wide overflow-hidden relative shadow-lg ${
            isHighlight
              ? "bg-white/15 text-white border border-white/20"
              : "bg-brand-light text-brand-primary border border-brand-primary/10"
          }`}
        >
          {foto ? (
            <img src={foto} alt={nama} className="w-full h-full object-cover object-top" />
          ) : (
            getInitials(nama)
          )}
        </div>

        {/* Role badge */}
        <div className="flex items-center gap-2">
          <div
            className={`w-6 h-6 rounded-xs flex items-center justify-center ${
              isHighlight
                ? "bg-white/10 text-white/70"
                : "icon-badge"
            }`}
          >
            <Icon size={12} />
          </div>
          <span
            className={`text-[10px] font-bold uppercase tracking-widest ${
              isHighlight ? "text-white/60" : "text-gray-400"
            }`}
          >
            {jabatan}
          </span>
        </div>

        {/* Name */}
        <div>
          <p
            className={`text-sm font-bold leading-tight mb-1 ${
              isHighlight ? "text-white" : "text-slate-800"
            }`}
          >
            {nama}
          </p>
          <p
            className={`text-xs leading-relaxed ${
              isHighlight ? "text-white/60" : "text-gray-500"
            }`}
          >
            {deskripsi}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function StrukturRW() {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <PageHeader
        title="Struktur Organisasi RW 04"
        description="Sinergi pengurus dalam melayani dan mengelola lingkungan demi kenyamanan seluruh warga RW 04 Pabuaran periode 2024–2027."
        rightContent={
          <div className="flex items-center gap-4 bg-white/10 border border-white/20 rounded-xs px-6 py-4 shrink-0">
            <div className="w-10 h-10 bg-white/10 rounded-xs flex items-center justify-center">
              <User size={18} className="text-white/70" />
            </div>
            <div>
              <p className="text-xs text-white/40 font-bold uppercase tracking-widest mb-0.5">
                Total Pengurus
              </p>
              <p className="text-2xl font-bold text-white">7 Orang</p>
            </div>
          </div>
        }
      />

      {/* ═══ ORGANIZATIONAL CHART ═══ */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-16 relative z-10">
        <div className="bg-white border border-slate-100 rounded-xs shadow-sm p-6 md:p-10">
          <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-8 text-center">
            Bagan Organisasi Periode 2024 — 2027
          </p>

          {/* ── Level 1: Ketua ── */}
          <div className="flex justify-center">
            <div className="w-full max-w-sm">
              <PersonCard {...KETUA} variant="highlight" />
            </div>
          </div>

          <ConnectorLine />

          {/* ── Level 2: Sekretaris & Bendahara ── */}
          <div className="flex justify-center">
            <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-4">
              {WAKIL_INTI.map((p) => (
                <PersonCard key={p.jabatan} {...p} />
              ))}
            </div>
          </div>

          <ConnectorLine />

          {/* ── Level 3: Koordinator Bidang ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {KOORDINATOR.map((p) => (
              <PersonCard key={p.jabatan} {...p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

