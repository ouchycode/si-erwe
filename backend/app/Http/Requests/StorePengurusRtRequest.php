<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePengurusRtRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'rt_number' => ['required', 'string', 'max:3'],
            'nama' => ['required', 'string', 'max:255'],
            'blok' => ['nullable', 'string', 'max:100'],
            'telp' => ['nullable', 'string', 'max:30'],
            'foto' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp', 'max:3072'],
            'urutan' => ['sometimes', 'integer'],
            'is_active' => ['sometimes', 'boolean'],
        ];
    }
}
