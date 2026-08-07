<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateBeritaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'judul' => ['sometimes', 'string', 'max:255'],
            'ringkasan' => ['nullable', 'string'],
            'konten' => ['nullable', 'string'],
            'kategori' => ['sometimes', 'string', Rule::in(['Kegiatan', 'Kesehatan', 'Pengumuman', 'Lainnya'])],
            'gambar' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp', 'max:3072'],
            'author' => ['nullable', 'string', 'max:255'],
            'is_published' => ['sometimes', 'boolean'],
            'published_at' => ['nullable', 'date'],
        ];
    }
}
