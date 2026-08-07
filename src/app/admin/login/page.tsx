"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, LogIn, Eye, EyeOff } from "lucide-react";

import { adminLogin, getToken, setStoredUser, fetchMe } from "@/lib/adminApi";
import { ApiError } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function AdminLoginPage() {
  const router = useRouter();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = getToken();
    if (token) {
      void fetchMe().then((user) => {
        if (user) {
          setStoredUser(user);
          router.replace("/admin/dashboard");
        }
      });
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const user = await adminLogin(login, password);
      setStoredUser(user);
      router.replace("/admin/dashboard");
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "Terjadi kesalahan, coba lagi."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="mb-3 flex size-14 items-center justify-center rounded-xs bg-brand-primary text-white shadow-md">
            <Shield className="size-7" />
          </div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">Admin RW 04</h1>
          <p className="mt-1 text-sm text-slate-500">
            Masuk untuk mengelola konten situs Sekretariat RW 04
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-xs border border-slate-100 bg-white p-6 shadow-sm"
        >
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="login">Email / Username</Label>
            <Input
              id="login"
              type="text"
              autoComplete="username"
              required
              placeholder="username"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute top-1/2 right-2 -translate-y-1/2 rounded p-1 text-gray-400 hover:text-gray-600"
                aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full bg-brand-primary hover:bg-brand-primary-hover">
            {loading ? "Memproses..." : "Masuk"}
            {!loading && <LogIn className="size-4" />}
          </Button>
        </form>
      </div>
    </div>
  );
}
