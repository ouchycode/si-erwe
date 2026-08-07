<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['kode', 'nik', 'nama', 'jenis_layanan', 'keperluan', 'status', 'catatan', 'is_read'])]
class Pengajuan extends Model
{
    protected $table = 'pengajuan';

    public const STATUS = [
        'menunggu',
        'diproses',
        'selesai',
        'ditolak',
    ];

    protected function casts(): array
    {
        return [
            'is_read' => 'boolean',
        ];
    }
}
