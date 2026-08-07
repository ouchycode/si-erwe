"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import {
  Newspaper,
  Images,
  Inbox,
  MessageSquare,
  Users,
  ArrowRight,
  Clock,
} from "lucide-react";

import { useFetch } from "@/lib/hooks/useFetch";
import { admin, getUserSnapshot, subscribeUser } from "@/lib/adminApi";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Pengajuan, Pesan } from "@/lib/types";
import {
  LAYANAN_LABEL,
  STATUS_PENGAJUAN_LABEL,
} from "@/lib/types";

interface DashboardSummary {
  berita: number;
  galeri: number;
  pengurus: number;
  pengajuan: number;
  pesan: number;
  recent_pengajuan: Pengajuan[];
  recent_pesan: Pesan[];
}

function StatCard({
  label,
  value,
  loading,
  icon: Icon,
  href,
  tone,
}: {
  label: string;
  value: number | string;
  loading: boolean;
  icon: typeof Newspaper;
  href: string;
  tone: string;
}) {
  return (
    <Link
      href={href}
      className="block rounded-xs bg-white shadow-sm transition-all hover:shadow-md"
    >
      <div className="flex items-center gap-4 px-4 py-5">
        <div className={cn("flex size-11 shrink-0 items-center justify-center rounded-xs", tone)}>
          <Icon className="size-5" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-medium text-muted-foreground">{label}</p>
          {loading ? (
            <Skeleton className="mt-1 h-7 w-16" />
          ) : (
            <p className="text-2xl font-bold text-slate-800">{value}</p>
          )}
        </div>
      </div>
    </Link>
  );
}

const STATUS_BADGE: Record<string, "warning" | "default" | "success" | "destructive"> = {
  menunggu: "warning",
  diproses: "default",
  selesai: "success",
  ditolak: "destructive",
};

function formatDate(iso: string | undefined): string {
  if (!iso) return "-";
  const d = new Date(iso);
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminDashboardPage() {
  const user = useSyncExternalStore(subscribeUser, getUserSnapshot, () => null);
  const { data, loading } = useFetch(
    () => admin.get<{ data: DashboardSummary }>("/admin/dashboard"),
    []
  );

  const summary = data?.data;
  const s = summary ?? {
    berita: 0,
    galeri: 0,
    pengurus: 0,
    pengajuan: 0,
    pesan: 0,
    recent_pengajuan: [],
    recent_pesan: [],
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-xs bg-brand-primary px-6 py-7 text-white shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-white/80">Selamat datang kembali,</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight md:text-3xl">
            {user?.name ?? "Admin"}
          </h1>
          <p className="mt-1 text-sm text-white/75">
            Ringkasan konten dan aktivitas pengelolaan Sekretariat RW 04.
          </p>
        </div>
        <Button
          variant="secondary"
          className="shrink-0 bg-white text-brand-primary hover:bg-slate-100"
          nativeButton={false}
          render={<Link href="/" />}
        >
          Lihat Situs
          <ArrowRight className="size-4" />
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
        <StatCard
          label="Berita"
          value={s.berita}
          loading={loading}
          icon={Newspaper}
          href="/admin/berita"
          tone="bg-brand-light text-brand-primary"
        />
        <StatCard
          label="Foto Galeri"
          value={s.galeri}
          loading={loading}
          icon={Images}
          href="/admin/galeri"
          tone="bg-emerald-50 text-emerald-600"
        />
        <StatCard
          label="Pengurus"
          value={s.pengurus}
          loading={loading}
          icon={Users}
          href="/admin/pengurus"
          tone="bg-sky-50 text-sky-600"
        />
        <StatCard
          label="Pengajuan"
          value={s.pengajuan}
          loading={loading}
          icon={Inbox}
          href="/admin/pengajuan"
          tone="bg-amber-50 text-amber-600"
        />
        <StatCard
          label="Pesan Masuk"
          value={s.pesan}
          loading={loading}
          icon={MessageSquare}
          href="/admin/pesan"
          tone="bg-purple-50 text-purple-600"
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold tracking-tight text-slate-800">
              Pengajuan Terbaru
            </h2>
            <Button
              variant="ghost"
              size="sm"
              className="text-brand-primary hover:text-brand-primary-hover"
              nativeButton={false}
              render={<Link href="/admin/pengajuan" />}
            >
              Lihat semua <ArrowRight className="size-3.5" />
            </Button>
          </div>
          <div className="overflow-hidden rounded-xs bg-white shadow-sm">
            {loading ? (
              <div className="space-y-3 p-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-10 w-full" />
                ))}
              </div>
            ) : s.recent_pengajuan.length === 0 ? (
              <p className="py-6 text-center text-sm text-muted-foreground">
                Belum ada pengajuan.
              </p>
            ) : (
              <div className="divide-y divide-slate-100">
                {s.recent_pengajuan.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between gap-3 px-4 py-3 transition-colors hover:bg-white"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{p.nama}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {LAYANAN_LABEL[p.jenis_layanan] ?? p.jenis_layanan} · {p.kode}
                      </p>
                    </div>
                    <Badge variant={STATUS_BADGE[p.status] ?? "default"}>
                      {STATUS_PENGAJUAN_LABEL[p.status] ?? p.status}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold tracking-tight text-slate-800">
              Pesan Terbaru
            </h2>
            <Button
              variant="ghost"
              size="sm"
              className="text-brand-primary hover:text-brand-primary-hover"
              nativeButton={false}
              render={<Link href="/admin/pesan" />}
            >
              Lihat semua <ArrowRight className="size-3.5" />
            </Button>
          </div>
          <div className="overflow-hidden rounded-xs bg-white shadow-sm">
            {loading ? (
              <div className="space-y-3 p-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-10 w-full" />
                ))}
              </div>
            ) : s.recent_pesan.length === 0 ? (
              <p className="py-6 text-center text-sm text-muted-foreground">
                Belum ada pesan masuk.
              </p>
            ) : (
              <div className="divide-y divide-slate-100">
                {s.recent_pesan.map((m) => (
                  <div
                    key={m.id}
                    className="flex items-start justify-between gap-3 px-4 py-3 transition-colors hover:bg-white"
                  >
                    <div className="min-w-0">
                      <p className="flex items-center gap-2 truncate text-sm font-medium">
                        {!m.is_read && <span className="size-2 shrink-0 rounded-full bg-brand-primary" />}
                        {m.nama}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">{m.pesan}</p>
                    </div>
                    <span className="flex shrink-0 items-center gap-1 text-[11px] text-muted-foreground">
                      <Clock className="size-3" />
                      {formatDate(m.created_at)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
