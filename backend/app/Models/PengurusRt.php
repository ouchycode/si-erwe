<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['rt_number', 'nama', 'blok', 'telp', 'foto', 'urutan', 'is_active'])]
class PengurusRt extends Model
{
    protected $table = 'pengurus_rt';

    protected function casts(): array
    {
        return [
            'urutan' => 'integer',
            'is_active' => 'boolean',
        ];
    }
}
