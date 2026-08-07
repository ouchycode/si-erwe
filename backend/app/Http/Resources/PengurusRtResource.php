<?php

namespace App\Http\Resources;

use App\Support\Upload;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PengurusRtResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'rt' => $this->rt_number,
            'ketua' => $this->nama,
            'lokasi' => $this->blok,
            'telp' => $this->telp,
            'foto' => Upload::url($this->foto),
            'urutan' => $this->urutan,
            'is_active' => (bool) $this->is_active,
        ];
    }
}
