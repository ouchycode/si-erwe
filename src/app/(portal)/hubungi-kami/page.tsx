"use client";

import { useEffect, useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, Loader2 } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContentSection } from "@/components/ui/ContentSection";
import { ALAMAT, KONTAK, JAM_OPERASIONAL } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { KATEGORI_PESAN_OPTIONS } from "@/lib/types";
import type { SettingGroups, SekretariatAlamat, SekretariatKontak, JamOperasionalItem } from "@/lib/types";

export default function HubungiKami() {
  const [settings, setSettings] = useState<SettingGroups | null>(null);
  const [nama, setNama] = useState("");
  const [kontak, setKontak] = useState("");
  const [kategori, setKategori] = useState("pertanyaan");
  const [pesan, setPesan] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    api
      .get<{ data: SettingGroups }>("/settings")
      .then((res) => setSettings(res.data))
      .catch(() => setSettings(null));
  }, []);

  const alamat = (settings?.alamat?.sekretariat as SekretariatAlamat | undefined) ?? ALAMAT;
  const kontakInfo = (settings?.kontak?.sekretariat as SekretariatKontak | undefined) ?? KONTAK;
  const jam = (settings?.jam_operasional?.sekretariat as JamOperasionalItem[] | undefined) ?? JAM_OPERASIONAL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post("/pesan", { nama, kontak, kategori, pesan });
      setNama("");
      setKontak("");
      setKategori("pertanyaan");
      setPesan("");
      toast.success("Pesan Terkirim", {
        description: "Terima kasih! Pesan Anda telah terkirim ke sekretariat RW 04.",
      });
    } catch (err: unknown) {
      toast.error("Gagal mengirim pesan", {
        description: err instanceof Error ? err.message : "Terjadi kesalahan, coba lagi.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans pb-20">
      <PageHeader
        category="Layanan Warga"
        title="Hubungi Kami"
        description="Punya pertanyaan, keluhan, atau saran? Hubungi sekretariat RW 04 melalui formulir atau kontak di bawah ini."
      />

      <ContentSection>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* FORM */}
              <div className="lg:col-span-3 bg-slate-50 rounded-xs p-6 md:p-8 shadow-sm">
                <div className="flex items-center gap-2.5 mb-7 pb-5 border-b border-slate-200">
                  <Send size={15} className="text-brand-primary" />
                  <h2 className="text-[13.5px] font-bold text-slate-800">
                    Kirim Pesan / Aspirasi
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="nama">Nama Lengkap</Label>
                      <Input
                        id="nama"
                        required
                        placeholder="Nama Anda"
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="kontak">No. HP / Blok Rumah</Label>
                      <Input
                        id="kontak"
                        required
                        placeholder="0812... / Blok A No. 5"
                        value={kontak}
                        onChange={(e) => setKontak(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="kategori">Kategori Pesan</Label>
                    <Select value={kategori} onValueChange={(v) => setKategori(v ?? "pertanyaan")}>
                      <SelectTrigger id="kategori">
                        <SelectValue placeholder="Pilih Kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        {KATEGORI_PESAN_OPTIONS.map((o) => (
                          <SelectItem key={o.value} value={o.value}>
                            {o.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="pesan">Isi Pesan</Label>
                    <Textarea
                      id="pesan"
                      rows={5}
                      required
                      placeholder="Tuliskan detail pesan atau aspirasi Anda..."
                      className="resize-none"
                      value={pesan}
                      onChange={(e) => setPesan(e.target.value)}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto mt-2 flex gap-2"
                    size="lg"
                  >
                    {submitting ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                    {submitting ? "Mengirim..." : "Kirim Pesan"}
                  </Button>
                </form>
              </div>

              {/* SIDEBAR */}
              <div className="lg:col-span-2 flex flex-col gap-6">
                {/* Kontak Resmi */}
                <div className="bg-brand-primary rounded-xs p-6 text-white shadow-sm">
                  <p className="text-[11px] font-semibold tracking-widest text-white/40 uppercase mb-5">
                    Informasi Sekretariat
                  </p>
                  <div className="flex flex-col gap-5">
                    {[
                      {
                        icon: MapPin,
                        label: "Alamat",
                        content: (
                          <p className="text-[13px] text-white/70 leading-relaxed">
                            {alamat.tempat}
                            <br />
                            {alamat.kelurahan}, {alamat.kecamatan}
                            <br />
                            {alamat.kota}, {alamat.provinsi} {alamat.kodePos}
                          </p>
                        ),
                      },
                      {
                        icon: Phone,
                        label: "WhatsApp / Telepon",
                        content: (
                          <a
                            href={`tel:${kontakInfo.waTelp}`}
                            className="text-[13.5px] font-semibold text-white hover:text-white/70 no-underline transition-colors"
                          >
                            {kontakInfo.wa}
                          </a>
                        ),
                      },
                      {
                        icon: Mail,
                        label: "Email",
                        content: (
                          <a
                            href={`mailto:${kontakInfo.email}`}
                            className="text-[13.5px] font-semibold text-white hover:text-white/70 no-underline transition-colors"
                          >
                            {kontakInfo.email}
                          </a>
                        ),
                      },
                    ].map(({ icon: Icon, label, content }) => (
                      <div key={label} className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-white/10 rounded-xs flex items-center justify-center shrink-0">
                          <Icon size={14} className="text-white/80" />
                        </div>
                        <div>
                          <p className="text-[10.5px] text-white/40 font-semibold uppercase tracking-widest mb-1">
                            {label}
                          </p>
                          {content}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Jam Operasional */}
                <div className="bg-slate-50 rounded-xs p-6 shadow-sm">
                  <div className="flex items-center gap-2.5 mb-4 pb-4 border-b border-slate-200">
                    <Clock size={14} className="text-brand-primary" />
                    <h3 className="text-[13px] font-bold text-slate-800">
                      Jam Operasional
                    </h3>
                  </div>
                  <div className="flex flex-col gap-2.5 text-[12.5px]">
                    {Array.isArray(jam) &&
                      jam.map((item) => (
                        <div key={item.hari} className={`flex justify-between items-center ${item.libur ? "pt-2.5 border-t border-slate-200" : ""}`}>
                          <span className={item.libur ? "text-gray-400" : "text-gray-500"}>{item.hari}</span>
                          <span className={`font-bold ${item.libur ? "text-red-400" : "text-slate-800"}`}>{item.jam}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
      </ContentSection>
    </div>
  );
}
