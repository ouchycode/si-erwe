"use client";

import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";

export default function HubungiKami() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Terima kasih! Pesan Anda telah terkirim.");
  };

  return (
    <div className="min-h-screen bg-white pb-20 font-sans">
      {/* HERO */}
      <div className="bg-[#1a3a6b] px-6 md:px-16 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-semibold tracking-widest text-blue-300/70 uppercase mb-4">
            Layanan Warga
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4 tracking-tight">
            Hubungi Kami
          </h1>
          <p className="text-[15px] text-blue-100/80 max-w-xl leading-relaxed">
            Punya pertanyaan, keluhan, atau saran? Hubungi sekretariat RW 12
            melalui formulir atau kontak di bawah ini.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-16 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* FORM */}
          <div className="lg:col-span-3 bg-white border border-gray-100 rounded-md p-6 md:p-8">
            <div className="flex items-center gap-2.5 mb-7 pb-5 border-b border-gray-100">
              <Send size={15} className="text-[#1a3a6b]" />
              <h2 className="text-[13.5px] font-bold text-gray-900">
                Kirim Pesan / Aspirasi
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="nama"
                    className="text-[12px] font-semibold text-gray-500 uppercase tracking-wider"
                  >
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    id="nama"
                    required
                    placeholder="Nama Anda"
                    className="w-full px-4 py-2.5 text-[13.5px] border border-gray-200 rounded-md focus:outline-none focus:border-[#1a3a6b] focus:ring-1 focus:ring-[#1a3a6b]/20 bg-[#f8f9fc] focus:bg-white transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="kontak"
                    className="text-[12px] font-semibold text-gray-500 uppercase tracking-wider"
                  >
                    No. HP / Blok Rumah
                  </label>
                  <input
                    type="text"
                    id="kontak"
                    required
                    placeholder="0812... / Blok A No. 5"
                    className="w-full px-4 py-2.5 text-[13.5px] border border-gray-200 rounded-md focus:outline-none focus:border-[#1a3a6b] focus:ring-1 focus:ring-[#1a3a6b]/20 bg-[#f8f9fc] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="kategori"
                  className="text-[12px] font-semibold text-gray-500 uppercase tracking-wider"
                >
                  Kategori Pesan
                </label>
                <select
                  id="kategori"
                  className="w-full px-4 py-2.5 text-[13.5px] border border-gray-200 rounded-md focus:outline-none focus:border-[#1a3a6b] focus:ring-1 focus:ring-[#1a3a6b]/20 bg-[#f8f9fc] focus:bg-white transition-all text-gray-600"
                >
                  <option value="pertanyaan">Pertanyaan Umum</option>
                  <option value="laporan">Laporan Keluhan / Keamanan</option>
                  <option value="saran">Saran & Masukan</option>
                  <option value="lainnya">Lainnya</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="pesan"
                  className="text-[12px] font-semibold text-gray-500 uppercase tracking-wider"
                >
                  Isi Pesan
                </label>
                <textarea
                  id="pesan"
                  rows={5}
                  required
                  placeholder="Tuliskan detail pesan atau aspirasi Anda..."
                  className="w-full px-4 py-2.5 text-[13.5px] border border-gray-200 rounded-md focus:outline-none focus:border-[#1a3a6b] focus:ring-1 focus:ring-[#1a3a6b]/20 bg-[#f8f9fc] focus:bg-white transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#1a3a6b] hover:bg-[#14306e] text-white text-[13px] font-semibold px-6 py-3 rounded-md border-none cursor-pointer transition-colors"
              >
                Kirim Pesan
                <Send size={14} />
              </button>
            </form>
          </div>

          {/* SIDEBAR */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* Kontak Resmi */}
            <div className="bg-[#1a3a6b] rounded-md p-6 text-white">
              <p className="text-[11px] font-semibold tracking-widest text-white/40 uppercase mb-5">
                Informasi Sekretariat
              </p>
              <div className="flex flex-col gap-5">
                {[
                  {
                    icon: MapPin,
                    label: "Alamat",
                    content: (
                      <p className="text-[13px] text-white/70 leading-relaxed">
                        Gedung Serbaguna RW 12
                        <br />
                        Kel. Kutabumi, Kec. Pasar Kemis
                        <br />
                        Kab. Tangerang, Banten 15560
                      </p>
                    ),
                  },
                  {
                    icon: Phone,
                    label: "WhatsApp / Telepon",
                    content: (
                      <a
                        href="tel:081122223333"
                        className="text-[13.5px] font-semibold text-white hover:text-white/70 no-underline transition-colors"
                      >
                        +62 811-2222-3333
                      </a>
                    ),
                  },
                  {
                    icon: Mail,
                    label: "Email",
                    content: (
                      <a
                        href="mailto:admin@rw12kutabumi.id"
                        className="text-[13.5px] font-semibold text-white hover:text-white/70 no-underline transition-colors"
                      >
                        admin@rw12kutabumi.id
                      </a>
                    ),
                  },
                ].map(({ icon: Icon, label, content }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-white/10 rounded-md flex items-center justify-center shrink-0">
                      <Icon size={14} className="text-white/60" />
                    </div>
                    <div>
                      <p className="text-[10.5px] text-white/40 font-semibold uppercase tracking-widest mb-1">
                        {label}
                      </p>
                      {content}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Jam Operasional */}
            <div className="bg-[#f8f9fc] border border-gray-100 rounded-md p-6">
              <div className="flex items-center gap-2.5 mb-4 pb-4 border-b border-gray-100">
                <Clock size={14} className="text-[#1a3a6b]" />
                <h3 className="text-[13px] font-bold text-gray-900">
                  Jam Operasional
                </h3>
              </div>
              <div className="flex flex-col gap-2.5 text-[12.5px]">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Senin – Jumat</span>
                  <span className="font-bold text-gray-900">19.00 – 22.00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Sabtu – Minggu</span>
                  <span className="font-bold text-gray-900">09.00 – 15.00</span>
                </div>
                <div className="flex justify-between items-center pt-2.5 border-t border-gray-100">
                  <span className="text-gray-400">Hari Libur Nasional</span>
                  <span className="font-bold text-red-400">Tutup</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
