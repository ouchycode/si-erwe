<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pengurus', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('jabatan');
            $table->string('level')->default('koordinator');
            $table->string('deskripsi')->nullable();
            $table->string('foto')->nullable();
            $table->string('telp')->nullable();
            $table->unsignedInteger('urutan')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->index(['level', 'urutan']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pengurus');
    }
};
