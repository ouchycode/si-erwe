<?php

namespace App\Http\Resources;

use App\Support\Upload;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BeritaResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $detail = $request->routeIs('api.berita.show');

        return [
            'id' => $this->id,
            'judul' => $this->judul,
            'slug' => $this->slug,
            'ringkasan' => $this->ringkasan,
            'kategori' => $this->kategori,
            'gambar' => Upload::url($this->gambar),
            'author' => $this->author,
            'tanggal' => $this->published_at?->translatedFormat('j F Y'),
            'views' => $this->views,
            ...($detail ? ['konten' => $this->konten] : []),
        ];
    }
}
