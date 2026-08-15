"use client";

import { useState } from "react";
import {
  Save,
  Settings,
  RefreshCw,
  Code2,
  Upload,
  Trash2,
  Plus,
  Search,
  MapPin,
  Phone,
  Clock,
  User,
  ShieldAlert,
  Recycle,
  HeartPulse,
  BarChart3,
  Sprout,
  Home,
  FileText,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { toast } from "sonner";

import { admin } from "@/lib/adminApi";
import { ApiError, resolveImageUrl } from "@/lib/api";
import { useFetch } from "@/lib/hooks/useFetch";
import type { SettingGroups, ApiMessage } from "@/lib/types";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import RichTextEditor from "@/components/admin/RichTextEditor";

type Scalar = string | number | boolean;
type ListRow = Record<string, Scalar | string[]>;

const SETTING_LABELS: Record<string, { label: string; desc?: string }> = {
  "identitas.logo": {
    label: "Logo",
    desc: "Logo situs di pojok kiri atas. Kosongkan untuk memakai ikon bawaan.",
  },
  "identitas.nama": {
    label: "Nama Institusi",
    desc: "Nama yang tampil di samping logo pada menu navigasi.",
  },
  "identitas.tagline": {
    label: "Tagline",
    desc: "Teks kecil di bawah nama, misalnya nama kota.",
  },
  "statistik.tahunAwal": {
    label: "Tahun Awal Statistik",
    desc: "Tahun pertama yang muncul di dropdown statistik. Ubah di sini jika perlu menambah tahun.",
  },
  "hero.gambar": {
    label: "Gambar Hero",
    desc: "Gambar latar banner utama halaman depan. Kosongkan untuk memakai gambar bawaan.",
  },
  "alamat.sekretariat": {
    label: "Alamat Sekretariat",
    desc: "Alamat kantor/sekretariat RW 04 yang tampil di situs.",
  },
  "kontak.sekretariat": {
    label: "Kontak Sekretariat",
    desc: "Nomor WhatsApp dan email pengurus.",
  },
  "jam_operasional.sekretariat": {
    label: "Jam Operasional",
    desc: "Jadwal buka layanan administrasi.",
  },
  "profil.umum": {
    label: "Profil Umum",
    desc: "Periode kepengurusan dan jumlah RT/KK.",
  },
  "profil.visi": { label: "Visi", desc: "Visi RW 04." },
  "profil.misi": {
    label: "Misi",
    desc: "Misi RW 04, tulis satu misi per baris.",
  },
  "profil.sejarah": {
    label: "Sejarah",
    desc: "Sejarah RW 04, tulis satu paragraf per baris.",
  },
  "layanan.kartu": {
    label: "Kartu Layanan",
    desc: "Daftar layanan warga yang tampil di beranda.",
  },
  "layanan.administrasi": {
    label: "Layanan Administrasi",
    desc: "Surat dan persyaratan administrasi.",
  },
  "layanan.alur": {
    label: "Alur Layanan",
    desc: "Tahapan pengurusan layanan.",
  },
  "program_warga.daftar": {
    label: "Program Warga",
    desc: "Program KWT dan Bank Sampah.",
  },
  "keamanan_wilayah.deskripsi": {
    label: "Deskripsi Halaman",
    desc: "Ringkasan singkat di bawah judul halaman Keamanan Wilayah.",
  },
  "keamanan_wilayah.s1Judul": { label: "Judul Bagian 1" },
  "keamanan_wilayah.s1Teks": {
    label: "Paragraf Bagian 1",
    desc: "Tulis satu paragraf per baris.",
  },
  "keamanan_wilayah.s1Gambar": { label: "Gambar Bagian 1", desc: "URL gambar (bisa dari Unsplash)." },
  "keamanan_wilayah.s2Judul": { label: "Judul Bagian 2" },
  "keamanan_wilayah.s2Teks": {
    label: "Paragraf Bagian 2",
    desc: "Tulis satu paragraf per baris.",
  },
  "keamanan_wilayah.s2List": {
    label: "Poin Bagian 2",
    desc: "Daftar poin, satu per baris.",
  },
  "keamanan_wilayah.s2Gambar": { label: "Gambar Bagian 2", desc: "URL gambar (bisa dari Unsplash)." },
  "keamanan_wilayah.s3Judul": { label: "Judul Bagian 3" },
  "keamanan_wilayah.s3Teks": {
    label: "Paragraf Bagian 3",
    desc: "Tulis satu paragraf per baris.",
  },
  "kebersihan_lingkungan.deskripsi": {
    label: "Deskripsi Halaman",
    desc: "Ringkasan singkat di bawah judul halaman Kebersihan Lingkungan.",
  },
  "kebersihan_lingkungan.s1Judul": { label: "Judul Bagian 1" },
  "kebersihan_lingkungan.s1Teks": {
    label: "Paragraf Bagian 1",
    desc: "Tulis satu paragraf per baris.",
  },
  "kebersihan_lingkungan.s1Gambar": { label: "Gambar Bagian 1", desc: "URL gambar (bisa dari Unsplash)." },
  "kebersihan_lingkungan.s2Judul": { label: "Judul Bagian 2" },
  "kebersihan_lingkungan.s2Teks": {
    label: "Paragraf Bagian 2",
    desc: "Tulis satu paragraf per baris.",
  },
  "kebersihan_lingkungan.s2Gambar": { label: "Gambar Bagian 2", desc: "URL gambar (bisa dari Unsplash)." },
  "posyandu.deskripsi": {
    label: "Deskripsi Halaman",
    desc: "Ringkasan singkat di bawah judul halaman Posyandu.",
  },
  "posyandu.s1Judul": { label: "Judul Bagian 1" },
  "posyandu.s1Teks": {
    label: "Paragraf Bagian 1",
    desc: "Tulis satu paragraf per baris.",
  },
  "posyandu.s1Kutipan": { label: "Kutipan Bagian 1", desc: "Kalimat kutipan yang ditebalkan." },
  "posyandu.s1Gambar": { label: "Gambar Bagian 1", desc: "URL gambar (bisa dari Unsplash)." },
  "posyandu.s2Judul": { label: "Judul Bagian 2" },
  "posyandu.s2Teks": {
    label: "Paragraf Bagian 2",
    desc: "Tulis satu paragraf per baris.",
  },
  "posyandu.s2Gambar": { label: "Gambar Bagian 2", desc: "URL gambar (bisa dari Unsplash)." },
};

const GROUP_META: Record<string, { label: string; icon: React.ElementType }> = {
  identitas: { label: "Identitas & Logo", icon: Settings },
  hero: { label: "Banner Utama", icon: Home },
  alamat: { label: "Alamat Sekretariat", icon: MapPin },
  kontak: { label: "Kontak", icon: Phone },
  jam_operasional: { label: "Jam Operasional", icon: Clock },
  profil: { label: "Profil RW", icon: User },
  layanan: { label: "Layanan", icon: FileText },
  program_warga: { label: "Program Warga", icon: Sprout },
  keamanan_wilayah: { label: "Keamanan Wilayah", icon: ShieldAlert },
  kebersihan_lingkungan: { label: "Kebersihan Lingkungan", icon: Recycle },
  posyandu: { label: "Posyandu", icon: HeartPulse },
  statistik: { label: "Statistik", icon: BarChart3 },
};

function groupLabel(group: string): string {
  return GROUP_META[group]?.label ?? toLabel(group);
}

function toLabel(s: string): string {
  return s
    .replace(/[_-]+/g, " ")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/\bRt\b/g, "RT")
    .replace(/\bKk\b/g, "KK")
    .replace(/\bWa\b/g, "WA")
    .replace(/\bKwt\b/g, "KWT")
    .replace(/^./, (c) => c.toUpperCase());
}

