import {
  FileText,
  CreditCard,
  FileBadge,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileSignature,
  Send,
  UserRound,
  MapPin,
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata = { title: "Administrasi Kependudukan" };



const LAYANAN = [
  {
    icon: FileText,
    judul: "Surat Pengantar RT/RW",
    syarat: ["Fotokopi Kartu Keluarga (KK)", "Fotokopi KTP Pemohon"],
  },
  {
    icon: CreditCard,
    judul: "Pembuatan / Perpanjang KTP",
    syarat: [
      "Surat Pengantar dari RT & RW",
      "Fotokopi Kartu Keluarga (KK)",
      "Telah berusia 17 tahun (untuk KTP baru)",
      "Surat Keterangan Kehilangan dari Kepolisian (jika KTP hilang)",
    ],
  },
  {
    icon: FileBadge,
    judul: "Pembuatan Kartu Keluarga (KK)",
    syarat: [
      "Surat Pengantar dari RT & RW",
      "KK Asli Lama (untuk pembaruan data)",
      "Fotokopi Buku Nikah / Akta Perkawinan (bagi yang baru menikah)",
      "Surat Pindah (bagi warga pendatang)",
    ],
  },
];

const ALUR = [
  { step: "01", title: "Siapkan Berkas", desc: "Siapkan syarat fotokopi & dokumen asli." },
  { step: "02", title: "Ketua RT", desc: "Minta tanda tangan & stempel pengantar RT." },
  { step: "03", title: "Ketua RW", desc: "Validasi & stempel dari Sekretariat RW." },
  { step: "04", title: "Kelurahan", desc: "Bawa berkas lengkap ke kantor Kelurahan." },
];

const JENIS_PENGAJUAN = [
  "Surat Pengantar Domisili",
  "Pengantar Pembuatan KTP",
  "Pengantar Pembuatan KK",
  "Surat Keterangan Usaha",
  "Surat Keterangan Tidak Mampu",
  "Surat Pindah / Datang",
  "Lainnya",
];

const RT_LIST = ["RT 01", "RT 02", "RT 03", "RT 04", "RT 05", "RT 06", "RT 07", "RT 08"];

export default function AdministrasiKependudukan() {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <PageHeader
        category="Layanan Warga"
        title="Administrasi Kependudukan"
        description="Alur, persyaratan, dan panduan pengurusan dokumen kependudukan untuk warga RW 04 Pabuaran, Kota Tangerang."
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-16 relative z-10 flex flex-col gap-8 pb-20">
        {/* ALUR */}
        <div className="bg-white rounded-xs border border-slate-100 shadow-sm p-8">
          <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-6">
            Alur Pengurusan
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
            {/* connector line */}
            <div className="hidden md:block absolute top-5 left-[12.5%] right-[12.5%] h-px bg-gray-100 z-0" />
            {ALUR.map((item) => (
              <div
                key={item.step}
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
        </div>

        {/* FORM PENGAJUAN */}
        <div className="bg-white rounded-xs border border-slate-100 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.65fr]">
            <div className="bg-brand-primary text-white p-6 md:p-8 flex flex-col justify-between gap-8">
              <div>
                <div className="w-10 h-10 bg-white/10 rounded-xs flex items-center justify-center mb-5">
                  <FileSignature size={18} className="text-white/70" />
                </div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-3">
                  Pengajuan Awal
                </p>
                <h2 className="text-2xl font-bold leading-tight mb-3">
                  Form Administrasi Penduduk
                </h2>
                <p className="text-sm text-white/60 leading-relaxed">
                  Isi data dasar pengajuan agar pengurus RT/RW bisa mengecek kebutuhan surat sebelum warga datang membawa berkas.
                </p>
              </div>
              <div className="bg-white/10 border border-white/10 rounded-xs p-4">
                <p className="text-xs font-semibold text-white/60 mb-1">RW Otomatis</p>
                <p className="text-lg font-bold">RW 04 Pabuaran</p>
              </div>
            </div>

            <form action="#" className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <label className="flex flex-col gap-2">
                  <span className="flex items-center gap-2 text-sm font-bold text-slate-700">
                    <UserRound size={14} className="text-brand-primary" />
                    Nama Kepala Keluarga
                  </span>
                  <input
                    name="namaKepalaKeluarga"
                    type="text"
                    placeholder="Contoh: Bapak Ahmad"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xs focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all text-sm"
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="flex items-center gap-2 text-sm font-bold text-slate-700">
                    <UserRound size={14} className="text-brand-primary" />
                    Nama Pemohon
                  </span>
                  <input
                    name="namaPemohon"
                    type="text"
                    placeholder="Nama warga yang mengajukan"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xs focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all text-sm"
                  />
                </label>

                <label className="flex flex-col gap-2 md:col-span-2">
                  <span className="flex items-center gap-2 text-sm font-bold text-slate-700">
                    <FileText size={14} className="text-brand-primary" />
                    Mau Mengajukan Apa?
                  </span>
                  <select
                    name="jenisPengajuan"
                    defaultValue=""
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xs focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all text-sm"
                  >
                    <option value="" disabled>Pilih jenis pengajuan</option>
                    {JENIS_PENGAJUAN.map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                </label>

                <label className="flex flex-col gap-2">
                  <span className="flex items-center gap-2 text-sm font-bold text-slate-700">
                    <MapPin size={14} className="text-brand-primary" />
                    Dari RT Mana?
                  </span>
                  <select
                    name="rt"
                    defaultValue=""
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xs focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all text-sm"
                  >
                    <option value="" disabled>Pilih RT</option>
                    {RT_LIST.map((rt) => (
                      <option key={rt} value={rt}>{rt}</option>
                    ))}
                  </select>
                </label>

                <label className="flex flex-col gap-2">
                  <span className="flex items-center gap-2 text-sm font-bold text-slate-700">
                    <MapPin size={14} className="text-brand-primary" />
                    RW
                  </span>
                  <input type="hidden" name="rw" value="RW 04" />
                  <input
                    type="text"
                    value="RW 04"
                    readOnly
                    disabled
                    className="w-full px-4 py-3 bg-slate-100 border border-slate-100 rounded-xs text-sm font-bold text-slate-500"
                  />
                </label>

                <label className="flex flex-col gap-2 md:col-span-2">
                  <span className="text-sm font-bold text-slate-700">Keterangan Singkat</span>
                  <textarea
                    name="keterangan"
                    rows={4}
                    placeholder="Tulis keperluan singkat, misalnya untuk sekolah, kerja, pindah domisili, atau kebutuhan lainnya."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xs focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all text-sm resize-none"
                  />
                </label>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 pt-6 border-t border-slate-100">
                <p className="text-xs text-gray-500 leading-relaxed max-w-md">
                  Setelah data dikirim, pemohon tetap membawa dokumen asli dan fotokopi saat validasi di RT/RW.
                </p>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-primary-hover text-white text-sm font-bold px-6 py-3 rounded-xs border-none cursor-pointer transition-colors"
                >
                  <Send size={15} />
                  Kirim Pengajuan
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* PERSYARATAN + SIDEBAR */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Kiri: Persyaratan */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 bg-brand-primary border border-brand-primary-hover rounded-xs flex items-center justify-center shrink-0 shadow-sm text-white">
                <FileSignature size={16} />
              </div>
              <h2 className="text-lg font-bold text-slate-800">
                Persyaratan Dokumen
              </h2>
            </div>

            {LAYANAN.map(({ icon: Icon, judul, syarat}) => (
              <div key={judul} className="group bg-white border border-slate-100 rounded-xs p-6 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
                  <div className={`w-10 h-10 rounded-xs flex items-center justify-center shrink-0 icon-badge shadow-sm`}>
                    <Icon size={18} />
                  </div>
                  <h3 className="text-base font-bold text-slate-800">{judul}</h3>
                </div>
                <ul className="flex flex-col gap-3">
                  {syarat.map((s) => (
                    <li key={s} className="flex items-start gap-3 text-sm text-gray-600">
                      <CheckCircle2 size={15} className="text-brand-primary/50 shrink-0 mt-0.5" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Kanan: Sidebar */}
          <div className="flex flex-col gap-4">
            {/* Jam Layanan */}
            <div className="bg-brand-primary rounded-xs border border-brand-primary-hover p-6 text-white shadow-sm">
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/10">
                <div className="w-9 h-9 bg-white/10 rounded-xs flex items-center justify-center shrink-0">
                  <Clock size={16} className="text-white/70" />
                </div>
                <h3 className="text-sm font-bold tracking-wide">Jam Layanan Sekretariat RW</h3>
              </div>
              <div className="flex flex-col gap-3 text-sm text-white/80">
                <div className="flex justify-between">
                  <span>Senin - Jumat</span>
                  <span className="font-bold text-white">19.00 - 22.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Sabtu - Minggu</span>
                  <span className="font-bold text-white">09.00 - 15.00</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-white/10 text-red-300">
                  <span>Hari Libur Nasional</span>
                  <span className="font-bold">Tutup</span>
                </div>
              </div>
            </div>

            {/* Catatan */}
            <div className="bg-amber-50 border border-amber-200 rounded-xs p-5 shadow-sm">
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
        </div>
      </div>
    </div>
  );
}
