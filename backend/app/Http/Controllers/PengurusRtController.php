<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePengurusRtRequest;
use App\Http\Requests\UpdatePengurusRtRequest;
use App\Http\Resources\PengurusRtResource;
use App\Models\PengurusRt;
use App\Support\Upload;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PengurusRtController extends Controller
{
    public function index(): JsonResponse
    {
        $pengurus = PengurusRt::query()
            ->where('is_active', true)
            ->orderBy('rt_number')
            ->get();

        return response()->json(['data' => PengurusRtResource::collection($pengurus)]);
    }

    public function all(Request $request): JsonResponse
    {
        $query = PengurusRt::query();

        if ($request->filled('status')) {
            $query->where('is_active', $request->boolean('status'));
        }

        if ($request->filled('q')) {
            $query->where('nama', 'like', '%' . $request->q . '%')
                ->orWhere('rt_number', 'like', '%' . $request->q . '%');
        }

        $pengurus = $query->orderBy('rt_number')
            ->paginate($request->integer('per_page', 15))
            ->withQueryString();

        return PengurusRtResource::collection($pengurus)->response();
    }

    public function store(StorePengurusRtRequest $request): JsonResponse
    {
        $pengurus = PengurusRt::create([
            'rt_number' => $request->rt_number,
            'nama' => $request->nama,
            'blok' => $request->blok,
            'telp' => $request->telp,
            'foto' => Upload::store($request->file('foto'), 'pengurus'),
            'urutan' => $request->integer('urutan', 0),
            'is_active' => $request->boolean('is_active', true),
        ]);

        return response()->json([
            'message' => 'Ketua RT berhasil ditambahkan.',
            'data' => new PengurusRtResource($pengurus),
        ], 201);
    }

    public function update(UpdatePengurusRtRequest $request, PengurusRt $pengurusRt): JsonResponse
    {
        $data = $request->only(['rt_number', 'nama', 'blok', 'telp', 'urutan', 'is_active']);

        if ($request->hasFile('foto')) {
            $data['foto'] = Upload::store($request->file('foto'), 'pengurus');
        }

        $pengurusRt->update($data);

        return response()->json([
            'message' => 'Ketua RT berhasil diperbarui.',
            'data' => new PengurusRtResource($pengurusRt),
        ]);
    }

    public function destroy(PengurusRt $pengurusRt): JsonResponse
    {
        $pengurusRt->delete();

        return response()->json(['message' => 'Ketua RT berhasil dihapus.']);
    }
}