function isStringArray(v: unknown): v is string[] {
  return Array.isArray(v) && v.every((x) => typeof x === "string");
}

function isFlatObject(v: unknown): v is Record<string, Scalar> {
  return (
    typeof v === "object" &&
    v !== null &&
    !Array.isArray(v) &&
    Object.values(v).every(
      (x) => typeof x === "string" || typeof x === "number" || typeof x === "boolean"
    )
  );
}

function isListRow(v: unknown): v is ListRow {
  return (
    typeof v === "object" &&
    v !== null &&
    !Array.isArray(v) &&
    Object.values(v).every(
      (x) =>
        typeof x === "string" ||
        typeof x === "number" ||
        typeof x === "boolean" ||
        (Array.isArray(x) && x.every((y) => typeof y === "string"))
    )
  );
}

function toRichText(value: unknown, asList: boolean): string {
  if (typeof value === "string") {
    if (value.includes("<")) return value;
    const clean = value.trim();
    if (asList) return clean ? `<ul><li>${clean}</li></ul>` : "";
    return clean ? `<p>${clean}</p>` : "";
  }
  const items = Array.isArray(value) ? value.map(String) : [];
  const clean = items.map((s) => s.trim()).filter(Boolean);
  if (asList) {
    const lis = clean.map((s) => `<li>${s}</li>`).join("");
    return lis ? `<ul>${lis}</ul>` : "";
  }
  return clean.map((s) => `<p>${s}</p>`).join("");
}

