"use client"

import * as React from "react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingDown } from "lucide-react"

const chartData = [
  { month: "Jan", uv: 400, pv: 240 },
  { month: "Feb", uv: 820, pv: 420 },
  { month: "Mar", uv: 500, pv: 310 },
  { month: "Apr", uv: 680, pv: 390 },
  { month: "May", uv: 430, pv: 290 },
  { month: "Jun", uv: 720, pv: 480 },
  { month: "Jul", uv: 390, pv: 260 },
  { month: "Aug", uv: 980, pv: 580 },
  { month: "Sep", uv: 690, pv: 420 },
  { month: "Oct", uv: 810, pv: 510 },
  { month: "Dec", uv: 410, pv: 280 },
]

export function StudyAreaChart() {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <Card className="border-border/60 bg-card shadow-sm h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <div className="flex items-center gap-2">
            <CardTitle className="text-base font-semibold text-foreground tracking-tight font-elements">
              Dotted Area Chart
            </CardTitle>
            <span className="inline-flex items-center gap-0.5 text-xs text-muted-foreground font-mono">
              <TrendingDown className="size-3 text-rose-500" /> -5.2%
            </span>
          </div>
          <CardDescription className="text-xs text-muted-foreground pt-0.5 font-sans">
            Showing total visitors for the last 6 months
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pt-2 flex-1 pb-4">
        <div className="h-[300px] w-full min-h-[300px] flex items-center justify-center relative">
          {mounted ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 15, right: 10, left: -25, bottom: 0 }}
              >
                <defs>
                  {/* Padrão pontilhado */}
                  <pattern id="dotPattern" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1" fill="#71717A" opacity="0.3" />
                  </pattern>
                </defs>
                <CartesianGrid
                  strokeDasharray="2 4"
                  vertical={false}
                  stroke="#27272A"
                  opacity={0.4}
                />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#71717A", fontSize: 11 }}
                  dy={6}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#71717A", fontSize: 11 }}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border border-border bg-card p-2 shadow-lg text-xs font-mono">
                          <div className="font-bold text-foreground mb-1">
                            {payload[0].payload.month}
                          </div>
                          <div className="text-rose-500">
                            Linha Principal: {payload[0].value}
                          </div>
                          <div className="text-muted-foreground">
                            Linha Secundária: {payload[1]?.value}
                          </div>
                        </div>
                      )
                    }
                    return null
                  }}
                />
                {/* Linha 1: Laranja/Rose Suave */}
                <Area
                  type="natural"
                  dataKey="uv"
                  stroke="#E11D48"
                  strokeWidth={1.8}
                  fillOpacity={1}
                  fill="url(#dotPattern)"
                />
                {/* Linha 2: Cinza Claro / Branco */}
                <Area
                  type="natural"
                  dataKey="pv"
                  stroke="#E4E4E7"
                  strokeWidth={1.8}
                  fillOpacity={1}
                  fill="url(#dotPattern)"
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-xs text-muted-foreground font-sans">Carregando gráfico...</div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
