<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['nama', 'columns', 'chart_title', 'urutan'])]
class StatistikCat extends Model
{
    protected $table = 'statistik_cat';

    protected function casts(): array
    {
        return [
            'columns' => 'array',
            'chart_colors' => 'array',
            'urutan' => 'integer',
        ];
    }

    public function data()
    {
        return $this->hasMany(StatistikData::class, 'category_id');
    }
}
