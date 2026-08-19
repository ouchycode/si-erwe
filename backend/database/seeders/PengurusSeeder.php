<?php

namespace Database\Seeders;

use App\Models\Pengurus;
use Illuminate\Database\Seeder;

class PengurusSeeder extends Seeder
{
    public function run(): void
    {
        $pengurus = [
            ['jabatan' => 'Ketua RW 004', 'nama' => 'Muhamad Fadli Husna Mubarok', 'deskripsi' => 'Pimpinan utama dan pengarah seluruh kegiatan RW 004 Pabuaran.', 'level' => 'ketua', 'urutan' => 1],
            ['jabatan' => 'Sekretaris', 'nama' => 'Kevin Ardiansyah', 'deskripsi' => 'Administrasi, surat-menyurat, dan dokumentasi kegiatan.', 'level' => 'inti', 'urutan' => 1],
            ['jabatan' => 'Bendahara', 'nama' => 'Fadhila', 'deskripsi' => 'Pencatatan dan pengelolaan keuangan RW.', 'level' => 'inti', 'urutan' => 2],
            ['jabatan' => 'Keamanan & Ketertiban', 'nama' => 'Bagus', 'deskripsi' => 'Koordinasi siskamling dan keamanan lingkungan.', 'level' => 'koordinator', 'urutan' => 1],
            ['jabatan' => 'Kebersihan & Lingkungan', 'nama' => 'Soviyulloh', 'deskripsi' => 'Program kebersihan dan kerja bakti warga.', 'level' => 'koordinator', 'urutan' => 2],
            ['jabatan' => 'Pembangunan & Sarana', 'nama' => 'Umam', 'deskripsi' => 'Perawatan fasilitas dan infrastruktur wilayah.', 'level' => 'koordinator', 'urutan' => 3],
            ['jabatan' => 'Sosial & Kerohanian', 'nama' => 'Devina', 'deskripsi' => 'Kegiatan sosial, keagamaan, dan santunan.', 'level' => 'koordinator', 'urutan' => 4],
        ];

        foreach ($pengurus as $item) {
            Pengurus::updateOrCreate(
                ['jabatan' => $item['jabatan']],
                $item + [
                    'foto' => '/images/pengurus/' . $this->fotoFile($item['nama']),
                    'telp' => null,
                    'is_active' => true,
                ]
            );
        }
    }

    private function fotoFile(string $nama): string
    {
        return strtoupper(explode(' ', $nama)[0]) . '.png';
    }
}
