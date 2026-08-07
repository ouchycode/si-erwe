<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreGaleriRequest;
use App\Http\Requests\UpdateGaleriRequest;
use App\Http\Resources\GaleriResource;
use App\Models\GaleriItem;
use App\Support\Upload;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GaleriController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = GaleriItem::query()->where('is_published', true);

        if ($request->filled('kategori')) {
            $query->where('category', $request->kategori);
        }

        $items = $query->orderBy('sort_order')
            ->paginate($request->integer('per_page', 30))
            ->withQueryString();

        return GaleriResource::collection($items)->response();
    }

    public function all(Request $request): JsonResponse
    {
        $query = GaleriItem::query();

        if ($request->filled('status')) {
            $query->where('is_published', $request->boolean('status'));
        }

        if ($request->filled('q')) {
            $query->where('title', 'like', '%' . $request->q . '%');
        }

        if ($request->filled('kategori')) {
            $query->where('category', $request->kategori);
        }

        $items = $query->orderByDesc('id')
            ->paginate($request->integer('per_page', 15))
            ->withQueryString();

        return GaleriResource::collection($items)->response();
    }

    public function store(StoreGaleriRequest $request): JsonResponse
    {
        $item = GaleriItem::create([
            'title' => $request->title,
            'category' => $request->category,
            'image' => Upload::store($request->file('image'), 'galeri'),
            'is_published' => $request->boolean('is_published', true),
            'sort_order' => $request->integer('sort_order', 0),
        ]);

        return response()->json([
            'message' => 'Foto galeri berhasil ditambahkan.',
            'data' => new GaleriResource($item),
        ], 201);
    }

    public function update(UpdateGaleriRequest $request, GaleriItem $galeri): JsonResponse
    {
        $data = $request->only(['title', 'category', 'is_published', 'sort_order']);

        if ($request->hasFile('image')) {
            $data['image'] = Upload::store($request->file('image'), 'galeri');
        }

        $galeri->update($data);

        return response()->json([
            'message' => 'Foto galeri berhasil diperbarui.',
            'data' => new GaleriResource($galeri),
        ]);
    }

    public function destroy(GaleriItem $galeri): JsonResponse
    {
        $galeri->delete();

        return response()->json(['message' => 'Foto galeri berhasil dihapus.']);
    }
}
