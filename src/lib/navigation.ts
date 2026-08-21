import {
  User,
  LayoutGrid,
  Users,
  Map,
  FileText,
  Shield,
  Home,
  Newspaper,
  BarChart2,
  Sprout,
  Camera,
  Mail,
} from "lucide-react";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/brand-icons";

export interface NavChild {
  label: string;
  href: string;
  icon: React.ElementType;
  description: string;
}

export interface NavItem {
  label: string;
  icon: React.ElementType;
  children: NavChild[];
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Profil",
    icon: User,
    children: [
      {
        label: "Profil RW",
        href: "/tentang-kami/profil",
        icon: User,
        description: "Ringkasan sejarah dan identitas RW.",
      },
      {
        label: "Struktur RW",
        href: "/tentang-kami/struktur-rw",
        icon: LayoutGrid,
        description: "Susunan pengurus dan pembagian tugas.",
      },
      {
        label: "Pengurus RT",
        href: "/tentang-kami/pengurus-rt",
        icon: Users,
        description: "Daftar ketua RT di lingkungan RW.",
      },
      {
        label: "Peta Wilayah",
        href: "/tentang-kami/peta-wilayah",
        icon: Map,
        description: "Batas area dan sebaran wilayah RW.",
      },
    ],
  },
  {
    label: "Layanan Publik",
    icon: FileText,
    children: [
      {
        label: "Administrasi Kependudukan",
        href: "/layanan/administrasi-kependudukan",
        icon: FileText,
        description: "Layanan surat pengantar dan administrasi warga.",
      },
      {
        label: "Keamanan Wilayah",
        href: "/layanan/keamanan-wilayah",
        icon: Shield,
        description: "Informasi keamanan, tamu, dan siskamling.",
      },
      {
        label: "Kebersihan Lingkungan",
        href: "/layanan/kebersihan-lingkungan",
        icon: Home,
        description: "Jadwal kebersihan dan kerja bakti warga.",
      },
      {
        label: "Layanan Posyandu",
        href: "/layanan/posyandu",
        icon: User,
        description: "Informasi jadwal posyandu balita dan lansia.",
      },
    ],
  },
  {
    label: "Informasi Publik",
    icon: Mail,
    children: [
      {
        label: "Berita Terkini",
        href: "/informasi/berita",
        icon: Newspaper,
        description: "Update kegiatan dan pengumuman terbaru.",
      },
      {
        label: "Statistik Warga",
        href: "/informasi/statistik",
        icon: BarChart2,
        description: "Data ringkas jumlah dan komposisi warga.",
      },
      {
        label: "Program Warga",
        href: "/informasi/program-warga",
        icon: Sprout,
        description: "Agenda dan program rutin lingkungan.",
      },
      {
        label: "Galeri Kegiatan",
        href: "/informasi/galeri",
        icon: Camera,
        description: "Dokumentasi foto kegiatan RW.",
      },
    ],
  },
];

export const SOCIAL_LINKS = [
  { href: "mailto:info@rw04pabuaran.id", icon: Mail, label: "Email" },
  { href: "https://www.instagram.com", icon: InstagramIcon, label: "Instagram" },
  { href: "https://wa.me/6281200000000", icon: WhatsAppIcon, label: "WhatsApp" },
];
