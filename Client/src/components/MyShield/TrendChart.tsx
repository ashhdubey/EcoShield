// Location: Client/src/components/MyShield/TrendChart.tsx
"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Separator } from "../ui/separator";
import DashboardStatCard from "./DashboardStatCard";
import React from "react";

// Data structure expected by this chart
export interface TrendDataPoint {
  label: string;
  aqi: number | null;
  uv: number | null;
  temp: number | null;
}

// Props
interface TrendChartProps {
  data: TrendDataPoint[];
  title: string;
  showAverages?: boolean;
}

// Define chart colors and labels - Ensure these CSS variables are defined in your globals.css
const chartConfig = {
  uv: {
    label: "UV Index",
    color: "hsl(var(--chart-1))", // Example: Orange/Yellow
    fillColor: "var(--color-uv)", // Define CSS var --color-uv based on chart-1
  },
  aqi: {
    label: "AQI (1-5)",
    color: "hsl(var(--chart-2))", // Example: Blue/Green
    fillColor: "var(--color-aqi)", // Define CSS var --color-aqi based on chart-2
  },
  temp: {
    label: "Temp (°C)",
    color: "hsl(var(--chart-3))", // Example: Red
    fillColor: "var(--color-temp)", // Define CSS var --color-temp based on chart-3
  },
} satisfies ChartConfig;

// Calculate averages
const calculateAverages = (data: TrendDataPoint[]) => {
    // ...(no changes needed)...
    if (!data || data.length === 0) return { avgAqi: "N/A", avgUv: "N/A", avgTemp: "N/A" };
    let totalAqi = 0, countAqi = 0;
    let totalUv = 0, countUv = 0;
    let totalTemp = 0, countTemp = 0;
    data.forEach(item => {
        if (item.aqi !== null && !isNaN(item.aqi)) { totalAqi += item.aqi; countAqi++; }
        if (item.uv !== null && !isNaN(item.uv)) { totalUv += item.uv; countUv++; }
        if (item.temp !== null && !isNaN(item.temp)) { totalTemp += item.temp; countTemp++; }
    });
    return {
        avgAqi: countAqi > 0 ? (totalAqi / countAqi).toFixed(1) : "N/A",
        avgUv: countUv > 0 ? (totalUv / countUv).toFixed(1) : "N/A",
        avgTemp: countTemp > 0 ? (totalTemp / countTemp).toFixed(1) : "N/A",
    };
};

