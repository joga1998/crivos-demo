"use client"

import * as React from "react"
import { OverviewMetricsCards } from "@/components/overview/metrics-cards"
import { StudyAreaChart } from "@/components/overview/study-area-chart"
import { TopicsBarChart } from "@/components/overview/topics-bar-chart"
import { RecentTasks } from "@/components/overview/recent-tasks"
import { Button } from "@/components/ui/button"
import { Calendar, Download, Play, Sparkles } from "lucide-react"

export default function OverviewPage() {
  return (
    <div className="space-y-6">
      {/* 1. Header de Boas-vindas com Ações Rápidas */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            Olá, João Gabriel <span className="text-lg">👋</span>
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Acompanhe o rendimento tático, horas líquidas e cobertura do edital PPGHS/UERJ.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button variant="outline" size="sm" className="h-8 text-xs font-medium">
            <Download className="mr-1.5 size-3.5" />
            Guia A4 (PDF)
          </Button>
          <Button size="sm" className="h-8 text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90">
            <Play className="mr-1.5 size-3.5 fill-current" />
            Iniciar Pomodoro
          </Button>
        </div>
      </div>

      {/* 2. 4 Cards de Métricas do Aluno */}
      <OverviewMetricsCards />

      {/* 3. Gráficos de Evolução Diária e Distribuição por Tópicos */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <div className="md:col-span-2 lg:col-span-4">
          <StudyAreaChart />
        </div>
        <div className="md:col-span-2 lg:col-span-3">
          <TopicsBarChart />
        </div>
      </div>

      {/* 4. Atividades Recentes e Metas Pendentes */}
      <div>
        <RecentTasks />
      </div>
    </div>
  )
}
