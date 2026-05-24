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
import { PageHeader } from "@/components/ui/PageHeader";

const JADWAL_SAMPAH = [
  {
    icon: Sprout,
    judul: "Sampah Basah / Organik",
    sub: "Sisa makanan, dedaunan, sayuran busuk.",
    hari: "Setiap Hari (Pagi)",
    jam: "07.00 – 10.00 WIB",
    color: "text-emerald-700",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
  },
  {
    icon: Recycle,
    judul: "Sampah Kering / Anorganik",
    sub: "Plastik, kertas, kardus, botol, kaca.",
    hari: "Selasa, Kamis, Sabtu",
    jam: "13.00 – 15.00 WIB",
    color: "text-blue-700",
    bg: "bg-blue-50",
    border: "border-blue-100",
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
    <div className="min-h-screen bg-gray-50 pb-20">
      <PageHeader
        category="Layanan Warga"
        title="Kebersihan Lingkungan RW 12"
        description="Jadwal pengangkutan sampah, program kerja bakti, dan tata tertib kebersihan lingkungan warga RW 12 Kutabumi, Kab. Tangerang."
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-16 relative z-10 flex flex-col gap-8 pb-20">
        {/* JADWAL SAMPAH */}
        <div className="bg-white rounded-xs border border-gray-200 shadow-sm p-8">
          <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-6">
            Jadwal Pengangkutan Sampah
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Info Utama */}
            <div className="bg-brand-primary rounded-xs border border-brand-primary-hover p-6 text-white flex flex-col gap-4">
              <div className="w-10 h-10 bg-white/10 rounded-xs flex items-center justify-center">
                <Truck size={20} className="text-blue-200" />
              </div>
              <div>
                <h2 className="text-base font-bold mb-2">Pengangkutan Rutin</h2>
                <p className="text-sm text-blue-100/70 leading-relaxed">
                  Petugas beroperasi dengan gerobak motor (bentor) mengambil
                  sampah dari tong depan rumah warga.
                </p>
              </div>
              <div className="mt-auto border-t border-white/10 pt-4">
                <p className="text-[10px] text-blue-300/80 font-bold uppercase tracking-widest mb-1">
                  Iuran Kebersihan
                </p>
                <p className="text-lg font-extrabold">Rp 20.000 / Bulan</p>
              </div>
            </div>

            {/* Jadwal per jenis */}
            {JADWAL_SAMPAH.map(({ icon: Icon, judul, sub, hari, jam, color, bg, border }) => (
              <div
                key={judul}
                className="bg-gray-50 border border-gray-200 rounded-xs p-6 flex flex-col gap-4"
              >
                <div className={`w-10 h-10 rounded-xs border flex items-center justify-center ${bg} ${border}`}>
                  <Icon size={18} className={color} />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-bold text-gray-900 mb-1">{judul}</h3>
                  <p className="text-sm text-gray-500">{sub}</p>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-1">
                    Jadwal Angkut
                  </p>
                  <p className="text-sm font-bold text-brand-primary">{hari}</p>
                  <p className="text-sm text-gray-500">{jam}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* KERJA BAKTI + TATA TERTIB */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Kerja Bakti */}
          <div className="bg-white rounded-xs border border-gray-200 shadow-sm p-8 flex flex-col gap-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 bg-emerald-50 border border-emerald-100 rounded-xs flex items-center justify-center shrink-0">
                <Users size={16} className="text-emerald-700" />
              </div>
              <p className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                Gotong Royong & Kerja Bakti
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-xs p-5">
              <div className="flex items-center gap-3 mb-3">
                <CalendarClock size={16} className="text-brand-primary" />
                <h4 className="text-sm font-bold text-gray-900">Kerja Bakti Rutin Bulanan</h4>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Dilaksanakan serentak di seluruh RT setiap{" "}
                <span className="font-bold text-gray-800">Minggu pertama awal bulan</span>.
                Fokus pembersihan selokan/drainase dan pemangkasan dahan pohon.
              </p>
              <div className="inline-flex items-center gap-2 bg-brand-light border border-brand-primary/20 text-brand-primary text-xs font-bold px-3 py-1.5 rounded-xs">
                <CalendarClock size={12} />
                Minggu, Pukul 07.00 – Selesai
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-xs p-5">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 bg-emerald-50 border border-emerald-100 rounded-xs flex items-center justify-center shrink-0">
                  <Leaf size={15} className="text-emerald-700" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-1.5">Program Penghijauan (KWT)</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Ibu-ibu PKK dan Kelompok Wanita Tani (KWT) RW 12 mengelola bank sampah dan apotek hidup.
                    Warga dapat berpartisipasi setiap hari Jumat sore.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tata Tertib */}
          <div className="bg-white rounded-xs border border-gray-200 shadow-sm p-8 flex flex-col gap-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 bg-orange-50 border border-orange-100 rounded-xs flex items-center justify-center shrink-0">
                <AlertOctagon size={16} className="text-orange-700" />
              </div>
              <p className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                Tata Tertib Lingkungan
              </p>
            </div>

            {TATA_TERTIB.map(({ icon: Icon, judul, desc }) => (
              <div key={judul} className="flex items-start gap-4 bg-gray-50 border border-gray-200 rounded-xs p-5">
                <div className="w-9 h-9 bg-white border border-gray-200 rounded-xs flex items-center justify-center shrink-0">
                  <Icon size={15} className="text-brand-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-1">{judul}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
