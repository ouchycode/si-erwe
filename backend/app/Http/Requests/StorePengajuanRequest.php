<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StorePengajuanRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nik' => ['required', 'string', 'digits:16'],
            'nama' => ['required', 'string', 'max:255'],
            'jenis_layanan' => ['required', 'string', Rule::in(['surat-pengantar', 'surat-domisili', 'ktp-kk-baru', 'lainnya'])],
            'keperluan' => ['required', 'string', 'max:1000'],
        ];
    }
}
