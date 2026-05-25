import Link from "next/link";
import { Bell, User, ArrowLeft, Grid } from "lucide-react";

export default function AppShellHeader() {
  return (
    <header className="bg-white border-b border-slate-100 sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 md:px-8 h-16 max-w-7xl mx-auto">
        
        {/* Kiri: Brand & Logo */}
        <div className="flex items-center gap-3">
          <Link 
            href="/"
            className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors mr-2"
            title="Kembali ke SI-RW Utama"
          >
            <ArrowLeft size={16} />
          </Link>
          <div className="w-8 h-8 bg-brand-primary rounded-xs flex items-center justify-center text-white">
            <Grid size={16} />
          </div>
          <div>
            <h1 className="text-sm font-bold text-slate-800 leading-tight m-0 tracking-tight">Portal Digital</h1>
            <p className="text-[10px] text-gray-500 font-medium uppercase tracking-widest m-0">SI-RW 12 Kutabumi</p>
          </div>
        </div>

        {/* Kanan: User Profile & Actions */}
        <div className="flex items-center gap-4">
          <button className="relative p-2 text-gray-400 hover:text-brand-primary transition-colors cursor-pointer rounded-full hover:bg-slate-50 border-none bg-transparent outline-none">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 border border-white rounded-full"></span>
          </button>
          
          <div className="h-6 w-px bg-gray-200 hidden md:block"></div>

          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="flex flex-col items-end">
              <span className="text-sm font-bold text-slate-800 leading-tight">Akses Publik</span>
              <span className="text-[10px] text-brand-primary font-bold uppercase tracking-widest">Tanpa Login</span>
            </div>
          </div>
        </div>
        
      </div>
    </header>
  );
}
