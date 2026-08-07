# PRD — Backend API Sistem Informasi RW 04 Pabuaran (Laravel)

## 1. Ringkasan

Frontend Next.js (`si-rw12`) saat ini 100% statis — semua data dummy di-hardcode
(`BERITA_DUMMY`, `LAYANAN_DUMMY`, `getStatsData()`, data pengurus, galeri, dll), dan form
hanya menampilkan toast tanpa penyimpanan. Backend Laravel dibangun sebagai **REST API-only**
(Sanctum) yang menggantikan seluruh data dummy dan melayani submit form. Admin mengelola
data via API (panel UI menyusul / dikerjakan terpisah).

- **Teknologi:** Laravel 12, PHP 8.3, MySQL, Sanctum (token auth)
- **Konsumen API:** Frontend Next.js yang sudah ada di repositori ini

## 2. Aktor

| Aktor                      | Deskripsi                                                                                                               |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **Guest / Warga (public)** | Baca berita, statistik, galeri, pengurus, layanan, program; submit pengajuan administrasi & pesan; cek status pengajuan |
| **Admin (Pengurus RW)**    | Login, kelola seluruh konten & data, proses pengajuan, baca pesan                                                       |

Role admin: `admin` (full) & `editor` (konten saja). MVP cukup role `admin`.

## 3. Modul Fungsional

### Fase 1 (inti)

1. **Autentikasi** — login/logout/me (Sanctum, token API), seeder admin awal.
2. **Berita** — CRUD admin + list publik.
3. **Pengajuan Layanan** — submit publik + status tracking.
4. **Pesan / Aspirasi (Hubungi Kami)** — submit publik + kelola admin.

### Fase 2

5. **Statistik Kependudukan** — data per RT (001–008) per bulan/tahun, 6 kategori.
6. **Galeri** — CRUD foto kegiatan.
7. **Pengurus RW & RT** — struktur hierarki + 8 ketua RT.
8. **Konfigurasi konten statis** — settings (profil, kontak, layanan, program warga, dll).

## 4. Skema Database (MySQL)

```
users            id, name, email, password, role, active
berita           id, judul, slug, ringkasan, konten, kategori, gambar, author, is_published, published_at, views
pengajuan        id, kode, nik, nama, jenis_layanan, keperluan, status, catatan, is_read
pesan            id, nama, kontak, kategori, pesan, is_read
galeri_items     id, title, category, image, is_published, sort_order
pengurus         id, nama, jabatan, deskripsi, level, urutan, foto, telp
pengurus_rt      id, rt_number, nama, blok, telp, foto, urutan
statistik_cat    id, nama, urutan
statistik_data   id, category_id, rt, periode(YYYY-MM), values(JSON)
settings         id, group, key, value(JSON/string)
```

## 5. REST API

### Publik

| Method | Endpoint                       | Keterangan                                       |
| ------ | ------------------------------ | ------------------------------------------------ |
| GET    | `/api/berita`                  | List berita publish, pagination, filter kategori |
| GET    | `/api/berita/{slug}`           | Detail berita (naikkan views)                    |
| GET    | `/api/galeri`                  | List foto galeri publish                         |
| GET    | `/api/statistik?bulan=&tahun=` | Statistik per periode (semua kategori)           |
| GET    | `/api/pengurus`                | Struktur RW + pengurus RT                        |
| GET    | `/api/layanan`                 | Daftar layanan publik                            |
| GET    | `/api/settings`                | Konfigurasi konten statis                        |
| POST   | `/api/pengajuan`               | Submit pengajuan layanan                         |
| GET    | `/api/pengajuan/{kode}/status` | Cek status pengajuan                             |
| POST   | `/api/pesan`                   | Submit pesan / aspirasi                          |

### Admin (auth:token)

| Method    | Endpoint                 | Keterangan                     |
| --------- | ------------------------ | ------------------------------ |
| POST      | `/api/auth/login`        | Login, return token            |
| POST      | `/api/auth/logout`       | Revoke token                   |
| GET       | `/api/me`                | Profil user                    |
| CRUD      | `/api/admin/berita`      | Kelola berita                  |
| CRUD      | `/api/admin/galeri`      | Kelola galeri                  |
| CRUD      | `/api/admin/pengurus`    | Kelola pengurus RW             |
| CRUD      | `/api/admin/pengurus-rt` | Kelola pengurus RT             |
| CRUD      | `/api/admin/statistik`   | Kelola data statistik          |
| CRUD      | `/api/admin/layanan`     | Kelola layanan                 |
| GET/PATCH | `/api/admin/pengajuan`   | List & update status pengajuan |
| GET/PATCH | `/api/admin/pesan`       | List & mark-read pesan         |
| GET/PATCH | `/api/admin/settings`    | Kelola settings                |

> Dokumentasi interaktif (Swagger UI): `GET /api/docs` — spec OpenAPI di `backend/resources/docs/openapi.yaml`.
> Aset UI di `backend/public/vendor/swagger-ui/` (swagger-ui-dist).

## 6. Non-Fungsional

- Validasi via Form Request; error response JSON konsisten `{message, errors}`.
- Upload gambar ke `storage/app/public` + disk public, validasi ekstensi/ukuran.
- Pagination untuk list; slug unique; waktu zona `Asia/Jakarta`.
- Keamanan: bcrypt password, rate-limit auth & POST publik, mass-assignment guard.

## 7. Deliverables

1. Project Laravel 12 + Sanctum, konfigurasi MySQL.
2. Migrasi + seeder (admin, data berita/pengurus dari dummy frontend).
3. Model, Form Request, API Resource.
4. Routes `api.php` + middleware throttle/auth.
5. Dokumentasi endpoint.
