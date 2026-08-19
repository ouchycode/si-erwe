<?php

namespace App\Http\Requests;

trait HasImageValidation
{
    protected function imageField(): string
    {
        return 'image';
    }

    protected function imageFieldLabel(): string
    {
        return 'Gambar';
    }

    protected function imageMaxMb(): int
    {
        return 4;
    }

    public function messages(): array
    {
        $field = $this->imageField();
        $label = $this->imageFieldLabel();
        $mb = $this->imageMaxMb();

        return [
            "$field.required" => "Pilih $label yang akan diunggah.",
            "$field.image" => 'File yang diunggah harus berupa gambar.',
            "$field.mimes" => "Format $label harus JPEG, PNG, atau WebP.",
            "$field.max" => "Ukuran $label maksimal $mb MB.",
        ];
    }
}
