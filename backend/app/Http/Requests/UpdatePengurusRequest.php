<?php

namespace App\Http\Requests;

use App\Models\Pengurus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdatePengurusRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nama' => ['sometimes', 'string', 'max:255'],
            'jabatan' => ['sometimes', 'string', 'max:255'],
            'level' => ['sometimes', 'string', Rule::in(Pengurus::LEVEL)],
            'deskripsi' => ['nullable', 'string', 'max:500'],
            'foto' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp', 'max:3072'],
            'telp' => ['nullable', 'string', 'max:30'],
            'urutan' => ['sometimes', 'integer'],
            'is_active' => ['sometimes', 'boolean'],
        ];
    }
}
