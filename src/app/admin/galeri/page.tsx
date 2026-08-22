"use client";

import { useCallback, useState } from "react";
import { Plus, Pencil, Trash2, Search, Images } from "lucide-react";
import { toast, confirmDelete as confirmDeleteSwal } from "@/lib/toast";

import { admin } from "@/lib/adminApi";
import { ApiError } from "@/lib/api";
import { resolveImageUrl } from "@/lib/api";
import { imageFileError } from "@/lib/imageFile";
import { useFetch } from "@/lib/hooks/useFetch";
import type { GaleriItem, Paginated, ApiMessage } from "@/lib/types";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Pagination } from "@/components/admin/Pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface GaleriForm {
  id?: number;
  title: string;
  category: string;
  sort_order: string;
  is_published: boolean;
  image: string | null;
}

const EMPTY_FORM: GaleriForm = {
  title: "",
  category: "",
  sort_order: "0",
  is_published: true,
  image: null,
};

export default function AdminGaleriPage() {
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<GaleriForm>(EMPTY_FORM);
  const [file, setFile] = useState<File | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const fetcher = useCallback(() => {
    const params = new URLSearchParams({ per_page: "15" });
    if (search) params.set("q", search);
    if (status) params.set("status", status);
    params.set("page", String(page));
    return admin.get<Paginated<GaleriItem>>(`/admin/galeri?${params.toString()}`);
  }, [page, search, status]);

  const { data, loading, reload } = useFetch(fetcher, [page, search, status]);

  const openCreate = () => {
    setForm(EMPTY_FORM);
    setFile(null);
    setDialogOpen(true);
  };

  const openEdit = (item: GaleriItem) => {
    setForm({
      id: item.id,
      title: item.title,
      category: item.category,
      sort_order: String(item.sort_order ?? 0),
      is_published: item.is_published ?? true,
      image: item.image,
    });
    setFile(null);
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      const fileError = imageFileError(file, 5);
      if (fileError) {
        toast(fileError, "error");
        return;
      }
    }
    setSaving(true);
    try {
      const body = new FormData();
      body.append("title", form.title);
      body.append("category", form.category);
      body.append("sort_order", form.sort_order);
      body.append("is_published", form.is_published ? "1" : "0");
      if (file) body.append("image", file);

      if (form.id) {
        const res = await admin.put<ApiMessage<GaleriItem>>(`/admin/galeri/${form.id}`, body);
        toast(res.message);
      } else {
        const res = await admin.post<ApiMessage<GaleriItem>>("/admin/galeri", body);
        toast(res.message);
      }
      setDialogOpen(false);
      void reload();
    } catch (err) {
      toast(err instanceof ApiError ? err.message : "Gagal menyimpan foto.", "error");
    } finally {
      setSaving(false);
    }
  };

  const askDelete = (id: number, label: string) => {
    void confirmDeleteSwal(
      `Yakin ingin menghapus ${label}? Tindakan ini tidak dapat dibatalkan.`,
    ).then((ok) => {
      if (ok) void handleDelete(id);
    });
  };

  const handleDelete = async (id?: number) => {
    const target = id ?? deleteId;
    if (!target) return;
    try {
      const res = await admin.delete<ApiMessage>(`/admin/galeri/${target}`);
      toast(res.message);
      setDeleteId(null);
      void reload();
    } catch (err) {
      toast(err instanceof ApiError ? err.message : "Gagal menghapus foto.", "error");
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
        title="Kelola Galeri"
        subtitle="Kelola foto kegiatan warga yang ditampilkan di situs."
        action={
          <Button className="bg-brand-primary hover:bg-brand-primary-hover" onClick={openCreate}>
            <Plus className="size-4" />
            Tambah Foto
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
                  placeholder="Cari judul foto..."
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
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Semua status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua status</SelectItem>
                <SelectItem value="1">Tampil</SelectItem>
                <SelectItem value="0">Tersembunyi</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100">
                <TableHead>Foto</TableHead>
                <TableHead>Judul</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Urutan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                [1, 2, 3, 4, 5].map((i) => (
                  <TableRow key={i}>
                    <TableCell colSpan={6}>
                      <Skeleton className="h-8 w-full" />
                    </TableCell>
                  </TableRow>
                ))
              ) : (data?.data ?? []).length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="py-10 text-center text-muted-foreground">
                    <Images className="mx-auto mb-2 size-8 opacity-40" />
                    Belum ada foto galeri.
                  </TableCell>
                </TableRow>
              ) : (
                (data?.data ?? []).map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      {item.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={resolveImageUrl(item.image)}
                          alt={item.title}
                          className="h-10 w-14 shrink-0 rounded object-cover"
                        />
                      ) : (
                        <div className="flex h-10 w-14 shrink-0 items-center justify-center rounded bg-muted text-[10px] text-muted-foreground">
                          Tanpa gambar
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.category}</Badge>
                    </TableCell>
                    <TableCell>{item.sort_order ?? 0}</TableCell>
                    <TableCell>
                      {item.is_published ? (
                        <Badge variant="success">Tampil</Badge>
                      ) : (
                        <Badge variant="secondary">Tersembunyi</Badge>
                      )}
                    </TableCell>
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
                          onClick={() => askDelete(item.id, "foto ini")}
                          aria-label="Hapus foto"
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
            <DialogTitle>{form.id ? "Ubah Foto" : "Tambah Foto"}</DialogTitle>
            <DialogDescription>
              Unggah atau perbarui foto galeri.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="title">Judul *</Label>
              <Input
                id="title"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="category">Kategori *</Label>
              <Input
                id="category"
                required
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                placeholder="Mis. Lingkungan, Pemuda, Kegiatan"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="sort_order">Urutan</Label>
              <Input
                id="sort_order"
                type="number"
                value={form.sort_order}
                onChange={(e) => setForm({ ...form, sort_order: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="image">Gambar *</Label>
              <Input
                id="image"
                type="file"
                accept="image/jpeg,image/png,image/jpg,image/webp"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              />
              {form.image && !file && resolveImageUrl(form.image) && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={resolveImageUrl(form.image)}
                  alt="Gambar saat ini"
                  className="mt-2 h-16 w-24 rounded object-cover"
                />
              )}
              <p className="text-xs text-muted-foreground">
                Maks. 5 MB (JPEG, PNG, JPG, WEBP).
              </p>
            </div>
            <div className="flex items-center justify-between rounded-xs border-slate-100 border p-3">
              <div>
                <p className="text-sm font-medium">Tampilkan di galeri publik</p>
                <p className="text-xs text-muted-foreground">Ganti status tampil.</p>
              </div>
              <Switch
                checked={form.is_published}
                onCheckedChange={(v) => setForm({ ...form, is_published: v })}
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
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

    </div>
  );
}
