<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreStatistikDataRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'category_id' => ['required', 'integer', 'exists:statistik_cat,id'],
            'rt' => ['required', 'string', 'max:3'],
            'periode' => ['required', 'date_format:Y-m'],
            'values' => ['required', 'array'],
            'values.*' => ['integer', 'min:0'],
        ];
    }
}
