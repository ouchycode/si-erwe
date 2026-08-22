"use client";

import { useMemo, useState } from "react";
import {
  Save,
  RefreshCw,
  Upload,
  Trash2,
  Plus,
  ChevronUp,
  ChevronDown,
  Image as ImageIcon,
  Settings,
  User,
  Phone,
  FileText,
} from "lucide-react";
import { toast } from "sonner";

import { admin } from "@/lib/adminApi";
import { ApiError, resolveImageUrl } from "@/lib/api";
import { imageFileError } from "@/lib/imageFile";
import { useFetch } from "@/lib/hooks/useFetch";
import type { SettingGroups, ApiMessage } from "@/lib/types";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import RichTextEditor from "@/components/admin/RichTextEditor";

type Scalar = string | number | boolean;
type ListRow = Record<string, Scalar | string[] | Record<string, Scalar>>;
type Entry = { group: string; key: string; value: unknown };

/* ------------------------------------------------------------------ */
/* Tab konfigurasi ala panel admin kelurahan                          */
/* ------------------------------------------------------------------ */

interface SectionDef {
  group: string;
  /** batasi & urutkan key tertentu; kosong = semua key pada grup */
  keys?: string[];
  /** heading bagian (dipakai untuk memisah halaman dalam satu tab) */
  title?: string;
  desc?: string;
}

interface TabDef {
  id: string;
  label: string;
  icon: React.ElementType;
  sections: SectionDef[];
}

const TABS: TabDef[] = [
  {
    id: "media",
    label: "Logo & Hero",
    icon: ImageIcon,
    sections: [
      { group: "identitas", keys: ["logo"], title: "Logo Situs" },
      {
        group: "hero",
        keys: ["gambar"],
        title: "Banner Utama (Hero)",
        desc: "Gambar latar banner besar di halaman depan.",
      },
    ],
  },
  {
    id: "umum",
    label: "Umum",
    icon: Settings,
    sections: [
      { group: "identitas", keys: ["nama", "tagline"] },
      { group: "statistik", keys: ["tahunAwal"] },
    ],
  },
  {
    id: "profil",
    label: "Profil",
    icon: User,
    sections: [{ group: "profil" }],
  },
  {
    id: "kontak",
    label: "Kontak & Alamat",
    icon: Phone,
    sections: [
      { group: "alamat", title: "Alamat Sekretariat" },
      { group: "kontak", title: "Kontak Sekretariat" },
    ],
  },
  {
    id: "konten",
    label: "Konten Halaman",
    icon: FileText,
    sections: [
      {
        group: "program_warga",
        title: "Halaman Program Warga",
        desc: "Daftar program warga yang tampil di beranda dan halaman Program Warga.",
      },
      {
        group: "layanan",
        title: "Halaman Administrasi Kependudukan",
        desc: "Jenis surat beserta persyaratannya, dan alur pengurusannya.",
      },
      {
        group: "posyandu",
        title: "Halaman Posyandu",
        desc: "Isi konten halaman informasi Pos Pelayanan Terpadu.",
      },
    ],
  },
];

const FIELD_LABELS: Record<string, { label: string; desc?: string }> = {
  "identitas.nama": {
    label: "Nama Situs",
    desc: "Nama yang tampil di samping logo pada menu navigasi.",
  },
  "identitas.tagline": {
    label: "Tagline",
    desc: "Teks kecil di bawah nama, misalnya nama kota.",
  },
  "statistik.tahunAwal": {
    label: "Tahun Awal Statistik",
    desc: "Tahun pertama yang muncul di dropdown statistik.",
  },

  // ── Konten halaman ──
  "program_warga.daftar": {
    label: "Daftar Program",
    desc: "Klik “Tambah Item” untuk menambah program baru (KWT, Bank Sampah, dll.).",
  },
  "layanan.administrasi": {
    label: "Jenis Surat & Persyaratan",
    desc: "Setiap item berisi nama surat dan daftar syaratnya.",
  },
  "layanan.alur": {
    label: "Alur Pengurusan",
    desc: "Urutan langkah pengurusan surat, dari awal sampai selesai.",
  },
  "posyandu.deskripsi": {
    label: "Deskripsi Halaman",
    desc: "Ringkasan singkat di bawah judul halaman Posyandu.",
  },
  "posyandu.s1Judul": { label: "Bagian 1 · Judul" },
  "posyandu.s1Teks": {
    label: "Bagian 1 · Paragraf",
    desc: "Satu paragraf per baris.",
  },
  "posyandu.s1Kutipan": {
    label: "Bagian 1 · Kutipan",
    desc: "Kalimat kutipan yang ditampilkan menonjol.",
  },
  "posyandu.s1Gambar": { label: "Bagian 1 · Gambar Pendukung" },
  "posyandu.s2Judul": { label: "Bagian 2 · Judul" },
  "posyandu.s2Teks": {
    label: "Bagian 2 · Paragraf",
    desc: "Satu paragraf per baris.",
  },
  "posyandu.s2Gambar": { label: "Bagian 2 · Gambar Pendukung" },
};

