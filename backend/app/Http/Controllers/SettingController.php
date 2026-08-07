<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateSettingRequest;
use App\Models\Setting;
use App\Support\Upload;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    public function index(): JsonResponse
    {
        $settings = Setting::orderBy('group')->get()->groupBy('group')->map(
            fn ($items) => $items->mapWithKeys(fn ($s) => [$s->key => $s->value])
        );

        return response()->json(['data' => $settings]);
    }

    public function store(UpdateSettingRequest $request): JsonResponse
    {
        $setting = Setting::updateOrCreate(
            ['group' => $request->group, 'key' => $request->key],
            ['value' => $request->value]
        );

        return response()->json([
            'message' => 'Pengaturan berhasil disimpan.',
            'data' => $setting,
        ], 201);
    }

    public function uploadImage(Request $request): JsonResponse
    {
        $request->validate([
            'image' => ['required', 'image', 'mimes:jpeg,png,jpg,webp', 'max:4096'],
        ]);

        $path = Upload::store($request->file('image'), 'settings');

        return response()->json([
            'message' => 'Gambar berhasil diunggah.',
            'data' => ['path' => $path],
        ], 201);
    }
}
