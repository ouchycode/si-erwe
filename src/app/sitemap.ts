import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://darmabakti004.pabuaran.id";

  const staticRoutes: string[] = [
    "",
    "/hubungi-kami",
    "/informasi/berita",
    "/informasi/galeri",
    "/informasi/program-warga",
    "/informasi/statistik",
    "/layanan/administrasi-kependudukan",
    "/layanan/keamanan-wilayah",
    "/layanan/kebersihan-lingkungan",
    "/layanan/posyandu",
    "/tentang-kami/pengurus-rt",
    "/tentang-kami/peta-wilayah",
    "/tentang-kami/profil",
    "/tentang-kami/struktur-rw",
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
  ];
}
