import {
  Heart,
  Phone,
  ClipboardList,
  UserCheck,
  MapPin,
  Info,
  CheckCircle2,
  AlertCircle,
  Truck,
} from "lucide-react";

const ALUR = [
  {
    step: "01",
    icon: UserCheck,
    title: "Lapor Ketua RT",
    desc: "Segera melapor ke Ketua RT setempat untuk pendataan awal dan meminta surat pengantar kematian.",
  },
  {
    step: "02",
    icon: Truck,
    title: "Hubungi Admin RUKEM",
    desc: "Menghubungi petugas RUKEM untuk koordinasi bantuan kain kafan, pemandian, dan ambulans.",
  },
  {
    step: "03",
    icon: MapPin,
    title: "Pengurusan Makam",
    desc: "Koordinasi dengan petugas TPU setempat mengenai lokasi dan waktu pemakaman jenazah.",
  },
];

const MANFAAT = [
  "Layanan Ambulans RW",
  "Kain Kafan Lengkap",
  "Pemandian Jenazah",
  "Tenda & Kursi Duka",
  "Bantuan Gali Kubur",
  "Santunan Dana Duka",
];

export default function RukunKematian() {
  return (
    <div className="min-h-screen bg-white pb-20 font-sans">
      {/* HERO */}
      <div className="bg-[#1a3a6b] px-6 md:px-16 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-semibold tracking-widest text-blue-300/70 uppercase mb-4">
            Sosial Kemanusiaan
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4 tracking-tight">
            Layanan Rukun Kematian
          </h1>
          <p className="text-[15px] text-blue-100/80 max-w-xl leading-relaxed">
            Wujud kepedulian sesama warga RW 12 Kutabumi — membantu
            memfasilitasi pengurusan jenazah dan santunan duka bagi keluarga
            anggota RUKEM.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-16 py-16 flex flex-col gap-12">
        {/* KONTAK DARURAT */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 bg-[#f8f9fc] border border-gray-100 rounded-md p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-white border border-gray-100 rounded-md flex items-center justify-center shrink-0">
              <Phone size={16} className="text-[#1a3a6b]" />
            </div>
            <div>
              <h2 className="text-[14px] font-bold text-gray-900 mb-0.5">
                Layanan Kedukaan RW 12
              </h2>
              <p className="text-[12.5px] text-gray-400 leading-relaxed max-w-md">
                Hubungi kontak berikut jika ada anggota keluarga atau tetangga
                yang meninggal dunia.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2.5 w-full md:w-auto shrink-0">
            <a
              href="tel:0812XXXXXXX"
              className="inline-flex items-center justify-center gap-2 bg-[#1a3a6b] hover:bg-[#14306e] text-white text-[12.5px] font-semibold px-5 py-2.5 rounded-md no-underline transition-colors"
            >
              <Phone size={13} />
              Call Center RUKEM
            </a>
            <a
              href="https://wa.me/62812XXXXXXX"
              className="inline-flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-gray-400 text-gray-700 text-[12.5px] font-semibold px-5 py-2.5 rounded-md no-underline transition-colors"
            >
              WhatsApp Admin
            </a>
          </div>
        </div>

        {/* ALUR PROSEDUR */}
        <div>
          <div className="flex items-center gap-2.5 mb-6">
            <ClipboardList size={16} className="text-[#1a3a6b]" />
            <p className="text-[11px] font-semibold tracking-widest text-gray-400 uppercase">
              Prosedur Pelaporan Kematian
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {ALUR.map(({ step, icon: Icon, title, desc }) => (
              <div
                key={step}
                className="bg-[#f8f9fc] border border-gray-100 rounded-md p-6 flex flex-col gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-white border border-gray-100 rounded-md flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-[#1a3a6b]" />
                  </div>
                  <span className="text-[11px] font-bold text-gray-300 tracking-widest">
                    LANGKAH {step}
                  </span>
                </div>
                <div>
                  <h4 className="text-[13.5px] font-bold text-gray-900 mb-1">
                    {title}
                  </h4>
                  <p className="text-[12px] text-gray-400 leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MANFAAT + INFO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Manfaat */}
          <div className="bg-white border border-gray-100 rounded-md p-6">
            <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-gray-100">
              <CheckCircle2 size={15} className="text-[#1a3a6b]" />
              <h3 className="text-[13px] font-bold text-gray-900">
                Fasilitas & Manfaat Anggota
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {MANFAAT.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2.5 bg-[#f8f9fc] border border-gray-100 rounded-md px-4 py-3 text-[12.5px] text-gray-700 font-medium"
                >
                  <CheckCircle2
                    size={13}
                    className="text-[#1a3a6b]/40 shrink-0"
                  />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Info Keanggotaan */}
          <div className="bg-white border border-gray-100 rounded-md p-6 flex flex-col gap-5">
            <div className="flex items-center gap-2.5">
              <Info size={15} className="text-[#1a3a6b]" />
              <h3 className="text-[13px] font-bold text-gray-900">
                Informasi Keanggotaan
              </h3>
            </div>
            <p className="text-[12.5px] text-gray-500 leading-relaxed">
              Keanggotaan RUKEM bersifat sukarela bagi seluruh warga yang
              berdomisili di wilayah RW 12 Kutabumi.
            </p>

            {/* Iuran */}
            <div className="bg-[#f8f9fc] border border-gray-100 rounded-md p-5">
              <p className="text-[10.5px] font-semibold tracking-widest text-gray-400 uppercase mb-2">
                Iuran Anggota
              </p>
              <div className="flex items-baseline gap-1.5 mb-2">
                <span className="text-2xl font-bold text-[#1a3a6b]">
                  Rp 10.000
                </span>
                <span className="text-[12px] text-gray-400">/ Bulan / KK</span>
              </div>
              <p className="text-[12px] text-gray-400 leading-relaxed">
                Dana dikelola secara transparan dan dilaporkan setiap bulan
                dalam rapat rutin pengurus RW.
              </p>
            </div>

            {/* Syarat */}
            <div className="flex items-start gap-3">
              <AlertCircle
                size={14}
                className="text-amber-400 shrink-0 mt-0.5"
              />
              <p className="text-[12px] text-gray-400 leading-relaxed">
                Syarat pendaftaran: cukup menyerahkan fotokopi Kartu Keluarga
                (KK) kepada Koordinator RUKEM atau Ketua RT setempat.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
