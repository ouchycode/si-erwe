import {
  Leaf,
  Trash2,
  Recycle,
  Truck,
  CalendarClock,
  Sprout,
  Droplets,
  AlertOctagon,
  Users,
} from "lucide-react";

const JADWAL_SAMPAH = [
  {
    icon: Sprout,
    judul: "Sampah Basah / Organik",
    sub: "Sisa makanan, dedaunan, sayuran busuk.",
    hari: "Setiap Hari (Pagi)",
    jam: "07.00 – 10.00 WIB",
  },
  {
    icon: Recycle,
    judul: "Sampah Kering / Anorganik",
    sub: "Plastik, kertas, kardus, botol, kaca.",
    hari: "Selasa, Kamis, Sabtu",
    jam: "13.00 – 15.00 WIB",
  },
];

const TATA_TERTIB = [
  {
    icon: Trash2,
    judul: "Gunakan Tong Sampah Tertutup",
    desc: "Setiap rumah wajib memiliki tong sampah di depan rumah yang dilengkapi tutup agar tidak menimbulkan bau dan tidak diacak hewan liar.",
  },
  {
    icon: Droplets,
    judul: "Dilarang Menutup Drainase",
    desc: "Warga yang melakukan renovasi dilarang membuang sisa material ke dalam selokan yang dapat memicu banjir.",
  },
  {
    icon: AlertOctagon,
    judul: "Denda Buang Sampah Sembarangan",
    desc: "Terdapat sanksi denda sosial bagi warga atau pihak luar yang tertangkap CCTV membuang sampah sembarangan di area taman atau jalan.",
  },
];

export default function KebersihanLingkungan() {
  return (
    <div className="min-h-screen bg-white pb-20 font-sans">
      {/* HERO */}
      <div className="bg-[#1a3a6b] px-6 md:px-16 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-semibold tracking-widest text-blue-300/70 uppercase mb-4">
            Layanan Warga
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4 tracking-tight">
            Kebersihan Lingkungan RW 12
          </h1>
          <p className="text-[15px] text-blue-100/80 max-w-xl leading-relaxed">
            Jadwal pengangkutan sampah, program kerja bakti, dan tata tertib
            kebersihan lingkungan warga RW 12 Kutabumi.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-16 py-16 flex flex-col gap-14">
        {/* JADWAL SAMPAH */}
        <div>
          <p className="text-[11px] font-semibold tracking-widest text-gray-400 uppercase mb-6">
            Jadwal Pengangkutan Sampah
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Info utama */}
            <div className="bg-[#1a3a6b] rounded-md p-6 text-white flex flex-col gap-4">
              <div className="w-10 h-10 bg-white/10 rounded-md flex items-center justify-center">
                <Truck size={18} className="text-blue-200" />
              </div>
              <div>
                <h2 className="text-[14px] font-bold mb-1.5">
                  Pengangkutan Rutin
                </h2>
                <p className="text-[12.5px] text-blue-100/70 leading-relaxed">
                  Petugas beroperasi dengan gerobak motor (bentor) mengambil
                  sampah dari tong depan rumah warga.
                </p>
              </div>
              <div className="mt-auto border-t border-white/10 pt-4">
                <p className="text-[11px] text-blue-300/70 font-semibold uppercase tracking-widest mb-1">
                  Iuran Kebersihan
                </p>
                <p className="text-[15px] font-bold">Rp 20.000 / Bulan</p>
              </div>
            </div>

            {/* Jadwal per jenis */}
            {JADWAL_SAMPAH.map(({ icon: Icon, judul, sub, hari, jam }) => (
              <div
                key={judul}
                className="bg-[#f8f9fc] border border-gray-100 rounded-md p-6 flex flex-col gap-4"
              >
                <div className="w-10 h-10 bg-white border border-gray-100 rounded-md flex items-center justify-center">
                  <Icon size={17} className="text-[#1a3a6b]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-[13.5px] font-bold text-gray-900 mb-1">
                    {judul}
                  </h3>
                  <p className="text-[12px] text-gray-400">{sub}</p>
                </div>
                <div className="border-t border-gray-100 pt-4">
                  <p className="text-[10.5px] font-semibold tracking-widest text-gray-400 uppercase mb-1">
                    Jadwal Angkut
                  </p>
                  <p className="text-[13.5px] font-bold text-[#1a3a6b]">
                    {hari}
                  </p>
                  <p className="text-[12px] text-gray-400">{jam}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* KERJA BAKTI + TATA TERTIB */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Kerja Bakti */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5 mb-2">
              <Users size={16} className="text-[#1a3a6b]" />
              <p className="text-[11px] font-semibold tracking-widest text-gray-400 uppercase">
                Gotong Royong & Kerja Bakti
              </p>
            </div>

            <div className="bg-[#f8f9fc] border border-gray-100 rounded-md p-6">
              <div className="flex items-center gap-3 mb-3">
                <CalendarClock size={16} className="text-[#1a3a6b]" />
                <h4 className="text-[13.5px] font-bold text-gray-900">
                  Kerja Bakti Rutin Bulanan
                </h4>
              </div>
              <p className="text-[12.5px] text-gray-500 leading-relaxed mb-4">
                Dilaksanakan serentak di seluruh RT setiap{" "}
                <span className="font-semibold text-gray-700">
                  Minggu pertama awal bulan
                </span>
                . Fokus pembersihan selokan/drainase dan pemangkasan dahan
                pohon.
              </p>
              <div className="inline-flex items-center gap-2 bg-[#1a3a6b]/5 border border-[#1a3a6b]/10 text-[#1a3a6b] text-[11.5px] font-semibold px-3 py-1.5 rounded-md">
                <CalendarClock size={12} />
                Minggu, Pukul 07.00 – Selesai
              </div>
            </div>

            <div className="bg-[#f8f9fc] border border-gray-100 rounded-md p-6">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 bg-white border border-gray-100 rounded-md flex items-center justify-center shrink-0">
                  <Leaf size={15} className="text-[#1a3a6b]" />
                </div>
                <div>
                  <h4 className="text-[13.5px] font-bold text-gray-900 mb-1.5">
                    Program Penghijauan (KWT)
                  </h4>
                  <p className="text-[12px] text-gray-400 leading-relaxed">
                    Ibu-ibu PKK dan Kelompok Wanita Tani (KWT) RW 12 mengelola
                    bank sampah dan apotek hidup di area fasum Blok C. Warga
                    dapat berpartisipasi setiap hari Jumat sore.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tata Tertib */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5 mb-2">
              <AlertOctagon size={16} className="text-[#1a3a6b]" />
              <p className="text-[11px] font-semibold tracking-widest text-gray-400 uppercase">
                Tata Tertib Lingkungan
              </p>
            </div>

            {TATA_TERTIB.map(({ icon: Icon, judul, desc }) => (
              <div
                key={judul}
                className="flex items-start gap-4 bg-[#f8f9fc] border border-gray-100 rounded-md p-5"
              >
                <div className="w-9 h-9 bg-white border border-gray-100 rounded-md flex items-center justify-center shrink-0">
                  <Icon size={15} className="text-[#1a3a6b]" />
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
      </div>
    </div>
  );
}
