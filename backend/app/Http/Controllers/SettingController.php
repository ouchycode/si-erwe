<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateSettingRequest;
use App\Models\Setting;
use App\Support\Upload;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class SettingController extends Controller
{
    public function index(): JsonResponse
    {
        $settings = Cache::store('file')->remember('settings.all', 300, function () {
            return Setting::orderBy('group')->get()
                ->groupBy('group')
                ->mapWithKeys(function ($items, $group) {
                    return [$group => $items->pluck('value', 'key')->toArray()];
                })
                ->toArray();
        });

        return response()->json(['data' => $settings]);
    }

    public function store(UpdateSettingRequest $request): JsonResponse
    {
        $setting = Setting::updateOrCreate(
            ['group' => $request->group, 'key' => $request->key],
            ['value' => $request->value]
        );

        Cache::store('file')->forget('settings.all');

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
