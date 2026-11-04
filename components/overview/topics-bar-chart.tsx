"use client"

import * as React from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const topicData = [
  { topic: "Haesbaert", horas: 12.5, peso: "Alto" },
  { topic: "Thompson", horas: 16.0, peso: "Alto" },
  { topic: "Certeau", horas: 10.5, peso: "Médio" },
  { topic: "Hartog", horas: 8.0, peso: "Médio" },
  { topic: "Poulantzas", horas: 11.2, peso: "Alto" },
  { topic: "Catroga", horas: 9.0, peso: "Médio" },
]

export function TopicsBarChart() {
  return (
    <Card className="border-border bg-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-sm font-semibold uppercase tracking-wider">
            Horas por Autor / Eixo
          </CardTitle>
          <CardDescription className="text-xs">
            Distribuição de dedicação analítica no edital
          </CardDescription>
        </div>
        <span className="text-[11px] font-mono text-muted-foreground">
          Top 6 Autores
        </span>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={topicData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272A" />
              <XAxis
                dataKey="topic"
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
                      <div className="rounded-lg border border-border bg-card p-2 text-xs font-mono shadow-md">
                        <div className="font-bold text-foreground">
                          {payload[0].payload.topic}
                        </div>
                        <div className="text-primary">
                          Dedicação: {payload[0].value} horas
                        </div>
                        <div className="text-muted-foreground text-[10px]">
                          Prioridade: {payload[0].payload.peso}
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Bar
                dataKey="horas"
                fill="#E11D48"
                radius={[4, 4, 0, 0]}
                maxBarSize={45}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
