import type { LucideIcon } from "lucide-react";
import { ContentSection } from "@/components/ui/ContentSection";
import { PersonAvatar } from "@/components/ui/person-avatar";
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
import { api, resolveImageUrl } from "@/lib/api";
import { getSettings, getGroup } from "@/lib/settings";
import type { Pengurus, ProfilUmum } from "@/lib/types";

export const dynamic = "force-dynamic";
export const metadata = { title: "Struktur RW" };

function iconFor(jabatan: string): LucideIcon {
  if (/ketua/i.test(jabatan)) return Crown;
  if (/sekretaris/i.test(jabatan)) return FileText;
  if (/bendahara/i.test(jabatan)) return Wallet;
  if (/keamanan/i.test(jabatan)) return Shield;
  if (/kebersihan|lingkungan/i.test(jabatan)) return Trash2;
  if (/pembangunan|sarana/i.test(jabatan)) return HardHat;
  if (/sosial|kerohanian/i.test(jabatan)) return Heart;
  return User;
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
  deskripsi: string | null;
  icon: LucideIcon;
  foto?: string | null;
  variant?: "highlight" | "default";
}) {
  const isHighlight = variant === "highlight";
  const fotoUrl = resolveImageUrl(foto);

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
        <PersonAvatar
          src={fotoUrl}
          alt={nama}
          sizes="128px"
          className={`w-32 h-32 text-2xl font-bold tracking-wide shadow-lg ${
            isHighlight
              ? "bg-white/15 text-white border border-white/20"
              : "bg-brand-light text-brand-primary border border-brand-primary/10"
          }`}
          iconClassName="h-12 w-12"
        />

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

export default async function StrukturRW() {
  const settings = await getSettings();
  const umum = getGroup<ProfilUmum>(settings, "profil", "umum");
  const periode = umum?.periode ?? "2024 — 2027";

  const res = await api
    .get<{ data: Pengurus[] }>("/pengurus")
    .catch(() => ({ data: [] as Pengurus[] }));

  const list = res.data;
  const ketua = list.filter((p) => p.level === "ketua");
  const inti = list.filter((p) => p.level === "inti");
  const koordinator = list.filter((p) => p.level === "koordinator");

  return (
    <div className="min-h-screen bg-white font-sans">
      <PageHeader
        title="Struktur Organisasi RW 004"
        description={`Sinergi pengurus dalam melayani dan mengelola lingkungan demi kenyamanan seluruh warga RW 004 Pabuaran periode ${periode}.`}
        rightContent={
          <div className="flex items-center gap-4 bg-white/10 border border-white/20 rounded-xs px-6 py-4 shrink-0">
            <div className="w-10 h-10 bg-white/10 rounded-xs flex items-center justify-center">
              <User size={18} className="text-white/70" />
            </div>
            <div>
              <p className="text-xs text-white/40 font-bold uppercase tracking-widest mb-0.5">
                Total Pengurus
              </p>
              <p className="text-2xl font-bold text-white">{list.length} Orang</p>
            </div>
          </div>
        }
      />

      {/* ═══ ORGANIZATIONAL CHART ═══ */}
      <ContentSection>
        <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-8 text-center">
          Bagan Organisasi Periode {periode}
        </p>

        {/* ── Level 1: Ketua ── */}
        {ketua[0] && (
          <div className="flex justify-center">
            <div className="w-full max-w-sm">
              <PersonCard
                jabatan={ketua[0].jabatan}
                nama={ketua[0].nama}
                deskripsi={ketua[0].deskripsi}
                icon={iconFor(ketua[0].jabatan)}
                foto={ketua[0].foto}
                variant="highlight"
              />
            </div>
          </div>
        )}

        {inti.length > 0 && (
          <>
            <ConnectorLine />
            {/* ── Level 2: Sekretaris & Bendahara ── */}
            <div className="flex justify-center">
              <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-4">
                {inti.map((p) => (
                  <div key={p.id} data-aos="fade-up">
                    <PersonCard
                      jabatan={p.jabatan}
                      nama={p.nama}
                      deskripsi={p.deskripsi}
                      icon={iconFor(p.jabatan)}
                      foto={p.foto}
                    />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {koordinator.length > 0 && (
          <>
            <ConnectorLine />
            {/* ── Level 3: Koordinator Bidang ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {koordinator.map((p) => (
                <div key={p.id} data-aos="fade-up">
                  <PersonCard
                    jabatan={p.jabatan}
                    nama={p.nama}
                    deskripsi={p.deskripsi}
                    icon={iconFor(p.jabatan)}
                    foto={p.foto}
                  />
                </div>
              ))}
            </div>
          </>
        )}

        {list.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 font-medium">Belum ada data pengurus.</p>
          </div>
        )}
      </ContentSection>
    </div>
  );
}
