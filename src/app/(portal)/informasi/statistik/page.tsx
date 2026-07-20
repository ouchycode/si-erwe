"use client";

import { useState, useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { ChevronUp, ChevronDown, BarChart2 } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContentSection } from "@/components/ui/ContentSection";
import { MONTHS, getStatsData } from "@/lib/statisticsData";

export default function StatistikPage() {
  const currentMonthIndex = new Date().getMonth();
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(currentMonthIndex);
  
  const statsData = useMemo(() => getStatsData(selectedMonthIndex), [selectedMonthIndex]);
  const TABS = Object.keys(statsData);
  
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
                    Bulan {m} 2026
                  </option>
                ))}
              </select>
            </div>
          </div>
        }
      />

      <ContentSection>
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
                  <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={250}>
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
      </ContentSection>
    </div>
  );
}
