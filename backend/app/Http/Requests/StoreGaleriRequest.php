<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreGaleriRequest extends FormRequest
{
    use HasImageValidation;

    public function authorize(): bool
    {
        return true;
    }

    protected function imageMaxMb(): int
    {
        return 5;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'category' => ['required', 'string', 'max:100'],
            'image' => ['required', 'image', 'mimes:jpeg,png,jpg,webp', 'max:5120'],
            'is_published' => ['sometimes', 'boolean'],
            'sort_order' => ['sometimes', 'integer'],
        ];
    }
}
