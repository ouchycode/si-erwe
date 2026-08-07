# Backend API — Sistem Informasi RW 04 Pabuaran

REST API untuk website Sekretariat RW 04 Pabuaran (frontend Next.js di `../`).

- **Stack:** Laravel 13, PHP 8.3, MySQL, Sanctum (token auth)
- **Format:** JSON — semua endpoint publik & admin

## Setup

```bash
composer install
cp .env.example .env          # isi DB_DATABASE, DB_USERNAME, DB_PASSWORD
php artisan key:generate
php artisan migrate --seed     # seed: admin, berita, pengurus, galeri, statistik, settings
php artisan storage:link       # akses file upload
php artisan serve
```

Akses API di `http://127.0.0.1:8000/api`.

> Gambar seed (`/images/...`) dicopy dari `../public/images` — salin ulang jika folder `backend/public/images` tidak ada.

### Akun Default (seeder)

| Email | Password | Role |
|---|---|---|
| `admin@rw04pabuaran.id` | `admin123` | admin |
| `editor@rw04pabuaran.id` | `editor123` | editor (hanya bisa login) |

## Autentikasi

```http
POST /api/auth/login
{"email": "...", "password": "..."}
# → { token, user }
```

Kirim token pada request admin:

```http
Authorization: Bearer <token>
Accept: application/json
```

## Endpoint Publik

| Method | Endpoint | Keterangan |
|---|---|---|
| GET | `/api/berita` | List berita publish (`?kategori=`, `?q=`, `?page=`) |
| GET | `/api/berita/{slug}` | Detail berita (increment views) |
| GET | `/api/galeri` | List foto galeri (`?kategori=`) |
| GET | `/api/pengurus` | Struktur pengurus RW (ketua → inti → koordinator) |
| GET | `/api/pengurus-rt` | Daftar 8 ketua RT |
| GET | `/api/statistik?periode=2026-08` | Statistik per periode (default bulan berjalan), format tabel + totals + chart |
| GET | `/api/settings` | Konfigurasi konten (alamat, kontak, jam, profil, layanan, program) |
| POST | `/api/pengajuan` | Submit pengajuan: `{nik, nama, jenis_layanan, keperluan}` |
| GET | `/api/pengajuan/{kode}/status` | Cek status pengajuan via kode |
| POST | `/api/pesan` | Submit pesan: `{nama, kontak, kategori, pesan}` |

**Jenis layanan:** `surat-pengantar`, `surat-domisili`, `ktp-kk-baru`, `lainnya`
**Kategori pesan:** `pertanyaan`, `laporan`, `saran`, `lainnya`
**Status pengajuan:** `menunggu`, `diproses`, `selesai`, `ditolak`

## Endpoint Admin (`/api/admin/*`, butuh token admin)

| Method | Endpoint | Keterangan |
|---|---|---|
| GET/POST | `/api/admin/berita` | List semua / buat berita |
| PUT/DELETE | `/api/admin/berita/{id}` | Update / hapus berita |
| GET/POST | `/api/admin/galeri` | List / tambah foto |
| PUT/DELETE | `/api/admin/galeri/{id}` | Update / hapus foto |
| POST/PUT/DELETE | `/api/admin/pengurus` & `/api/admin/pengurus-rt` | Kelola pengurus |
| GET/POST | `/api/admin/statistik` | Kelola data statistik per RT per periode |
| DELETE | `/api/admin/statistik/{id}` | Hapus baris statistik |
| GET | `/api/admin/pengajuan` | List pengajuan (`?status=`, `?q=`) |
| PUT | `/api/admin/pengajuan/{id}` | Update status + catatan |
| GET | `/api/admin/pesan` | List pesan (`?status=`) |
| PUT | `/api/admin/pesan/{id}/read` | Tandai dibaca |
| GET/POST | `/api/admin/settings` | Baca / simpan pengaturan |

Upload gambar memakai `multipart/form-data` dengan field `gambar`/`image`/`foto`.
File disimpan di `storage/app/public` dan disajikan via `/storage/...`.

## Struktur Modul

```
app/Http/Controllers   Auth, Berita, Galeri, Pengurus, PengurusRt, Pengajuan, Pesan, Statistik, Setting
app/Http/Requests      Validasi per-aksi
app/Http/Resources     Format respons JSON
app/Models             User, Berita, Pengajuan, Pesan, GaleriItem, Pengurus, PengurusRt, StatistikCat, StatistikData, Setting
database/seeders       Admin, Berita, Pengurus, PengurusRt, Galeri, Statistik, Setting
```
