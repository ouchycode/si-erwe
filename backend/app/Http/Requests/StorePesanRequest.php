<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StorePesanRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nama' => ['required', 'string', 'max:255'],
            'kontak' => ['required', 'string', 'max:255'],
            'kategori' => ['required', 'string', Rule::in(['pertanyaan', 'laporan', 'saran', 'lainnya'])],
            'pesan' => ['required', 'string', 'max:2000'],
        ];
    }
}
