"use client";

import { useFeatures } from "@/context/FeatureContext";
import { Settings, ShieldAlert, FileCheck, Megaphone, CreditCard } from "lucide-react";

export default function PengaturanSistemPage() {
  const { features, toggleFeature } = useFeatures();

  const moduleSettings = [
    {
      id: "isESuratActive" as const,
      name: "Portal E-Surat Pengantar",
      desc: "Layanan pengajuan surat otomatis untuk warga.",
      icon: FileCheck,
      color: "text-brand-primary",
    },
    {
      id: "isLaporActive" as const,
      name: "Sistem Lapor Warga",
      desc: "Layanan pelaporan keluhan dan masalah lingkungan.",
      icon: Megaphone,
      color: "text-brand-primary",
    },
    {
      id: "isIuranActive" as const,
      name: "Gateway Iuran Warga",
      desc: "Layanan pembayaran iuran bulanan dan kas RT.",
      icon: CreditCard,
      color: "text-brand-primary",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 font-sans flex flex-col">
      {/* Super Admin Top Bar */}
      <header className="bg-black border-b border-gray-800 p-4 flex items-center justify-between text-white shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-red-600 rounded-xs flex items-center justify-center font-mono font-bold text-xs">
            DEV
          </div>
          <div>
            <h1 className="text-sm font-bold m-0 font-mono">System Developer Console</h1>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest m-0">SI-RW 12 Root Access</p>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 bg-white p-8 rounded-lg shadow-2xl max-w-6xl mx-auto border border-slate-100">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2 flex items-center gap-3">
              <Settings className="text-brand-primary" /> Pengaturan Sistem (Feature Toggles)
            </h2>
            <p className="text-gray-500 text-sm">Pusat kendali untuk menghidupkan dan mematikan modul aplikasi publik.</p>
          </div>

          <div className="bg-orange-50 border border-orange-200 p-4 rounded-xs flex items-start gap-3">
            <ShieldAlert className="text-orange-600 shrink-0 mt-0.5" size={20} />
            <p className="text-sm text-orange-900 leading-relaxed m-0">
              <strong>Perhatian Super Admin:</strong> Mematikan modul di bawah ini akan langsung menyembunyikan modul tersebut dari halaman warga secara <em>real-time</em>. Gunakan fitur ini jika aplikasi sedang dalam perbaikan (Maintenance).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {moduleSettings.map((mod) => {
              const isActive = features[mod.id];

              return (
                <div key={mod.id} className={`bg-slate-50 border shadow-sm rounded-xs overflow-hidden transition-all duration-300 ${isActive ? 'border-slate-100' : 'border-red-200 opacity-80'}`}>
                  <div className={`p-5 flex items-center justify-between border-b ${isActive ? 'border-slate-100 bg-white' : 'border-red-100 bg-red-50'}`}>
                    <div className="flex items-center gap-2">
                      <mod.icon size={18} className={isActive ? mod.color : 'text-red-500'} />
                      <span className={`text-xs font-bold uppercase tracking-widest ${isActive ? 'text-gray-500' : 'text-red-600'}`}>
                        {isActive ? "Aktif" : "Dinonaktifkan"}
                      </span>
                    </div>
                    
                    {/* Custom Toggle Switch */}
                    <button 
                      onClick={() => toggleFeature(mod.id)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none cursor-pointer border-none ${
                        isActive ? 'bg-brand-primary' : 'bg-gray-300'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        isActive ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-slate-800 mb-2 m-0">{mod.name}</h3>
                    <p className="text-sm text-gray-500 m-0 leading-relaxed">{mod.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
