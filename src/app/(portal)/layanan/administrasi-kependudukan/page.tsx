import { FileText, CreditCard, FileBadge, CheckCircle2, Clock, AlertCircle, FileSignature, MapPin } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContentSection } from "@/components/ui/ContentSection";
import { PengajuanForm, CekStatusPengajuan } from "@/components/forms/PengajuanForm";
import { getSettings, getGroup } from "@/lib/settings";
import type { LayananAdministrasi, LayananAlur } from "@/lib/types";

export const metadata = { title: "Administrasi Kependudukan" };

const LAYANAN_ICON: Record<string, React.ElementType> = {
  "surat-pengantar": FileText,
  "surat-domisili": FileBadge,
  "ktp-kk-baru": CreditCard,
};

const DEFAULT_LAYANAN: { icon: React.ElementType; judul: string; syarat: string[] }[] = [
  {
    icon: FileText,
    judul: "Surat Pengantar RT/RW",
    syarat: ["Fotokopi Kartu Keluarga (KK)", "Fotokopi KTP Pemohon"],
  },
  {
    icon: FileBadge,
    judul: "Surat Domisili",
    syarat: ["Surat Pengantar RT/RW", "Fotokopi KTP", "Pas Foto 3x4 (2 lembar)"],
  },
  {
    icon: CreditCard,
    judul: "Pengurusan KTP/KK Baru",
    syarat: ["Surat Pengantar RT/RW", "KK Lama asli (untuk KK baru)", "Fotokopi Buku Nikah (jika ada)"],
  },
];

const DEFAULT_ALUR: LayananAlur[] = [
  {
    step: "01",
    title: "Siapkan Berkas",
    desc: "Siapkan fotokopi KK, KTP, dan dokumen pendukung lainnya sesuai layanan yang dibutuhkan.",
  },
  {
    step: "02",
    title: "Lapor Ketua RT",
    desc: "Temui Ketua RT di wilayah domisili Anda untuk mendapatkan tanda tangan pengantar.",
  },
  {
    step: "03",
    title: "Validasi RW",
    desc: "Bawa surat yang sudah ditandatangani RT ke Sekretariat RW 04 untuk validasi stempel.",
  },
  {
    step: "04",
    title: "Lanjut ke Kelurahan",
    desc: "Bawa berkas lengkap ke Kantor Kelurahan Pabuaran untuk proses selanjutnya.",
  },
];

export default async function AdministrasiKependudukan() {
  const settings = await getSettings();

  const administrasi = getGroup<LayananAdministrasi[]>(settings, "layanan", "administrasi");
  const alurSetting = getGroup<LayananAlur[]>(settings, "layanan", "alur");

  const LAYANAN = administrasi && administrasi.length > 0
    ? administrasi.map((l) => ({
        icon: LAYANAN_ICON[l.slug] ?? FileText,
        judul: l.judul,
        syarat: l.syarat,
      }))
    : DEFAULT_LAYANAN;

  const ALUR = alurSetting && alurSetting.length > 0 ? alurSetting : DEFAULT_ALUR;

  return (
    <div className="min-h-screen bg-white font-sans pb-20">
      <PageHeader
        category="Layanan Warga"
        title="Administrasi Kependudukan"
        description="Alur, persyaratan, dan panduan pengurusan dokumen kependudukan untuk warga RW 04 Pabuaran, Kota Tangerang."
      />

      {/* ALUR */}
      <ContentSection>
        <div className="flex items-center justify-center gap-3 mb-12">
          <h2 data-aos="fade-up" className="text-3xl font-bold text-slate-800">
            Alur Pengurusan
          </h2>
        </div>
        <div data-aos="fade-up" className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
          {/* connector line */}
          <div className="hidden md:block absolute top-5 left-[12.5%] right-[12.5%] h-px bg-gray-100 z-0" />
          {ALUR.map((item) => (
            <div
              key={item.step}
              data-aos="fade-up"

              className="relative z-10 flex flex-col gap-3 bg-slate-50 border border-slate-100 rounded-xs px-5 py-5"
            >
              <span className="text-xs font-bold text-brand-primary tracking-widest">
                {item.step}
              </span>
              <div>
                <h3 className="text-sm font-bold text-slate-800 mb-1">{item.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </ContentSection>

      {/* FORM PENGAJUAN */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="bg-white shadow-xl overflow-hidden rounded-xs">
            <div data-aos="fade-up" className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.65fr]">
              <div data-aos="fade-up" className="bg-brand-primary text-white p-6 md:p-8 flex flex-col justify-between gap-8">
                <div>
                  <div className="w-10 h-10 bg-white/10 rounded-xs flex items-center justify-center mb-5">
                    <FileSignature size={18} className="text-white/70" />
                  </div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-3">
                    Pengajuan Awal
                  </p>
                  <h3 className="text-2xl font-bold text-white mb-4 leading-tight">
                    Mulai Proses <br /> Administrasi Anda
                  </h3>
                  <p className="text-sm text-white/70 leading-relaxed">
                    Kini Anda bisa memulai pengajuan surat pengantar secara online sebelum mengambil dokumen fisik di pos RT/RW.
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3 bg-white/10 rounded-xs p-3">
                    <MapPin size={16} className="text-white" />
                    <p className="text-xs font-semibold text-white/90">Ambil di Sekretariat RW</p>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 rounded-xs p-3">
                    <Clock size={16} className="text-white" />
                    <p className="text-xs font-semibold text-white/90">Proses 1x24 Jam</p>
                  </div>
                </div>
              </div>

              <PengajuanForm />
            </div>
          </div>

          <div className="bg-white shadow-xl overflow-hidden rounded-xs mt-8">
            <CekStatusPengajuan />
          </div>
        </div>
      </section>

      {/* SYARAT & KETENTUAN */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center gap-3 mb-12">
            <h2 data-aos="fade-up" className="text-2xl md:text-3xl font-bold text-slate-800">
              Syarat & Ketentuan Layanan
            </h2>
          </div>

          <div data-aos="fade-up" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {LAYANAN.map((layanan, i) => (
              <div
                key={i}
                data-aos="fade-up"

                className="bg-slate-50 border border-slate-100 rounded-xs p-6 hover:shadow-md transition-shadow group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-primary/5 rounded-bl-full -z-0 transition-transform group-hover:scale-110" />
                
                <div className="flex items-center gap-3 mb-5 relative z-10">
                  <div className={`w-10 h-10 rounded-xs flex items-center justify-center shrink-0 icon-badge shadow-sm`}>
                    <layanan.icon size={18} />
                  </div>
                  <h3 className="font-bold text-slate-800 leading-tight">
                    {layanan.judul}
                  </h3>
                </div>
                <div className="relative z-10 space-y-3">
                  {layanan.syarat.map((s, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2
                        size={14}
                        className="text-brand-primary mt-0.5 shrink-0"
                      />
                      <span className="text-sm text-gray-600 leading-snug">
                        {s}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Alert */}
          <div data-aos="fade-up" className="mt-8 bg-amber-50 border border-amber-200/50 rounded-xs p-5">
            <div className="flex gap-3">
              <AlertCircle size={18} className="text-amber-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-amber-800 mb-1.5">Catatan Penting</h4>
                <p className="text-sm text-amber-700 leading-relaxed">
                  Pengurusan surat pengantar{" "}
                  <span className="font-bold">TIDAK DIPUNGUT BIAYA</span>.
                  Warga dihimbau mengurus secara langsung demi kelancaran
                  validasi data kependudukan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