function fieldMeta(group: string, key: string) {
  return (
    FIELD_LABELS[`${group}.${key}`] ?? {
      label: toLabel(key),
      desc: undefined,
    }
  );
}

function toLabel(s: string): string {
  return s
    .replace(/[_-]+/g, " ")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/\bRt\b/g, "RT")
    .replace(/\bKk\b/g, "KK")
    .replace(/\bWa\b/g, "WA")
    .replace(/\bTelp\b/g, "Telepon")
    .replace(/\bKwt\b/g, "KWT")
    .replace(/^./, (c) => c.toUpperCase());
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

function normalizeSettings(groups: SettingGroups): SettingGroups {
  const next: SettingGroups = {};
  Object.entries(groups).forEach(([g, settings]) => {
    // Grup yang halamannya sudah tidak ada tidak ditampilkan lagi
    if (
      g === "jam_operasional" ||
      g === "keamanan_wilayah" ||
      g === "kebersihan_lingkungan"
    )
      return;
    next[g] = { ...(settings as Record<string, unknown>) };
  });
  const daftar = next.program_warga?.daftar;
  if (Array.isArray(daftar)) {
    next.program_warga = {
      ...next.program_warga,
      daftar: daftar.map((r) => {
        if (!r || typeof r !== "object" || Array.isArray(r)) return r;
        const row = r as Record<string, unknown>;
        return {
          ...row,
          gambar: typeof row.gambar === "string" ? row.gambar : "",
        };
      }),
    };
  }
  // Setting lama yang tidak lagi dipakai halaman mana pun
  if (next.layanan) delete next.layanan.kartu;
  return next;
}

function cloneCell(v: ListRow[string]): ListRow[string] {
  if (Array.isArray(v)) return [];
  if (typeof v === "boolean") return false;
  if (typeof v === "number") return 0;
  if (typeof v === "object" && v !== null) {
    const out: Record<string, Scalar> = {};
    Object.entries(v).forEach(([sk, sv]) => {
      out[sk] =
        typeof sv === "boolean" ? false : typeof sv === "number" ? 0 : "";
    });
    return out;
  }
  return "";
}

function isImageKey(k: string): boolean {
  return k === "logo" || /gambar/i.test(k);
}

/* ------------------------------------------------------------------ */
/* Editor gambar                                                       */
/* ------------------------------------------------------------------ */

