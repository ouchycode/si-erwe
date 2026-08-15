"use client";

import { useState } from "react";
import { Send, Copy, Check, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { JENIS_LAYANAN_OPTIONS, STATUS_PENGAJUAN_OPTIONS } from "@/lib/types";
import type { Pengajuan, ApiMessage } from "@/lib/types";

const STATUS_STYLE: Record<string, string> = {
  menunggu: "bg-amber-50 text-amber-700 border-amber-200",
  diproses: "bg-blue-50 text-blue-700 border-blue-200",
  selesai: "bg-green-50 text-green-700 border-green-200",
  ditolak: "bg-red-50 text-red-700 border-red-200",
};

const STATUS_LABEL = Object.fromEntries(STATUS_PENGAJUAN_OPTIONS.map((o) => [o.value, o.label]));
const LAYANAN_LABEL = Object.fromEntries(JENIS_LAYANAN_OPTIONS.map((o) => [o.value, o.label]));

export function PengajuanForm() {
  const [nik, setNik] = useState("");
  const [nama, setNama] = useState("");
  const [jenisLayanan, setJenisLayanan] = useState("");
  const [keperluan, setKeperluan] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<Pengajuan | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await api.post<ApiMessage<Pengajuan>>("/pengajuan", {
        nik,
        nama,
        jenis_layanan: jenisLayanan,
        keperluan,
      });
      setResult(res.data ?? null);
      toast.success("Pengajuan berhasil dikirim", {
        description: "Simpan kode untuk melacak status pengajuan.",
      });
    } catch (err: unknown) {
      toast.error("Gagal mengirim pengajuan", {
        description: err instanceof Error ? err.message : "Terjadi kesalahan, coba lagi.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const copyKode = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result.kode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <form data-aos="fade-up" className="p-6 md:p-8 flex flex-col gap-6" onSubmit={handleSubmit}>
      {result ? (
        <div className="flex flex-col gap-5">
          <div className="bg-green-50 border border-green-200 rounded-xs p-5">
            <p className="text-sm font-bold text-green-800 mb-1">Pengajuan Berhasil Dikirim</p>
            <p className="text-xs text-green-700 leading-relaxed mb-4">
              Simpan kode berikut untuk melacak status pengajuan Anda.
            </p>
            <div className="flex items-center justify-between bg-white rounded-xs border border-green-200 px-4 py-3">
              <span className="font-mono font-bold text-brand-primary tracking-wider">{result.kode}</span>
              <button
                type="button"
                onClick={copyKode}
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-brand-primary transition-colors bg-transparent border-none cursor-pointer"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? "Tersalin" : "Salin"}
              </button>
            </div>
          </div>

          <div className="bg-slate-50 rounded-xs border border-slate-100 p-5">
            <p className="text-xs font-bold text-slate-800 uppercase tracking-widest mb-3">
              Status Terkini
            </p>
            <div className="flex items-center gap-3">
              <span className={`text-xs font-bold px-3 py-1.5 rounded-xs border ${STATUS_STYLE[result.status] ?? "bg-slate-100 text-slate-600"}`}>
                {STATUS_LABEL[result.status] ?? result.status}
              </span>
              {result.catatan && (
                <p className="text-xs text-gray-500">{result.catatan}</p>
              )}
            </div>
            <p className="text-xs text-gray-400 mt-3">
              Layanan: {LAYANAN_LABEL[result.jenis_layanan] ?? result.jenis_layanan}
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={() => setResult(null)}
            className="mt-2"
          >
            Buat Pengajuan Baru
          </Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <Label htmlFor="nik" className="text-xs font-bold text-slate-800 uppercase tracking-widest">
                Nomor Induk Kependudukan (NIK)
              </Label>
              <Input
                id="nik"
                type="text"
                placeholder="16 Digit NIK Anda"
                required
                pattern="[0-9]{16}"
                maxLength={16}
                value={nik}
                onChange={(e) => setNik(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="nama" className="text-xs font-bold text-slate-800 uppercase tracking-widest">
                Nama Lengkap Pemohon
              </Label>
              <Input
                id="nama"
                type="text"
                placeholder="Sesuai KTP"
                required
                value={nama}
                onChange={(e) => setNama(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="layanan" className="text-xs font-bold text-slate-800 uppercase tracking-widest">
              Jenis Layanan
            </Label>
            <Select value={jenisLayanan} onValueChange={(v) => setJenisLayanan(v ?? "")}>
              <SelectTrigger id="layanan" className="border-slate-200 bg-slate-50 hover:bg-white">
                <SelectValue placeholder="Pilih jenis layanan..." />
              </SelectTrigger>
              <SelectContent>
                {JENIS_LAYANAN_OPTIONS.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="keperluan" className="text-xs font-bold text-slate-800 uppercase tracking-widest">
              Keperluan
            </Label>
            <Textarea
              id="keperluan"
              rows={3}
              placeholder="Jelaskan keperluan pembuatan surat secara singkat..."
              required
              value={keperluan}
              onChange={(e) => setKeperluan(e.target.value)}
            />
          </div>

          <Button
            type="submit"
            disabled={submitting}
            className="bg-brand-primary hover:bg-brand-primary-hover text-white rounded-xs px-6 py-3.5 text-sm font-bold flex items-center justify-center gap-2 transition-colors mt-2 border-none cursor-pointer"
          >
            <Send size={16} />
            {submitting ? "Mengirim..." : "Kirim Pengajuan"}
          </Button>
        </>
      )}
    </form>
  );
}

export function CekStatusPengajuan() {
  const [kode, setKode] = useState("");
  const [result, setResult] = useState<Pengajuan | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!kode.trim()) return;
    setChecking(true);
    setError(null);
    setResult(null);
    try {
      const res = await api.get<ApiMessage<Pengajuan>>(`/pengajuan/${encodeURIComponent(kode.trim())}/status`);
      setResult(res.data ?? null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Kode tidak ditemukan.");
    } finally {
      setChecking(false);
    }
  };

  return (
    <div data-aos="fade-up" className="p-6 md:p-8 flex flex-col gap-6">
      <div className="flex items-center gap-2.5">
        <Search size={15} className="text-brand-primary" />
        <h3 className="text-sm font-bold text-slate-800">Lacak Status Pengajuan</h3>
      </div>

      <form onSubmit={handleCheck} className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <Label htmlFor="cek-kode" className="text-xs font-bold text-slate-800 uppercase tracking-widest">
            Kode Pengajuan
          </Label>
          <Input
            id="cek-kode"
            placeholder="Contoh: PRW-260806-AB12C"
            value={kode}
            onChange={(e) => setKode(e.target.value)}
          />
        </div>
        <Button
          type="submit"
          disabled={checking || !kode.trim()}
          className="bg-brand-primary hover:bg-brand-primary-hover text-white rounded-xs text-sm font-bold border-none cursor-pointer"
        >
          {checking ? "Memeriksa..." : "Cek Status"}
        </Button>
      </form>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xs p-4">
          <p className="text-xs font-semibold text-red-700">{error}</p>
        </div>
      )}

      {result && (
        <div className="bg-slate-50 rounded-xs border border-slate-100 p-5 flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2 justify-between">
            <span className="font-mono text-sm font-bold text-brand-primary">{result.kode}</span>
            <span className={`text-xs font-bold px-3 py-1.5 rounded-xs border ${STATUS_STYLE[result.status] ?? "bg-slate-100 text-slate-600"}`}>
              {STATUS_LABEL[result.status] ?? result.status}
            </span>
          </div>
          <div className="text-xs text-gray-600 space-y-1">
            <p>
              <span className="font-bold text-slate-800">Pemohon:</span> {result.nama} ({result.nik})
            </p>
            <p>
              <span className="font-bold text-slate-800">Layanan:</span>{" "}
              {LAYANAN_LABEL[result.jenis_layanan] ?? result.jenis_layanan}
            </p>
            {result.catatan && (
              <p>
                <span className="font-bold text-slate-800">Catatan:</span> {result.catatan}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
