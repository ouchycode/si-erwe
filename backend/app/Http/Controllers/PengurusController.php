<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePengurusRequest;
use App\Http\Requests\UpdatePengurusRequest;
use App\Http\Resources\PengurusResource;
use App\Models\Pengurus;
use App\Support\Upload;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PengurusController extends Controller
{
    public function index(): JsonResponse
    {
        $pengurus = Pengurus::query()
            ->where('is_active', true)
            ->orderByRaw("FIELD(level, 'ketua', 'inti', 'koordinator')")
            ->orderBy('urutan')
            ->get();

        return response()->json(['data' => PengurusResource::collection($pengurus)]);
    }

    public function all(Request $request): JsonResponse
    {
        $query = Pengurus::query();

        if ($request->filled('status')) {
            $query->where('is_active', $request->boolean('status'));
        }

        if ($request->filled('q')) {
            $query->where('nama', 'like', '%' . $request->q . '%');
        }

        $pengurus = $query->orderByRaw("FIELD(level, 'ketua', 'inti', 'koordinator')")
            ->orderBy('urutan')
            ->paginate($request->integer('per_page', 15))
            ->withQueryString();

        return PengurusResource::collection($pengurus)->response();
    }

    public function store(StorePengurusRequest $request): JsonResponse
    {
        $pengurus = Pengurus::create([
            'nama' => $request->nama,
            'jabatan' => $request->jabatan,
            'level' => $request->level,
            'deskripsi' => $request->deskripsi,
            'foto' => Upload::store($request->file('foto'), 'pengurus'),
            'telp' => $request->telp,
            'urutan' => $request->integer('urutan', 0),
            'is_active' => $request->boolean('is_active', true),
        ]);

        return response()->json([
            'message' => 'Pengurus berhasil ditambahkan.',
            'data' => new PengurusResource($pengurus),
        ], 201);
    }

    public function update(UpdatePengurusRequest $request, Pengurus $pengurus): JsonResponse
    {
        $data = $request->only(['nama', 'jabatan', 'level', 'deskripsi', 'telp', 'urutan', 'is_active']);

        if ($request->hasFile('foto')) {
            $data['foto'] = Upload::store($request->file('foto'), 'pengurus');
        }

        $pengurus->update($data);

        return response()->json([
            'message' => 'Pengurus berhasil diperbarui.',
            'data' => new PengurusResource($pengurus),
        ]);
    }

    public function destroy(Pengurus $pengurus): JsonResponse
    {
        $pengurus->delete();

        return response()->json(['message' => 'Pengurus berhasil dihapus.']);
    }
}