function HeroImageEditor({
  value,
  onUploaded,
  onClear,
}: {
  value: string;
  onUploaded: (path: string) => void;
  onClear: () => void;
}) {
  const [uploading, setUploading] = useState(false);
  const src = resolveImageUrl(value) ?? "";

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("image", file);
      const res = await admin.post<{ data: { path: string } }>(
        "/admin/settings/upload",
        fd
      );
      const path = res.data?.path;
      if (path) onUploaded(path);
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Gagal mengunggah gambar.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex h-28 w-44 items-center justify-center overflow-hidden rounded-xs border border-slate-200 bg-slate-100">
          {src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src}
              alt="Pratinjau gambar hero"
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="px-2 text-center text-xs text-muted-foreground">
              Belum ada gambar
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-xs border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted">
            <Upload className="size-4" />
            {uploading ? "Mengunggah..." : "Pilih Gambar"}
            <input
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/webp"
              className="hidden"
              onChange={(e) => {
                void handleFile(e.target.files?.[0]);
                e.target.value = "";
              }}
            />
          </label>
          {value && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-destructive"
              onClick={onClear}
            >
              <Trash2 className="size-3.5" />
              Hapus Gambar
            </Button>
          )}
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        Format PNG/JPG/WebP, maksimal 4 MB.
      </p>
    </div>
  );
}

