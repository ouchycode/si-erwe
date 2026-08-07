<?php

namespace Database\Seeders;

use App\Models\StatistikCat;
use App\Models\StatistikData;
use Illuminate\Database\Seeder;

class StatistikSeeder extends Seeder
{
    private function seededRandom(int $seed): float
    {
        $x = sin($seed * 9301 + 49297) * 49297;

        return $x - floor($x);
    }

    private function generateValues(array $config, int $rtIndex, int $categorySeed): array
    {
        $values = [];
        $keyIndex = 0;

        foreach ($config as $key => [$min, $max]) {
            $seed = $categorySeed * 100 + $rtIndex * 10 + $keyIndex;
            $values[$key] = intval(floor($this->seededRandom($seed) * ($max - $min + 1)) + $min);
            $keyIndex++;
        }

        return $values;
    }

    public function run(): void
    {
        $categories = [
            ['nama' => 'Penduduk', 'chart_title' => 'Berdasarkan Jenis Kelamin', 'chart_colors' => ['#3b82f6', '#ec4899'], 'columns' => [
                ['key' => 'jumlah', 'label' => 'TOTAL'],
                ['key' => 'lakiLaki', 'label' => 'LAKI-LAKI'],
                ['key' => 'perempuan', 'label' => 'PEREMPUAN'],
            ], 'config' => ['lakiLaki' => [50, 100], 'perempuan' => [50, 105]], 'seed' => 2],
            ['nama' => 'Status Penduduk', 'chart_title' => 'Status Kependudukan', 'chart_colors' => ['#10b981', '#f59e0b'], 'columns' => [
                ['key' => 'jumlah', 'label' => 'TOTAL'],
                ['key' => 'wargaAsli', 'label' => 'WARGA ASLI'],
                ['key' => 'pendatang', 'label' => 'PENDATANG'],
            ], 'config' => ['wargaAsli' => [70, 160], 'pendatang' => [10, 40]], 'seed' => 7],
            ['nama' => 'Mutasi Penduduk', 'chart_title' => 'Lahir & Meninggal', 'chart_colors' => ['#3b82f6', '#ef4444'], 'columns' => [
                ['key' => 'jumlah', 'label' => 'TOTAL MUTASI'],
                ['key' => 'lahir', 'label' => 'KELAHIRAN'],
                ['key' => 'meninggal', 'label' => 'KEMATIAN'],
            ], 'config' => ['lahir' => [0, 6], 'meninggal' => [0, 3]], 'seed' => 8],
            ['nama' => 'Kelompok Usia', 'chart_title' => 'Komposisi Usia', 'chart_colors' => ['#10b981', '#f59e0b', '#3b82f6', '#6366f1'], 'columns' => [
                ['key' => 'balita', 'label' => 'BALITA'],
                ['key' => 'remaja', 'label' => 'REMAJA'],
                ['key' => 'dewasa', 'label' => 'DEWASA'],
                ['key' => 'lansia', 'label' => 'LANSIA'],
            ], 'config' => ['balita' => [10, 25], 'remaja' => [20, 40], 'dewasa' => [60, 120], 'lansia' => [15, 30]], 'seed' => 3],
            ['nama' => 'Agama', 'chart_title' => 'Penganut Agama', 'chart_colors' => ['#10b981', '#3b82f6', '#6366f1', '#f59e0b', '#ef4444'], 'columns' => [
                ['key' => 'islam', 'label' => 'ISLAM'],
                ['key' => 'kristen', 'label' => 'KRISTEN'],
                ['key' => 'katolik', 'label' => 'KATOLIK'],
                ['key' => 'hindu', 'label' => 'HINDU'],
                ['key' => 'buddha', 'label' => 'BUDDHA'],
            ], 'config' => ['islam' => [80, 150], 'kristen' => [10, 30], 'katolik' => [5, 20], 'hindu' => [0, 5], 'buddha' => [0, 5]], 'seed' => 4],
            ['nama' => 'Pendidikan', 'chart_title' => 'Tingkat Pendidikan', 'chart_colors' => ['#ef4444', '#f59e0b', '#10b981', '#3b82f6'], 'columns' => [
                ['key' => 'sd', 'label' => 'SD/SEDERAJAT'],
                ['key' => 'smp', 'label' => 'SMP/SEDERAJAT'],
                ['key' => 'sma', 'label' => 'SMA/SEDERAJAT'],
                ['key' => 'sarjana', 'label' => 'D3/S1/S2'],
            ], 'config' => ['sd' => [10, 30], 'smp' => [15, 35], 'sma' => [40, 80], 'sarjana' => [20, 50]], 'seed' => 5],
        ];

        $periode = now()->format('Y-m');

        foreach ($categories as $catIndex => $cat) {
            $category = StatistikCat::updateOrCreate(
                ['nama' => $cat['nama']],
                [
                    'columns' => $cat['columns'],
                    'chart_title' => $cat['chart_title'],
                    'chart_colors' => $cat['chart_colors'],
                    'urutan' => $catIndex + 1,
                ]
            );

            for ($i = 1; $i <= 8; $i++) {
                $values = $this->generateValues($cat['config'], $i, $cat['seed']);
                $hasJumlah = collect($cat['columns'])->contains('key', 'jumlah');
                if ($hasJumlah) {
                    $values['jumlah'] = array_sum($values);
                }

                StatistikData::updateOrCreate(
                    ['category_id' => $category->id, 'rt' => str_pad((string) $i, 3, '0', STR_PAD_LEFT), 'periode' => $periode],
                    ['values' => $values]
                );
            }
        }
    }
}
