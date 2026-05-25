import Image from "next/image";
import Link from "next/link";
import { Users, Home, MapPin, FileText, PhoneCall, ShieldAlert, BarChart2 } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full flex flex-col">
      {/* Background Section */}
      <div className="relative w-full min-h-[60vh] flex items-center justify-center bg-gray-900">
        <Image
          src="/images/lingkungan-rw.png"
          alt="Lingkungan RW 12"
          fill
          className="object-cover opacity-50"
          priority
        />
        
        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center -mt-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 tracking-tight drop-shadow-md">
            Sekretariat RW 12
          </h1>
          <p className="text-lg md:text-xl text-gray-200 font-medium max-w-2xl mx-auto leading-relaxed drop-shadow">
            Sistem informasi terpadu Kutabumi, Kab. Tangerang.
          </p>
        </div>
      </div>

      {/* Floating Section (Overlapping Hero and next section) */}
      <div className="relative z-20 w-full px-4 md:px-8 max-w-7xl mx-auto -mt-20 mb-16">
        
        {/* Quick Links Card - Dashboard Shape */}
        <div className="bg-white rounded-xs border border-slate-100 p-6 md:p-8 mb-6 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <Link href="/layanan/administrasi-kependudukan" className="group flex flex-col items-center text-center no-underline outline-none rounded-xs p-2 transition-colors hover:bg-slate-50/50">
              <div className="w-12 h-12 rounded-xs flex items-center justify-center mb-3 icon-badge shadow-md">
                <FileText size={20} strokeWidth={2} />
              </div>
              <span className="text-sm font-bold text-slate-800 group-hover:text-brand-primary transition-colors">Surat Pengantar</span>
            </Link>
            
            <Link href="/informasi/statistik" className="group flex flex-col items-center text-center no-underline outline-none rounded-xs p-2 transition-colors hover:bg-slate-50/50">
              <div className="w-12 h-12 rounded-xs flex items-center justify-center mb-3 icon-badge shadow-md">
                <BarChart2 size={20} strokeWidth={2} />
              </div>
              <span className="text-sm font-bold text-slate-800 group-hover:text-brand-primary transition-colors">Statistik Warga</span>
            </Link>
            
            <Link href="/layanan/keamanan-wilayah" className="group flex flex-col items-center text-center no-underline outline-none rounded-xs p-2 transition-colors hover:bg-slate-50/50">
              <div className="w-12 h-12 rounded-xs flex items-center justify-center mb-3 icon-badge shadow-md">
                <ShieldAlert size={20} strokeWidth={2} />
              </div>
              <span className="text-sm font-bold text-slate-800 group-hover:text-brand-primary transition-colors">Lapor Keamanan</span>
            </Link>
            
            <Link href="/hubungi-kami" className="group flex flex-col items-center text-center no-underline outline-none rounded-xs p-2 transition-colors hover:bg-slate-50/50">
              <div className="w-12 h-12 rounded-xs flex items-center justify-center mb-3 icon-badge shadow-md">
                <PhoneCall size={20} strokeWidth={2} />
              </div>
              <span className="text-sm font-bold text-slate-800 group-hover:text-brand-primary transition-colors">Pusat Bantuan</span>
            </Link>
          </div>
        </div>

        {/* Demographics Bar - Dashboard Shape with Navy Theme */}
        <div className="flex flex-wrap items-center justify-between md:justify-around bg-brand-primary text-white rounded-xs border border-brand-primary-hover p-8 shadow-sm">
          <div className="flex items-center gap-4">
            <MapPin className="text-brand-light opacity-80" size={28} strokeWidth={1.5} />
            <div className="flex flex-col">
              <span className="text-2xl font-bold leading-none mb-1">8</span>
              <span className="text-xs text-brand-light opacity-90 uppercase tracking-wider font-semibold">Rukun Tetangga</span>
            </div>
          </div>
          
          <div className="hidden md:block w-px h-10 bg-brand-primary-hover"></div>
          
          <div className="flex items-center gap-4">
            <Home className="text-brand-light opacity-80" size={28} strokeWidth={1.5} />
            <div className="flex flex-col">
              <span className="text-2xl font-bold leading-none mb-1">350+</span>
              <span className="text-xs text-brand-light opacity-90 uppercase tracking-wider font-semibold">Kepala Keluarga</span>
            </div>
          </div>

          <div className="hidden md:block w-px h-10 bg-brand-primary-hover"></div>
          
          <div className="flex items-center gap-4">
            <Users className="text-brand-light opacity-80" size={28} strokeWidth={1.5} />
            <div className="flex flex-col">
              <span className="text-2xl font-bold leading-none mb-1">1.200+</span>
              <span className="text-xs text-brand-light opacity-90 uppercase tracking-wider font-semibold">Total Warga</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
