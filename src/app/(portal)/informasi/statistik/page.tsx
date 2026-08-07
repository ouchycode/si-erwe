"use client";

import { useState, useMemo, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { ChevronUp, ChevronDown, BarChart2, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContentSection } from "@/components/ui/ContentSection";
import { MONTHS } from "@/lib/statisticsData";
import { api } from "@/lib/api";
import type { StatistikResponse, StatistikCategory } from "@/lib/types";

export default function StatistikPage() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(today.getMonth());
  const [statsData, setStatsData] = useState<StatistikResponse | null>(null);
  const [prevStatsData, setPrevStatsData] = useState<StatistikResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const periode = useMemo(
    () => `${year}-${String(selectedMonthIndex + 1).padStart(2, "0")}`,
    [year, selectedMonthIndex]
  );

  const prevPeriode = useMemo(() => {
    const prevMonth = selectedMonthIndex === 0 ? 11 : selectedMonthIndex - 1;
    const prevYear = selectedMonthIndex === 0 ? year - 1 : year;
    return `${prevYear}-${String(prevMonth + 1).padStart(2, "0")}`;
  }, [selectedMonthIndex, year]);

  const loadPeriode = useMemo(
    () => ({ periode, prevPeriode }),
    [periode, prevPeriode]
  );

  useEffect(() => {
    let active = true;

    Promise.all([
      api.get<{ data: StatistikResponse }>(`/statistik?periode=${loadPeriode.periode}`),
      api.get<{ data: StatistikResponse }>(`/statistik?periode=${loadPeriode.prevPeriode}`),
    ])
      .then(([cur, prev]) => {
        if (!active) return;
        setStatsData(cur.data);
        setPrevStatsData(prev.data);
        setLoading(false);
      })
      .catch(() => {
        if (!active) return;
        setStatsData(null);
        setPrevStatsData(null);
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [loadPeriode]);

  const TABS = Object.keys(statsData ?? {});

  const [activeTab, setActiveTab] = useState<string | null>(null);
  const effectiveTab = activeTab && TABS.includes(activeTab) ? activeTab : (TABS[0] ?? null);

  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  const activeCategory: StatistikCategory | null = effectiveTab
    ? statsData?.[effectiveTab] ?? null
    : null;

  const prevCategory: StatistikCategory | null = effectiveTab
    ? prevStatsData?.[effectiveTab] ?? null
    : null;

  const comparison = useMemo(() => {
    if (!activeCategory || !prevCategory) return [];
    return activeCategory.columns.map((col) => {
      const cur = activeCategory.totals[col.key] ?? 0;
      const prev = prevCategory.totals[col.key] ?? 0;
      const delta = cur - prev;
      const pct = prev === 0 ? (delta === 0 ? 0 : 100) : (delta / prev) * 100;
      return { label: col.label, cur, prev, delta, pct };
    });
  }, [activeCategory, prevCategory]);

  const chartData = useMemo(() => {
    if (!activeCategory) return [];
    return activeCategory.columns
      .filter((col) => col.key !== "jumlah")
      .map((col, index) => ({
        name: col.label,
        value: activeCategory.totals[col.key] ?? 0,
        color: activeCategory.chartColors[index % activeCategory.chartColors.length],
      }));
  }, [activeCategory]);

  const sortedData = useMemo(() => {
    if (!activeCategory) return [];
    const rows = [...activeCategory.data];
    if (!sortConfig) return rows;
    const { key, direction } = sortConfig;
    return rows.sort((a, b) => {
      const aValue = a[key] ?? 0;
      const bValue = b[key] ?? 0;
      if (aValue < bValue) return direction === "asc" ? -1 : 1;
      if (aValue > bValue) return direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [activeCategory, sortConfig]);

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
            <div className="flex items-center gap-2">
              <select
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="bg-transparent text-white font-bold text-sm outline-none cursor-pointer appearance-none border-b border-white/30 pb-0.5 hover:border-white transition-colors"
              >
                {[today.getFullYear(), today.getFullYear() - 1].map((y) => (
                  <option key={y} value={y} className="text-slate-800">
                    {y}
                  </option>
                ))}
              </select>
              <select
                value={selectedMonthIndex}
                onChange={(e) => setSelectedMonthIndex(Number(e.target.value))}
                className="bg-transparent text-white font-bold text-sm outline-none cursor-pointer appearance-none border-b border-white/30 pb-0.5 hover:border-white transition-colors"
              >
                {MONTHS.map((m, idx) => (
                  <option key={m} value={idx} className="text-slate-800">
                    {m}
                  </option>
                ))}
              </select>
            </div>
          </div>
        }
      />

      <ContentSection>
        {loading ? (
          <div className="text-center py-20">
            <p className="text-gray-400 font-medium">Memuat data statistik...</p>
          </div>
        ) : !activeCategory ? (
          <div className="text-center py-20">
            <p className="text-gray-400 font-medium">
              Belum ada data statistik untuk periode {periode}.
            </p>
          </div>
        ) : (
          <>
            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setSortConfig(null);
                  }}
                  className={`px-4 py-2 text-xs font-semibold transition-all rounded-xs cursor-pointer border-none ${
                    effectiveTab === tab
                      ? "text-brand-primary bg-brand-light shadow-sm"
                      : "text-gray-500 hover:text-gray-700 bg-slate-50 shadow-sm"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Perbandingan Bulan Ini vs Bulan Kemarin */}
            {comparison.length > 0 && (
              <div className="mb-6 rounded-xs border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart2 size={16} className="text-brand-primary" />
                  <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest">
                    Analisis: {MONTHS[selectedMonthIndex]} {year} vs {MONTHS[selectedMonthIndex === 0 ? 11 : selectedMonthIndex - 1]} {selectedMonthIndex === 0 ? year - 1 : year}
                  </h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {comparison.map((c) => {
                    const stable = c.delta === 0;
                    return (
                      <div
                        key={c.label}
                        className={`rounded-xs border p-3 ${
                          stable
                            ? "bg-white border-slate-200"
                            : c.delta > 0
                              ? "bg-emerald-50 border-emerald-200"
                              : "bg-rose-50 border-rose-200"
                        }`}
                      >
                        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                          {c.label}
                        </p>
                        <p className="text-xl font-bold text-slate-800 mt-1">
                          {c.cur}{" "}
                          <span className="text-[10px] font-medium text-gray-400">/ {c.prev}</span>
                        </p>
                        <p
                          className={`mt-1 inline-flex items-center gap-1 text-xs font-semibold ${
                            stable
                              ? "text-gray-500"
                              : c.delta > 0
                                ? "text-emerald-600"
                                : "text-rose-600"
                          }`}
                        >
                          {stable ? (
                            <>
                              <Minus size={12} /> Tetap
                            </>
                          ) : c.delta > 0 ? (
                            <>
                              <TrendingUp size={12} /> +{c.delta} ({c.pct.toFixed(0)}%)
                            </>
                          ) : (
                            <>
                              <TrendingDown size={12} /> {c.delta} ({c.pct.toFixed(0)}%)
                            </>
                          )}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

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
                      {sortedData.length === 0 && (
                        <tr>
                          <td
                            colSpan={activeCategory.columns.length + 1}
                            className="py-16 text-center text-gray-400 font-medium"
                          >
                            Tidak ada data untuk periode ini.
                          </td>
                        </tr>
                      )}
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
                      {sortedData.length > 0 && (
                        <tr className="border-t-2 border-slate-200 bg-slate-100 font-bold">
                          <td className="py-4 px-4 text-slate-800">TOTAL</td>
                          {activeCategory.columns.map((col) => (
                            <td key={col.key} className="py-4 px-4 border-l border-slate-200 text-brand-primary">
                              {activeCategory.totals[col.key] ?? 0}
                            </td>
                          ))}
                        </tr>
                      )}
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
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [`${value} Jiwa`, "Jumlah"]}
                        contentStyle={{ borderRadius: "4px", fontSize: "12px" }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="flex flex-col gap-2 mt-6 border-t border-gray-200 pt-4">
                  {chartData.map((data, idx) => (
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
          </>
        )}
      </ContentSection>
    </div>
  );
}
