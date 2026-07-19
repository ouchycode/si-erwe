import { PageHeader } from "@/components/ui/PageHeader";
import { Calendar, MapPin, Clock, Users, Activity, HeartPulse } from "lucide-react";

export const metadata = { title: "Layanan Posyandu" };



export default function PosyanduPage() {
  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans">
      <PageHeader
        category="Layanan Warga"
        title="Pos Pelayanan Terpadu (Posyandu)"
        description="Fasilitas pelayanan kesehatan dasar bagi ibu, anak, balita, serta lanjut usia (lansia) di lingkungan RW 04."
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Posyandu Balita */}
            <div className="bg-white border border-slate-100 rounded-xs p-6 md:p-8 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-pink-50 text-pink-500 rounded-full flex items-center justify-center shrink-0">
                  <HeartPulse size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Posyandu Balita & Ibu Hamil</h2>
                  <p className="text-sm text-gray-500 mt-1">Layanan kesehatan dan pemantauan tumbuh kembang anak.</p>
                </div>
              </div>

              <div className="space-y-4 text-sm text-gray-600 leading-relaxed mb-6">
                <p>
                  Posyandu Balita RW 04 berfokus pada pemantauan gizi, penimbangan berat badan, pengukuran tinggi badan, serta pemberian imunisasi rutin bagi balita. Kami juga menyediakan konsultasi gizi dasar bagi ibu hamil dan menyusui.
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Penimbangan BB dan pengukuran TB secara rutin.</li>
                  <li>Pemberian makanan tambahan (PMT) bergizi.</li>
                  <li>Pemberian Vitamin A (Februari & Agustus).</li>
                  <li>Layanan imunisasi dasar lengkap sesuai jadwal.</li>
                </ul>
              </div>

              <div className="bg-slate-50 rounded-xs p-4 flex flex-col md:flex-row gap-4 md:items-center justify-between border border-slate-100">
                <div className="flex items-center gap-3">
                  <Calendar size={18} className="text-brand-primary" />
                  <div>
                    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Jadwal Rutin</p>
                    <p className="font-semibold text-slate-700 text-sm">Minggu ke-2 Setiap Bulan</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={18} className="text-brand-primary" />
                  <div>
                    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Waktu Pelayanan</p>
                    <p className="font-semibold text-slate-700 text-sm">08:00 - 11:00 WIB</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Posyandu Lansia */}
            <div className="bg-white border border-slate-100 rounded-xs p-6 md:p-8 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center shrink-0">
                  <Activity size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Posyandu Lansia</h2>
                  <p className="text-sm text-gray-500 mt-1">Pemeliharaan kesehatan khusus warga lanjut usia.</p>
                </div>
              </div>

              <div className="space-y-4 text-sm text-gray-600 leading-relaxed mb-6">
                <p>
                  Posyandu Lansia RW 04 didedikasikan untuk memantau kesehatan para warga lanjut usia. Kader kami bekerjasama dengan puskesmas setempat untuk memberikan pengecekan dasar demi menjaga kualitas hidup lansia.
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Pengecekan Tekanan Darah (Tensi).</li>
                  <li>Cek Gula Darah, Asam Urat, dan Kolesterol (Terjadwal).</li>
                  <li>Konsultasi kesehatan ringan.</li>
                  <li>Senam lansia rutin untuk kebugaran.</li>
                </ul>
              </div>

              <div className="bg-slate-50 rounded-xs p-4 flex flex-col md:flex-row gap-4 md:items-center justify-between border border-slate-100">
                <div className="flex items-center gap-3">
                  <Calendar size={18} className="text-brand-primary" />
                  <div>
                    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Jadwal Rutin</p>
                    <p className="font-semibold text-slate-700 text-sm">Minggu ke-4 Setiap Bulan</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={18} className="text-brand-primary" />
                  <div>
                    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Waktu Pelayanan</p>
                    <p className="font-semibold text-slate-700 text-sm">08:00 - 11:00 WIB</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Location Info */}
            <div className="bg-brand-primary text-white p-6 rounded-xs shadow-md">
              <h3 className="font-bold text-lg mb-4">Informasi Lokasi</h3>
              <div className="flex gap-3 mb-4">
                <MapPin size={20} className="shrink-0 text-white/70" />
                <div>
                  <p className="font-semibold text-sm mb-1">Gedung Posyandu RW 04</p>
                  <p className="text-xs text-white/70 leading-relaxed">Jl. Pabuaran Raya (Sebelah Lapangan Serbaguna), Kel. Pabuaran, Kec. Karawaci.</p>
                </div>
              </div>
              <p className="text-[11px] text-white/60 leading-relaxed bg-black/10 p-3 rounded-xs border border-white/10">
                Harap membawa Buku KIA (Kesehatan Ibu dan Anak) atau KMS (Kartu Menuju Sehat) saat datang ke posyandu.
              </p>
            </div>

            {/* Kader Section */}
            <div className="bg-white border border-slate-100 rounded-xs p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Users size={18} className="text-brand-primary" />
                <h3 className="font-bold text-slate-800">Kader Posyandu</h3>
              </div>
              <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                Silakan hubungi koordinator kader posyandu untuk informasi atau pertanyaan lebih lanjut.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-slate-100 rounded-xs">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">Ibu Siti Aminah</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Koordinator Balita</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border border-slate-100 rounded-xs">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">Ibu Nurhayati</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Koordinator Lansia</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
