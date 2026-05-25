"use client";

import { Megaphone, FileText, CheckCircle2, Clock } from "lucide-react";

export default function AdminDashboardPage() {
  const stats = [
    { title: "Laporan Masuk", value: "14", desc: "Minggu ini", icon: Megaphone, color: "text-blue-600", bg: "bg-blue-100" },
    { title: "Laporan Selesai", value: "8", desc: "Telah ditindaklanjuti", icon: CheckCircle2, color: "text-green-600", bg: "bg-green-100" },
    { title: "Pengajuan E-Surat", value: "5", desc: "Menunggu diproses", icon: FileText, color: "text-orange-600", bg: "bg-orange-100" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Dashboard RW 12</h1>
        <p className="text-gray-500 text-sm">Selamat datang, Bapak Ketua RW. Berikut adalah ringkasan aktivitas warga hari ini.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white border border-slate-100 shadow-sm rounded-xs p-6 flex items-start gap-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${stat.bg} ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">{stat.title}</p>
              <p className="text-3xl font-bold text-slate-800 mb-1">{stat.value}</p>
              <p className="text-xs text-gray-400 font-medium">{stat.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white border border-slate-100 shadow-sm rounded-xs p-6">
          <h3 className="text-sm font-bold text-slate-800 mb-4 border-b border-gray-100 pb-3">Laporan Terbaru</h3>
          <div className="space-y-4">
            {[1,2,3].map(i => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                  <Clock size={14} className="text-gray-500" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800 mb-0.5">Lampu PJU Mati (TKT-00{i})</p>
                  <p className="text-xs text-gray-500">Dilaporkan 2 jam yang lalu oleh Warga RT 0{i}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-slate-100 shadow-sm rounded-xs p-6 border-l-4 border-l-brand-primary">
          <h3 className="text-sm font-bold text-brand-primary mb-2">Tips Admin</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Anda dapat mematikan sementara fitur pelayanan publik jika sistem sedang dalam pemeliharaan (maintenance). Silakan kunjungi menu <strong>Pengaturan Sistem</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
