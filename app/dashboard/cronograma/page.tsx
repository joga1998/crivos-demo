"use client"

import * as React from "react"
import { useDemoData } from "@/hooks/use-demo-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar as CalendarIcon, Clock, CheckCircle2, ChevronRight, AlertCircle, ArrowUpRight } from "lucide-react"

export default function CronogramaPage() {
  const { data } = useDemoData()
  const sched = data.sched || []

  // Agrupa os dias por semanas (blocos de 7 dias)
  const weeks = React.useMemo(() => {
    const list = []
    for (let i = 0; i < sched.length; i += 7) {
      list.push(sched.slice(i, i + 7))
    }
    return list
  }, [sched])

  const [selectedWeek, setSelectedWeek] = React.useState(0)
  const activeDays = weeks[selectedWeek] || []

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            Cronograma Executivo Tático
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Plano dia a dia de 12 semanas pós-edital com metas diárias e horas sugeridas.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs font-mono py-1 px-2.5">
            {sched.length} DIAS PLANEJADOS
          </Badge>
        </div>
      </div>

      {/* Seletor de Semanas em Pílulas */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-border">
        {weeks.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedWeek(idx)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedWeek === idx
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-secondary text-secondary-foreground hover:bg-accent"
            }`}
          >
            Semana {String(idx + 1).padStart(2, "0")}
          </button>
        ))}
      </div>

      {/* Grid de Dias da Semana Selecionada */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {activeDays.map((item, idx) => {
          const rawText = item.t.replace(/<[^>]*>/g, "")
          return (
            <Card key={idx} className="border-border bg-card hover:border-primary/50 transition-colors">
              <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="size-4 text-primary" />
                  <span className="text-xs font-bold font-mono">{item.d}</span>
                </div>
                <Badge variant="secondary" className="text-[10px] font-mono">
                  {item.h}h sugeridas
                </Badge>
              </CardHeader>
              <CardContent className="p-4 pt-2">
                <p className="text-xs text-foreground font-medium leading-relaxed">
                  {rawText}
                </p>
                <div className="mt-3 flex items-center justify-between pt-2 border-t border-border/60">
                  <span className="text-[10px] text-muted-foreground font-mono">Dia #{item.i + 1}</span>
                  <Button variant="ghost" size="sm" className="h-6 px-2 text-[11px] text-primary hover:text-primary">
                    Concluir <CheckCircle2 className="ml-1 size-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
