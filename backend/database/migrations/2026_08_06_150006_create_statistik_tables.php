<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('statistik_cat', function (Blueprint $table) {
            $table->id();
            $table->string('nama')->unique();
            $table->json('columns');
            $table->string('chart_title')->nullable();
            $table->json('chart_colors')->nullable();
            $table->unsignedInteger('urutan')->default(0);
            $table->timestamps();
        });

        Schema::create('statistik_data', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained('statistik_cat')->cascadeOnDelete();
            $table->string('rt', 3);
            $table->string('periode', 7);
            $table->json('values');
            $table->timestamps();

            $table->unique(['category_id', 'rt', 'periode']);
            $table->index('periode');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('statistik_data');
        Schema::dropIfExists('statistik_cat');
    }
};
