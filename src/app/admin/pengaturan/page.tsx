"use client";

import { useState } from "react";
import { Save, Settings, RefreshCw, Code2, Upload, Trash2 } from "lucide-react";
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

type Scalar = string | number | boolean;

const SETTING_LABELS: Record<string, { label: string; desc?: string }> = {
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
    desc: "Daftar layanan warga. Gunakan tab JSON untuk mengubah detailnya.",
  },
  "layanan.administrasi": {
    label: "Layanan Administrasi",
    desc: "Surat dan persyaratan administrasi. Gunakan tab JSON untuk mengubah detailnya.",
  },
  "layanan.alur": {
    label: "Alur Layanan",
    desc: "Tahapan pengurusan layanan. Gunakan tab JSON untuk mengubah detailnya.",
  },
  "program_warga.daftar": {
    label: "Program Warga",
    desc: "Program KWT dan Bank Sampah. Gunakan tab JSON untuk mengubah detailnya.",
  },
};

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
              : "complex";

  const isHeroImage = group === "hero" && settingKey === "gambar";

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

  return (
    <div className="py-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <Label className="text-sm font-semibold text-slate-800">{toLabel(settingKey)}</Label>
          {SETTING_LABELS[`${group}.${settingKey}`]?.desc && (
            <p className="mt-0.5 text-xs text-muted-foreground">
              {SETTING_LABELS[`${group}.${settingKey}`]?.desc}
            </p>
          )}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowJson((v) => !v)}
        >
          <Code2 className="size-3.5" />
          {showJson ? "Tutup JSON" : "JSON (Lanjutan)"}
        </Button>
      </div>

      {!showJson && (
        <>
          {isHeroImage ? (
            <HeroImageEditor
              value={value as string}
              onUploaded={(path) => void save(path)}
              onClear={() => void save("")}
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
              onChange={(e) => handleChange(e.target.value === "" ? 0 : Number(e.target.value))}
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
              {Object.entries(editValue as Record<string, Scalar>).map(([k, v]) => (
                <div key={k} className="space-y-1">
                  <Label className="text-xs text-muted-foreground">{toLabel(k)}</Label>
                  {typeof v === "boolean" ? (
                    <Switch
                      checked={v}
                      onCheckedChange={(nv) =>
                        handleChange({ ...(editValue as Record<string, Scalar>), [k]: nv })
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
              ))}
            </div>
          )}

          {kind === "complex" && (
            <p className="rounded-xs border border-dashed border-border bg-muted/30 p-3 text-sm text-muted-foreground">
              Data ini memiliki struktur khusus. Gunakan tab <span className="font-medium">JSON (Lanjutan)</span> untuk mengubahnya.
            </p>
          )}

          {dirty && (
            <div className="mt-4 flex items-center justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setEditValue(value);
                  setDirty(false);
                }}
              >
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
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setEditValue(value);
                setDirty(false);
                setJsonRaw(JSON.stringify(value, null, 2));
                setShowJson(false);
              }}
            >
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

  const groupNames = Object.keys(groups);

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
        <div className="space-y-6 rounded-xs bg-white p-4 shadow-sm sm:p-6">
          {groupNames.map((group) => {
            const keys = Object.keys(groups[group] ?? {});
            return (
              <section key={group}>
                <div className="mb-2 flex items-center gap-2 border-b border-slate-200 pb-2">
                  <Settings className="size-4 text-brand-primary" />
                  <h2 className="text-base font-bold tracking-tight text-slate-800">
                    {toLabel(group)}
                  </h2>
                  <Badge variant="outline">{keys.length} item</Badge>
                </div>
                <div className="divide-y divide-slate-100">
                  {keys.map((key) => (
                    <SettingEditor
                      key={key}
                      group={group}
                      settingKey={key}
                      value={groups[group][key]}
                      onSaved={() => reload()}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
