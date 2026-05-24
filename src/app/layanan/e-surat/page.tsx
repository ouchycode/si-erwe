"use client";

import { useState } from "react";
import { FileText, User, MapPin, Phone, CheckCircle2, FileCheck, ArrowRight, Printer, AlertCircle } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import Link from "next/link";

type FormData = {
  nik: string;
  nama: string;
  rt: string;
  telepon: string;
  jenisSurat: string;
  keperluan: string;
};

const INITIAL_DATA: FormData = {
  nik: "",
  nama: "",
  rt: "01",
  telepon: "",
  jenisSurat: "Pengantar Domisili",
  keperluan: "",
};

export default function ESuratPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(INITIAL_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateForm = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) setStep(step + 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API Call delay
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(3); // Go to success/print step
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans">
      <PageHeader
        category="Layanan Publik Digital"
        title="Pengajuan E-Surat"
        description="Ajukan pembuatan surat pengantar RT/RW secara mandiri secara online tanpa harus antre."
        rightContent={
          <div className="flex items-center gap-4 bg-white/10 border border-white/20 rounded-xs px-6 py-4 shrink-0">
            <div className="w-10 h-10 bg-white/10 rounded-xs flex items-center justify-center">
              <FileCheck size={18} className="text-blue-200" />
            </div>
            <div>
              <p className="text-xs text-blue-300/80 font-bold uppercase tracking-widest mb-0.5">
                Proses Terpadu
              </p>
              <p className="text-xl font-extrabold text-white leading-none">Instant PDF</p>
            </div>
          </div>
        }
      />

      <div className="max-w-4xl mx-auto px-4 md:px-8 -mt-16 relative z-10">
        <div className="bg-white border border-gray-200 shadow-sm rounded-xs overflow-hidden flex flex-col">
          
          {/* Stepper Header */}
          <div className="bg-gray-50 border-b border-gray-200 p-6 flex items-center justify-between">
            {[
              { num: 1, title: "Data Diri" },
              { num: 2, title: "Keperluan" },
              { num: 3, title: "Selesai" },
            ].map((s, idx) => (
              <div key={s.num} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 transition-colors ${
                  step >= s.num 
                    ? "bg-brand-primary text-white" 
                    : "bg-gray-200 text-gray-400"
                }`}>
                  {s.num}
                </div>
                <span className={`hidden md:block text-sm font-bold ${
                  step >= s.num ? "text-gray-900" : "text-gray-400"
                }`}>
                  {s.title}
                </span>
                {idx < 2 && (
                  <div className="w-10 md:w-20 h-px bg-gray-200 mx-2 md:mx-4" />
                )}
              </div>
            ))}
          </div>

          {/* Form Body */}
          <div className="p-6 md:p-10">
            <form onSubmit={step === 1 ? handleNext : handleSubmit}>
              
              {/* STEP 1: Data Diri */}
              {step === 1 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2 m-0 mb-6">
                    <User className="text-brand-primary" /> Lengkapi Data Diri
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Nomor Induk Kependudukan (NIK)</label>
                      <input 
                        required
                        type="text" 
                        name="nik"
                        value={formData.nik}
                        onChange={updateForm}
                        placeholder="16 Digit NIK KTP"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xs focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Nama Lengkap Sesuai KTP</label>
                      <input 
                        required
                        type="text" 
                        name="nama"
                        value={formData.nama}
                        onChange={updateForm}
                        placeholder="Misal: Budi Santoso"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xs focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1"><MapPin size={12}/> RT Domisili</label>
                      <select 
                        name="rt"
                        value={formData.rt}
                        onChange={updateForm}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xs focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all text-sm"
                      >
                        {Array.from({ length: 8 }).map((_, i) => (
                          <option key={i} value={`0${i + 1}`}>RT 0{i + 1}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1"><Phone size={12}/> Nomor WhatsApp Aktif</label>
                      <input 
                        required
                        type="text" 
                        name="telepon"
                        value={formData.telepon}
                        onChange={updateForm}
                        placeholder="0812xxxx"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xs focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-6 mt-6 border-t border-gray-100">
                    <button type="submit" className="bg-brand-primary text-white font-bold px-8 py-3 rounded-xs hover:bg-brand-primary-hover transition-colors flex items-center gap-2 cursor-pointer border-none">
                      Lanjutkan <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Keperluan */}
              {step === 2 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2 m-0 mb-6">
                    <FileText className="text-brand-primary" /> Rincian Pengajuan
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Jenis Surat Pengantar</label>
                      <select 
                        name="jenisSurat"
                        value={formData.jenisSurat}
                        onChange={updateForm}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xs focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all text-sm font-medium"
                      >
                        <option value="Pengantar Domisili">Surat Pengantar Pembuatan KTP/Domisili</option>
                        <option value="Pengantar SKCK">Surat Pengantar SKCK (Kepolisian)</option>
                        <option value="Keterangan Tidak Mampu">Surat Keterangan Tidak Mampu (SKTM)</option>
                        <option value="Keterangan Usaha">Surat Keterangan Usaha (SKU)</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Tujuan / Alasan Keperluan</label>
                      <textarea 
                        required
                        name="keperluan"
                        value={formData.keperluan}
                        onChange={updateForm}
                        rows={4}
                        placeholder="Sebutkan secara spesifik alasan pembuatan surat ini. (Misal: Syarat pendaftaran melamar kerja di PT. XYZ)"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xs focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all text-sm resize-none"
                      />
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-100 p-4 rounded-xs flex items-start gap-3">
                      <AlertCircle className="text-brand-primary shrink-0 mt-0.5" size={16} />
                      <p className="text-xs text-blue-900 font-medium leading-relaxed m-0">
                        Pastikan semua data yang diinput sudah benar. Surat yang diterbitkan melalui sistem ini memiliki *barcode* unik yang dapat diverifikasi oleh sistem Kelurahan Kutabumi.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-6 mt-6 border-t border-gray-100">
                    <button type="button" onClick={() => setStep(1)} className="text-gray-500 font-bold px-6 py-3 rounded-xs hover:bg-gray-100 transition-colors cursor-pointer border-none bg-transparent">
                      Kembali
                    </button>
                    <button disabled={isSubmitting} type="submit" className="bg-brand-primary text-white font-bold px-8 py-3 rounded-xs hover:bg-brand-primary-hover transition-colors flex items-center gap-2 cursor-pointer border-none disabled:opacity-70">
                      {isSubmitting ? "Memproses..." : "Ajukan & Buat Surat"}
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Sukses & Cetak */}
              {step === 3 && (
                <div className="py-8 text-center animate-in zoom-in-95 duration-500 flex flex-col items-center">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 border-4 border-white shadow-sm">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-2xl font-extrabold text-gray-900 mb-2 m-0">Pengajuan Berhasil Dibuat!</h3>
                  <p className="text-gray-500 max-w-md mx-auto mb-8 text-sm">
                    Surat {formData.jenisSurat} atas nama <strong className="text-gray-900">{formData.nama}</strong> telah tercatat di sistem Sekretariat RW 12.
                  </p>

                  {/* PDF Receipt Mockup */}
                  <div className="w-full max-w-sm bg-gray-50 border border-gray-200 rounded-xs p-6 mb-8 text-left relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-brand-primary" />
                    <div className="flex items-start justify-between mb-4 pb-4 border-b border-gray-200">
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Nomor Registrasi</p>
                        <p className="text-sm font-mono font-bold text-gray-900">RW12/{new Date().getFullYear()}/{(Math.random() * 10000).toFixed(0).padStart(4, '0')}</p>
                      </div>
                      <Printer size={20} className="text-gray-300" />
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Pemohon</p>
                        <p className="text-sm font-bold text-gray-900">{formData.nama}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Dokumen</p>
                        <p className="text-sm font-bold text-brand-primary">{formData.jenisSurat}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => window.print()}
                      className="bg-brand-primary text-white font-bold px-8 py-3 rounded-xs hover:bg-brand-primary-hover transition-colors flex items-center gap-2 cursor-pointer border-none"
                    >
                      <Printer size={16} /> Unduh PDF
                    </button>
                    <Link href="/" className="text-gray-500 font-bold px-6 py-3 rounded-xs hover:bg-gray-100 transition-colors no-underline">
                      Kembali ke Beranda
                    </Link>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
