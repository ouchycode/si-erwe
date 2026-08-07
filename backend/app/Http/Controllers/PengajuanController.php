<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePengajuanRequest;
use App\Http\Requests\UpdatePengajuanRequest;
use App\Http\Resources\PengajuanResource;
use App\Models\Pengajuan;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PengajuanController extends Controller
{
    public function store(StorePengajuanRequest $request): JsonResponse
    {
        $pengajuan = Pengajuan::create([
            'kode' => 'PRW-' . strtoupper(now()->format('ymd')) . '-' . strtoupper(Str::random(5)),
            'nik' => $request->nik,
            'nama' => $request->nama,
            'jenis_layanan' => $request->jenis_layanan,
            'keperluan' => $request->keperluan,
            'status' => 'menunggu',
        ]);

        return response()->json([
            'message' => 'Pengajuan berhasil dikirim. Simpan kode untuk melacak status.',
            'data' => new PengajuanResource($pengajuan),
        ], 201);
    }

    public function show(string $kode): JsonResponse
    {
        $pengajuan = Pengajuan::where('kode', $kode)->firstOrFail();

        return response()->json(['data' => new PengajuanResource($pengajuan)]);
    }

    public function index(Request $request): JsonResponse
    {
        $query = Pengajuan::query();

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('q')) {
            $query->where(function ($q) use ($request) {
                $q->where('nama', 'like', '%' . $request->q . '%')
                    ->orWhere('nik', 'like', '%' . $request->q . '%')
                    ->orWhere('kode', 'like', '%' . $request->q . '%');
            });
        }

        $list = $query->orderByDesc('id')
            ->paginate($request->integer('per_page', 15))
            ->withQueryString();

        return PengajuanResource::collection($list)->response();
    }

    public function update(UpdatePengajuanRequest $request, Pengajuan $pengajuan): JsonResponse
    {
        $pengajuan->update([
            'status' => $request->status,
            'catatan' => $request->catatan,
        ]);

        return response()->json([
            'message' => 'Status pengajuan diperbarui.',
            'data' => new PengajuanResource($pengajuan),
        ]);
    }

    public function markRead(Pengajuan $pengajuan): JsonResponse
    {
        $pengajuan->update(['is_read' => true]);

        return response()->json(['message' => 'Pengajuan ditandai sudah dibaca.']);
    }
}
