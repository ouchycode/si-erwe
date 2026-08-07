"use client";

import { useCallback, useState } from "react";
import { Search, Inbox, ExternalLink } from "lucide-react";
import { toast } from "sonner";

import { admin } from "@/lib/adminApi";
import { ApiError } from "@/lib/api";
import { useFetch } from "@/lib/hooks/useFetch";
import type { Pengajuan, Paginated, ApiMessage } from "@/lib/types";
import { LAYANAN_LABEL, STATUS_PENGAJUAN_LABEL } from "@/lib/types";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Pagination } from "@/components/admin/Pagination";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const STATUS_BADGE: Record<string, "warning" | "default" | "success" | "destructive"> = {
  menunggu: "warning",
  diproses: "default",
  selesai: "success",
  ditolak: "destructive",
};

function formatDate(iso: string | undefined): string {
  if (!iso) return "-";
  return new Date(iso).toLocaleString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminPengajuanPage() {
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [selected, setSelected] = useState<Pengajuan | null>(null);
  const [newStatus, setNewStatus] = useState("");
  const [catatan, setCatatan] = useState("");
  const [saving, setSaving] = useState(false);

  const fetcher = useCallback(() => {
    const params = new URLSearchParams({ per_page: "15" });
    if (search) params.set("q", search);
    if (status) params.set("status", status);
    params.set("page", String(page));
    return admin.get<Paginated<Pengajuan>>(`/admin/pengajuan?${params.toString()}`);
  }, [page, search, status]);

  const { data, loading, reload } = useFetch(fetcher, [page, search, status]);

  const openDetail = (item: Pengajuan) => {
    setSelected(item);
    setNewStatus(item.status);
    setCatatan(item.catatan ?? "");
    if (!item.is_read) {
      void admin
        .put<ApiMessage>(`/admin/pengajuan/${item.id}/read`)
        .catch(() => undefined)
        .then(() => reload());
    }
  };

  const handleSave = async () => {
    if (!selected) return;
    setSaving(true);
    try {
      const res = await admin.put<ApiMessage<Pengajuan>>(`/admin/pengajuan/${selected.id}`, {
        status: newStatus,
        catatan,
      });
      toast.success(res.message);
      setSelected(null);
      void reload();
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Gagal memperbarui pengajuan.");
    } finally {
      setSaving(false);
    }
  };

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(q);
    setPage(1);
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Kelola Pengajuan"
        subtitle="Kelola dan perbarui status pengajuan warga."
      />

      <div className="space-y-4 rounded-xs bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <form onSubmit={submitSearch} className="flex w-full gap-2 sm:max-w-md">
              <div className="relative flex-1">
                <Search className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Cari nama, NIK, atau kode..."
                  className="pl-8"
                />
              </div>
              <Button type="submit" variant="outline">
                Cari
              </Button>
            </form>
            <Select
              value={status === "" ? "all" : status}
              onValueChange={(v) => {
                setStatus(v === "all" ? "" : (v ?? ""));
                setPage(1);
              }}
            >
              <SelectTrigger className="w-full sm:w-44">
                <SelectValue placeholder="Semua status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua status</SelectItem>
                <SelectItem value="menunggu">Menunggu</SelectItem>
                <SelectItem value="diproses">Diproses</SelectItem>
                <SelectItem value="selesai">Selesai</SelectItem>
                <SelectItem value="ditolak">Ditolak</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100">
                <TableHead>Kode</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>NIK</TableHead>
                <TableHead>Layanan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Diajukan</TableHead>
                <TableHead className="text-right">Detail</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                [1, 2, 3, 4, 5].map((i) => (
                  <TableRow key={i}>
                    <TableCell colSpan={7}>
                      <Skeleton className="h-8 w-full" />
                    </TableCell>
                  </TableRow>
                ))
              ) : (data?.data ?? []).length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="py-10 text-center text-muted-foreground">
                    <Inbox className="mx-auto mb-2 size-8 opacity-40" />
                    Belum ada pengajuan.
                  </TableCell>
                </TableRow>
              ) : (
                (data?.data ?? []).map((item) => (
                  <TableRow key={item.id} className={item.is_read ? "" : "bg-amber-50/50 even:bg-amber-50/50!"}>
                    <TableCell className="font-mono text-xs">{item.kode}</TableCell>
                    <TableCell className="font-medium">{item.nama}</TableCell>
                    <TableCell>{item.nik}</TableCell>
                    <TableCell>{LAYANAN_LABEL[item.jenis_layanan] ?? item.jenis_layanan}</TableCell>
                    <TableCell>
                      <Badge variant={STATUS_BADGE[item.status] ?? "default"}>
                        {STATUS_PENGAJUAN_LABEL[item.status] ?? item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(item.created_at)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" onClick={() => openDetail(item)}>
                        <ExternalLink className="size-3.5" />
                        Buka
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          </div>

          {data && <Pagination meta={data.meta} onPageChange={setPage} />}
      </div>

      <Dialog open={selected !== null} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="font-mono text-sm">{selected.kode}</DialogTitle>
                <DialogDescription>
                  {formatDate(selected.created_at)}
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 rounded-xs border-slate-100 border p-4 text-sm">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <p className="text-xs text-muted-foreground">Nama</p>
                    <p className="font-medium">{selected.nama}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">NIK</p>
                    <p className="font-medium">{selected.nik}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Jenis Layanan</p>
                  <p className="font-medium">
                    {LAYANAN_LABEL[selected.jenis_layanan] ?? selected.jenis_layanan}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Keperluan</p>
                  <p className="whitespace-pre-wrap">{selected.keperluan}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Status Saat Ini</p>
                  <Badge variant={STATUS_BADGE[selected.status] ?? "default"}>
                    {STATUS_PENGAJUAN_LABEL[selected.status] ?? selected.status}
                  </Badge>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="newStatus">Perbarui Status</Label>
                  <Select value={newStatus} onValueChange={(v) => setNewStatus(v ?? "menunggu")}>
                    <SelectTrigger id="newStatus" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="menunggu">Menunggu</SelectItem>
                      <SelectItem value="diproses">Diproses</SelectItem>
                      <SelectItem value="selesai">Selesai</SelectItem>
                      <SelectItem value="ditolak">Ditolak</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="catatan">Catatan</Label>
                  <Textarea
                    id="catatan"
                    rows={3}
                    value={catatan}
                    onChange={(e) => setCatatan(e.target.value)}
                    placeholder="Catatan untuk pemohon..."
                  />
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setSelected(null)}>
                  Tutup
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={saving}
                  className="bg-brand-primary hover:bg-brand-primary-hover"
                >
                  {saving ? "Menyimpan..." : "Simpan Perubahan"}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
