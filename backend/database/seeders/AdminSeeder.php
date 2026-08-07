<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'd'],
            [
                'name' => 'Sekretariat RW 04',
                'username' => 'admin',
                'password' => 'admin123',
                'role' => 'admin',
                'active' => true,
            ]
        );

        User::updateOrCreate(
            ['email' => 'editor@rw04pabuaran.id'],
            [
                'name' => 'Editor Konten',
                'username' => 'editor',
                'password' => 'editor123',
                'role' => 'editor',
                'active' => true,
            ]
        );
    }
}
