export const ALAMAT = {
  tempat: "Gedung Serbaguna RW 004",
  jalan: "Jl. Darma Bakti No.64, RT.001/RW.005",
  kelurahan: "Pabuaran",
  kecamatan: "Karawaci",
  kota: "Kota Tangerang",
  provinsi: "Banten",
  kodePos: "15114",
  full: "Gedung Serbaguna RW 004, Jl. Darma Bakti No.64, RT.001/RW.005, Pabuaran, Kec. Karawaci, Kota Tangerang, Banten 15114",
  singkat: "Sekretariat RW 004 Pabuaran, Karawaci, Kota Tangerang",
} as const;

export const KONTAK = {
  wa: "+62 811-2222-3333",
  waTelp: "628112223333",
  email: "admin@rw04pabuaran.id",
} as const;

export const JAM_OPERASIONAL: { hari: string; jam: string; libur?: true }[] = [
  { hari: "Senin – Jumat", jam: "19.00 – 22.00" },
  { hari: "Sabtu – Minggu", jam: "09.00 – 15.00" },
  { hari: "Hari Libur Nasional", jam: "Tutup", libur: true },
];
