import Link from 'next/link';
import { Home, AlertTriangle } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans">
      <PageHeader 
        category="Error 404"
        title="Halaman Tidak Ditemukan"
        description="Maaf, halaman yang Anda tuju tidak tersedia atau telah dipindahkan."
      />
      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-16 relative z-10">
        <div data-aos="fade-up" className="bg-white border border-slate-100 rounded-xs p-12 shadow-sm text-center flex flex-col items-center justify-center min-h-[400px]">
          <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6">
            <AlertTriangle size={40} />
          </div>
          <h2 data-aos="fade-up" className="text-2xl font-bold text-slate-800 mb-2">Waduh! Halaman Hilang</h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Sepertinya alamat URL yang Anda masukkan salah, atau halamannya sudah tidak ada di sistem RW 04.
          </p>
          <Link href="/" className="inline-flex items-center gap-2 bg-brand-primary text-white font-bold px-6 py-3 rounded-xs hover:bg-brand-primary-hover transition-colors no-underline">
            <Home size={18} />
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
