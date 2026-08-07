"use client";

import { useCallback, useMemo, useState } from "react";
import { Plus, Trash2, Save, BarChart3 } from "lucide-react";
import { toast } from "sonner";

import { admin } from "@/lib/adminApi";
import { ApiError } from "@/lib/api";
import { useFetch } from "@/lib/hooks/useFetch";
import type { StatistikResponse, StatistikCategory, ApiMessage } from "@/lib/types";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const MONTHS = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = [CURRENT_YEAR, CURRENT_YEAR - 1];

type EditableRow = {
  key: string;
  rt: string;
  id?: number;
  values: Record<string, string>;
};

export default function AdminStatistikPage() {
  const [year, setYear] = useState(String(CURRENT_YEAR));
  const [monthIndex, setMonthIndex] = useState(String(new Date().getMonth()));
  const [activeCat, setActiveCat] = useState<string>("");
  const [rows, setRows] = useState<EditableRow[]>([]);
  const [saving, setSaving] = useState(false);
  const [confirmDeleteRow, setConfirmDeleteRow] = useState<EditableRow | null>(null);

  const periode = `${year}-${String(Number(monthIndex) + 1).padStart(2, "0")}`;

  const fetcher = useCallback(async () => {
    const res = await admin.get<{ data: StatistikResponse }>(`/admin/statistik?periode=${periode}`);
    const cats = Object.keys(res.data);
    if (!cats.includes(activeCat)) {
      setActiveCat(cats[0] ?? "");
    }
    return res.data;
  }, [periode, activeCat]);

  const { data, loading, reload } = useFetch(fetcher, [periode, activeCat]);

  const category: StatistikCategory | undefined = data?.[activeCat];

  const valueKeys = useMemo(
    () => (category?.columns ?? []).map((c) => c.key).filter((k) => k !== "jumlah"),
    [category]
  );

  const hydrateRows = useCallback(() => {
    const source = category?.data ?? [];
    setRows(
      source.map((r) => ({
        key: String(r.id ?? r.rt),
        rt: r.rt,
        id: typeof r.id === "number" ? r.id : undefined,
        values: Object.fromEntries(
          valueKeys.map((k) => [k, String((r as Record<string, string | number | undefined>)[k] ?? 0)])
        ),
      }))
    );
  }, [category, valueKeys]);

  const setRowValue = (key: string, field: string, value: string) => {
    setRows((prev) =>
      prev.map((r) =>
        r.key === key ? { ...r, values: { ...r.values, [field]: value } } : r
      )
    );
  };

  const setRowRt = (key: string, value: string) => {
    setRows((prev) => prev.map((r) => (r.key === key ? { ...r, rt: value } : r)));
  };

  const addRow = () => {
    const tempKey = `new-${Date.now()}`;
    setRows((prev) => [
      ...prev,
      {
        key: tempKey,
        rt: "",
        values: Object.fromEntries(valueKeys.map((k) => [k, "0"])),
      },
    ]);
  };

  const removeRow = (key: string) => {
    setRows((prev) => prev.filter((r) => r.key !== key));
  };

  const handleSave = async () => {
    setSaving(true);
    let ok = 0;
    try {
      for (const row of rows) {
        if (!row.rt) continue;
        const values: Record<string, number> = {};
        for (const k of valueKeys) {
          values[k] = Number(row.values[k]) || 0;
        }
        await admin.post("/admin/statistik", {
          category_id: category?.id,
          rt: row.rt,
          periode,
          values,
        });
        ok += 1;
      }
      toast.success(`Berhasil menyimpan ${ok} baris data.`);
      await reload();
      hydrateRows();
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Gagal menyimpan data statistik.");
    } finally {
      setSaving(false);
    }
  };

  const requestDeleteRow = (row: EditableRow) => {
    if (typeof row.id !== "number") {
      removeRow(row.key);
      return;
    }
    setConfirmDeleteRow(row);
  };

  const confirmDelete = async () => {
    if (!confirmDeleteRow || typeof confirmDeleteRow.id !== "number") return;
    try {
      const res = await admin.delete<ApiMessage>(`/admin/statistik/${confirmDeleteRow.id}`);
      toast.success(res.message);
      setConfirmDeleteRow(null);
      await reload();
      hydrateRows();
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Gagal menghapus data.");
    }
  };

  if (loading && !data) {
    return (
      <div className="space-y-4 rounded-xs bg-white p-4 shadow-sm sm:p-5">
        <AdminPageHeader title="Kelola Statistik" subtitle="Kelola data statistik warga per RT." />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  const cats = Object.keys(data ?? {});

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Kelola Statistik"
        subtitle="Kelola data statistik warga per RT dan periode."
      />

      <div className="space-y-5 rounded-xs bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <div className="space-y-1.5">
              <Label htmlFor="year">Tahun</Label>
              <Select value={year} onValueChange={(v) => setYear(v ?? String(CURRENT_YEAR))}>
                <SelectTrigger id="year" className="w-full sm:w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {YEARS.map((y) => (
                    <SelectItem key={y} value={String(y)}>
                      {y}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="month">Bulan</Label>
              <Select value={monthIndex} onValueChange={(v) => setMonthIndex(v ?? "0")}>
                <SelectTrigger id="month" className="w-full sm:w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {MONTHS.map((m, i) => (
                    <SelectItem key={m} value={String(i)}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <p className="pb-1 text-xs text-muted-foreground sm:ml-auto">
              Periode aktif: <span className="font-medium">{periode}</span>
            </p>
          </div>

          {cats.length === 0 ? (
            <div className="py-10 text-center text-muted-foreground">
              <BarChart3 className="mx-auto mb-2 size-8 opacity-40" />
              Belum ada kategori statistik.
            </div>
          ) : (
            <>
              <div className="flex flex-wrap gap-2">
                {cats.map((name) => (
                  <button
                    key={name}
                    onClick={() => setActiveCat(name)}
                    className={`rounded-xs px-3.5 py-2 text-sm font-semibold transition-colors ${
                      activeCat === name
                        ? "bg-brand-primary text-white"
                        : "bg-slate-100 text-gray-600 hover:bg-slate-200"
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </div>

              {category && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">
                      {category.chartTitle || activeCat}
                      <span className="ml-2 text-xs font-normal text-muted-foreground">
                        {rows.filter((r) => r.rt).length} baris data
                      </span>
                    </p>
                    <Button variant="outline" size="sm" onClick={addRow}>
                      <Plus className="size-3.5" />
                      Tambah RT
                    </Button>
                  </div>

                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-20">RT</TableHead>
                          {valueKeys.map((k) => (
                            <TableHead key={k}>
                              {category.columns.find((c) => c.key === k)?.label ?? k}
                            </TableHead>
                          ))}
                          <TableHead className="w-24 text-right">Aksi</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {rows.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={valueKeys.length + 2} className="py-8 text-center text-muted-foreground">
                              Belum ada data untuk periode ini. Gunakan tombol Tambah RT untuk menambahkan.
                            </TableCell>
                          </TableRow>
                        ) : (
                          rows.map((row) => (
                            <TableRow key={row.key}>
                              <TableCell>
                                <Input
                                  value={row.rt}
                                  onChange={(e) => setRowRt(row.key, e.target.value)}
                                  maxLength={3}
                                  className="w-20"
                                  placeholder="01"
                                />
                              </TableCell>
                              {valueKeys.map((k) => (
                                <TableCell key={k}>
                                  <Input
                                    type="number"
                                    min={0}
                                    value={row.values[k] ?? "0"}
                                    onChange={(e) => setRowValue(row.key, k, e.target.value)}
                                    className="w-24"
                                  />
                                </TableCell>
                              ))}
                              <TableCell className="text-right">
                                <Button
                                  variant="ghost"
                                  size="icon-sm"
                                  className="text-destructive"
                                  onClick={() => requestDeleteRow(row)}
                                  aria-label="Hapus baris"
                                >
                                  <Trash2 className="size-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      onClick={handleSave}
                      disabled={saving}
                      className="bg-brand-primary hover:bg-brand-primary-hover"
                    >
                      <Save className="size-4" />
                      {saving ? "Menyimpan..." : "Simpan Data"}
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
      </div>

      <Dialog open={confirmDeleteRow !== null} onOpenChange={(o) => !o && setConfirmDeleteRow(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Hapus Data Statistik</DialogTitle>
            <DialogDescription>
              Yakin ingin menghapus data RT{" "}
              <span className="font-medium">{confirmDeleteRow?.rt ?? "-"}</span> untuk periode ini?
              Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDeleteRow(null)}>
              Batal
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
