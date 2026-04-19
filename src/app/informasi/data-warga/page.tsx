"use client";

import { useState } from "react";
import {
  Users,
  Search,
  Filter,
  Baby,
  User,
  UserCheck,
  HeartPulse,
  Eye,
  LayoutGrid,
  FileSpreadsheet,
  X,
  MapPin,
  Activity,
} from "lucide-react";

const DATA_WARGA = [
  {
    id: 1,
    nama: "Arsyad Maulana",
    rt: "01",
    gender: "Laki-laki",
    umur: 4,
    kategori: "Balita",
    status: "Aktif Posyandu",
  },
  {
    id: 2,
    nama: "Siti Aminah",
    rt: "02",
    gender: "Perempuan",
    umur: 68,
    kategori: "Lansia",
    status: "Penerima Bansos",
  },
  {
    id: 3,
    nama: "Budi Setiawan",
    rt: "01",
    gender: "Laki-laki",
    umur: 42,
    kategori: "Dewasa",
    status: "Kepala Keluarga",
  },
  {
    id: 4,
    nama: "Rizky Amalia",
    rt: "03",
    gender: "Perempuan",
    umur: 17,
    kategori: "Remaja",
    status: "Karang Taruna",
  },
  {
    id: 5,
    nama: "Dinda Permata",
    rt: "02",
    gender: "Perempuan",
    umur: 2,
    kategori: "Balita",
    status: "Aktif Posyandu",
  },
  {
    id: 6,
    nama: "H. Slamet",
    rt: "04",
    gender: "Laki-laki",
    umur: 62,
    kategori: "Lansia",
    status: "Tokoh Masyarakat",
  },
  {
    id: 7,
    nama: "Kevin Ardiansyah",
    rt: "01",
    gender: "Laki-laki",
    umur: 20,
    kategori: "Remaja",
    status: "Mahasiswa",
  },
  {
    id: 8,
    nama: "Dewi Lestari",
    rt: "03",
    gender: "Perempuan",
    umur: 35,
    kategori: "Dewasa",
    status: "Kader PKK",
  },
];

const KATEGORI_BADGE: Record<string, string> = {
  Balita: "bg-green-50 text-green-700",
  Remaja: "bg-blue-50 text-blue-700",
  Dewasa: "bg-indigo-50 text-indigo-700",
  Lansia: "bg-amber-50 text-amber-700",
};

const STATS = [
  { label: "Balita", value: 42, icon: Baby },
  { label: "Remaja", value: 128, icon: User },
  { label: "Dewasa", value: 450, icon: UserCheck },
  { label: "Lansia", value: 35, icon: HeartPulse },
];

