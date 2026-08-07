<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBeritaRequest;
use App\Http\Requests\UpdateBeritaRequest;
use App\Http\Resources\BeritaResource;
use App\Models\Berita;
use App\Support\Upload;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class BeritaController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Berita::query()->published();

        if ($request->filled('kategori')) {
            $query->where('kategori', $request->kategori);
        }

        if ($request->filled('q')) {
            $query->where('judul', 'like', '%' . $request->q . '%');
        }

        $berita = $query->orderByDesc('published_at')
            ->paginate($request->integer('per_page', 9))
            ->withQueryString();

        return BeritaResource::collection($berita)->response();
    }

    public function show(string $slug): JsonResponse
    {
        $berita = Berita::query()->published()->where('slug', $slug)->firstOrFail();
        $berita->increment('views');

        return response()->json([
            'data' => new BeritaResource($berita),
        ]);
    }

    public function store(StoreBeritaRequest $request): JsonResponse
    {
        $data = $request->only(['judul', 'ringkasan', 'konten', 'kategori', 'author', 'is_published']);

        $data['slug'] = Str::slug($request->judul) . '-' . Str::lower(Str::random(6));
        $data['published_at'] = $request->boolean('is_published') ? now() : ($request->input('published_at') ?: null);
        $data['gambar'] = Upload::store($request->file('gambar'), 'berita');

        $berita = Berita::create($data);

        return response()->json(['message' => 'Berita berhasil dibuat.', 'data' => new BeritaResource($berita)], 201);
    }

    public function update(UpdateBeritaRequest $request, Berita $berita): JsonResponse
    {
        $data = $request->only(['judul', 'ringkasan', 'konten', 'kategori', 'author', 'is_published']);

        if ($request->filled('judul') && $request->judul !== $berita->judul) {
            $data['slug'] = Str::slug($request->judul) . '-' . Str::lower(Str::random(6));
        }

        if ($request->has('is_published')) {
            $data['published_at'] = $request->boolean('is_published')
                ? ($berita->published_at ?: now())
                : null;
        }

        if ($request->hasFile('gambar')) {
            $data['gambar'] = Upload::store($request->file('gambar'), 'berita');
        }

        $berita->update($data);

        return response()->json(['message' => 'Berita berhasil diperbarui.', 'data' => new BeritaResource($berita)]);
    }

    public function destroy(Berita $berita): JsonResponse
    {
        $berita->delete();

        return response()->json(['message' => 'Berita berhasil dihapus.']);
    }

    public function all(Request $request): JsonResponse
    {
        $query = Berita::query();

        if ($request->filled('status')) {
            $query->where('is_published', $request->boolean('status'));
        }

        if ($request->filled('q')) {
            $query->where('judul', 'like', '%' . $request->q . '%');
        }

        $berita = $query->orderByDesc('id')
            ->paginate($request->integer('per_page', 15))
            ->withQueryString();

        return BeritaResource::collection($berita)->response();
    }
}
