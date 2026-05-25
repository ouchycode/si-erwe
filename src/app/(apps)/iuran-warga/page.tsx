"use client";

import { useState } from "react";
import { CreditCard, Search, Home, Receipt, ShieldCheck, CheckCircle2, ChevronRight, Info, Building2, QrCode } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";

// Mock Data
const MOCK_BILL = {
  nomorRumah: "A1/12",
  namaPemilik: "Bapak Budi Santoso",
  bulan: "Mei 2026",
  rincian: [
    { nama: "Iuran Keamanan Lingkungan", nominal: 30000 },
    { nama: "Iuran Pengelolaan Sampah", nominal: 20000 },
  ],
  total: 50000,
  status: "Belum Lunas",
};

export default function IuranWargaPage() {
  const [searchInput, setSearchInput] = useState("");
  const [bill, setBill] = useState<typeof MOCK_BILL | null>(null);
  
  // Payment Flow State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentStep, setPaymentStep] = useState<"SELECT_METHOD" | "QRIS" | "SUCCESS">("SELECT_METHOD");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.length > 2) {
      // Simulate API fetch delay
      setBill(null);
      setTimeout(() => setBill({ ...MOCK_BILL, nomorRumah: searchInput.toUpperCase() }), 600);
    }
  };

  const handleProcessPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentStep("SUCCESS");
      
      // Update bill status locally
      if (bill) {
        setBill({ ...bill, status: "Lunas" });
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans">
      <PageHeader
        category="Layanan Publik Digital"
        title="Pembayaran Iuran Warga"
        description="Cek tagihan dan bayar Iuran Pemeliharaan Lingkungan (IPL) secara online. Mudah, cepat, dan transparan."
        rightContent={
          <div className="flex items-center gap-4 bg-white/10 border border-white/20 rounded-xs px-6 py-4 shrink-0">
            <div className="w-10 h-10 bg-white/10 rounded-xs flex items-center justify-center">
              <CreditCard size={18} className="text-blue-200" />
            </div>
            <div>
              <p className="text-xs text-blue-300/80 font-bold uppercase tracking-widest mb-0.5">
                Integrasi Pembayaran
              </p>
              <p className="text-xl font-extrabold text-white leading-none">QRIS / Transfer</p>
            </div>
          </div>
        }
      />

      <div className="max-w-4xl mx-auto px-4 md:px-8 -mt-16 relative z-10 flex flex-col gap-6">
        
        {/* Search Bar Box */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-xs p-6 md:p-8">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-end gap-4">
            <div className="flex-1 w-full space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                <Home size={14} /> Nomor Blok / Rumah
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  required
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  placeholder="Misal: Blok A1 atau A1/12"
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xs focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all text-sm font-medium"
                />
              </div>
            </div>
            <button 
              type="submit" 
              className="w-full md:w-auto bg-brand-primary text-white font-bold px-8 py-3.5 rounded-xs hover:bg-brand-primary-hover transition-colors flex items-center justify-center gap-2 cursor-pointer border-none shadow-sm"
            >
              Cek Tagihan
            </button>
          </form>
        </div>

        {/* Billing Info Box */}
        {bill && (
          <div className="bg-white border border-gray-200 shadow-sm rounded-xs overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
            <div className="bg-blue-50 border-b border-blue-100 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-brand-primary shrink-0 border border-blue-100">
                  <Receipt size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 m-0">Tagihan IPL Bulan {bill.bulan}</h3>
                  <p className="text-sm text-gray-500 font-medium mt-1 mb-0">Rumah Blok <strong className="text-brand-primary">{bill.nomorRumah}</strong> &bull; {bill.namaPemilik}</p>
                </div>
              </div>
              <div className={`px-4 py-2 rounded-xs font-bold text-sm tracking-wide ${
                bill.status === "Lunas" ? "bg-green-100 text-green-700 border border-green-200" : "bg-yellow-100 text-yellow-700 border border-yellow-200"
              }`}>
                {bill.status}
              </div>
            </div>

            <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8">
              {/* Rincian Kiri */}
              <div className="flex-1 space-y-4">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">Rincian Pembayaran</h4>
                <div className="flex flex-col gap-3">
                  {bill.rincian.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm">
                      <span className="text-gray-600 font-medium">{item.nama}</span>
                      <span className="text-gray-900 font-bold">Rp {item.nominal.toLocaleString('id-ID')}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t border-dashed border-gray-200 flex justify-between items-center">
                  <span className="text-gray-900 font-extrabold text-base">Total Tagihan</span>
                  <span className="text-brand-primary font-extrabold text-xl">Rp {bill.total.toLocaleString('id-ID')}</span>
                </div>
              </div>

              {/* Action Kanan */}
              <div className="w-full md:w-72 bg-gray-50 border border-gray-100 rounded-xs p-6 flex flex-col items-center justify-center text-center gap-4 shrink-0">
                {bill.status === "Lunas" ? (
                  <>
                    <CheckCircle2 size={48} className="text-green-500" />
                    <div>
                      <p className="text-sm font-bold text-gray-900 mb-1 m-0">Tagihan Sudah Lunas</p>
                      <p className="text-xs text-gray-500 m-0">Terima kasih atas partisipasi Anda membangun lingkungan.</p>
                    </div>
                  </>
                ) : (
                  <>
                    <ShieldCheck size={32} className="text-brand-primary opacity-50" />
                    <div>
                      <p className="text-xs text-gray-500 font-medium leading-relaxed m-0">
                        Pastikan data rumah sudah sesuai sebelum melanjutkan proses pembayaran.
                      </p>
                    </div>
                    <button 
                      onClick={() => {
                        setPaymentStep("SELECT_METHOD");
                        setIsModalOpen(true);
                      }}
                      className="w-full bg-brand-primary text-white font-bold px-6 py-3 rounded-xs hover:bg-brand-primary-hover transition-colors flex items-center justify-center gap-2 cursor-pointer border-none shadow-sm"
                    >
                      Bayar Sekarang
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Payment Gateway Modal Simulator */}
      {isModalOpen && (
        <>
          <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[9998] transition-opacity animate-in fade-in duration-200" />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-white rounded-md shadow-2xl z-[9999] overflow-hidden animate-in zoom-in-95 duration-200">
            
            {paymentStep === "SELECT_METHOD" && (
              <div className="flex flex-col">
                <div className="bg-gray-50 p-5 border-b border-gray-200 text-center relative">
                  <h3 className="font-bold text-gray-900 m-0">Pilih Metode Pembayaran</h3>
                  <button onClick={() => setIsModalOpen(false)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm font-bold cursor-pointer border-none bg-transparent">Batal</button>
                </div>
                <div className="p-4 flex flex-col gap-3">
                  <button onClick={() => setPaymentStep("QRIS")} className="flex items-center justify-between p-4 border border-gray-200 rounded-xs hover:border-brand-primary hover:bg-blue-50 transition-all cursor-pointer bg-white text-left group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 text-brand-primary rounded-xs flex items-center justify-center"><QrCode size={20}/></div>
                      <div>
                        <p className="text-sm font-bold text-gray-900 m-0">QRIS</p>
                        <p className="text-[10px] text-gray-500 font-medium m-0">Gopay, OVO, Dana, M-Banking</p>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-gray-300 group-hover:text-brand-primary" />
                  </button>
                  <button disabled className="flex items-center justify-between p-4 border border-gray-100 rounded-xs bg-gray-50 opacity-60 text-left">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 text-gray-400 rounded-xs flex items-center justify-center"><Building2 size={20}/></div>
                      <div>
                        <p className="text-sm font-bold text-gray-900 m-0">Virtual Account Bank</p>
                        <p className="text-[10px] text-gray-500 font-medium m-0">Sedang dalam perbaikan</p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {paymentStep === "QRIS" && (
              <div className="flex flex-col text-center p-6">
                <h3 className="font-bold text-gray-900 m-0 mb-1">Scan QRIS</h3>
                <p className="text-xs text-gray-500 mb-6">Gunakan aplikasi e-wallet atau M-Banking Anda</p>
                
                <div className="w-48 h-48 mx-auto bg-gray-100 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center mb-6">
                  <QrCode size={100} className="text-gray-300" />
                </div>
                
                <div className="bg-blue-50 text-brand-primary font-bold text-lg py-3 rounded-xs mb-6 border border-blue-100">
                  Rp {bill?.total.toLocaleString('id-ID')}
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setPaymentStep("SELECT_METHOD")} className="flex-1 bg-gray-100 text-gray-600 font-bold py-3 rounded-xs hover:bg-gray-200 transition-colors cursor-pointer border-none">
                    Kembali
                  </button>
                  <button onClick={handleProcessPayment} disabled={isProcessing} className="flex-1 bg-brand-primary text-white font-bold py-3 rounded-xs hover:bg-brand-primary-hover transition-colors cursor-pointer border-none disabled:opacity-70">
                    {isProcessing ? "Cek Status..." : "Simulasikan Sukses"}
                  </button>
                </div>
              </div>
            )}

            {paymentStep === "SUCCESS" && (
              <div className="flex flex-col text-center p-8 items-center">
                <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="font-extrabold text-xl text-gray-900 m-0 mb-2">Pembayaran Berhasil!</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-6">Terima kasih, pembayaran Iuran IPL untuk rumah Blok <strong className="text-gray-900">{bill?.nomorRumah}</strong> telah masuk ke sistem kami.</p>
                <button 
                  onClick={() => setIsModalOpen(false)} 
                  className="w-full bg-brand-primary text-white font-bold py-3.5 rounded-xs hover:bg-brand-primary-hover transition-colors cursor-pointer border-none shadow-sm"
                >
                  Selesai
                </button>
              </div>
            )}

          </div>
        </>
      )}

    </div>
  );
}
