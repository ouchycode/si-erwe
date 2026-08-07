<?php

namespace Database\Seeders;

use App\Models\PengurusRt;
use Illuminate\Database\Seeder;

class PengurusRtSeeder extends Seeder
{
    public function run(): void
    {
        $rt = [
            ['rt_number' => '01', 'nama' => 'Ajib', 'blok' => 'Blok A', 'telp' => '0812-9000-0001'],
            ['rt_number' => '02', 'nama' => 'Anisa', 'blok' => 'Blok B', 'telp' => '0812-9000-0002'],
            ['rt_number' => '03', 'nama' => 'Arthadena', 'blok' => 'Blok C', 'telp' => '0812-9000-0003'],
            ['rt_number' => '04', 'nama' => 'Giska', 'blok' => 'Blok D', 'telp' => '0812-9000-0004'],
            ['rt_number' => '05', 'nama' => 'Muhammad Lutfhi Nabhan', 'blok' => 'Blok E', 'telp' => '0812-9000-0005'],
            ['rt_number' => '06', 'nama' => 'Putri', 'blok' => 'Blok F', 'telp' => '0812-9000-0006'],
            ['rt_number' => '07', 'nama' => 'Adin', 'blok' => 'Blok G', 'telp' => '0812-9000-0007'],
            ['rt_number' => '08', 'nama' => 'Tiara', 'blok' => 'Blok H', 'telp' => '0812-9000-0008'],
        ];

        foreach ($rt as $i => $item) {
            PengurusRt::updateOrCreate(
                ['rt_number' => $item['rt_number']],
                $item + [
                    'foto' => '/images/pengurus/' . str_replace(' ', '%20', strtoupper($item['nama'])) . '.png',
                    'urutan' => $i + 1,
                    'is_active' => true,
                ]
            );
        }
    }
}
