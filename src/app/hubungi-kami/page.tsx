"use client";

import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";

import { PageHeader } from "@/components/ui/PageHeader";
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

export default function HubungiKami() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Pesan Terkirim", {
      description: "Terima kasih! Pesan Anda telah terkirim ke sekretariat RW 12.",
    });
  };

  return (
    <div className="min-h-screen bg-white pb-20 font-sans">
      <PageHeader
        category="Layanan Warga"
        title="Hubungi Kami"
        description="Punya pertanyaan, keluhan, atau saran? Hubungi sekretariat RW 12 melalui formulir atau kontak di bawah ini."
      />

      <div className="max-w-6xl mx-auto px-6 md:px-16 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* FORM */}
          <div className="lg:col-span-3 bg-white border border-gray-100 rounded-md p-6 md:p-8">
            <div className="flex items-center gap-2.5 mb-7 pb-5 border-b border-gray-100">
              <Send size={15} className="text-brand-primary" />
              <h2 className="text-[13.5px] font-bold text-gray-900">
                Kirim Pesan / Aspirasi
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="nama">Nama Lengkap</Label>
                  <Input id="nama" required placeholder="Nama Anda" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="kontak">No. HP / Blok Rumah</Label>
                  <Input id="kontak" required placeholder="0812... / Blok A No. 5" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="kategori">Kategori Pesan</Label>
                <Select required defaultValue="pertanyaan">
                  <SelectTrigger id="kategori">
                    <SelectValue placeholder="Pilih Kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pertanyaan">Pertanyaan Umum</SelectItem>
                    <SelectItem value="laporan">Laporan Keluhan / Keamanan</SelectItem>
                    <SelectItem value="saran">Saran & Masukan</SelectItem>
                    <SelectItem value="lainnya">Lainnya</SelectItem>
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
                />
              </div>

              <Button type="submit" className="w-full sm:w-auto mt-2 flex gap-2" size="lg">
                Kirim Pesan
                <Send size={14} />
              </Button>
            </form>
          </div>

          {/* SIDEBAR */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* Kontak Resmi */}
            <div className="bg-brand-primary rounded-md p-6 text-white">
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
                        Gedung Serbaguna RW 12
                        <br />
                        Kel. Kutabumi, Kec. Pasar Kemis
                        <br />
                        Kab. Tangerang, Banten 15560
                      </p>
                    ),
                  },
                  {
                    icon: Phone,
                    label: "WhatsApp / Telepon",
                    content: (
                      <a
                        href="tel:081122223333"
                        className="text-[13.5px] font-semibold text-white hover:text-white/70 no-underline transition-colors"
                      >
                        +62 811-2222-3333
                      </a>
                    ),
                  },
                  {
                    icon: Mail,
                    label: "Email",
                    content: (
                      <a
                        href="mailto:admin@rw12kutabumi.id"
                        className="text-[13.5px] font-semibold text-white hover:text-white/70 no-underline transition-colors"
                      >
                        admin@rw12kutabumi.id
                      </a>
                    ),
                  },
                ].map(({ icon: Icon, label, content }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-white/10 rounded-md flex items-center justify-center shrink-0">
                      <Icon size={14} className="text-white/60" />
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
            <div className="bg-brand-light border border-gray-100 rounded-md p-6">
              <div className="flex items-center gap-2.5 mb-4 pb-4 border-b border-gray-100">
                <Clock size={14} className="text-brand-primary" />
                <h3 className="text-[13px] font-bold text-gray-900">
                  Jam Operasional
                </h3>
              </div>
              <div className="flex flex-col gap-2.5 text-[12.5px]">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Senin – Jumat</span>
                  <span className="font-bold text-gray-900">19.00 – 22.00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Sabtu – Minggu</span>
                  <span className="font-bold text-gray-900">09.00 – 15.00</span>
                </div>
                <div className="flex justify-between items-center pt-2.5 border-t border-gray-100">
                  <span className="text-gray-400">Hari Libur Nasional</span>
                  <span className="font-bold text-red-400">Tutup</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
