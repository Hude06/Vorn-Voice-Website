"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { DailyMetricPoint } from "@/lib/metrics";

type DownloadsChartProps = {
  data: DailyMetricPoint[];
};

export function DownloadsChart({ data }: DownloadsChartProps) {
  return (
    <div className="h-[320px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
          <defs>
            <linearGradient id="downloads-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.42} />
              <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="uniques-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--chart-2)" stopOpacity={0.32} />
              <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="date"
            tickFormatter={(value: string) =>
              new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(
                new Date(value),
              )
            }
            tick={{ fill: "rgba(218, 218, 218, 0.72)", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            minTickGap={24}
          />
          <YAxis
            tick={{ fill: "rgba(218, 218, 218, 0.72)", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
            width={36}
          />
          <Tooltip
            contentStyle={{
              background: "rgba(12, 14, 18, 0.92)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "18px",
              boxShadow: "0 20px 70px rgba(0,0,0,0.35)",
            }}
            formatter={(value: number, name: string) => [value, name === "downloads" ? "Downloads" : "Unique"]}
            labelFormatter={(value: string) =>
              new Intl.DateTimeFormat("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              }).format(new Date(value))
            }
          />
          <Area
            type="monotone"
            dataKey="uniqueDownloaders"
            stroke="var(--chart-2)"
            fill="url(#uniques-gradient)"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="downloads"
            stroke="var(--chart-1)"
            fill="url(#downloads-gradient)"
            strokeWidth={2.5}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
