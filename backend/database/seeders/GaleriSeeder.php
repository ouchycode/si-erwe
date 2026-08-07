<?php

namespace Database\Seeders;

use App\Models\GaleriItem;
use Illuminate\Database\Seeder;

class GaleriSeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            ['title' => 'Kerja Bakti Membersihkan Selokan', 'category' => 'Lingkungan', 'image' => 'https://images.unsplash.com/photo-1596423735880-5f2a689b903e?q=80&w=800&auto=format&fit=crop'],
            ['title' => 'Rapat Pengurus RW', 'category' => 'Administrasi', 'image' => 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800&auto=format&fit=crop'],
            ['title' => 'Lomba 17 Agustus', 'category' => 'Acara', 'image' => 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop'],
            ['title' => 'Bazaar Warga', 'category' => 'Acara', 'image' => 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=800&auto=format&fit=crop'],
            ['title' => 'Posyandu Balita', 'category' => 'Kesehatan', 'image' => 'https://images.unsplash.com/photo-1603513492128-ba7bc9b3e143?q=80&w=800&auto=format&fit=crop'],
            ['title' => 'Siskamling Malam', 'category' => 'Keamanan', 'image' => 'https://images.unsplash.com/photo-1599839619722-39751411ea63?q=80&w=800&auto=format&fit=crop'],
            ['title' => 'Penyuluhan Kesehatan', 'category' => 'Kesehatan', 'image' => 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=800&auto=format&fit=crop'],
            ['title' => 'Rapat Karang Taruna', 'category' => 'Pemuda', 'image' => 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800&auto=format&fit=crop'],
            ['title' => 'Penanaman Pohon', 'category' => 'Lingkungan', 'image' => 'https://images.unsplash.com/photo-1526399232581-2ab5608b6336?q=80&w=800&auto=format&fit=crop'],
        ];

        foreach ($items as $i => $item) {
            GaleriItem::updateOrCreate(
                ['title' => $item['title']],
                $item + [
                    'is_published' => true,
                    'sort_order' => $i + 1,
                ]
            );
        }
    }
}
