import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  User,
  Tag,
  Share2,
  Link as LinkIcon,
  ChevronRight,
} from "lucide-react";

const DETAIL_BERITA = {
  id: 1,
  title: "Pendaftaran Turnamen E-Sports MLBB Antar RT Resmi Dibuka",
  date: "15 April 2026",
  category: "Karang Taruna",
  author: "Panitia Yatsafest",
  image: "/images/berita/iuran.png",
  content: `
    <p>Pengurus RW 12 bersama jajaran Karang Taruna resmi membuka pendaftaran turnamen e-sports Mobile Legends: Bang Bang (MLBB) antar RT. Kegiatan ini diselenggarakan sebagai wadah positif bagi pemuda di lingkungan Kutabumi untuk menyalurkan bakat dan mempererat tali silaturahmi.</p>
    <p>Ketua pelaksana turnamen menyampaikan bahwa antusiasme warga, khususnya kelompok remaja dan dewasa muda, sangat tinggi terhadap dunia e-sports. "Melalui turnamen ini, kita ingin membuktikan bahwa pemuda RW 12 tidak hanya solid dalam kegiatan kerja bakti, tetapi juga punya semangat sportivitas yang tinggi di dunia digital," ungkapnya saat technical meeting hari Minggu lalu.</p>
    <h3>Syarat dan Ketentuan Pendaftaran</h3>
    <ul>
      <li>Setiap RT berhak mengirimkan maksimal 2 tim (masing-masing tim berisi 5 pemain inti dan 1 pemain cadangan).</li>
      <li>Peserta wajib berdomisili di RW 12, dibuktikan dengan fotokopi KTP atau KK saat pendaftaran.</li>
      <li>Biaya pendaftaran (commitment fee) sebesar Rp 50.000 per tim.</li>
      <li>Pendaftaran ditutup pada tanggal 25 April 2026.</li>
    </ul>
    <p>Pertandingan akan dilaksanakan secara offline di Gedung Serbaguna RW 12, menggunakan sistem gugur (Best of 3). Panitia telah menyiapkan infrastruktur berupa jaringan internet lokal khusus.</p>
    <p>Bagi tim yang ingin mendaftar, formulir pendaftaran fisik sudah bisa diambil di rumah masing-masing Ketua RT, atau mendaftar secara online melalui kontak WhatsApp panitia pendaftaran.</p>
  `,
};

const BERITA_TERKAIT = [
  { id: 2, title: "Pelatihan Dasar Frontend Developer", date: "10 April 2026" },
  {
    id: 3,
    title: "Kerja Bakti Massal Persiapan Musim Hujan",
    date: "05 April 2026",
  },
  {
    id: 4,
    title: "Pembaruan Sistem Pembayaran Iuran Warga",
    date: "28 Maret 2026",
  },
];

export default function DetailBerita() {
  return (
    <div className="min-h-screen bg-white pb-20 font-sans">
      {/* BREADCRUMB */}
      <div className="bg-[#1a3a6b] px-6 md:px-16 py-5 border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/informasi/berita"
            className="inline-flex items-center gap-2 text-blue-100/70 hover:text-white text-[12.5px] font-medium transition-colors no-underline"
          >
            <ArrowLeft size={14} />
            Kembali ke Indeks Berita
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-16 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* ARTIKEL UTAMA */}
          <div className="lg:col-span-2 flex flex-col gap-0 bg-white border border-gray-100 rounded-md overflow-hidden">
            {/* Meta + Judul */}
            <div className="p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-2.5 mb-4">
                <span className="inline-flex items-center gap-1.5 bg-blue-50 text-[#1a3a6b] text-[11px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-sm">
                  <Tag size={11} />
                  {DETAIL_BERITA.category}
                </span>
                <span className="flex items-center gap-1.5 text-[12px] text-gray-400">
                  <Calendar size={12} />
                  {DETAIL_BERITA.date}
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight tracking-tight mb-6">
                {DETAIL_BERITA.title}
              </h1>

              <div className="flex items-center gap-3 py-4 border-t border-b border-gray-100">
                <div className="w-9 h-9 bg-blue-50 rounded-md flex items-center justify-center shrink-0">
                  <User size={16} className="text-[#1a3a6b]" />
                </div>
                <div>
                  <p className="text-[10.5px] text-gray-400 font-semibold uppercase tracking-widest mb-0.5">
                    Penulis / Editor
                  </p>
                  <p className="text-[13.5px] font-bold text-gray-900">
                    {DETAIL_BERITA.author}
                  </p>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative w-full aspect-video bg-gray-100">
              <Image
                src={DETAIL_BERITA.image}
                alt={DETAIL_BERITA.title}
                fill
                sizes="(max-width: 768px) 100vw, 66vw"
                className="object-cover"
              />
            </div>

            {/* Konten */}
            <div
              className="p-6 md:p-8 prose prose-sm prose-gray max-w-none text-gray-600 prose-headings:text-gray-900 prose-headings:font-bold prose-a:text-[#1a3a6b]"
              dangerouslySetInnerHTML={{ __html: DETAIL_BERITA.content }}
            />

            {/* Share */}
            <div className="px-6 md:px-8 py-5 bg-[#f8f9fc] border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-[12.5px] font-semibold text-gray-500 flex items-center gap-2">
                <Share2 size={14} className="text-gray-400" />
                Bagikan berita ini
              </p>
              <div className="flex items-center gap-2">
                <button className="w-8 h-8 rounded-md bg-[#1877F2] text-white flex items-center justify-center hover:opacity-80 transition-opacity border-none cursor-pointer">
                  <svg
                    width="14"
                    height="14"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </button>
                <button className="w-8 h-8 rounded-md bg-black text-white flex items-center justify-center hover:opacity-80 transition-opacity border-none cursor-pointer">
                  <svg
                    width="14"
                    height="14"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.733-8.835L1.254 2.25H8.08l4.253 5.622 5.912-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </button>
                <button className="w-8 h-8 rounded-md bg-gray-200 text-gray-600 flex items-center justify-center hover:opacity-80 transition-opacity border-none cursor-pointer">
                  <LinkIcon size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="flex flex-col gap-4">
            <div className="bg-white border border-gray-100 rounded-md p-6 sticky top-24">
              <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-gray-100">
                <Tag size={14} className="text-[#1a3a6b]" />
                <h3 className="text-[13px] font-bold text-gray-900">
                  Berita Lainnya
                </h3>
              </div>

              <div className="flex flex-col divide-y divide-gray-100">
                {BERITA_TERKAIT.map((item) => (
                  <Link
                    key={item.id}
                    href={`/informasi/berita/${item.id}`}
                    className="group flex flex-col gap-1 py-3.5 first:pt-0 last:pb-0 no-underline"
                  >
                    <p className="text-[13px] font-semibold text-gray-700 group-hover:text-[#1a3a6b] transition-colors leading-snug line-clamp-2">
                      {item.title}
                    </p>
                    <span className="flex items-center gap-1.5 text-[11.5px] text-gray-400">
                      <Calendar size={11} />
                      {item.date}
                    </span>
                  </Link>
                ))}
              </div>

              <Link
                href="/informasi/berita"
                className="mt-5 flex items-center justify-center gap-2 w-full py-2.5 bg-[#f8f9fc] hover:bg-[#1a3a6b] hover:text-white border border-gray-100 text-[#1a3a6b] rounded-md text-[12.5px] font-semibold transition-colors no-underline"
              >
                Lihat Semua Berita
                <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
