<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
['group' => 'statistik', 'key' => 'tahunAwal', 'value' => 2024],
            ['group' => 'identitas', 'key' => 'logo', 'value' => ''],
            ['group' => 'identitas', 'key' => 'nama', 'value' => 'DARMA BAKTI RW 04'],
            ['group' => 'identitas', 'key' => 'tagline', 'value' => 'Kota Tangerang'],
            ['group' => 'keamanan_wilayah', 'key' => 'deskripsi', 'value' => 'Perangkat pengamanan wilayah RW 04 Pabuaran, Kota Tangerang'],
            ['group' => 'keamanan_wilayah', 'key' => 's1Judul', 'value' => 'Petugas Keamanan'],
            ['group' => 'keamanan_wilayah', 'key' => 's1Teks', 'value' => [
                'Sistem keamanan lingkungan RW 04 dikelola oleh tim keamanan yang terlatih dan berdedikasi tinggi. Mereka bertugas secara bergilir 24 jam untuk memastikan kenyamanan dan ketertiban seluruh warga.',
                'Warga juga diwajibkan melapor jika ada tamu yang menginap lebih dari 1x24 jam melalui Ketua RT masing-masing demi meminimalisir potensi gangguan keamanan.',
            ]],
            ['group' => 'keamanan_wilayah', 'key' => 's1Gambar', 'value' => 'https://images.unsplash.com/photo-1584433144859-1fc3ab64a957?q=80&w=1000&auto=format&fit=crop'],
            ['group' => 'keamanan_wilayah', 'key' => 's2Judul', 'value' => 'Sistem Pengawasan CCTV'],
            ['group' => 'keamanan_wilayah', 'key' => 's2Teks', 'value' => [
                'Sebagai komitmen dalam meningkatkan keamanan, wilayah RW 04 kini telah dilengkapi dengan puluhan titik kamera pengawas (CCTV) yang menjangkau area strategis seperti gerbang masuk utama, persimpangan blok, dan fasilitas umum.',
            ]],
            ['group' => 'keamanan_wilayah', 'key' => 's2List', 'value' => [
                'Pemantauan terpusat di Pos Keamanan Utama',
                'Rekaman disimpan secara otomatis selama 14 hari',
                'Dapat diakses oleh warga jika ada keperlun mendesak dengan izin pengurus',
            ]],
            ['group' => 'keamanan_wilayah', 'key' => 's2Gambar', 'value' => 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=1000&auto=format&fit=crop'],
            ['group' => 'keamanan_wilayah', 'key' => 's3Judul', 'value' => 'Lokasi Pos Keamanan (Poskamling)'],
            ['group' => 'keamanan_wilayah', 'key' => 's3Teks', 'value' => [
                'Pos Keamanan Utama berada di dekat Gerbang Utama Pabuaran untuk memastikan pemantauan lalu lalang secara maksimal. Beberapa pos bantuan juga tersebar di tiap blok yang dikoordinasikan secara berkala.',
            ]],
            ['group' => 'kebersihan_lingkungan', 'key' => 'deskripsi', 'value' => 'Layanan kebersihan dan pengelolaan lingkungan RW 04 Pabuaran, Kota Tangerang'],
            ['group' => 'kebersihan_lingkungan', 'key' => 's1Judul', 'value' => 'Petugas Kebersihan'],
            ['group' => 'kebersihan_lingkungan', 'key' => 's1Teks', 'value' => [
                'Kebersihan lingkungan RW 04 Pabuaran dijaga oleh tim kebersihan khusus yang berdedikasi tinggi. Petugas kebersihan bertugas setiap hari untuk mengumpulkan sampah dari rumah-rumah warga dan memastikan fasilitas umum serta jalanan tetap bersih dan nyaman untuk seluruh warga.',
                'Pengangkutan sampah dilakukan menggunakan armada gerobak motor (bentor) yang beroperasi sesuai jadwal rutin harian. Selain pengangkutan sampah dari rumah ke rumah, petugas kebersihan juga membantu dalam pemeliharaan taman, penyapuan jalan raya utama, dan pembersihan saluran air (drainase) secara berkala untuk mencegah genangan air saat musim hujan.',
            ]],
            ['group' => 'kebersihan_lingkungan', 'key' => 's1Gambar', 'value' => 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=1200&auto=format&fit=crop'],
            ['group' => 'kebersihan_lingkungan', 'key' => 's2Judul', 'value' => 'Sistem Pengelolaan Sampah'],
            ['group' => 'kebersihan_lingkungan', 'key' => 's2Teks', 'value' => [
                'Pengelolaan sampah di RW 04 Pabuaran dilakukan dengan sistem yang terpadu dan berwawasan lingkungan. Warga diimbau untuk memisahkan sampah organik dan anorganik sebelum diangkut oleh petugas. Sampah anorganik bernilai ekonomis dapat disetorkan secara kolektif ke Bank Sampah yang dikelola oleh kader PKK dan Karang Taruna setempat.',
                'Sistem pengelolaan ini didukung oleh iuran kebersihan warga yang dikelola secara transparan oleh pengurus RW. Dana tersebut dialokasikan sepenuhnya untuk kesejahteraan petugas kebersihan, perawatan armada angkut, serta pengadaan alat kebersihan lingkungan. Dengan sinergi yang baik antara warga dan petugas, RW 04 Pabuaran berkomitmen menciptakan lingkungan yang asri, bersih, hijau, dan bebas dari penyakit menular.',
            ]],
            ['group' => 'kebersihan_lingkungan', 'key' => 's2Gambar', 'value' => 'https://images.unsplash.com/photo-1604187351574-c75ca79f5807?q=80&w=800&auto=format&fit=crop'],
            ['group' => 'posyandu', 'key' => 'deskripsi', 'value' => 'Pos Pelayanan Terpadu kesehatan ibu, anak, dan lanjut usia RW 04 Pabuaran, Kota Tangerang'],
            ['group' => 'posyandu', 'key' => 's1Judul', 'value' => 'Kader Posyandu & Pelayanan'],
            ['group' => 'posyandu', 'key' => 's1Teks', 'value' => [
                'Layanan Posyandu RW 04 Pabuaran digerakkan oleh para kader kesehatan yang terlatih dan berdedikasi. Mereka bertugas memberikan pelayanan kesehatan dasar bagi ibu hamil, bayi, balita, serta warga lanjut usia (lansia) di lingkungan sekitar.',
                'Kader juga memberikan edukasi kesehatan kepada masyarakat untuk menumbuhkembangkan kesadaran gizi dan kualitas hidup warga sejak usia dini.',
            ]],
            ['group' => 'posyandu', 'key' => 's1Kutipan', 'value' => 'Dengan jadwal rutin yang diadakan setiap bulan, kader Posyandu memantau tumbuh kembang balita melalui penimbangan berat badan, pengukuran tinggi badan, serta pemberian makanan tambahan (PMT) bergizi.'],
            ['group' => 'posyandu', 'key' => 's1Gambar', 'value' => 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop'],
            ['group' => 'posyandu', 'key' => 's2Judul', 'value' => 'Fasilitas & Layanan Kesehatan'],
            ['group' => 'posyandu', 'key' => 's2Teks', 'value' => [
                'Gedung Posyandu RW 04 Pabuaran dilengkapi dengan fasilitas yang memadai untuk menunjang kegiatan pelayanan kesehatan secara optimal. Bekerja sama dengan tenaga kesehatan dari Puskesmas setempat, kami menyediakan layanan imunisasi dasar lengkap, pemeriksaan ibu hamil, hingga pemeriksaan kesehatan preventif seperti tekanan darah dan gula darah bagi lansia.',
                'Partisipasi aktif warga sangat diharapkan dalam setiap kegiatan Posyandu yang diselenggarakan. Dengan pelayanan yang ramah, profesional, dan fasilitas yang mudah dijangkau, kami berkomitmen untuk mewujudkan generasi yang sehat, kuat, dan cerdas.',
            ]],
            ['group' => 'posyandu', 'key' => 's2Gambar', 'value' => 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1200&auto=format&fit=crop'],
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
