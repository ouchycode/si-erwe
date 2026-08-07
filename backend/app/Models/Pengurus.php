<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['nama', 'jabatan', 'level', 'deskripsi', 'foto', 'telp', 'urutan', 'is_active'])]
class Pengurus extends Model
{
    protected $table = 'pengurus';

    public const LEVEL = [
        'ketua',
        'inti',
        'koordinator',
    ];

    protected function casts(): array
    {
        return [
            'urutan' => 'integer',
            'is_active' => 'boolean',
        ];
    }
}
