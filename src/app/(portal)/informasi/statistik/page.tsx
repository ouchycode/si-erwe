"use client";

import { useState, useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { ChevronUp, ChevronDown, BarChart2 } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";

// Simple seeded pseudo-random number generator (deterministic)
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

// Helper to generate 8 RTs of dummy data for each category (deterministic)
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
    
    // Auto-calculate "jumlah" if not explicitly defined but needed
    if (!config.jumlah) {
      row.jumlah = Object.entries(row).reduce((acc: number, [k, v]) => k !== 'rt' ? acc + (v as number) : acc, 0);
    }
    
    data.push(row);
  }
  
  return { data, totals };
};

const MONTHS = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

const getStatsData = (monthIndex: number) => ({
  "Penduduk": {
    columns: [
      { key: "jumlah", label: "TOTAL" },
      { key: "lakiLaki", label: "LAKI-LAKI" },
      { key: "perempuan", label: "PEREMPUAN" },
    ],
    ...generateData({
      lakiLaki: [50, 100],
      perempuan: [50, 105],
    }, 2 + monthIndex),
    chartColors: ["#3b82f6", "#ec4899"],
    chartTitle: "Berdasarkan Jenis Kelamin",
  },
  "Status Penduduk": {
    columns: [
      { key: "jumlah", label: "TOTAL" },
      { key: "wargaAsli", label: "WARGA ASLI" },
      { key: "pendatang", label: "PENDATANG" },
    ],
    ...generateData({
      wargaAsli: [70, 160],
      pendatang: [10, 40],
    }, 7 + monthIndex),
    chartColors: ["#10b981", "#f59e0b"],
    chartTitle: "Status Kependudukan",
  },
  "Mutasi Penduduk": {
    columns: [
      { key: "jumlah", label: "TOTAL MUTASI" },
      { key: "lahir", label: "KELAHIRAN" },
      { key: "meninggal", label: "KEMATIAN" },
    ],
    ...generateData({
      lahir: [0, 6],
      meninggal: [0, 3],
    }, 8 + monthIndex),
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
    ...generateData({
      balita: [10, 25],
      remaja: [20, 40],
      dewasa: [60, 120],
      lansia: [15, 30],
    }, 3 + monthIndex),
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
    ...generateData({
      islam: [80, 150],
      kristen: [10, 30],
      katolik: [5, 20],
      hindu: [0, 5],
      buddha: [0, 5],
    }, 4 + monthIndex),
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
    ...generateData({
      sd: [10, 30],
      smp: [15, 35],
      sma: [40, 80],
      sarjana: [20, 50],
    }, 5 + monthIndex),
    chartColors: ["#ef4444", "#f59e0b", "#10b981", "#3b82f6"],
    chartTitle: "Tingkat Pendidikan",
  },
});

