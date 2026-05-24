"use client";

import { useState, useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { ChevronUp, ChevronDown, BarChart2 } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";

// Helper to generate 8 RTs of dummy data for each category
const generateData = (config: Record<string, [number, number]>) => {
  const data = [];
  const totals: Record<string, number> = {};
  
  Object.keys(config).forEach(k => totals[k] = 0);

  for (let i = 1; i <= 8; i++) {
    const rt = i.toString().padStart(3, "0");
    const row: any = { rt };
    
    Object.entries(config).forEach(([key, [min, max]]) => {
      const val = Math.floor(Math.random() * (max - min + 1)) + min;
      row[key] = val;
      totals[key] += val;
    });
    
    // Auto-calculate "jumlah" if not explicitly defined but needed
    if (!config.jumlah) {
      row.jumlah = Object.entries(row).reduce((acc: number, [k, v]) => k !== 'rt' ? acc + (v as number) : acc, 0);
    }
    
    data.push(row);
  }
  
  return { data, totals };
};

const STATS_DATA = {
  "Rumah & Bangunan": {
    columns: [
      { key: "jumlah", label: "JUMLAH" },
      { key: "tempatTinggal", label: "TEMPAT TINGGAL" },
      { key: "tempatUsaha", label: "TEMPAT USAHA" },
    ],
    ...generateData({
      tempatTinggal: [40, 90],
      tempatUsaha: [2, 10],
    }),
    chartColors: ["#0f4c5c", "#e2e8f0"],
    chartTitle: "Komposisi Bangunan",
  },
  "Penduduk": {
    columns: [
      { key: "jumlah", label: "TOTAL" },
      { key: "lakiLaki", label: "LAKI-LAKI" },
      { key: "perempuan", label: "PEREMPUAN" },
    ],
    ...generateData({
      lakiLaki: [50, 100],
      perempuan: [50, 105],
    }),
    chartColors: ["#3b82f6", "#ec4899"],
    chartTitle: "Berdasarkan Jenis Kelamin",
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
    }),
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
    }),
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
    }),
    chartColors: ["#ef4444", "#f59e0b", "#10b981", "#3b82f6"],
    chartTitle: "Tingkat Pendidikan",
  },
  "Golongan Darah": {
    columns: [
      { key: "a", label: "GOL A" },
      { key: "b", label: "GOL B" },
      { key: "ab", label: "GOL AB" },
      { key: "o", label: "GOL O" },
    ],
    ...generateData({
      a: [20, 50],
      b: [20, 50],
      ab: [5, 20],
      o: [30, 70],
    }),
    chartColors: ["#ef4444", "#3b82f6", "#8b5cf6", "#10b981"],
    chartTitle: "Golongan Darah",
  },
};

const TABS = Object.keys(STATS_DATA);

export default function StatistikPage() {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  const activeCategory = STATS_DATA[activeTab as keyof typeof STATS_DATA];
  
  // Format chart data based on totals
  const chartData = useMemo(() => {
    return activeCategory.columns
      .filter(col => col.key !== 'jumlah') // Exclude total column from chart
      .map((col, index) => ({
        name: col.label,
        value: activeCategory.totals[col.key] || 0,
        color: activeCategory.chartColors[index % activeCategory.chartColors.length]
      }));
  }, [activeCategory]);

  const sortedData = [...activeCategory.data].sort((a: any, b: any) => {
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
        <ChevronUp size={12} className="text-gray-900" />
      ) : (
        <ChevronDown size={12} className="text-gray-900" />
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
    <div className="min-h-screen bg-gray-50 pb-20 font-sans">
      <PageHeader
        category="Data Demografi"
        title="Statistik Warga RW 12"
        description="Visualisasi data kependudukan, demografi, dan persebaran warga di lingkungan RW 12 Kutabumi yang diperbarui secara berkala."
        rightContent={
          <div className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-xs px-5 py-4 shrink-0">
            <BarChart2 size={16} className="text-green-300" />
            <div>
              <p className="text-[10.5px] text-blue-300/70 font-semibold uppercase tracking-widest mb-0.5">
                Periode Data
              </p>
              <p className="text-sm font-bold text-white leading-none">
                s.d. Desember 2025
              </p>
            </div>
          </div>
        }
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-16 relative z-10">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setSortConfig(null);
              }}
              className={`px-4 py-2 text-xs font-semibold transition-all border ${
                activeTab === tab
                  ? "border-brand-primary text-brand-primary bg-blue-50/50 shadow-sm"
                  : "border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700 bg-white shadow-sm"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content Layout */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Table Container */}
          <div className="flex-1 w-full bg-white border border-gray-200 shadow-sm overflow-hidden rounded-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-center">
                <thead>
                  <tr className="border-b border-gray-200 text-[10px] uppercase font-bold text-gray-600 bg-[#FAFAFA]">
                    <th
                      className="py-4 px-4 cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => requestSort("rt")}
                    >
                      <div className="flex items-center justify-center gap-2">
                        RT
                        {getSortIcon("rt")}
                      </div>
                    </th>
                    {activeCategory.columns.map(col => (
                      <th
                        key={col.key}
                        className="py-4 px-4 cursor-pointer hover:bg-gray-100 transition-colors border-l border-gray-100"
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
                      className={`border-b border-gray-100 last:border-0 hover:bg-blue-50/30 transition-colors ${
                        index % 2 === 0 ? "bg-white" : "bg-[#FAFAFA]/50"
                      }`}
                    >
                      <td className="py-3 px-4 font-medium text-gray-700">
                        {row.rt}
                      </td>
                      {activeCategory.columns.map(col => (
                        <td key={col.key} className="py-3 px-4 border-l border-gray-50 text-gray-600">
                          {row[col.key]}
                        </td>
                      ))}
                    </tr>
                  ))}
                  {/* Totals Row */}
                  <tr className="border-t-2 border-gray-200 bg-gray-50 font-bold">
                    <td className="py-4 px-4 text-gray-900">
                      TOTAL
                    </td>
                    {activeCategory.columns.map(col => (
                      <td key={col.key} className="py-4 px-4 border-l border-gray-100 text-brand-primary">
                        {activeCategory.totals[col.key] || Object.values(activeCategory.data).reduce((acc: number, r: any) => acc + (r[col.key] || 0), 0)}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Chart Container */}
          <div className="w-full lg:w-[350px] shrink-0 bg-white border border-gray-200 shadow-sm rounded-xs p-6 sticky top-24">
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
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`${value} Jiwa/Unit`, "Jumlah"]}
                    contentStyle={{ borderRadius: '4px', fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="flex flex-col gap-2 mt-6 border-t border-gray-100 pt-4">
              {chartData.map((data, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: data.color }} />
                    <span className="text-gray-600">{data.name}</span>
                  </div>
                  <span className="font-bold text-gray-900">{data.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
