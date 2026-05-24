"use client";

import { useEffect } from 'react';
import { RotateCcw, AlertOctagon } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans">
      <PageHeader 
        category="Error 500"
        title="Terjadi Kesalahan Sistem"
        description="Mohon maaf, terjadi gangguan teknis saat memuat halaman ini."
      />
      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-16 relative z-10">
        <div className="bg-white border border-gray-200 rounded-xs p-12 shadow-sm text-center flex flex-col items-center justify-center min-h-[400px]">
          <div className="w-20 h-20 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-6">
            <AlertOctagon size={40} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Sistem Sedang Gangguan</h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Tim kami telah mencatat error ini. Silakan coba muat ulang halaman.
          </p>
          <button onClick={() => reset()} className="inline-flex items-center gap-2 bg-brand-primary text-white font-bold px-6 py-3 rounded-xs hover:bg-brand-primary-hover transition-colors border-none cursor-pointer shadow-sm">
            <RotateCcw size={18} />
            Coba Lagi
          </button>
        </div>
      </div>
    </div>
  );
}
