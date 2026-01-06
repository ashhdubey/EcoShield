// Location: Client/src/components/MyShield/HistoryChart.tsx
"use client";

import { HistoryData } from "@/lib/api";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Define the props for the component
interface HistoryChartProps {
  data: HistoryData[];
}

// Define the chart configuration
const chartConfig = {
  uv: {
    label: "UV Index",
    color: "hsl(var(--chart-1))",
  },
  air: {
    label: "AQI (1-5)",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function HistoryChart({ data }: HistoryChartProps) {
  // Format the data for the chart
  const chartData = data.map(item => ({
    name: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    uv: item.uvIndex,
    air: item.aqi, // The data is mapped here
  })).reverse(); // Reverse to show oldest to newest

  return (
    <ChartContainer config={chartConfig} className="h-72 w-full">
      <ResponsiveContainer>
        <AreaChart
          data={chartData}
          margin={{
            left: -20,
            top: 10,
            right: 10,
            bottom: 0,
          }}
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            fontSize={12}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            fontSize={12}
            domain={[0, 'dataMax + 2']}
          />
          <Tooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" />}
          />
          <defs>
            <linearGradient id="fillUv" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-uv)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="var(--color-uv)"
                stopOpacity={0.1}
              />
            </linearGradient>
            <linearGradient id="fillAir" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-air)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="var(--color-air)"
                stopOpacity={0.1}
              />
            </linearGradient>
          </defs>
          <Area
            dataKey="uv"
            type="monotone"
            fill="url(#fillUv)"
            fillOpacity={0.4}
            stroke="var(--color-uv)"
            stackId="1"
          />
          {/* --- THIS IS THE FIX --- */}
          {/* The dataKey must match the mapped name 'air' */}
          <Area
            dataKey="air"
            type="monotone"
            fill="url(#fillAir)"
            fillOpacity={0.4}
            stroke="var(--color-air)"
            stackId="2" 
          />
          {/* --- END OF FIX --- */}
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}