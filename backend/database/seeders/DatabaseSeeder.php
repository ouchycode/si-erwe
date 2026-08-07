<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            AdminSeeder::class,
            BeritaSeeder::class,
            PengurusSeeder::class,
            PengurusRtSeeder::class,
            GaleriSeeder::class,
            StatistikSeeder::class,
            SettingSeeder::class,
        ]);
    }
}
