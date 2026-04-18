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
    telp: "110 / (021) 59xxxx",
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
    desc: "Portal utama ditutup pukul 23.00 WIB. Akses di atas jam tersebut hanya melalui pintu utama Blok A yang dijaga petugas keamanan.",
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
  { hari: "Jumat", rt: "RT 09 & RT 10" },
  { hari: "Sabtu", rt: "Pemuda / Karang Taruna", full: true },
  { hari: "Minggu", rt: "Petugas Keamanan Inti", full: true },
];

export default function KeamananWilayah() {
  return (
    <div className="min-h-screen bg-white pb-20 font-sans">
      {/* HERO */}
      <div className="bg-[#1a3a6b] px-6 md:px-16 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-semibold tracking-widest text-blue-300/70 uppercase mb-4">
            Layanan Warga
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4 tracking-tight">
            Keamanan Wilayah RW 12
          </h1>
          <p className="text-[15px] text-blue-100/80 max-w-xl leading-relaxed">
            Sistem informasi keamanan lingkungan terpadu. Hubungi kontak darurat
            jika terjadi gangguan keamanan, ketertiban, atau keadaan darurat
            medis.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-16 py-16 flex flex-col gap-14">
        {/* KONTAK DARURAT */}
        <div>
          <p className="text-[11px] font-semibold tracking-widest text-gray-400 uppercase mb-6">
            Kontak Darurat
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {KONTAK.map(({ label, sub, telp, href, icon: Icon }) => (
              <div
                key={label}
                className="bg-[#f8f9fc] border border-gray-100 rounded-md p-6 flex flex-col gap-4"
              >
                <div className="w-10 h-10 bg-white border border-gray-100 rounded-md flex items-center justify-center">
                  <Icon size={18} className="text-[#1a3a6b]" />
                </div>
                <div>
                  <h3 className="text-[14px] font-bold text-gray-900 mb-0.5">
                    {label}
                  </h3>
                  <p className="text-[12px] text-gray-400">{sub}</p>
                </div>
                <a
                  href={href}
                  className="flex items-center gap-2.5 bg-[#1a3a6b] hover:bg-[#14306e] text-white text-[12.5px] font-semibold px-4 py-2.5 rounded-md no-underline transition-colors mt-auto"
                >
                  <PhoneCall size={13} />
                  {telp}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* TATA TERTIB + JADWAL */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Tata Tertib */}
          <div>
            <div className="flex items-center gap-2.5 mb-6">
              <FileWarning size={16} className="text-[#1a3a6b]" />
              <p className="text-[11px] font-semibold tracking-widest text-gray-400 uppercase">
                Tata Tertib Keamanan
              </p>
            </div>
            <div className="flex flex-col gap-3">
              {TATA_TERTIB.map(({ icon: Icon, judul, desc }) => (
                <div
                  key={judul}
                  className="flex items-start gap-4 bg-[#f8f9fc] border border-gray-100 rounded-md p-5"
                >
                  <div className="w-9 h-9 bg-white border border-gray-100 rounded-md flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-[#1a3a6b]" />
                  </div>
                  <div>
                    <h4 className="text-[13.5px] font-bold text-gray-900 mb-1">
                      {judul}
                    </h4>
                    <p className="text-[12px] text-gray-400 leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Jadwal Siskamling */}
          <div className="bg-[#1a3a6b] rounded-md p-6 md:p-8 text-white">
            <div className="flex items-center gap-2.5 mb-2">
              <ShieldAlert size={16} className="text-blue-300" />
              <h2 className="text-[13px] font-bold tracking-wide">
                Jadwal Ronda / Siskamling
              </h2>
            </div>
            <p className="text-[12px] text-blue-100/70 mb-6 leading-relaxed">
              Tugas ronda malam setiap blok/RT mulai pukul 23.00 – 04.00 WIB.
            </p>

            <div className="grid grid-cols-2 gap-2">
              {JADWAL.map((item) => (
                <div
                  key={item.hari}
                  className={`p-3 rounded-md border border-white/10 bg-white/5 ${item.full ? "col-span-2 bg-white/10" : ""}`}
                >
                  <p className="text-[10.5px] text-blue-300/80 font-bold uppercase tracking-wider mb-0.5">
                    {item.hari}
                  </p>
                  <p className="text-[13px] font-semibold text-white">
                    {item.rt}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
