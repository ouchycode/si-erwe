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
  author?: string;
  konten?: string;
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
  {
    id: 4,
    nama: "Layanan Posyandu",
    deskripsi:
      "Jadwal posyandu balita dan lansia, imunisasi, serta pelayanan kesehatan dasar gratis.",
    slug: "posyandu",
  },
];

export const BERITA_DUMMY: Berita[] = [
  {
    id: 1,
    judul: "Musyawarah Warga: Perbaikan Drainase Blok A",
    tanggal: "15 April 2026",
    ringkasan: "Pertemuan warga membahas anggaran dan teknis perbaikan saluran air untuk mengantisipasi musim hujan.",
    kategori: "Kegiatan",
    gambar: "/images/berita/musyawarah.png",
    author: "Sekretariat RW 04",
    konten: "<p>Pengurus RW 04 menggelar musyawarah warga yang dihadiri oleh perwakilan dari 5 RT untuk membahas rencana perbaikan drainase di Blok A. Kegiatan ini merupakan tindak lanjut dari aspirasi warga yang disampaikan pada pertemuan sebelumnya.</p><p>Ketua RW 04 menyampaikan bahwa perbaikan drainase menjadi prioritas utama mengingat musim hujan yang akan segera tiba. Anggaran perbaikan akan diambil dari dana iuran warga yang telah terkumpul.</p><p>Hasil musyawarah menyepakati bahwa pengerjaan akan dimulai pada minggu pertama Mei 2026 dan ditargetkan selesai dalam waktu dua minggu. Setiap RT diminta mengirimkan perwakilan untuk gotong royong.</p>",
  },
  {
    id: 2,
    judul: "Vaksinasi Booster Gratis di Balai Warga",
    tanggal: "12 April 2026",
    ringkasan: "Bekerjasama dengan Puskesmas Pabuaran, RW 04 menyelenggarakan vaksinasi gratis akhir pekan ini.",
    kategori: "Kesehatan",
    gambar: "/images/berita/vaksinasi.png",
    author: "Sekretariat RW 04",
    konten: "<p>RW 04 Pabuaran bekerja sama dengan Puskesmas Kecamatan Karawaci mengadakan program vaksinasi booster gratis bagi seluruh warga. Kegiatan ini dilaksanakan di Balai Warga pada hari Sabtu dan Minggu.</p><p>Jenis vaksin yang tersedia meliputi vaksin COVID-19 dosis booster dan vaksinasi rutin untuk balita. Warga diimbau membawa KTP dan kartu vaksinasi sebelumnya.</p><p>Antusiasme warga cukup tinggi terlihat dari jumlah pendaftar yang mencapai 150 orang dalam dua hari pelaksanaan. Kegiatan serupa akan diagendakan secara berkala setiap tiga bulan.</p>",
  },
  {
    id: 3,
    judul: "Kerja Bakti Serentak Seluruh RT",
    tanggal: "10 April 2026",
    ringkasan: "Seluruh warga RW 04 bergotong royong membersihkan lingkungan dalam rangka menyambut bulan kebersihan.",
    kategori: "Kegiatan",
    gambar: "/images/berita/kerjabakti.png",
    author: "Sekretariat RW 04",
    konten: "<p>Kegiatan kerja bakti serentak di seluruh lingkungan RW 04 berjalan dengan lancar. Warga dari 5 RT bahu-membahu membersihkan selokan, memotong rumput liar, dan merapikan taman lingkungan.</p><p>Ketua RW 04 mengapresiasi partisipasi aktif warga yang mencapai 80% dari total kepala keluarga. Kegiatan ini juga dimanfaatkan untuk pengecekan rutin fasilitas umum seperti penerangan jalan dan pos kamling.</p><p>Kerja bakti akan dijadwalkan secara rutin setiap hari Minggu pertama di setiap bulan.</p>",
  },
  {
    id: 4,
    judul: "Pengumuman Iuran Bulanan Periode Mei 2026",
    tanggal: "8 April 2026",
    ringkasan: "Iuran wajib bulanan dapat dibayarkan kepada masing-masing ketua RT mulai tanggal 1 hingga 10 Mei 2026.",
    kategori: "Pengumuman",
    gambar: "/images/berita/iuran.png",
    author: "Bendahara RW 04",
    konten: "<p>Diberitahukan kepada seluruh warga RW 04 bahwa pembayaran iuran bulanan untuk periode Mei 2026 telah dibuka. Iuran dapat dibayarkan langsung kepada ketua RT masing-masing.</p><p>Besar iuran bulanan masih sama seperti periode sebelumnya, yaitu Rp 50.000 per kepala keluarga. Pembayaran paling lambat tanggal 10 Mei 2026.</p><p>Bagi warga yang membayar setelah tanggal 10 akan dikenakan denda keterlambatan sebesar Rp 5.000 per hari. Pembayaran dapat dilakukan secara tunai atau transfer ke rekening bendahara RW.</p>",
  },
];

export const DETAIL_MAP = Object.fromEntries(BERITA_DUMMY.map((b) => [b.id, b]));
