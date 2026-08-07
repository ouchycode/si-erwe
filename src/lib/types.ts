export interface Layanan {
  id: number;
  nama: string;
  deskripsi: string;
  slug: string;
}

export interface Berita {
  id: number;
  judul: string;
  slug: string;
  ringkasan: string;
  kategori: string;
  gambar: string | null;
  author: string | null;
  tanggal: string;
  views: number;
  konten?: string;
  is_published?: boolean;
}

export interface GaleriItem {
  id: number;
  title: string;
  category: string;
  image: string | null;
  is_published?: boolean;
  sort_order?: number;
}

export interface Pengurus {
  id: number;
  nama: string;
  jabatan: string;
  level: string;
  deskripsi: string | null;
  foto: string | null;
  telp: string | null;
  urutan: number;
  is_active?: boolean;
}

export interface PengurusRt {
  id: number;
  rt: string;
  ketua: string;
  lokasi: string | null;
  telp: string | null;
  foto: string | null;
  urutan: number;
  is_active?: boolean;
}

export interface StatistikRow {
  id?: number;
  rt: string;
  [key: string]: string | number | undefined;
}

export interface StatistikCategory {
  id: number;
  keys: string[];
  columns: { key: string; label: string }[];
  chartTitle: string;
  chartColors: string[];
  totals: Record<string, number>;
  data: StatistikRow[];
}

export type StatistikResponse = Record<string, StatistikCategory>;

export interface Pengajuan {
  id: number;
  kode: string;
  nik: string;
  nama: string;
  jenis_layanan: string;
  keperluan: string;
  status: "menunggu" | "diproses" | "selesai" | "ditolak";
  catatan: string | null;
  is_read: boolean;
  created_at: string;
}

export interface Pesan {
  id: number;
  nama: string;
  kontak: string;
  kategori: string;
  pesan: string;
  is_read: boolean;
  created_at: string;
}

export interface SekretariatAlamat {
  tempat: string;
  jalan: string;
  kelurahan: string;
  kecamatan: string;
  kota: string;
  provinsi: string;
  kodePos: string;
  full?: string;
  singkat?: string;
}

export interface SekretariatKontak {
  wa: string;
  waTelp: string;
  email: string;
}

export interface JamOperasionalItem {
  hari: string;
  jam: string;
  libur?: boolean;
}

export interface SettingGroups {
  [group: string]: {
    [key: string]: unknown;
  };
}

export interface LayananAdministrasi {
  slug: string;
  judul: string;
  syarat: string[];
}

export interface LayananAlur {
  step: string;
  title: string;
  desc: string;
}

export interface ProgramWargaItem {
  nama: string;
  subtitle: string;
  deskripsi: string;
  detail: string[];
  jadwal?: { waktu: string; tempat: string };
}

export interface ProfilUmum {
  periode: string;
  jumlahKk: number;
  jumlahRt: number;
  kecamatan: string;
  kelurahan: string;
}

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

export interface Paginated<T> {
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
}

export interface ApiMessage<T = null> {
  message: string;
  data?: T;
}

export const JENIS_LAYANAN_OPTIONS = [
  { value: "surat-pengantar", label: "Surat Pengantar" },
  { value: "surat-domisili", label: "Surat Domisili" },
  { value: "ktp-kk-baru", label: "KTP/KK Baru" },
  { value: "lainnya", label: "Lainnya" },
] as const;

export const STATUS_PENGAJUAN_OPTIONS = [
  { value: "menunggu", label: "Menunggu" },
  { value: "diproses", label: "Diproses" },
  { value: "selesai", label: "Selesai" },
  { value: "ditolak", label: "Ditolak" },
] as const;

export const KATEGORI_PESAN_OPTIONS = [
  { value: "pertanyaan", label: "Pertanyaan" },
  { value: "laporan", label: "Laporan" },
  { value: "saran", label: "Saran" },
  { value: "lainnya", label: "Lainnya" },
] as const;

export const LAYANAN_LABEL: Record<string, string> = Object.fromEntries(
  JENIS_LAYANAN_OPTIONS.map((o) => [o.value, o.label])
);

export const STATUS_PENGAJUAN_LABEL: Record<string, string> = Object.fromEntries(
  STATUS_PENGAJUAN_OPTIONS.map((o) => [o.value, o.label])
);

export const KATEGORI_PESAN_LABEL: Record<string, string> = Object.fromEntries(
  KATEGORI_PESAN_OPTIONS.map((o) => [o.value, o.label])
);
