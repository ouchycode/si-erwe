"use client";

import { useCallback, useState } from "react";
import { Plus, Pencil, Trash2, Search, Users } from "lucide-react";
import { toast } from "sonner";

import { admin } from "@/lib/adminApi";
import { ApiError } from "@/lib/api";
import { resolveImageUrl } from "@/lib/api";
import { imageFileError } from "@/lib/imageFile";
import { useFetch } from "@/lib/hooks/useFetch";
import type { Pengurus, Paginated, ApiMessage } from "@/lib/types";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Pagination } from "@/components/admin/Pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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

const LEVEL_LABEL: Record<string, string> = {
  ketua: "Ketua",
  inti: "Pengurus Inti",
  koordinator: "Koordinator",
};

interface PengurusForm {
  id?: number;
  nama: string;
  jabatan: string;
  level: string;
  deskripsi: string;
  telp: string;
  urutan: string;
  is_active: boolean;
  foto: string | null;
}

const EMPTY_FORM: PengurusForm = {
  nama: "",
  jabatan: "",
  level: "inti",
  deskripsi: "",
  telp: "",
  urutan: "0",
  is_active: true,
  foto: null,
};

export default function AdminPengurusPage() {
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<PengurusForm>(EMPTY_FORM);
  const [file, setFile] = useState<File | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetcher = useCallback(() => {
    const params = new URLSearchParams({ per_page: "15" });
    if (search) params.set("q", search);
    params.set("page", String(page));
    return admin.get<Paginated<Pengurus>>(`/admin/pengurus?${params.toString()}`);
  }, [page, search]);

  const { data, loading, reload } = useFetch(fetcher, [page, search]);

  const openCreate = () => {
    setForm(EMPTY_FORM);
    setFile(null);
    setDialogOpen(true);
  };

  const openEdit = (item: Pengurus) => {
    setForm({
      id: item.id,
      nama: item.nama,
      jabatan: item.jabatan,
      level: item.level,
      deskripsi: item.deskripsi ?? "",
      telp: item.telp ?? "",
      urutan: String(item.urutan ?? 0),
      is_active: item.is_active ?? true,
      foto: item.foto,
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
      body.append("nama", form.nama);
      body.append("jabatan", form.jabatan);
      body.append("level", form.level);
      body.append("deskripsi", form.deskripsi);
      body.append("telp", form.telp);
      body.append("urutan", form.urutan);
      body.append("is_active", form.is_active ? "1" : "0");
      if (file) body.append("foto", file);

      if (form.id) {
        const res = await admin.put<ApiMessage<Pengurus>>(`/admin/pengurus/${form.id}`, body);
        toast.success(res.message);
      } else {
        const res = await admin.post<ApiMessage<Pengurus>>("/admin/pengurus", body);
        toast.success(res.message);
      }
      setDialogOpen(false);
      void reload();
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Gagal menyimpan pengurus.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const res = await admin.delete<ApiMessage>(`/admin/pengurus/${deleteId}`);
      toast.success(res.message);
      setDeleteId(null);
      void reload();
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Gagal menghapus pengurus.");
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
        title="Kelola Pengurus RW"
        subtitle="Kelola susunan pengurus dan ketua RW 004."
        action={
          <Button className="bg-brand-primary hover:bg-brand-primary-hover" onClick={openCreate}>
            <Plus className="size-4" />
            Tambah Pengurus
          </Button>
        }
      />

      <div className="space-y-4 rounded-xs bg-white p-4 shadow-sm sm:p-5">
          <form onSubmit={submitSearch} className="flex w-full gap-2 sm:max-w-md">
            <div className="relative flex-1">
              <Search className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Cari nama pengurus..."
                className="pl-8"
              />
            </div>
            <Button type="submit" variant="outline">
              Cari
            </Button>
          </form>

          <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100">
                <TableHead>Foto</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Jabatan</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Urutan</TableHead>
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
                    <Users className="mx-auto mb-2 size-8 opacity-40" />
                    Belum ada pengurus.
                  </TableCell>
                </TableRow>
              ) : (
                (data?.data ?? []).map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      {item.foto ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={resolveImageUrl(item.foto)}
                          alt={item.nama}
                          className="h-10 w-10 shrink-0 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">
                          {item.nama.charAt(0)}
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{item.nama}</TableCell>
                    <TableCell>{item.jabatan}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{LEVEL_LABEL[item.level] ?? item.level}</Badge>
                    </TableCell>
                    <TableCell>{item.urutan ?? 0}</TableCell>
                    <TableCell>
                      {item.is_active ? (
                        <Badge variant="success">Aktif</Badge>
                      ) : (
                        <Badge variant="secondary">Nonaktif</Badge>
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
                          onClick={() => setDeleteId(item.id)}
                          aria-label="Hapus pengurus"
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
            <DialogTitle>{form.id ? "Ubah Pengurus" : "Tambah Pengurus"}</DialogTitle>
            <DialogDescription>
              Isi data pengurus di bawah ini.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="nama">Nama *</Label>
              <Input
                id="nama"
                required
                value={form.nama}
                onChange={(e) => setForm({ ...form, nama: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="jabatan">Jabatan *</Label>
              <Input
                id="jabatan"
                required
                value={form.jabatan}
                onChange={(e) => setForm({ ...form, jabatan: e.target.value })}
                placeholder="Mis. Ketua RW 004, Sekretaris"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="level">Level *</Label>
              <Select value={form.level} onValueChange={(v) => setForm({ ...form, level: v ?? "inti" })}>
                <SelectTrigger id="level" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ketua">Ketua</SelectItem>
                  <SelectItem value="inti">Pengurus Inti</SelectItem>
                  <SelectItem value="koordinator">Koordinator</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="deskripsi">Deskripsi</Label>
              <Textarea
                id="deskripsi"
                rows={3}
                value={form.deskripsi}
                onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="telp">No. Telepon</Label>
                <Input
                  id="telp"
                  value={form.telp}
                  onChange={(e) => setForm({ ...form, telp: e.target.value })}
                  placeholder="08xx-xxxx-xxxx"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="urutan">Urutan</Label>
                <Input
                  id="urutan"
                  type="number"
                  value={form.urutan}
                  onChange={(e) => setForm({ ...form, urutan: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="foto">Foto</Label>
              <Input
                id="foto"
                type="file"
                accept="image/jpeg,image/png,image/jpg,image/webp"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              />
              {form.foto && !file && resolveImageUrl(form.foto) && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={resolveImageUrl(form.foto)}
                  alt="Foto saat ini"
                  className="mt-2 h-16 w-16 rounded-full object-cover"
                />
              )}
              <p className="text-xs text-muted-foreground">
                Maks. 3 MB (JPEG, PNG, JPG, WEBP).
              </p>
            </div>
            <div className="flex items-center justify-between rounded-xs border-slate-100 border p-3">
              <div>
                <p className="text-sm font-medium">Aktif</p>
                <p className="text-xs text-muted-foreground">
                  Tampilkan di halaman publik.
                </p>
              </div>
              <Switch
                checked={form.is_active}
                onCheckedChange={(v) => setForm({ ...form, is_active: v })}
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

      <Dialog open={deleteId !== null} onOpenChange={(o) => !o && setDeleteId(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Hapus Pengurus</DialogTitle>
            <DialogDescription>
              Yakin ingin menghapus data pengurus ini? Tindakan ini tidak dapat dibatalkan.
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
