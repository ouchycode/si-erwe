<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BeritaController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\GaleriController;
use App\Http\Controllers\LayananController;
use App\Http\Controllers\PengurusController;
use App\Http\Controllers\PengurusRtController;
use App\Http\Controllers\PesanController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\StatistikController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login'])->middleware('throttle:5,1');
    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
    Route::get('/me', [AuthController::class, 'me'])->middleware('auth:sanctum');
});

Route::get('/docs', function () {
    return view('api-docs');
})->name('api.docs');

Route::get('/docs/spec', function () {
    return response(file_get_contents(base_path('resources/docs/openapi.yaml')), 200, [
        'Content-Type' => 'application/yaml; charset=utf-8',
    ]);
})->name('api.docs.spec');

Route::middleware('throttle:api')->group(function () {
    Route::get('/berita', [BeritaController::class, 'index'])->name('api.berita.index');
    Route::get('/berita/{slug}', [BeritaController::class, 'show'])->name('api.berita.show');

    Route::get('/galeri', [GaleriController::class, 'index']);
    Route::get('/pengurus', [PengurusController::class, 'index']);
    Route::get('/pengurus-rt', [PengurusRtController::class, 'index']);
    Route::get('/layanan', [LayananController::class, 'index']);
    Route::get('/statistik', [StatistikController::class, 'index']);
    Route::get('/settings', [SettingController::class, 'index']);

    Route::post('/pesan', [PesanController::class, 'store'])->middleware('throttle:10,1');
});

Route::prefix('admin')->middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'summary']);
    Route::get('/berita', [BeritaController::class, 'all']);
    Route::post('/berita', [BeritaController::class, 'store']);
    Route::put('/berita/{berita}', [BeritaController::class, 'update']);
    Route::delete('/berita/{berita}', [BeritaController::class, 'destroy']);

    Route::get('/galeri', [GaleriController::class, 'all']);
    Route::post('/galeri', [GaleriController::class, 'store']);
    Route::put('/galeri/{galeri}', [GaleriController::class, 'update']);
    Route::delete('/galeri/{galeri}', [GaleriController::class, 'destroy']);

    Route::get('/pengurus', [PengurusController::class, 'all']);
    Route::post('/pengurus', [PengurusController::class, 'store']);
    Route::put('/pengurus/{pengurus}', [PengurusController::class, 'update']);
    Route::delete('/pengurus/{pengurus}', [PengurusController::class, 'destroy']);

    Route::get('/pengurus-rt', [PengurusRtController::class, 'all']);
    Route::post('/pengurus-rt', [PengurusRtController::class, 'store']);
    Route::put('/pengurus-rt/{pengurusRt}', [PengurusRtController::class, 'update']);
    Route::delete('/pengurus-rt/{pengurusRt}', [PengurusRtController::class, 'destroy']);

    Route::get('/statistik', [StatistikController::class, 'index']);
    Route::post('/statistik', [StatistikController::class, 'store']);
    Route::delete('/statistik/{statistikDatum}', [StatistikController::class, 'destroy']);

    Route::get('/pesan', [PesanController::class, 'index']);
    Route::put('/pesan/{pesan}/read', [PesanController::class, 'markRead']);
    Route::delete('/pesan/{pesan}', [PesanController::class, 'destroy']);

    Route::get('/settings', [SettingController::class, 'index']);
    Route::post('/settings', [SettingController::class, 'store']);
    Route::post('/settings/upload', [SettingController::class, 'uploadImage']);
});