export default function DataWarga() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRT, setFilterRT] = useState("Semua");
  const [filterKategori, setFilterKategori] = useState("Semua");
  const [selectedWarga, setSelectedWarga] = useState<
    (typeof DATA_WARGA)[0] | null
  >(null);

  const filteredWarga = DATA_WARGA.filter((w) => {
    const matchSearch = w.nama.toLowerCase().includes(searchTerm.toLowerCase());
    const matchRT = filterRT === "Semua" || w.rt === filterRT;
    const matchKat =
      filterKategori === "Semua" || w.kategori === filterKategori;
    return matchSearch && matchRT && matchKat;
  });

  return (
    <div className="min-h-screen bg-white pb-20 font-sans">
      {/* HERO */}
      <div className="bg-[#1a3a6b] px-6 md:px-16 py-16 md:py-20">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-semibold tracking-widest text-blue-300/70 uppercase mb-4">
            Data Kependudukan
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4 tracking-tight">
            Direktori Warga RW 12
          </h1>
          <p className="text-[15px] text-blue-100/80 max-w-xl leading-relaxed">
            Sistem pendataan terpadu untuk kebutuhan administrasi, PKK,
            Posyandu, dan bantuan sosial warga RW 12 Kutabumi.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-16 py-12 flex flex-col gap-6">
        {/* STATS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {STATS.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="bg-[#f8f9fc] border border-gray-100 rounded-md p-4 flex items-center gap-3"
            >
              <div className="w-9 h-9 bg-white border border-gray-100 rounded-md flex items-center justify-center shrink-0">
                <Icon size={16} className="text-[#1a3a6b]" />
              </div>
              <div>
                <p className="text-[10.5px] text-gray-400 font-semibold uppercase tracking-widest">
                  {label}
                </p>
                <p className="text-xl font-bold text-gray-900">{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* FILTER */}
        <div className="bg-[#f8f9fc] border border-gray-100 rounded-md p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="md:col-span-2 relative">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300"
              />
              <input
                type="text"
                placeholder="Cari nama warga..."
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-md focus:border-[#1a3a6b] focus:ring-1 focus:ring-[#1a3a6b]/10 outline-none text-[13px] transition-all"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <Filter
                size={13}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300"
              />
              <select
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-md outline-none text-[13px] appearance-none text-gray-600 transition-all focus:border-[#1a3a6b]"
                onChange={(e) => setFilterRT(e.target.value)}
              >
                <option value="Semua">Semua RT</option>
                {["01", "02", "03", "04"].map((rt) => (
                  <option key={rt} value={rt}>
                    RT {rt}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative">
              <LayoutGrid
                size={13}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300"
              />
              <select
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-md outline-none text-[13px] appearance-none text-gray-600 transition-all focus:border-[#1a3a6b]"
                onChange={(e) => setFilterKategori(e.target.value)}
              >
                <option value="Semua">Semua Usia</option>
                {["Balita", "Anak-anak", "Remaja", "Dewasa", "Lansia"].map(
                  (k) => (
                    <option key={k} value={k}>
                      {k}
                    </option>
                  ),
                )}
              </select>
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white border border-gray-100 rounded-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-175">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-6 py-3.5 text-[11px] font-semibold text-gray-400 uppercase tracking-widest">
                    Nama Warga
                  </th>
                  <th className="px-6 py-3.5 text-[11px] font-semibold text-gray-400 uppercase tracking-widest">
                    RT
                  </th>
                  <th className="px-6 py-3.5 text-[11px] font-semibold text-gray-400 uppercase tracking-widest">
                    Umur
                  </th>
                  <th className="px-6 py-3.5 text-[11px] font-semibold text-gray-400 uppercase tracking-widest">
                    Kategori
                  </th>
                  <th className="px-6 py-3.5 text-[11px] font-semibold text-gray-400 uppercase tracking-widest text-center">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredWarga.map((warga) => (
                  <tr
                    key={warga.id}
                    className="hover:bg-[#f8f9fc] transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-50 text-[#1a3a6b] rounded-md flex items-center justify-center font-bold text-[12px] shrink-0">
                          {warga.nama.charAt(0)}
                        </div>
                        <span className="text-[13.5px] font-semibold text-gray-900">
                          {warga.nama}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[13px] text-gray-500">
                      RT {warga.rt}
                    </td>
                    <td className="px-6 py-4 text-[13px] text-gray-500">
                      {warga.umur} Tahun
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-sm text-[11px] font-semibold uppercase tracking-wide ${KATEGORI_BADGE[warga.kategori] ?? "bg-gray-100 text-gray-600"}`}
                      >
                        {warga.kategori}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => setSelectedWarga(warga)}
                        className="inline-flex items-center gap-1.5 bg-[#f8f9fc] hover:bg-[#1a3a6b] text-[#1a3a6b] hover:text-white border border-gray-100 hover:border-[#1a3a6b] px-3 py-1.5 rounded-md text-[11.5px] font-semibold transition-colors cursor-pointer"
                      >
                        <Eye size={13} /> Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredWarga.length === 0 && (
            <div className="py-16 text-center">
              <Users size={36} className="mx-auto text-gray-200 mb-3" />
              <p className="text-[13px] text-gray-400">
                Data warga tidak ditemukan.
              </p>
            </div>
          )}

          <div className="px-6 py-3.5 border-t border-gray-100 bg-[#f8f9fc] flex justify-between items-center">
            <p className="text-[12px] text-gray-400">
              Menampilkan{" "}
              <span className="font-semibold text-gray-700">
                {filteredWarga.length}
              </span>{" "}
              data warga
            </p>
            <button className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#1a3a6b] hover:opacity-70 bg-transparent border-none cursor-pointer transition-opacity">
              <FileSpreadsheet size={14} /> Export ke Excel
            </button>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {selectedWarga && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30"
          onClick={() => setSelectedWarga(null)}
        >
          <div
            className="bg-white rounded-md w-full max-w-md overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-[#1a3a6b] px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <User size={15} className="text-white/70" />
                <h3 className="text-[13px] font-bold text-white">
                  Profil Warga
                </h3>
              </div>
              <button
                onClick={() => setSelectedWarga(null)}
                className="text-white/50 hover:text-white bg-transparent border-none cursor-pointer p-1 rounded-md hover:bg-white/10 transition-colors"
              >
                <X size={17} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 flex flex-col gap-5">
              <div className="flex items-center gap-4 pb-5 border-b border-gray-100">
                <div className="w-12 h-12 bg-blue-50 text-[#1a3a6b] rounded-md flex items-center justify-center font-bold text-lg shrink-0">
                  {selectedWarga.nama.charAt(0)}
                </div>
                <div>
                  <h2 className="text-[15px] font-bold text-gray-900">
                    {selectedWarga.nama}
                  </h2>
                  <p className="text-[12px] text-gray-400">
                    Wilayah RT {selectedWarga.rt}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Usia", value: `${selectedWarga.umur} Tahun` },
                  { label: "Jenis Kelamin", value: selectedWarga.gender },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="bg-[#f8f9fc] border border-gray-100 rounded-md p-3"
                  >
                    <p className="text-[10.5px] text-gray-400 font-semibold uppercase tracking-widest mb-1">
                      {label}
                    </p>
                    <p className="text-[13.5px] font-bold text-gray-900">
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-3">
                  <Activity
                    size={14}
                    className="text-gray-300 mt-0.5 shrink-0"
                  />
                  <div>
                    <p className="text-[11.5px] text-gray-400 mb-0.5">
                      Kategori Kependudukan
                    </p>
                    <p className="text-[13.5px] font-bold text-gray-900">
                      {selectedWarga.kategori}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={14} className="text-gray-300 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[11.5px] text-gray-400 mb-0.5">
                      Status / Keterangan
                    </p>
                    <p className="text-[13.5px] font-bold text-[#1a3a6b]">
                      {selectedWarga.status}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setSelectedWarga(null)}
                className="bg-[#f8f9fc] border border-gray-200 hover:border-gray-400 text-gray-600 px-5 py-2 rounded-md text-[12.5px] font-semibold transition-colors cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
