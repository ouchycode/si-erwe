<?php

namespace App\Http\Controllers;

use App\Http\Resources\PesanResource;
use App\Models\Berita;
use App\Models\GaleriItem;
use App\Models\Pesan;
use App\Models\Pengurus;
use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    public function summary(): JsonResponse
    {
        return response()->json([
            'data' => [
                'berita' => Berita::count(),
                'galeri' => GaleriItem::count(),
                'pengurus' => Pengurus::count(),
                'pesan' => Pesan::count(),
                'recent_pesan' => PesanResource::collection(
                    Pesan::orderByDesc('id')->limit(5)->get()
                ),
            ],
        ]);
    }
}
