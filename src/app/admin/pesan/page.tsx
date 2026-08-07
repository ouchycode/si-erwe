"use client";

import { useCallback, useState } from "react";
import { MessageSquare, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { admin } from "@/lib/adminApi";
import { ApiError } from "@/lib/api";
import { useFetch } from "@/lib/hooks/useFetch";
import type { Pesan, Paginated, ApiMessage } from "@/lib/types";
import { KATEGORI_PESAN_LABEL } from "@/lib/types";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Pagination } from "@/components/admin/Pagination";
import { Button } from "@/components/ui/button";
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

export default function AdminPesanPage() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const [kategori, setKategori] = useState("");
  const [selected, setSelected] = useState<Pesan | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetcher = useCallback(() => {
    const params = new URLSearchParams({ per_page: "15" });
    if (status) params.set("status", status);
    if (kategori) params.set("kategori", kategori);
    params.set("page", String(page));
    return admin.get<Paginated<Pesan>>(`/admin/pesan?${params.toString()}`);
  }, [page, status, kategori]);

  const { data, loading, reload } = useFetch(fetcher, [page, status, kategori]);

  const openDetail = (item: Pesan) => {
    setSelected(item);
    if (!item.is_read) {
      void admin
        .put<ApiMessage>(`/admin/pesan/${item.id}/read`)
        .catch(() => undefined)
        .then(() => reload());
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const res = await admin.delete<ApiMessage>(`/admin/pesan/${deleteId}`);
      toast.success(res.message);
      setDeleteId(null);
      if (selected?.id === deleteId) setSelected(null);
      void reload();
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Gagal menghapus pesan.");
    } finally {
      setDeleting(false);
    }
  };

  const unreadCount = (data?.data ?? []).filter((m) => !m.is_read).length;

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Kotak Masuk Pesan"
        subtitle="Pesan masuk dari warga melalui halaman Hubungi Kami."
      />

      <div className="space-y-4 rounded-xs bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="size-2 rounded-full bg-brand-primary" />
              {unreadCount} pesan belum dibaca pada halaman ini
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Select
                value={status === "" ? "all" : status}
                onValueChange={(v) => {
                  setStatus(v === "all" ? "" : (v ?? ""));
                  setPage(1);
                }}
              >
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Semua status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua status</SelectItem>
                  <SelectItem value="0">Belum dibaca</SelectItem>
                  <SelectItem value="1">Sudah dibaca</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={kategori === "" ? "all" : kategori}
                onValueChange={(v) => {
                  setKategori(v === "all" ? "" : (v ?? ""));
                  setPage(1);
                }}
              >
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Semua kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua kategori</SelectItem>
                  {Object.entries(KATEGORI_PESAN_LABEL).map(([v, l]) => (
                    <SelectItem key={v} value={v}>
                      {l}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100">
                <TableHead>Nama</TableHead>
                <TableHead>Kontak</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Pesan</TableHead>
                <TableHead>Dikirim</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
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
                    <MessageSquare className="mx-auto mb-2 size-8 opacity-40" />
                    Belum ada pesan.
                  </TableCell>
                </TableRow>
              ) : (
                (data?.data ?? []).map((item) => (
                  <TableRow key={item.id} className={item.is_read ? "" : "bg-amber-50/50 even:bg-amber-50/50!"}>
                    <TableCell className="font-medium">
                      {!item.is_read && <span className="mr-2 inline-block size-2 rounded-full bg-brand-primary" />}
                      {item.nama}
                    </TableCell>
                    <TableCell>{item.kontak}</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {KATEGORI_PESAN_LABEL[item.kategori] ?? item.kategori}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-[16rem] truncate">{item.pesan}</TableCell>
                    <TableCell>{formatDate(item.created_at)}</TableCell>
                    <TableCell>
                      {item.is_read ? (
                        <Badge variant="secondary">Dibaca</Badge>
                      ) : (
                        <Badge variant="warning">Baru</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => openDetail(item)}>
                          Baca
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="text-destructive"
                          onClick={() => setDeleteId(item.id)}
                          aria-label="Hapus pesan"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
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
        <DialogContent>
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle>Pesan dari {selected.nama}</DialogTitle>
                <DialogDescription>
                  {selected.kontak} · {formatDate(selected.created_at)}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground">Kategori</p>
                  <Badge variant="outline">
                    {KATEGORI_PESAN_LABEL[selected.kategori] ?? selected.kategori}
                  </Badge>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Isi Pesan</p>
                  <p className="rounded-xs border-slate-100 border bg-muted/30 p-3 text-sm whitespace-pre-wrap">
                    {selected.pesan}
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="destructive"
                  onClick={() => setDeleteId(selected.id)}
                >
                  <Trash2 className="size-4" />
                  Hapus
                </Button>
                <Button variant="outline" onClick={() => setSelected(null)}>
                  Tutup
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={deleteId !== null} onOpenChange={(o) => !o && setDeleteId(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Hapus Pesan</DialogTitle>
            <DialogDescription>
              Yakin ingin menghapus pesan ini? Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>
              Batal
            </Button>
            <Button variant="destructive" disabled={deleting} onClick={handleDelete}>
              {deleting ? "Menghapus..." : "Hapus"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
