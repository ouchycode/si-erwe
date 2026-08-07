<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['category_id', 'rt', 'periode', 'values'])]
class StatistikData extends Model
{
    protected $table = 'statistik_data';

    protected function casts(): array
    {
        return [
            'values' => 'array',
        ];
    }

    public function category()
    {
        return $this->belongsTo(StatistikCat::class, 'category_id');
    }
}
