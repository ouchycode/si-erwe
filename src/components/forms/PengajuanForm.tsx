"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function PengajuanForm() {
  const [nik, setNik] = useState("");
  const [nama, setNama] = useState("");
  const [layanan, setLayanan] = useState("");
  const [keperluan, setKeperluan] = useState("");

  return (
    <form
      className="p-6 md:p-8 flex flex-col gap-6"
      onSubmit={(e) => {
        e.preventDefault();
        toast.success("Pengajuan berhasil dikirim", { description: "Tim kami akan memproses dalam 1x24 jam." });
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <Label htmlFor="nik" className="text-xs font-bold text-slate-800 uppercase tracking-widest">
            Nomor Induk Kependudukan (NIK)
          </Label>
          <Input id="nik" type="text" placeholder="16 Digit NIK Anda" value={nik} onChange={(e) => setNik(e.target.value)} />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="nama" className="text-xs font-bold text-slate-800 uppercase tracking-widest">
            Nama Lengkap Pemohon
          </Label>
          <Input id="nama" type="text" placeholder="Sesuai KTP" value={nama} onChange={(e) => setNama(e.target.value)} />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="layanan" className="text-xs font-bold text-slate-800 uppercase tracking-widest">
          Jenis Layanan
        </Label>
        <Select value={layanan} onValueChange={(v) => setLayanan(v ?? "")}>
          <SelectTrigger id="layanan" className="border-slate-200 bg-slate-50 hover:bg-white">
            <SelectValue placeholder="Pilih jenis layanan..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pengantar">Surat Pengantar RT/RW</SelectItem>
            <SelectItem value="domisili">Surat Keterangan Domisili</SelectItem>
            <SelectItem value="ktp">Pengurusan KTP/KK Baru</SelectItem>
            <SelectItem value="lainnya">Lainnya</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="keperluan" className="text-xs font-bold text-slate-800 uppercase tracking-widest">
          Keperluan
        </Label>
        <Textarea id="keperluan" rows={3} placeholder="Jelaskan keperluan pembuatan surat secara singkat..." value={keperluan} onChange={(e) => setKeperluan(e.target.value)} />
      </div>

      <Button type="submit" className="bg-brand-primary hover:bg-brand-primary-hover text-white rounded-xs px-6 py-3.5 text-sm font-bold flex items-center justify-center gap-2 transition-colors mt-2 border-none cursor-pointer">
        Kirim Pengajuan
        <Send size={16} />
      </Button>
    </form>
  );
}
