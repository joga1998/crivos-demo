"use client"

import * as React from "react"
import { OverviewMetricsCards } from "@/components/overview/metrics-cards"
import { StudyAreaChart } from "@/components/overview/study-area-chart"
import { RecentTasks } from "@/components/overview/recent-tasks"

export default function OverviewPage() {
  return (
    <div className="space-y-6 w-full">
      {/* 1. Greeting minimalista com tipografia Space Grotesk */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-elements flex items-center gap-2">
          Hi, Welcome back <span className="text-xl">👋</span>
        </h2>
      </div>

      {/* 2. Top 4 Cards de Métricas */}
      <OverviewMetricsCards />

      {/* 3. Grid Central: Dotted Area Chart (7 colunas / proporção 4:3) + Recent Sales */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 w-full">
        <div className="md:col-span-2 lg:col-span-4">
          <StudyAreaChart />
        </div>
        <div className="md:col-span-2 lg:col-span-3">
          <RecentTasks />
        </div>
      </div>
    </div>
  )
}
