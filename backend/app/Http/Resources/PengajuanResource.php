<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PengajuanResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'kode' => $this->kode,
            'nik' => $this->nik,
            'nama' => $this->nama,
            'jenis_layanan' => $this->jenis_layanan,
            'keperluan' => $this->keperluan,
            'status' => $this->status,
            'catatan' => $this->catatan,
            'is_read' => $this->is_read,
            'created_at' => $this->created_at?->toIso8601String(),
        ];
    }
}
