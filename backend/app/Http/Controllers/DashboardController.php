<?php

namespace App\Http\Controllers;

use App\Http\Resources\PesanResource;
use App\Http\Resources\PengajuanResource;
use App\Models\Berita;
use App\Models\GaleriItem;
use App\Models\Pesan;
use App\Models\Pengajuan;
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
                'pengajuan' => Pengajuan::count(),
                'pesan' => Pesan::count(),
                'recent_pengajuan' => PengajuanResource::collection(
                    Pengajuan::orderByDesc('id')->limit(5)->get()
                ),
                'recent_pesan' => PesanResource::collection(
                    Pesan::orderByDesc('id')->limit(5)->get()
                ),
            ],
        ]);
    }
}
