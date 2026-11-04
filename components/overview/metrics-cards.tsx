"use client"

import * as React from "react"
import { TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useDemoData } from "@/hooks/use-demo-data"

export function OverviewMetricsCards() {
  const { totalHoursStudied, completedTextsCount, totalTextsCount, daysUntilExam } = useDemoData()

  const metrics = [
    {
      title: "Total Revenue / Horas",
      value: `${totalHoursStudied}h`,
      change: "+12.5%",
      changeType: "positive",
      line1: "Trending up this month",
      line2: "Produtividade dos últimos 21 dias",
    },
    {
      title: "Autores Concluídos",
      value: `${completedTextsCount} / ${totalTextsCount}`,
      change: `${Math.round((completedTextsCount / totalTextsCount) * 100)}%`,
      changeType: "positive",
      line1: "Cobertura do edital",
      line2: "Meta: 12 fichamentos críticos",
    },
    {
      title: "Cards Fator SM-2",
      value: "148",
      change: "+94.2%",
      changeType: "positive",
      line1: "Strong user retention",
      line2: "Índice de retenção a longo prazo",
    },
    {
      title: "D-Dia (Prova)",
      value: `${daysUntilExam} dias`,
      change: "Fase 02",
      changeType: "neutral",
      line1: "Ciclo de consolidação",
      line2: "Simulados e arguição oral",
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((m, idx) => (
        <Card key={idx} className="border-border/60 bg-card shadow-sm">
          <CardContent className="p-5 flex flex-col justify-between h-full space-y-3">
            {/* Top row: Title + Trend Badge */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">
                {m.title}
              </span>
              <div className="flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
                {m.changeType === "positive" ? (
                  <TrendingUp className="size-3 text-emerald-400" />
                ) : m.changeType === "negative" ? (
                  <TrendingDown className="size-3 text-rose-500" />
                ) : null}
                <span className="font-mono text-foreground font-semibold">{m.change}</span>
              </div>
            </div>

            {/* Main Value */}
            <div className="text-2xl font-bold tracking-tight text-foreground">
              {m.value}
            </div>

            {/* Bottom 2 lines of subtle subtext */}
            <div className="space-y-0.5 text-xs text-muted-foreground pt-1 border-t border-border/40">
              <p className="font-medium text-foreground/80 flex items-center gap-1 text-[11px]">
                {m.line1}
              </p>
              <p className="text-[11px] text-muted-foreground">
                {m.line2}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