function ImageEditor({
  value,
  onUploaded,
  onClear,
  alt,
}: {
  value: string;
  onUploaded: (path: string) => void;
  onClear: () => void;
  alt: string;
}) {
  const [uploading, setUploading] = useState(false);
  const src = resolveImageUrl(value) ?? "";

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    const fileError = imageFileError(file, 4);
    if (fileError) {
      toast.error(fileError);
      return;
    }
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
              alt={`Pratinjau ${alt}`}
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

/* ------------------------------------------------------------------ */
/* Editor daftar / struktur                                            */
/* ------------------------------------------------------------------ */

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
        template[k] = cloneCell(v);
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
                  <StructuredFieldEditor
                    value={v}
                    fieldKey={k}
                    onChange={(nv) =>
                      updateRow(index, { ...row, [k]: nv as ListRow[string] })
                    }
                  />
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

function StructuredFieldEditor({
  value,
  onChange,
  fieldKey,
}: {
  value: unknown;
  onChange: (next: unknown) => void;
  fieldKey?: string;
}) {
  if (fieldKey && isImageKey(fieldKey)) {
    return (
      <ImageEditor
        value={typeof value === "string" ? value : ""}
        onUploaded={(path) => onChange(path)}
        onClear={() => onChange("")}
        alt={toLabel(fieldKey)}
      />
    );
  }

  if (value === null || value === undefined) {
    return (
      <Input value="" onChange={(e) => onChange(e.target.value)} />
    );
  }

  if (typeof value === "string") {
    const isLong = value.length > 60 || value.includes("\n");
    return isLong ? (
      <Textarea
        rows={5}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    ) : (
      <Input value={value} onChange={(e) => onChange(e.target.value)} />
    );
  }

  if (typeof value === "number") {
    return (
      <Input
        type="number"
        value={String(value)}
        onChange={(e) =>
          onChange(e.target.value === "" ? 0 : Number(e.target.value))
        }
      />
    );
  }

  if (typeof value === "boolean") {
    return (
      <div className="flex items-center gap-3">
        <Switch
          checked={value}
          onCheckedChange={(v) => onChange(v)}
        />
        <span className="text-sm text-muted-foreground">
          {value ? "Ya / Aktif" : "Tidak / Nonaktif"}
        </span>
      </div>
    );
  }

  if (Array.isArray(value)) {
    if (value.every((x) => typeof x === "string")) {
      return (
        <Textarea
          rows={6}
          value={value.join("\n")}
          onChange={(e) => onChange(e.target.value.split("\n"))}
        />
      );
    }
    return <ListEditor value={value as ListRow[]} onChange={onChange} />;
  }

  if (typeof value === "object" && value !== null) {
    const record = value as Record<string, unknown>;
    return (
      <div className="grid gap-3 sm:grid-cols-2">
        {Object.entries(record).map(([k, v]) => (
          <div key={k} className="space-y-1">
            <Label className="text-xs text-muted-foreground">
              {toLabel(k)}
            </Label>
            <StructuredFieldEditor
              value={v}
              fieldKey={k}
              onChange={(nv) => onChange({ ...record, [k]: nv })}
            />
          </div>
        ))}
      </div>
    );
  }

  return null;
}

/* ------------------------------------------------------------------ */
/* Halaman                                                             */
/* ------------------------------------------------------------------ */

export default function AdminPengaturanPage() {
  const { data, loading, reload } = useFetch(
    () => admin.get<{ data: SettingGroups }>("/admin/settings"),
    []
  );

  const groups = useMemo(() => normalizeSettings(data?.data ?? {}), [data]);

  // Nilai hasil editan yang belum tersimpan: "group.key" -> nilai baru
  const [edits, setEdits] = useState<Record<string, unknown>>({});
  // Nilai yang sudah langsung tersimpan lewat upload gambar
  const [savedOverrides, setSavedOverrides] = useState<
    Record<string, unknown>
  >({});
  const [activeTab, setActiveTab] = useState("media");
  const [saving, setSaving] = useState(false);

  const editCount = Object.keys(edits).length;

  const getEntry = (group: string, key: string): unknown => {
    const fullKey = `${group}.${key}`;
    if (fullKey in edits) return edits[fullKey];
    if (fullKey in savedOverrides) return savedOverrides[fullKey];
    return groups[group]?.[key];
  };

  const setEntry = (group: string, key: string, value: unknown) => {
    setEdits((prev) => ({ ...prev, [`${group}.${key}`]: value }));
  };

  const clearEdit = (group: string, key: string) => {
    setEdits((prev) => {
      const next = { ...prev };
      delete next[`${group}.${key}`];
      return next;
    });
  };

  const handleUploadedImage = async (
    group: string,
    key: string,
    path: string
  ) => {
    // Gambar langsung disimpan agar pratinjau langsung akurat
    const fullKey = `${group}.${key}`;
    try {
      const res = await admin.post<ApiMessage>("/admin/settings", {
        group,
        key,
        value: path,
      });
      toast.success(res.message);
      setSavedOverrides((prev) => ({ ...prev, [fullKey]: path }));
      setEdits((prev) => {
        const next = { ...prev };
        delete next[fullKey];
        return next;
      });
      reload();
    } catch (err) {
      toast.error(
        err instanceof ApiError ? err.message : "Gagal menyimpan gambar."
      );
    }
  };

  const saveAll = async () => {
    const entries = Object.entries(edits);
    if (entries.length === 0) return;
    setSaving(true);
    let ok = 0;
    for (const [fullKey, value] of entries) {
      const [group, key] = fullKey.split(".");
      try {
        await admin.post<ApiMessage>("/admin/settings", {
          group,
          key,
          value,
        });
        ok += 1;
      } catch (err) {
        toast.error(
          err instanceof ApiError
            ? `${toLabel(key)}: ${err.message}`
            : "Gagal menyimpan pengaturan."
        );
      }
    }
    setSaving(false);
    if (ok > 0) {
      toast.success(`${ok} pengaturan berhasil disimpan.`);
      setEdits({});
      reload();
    }
  };

  // Bagian-bagian (section) yang dirender pada sebuah tab, sesuai urutan TABS.
  // Grup yang tidak terdaftar di tab mana pun otomatis masuk ke tab terakhir
  // sebagai bagian "Lainnya" agar tidak ada setting yang hilang.
  const buildSections = (
    tab: TabDef
  ): { title?: string; desc?: string; entries: Entry[] }[] => {
    const out: { title?: string; desc?: string; entries: Entry[] }[] = [];
    tab.sections.forEach((sec) => {
      const settings = groups[sec.group] ?? {};
      let keys = [...(sec.keys ?? Object.keys(settings))];
      Object.keys(settings).forEach((k) => {
        if (!keys.includes(k)) keys.push(k);
      });
      keys = keys.filter((k) => k in settings);
      if (keys.length === 0) return;
      out.push({
        title: sec.title,
        desc: sec.desc,
        entries: keys.map((key) => ({
          group: sec.group,
          key,
          value: settings[key],
        })),
      });
    });

    if (tab === TABS[TABS.length - 1]) {
      const covered = new Set(TABS.flatMap((t) => t.sections.map((s) => s.group)));
      Object.entries(groups).forEach(([group, settings]) => {
        if (covered.has(group)) return;
        const entries = Object.keys(settings ?? {}).map((key) => ({
          group,
          key,
          value: settings[key],
        }));
        if (entries.length > 0)
          out.push({ title: toLabel(group), entries });
      });
    }
    return out;
  };

  const tab = TABS.find((t) => t.id === activeTab) ?? TABS[0];
  const sections = buildSections(tab);

  const isRich = (group: string, key: string) =>
    group === "profil" &&
    (key === "visi" || key === "misi" || key === "sejarah");

  const isFullWidth = (group: string, key: string, value: unknown) => {
    if (isImageKey(key) || isRich(group, key)) return true;
    if (Array.isArray(value)) return true;
    if (typeof value === "object" && value !== null) {
      return Object.values(value as Record<string, unknown>).some(
        (v) => typeof v === "string" && (v.length > 60 || v.includes("\n"))
      );
    }
    if (typeof value === "string") return value.length > 60;
    return false;
  };

  if (loading && Object.keys(groups).length === 0) {
    return (
      <div className="space-y-6">
        <AdminPageHeader title="Pengaturan" subtitle="Kelola identitas, banner, profil, dan konten situs." />
        <div className="rounded-xs border border-border bg-card p-4 shadow-sm sm:p-5">
          <Skeleton className="mb-4 h-10 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Pengaturan"
        subtitle="Kelola identitas, banner, profil, kontak, dan konten halaman situs."
        action={
          <Button variant="outline" size="sm" onClick={() => reload()}>
            <RefreshCw className="size-3.5" />
            Muat Ulang
          </Button>
        }
      />

      <div className="overflow-hidden rounded-xs border border-border bg-card shadow-sm">
        {/* Tab bar ala nav-tabs kelurahan */}
        <div className="flex overflow-x-auto border-b border-border bg-muted/40 px-2 pt-2">
          {TABS.map((t) => {
            const Icon = t.icon;
            const active = t.id === tab.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTab(t.id)}
                className={`wd-heading flex shrink-0 cursor-pointer items-center gap-2 border-b-[3px] px-4 py-3 text-[13px] font-medium uppercase tracking-[0.5px] transition-colors ${
                  active
                    ? "border-brand-primary text-brand-primary"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                <Icon className="size-4 shrink-0" />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Isi tab */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void saveAll();
          }}
          className="p-4 sm:p-6"
        >
          {sections.length === 0 ? (
            <p className="py-10 text-center text-sm text-muted-foreground">
              Tidak ada pengaturan pada tab ini.
            </p>
          ) : (
            sections.map((sec, si) => (
              <div
                key={si}
                className={si > 0 ? "mt-8 border-t border-border pt-6" : ""}
              >
                {(sec.title || sec.desc) && (
                  <div className="mb-5">
                    {sec.title && (
                      <h3 className="wd-heading m-0 text-[15px] font-semibold uppercase tracking-[1px] text-brand-primary">
                        {sec.title}
                      </h3>
                    )}
                    {sec.desc && (
                      <p className="mb-0 mt-1 text-xs text-muted-foreground">
                        {sec.desc}
                      </p>
                    )}
                  </div>
                )}
                <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
                  {sec.entries.map(({ group, key, value }) => {
                    const meta = fieldMeta(group, key);
                    const current = getEntry(group, key);
                    const dirty = `${group}.${key}` in edits;
                    const full = isFullWidth(group, key, value);

                    return (
                      <div
                        key={`${group}.${key}`}
                        className={`space-y-2 ${full ? "sm:col-span-2" : ""}`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <Label className="text-sm font-semibold">
                            {meta.label}
                            {dirty && (
                              <span className="ml-2 align-middle text-[10px] font-bold uppercase tracking-wide text-amber-600">
                                belum disimpan
                              </span>
                            )}
                          </Label>
                          {dirty && (
                            <button
                              type="button"
                              onClick={() => clearEdit(group, key)}
                              className="cursor-pointer border-none bg-transparent p-0 text-xs text-muted-foreground underline hover:text-slate-600"
                            >
                              Batalkan
                            </button>
                          )}
                        </div>
                        {meta.desc && (
                          <p className="-mt-1 text-xs text-muted-foreground">
                            {meta.desc}
                          </p>
                        )}

                        {isImageKey(key) ? (
                          <ImageEditor
                            value={typeof current === "string" ? current : ""}
                            alt={meta.label.toLowerCase()}
                            onUploaded={(path) =>
                              void handleUploadedImage(group, key, path)
                            }
                            onClear={() =>
                              void handleUploadedImage(group, key, "")
                            }
                          />
                        ) : isRich(group, key) ? (
                          <RichTextEditor
                            value={toRichText(current, key === "misi")}
                            onChange={(html) => setEntry(group, key, html)}
                            placeholder={
                              key === "visi"
                                ? "Tuliskan visi RW 004..."
                                : key === "misi"
                                  ? "Tuliskan misi RW 004, satu poin per baris..."
                                  : "Tuliskan sejarah RW 004..."
                            }
                          />
                        ) : (
                          <StructuredFieldEditor
                            value={current}
                            fieldKey={key}
                            onChange={(nv) => setEntry(group, key, nv)}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}

          {/* Bar simpan ala kelurahan: satu tombol untuk semua */}
          <div className="mt-6 flex items-center justify-end gap-3 border-t border-border pt-4">
            {editCount > 0 && (
              <span className="mr-auto text-xs font-semibold text-amber-600">
                {editCount} perubahan belum disimpan
              </span>
            )}
            <Button
              type="submit"
              disabled={saving || editCount === 0}
              className="bg-brand-primary hover:bg-brand-primary-hover"
            >
              <Save className="size-4" />
              {saving ? "Menyimpan..." : "Simpan Pengaturan"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
