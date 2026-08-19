<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        $alamat = [
            'tempat' => 'Gedung Serbaguna RW 004',
            'jalan' => 'Jl. Darma Bakti No.64, RT.001/RW.005',
            'kelurahan' => 'Pabuaran',
            'kecamatan' => 'Karawaci',
            'kota' => 'Kota Tangerang',
            'provinsi' => 'Banten',
            'kodePos' => '15114',
            'full' => 'Gedung Serbaguna RW 004, Jl. Darma Bakti No.64, RT.001/RW.005, Pabuaran, Kec. Karawaci, Kota Tangerang, Banten 15114',
            'singkat' => 'Sekretariat RW 004 Pabuaran, Karawaci, Kota Tangerang',
        ];

        DB::table('settings')
            ->where('group', 'alamat')
            ->where('key', 'sekretariat')
            ->update(['value' => json_encode($alamat)]);
    }

    public function down(): void
    {
        //
    }
};