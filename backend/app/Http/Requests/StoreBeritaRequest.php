<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreBeritaRequest extends FormRequest
{
    use HasImageValidation;

    public function authorize(): bool
    {
        return true;
    }

    protected function imageField(): string
    {
        return 'gambar';
    }

    protected function imageMaxMb(): int
    {
        return 3;
    }

    public function rules(): array
    {
        return [
            'judul' => ['required', 'string', 'max:255'],
            'ringkasan' => ['nullable', 'string'],
            'konten' => ['nullable', 'string'],
            'kategori' => ['required', 'string', Rule::in(['Kegiatan', 'Kesehatan', 'Pengumuman', 'Lainnya'])],
            'gambar' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp', 'max:3072'],
            'author' => ['nullable', 'string', 'max:255'],
            'is_published' => ['sometimes', 'boolean'],
            'published_at' => ['nullable', 'date'],
        ];
    }
}
