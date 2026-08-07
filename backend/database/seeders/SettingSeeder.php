<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            ['group' => 'hero', 'key' => 'gambar', 'value' => ''],
            ['group' => 'alamat', 'key' => 'sekretariat', 'value' => [
                'tempat' => 'Gedung Serbaguna RW 04',
                'jalan' => 'Jl. Pabuaran Raya No.1A',
                'kelurahan' => 'Pabuaran',
                'kecamatan' => 'Karawaci',
                'kota' => 'Kota Tangerang',
                'provinsi' => 'Banten',
                'kodePos' => '15114',
                'full' => 'Gedung Serbaguna RW 04, Jl. Pabuaran Raya No.1A, Pabuaran, Kec. Karawaci, Kota Tangerang, Banten 15114',
                'singkat' => 'Sekretariat RW 04 Pabuaran, Karawaci, Kota Tangerang',
            ]],
            ['group' => 'kontak', 'key' => 'sekretariat', 'value' => [
                'wa' => '+62 811-2222-3333',
                'waTelp' => '628112223333',
                'email' => 'admin@rw04pabuaran.id',
            ]],
            ['group' => 'jam_operasional', 'key' => 'sekretariat', 'value' => [
                ['hari' => 'Senin – Jumat', 'jam' => '19.00 – 22.00'],
                ['hari' => 'Sabtu – Minggu', 'jam' => '09.00 – 15.00'],
                ['hari' => 'Hari Libur Nasional', 'jam' => 'Tutup', 'libur' => true],
            ]],
            ['group' => 'profil', 'key' => 'umum', 'value' => [
                'periode' => '2024 — 2027',
                'jumlahRt' => 5,
                'jumlahKk' => 350,
                'kelurahan' => 'Pabuaran',
                'kecamatan' => 'Karawaci',
            ]],
            ['group' => 'profil', 'key' => 'visi', 'value' => 'Terwujudnya lingkungan RW 04 yang Aman, Bersih, Guyub, dan Sejahtera berlandaskan nilai-nilai Ketuhanan dan Gotong Royong.'],
            ['group' => 'profil', 'key' => 'misi', 'value' => [
                'Meningkatkan sistem keamanan lingkungan terpadu.',
                'Menggalakkan program kebersihan dan penghijauan.',
                'Mendorong partisipasi aktif warga dalam kegiatan sosial.',
                'Mengoptimalkan pelayanan administrasi warga berbasis digital.',
            ]],
            ['group' => 'profil', 'key' => 'sejarah', 'value' => [
                'RW 04 Pabuaran, Kota Tangerang, dibentuk seiring dengan perkembangan pesat pemukiman di wilayah Kota Tangerang. Pada awalnya, wilayah ini hanya terdiri dari beberapa Rukun Tetangga yang terus berkembang hingga sekarang.',
                'Seiring bertambahnya jumlah penduduk, RW 04 kini menaungi 5 RT. Warga RW 04 dikenal dengan semangat kegotongroyongannya yang tinggi, multikultural, dan aktif dalam berbagai kegiatan sosial kemasyarakatan.',
            ]],
            ['group' => 'layanan', 'key' => 'kartu', 'value' => [
                [
                    'nama' => 'Administrasi Kependudukan',
                    'deskripsi' => 'Layanan pengurusan surat pengantar RT/RW untuk pembuatan KK, KTP, Akta Kelahiran, dan surat domisili.',
                    'slug' => 'administrasi-kependudukan',
                ],
                [
                    'nama' => 'Keamanan Wilayah',
                    'deskripsi' => 'Sistem pelaporan tamu 1x24 jam, jadwal petugas Siskamling, dan koordinasi keamanan lingkungan.',
                    'slug' => 'keamanan-wilayah',
                ],
                [
                    'nama' => 'Kebersihan Lingkungan',
                    'deskripsi' => 'Informasi jadwal pengangkutan sampah mingguan, pengelolaan limbah rumah tangga, dan kerja bakti.',
                    'slug' => 'kebersihan-lingkungan',
                ],
                [
                    'nama' => 'Layanan Posyandu',
                    'deskripsi' => 'Jadwal posyandu balita dan lansia, imunisasi, serta pelayanan kesehatan dasar gratis.',
                    'slug' => 'posyandu',
                ],
            ]],
            ['group' => 'layanan', 'key' => 'administrasi', 'value' => [
                [
                    'judul' => 'Surat Pengantar RT/RW',
                    'slug' => 'surat-pengantar',
                    'syarat' => ['Fotokopi Kartu Keluarga (KK)', 'Fotokopi KTP Pemohon'],
                ],
                [
                    'judul' => 'Surat Domisili',
                    'slug' => 'surat-domisili',
                    'syarat' => ['Surat Pengantar RT/RW', 'Fotokopi KTP', 'Pas Foto 3x4 (2 lembar)'],
                ],
                [
                    'judul' => 'Pengurusan KTP/KK Baru',
                    'slug' => 'ktp-kk-baru',
                    'syarat' => ['Surat Pengantar RT/RW', 'KK Lama asli (untuk KK baru)', 'Fotokopi Buku Nikah (jika ada)'],
                ],
            ]],
            ['group' => 'layanan', 'key' => 'alur', 'value' => [
                ['step' => '01', 'title' => 'Siapkan Berkas', 'desc' => 'Siapkan fotokopi KK, KTP, dan dokumen pendukung lainnya sesuai layanan yang dibutuhkan.'],
                ['step' => '02', 'title' => 'Lapor Ketua RT', 'desc' => 'Temui Ketua RT di wilayah domisili Anda untuk mendapatkan tanda tangan pengantar.'],
                ['step' => '03', 'title' => 'Validasi RW', 'desc' => 'Bawa surat yang sudah ditandatangani RT ke Sekretariat RW 04 untuk validasi stempel.'],
                ['step' => '04', 'title' => 'Lanjut ke Kelurahan', 'desc' => 'Bawa berkas lengkap ke Kantor Kelurahan Pabuaran untuk proses selanjutnya.'],
            ]],
            ['group' => 'program_warga', 'key' => 'daftar', 'value' => [
                [
                    'nama' => 'KWT',
                    'subtitle' => 'Kelompok Wanita Tani',
                    'deskripsi' => 'Mengelola kebun lingkungan, bibit tanaman, dan kegiatan pangan keluarga bersama ibu-ibu warga RW 04.',
                    'detail' => ['Kebun sayur bersama', 'Pembibitan tanaman', 'Edukasi pangan keluarga'],
                    'jadwal' => ['waktu' => 'Sabtu pekan ke-1', 'tempat' => 'Kebun RW 04'],
                ],
                [
                    'nama' => 'Bank Sampah',
                    'subtitle' => 'Pengelolaan Sampah Terpilah',
                    'deskripsi' => 'Wadah setoran sampah bernilai guna agar lingkungan lebih bersih dan warga terbiasa memilah dari rumah.',
                    'detail' => ['Setor sampah anorganik', 'Pencatatan saldo warga', 'Edukasi pilah sampah'],
                    'jadwal' => ['waktu' => 'Minggu pekan ke-2', 'tempat' => 'Balai Warga'],
                ],
            ]],
        ];

        foreach ($settings as $item) {
            Setting::updateOrCreate(
                ['group' => $item['group'], 'key' => $item['key']],
                ['value' => $item['value']]
            );
        }
    }
}