function ListEditor({
  value,
  onChange,
}: {
  value: ListRow[];
  onChange: (next: ListRow[]) => void;
}) {
  const updateRow = (index: number, next: ListRow) => {
    const copy = [...value];
    copy[index] = next;
    onChange(copy);
  };

  const move = (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= value.length) return;
    const copy = [...value];
    const [item] = copy.splice(index, 1);
    copy.splice(target, 0, item);
    onChange(copy);
  };

  const removeRow = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const addRow = () => {
    const template: ListRow = {};
    if (value.length > 0) {
      Object.entries(value[0]).forEach(([k, v]) => {
        template[k] = Array.isArray(v) ? [] : typeof v === "number" ? 0 : "";
      });
    }
    onChange([...value, template]);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {value.map((row, index) => (
          <div
            key={index}
            className="rounded-xs border border-slate-200 bg-slate-50/60 p-4"
          >
            <div className="mb-3 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-brand-primary">
                  Item {index + 1}
                </span>
                <div className="flex items-center gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => move(index, -1)}
                    disabled={index === 0}
                  >
                    <ChevronUp className="size-3.5" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => move(index, 1)}
                    disabled={index === value.length - 1}
                  >
                    <ChevronDown className="size-3.5" />
                  </Button>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-7 text-destructive"
                onClick={() => removeRow(index)}
              >
                <Trash2 className="size-3.5" />
                Hapus
              </Button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {Object.entries(row).map(([k, v]) => (
                <div key={k} className="space-y-1">
                  <Label className="text-xs text-muted-foreground">
                    {toLabel(k)}
                  </Label>
                  {Array.isArray(v) ? (
                    <Textarea
                      rows={3}
                      value={v.join("\n")}
                      onChange={(e) =>
                        updateRow(index, {
                          ...row,
                          [k]: e.target.value.split("\n"),
                        })
                      }
                    />
                  ) : typeof v === "number" ? (
                    <Input
                      type="number"
                      value={String(v)}
                      onChange={(e) =>
                        updateRow(index, {
                          ...row,
                          [k]:
                            e.target.value === "" ? 0 : Number(e.target.value),
                        })
                      }
                    />
                  ) : (
                    <Input
                      value={String(v)}
                      onChange={(e) =>
                        updateRow(index, { ...row, [k]: e.target.value })
                      }
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Button type="button" variant="outline" size="sm" onClick={addRow}>
        <Plus className="size-3.5" />
        Tambah Item
      </Button>
    </div>
  );
}

function SettingEditor({
  group,
  settingKey,
  value,
  onSaved,
}: {
  group: string;
  settingKey: string;
  value: unknown;
  onSaved: () => void;
}) {
  const [editValue, setEditValue] = useState<unknown>(value);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showJson, setShowJson] = useState(false);
  const [jsonRaw, setJsonRaw] = useState(() => JSON.stringify(value, null, 2));

  const kind =
    typeof editValue === "boolean"
      ? "boolean"
      : typeof editValue === "number"
        ? "number"
        : typeof editValue === "string"
          ? "text"
          : isStringArray(editValue)
            ? "lines"
            : isFlatObject(editValue)
              ? "fields"
              : Array.isArray(editValue) && editValue.every(isListRow)
                ? "list"
                : "complex";

  const isHeroImage =
    (group === "hero" && settingKey === "gambar") ||
    (group === "identitas" && settingKey === "logo");

  const isProfilRich =
    group === "profil" &&
    (settingKey === "visi" || settingKey === "misi" || settingKey === "sejarah");

  const isLongText =
    typeof editValue === "string" && (editValue.length > 60 || editValue.includes("\n"));

  const handleChange = (next: unknown) => {
    setEditValue(next);
    setDirty(true);
  };

  const save = async (next: unknown) => {
    setSaving(true);
    try {
      const res = await admin.post<ApiMessage>("/admin/settings", {
        group,
        key: settingKey,
        value: next,
      });
      toast.success(res.message);
      setDirty(false);
      onSaved();
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Gagal menyimpan pengaturan.");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveFriendly = () => {
    let next: unknown = editValue;
    if (kind === "lines") {
      next = (editValue as string[]).map((s) => s.trim()).filter(Boolean);
    }
    if (kind === "number") {
      next = Number(editValue);
    }
    void save(next);
  };

  const handleSaveJson = () => {
    let parsed: unknown;
    try {
      parsed = JSON.parse(jsonRaw);
    } catch {
      toast.error("JSON tidak valid. Periksa kembali formatnya.");
      return;
    }
    void save(parsed);
  };

  const reset = () => {
    setEditValue(value);
    setDirty(false);
    setJsonRaw(JSON.stringify(value, null, 2));
  };

  const label = SETTING_LABELS[`${group}.${settingKey}`]?.label ?? toLabel(settingKey);
  const desc = SETTING_LABELS[`${group}.${settingKey}`]?.desc;

  return (
    <div className="rounded-xs border border-slate-200 bg-white p-4 sm:p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <Label className="text-sm font-semibold text-slate-800">{label}</Label>
          {desc && (
            <p className="mt-0.5 text-xs text-muted-foreground">{desc}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {dirty && (
            <Badge variant="secondary" className="text-amber-600">
              Belum disimpan
            </Badge>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowJson((v) => !v)}
          >
            <Code2 className="size-3.5" />
            {showJson ? "Tutup JSON" : "JSON (Lanjutan)"}
          </Button>
        </div>
      </div>

      {!showJson && (
        <>
          {isHeroImage ? (
            <HeroImageEditor
              value={value as string}
              onUploaded={(path) => void save(path)}
              onClear={() => void save("")}
            />
          ) : isProfilRich ? (
            <RichTextEditor
              value={toRichText(editValue, settingKey === "misi")}
              onChange={(html) => handleChange(html)}
              placeholder={
                settingKey === "visi"
                  ? "Tuliskan visi RW 04..."
                  : settingKey === "misi"
                    ? "Tuliskan misi RW 04, satu poin per baris..."
                    : "Tuliskan sejarah RW 04..."
              }
            />
          ) : (
            <>
              {kind === "boolean" && (
                <div className="flex items-center gap-3">
                  <Switch
                    checked={editValue as boolean}
                    onCheckedChange={(v) => handleChange(v)}
                  />
                  <span className="text-sm text-muted-foreground">
                    {(editValue as boolean) ? "Ya / Aktif" : "Tidak / Nonaktif"}
                  </span>
                </div>
              )}

              {kind === "number" && (
                <Input
                  type="number"
                  value={String(editValue)}
                  onChange={(e) =>
                    handleChange(
                      e.target.value === "" ? 0 : Number(e.target.value)
                    )
                  }
                />
              )}

              {kind === "text" && isLongText && (
                <Textarea
                  rows={5}
                  value={editValue as string}
                  onChange={(e) => handleChange(e.target.value)}
                />
              )}
              {kind === "text" && !isLongText && (
                <Input
                  value={editValue as string}
                  onChange={(e) => handleChange(e.target.value)}
                />
              )}

              {kind === "lines" && (
                <Textarea
                  rows={6}
                  value={(editValue as string[]).join("\n")}
                  onChange={(e) => handleChange(e.target.value.split("\n"))}
                />
              )}

              {kind === "fields" && (
                <div className="grid gap-3 sm:grid-cols-2">
                  {Object.entries(editValue as Record<string, Scalar>).map(
                    ([k, v]) => (
                      <div key={k} className="space-y-1">
                        <Label className="text-xs text-muted-foreground">
                          {toLabel(k)}
                        </Label>
                        {typeof v === "boolean" ? (
                          <Switch
                            checked={v}
                            onCheckedChange={(nv) =>
                              handleChange({
                                ...(editValue as Record<string, Scalar>),
                                [k]: nv,
                              })
                            }
                          />
                        ) : (
                          <Input
                            type={typeof v === "number" ? "number" : "text"}
                            value={String(v)}
                            onChange={(e) =>
                              handleChange({
                                ...(editValue as Record<string, Scalar>),
                                [k]:
                                  typeof v === "number"
                                    ? e.target.value === ""
                                      ? 0
                                      : Number(e.target.value)
                                    : e.target.value,
                              })
                            }
                          />
                        )}
                      </div>
                    )
                  )}
                </div>
              )}

              {kind === "list" && (
                <ListEditor
                  value={editValue as ListRow[]}
                  onChange={handleChange}
                />
              )}

              {kind === "complex" && (
                <p className="rounded-xs border border-dashed border-border bg-muted/30 p-3 text-sm text-muted-foreground">
                  Data ini memiliki struktur khusus. Gunakan tab{" "}
                  <span className="font-medium">JSON (Lanjutan)</span> untuk
                  mengubahnya.
                </p>
              )}
            </>
          )}

          {dirty && (
            <div className="mt-4 flex items-center justify-end gap-2 border-t border-slate-100 pt-4">
              <Button variant="outline" size="sm" onClick={reset}>
                Batal
              </Button>
              <Button
                size="sm"
                disabled={saving}
                onClick={handleSaveFriendly}
                className="bg-brand-primary hover:bg-brand-primary-hover"
              >
                <Save className="size-3.5" />
                {saving ? "Menyimpan..." : "Simpan"}
              </Button>
            </div>
          )}
        </>
      )}

      {showJson && (
        <>
          <Textarea
            rows={8}
            value={jsonRaw}
            onChange={(e) => setJsonRaw(e.target.value)}
            className="font-mono text-xs"
            spellCheck={false}
          />
          <div className="mt-3 flex items-center justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowJson(false)}>
              Batal
            </Button>
            <Button
              size="sm"
              disabled={saving}
              onClick={handleSaveJson}
              className="bg-brand-primary hover:bg-brand-primary-hover"
            >
              <Save className="size-3.5" />
              {saving ? "Menyimpan..." : "Simpan"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default function AdminPengaturanPage() {
  const { data, loading, reload } = useFetch(
    () => admin.get<{ data: SettingGroups }>("/admin/settings"),
    []
  );

  const groups = data?.data ?? {};
  const groupNames = Object.keys(groups);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const selectedGroup = activeGroup ?? groupNames[0] ?? null;

  const filteredKeys = (() => {
    if (!selectedGroup) return [];
    const keys = Object.keys(groups[selectedGroup] ?? {});
    const q = query.trim().toLowerCase();
    if (!q) return keys;
    return keys.filter((key) => {
      const label = SETTING_LABELS[`${selectedGroup}.${key}`]?.label ?? toLabel(key);
      const desc = SETTING_LABELS[`${selectedGroup}.${key}`]?.desc ?? "";
      return (
        label.toLowerCase().includes(q) ||
        desc.toLowerCase().includes(q) ||
        key.toLowerCase().includes(q)
      );
    });
  })();

  if (loading && Object.keys(groups).length === 0) {
    return (
      <div className="space-y-6">
        <AdminPageHeader title="Pengaturan" subtitle="Kelola konten pengaturan situs." />
        <div className="space-y-4 rounded-xs bg-white p-4 shadow-sm sm:p-5">
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Pengaturan"
        subtitle="Kelola konten pengaturan situs seperti alamat, kontak, dan layanan."
        action={
          <Button variant="outline" size="sm" onClick={() => reload()}>
            <RefreshCw className="size-3.5" />
            Muat Ulang
          </Button>
        }
      />

      {groupNames.length === 0 ? (
        <div className="rounded-xs bg-white py-10 text-center text-muted-foreground shadow-sm">
          <Settings className="mx-auto mb-2 size-8 opacity-40" />
          Belum ada pengaturan.
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          {/* Sidebar */}
          <aside className="space-y-1 rounded-xs bg-white p-3 shadow-sm h-fit lg:sticky lg:top-24">
            {groupNames.map((group) => {
              const Icon = GROUP_META[group]?.icon ?? Settings;
              const count = Object.keys(groups[group] ?? {}).length;
              const active = group === selectedGroup;
              return (
                <button
                  key={group}
                  type="button"
                  onClick={() => setActiveGroup(group)}
                  className={`flex w-full items-center gap-3 rounded-xs px-3 py-2.5 text-left text-sm transition-colors ${
                    active
                      ? "bg-brand-primary text-white shadow-sm"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <Icon className="size-4 shrink-0" />
                  <span className="flex-1 truncate font-medium">
                    {groupLabel(group)}
                  </span>
                  <Badge
                    variant="outline"
                    className={active ? "border-white/40 text-white" : ""}
                  >
                    {count}
                  </Badge>
                </button>
              );
            })}
          </aside>

          {/* Content */}
          <div className="min-w-0">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold tracking-tight text-slate-800">
                  {groupLabel(selectedGroup)}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {filteredKeys.length} item ditemukan
                </p>
              </div>
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Cari pengaturan..."
                  className="pl-9"
                />
              </div>
            </div>

            {filteredKeys.length === 0 ? (
              <div className="rounded-xs bg-white py-10 text-center text-muted-foreground shadow-sm">
                Tidak ada pengaturan yang cocok dengan pencarian.
              </div>
            ) : (
              <div className="space-y-4">
                {filteredKeys.map((key) => (
                  <SettingEditor
                    key={key}
                    group={selectedGroup}
                    settingKey={key}
                    value={groups[selectedGroup][key]}
                    onSaved={() => reload()}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
