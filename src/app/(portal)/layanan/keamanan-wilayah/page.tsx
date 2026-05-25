import {
  ShieldAlert,
  PhoneCall,
  Siren,
  Clock,
  Users,
  AlertTriangle,
  FileWarning,
  Video,
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";

const KONTAK = [
  {
    label: "Pos Keamanan RW 12",
    sub: "Siaga 24 jam untuk wilayah Kutabumi",
    telp: "0812-3456-7890",
    href: "tel:081234567890",
    icon: ShieldAlert,
  },
  {
    label: "Polsek Pasar Kemis",
    sub: "Tindak kriminal & gangguan kamtibmas",
    telp: "110 / (021) 4527xxx",
    href: "tel:110",
    icon: Siren,
  },
  {
    label: "Ambulans & Damkar",
    sub: "Kondisi darurat medis & kebakaran",
    telp: "112 / 119",
    href: "tel:112",
    icon: AlertTriangle,
  },
];

const TATA_TERTIB = [
  {
    icon: Users,
    judul: "Tamu 1x24 Jam Wajib Lapor",
    desc: "Warga yang menerima tamu atau kerabat menginap lebih dari 1x24 jam wajib melapor kepada Ketua RT setempat dengan membawa fotokopi KTP tamu.",
  },
  {
    icon: Clock,
    judul: "Jam Malam & Akses Portal",
    desc: "Portal utama ditutup pukul 23.00 WIB. Akses di atas jam tersebut hanya melalui pintu utama yang dijaga petugas keamanan.",
  },
  {
    icon: Video,
    judul: "Pemantauan CCTV 24 Jam",
    desc: "Lingkungan RW 12 dipantau kamera CCTV di titik-titik rawan. Permintaan rekaman dapat diajukan melalui petugas keamanan sesuai SOP.",
  },
];

const JADWAL = [
  { hari: "Senin", rt: "RT 01 & RT 02" },
  { hari: "Selasa", rt: "RT 03 & RT 04" },
  { hari: "Rabu", rt: "RT 05 & RT 06" },
  { hari: "Kamis", rt: "RT 07 & RT 08" },
  { hari: "Jumat", rt: "RT 01 – RT 08 (Giliran)" },
  { hari: "Sabtu", rt: "Pemuda / Karang Taruna", full: true },
  { hari: "Minggu", rt: "Petugas Keamanan Inti", full: true },
];

export default function KeamananWilayah() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <PageHeader
        category="Layanan Warga"
        title="Keamanan Wilayah RW 12"
        description="Sistem informasi keamanan lingkungan terpadu. Hubungi kontak darurat jika terjadi gangguan keamanan, ketertiban, atau keadaan darurat medis."
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-16 relative z-10 flex flex-col gap-8 pb-20">
        {/* KONTAK DARURAT */}
        <div className="bg-white rounded-xs border border-gray-200 shadow-sm p-8">
          <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-6">
            Kontak Darurat
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {KONTAK.map(({ label, sub, telp, href, icon: Icon}) => (
              <div
                key={label}
                className="group bg-gray-50 border border-gray-200 rounded-xs p-6 flex flex-col gap-4 hover:bg-white hover:shadow-md transition-all duration-300"
              >
                <div className={`w-11 h-11 rounded-xs flex items-center justify-center shrink-0 icon-badge shadow-sm`}>
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-1">{label}</h3>
                  <p className="text-sm text-gray-500">{sub}</p>
                </div>
                <a
                  href={href}
                  className="flex items-center gap-2.5 bg-brand-primary hover:bg-brand-primary-hover text-white text-sm font-bold px-4 py-2.5 rounded-xs no-underline transition-colors mt-auto"
                >
                  <PhoneCall size={14} />
                  {telp}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* TATA TERTIB + JADWAL */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Tata Tertib */}
          <div className="bg-white rounded-xs border border-gray-200 shadow-sm p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 bg-brand-primary border border-brand-primary-hover rounded-xs flex items-center justify-center shrink-0 shadow-sm text-white">
                <FileWarning size={16} />
              </div>
              <p className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                Tata Tertib Keamanan
              </p>
            </div>
            <div className="flex flex-col gap-4">
              {TATA_TERTIB.map(({ icon: Icon, judul, desc}) => (
                <div key={judul} className="group flex items-start gap-4 bg-gray-50 border border-gray-200 rounded-xs p-5 hover:bg-white hover:shadow-sm transition-all duration-200">
                  <div className={`w-9 h-9 rounded-xs flex items-center justify-center shrink-0 icon-badge shadow-sm`}>
                    <Icon size={16} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 mb-1">{judul}</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Jadwal Siskamling */}
          <div className="bg-brand-primary rounded-xs border border-brand-primary-hover p-8 text-white shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 bg-white/10 rounded-xs flex items-center justify-center shrink-0">
                <ShieldAlert size={16} className="text-blue-300" />
              </div>
              <h2 className="text-base font-bold tracking-wide">Jadwal Ronda / Siskamling</h2>
            </div>
            <p className="text-sm text-blue-100/70 mb-6 leading-relaxed ml-12">
              Tugas ronda malam setiap blok/RT mulai pukul 23.00 – 04.00 WIB.
            </p>

            <div className="grid grid-cols-2 gap-2">
              {JADWAL.map((item) => (
                <div
                  key={item.hari}
                  className={`p-3 rounded-xs border border-white/10 bg-white/5 ${item.full ? "col-span-2 bg-white/10" : ""}`}
                >
                  <p className="text-[10px] text-blue-300/80 font-bold uppercase tracking-wider mb-0.5">
                    {item.hari}
                  </p>
                  <p className="text-sm font-bold text-white">{item.rt}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
