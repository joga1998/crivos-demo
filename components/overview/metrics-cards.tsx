"use client"

import * as React from "react"
import { Clock, BookCheck, BrainCircuit, Calendar, TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useDemoData } from "@/hooks/use-demo-data"

export function OverviewMetricsCards() {
  const { totalHoursStudied, completedTextsCount, totalTextsCount, daysUntilExam } = useDemoData()

  const metrics = [
    {
      title: "Horas Líquidas Acumuladas",
      value: `${totalHoursStudied}h`,
      change: "+12.5%",
      changeType: "positive",
      description: "Produtividade dos últimos 21 dias",
      icon: Clock,
    },
    {
      title: "Autores & Fichamentos Concluídos",
      value: `${completedTextsCount} / ${totalTextsCount}`,
      change: `${Math.round((completedTextsCount / totalTextsCount) * 100)}%`,
      changeType: "positive",
      description: "Cobertura da bibliografia oficial",
      icon: BookCheck,
    },
    {
      title: "Cards no Fator SM-2",
      value: "148",
      change: "94.2%",
      changeType: "positive",
      description: "Índice de retenção a longo prazo",
      icon: BrainCircuit,
    },
    {
      title: "Contagem Regressiva (D-Dia)",
      value: `${daysUntilExam} dias`,
      change: "Fase 02",
      changeType: "neutral",
      description: "Ciclo de consolidação e simulados",
      icon: Calendar,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((m, idx) => {
        const Icon = m.icon
        return (
          <Card key={idx} className="relative overflow-hidden border-border bg-card">
            <CardContent className="p-5">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {m.title}
                </span>
                <div className="flex items-center gap-1 rounded bg-secondary px-1.5 py-0.5 text-[10px] font-semibold text-secondary-foreground font-mono">
                  {m.changeType === "positive" ? (
                    <TrendingUp className="size-3 text-emerald-500" />
                  ) : m.changeType === "negative" ? (
                    <TrendingDown className="size-3 text-rose-500" />
                  ) : null}
                  <span>{m.change}</span>
                </div>
              </div>
              <div className="flex items-baseline justify-between pt-1">
                <div className="text-2xl font-bold tracking-tight text-foreground font-mono">
                  {m.value}
                </div>
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-4" />
                </div>
              </div>
              <p className="text-[11px] text-muted-foreground pt-1">
                {m.description}
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
