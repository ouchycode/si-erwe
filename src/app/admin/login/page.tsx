"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate login API call
    setTimeout(() => {
      // In a real app, you would set a cookie/token here
      localStorage.setItem("rw12_admin_auth", "true");
      router.push("/admin");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-brand-primary flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md bg-white rounded-lg shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 to-brand-primary"></div>
        
        <div className="p-8 md:p-10 text-center">
          <div className="w-16 h-16 bg-blue-50 text-brand-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock size={32} />
          </div>
          
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Back-Office RW 12</h1>
          <p className="text-gray-500 text-sm mb-8">Sistem Manajemen Kelurahan Terpadu</p>

          <form onSubmit={handleLogin} className="space-y-5 text-left">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Username Pengurus</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-400" />
                </div>
                <input 
                  type="text" 
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xs focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xs focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all text-sm"
                />
              </div>
            </div>

            <button 
              disabled={isSubmitting}
              type="submit" 
              className="w-full bg-brand-primary text-white font-bold px-8 py-4 rounded-xs hover:bg-brand-primary-hover transition-colors flex items-center justify-center gap-2 cursor-pointer border-none disabled:opacity-70 mt-6"
            >
              {isSubmitting ? "Otentikasi..." : "Masuk ke Dashboard"} <ArrowRight size={18} />
            </button>
          </form>
        </div>
        
        <div className="bg-slate-50 p-4 text-center border-t border-gray-100">
          <p className="text-xs text-gray-400 font-medium">Hanya untuk Pengurus RT/RW yang sah.</p>
        </div>
      </div>
    </div>
  );
}
