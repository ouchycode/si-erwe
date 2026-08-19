"use client";

import { useCallback, useState } from "react";
import { Plus, Pencil, Trash2, Search, Newspaper } from "lucide-react";
import { toast } from "sonner";

import { admin } from "@/lib/adminApi";
import { ApiError } from "@/lib/api";
import { useFetch } from "@/lib/hooks/useFetch";
import type { Berita, Paginated, ApiMessage } from "@/lib/types";
import { resolveImageUrl } from "@/lib/api";
import { imageFileError } from "@/lib/imageFile";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Pagination } from "@/components/admin/Pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import RichTextEditor from "@/components/admin/RichTextEditor";
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
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const KATEGORI = ["Kegiatan", "Kesehatan", "Pengumuman", "Lainnya"];

interface BeritaForm {
  id?: number;
  judul: string;
  ringkasan: string;
  konten: string;
  kategori: string;
  author: string;
  is_published: boolean;
  gambar: string | null;
}

const EMPTY_FORM: BeritaForm = {
  judul: "",
  ringkasan: "",
  konten: "",
  kategori: "Kegiatan",
  author: "",
  is_published: true,
  gambar: null,
};

function imageUrl(value: string | null): string | undefined {
  return value ? resolveImageUrl(value) : undefined;
}

export default function AdminBeritaPage() {
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<BeritaForm>(EMPTY_FORM);
  const [file, setFile] = useState<File | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetcher = useCallback(() => {
    const params = new URLSearchParams({ per_page: "15" });
    if (search) params.set("q", search);
    if (status) params.set("status", status);
    params.set("page", String(page));
    return admin.get<Paginated<Berita>>(`/admin/berita?${params.toString()}`);
  }, [page, search, status]);

  const { data, loading, reload } = useFetch(fetcher, [page, search, status]);

  const openCreate = () => {
    setForm(EMPTY_FORM);
    setFile(null);
    setDialogOpen(true);
  };

  const openEdit = (item: Berita) => {
    setForm({
      id: item.id,
      judul: item.judul,
      ringkasan: item.ringkasan,
      konten: item.konten ?? "",
      kategori: item.kategori,
      author: item.author ?? "",
      is_published: item.is_published ?? true,
      gambar: item.gambar,
    });
    setFile(null);
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      const fileError = imageFileError(file, 3);
      if (fileError) {
        toast.error(fileError);
        return;
      }
    }
    setSaving(true);
    try {
      const body = new FormData();
      body.append("judul", form.judul);
      body.append("ringkasan", form.ringkasan ?? "");
      body.append("konten", form.konten ?? "");
      body.append("kategori", form.kategori);
      body.append("author", form.author ?? "");
      body.append("is_published", form.is_published ? "1" : "0");
      if (file) body.append("gambar", file);

      if (form.id) {
        const res = await admin.put<ApiMessage<Berita>>(`/admin/berita/${form.id}`, body);
        toast.success(res.message);
      } else {
        const res = await admin.post<ApiMessage<Berita>>("/admin/berita", body);
        toast.success(res.message);
      }
      setDialogOpen(false);
      void reload();
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Gagal menyimpan berita.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const res = await admin.delete<ApiMessage>(`/admin/berita/${deleteId}`);
      toast.success(res.message);
      setDeleteId(null);
      void reload();
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Gagal menghapus berita.");
    } finally {
      setDeleting(false);
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
        title="Kelola Berita"
        subtitle="Kelola artikel, pengumuman, dan informasi kegiatan."
        action={
          <Button className="bg-brand-primary hover:bg-brand-primary-hover" onClick={openCreate}>
            <Plus className="size-4" />
            Tambah Berita
          </Button>
        }
      />

      <div className="space-y-4 rounded-xs bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <form onSubmit={submitSearch} className="flex w-full gap-2 sm:max-w-md">
              <div className="relative flex-1">
                <Search className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Cari judul berita..."
                  className="pl-8"
                />
              </div>
              <Button type="submit" variant="outline">
                Cari
              </Button>
            </form>
            <Select value={status} onValueChange={(v) => { setStatus(v === "all" ? "" : (v ?? "")); setPage(1); }}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Semua status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua status</SelectItem>
                <SelectItem value="1">Dipublikasi</SelectItem>
                <SelectItem value="0">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100">
                <TableHead>Judul</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Views</TableHead>
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
                    <Newspaper className="mx-auto mb-2 size-8 opacity-40" />
                    Belum ada berita.
                  </TableCell>
                </TableRow>
              ) : (
                (data?.data ?? []).map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="max-w-xs">
                      <div className="flex items-center gap-3">
                        {imageUrl(item.gambar) ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={imageUrl(item.gambar)}
                            alt={item.judul}
                            className="h-10 w-14 shrink-0 rounded object-cover"
                          />
                        ) : (
                          <div className="flex h-10 w-14 shrink-0 items-center justify-center rounded bg-muted text-[10px] text-muted-foreground">
                            Tanpa gambar
                          </div>
                        )}
                        <span className="truncate font-medium">{item.judul}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.kategori}</Badge>
                    </TableCell>
                    <TableCell>{item.author || "-"}</TableCell>
                    <TableCell>{item.tanggal}</TableCell>
                    <TableCell>
                      {item.is_published ? (
                        <Badge variant="success">Publik</Badge>
                      ) : (
                        <Badge variant="secondary">Draft</Badge>
                      )}
                    </TableCell>
                    <TableCell>{item.views}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => openEdit(item)}>
                          <Pencil className="size-3.5" />
                          Ubah
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="text-destructive"
                          onClick={() => setDeleteId(item.id)}
                          aria-label="Hapus berita"
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

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{form.id ? "Ubah Berita" : "Tambah Berita"}</DialogTitle>
            <DialogDescription>
              Isi informasi berita di bawah ini.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="judul">Judul *</Label>
              <Input
                id="judul"
                required
                value={form.judul}
                onChange={(e) => setForm({ ...form, judul: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="kategori">Kategori *</Label>
              <Select
                value={form.kategori}
                onValueChange={(v) => setForm({ ...form, kategori: v ?? "Kegiatan" })}
              >
                <SelectTrigger id="kategori" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {KATEGORI.map((k) => (
                    <SelectItem key={k} value={k}>
                      {k}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ringkasan">Ringkasan</Label>
              <Textarea
                id="ringkasan"
                rows={3}
                value={form.ringkasan}
                onChange={(e) => setForm({ ...form, ringkasan: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="konten">Konten</Label>
              <RichTextEditor
                value={form.konten}
                onChange={(html) => setForm({ ...form, konten: html })}
                placeholder="Isi konten berita..."
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                placeholder="Nama penulis"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="gambar">Gambar</Label>
              <Input
                id="gambar"
                type="file"
                accept="image/jpeg,image/png,image/jpg,image/webp"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              />
              {form.gambar && !file && imageUrl(form.gambar) && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imageUrl(form.gambar)}
                  alt="Gambar saat ini"
                  className="mt-2 h-16 w-24 rounded object-cover"
                />
              )}
              <p className="text-xs text-muted-foreground">
                Maks. 3 MB (JPEG, PNG, JPG, WEBP).
              </p>
            </div>
            <div className="flex items-center justify-between rounded-xs border-slate-100 border p-3">
              <div>
                <p className="text-sm font-medium">Publikasikan</p>
                <p className="text-xs text-muted-foreground">
                  Tampilkan di situs publik.
                </p>
              </div>
              <Switch
                checked={form.is_published}
                onCheckedChange={(v) => setForm({ ...form, is_published: v })}
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
              >
                Batal
              </Button>
              <Button
                type="submit"
                disabled={saving}
                className="bg-brand-primary hover:bg-brand-primary-hover"
              >
                {saving ? "Menyimpan..." : form.id ? "Simpan Perubahan" : "Simpan"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteId !== null} onOpenChange={(o) => !o && setDeleteId(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Hapus Berita</DialogTitle>
            <DialogDescription>
              Yakin ingin menghapus berita ini? Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>
              Batal
            </Button>
            <Button
              variant="destructive"
              disabled={deleting}
              onClick={handleDelete}
            >
              {deleting ? "Menghapus..." : "Hapus"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