export default function TrendChart({ data, title, showAverages = true }: TrendChartProps) {
  const chartData = Array.isArray(data) ? data : [];
  const { avgAqi, avgUv, avgTemp } = calculateAverages(chartData);

  // Filter out invalid numbers BEFORE calculating min/max
  const validUvs = chartData.map(item => item.uv).filter(uv => uv !== null && !isNaN(uv)) as number[];
  const validTemps = chartData.map(item => item.temp).filter(t => t !== null && !isNaN(t)) as number[];
  const validAqis = chartData.map(item => item.aqi).filter(a => a !== null && !isNaN(a)) as number[];

  const maxUv = validUvs.length > 0 ? Math.max(...validUvs) : 0;
  const minTemp = validTemps.length > 0 ? Math.min(...validTemps) : 0;
  const maxTemp = validTemps.length > 0 ? Math.max(...validTemps) : 0;
  const maxAqi = validAqis.length > 0 ? Math.max(...validAqis) : 0;

  // Determine dynamic domains
  const uvDomainMax = Math.max(1, Math.ceil(maxUv + 1));
  const tempDomain = [Math.floor(minTemp - 2), Math.ceil(maxTemp + 2)];
  const aqiDomain = [0, Math.max(5, Math.ceil(maxAqi + 1))];

  const hasValidPlotData = validAqis.length > 0 || validUvs.length > 0 || validTemps.length > 0;

  if (!hasValidPlotData) {
      // ...(placeholder rendering code)...
        return (
          <ChartContainer config={chartConfig} className="min-h-[400px] w-full flex flex-col">
               <h3 className="text-lg font-semibold mb-4">{title}</h3>
              <div className="flex-grow flex items-center justify-center">
                  <p className="text-muted-foreground">No trend data available to display.</p>
              </div>
               {showAverages && ( /* Averages Section (no changes) */ <></> )}
          </ChartContainer>
      );
  }


  return (
    <ChartContainer config={chartConfig} className="min-h-[400px] w-full">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 50, left: 0, bottom: 0 }} // Increased right margin
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--muted-foreground) / 0.5)" />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            fontSize={12}
            stroke="hsl(var(--muted-foreground))"
          />
          {/* Y-Axis AQI (Left) */}
          <YAxis
            yAxisId="leftAqi" dataKey="aqi" stroke={chartConfig.aqi.color}
            tickLine={false} axisLine={false} tickMargin={8} fontSize={12}
            domain={aqiDomain} allowDecimals={false} tickCount={6}
            label={{ value: 'AQI', angle: -90, position: 'insideLeft', offset: 10, style: { textAnchor: 'middle', fill: chartConfig.aqi.color } }}
          />
          {/* Y-Axis Temp (Right) */}
           <YAxis
            yAxisId="rightTemp" dataKey="temp" orientation="right" stroke={chartConfig.temp.color}
            tickLine={false} axisLine={false} tickMargin={8} fontSize={12}
            domain={tempDomain}
            label={{ value: 'Temp (°C)', angle: 90, position: 'insideRight', offset: 10, style: { textAnchor: 'middle', fill: chartConfig.temp.color } }}
            dx={5} // Small offset
          />
           {/* Y-Axis UV (Right, further offset) */}
           <YAxis
            yAxisId="rightUv" dataKey="uv" orientation="right" stroke={chartConfig.uv.color}
            tickLine={false} axisLine={false} tickMargin={8} fontSize={12}
            domain={[0, uvDomainMax]}
             label={{ value: 'UV Index', angle: 90, position: 'insideRight', offset: 40, style: { textAnchor: 'middle', fill: chartConfig.uv.color } }} // Increased offset
             dx={5} // Small offset matching temp axis
             // Optionally hide ticks if too cluttered
             // tick={false}
          />

          <Tooltip
            cursor={{ stroke: "hsl(var(--muted-foreground))", strokeDasharray: '3 3' }}
            content={<ChartTooltipContent indicator="dot" className="bg-background/90 backdrop-blur-sm" formatter={(value, name) => {
                // ...(Tooltip formatter remains the same)...
                const numValue = typeof value === 'number' ? value : NaN;
                if (isNaN(numValue)) return `${value ?? 'N/A'}`;
                const configKey = Object.keys(chartConfig).find(key => chartConfig[key as keyof typeof chartConfig].label === name);
                if (configKey === 'aqi') return `${numValue} (AQI)`;
                if (configKey === 'uv') return `${numValue.toFixed(1)} (UV)`;
                if (configKey === 'temp') return `${numValue.toFixed(1)}°C`;
                return numValue.toString();
            }} />}
          />
          <Legend verticalAlign="top" height={36}/>
          <defs>
             {/* Define gradients using specific color variables */}
            <linearGradient id="fillUvTrend" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={`var(${chartConfig.uv.fillColor})`} stopOpacity={0.6} />
              <stop offset="95%" stopColor={`var(${chartConfig.uv.fillColor})`} stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="fillAqiTrend" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={`var(${chartConfig.aqi.fillColor})`} stopOpacity={0.6} />
              <stop offset="95%" stopColor={`var(${chartConfig.aqi.fillColor})`} stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="fillTempTrend" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={`var(${chartConfig.temp.fillColor})`} stopOpacity={0.6} />
              <stop offset="95%" stopColor={`var(${chartConfig.temp.fillColor})`} stopOpacity={0.1} />
            </linearGradient>
          </defs>

          {/* --- Area Plots --- */}
          <Area
            dataKey="aqi" type="monotone"
            fill="url(#fillAqiTrend)" fillOpacity={0.4} // Slightly reduced opacity
            stroke={chartConfig.aqi.color} strokeWidth={2}
            yAxisId="leftAqi" name={chartConfig.aqi.label}
            connectNulls
            dot={false} // Optionally add dots: dot={{ r: 3, fill: chartConfig.aqi.color }} activeDot={{ r: 5 }}
          />
          <Area
            dataKey="temp" type="monotone"
            fill="url(#fillTempTrend)" fillOpacity={0.4}
            stroke={chartConfig.temp.color} strokeWidth={2}
            yAxisId="rightTemp" name={chartConfig.temp.label}
            connectNulls
            dot={false}
          />
          <Area
            dataKey="uv" type="monotone"
            fill="url(#fillUvTrend)" fillOpacity={0.4}
            stroke={chartConfig.uv.color} strokeWidth={2}
            yAxisId="rightUv" name={chartConfig.uv.label}
            connectNulls
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Averages Section */}
      {showAverages && (
        <>
          <Separator className="my-6" />
          <h3 className="text-lg font-semibold mb-2">Averages</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
             {/* ...(Average cards remain the same)... */}
            <DashboardStatCard title="Average AQI" value={`${avgAqi} / 5`} description="Avg air pollution" />
            <DashboardStatCard title="Average UV Index" value={avgUv} description="Avg sun exposure" />
            <DashboardStatCard title="Average Temp" value={`${avgTemp}°C`} description="Avg temperature" />
          </div>
        </>
      )}
    </ChartContainer>
  );
}