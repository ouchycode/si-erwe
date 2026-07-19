// Definisi Type/Interface
export interface Layanan {
  id: number;
  nama: string;
  deskripsi: string;
  slug: string;
}

export interface Berita {
  id: number;
  judul: string;
  tanggal: string;
  ringkasan: string;
  kategori: string;
  gambar: string;
}

// Data Dummy
export const LAYANAN_DUMMY: Layanan[] = [
  {
    id: 1,
    nama: "Administrasi Kependudukan",
    deskripsi:
      "Layanan pengurusan surat pengantar RT/RW untuk pembuatan KK, KTP, Akta Kelahiran, dan surat domisili.",
    slug: "administrasi-kependudukan",
  },
  {
    id: 2,
    nama: "Keamanan Wilayah",
    deskripsi:
      "Sistem pelaporan tamu 1x24 jam, jadwal petugas Siskamling, dan koordinasi keamanan lingkungan.",
    slug: "keamanan-wilayah",
  },
  {
    id: 3,
    nama: "Kebersihan Lingkungan",
    deskripsi:
      "Informasi jadwal pengangkutan sampah mingguan, pengelolaan limbah rumah tangga, dan kerja bakti.",
    slug: "kebersihan-lingkungan",
  },
];

export const BERITA_DUMMY: Berita[] = [
  {
    id: 1,
    judul: "Musyawarah Warga: Perbaikan Drainase Blok A",
    tanggal: "15 April 2026",
    ringkasan:
      "Pertemuan warga membahas anggaran dan teknis perbaikan saluran air untuk mengantisipasi musim hujan.",
    kategori: "Kegiatan",
    gambar: "/images/berita/musyawarah.png",
  },
  {
    id: 2,
    judul: "Vaksinasi Booster Gratis di Balai Warga",
    tanggal: "12 April 2026",
    ringkasan:
      "Bekerjasama dengan Puskesmas Pabuaran, RW 04 menyelenggarakan vaksinasi gratis akhir pekan ini.",
    kategori: "Kesehatan",
    gambar: "/images/berita/vaksinasi.png",
  },
  {
    id: 3,
    judul: "Kerja Bakti Serentak Seluruh RT",
    tanggal: "10 April 2026",
    ringkasan:
      "Seluruh warga RW 04 bergotong royong membersihkan lingkungan dalam rangka menyambut bulan kebersihan.",
    kategori: "Kegiatan",
    gambar: "/images/berita/kerjabakti.png",
  },
  {
    id: 4,
    judul: "Pengumuman Iuran Bulanan Periode Mei 2026",
    tanggal: "8 April 2026",
    ringkasan:
      "Iuran wajib bulanan dapat dibayarkan kepada masing-masing ketua RT mulai tanggal 1 hingga 10 Mei 2026.",
    kategori: "Pengumuman",
    gambar: "/images/berita/iuran.png",
  },
];
