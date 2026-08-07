<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePesanRequest;
use App\Http\Resources\PesanResource;
use App\Models\Pesan;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PesanController extends Controller
{
    public function store(StorePesanRequest $request): JsonResponse
    {
        $pesan = Pesan::create($request->only(['nama', 'kontak', 'kategori', 'pesan']));

        return response()->json([
            'message' => 'Pesan berhasil terkirim. Terima kasih atas masukannya.',
            'data' => new PesanResource($pesan),
        ], 201);
    }

    public function index(Request $request): JsonResponse
    {
        $query = Pesan::query();

        if ($request->filled('status')) {
            $query->where('is_read', $request->boolean('status'));
        }

        if ($request->filled('kategori')) {
            $query->where('kategori', $request->kategori);
        }

        $list = $query->orderByDesc('id')
            ->paginate($request->integer('per_page', 15))
            ->withQueryString();

        return PesanResource::collection($list)->response();
    }

    public function markRead(Pesan $pesan): JsonResponse
    {
        $pesan->update(['is_read' => true]);

        return response()->json(['message' => 'Pesan ditandai sudah dibaca.']);
    }

    public function destroy(Pesan $pesan): JsonResponse
    {
        $pesan->delete();

        return response()->json(['message' => 'Pesan berhasil dihapus.']);
    }
}
