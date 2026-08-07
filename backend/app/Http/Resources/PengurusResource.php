<?php

namespace App\Http\Resources;

use App\Support\Upload;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PengurusResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nama' => $this->nama,
            'jabatan' => $this->jabatan,
            'level' => $this->level,
            'deskripsi' => $this->deskripsi,
            'foto' => Upload::url($this->foto),
            'telp' => $this->telp,
            'urutan' => $this->urutan,
            'is_active' => (bool) $this->is_active,
        ];
    }
}
