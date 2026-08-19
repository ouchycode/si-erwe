<?php

namespace Database\Seeders;

use App\Models\Berita;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class BeritaSeeder extends Seeder
{
    public function run(): void
    {
        $berita = [
            [
                'judul' => 'Musyawarah Warga: Perbaikan Drainase Blok A',
                'ringkasan' => 'Pertemuan warga membahas anggaran dan teknis perbaikan saluran air untuk mengantisipasi musim hujan.',
                'kategori' => 'Kegiatan',
                'author' => 'Sekretariat RW 004',
                'konten' => '<p>Pengurus RW 004 menggelar musyawarah warga yang dihadiri oleh perwakilan dari 5 RT untuk membahas rencana perbaikan drainase di Blok A. Kegiatan ini merupakan tindak lanjut dari aspirasi warga yang disampaikan pada pertemuan sebelumnya.</p><p>Ketua RW 004 menyampaikan bahwa perbaikan drainase menjadi prioritas utama mengingat musim hujan yang akan segera tiba. Anggaran perbaikan akan diambil dari dana iuran warga yang telah terkumpul.</p><p>Hasil musyawarah menyepakati bahwa pengerjaan akan dimulai pada minggu pertama Mei 2026 dan ditargetkan selesai dalam waktu dua minggu. Setiap RT diminta mengirimkan perwakilan untuk gotong royong.</p>',
            ],
            [
                'judul' => 'Vaksinasi Booster Gratis di Balai Warga',
                'ringkasan' => 'Bekerjasama dengan Puskesmas Pabuaran, RW 004 menyelenggarakan vaksinasi gratis akhir pekan ini.',
                'kategori' => 'Kesehatan',
                'author' => 'Sekretariat RW 004',
                'konten' => '<p>RW 004 Pabuaran bekerja sama dengan Puskesmas Kecamatan Karawaci mengadakan program vaksinasi booster gratis bagi seluruh warga. Kegiatan ini dilaksanakan di Balai Warga pada hari Sabtu dan Minggu.</p><p>Jenis vaksin yang tersedia meliputi vaksin COVID-19 dosis booster dan vaksinasi rutin untuk balita. Warga diimbau membawa KTP dan kartu vaksinasi sebelumnya.</p><p>Antusiasme warga cukup tinggi terlihat dari jumlah pendaftar yang mencapai 150 orang dalam dua hari pelaksanaan. Kegiatan serupa akan diagendakan secara berkala setiap tiga bulan.</p>',
            ],
            [
                'judul' => 'Kerja Bakti Serentak Seluruh RT',
                'ringkasan' => 'Seluruh warga RW 004 bergotong royong membersihkan lingkungan dalam rangka menyambut bulan kebersihan.',
                'kategori' => 'Kegiatan',
                'author' => 'Sekretariat RW 004',
                'konten' => '<p>Kegiatan kerja bakti serentak di seluruh lingkungan RW 004 berjalan dengan lancar. Warga dari 5 RT bahu-membahu membersihkan selokan, memotong rumput liar, dan merapikan taman lingkungan.</p><p>Ketua RW 004 mengapresiasi partisipasi aktif warga yang mencapai 80% dari total kepala keluarga. Kegiatan ini juga dimanfaatkan untuk pengecekan rutin fasilitas umum seperti penerangan jalan dan pos kamling.</p><p>Kerja bakti akan dijadwalkan secara rutin setiap hari Minggu pertama di setiap bulan.</p>',
            ],
            [
                'judul' => 'Pengumuman Iuran Bulanan Periode Mei 2026',
                'ringkasan' => 'Iuran wajib bulanan dapat dibayarkan kepada masing-masing ketua RT mulai tanggal 1 hingga 10 Mei 2026.',
                'kategori' => 'Pengumuman',
                'author' => 'Bendahara RW 004',
                'konten' => '<p>Diberitahukan kepada seluruh warga RW 004 bahwa pembayaran iuran bulanan untuk periode Mei 2026 telah dibuka. Iuran dapat dibayarkan langsung kepada ketua RT masing-masing.</p><p>Besar iuran bulanan masih sama seperti periode sebelumnya, yaitu Rp 50.000 per kepala keluarga. Pembayaran paling lambat tanggal 10 Mei 2026.</p><p>Bagi warga yang membayar setelah tanggal 10 akan dikenakan denda keterlambatan sebesar Rp 5.000 per hari. Pembayaran dapat dilakukan secara tunai atau transfer ke rekening bendahara RW.</p>',
            ],
        ];

        $gambar = ['musyawarah', 'vaksinasi', 'kerjabakti', 'iuran'];

        foreach ($berita as $i => $item) {
            $tanggal = now()->subDays(($i * 3) + 1)->startOfDay();
            Berita::create([
                'judul' => $item['judul'],
                'slug' => Str::slug($item['judul']) . '-' . now()->format('YmdHis') . $i,
                'ringkasan' => $item['ringkasan'],
                'konten' => $item['konten'],
                'kategori' => $item['kategori'],
                'gambar' => '/images/berita/' . $gambar[$i] . '.png',
                'author' => $item['author'],
                'is_published' => true,
                'published_at' => $tanggal,
            ]);
        }
    }
}
