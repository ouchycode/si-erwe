<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdatePengurusRtRequest extends FormRequest
{
    use HasImageValidation;

    public function authorize(): bool
    {
        return true;
    }

    protected function imageField(): string
    {
        return 'foto';
    }

    protected function imageFieldLabel(): string
    {
        return 'Foto';
    }

    protected function imageMaxMb(): int
    {
        return 3;
    }

    public function rules(): array
    {
        return [
            'rt_number' => [
                'sometimes',
                'string',
                'max:3',
                Rule::unique('pengurus_rt', 'rt_number')->ignore($this->route('pengurusRt')),
            ],
            'nama' => ['sometimes', 'string', 'max:255'],
            'blok' => ['nullable', 'string', 'max:100'],
            'telp' => ['nullable', 'string', 'max:30'],
            'foto' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp', 'max:3072'],
            'urutan' => ['sometimes', 'integer'],
            'is_active' => ['sometimes', 'boolean'],
        ];
    }
}
