<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['nama', 'kontak', 'kategori', 'pesan', 'is_read'])]
class Pesan extends Model
{
    protected $table = 'pesan';

    public const KATEGORI = [
        'pertanyaan',
        'laporan',
        'saran',
        'lainnya',
    ];

    protected function casts(): array
    {
        return [
            'is_read' => 'boolean',
        ];
    }
}
