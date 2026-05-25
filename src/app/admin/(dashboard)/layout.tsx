"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Settings, LogOut, Grid, Megaphone, FileText } from "lucide-react";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Simple auth check mockup
    const isAuth = localStorage.getItem("rw12_admin_auth");
    if (!isAuth) {
      router.push("/admin/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("rw12_admin_auth");
    router.push("/admin/login");
  };

  const navItems = [
    { label: "Dashboard Utama", href: "/admin", icon: LayoutDashboard },
    { label: "Data Laporan Warga", href: "/admin#laporan", icon: Megaphone },
    { label: "Data E-Surat", href: "/admin#surat", icon: FileText },
  ];

  if (!isClient) return null; // Prevent hydration mismatch during redirect

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      
      {/* Sidebar */}
      <aside className="w-64 bg-brand-primary text-white flex flex-col hidden md:flex shrink-0">
        <div className="p-6 border-b border-white/10 flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded-xs flex items-center justify-center text-brand-primary">
            <Grid size={16} />
          </div>
          <div>
            <h1 className="text-sm font-bold m-0 leading-tight">Admin RW 12</h1>
            <p className="text-[10px] text-blue-200 font-medium uppercase tracking-widest m-0">Back-Office</p>
          </div>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-2">
          <p className="text-[10px] font-bold text-blue-300 uppercase tracking-widest px-4 mb-2">Menu Utama</p>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xs text-sm font-bold transition-colors no-underline ${
                  isActive 
                    ? "bg-brand-primary-hover text-white border-l-4 border-white" 
                    : "text-blue-100 hover:bg-white/5 border-l-4 border-transparent"
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-4 py-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center text-white font-bold text-sm">
              RW
            </div>
            <div>
              <p className="text-sm font-bold m-0 leading-tight">Admin Sistem</p>
              <p className="text-[10px] text-blue-200 m-0">Ketua RW 12</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-3 text-sm font-bold text-blue-200 hover:text-white hover:bg-white/5 rounded-xs transition-colors border-none bg-transparent cursor-pointer"
          >
            <LogOut size={18} /> Keluar
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header (Mockup only) */}
        <header className="md:hidden bg-brand-primary text-white p-4 flex items-center justify-between shrink-0">
          <h1 className="text-sm font-bold m-0">Admin RW 12</h1>
          <button onClick={handleLogout} className="text-white bg-transparent border-none p-1"><LogOut size={20}/></button>
        </header>

        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
