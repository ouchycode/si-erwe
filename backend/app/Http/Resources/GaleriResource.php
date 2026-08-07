<?php

namespace App\Http\Resources;

use App\Support\Upload;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GaleriResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'category' => $this->category,
            'image' => Upload::url($this->image),
            'is_published' => (bool) $this->is_published,
            'sort_order' => $this->sort_order,
        ];
    }
}
