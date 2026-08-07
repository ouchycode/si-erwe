<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pengajuan', function (Blueprint $table) {
            $table->id();
            $table->string('kode')->unique();
            $table->string('nik', 16);
            $table->string('nama');
            $table->string('jenis_layanan');
            $table->text('keperluan');
            $table->string('status')->default('menunggu');
            $table->text('catatan')->nullable();
            $table->boolean('is_read')->default(false);
            $table->timestamps();

            $table->index(['status', 'created_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pengajuan');
    }
};
