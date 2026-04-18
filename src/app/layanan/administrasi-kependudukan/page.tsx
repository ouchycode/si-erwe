import {
  FileText,
  CreditCard,
  FileBadge,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileSignature,
} from "lucide-react";

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
  {
    step: "01",
    title: "Siapkan Berkas",
    desc: "Siapkan syarat fotokopi & dokumen asli.",
  },
  {
    step: "02",
    title: "Ketua RT",
    desc: "Minta tanda tangan & stempel pengantar RT.",
  },
  {
    step: "03",
    title: "Ketua RW",
    desc: "Validasi & stempel dari Sekretariat RW.",
  },
  {
    step: "04",
    title: "Kelurahan",
    desc: "Bawa berkas lengkap ke kantor Kelurahan.",
  },
];

export default function AdministrasiKependudukan() {
  return (
    <div className="min-h-screen bg-white pb-20 font-sans">
      {/* HERO */}
      <div className="bg-[#1a3a6b] px-6 md:px-16 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-semibold tracking-widest text-blue-300/70 uppercase mb-4">
            Layanan Warga
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4 tracking-tight">
            Administrasi Kependudukan
          </h1>
          <p className="text-[15px] text-blue-100/80 max-w-xl leading-relaxed">
            Alur, persyaratan, dan panduan pengurusan dokumen kependudukan untuk
            warga RW 12 Kelurahan Kutabumi.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-16 py-16 flex flex-col gap-14">
        {/* ALUR */}
        <div>
          <p className="text-[11px] font-semibold tracking-widest text-gray-400 uppercase mb-6">
            Alur Pengurusan
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 relative">
            {/* connector */}
            <div className="hidden md:block absolute top-5 left-[12.5%] right-[12.5%] h-px bg-gray-100 z-0" />
            {ALUR.map((item) => (
              <div
                key={item.step}
                className="relative z-10 flex flex-col gap-3 bg-[#f8f9fc] border border-gray-100 rounded-md px-5 py-5"
              >
                <span className="text-xs font-bold text-[#1a3a6b] tracking-widest">
                  {item.step}
                </span>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-[12px] text-gray-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PERSYARATAN + SIDEBAR */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Kiri: Persyaratan */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-2.5 mb-2">
              <FileSignature size={18} className="text-[#1a3a6b]" />
              <p className="text-[11px] font-semibold tracking-widest text-gray-400 uppercase">
                Persyaratan Dokumen
              </p>
            </div>

            {LAYANAN.map(({ icon: Icon, judul, syarat }) => (
              <div
                key={judul}
                className="bg-white border border-gray-100 rounded-md p-6"
              >
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                  <div className="w-9 h-9 bg-blue-50 rounded-md flex items-center justify-center shrink-0">
                    <Icon size={17} className="text-[#1a3a6b]" />
                  </div>
                  <h3 className="text-[14.5px] font-bold text-gray-900">
                    {judul}
                  </h3>
                </div>
                <ul className="flex flex-col gap-2.5">
                  {syarat.map((s) => (
                    <li
                      key={s}
                      className="flex items-start gap-2.5 text-[13.5px] text-gray-600"
                    >
                      <CheckCircle2
                        size={15}
                        className="text-[#1a3a6b]/40 shrink-0 mt-0.5"
                      />
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
            <div className="bg-[#1a3a6b] rounded-md p-6 text-white">
              <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-white/10">
                <Clock size={16} className="text-blue-300" />
                <h3 className="text-[13px] font-bold tracking-wide">
                  Jam Layanan Sekretariat RW
                </h3>
              </div>
              <div className="flex flex-col gap-3 text-[12.5px] text-blue-100/80">
                <div className="flex justify-between">
                  <span>Senin – Jumat</span>
                  <span className="font-semibold text-white">
                    19.00 – 22.00
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Sabtu – Minggu</span>
                  <span className="font-semibold text-white">
                    09.00 – 15.00
                  </span>
                </div>
                <div className="flex justify-between pt-3 border-t border-white/10 text-red-300">
                  <span>Hari Libur Nasional</span>
                  <span className="font-bold">Tutup</span>
                </div>
              </div>
            </div>

            {/* Catatan */}
            <div className="bg-amber-50 border border-amber-100 rounded-md p-5">
              <div className="flex gap-3">
                <AlertCircle
                  size={16}
                  className="text-amber-500 shrink-0 mt-0.5"
                />
                <div>
                  <h4 className="text-[13px] font-bold text-amber-800 mb-1.5">
                    Catatan Penting
                  </h4>
                  <p className="text-[12px] text-amber-700 leading-relaxed">
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
