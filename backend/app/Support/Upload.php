<?php

namespace App\Support;

use Illuminate\Http\UploadedFile;

class Upload
{
    public static function store(?UploadedFile $file, string $dir = 'images'): ?string
    {
        if (! $file) {
            return null;
        }

        $path = $file->store($dir, 'public');

        return $path ? '/storage/' . $path : null;
    }

    public static function url(?string $path): ?string
    {
        if (! $path) {
            return null;
        }

        if (filter_var($path, FILTER_VALIDATE_URL)) {
            return $path;
        }

        if (str_starts_with($path, 'http')) {
            return $path;
        }

        return $path;
    }
}
