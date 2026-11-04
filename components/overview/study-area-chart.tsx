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

const chartData = [
  { day: "14/10", meta: 3.5, real: 4.2 },
  { day: "17/10", meta: 3.5, real: 3.8 },
  { day: "20/10", meta: 4.0, real: 5.1 },
  { day: "23/10", meta: 4.0, real: 4.5 },
  { day: "26/10", meta: 4.0, real: 2.9 },
  { day: "29/10", meta: 4.5, real: 6.0 },
  { day: "01/11", meta: 4.5, real: 5.4 },
  { day: "04/11", meta: 4.5, real: 4.8 },
]

export function StudyAreaChart() {
  return (
    <Card className="border-border bg-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-sm font-semibold uppercase tracking-wider">
            Evolução de Horas Líquidas
          </CardTitle>
          <CardDescription className="text-xs">
            Meta planejada vs. Execução real diária
          </CardDescription>
        </div>
        <div className="flex items-center gap-3 text-[11px] font-mono">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span className="text-muted-foreground">Executado</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-zinc-500" />
            <span className="text-muted-foreground">Meta Diária</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="realGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#E11D48" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#E11D48" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="metaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#71717A" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#71717A" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272A" />
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#A1A1AA", fontSize: 11 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#A1A1AA", fontSize: 11 }}
                tickFormatter={(v) => `${v}h`}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border border-border bg-card p-2.5 shadow-lg text-xs font-mono">
                        <div className="font-bold text-foreground mb-1">
                          {payload[0].payload.day}
                        </div>
                        <div className="text-primary">
                          Executado: {payload[0].value}h
                        </div>
                        <div className="text-muted-foreground">
                          Meta: {payload[1].value}h
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Area
                type="monotone"
                dataKey="real"
                stroke="#E11D48"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#realGradient)"
              />
              <Area
                type="monotone"
                dataKey="meta"
                stroke="#71717A"
                strokeWidth={1.5}
                strokeDasharray="4 4"
                fillOpacity={1}
                fill="url(#metaGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
