function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

const generateData = (config: Record<string, [number, number]>, categorySeed: number) => {
  const data = [];
  const totals: Record<string, number> = {};

  Object.keys(config).forEach(k => totals[k] = 0);

  for (let i = 1; i <= 8; i++) {
    const rt = i.toString().padStart(3, "0");
    const row: Record<string, number | string> = { rt };

    let keyIndex = 0;
    Object.entries(config).forEach(([key, [min, max]]) => {
      const seed = categorySeed * 100 + i * 10 + keyIndex;
      const val = Math.floor(seededRandom(seed) * (max - min + 1)) + min;
      row[key] = val;
      totals[key] += val;
      keyIndex++;
    });

    if (!config.jumlah) {
      row.jumlah = Object.entries(row).reduce((acc: number, [k, v]) => k !== 'rt' ? acc + (v as number) : acc, 0);
    }

    data.push(row);
  }

  return { data, totals };
};

export const MONTHS = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

export const STATISTIK_YEARS_START = 2024;

export function statistikYears(start: number = STATISTIK_YEARS_START): number[] {
  const end = new Date().getFullYear() + 1;
  const years: number[] = [];
  for (let y = start; y <= end; y++) years.push(y);
  return years;
}

export const getStatsData = (monthIndex: number) => ({
  "Penduduk": {
    columns: [
      { key: "jumlah", label: "TOTAL" },
      { key: "lakiLaki", label: "LAKI-LAKI" },
      { key: "perempuan", label: "PEREMPUAN" },
    ],
    ...generateData({ lakiLaki: [50, 100], perempuan: [50, 105] }, 2 + monthIndex),
    chartColors: ["#3b82f6", "#ec4899"],
    chartTitle: "Berdasarkan Jenis Kelamin",
  },
  "Status Penduduk": {
    columns: [
      { key: "jumlah", label: "TOTAL" },
      { key: "wargaAsli", label: "WARGA ASLI" },
      { key: "pendatang", label: "PENDATANG" },
    ],
    ...generateData({ wargaAsli: [70, 160], pendatang: [10, 40] }, 7 + monthIndex),
    chartColors: ["#10b981", "#f59e0b"],
    chartTitle: "Status Kependudukan",
  },
  "Mutasi Penduduk": {
    columns: [
      { key: "jumlah", label: "TOTAL MUTASI" },
      { key: "lahir", label: "KELAHIRAN" },
      { key: "meninggal", label: "KEMATIAN" },
    ],
    ...generateData({ lahir: [0, 6], meninggal: [0, 3] }, 8 + monthIndex),
    chartColors: ["#3b82f6", "#ef4444"],
    chartTitle: "Lahir & Meninggal",
  },
  "Kelompok Usia": {
    columns: [
      { key: "balita", label: "BALITA" },
      { key: "remaja", label: "REMAJA" },
      { key: "dewasa", label: "DEWASA" },
      { key: "lansia", label: "LANSIA" },
    ],
    ...generateData({ balita: [10, 25], remaja: [20, 40], dewasa: [60, 120], lansia: [15, 30] }, 3 + monthIndex),
    chartColors: ["#10b981", "#f59e0b", "#3b82f6", "#6366f1"],
    chartTitle: "Komposisi Usia",
  },
  "Agama": {
    columns: [
      { key: "islam", label: "ISLAM" },
      { key: "kristen", label: "KRISTEN" },
      { key: "katolik", label: "KATOLIK" },
      { key: "hindu", label: "HINDU" },
      { key: "buddha", label: "BUDDHA" },
    ],
    ...generateData({ islam: [80, 150], kristen: [10, 30], katolik: [5, 20], hindu: [0, 5], buddha: [0, 5] }, 4 + monthIndex),
    chartColors: ["#10b981", "#3b82f6", "#6366f1", "#f59e0b", "#ef4444"],
    chartTitle: "Penganut Agama",
  },
  "Pendidikan": {
    columns: [
      { key: "sd", label: "SD/SEDERAJAT" },
      { key: "smp", label: "SMP/SEDERAJAT" },
      { key: "sma", label: "SMA/SEDERAJAT" },
      { key: "sarjana", label: "D3/S1/S2" },
    ],
    ...generateData({ sd: [10, 30], smp: [15, 35], sma: [40, 80], sarjana: [20, 50] }, 5 + monthIndex),
    chartColors: ["#ef4444", "#f59e0b", "#10b981", "#3b82f6"],
    chartTitle: "Tingkat Pendidikan",
  },
});
