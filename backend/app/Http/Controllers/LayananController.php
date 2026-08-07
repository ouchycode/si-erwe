<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\JsonResponse;

class LayananController extends Controller
{
    public function index(): JsonResponse
    {
        $kartu = Setting::where('group', 'layanan')->where('key', 'kartu')->value('value') ?? [];

        $data = collect($kartu)->map(fn ($item, $i) => [
            'id' => $i + 1,
            'nama' => $item['nama'] ?? '',
            'deskripsi' => $item['deskripsi'] ?? '',
            'slug' => $item['slug'] ?? '',
        ])->values();

        return response()->json(['data' => $data]);
    }
}
