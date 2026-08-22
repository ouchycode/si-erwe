"use client";

import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { BarChart2 } from "lucide-react";

import { useFetch } from "@/lib/hooks/useFetch";
import { admin } from "@/lib/adminApi";
import { MONTHS } from "@/lib/statisticsData";
import { Skeleton } from "@/components/ui/skeleton";
import type { StatistikCategory, StatistikResponse, StatistikRow } from "@/lib/types";

export function StatistikChart() {
  const now = new Date();
  const periode = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

  const { data, loading } = useFetch(
    () =>
      admin.get<{ data: StatistikResponse }>(
        `/admin/statistik?periode=${periode}`
      ),
    []
  );

  const category: StatistikCategory | undefined = useMemo(() => {
    const cats = data?.data ?? {};
    return cats["Penduduk"] ?? Object.values(cats)[0];
  }, [data]);

  const series = useMemo(
    () =>
      (category?.columns ?? [])
        .filter((c) => c.key !== "jumlah")
        .slice(0, 4),
    [category]
  );

  const chartData = useMemo(() => {
    if (!category) return [];
    return category.data.map((row: StatistikRow) => {
      const r = row as Record<string, string | number>;
      const item: Record<string, string | number> = { rt: String(r.rt) };
      for (const s of series) item[s.key] = Number(r[s.key] ?? 0);
      return item;
    });
  }, [category, series]);

  const total = category
    ? series.reduce((acc, s) => acc + (category.totals[s.key] ?? 0), 0)
    : 0;

  return (
    <section className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="flex items-center gap-2 text-base font-bold tracking-tight text-slate-800">
          <BarChart2 className="size-4 text-brand-primary" />
          Statistik Warga · {MONTHS[now.getMonth()]} {now.getFullYear()}
        </h2>
        {!loading && category && (
          <span className="rounded-full bg-brand-light px-3 py-1 text-xs font-semibold text-brand-primary">
            Total {new Intl.NumberFormat("id-ID").format(total)} jiwa
          </span>
        )}
      </div>
      <div className="rounded-xs bg-white p-4 shadow-sm sm:p-5">
        {loading ? (
          <Skeleton className="h-64 w-full" />
        ) : chartData.length === 0 ? (
          <p className="py-16 text-center text-sm text-muted-foreground">
            Belum ada data statistik untuk periode ini.
          </p>
        ) : (
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <BarChart data={chartData} margin={{ top: 8, right: 8, left: -18 }}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  className="stroke-slate-200 dark:stroke-slate-700"
                />
                <XAxis
                  dataKey="rt"
                  tick={{ fontSize: 11, fill: "#94a3b8" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#94a3b8" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  cursor={{ fill: "rgba(122, 31, 43, 0.06)" }}
                  contentStyle={{
                    borderRadius: 6,
                    border: "1px solid var(--border)",
                    background: "var(--popover)",
                    color: "var(--popover-foreground)",
                    fontSize: 12,
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                {series.map((s, i) => (
                  <Bar
                    key={s.key}
                    dataKey={s.key}
                    name={s.label}
                    fill={
                      category?.chartColors[i % (category?.chartColors.length || 1)]
                    }
                    radius={[3, 3, 0, 0]}
                    maxBarSize={36}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </section>
  );
}
