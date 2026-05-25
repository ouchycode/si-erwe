"use client";

import { useState } from "react";
import { Megaphone, MapPin, Camera, AlertTriangle, Shield, Trash2, Home, CheckCircle2, Clock, Search, ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";

type Ticket = {
  id: string;
  judul: string;
  kategori: string;
  lokasi: string;
  deskripsi: string;
  status: "Menunggu" | "Diproses" | "Selesai";
  tanggal: string;
};

const INITIAL_TICKETS: Ticket[] = [
  {
    id: "TKT-001",
    judul: "Lampu Jalan Mati di Blok C",
    kategori: "Fasilitas Umum",
    lokasi: "Jalan Melati Blok C2",
    deskripsi: "Sudah 3 hari lampu jalan utama mati, sangat gelap di malam hari.",
    status: "Diproses",
    tanggal: "2 Jam yang lalu",
  },
  {
    id: "TKT-002",
    judul: "Tumpukan Sampah Belum Diambil",
    kategori: "Kebersihan",
    lokasi: "TPS RT 04",
    deskripsi: "Truk sampah belum datang minggu ini, mulai bau menyengat.",
    status: "Menunggu",
    tanggal: "5 Jam yang lalu",
  },
  {
    id: "TKT-003",
    judul: "Pohon Rawan Tumbang",
    kategori: "Lingkungan",
    lokasi: "Taman Utama RW 12",
    deskripsi: "Ada dahan pohon besar yang patah dan menggantung di atas ayunan anak.",
    status: "Selesai",
    tanggal: "2 Hari yang lalu",
  },
];

export default function LaporWargaPage() {
  const [tickets, setTickets] = useState<Ticket[]>(INITIAL_TICKETS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successTicketId, setSuccessTicketId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<Ticket | null | "NOT_FOUND">(null);

  // Form State
  const [nama, setNama] = useState("");
  const [telepon, setTelepon] = useState("");
  const [judul, setJudul] = useState("");
  const [kategori, setKategori] = useState("Fasilitas Umum");
  const [lokasi, setLokasi] = useState("");
  const [deskripsi, setDeskripsi] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      const newTicket: Ticket = {
        id: `TKT-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
        judul,
        kategori,
        lokasi,
        deskripsi,
        status: "Menunggu",
        tanggal: "Baru saja",
      };

      setTickets([newTicket, ...tickets]);
      setIsSubmitting(false);
      
      // Reset Form
      setNama("");
      setTelepon("");
      setJudul("");
      setLokasi("");
      setDeskripsi("");
      setSuccessTicketId(newTicket.id);
    }, 1500);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    const found = tickets.find(t => t.id.toLowerCase() === searchQuery.toLowerCase());
    if (found) {
      setSearchResult(found);
    } else {
      setSearchResult("NOT_FOUND");
    }
  };

  const getStatusBadge = (status: Ticket["status"]) => {
    switch (status) {
      case "Menunggu":
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xs bg-yellow-100 text-yellow-800 text-[10px] font-bold uppercase tracking-widest"><Clock size={12}/> Menunggu</span>;
      case "Diproses":
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xs bg-blue-100 text-blue-800 text-[10px] font-bold uppercase tracking-widest"><AlertTriangle size={12}/> Diproses</span>;
      case "Selesai":
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xs bg-green-100 text-green-800 text-[10px] font-bold uppercase tracking-widest"><CheckCircle2 size={12}/> Selesai</span>;
    }
  };

  const getKategoriIcon = (kat: string) => {
    switch (kat) {
      case "Fasilitas Umum": return <Home size={16} />;
      case "Keamanan": return <Shield size={16} />;
      case "Kebersihan": return <Trash2 size={16} />;
      default: return <AlertTriangle size={16} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans">
      <PageHeader
        category="Layanan Publik Digital"
        title="Portal Lapor Warga"
        description="Punya keluhan terkait fasilitas lingkungan, keamanan, atau kebersihan? Laporkan di sini agar segera ditindaklanjuti oleh pengurus."
        rightContent={
          <div className="flex items-center gap-4 bg-white/10 border border-white/20 rounded-xs px-6 py-4 shrink-0">
            <div className="w-10 h-10 bg-white/10 rounded-xs flex items-center justify-center">
              <Megaphone size={18} className="text-blue-200" />
            </div>
            <div>
              <p className="text-xs text-blue-300/80 font-bold uppercase tracking-widest mb-0.5">
                Total Laporan
              </p>
              <p className="text-xl font-extrabold text-white leading-none">{tickets.length} Tiket</p>
            </div>
          </div>
        }
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-16 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* KIRI: Form Laporan */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-white border border-gray-200 shadow-sm rounded-xs overflow-hidden flex flex-col h-full">
            <div className="bg-brand-primary p-5 shrink-0">
              <h3 className="text-white font-bold text-lg m-0 flex items-center gap-2">
                <Megaphone size={18} /> Buat Laporan Baru
              </h3>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              {successTicketId ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-500 py-8">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 border-4 border-white shadow-sm">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-2xl font-extrabold text-gray-900 mb-2 m-0">Laporan Terkirim!</h3>
                  <p className="text-gray-500 max-w-sm mx-auto mb-6 text-sm">
                    Terima kasih atas partisipasi Anda. Laporan akan segera ditinjau oleh pengurus terkait.
                  </p>
                  
                  <div className="w-full bg-blue-50 border border-blue-100 rounded-xs p-6 mb-8">
                    <p className="text-xs text-blue-800 font-bold uppercase tracking-widest mb-2 m-0">Nomor Tiket Anda</p>
                    <p className="text-3xl font-mono font-extrabold text-brand-primary m-0 mb-3 tracking-wider">{successTicketId}</p>
                    <p className="text-xs text-blue-900/70 font-medium m-0 leading-relaxed">
                      Simpan nomor tiket ini untuk mengecek status laporan, atau tunggu *update* otomatis yang telah kami kirimkan ke <strong>WhatsApp</strong> Anda.
                    </p>
                  </div>

                  <button 
                    onClick={() => setSuccessTicketId(null)}
                    className="text-brand-primary font-bold px-6 py-3 rounded-xs hover:bg-blue-50 transition-colors cursor-pointer border-none bg-transparent"
                  >
                    Buat Laporan Lain
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest flex justify-between">
                        <span>Nama Pelapor</span>
                        <span className="text-gray-400 font-medium tracking-normal text-[10px]">*Opsional</span>
                      </label>
                      <input 
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                        type="text" 
                        placeholder="Boleh dikosongkan (Anonim)"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xs focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest flex justify-between">
                        <span>No. WhatsApp</span>
                        <span className="text-gray-400 font-medium tracking-normal text-[10px]">*Opsional</span>
                      </label>
                      <input 
                        value={telepon}
                        onChange={(e) => setTelepon(e.target.value)}
                        type="text" 
                        placeholder="Untuk notifikasi status"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xs focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-gray-100">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Judul Singkat Laporan</label>
                    <input 
                      required
                      value={judul}
                      onChange={(e) => setJudul(e.target.value)}
                      type="text" 
                      placeholder="Contoh: Lampu PJU Mati"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xs focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all text-sm"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Kategori</label>
                      <select 
                        value={kategori}
                        onChange={(e) => setKategori(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xs focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all text-sm"
                      >
                        <option>Fasilitas Umum</option>
                        <option>Keamanan</option>
                        <option>Kebersihan</option>
                        <option>Lingkungan</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Titik Lokasi</label>
                      <input 
                        required
                        value={lokasi}
                        onChange={(e) => setLokasi(e.target.value)}
                        type="text" 
                        placeholder="Contoh: Taman Blok B"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xs focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Deskripsi Detail</label>
                    <textarea 
                      required
                      value={deskripsi}
                      onChange={(e) => setDeskripsi(e.target.value)}
                      rows={4}
                      placeholder="Jelaskan secara detail masalah yang terjadi..."
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xs focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all text-sm resize-none"
                    />
                  </div>

                  <div className="border border-dashed border-gray-300 rounded-xs p-6 flex flex-col items-center justify-center gap-2 bg-gray-50 cursor-not-allowed opacity-70 hover:bg-gray-100 transition-colors">
                    <Camera className="text-gray-400" size={24} />
                    <p className="text-xs text-gray-500 font-bold m-0">Unggah Bukti Foto (Opsional)</p>
                    <p className="text-[10px] text-gray-400 m-0">Simulasi: Fitur unggah dinonaktifkan</p>
                  </div>

                  <button 
                    disabled={isSubmitting}
                    type="submit" 
                    className="w-full bg-brand-primary text-white font-bold px-8 py-4 rounded-xs hover:bg-brand-primary-hover transition-colors flex items-center justify-center gap-2 cursor-pointer border-none disabled:opacity-70 mt-2"
                  >
                    {isSubmitting ? "Mengirim Laporan..." : "Kirim Laporan"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* KANAN: Daftar Laporan (Feed) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Tracking Widget */}
          <div className="bg-white border border-brand-primary/20 shadow-sm rounded-xs p-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-brand-primary" />
            <h3 className="text-sm font-bold text-gray-900 m-0 mb-3 flex items-center gap-2">
              <Search size={16} className="text-brand-primary" /> Lacak Laporan Saya
            </h3>
            
            {searchResult ? (
              <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                {searchResult === "NOT_FOUND" ? (
                  <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xs text-sm font-medium flex justify-between items-center">
                    <span>Tiket dengan ID <strong>{searchQuery}</strong> tidak ditemukan.</span>
                    <button onClick={() => {setSearchResult(null); setSearchQuery("");}} className="text-red-500 hover:text-red-700 p-1 cursor-pointer border-none bg-transparent font-bold"><ArrowLeft size={16}/></button>
                  </div>
                ) : (
                  <div className="bg-gray-50 border border-gray-200 p-4 rounded-xs relative">
                    <button onClick={() => {setSearchResult(null); setSearchQuery("");}} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 cursor-pointer border-none bg-transparent"><ArrowLeft size={16}/></button>
                    <div className="flex items-center gap-2 text-xs text-brand-primary font-bold mb-2">
                      <span className="font-mono px-2 py-0.5 bg-blue-100 rounded-sm">#{searchResult.id}</span>
                      {getStatusBadge(searchResult.status)}
                    </div>
                    <h4 className="text-base font-bold text-gray-900 m-0 mb-1">{searchResult.judul}</h4>
                    <p className="text-sm text-gray-600 mb-0 leading-relaxed">{searchResult.deskripsi}</p>
                  </div>
                )}
              </div>
            ) : (
              <form onSubmit={handleSearch} className="flex gap-3">
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Masukkan Nomor Tiket (Contoh: TKT-001)" 
                  className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xs text-sm font-medium focus:ring-2 focus:ring-brand-primary outline-none" 
                />
                <button type="submit" className="bg-brand-primary text-white px-6 py-3 rounded-xs font-bold text-sm hover:bg-brand-primary-hover transition-colors cursor-pointer border-none shrink-0">
                  Cari Tiket
                </button>
              </form>
            )}
          </div>

          <div className="flex items-center justify-between pb-2 border-b border-gray-200 mt-2">
            <h3 className="text-lg font-bold text-gray-900 m-0">Live Laporan Warga</h3>
            <span className="text-xs text-gray-500 font-medium bg-gray-200 px-3 py-1 rounded-full">Diperbarui secara real-time</span>
          </div>

          <div className="flex flex-col gap-4">
            {tickets.map((ticket) => (
              <div key={ticket.id} className="bg-white border border-gray-200 shadow-sm rounded-xs p-5 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2 text-xs text-brand-primary font-bold">
                      <span className="flex items-center gap-1">
                        {getKategoriIcon(ticket.kategori)} {ticket.kategori}
                      </span>
                      <span className="text-gray-300">•</span>
                      <span className="text-gray-500 font-mono">#{ticket.id}</span>
                    </div>
                    <h4 className="text-base md:text-lg font-bold text-gray-900 m-0 leading-tight">
                      {ticket.judul}
                    </h4>
                  </div>
                  {getStatusBadge(ticket.status)}
                </div>

                <p className="text-sm text-gray-600 leading-relaxed mb-4 m-0">
                  {ticket.deskripsi}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                    <MapPin size={12} className="text-brand-primary" />
                    <span>{ticket.lokasi}</span>
                  </div>
                  <div className="text-xs text-gray-400 font-bold">
                    {ticket.tanggal}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