export default function StatistikPage() {
  const currentMonthIndex = new Date().getMonth();
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(currentMonthIndex);
  
  const statsData = useMemo(() => getStatsData(selectedMonthIndex), [selectedMonthIndex]);
  const TABS = useMemo(() => Object.keys(statsData), [statsData]);
  
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  const activeCategory = (statsData as Record<string, typeof statsData.Penduduk>)[activeTab] || (statsData as Record<string, typeof statsData.Penduduk>)[TABS[0]];
  
  const chartData = useMemo(() => {
    return activeCategory.columns
      .filter((col) => col.key !== 'jumlah')
      .map((col, index: number) => ({
        name: col.label,
        value: (activeCategory.totals as Record<string, number>)[col.key] || 0,
        color: activeCategory.chartColors[index % activeCategory.chartColors.length]
      }));
  }, [activeCategory]);

  const sortedData = [...activeCategory.data].sort((a: Record<string, string | number>, b: Record<string, string | number>) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    const aValue = a[key];
    const bValue = b[key];

    if (aValue < bValue) return direction === "asc" ? -1 : 1;
    if (aValue > bValue) return direction === "asc" ? 1 : -1;
    return 0;
  });

  const requestSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key: string) => {
    if (sortConfig?.key === key) {
      return sortConfig.direction === "asc" ? (
        <ChevronUp size={12} className="text-slate-800" />
      ) : (
        <ChevronDown size={12} className="text-slate-800" />
      );
    }
    return (
      <div className="flex flex-col opacity-30">
        <ChevronUp size={10} className="-mb-1" />
        <ChevronDown size={10} />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white font-sans pb-20">
      <PageHeader
        category="Data Demografi"
        title="Statistik Warga RW 04"
        description="Visualisasi data kependudukan, demografi, dan persebaran warga di lingkungan RW 04 Pabuaran yang diperbarui secara berkala."
        rightContent={
          <div className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-xs px-5 py-4 shrink-0">
            <BarChart2 size={16} className="text-white/70" />
            <div>
              <p className="text-[10.5px] text-white/40 font-semibold uppercase tracking-widest mb-0.5">
                Periode Data
              </p>
              <select
                value={selectedMonthIndex}
                onChange={(e) => setSelectedMonthIndex(Number(e.target.value))}
                className="bg-transparent text-white font-bold text-sm outline-none cursor-pointer appearance-none border-b border-white/30 pb-0.5 hover:border-white transition-colors"
              >
                {MONTHS.map((m, idx) => (
                  <option key={m} value={idx} className="text-slate-800">
                    Bulan {m} 2025
                  </option>
                ))}
              </select>
            </div>
          </div>
        }
      />

      <div className="relative z-10 -mt-16">
        <section className="bg-white shadow-[0_-8px_30px_-15px_rgba(0,0,0,0.1)] pt-16 md:pt-24 pb-16 md:pb-24">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setSortConfig(null);
                  }}
                  className={`px-4 py-2 text-xs font-semibold transition-all rounded-xs ${
                    activeTab === tab
                      ? "text-brand-primary bg-brand-light shadow-sm"
                      : "text-gray-500 hover:text-gray-700 bg-slate-50 shadow-sm"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Content Layout */}
            <div className="flex flex-col lg:flex-row gap-6 items-start">
              {/* Table Container */}
              <div className="flex-1 w-full bg-slate-50 shadow-sm overflow-hidden rounded-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-center">
                    <thead className="sticky top-0 shadow-sm z-10">
                      <tr className="border-b border-slate-200 text-[10px] uppercase font-bold text-gray-600 bg-slate-100">
                        <th
                          className="py-4 px-4 cursor-pointer hover:bg-gray-200 transition-colors"
                          onClick={() => requestSort("rt")}
                        >
                          <div className="flex items-center justify-center gap-2">
                            RT
                            {getSortIcon("rt")}
                          </div>
                        </th>
                        {activeCategory.columns.map((col) => (
                          <th
                            key={col.key}
                            className="py-4 px-4 cursor-pointer hover:bg-gray-200 transition-colors border-l border-slate-200"
                            onClick={() => requestSort(col.key)}
                          >
                            <div className="flex items-center justify-center gap-2">
                              {col.label}
                              {getSortIcon(col.key)}
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {sortedData.map((row, index) => (
                        <tr
                          key={row.rt}
                          className={`${
                            index % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                          } hover:bg-brand-light/50 transition-colors duration-150`}
                        >
                          <td className="py-3 px-4 font-medium text-gray-700">
                            {row.rt}
                          </td>
                          {activeCategory.columns.map((col) => (
                            <td key={col.key} className="py-3 px-4 border-l border-gray-50 text-gray-600">
                              {row[col.key]}
                            </td>
                          ))}
                        </tr>
                      ))}
                      {/* Totals Row */}
                      <tr className="border-t-2 border-slate-200 bg-slate-100 font-bold">
                        <td className="py-4 px-4 text-slate-800">TOTAL</td>
                        {activeCategory.columns.map((col) => (
                          <td key={col.key} className="py-4 px-4 border-l border-slate-200 text-brand-primary">
                            {(activeCategory.totals as Record<string, number>)[col.key] || Object.values(activeCategory.data).reduce((acc: number, r: Record<string, unknown>) => acc + ((r[col.key] as number) || 0), 0)}
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Chart Container */}
              <div className="w-full lg:w-[350px] shrink-0 bg-slate-50 shadow-sm rounded-xs p-6 sticky top-24">
                <h3 className="text-sm font-bold text-center text-gray-800 mb-6 uppercase tracking-widest">
                  {activeCategory.chartTitle}
                </h3>
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={0}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ value }) => `${value}`}
                        labelLine={false}
                      >
                        {chartData.map((entry, index: number) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [`${value} Jiwa`, "Jumlah"]}
                        contentStyle={{ borderRadius: '4px', fontSize: '12px' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="flex flex-col gap-2 mt-6 border-t border-gray-200 pt-4">
                  {chartData.map((data, idx: number) => (
                    <div key={idx} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: data.color }} />
                        <span className="text-gray-600">{data.name}</span>
                      </div>
                      <span className="font-bold text-slate-800">{data.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
