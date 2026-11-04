"use client"

import * as React from "react"
import { useDemoData } from "@/hooks/use-demo-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Circle, Clock, Flame, Calendar as CalIcon } from "lucide-react"

export default function CronogramaPage() {
  const { data, state, toggleDayTask } = useDemoData()
  const sched = data.sched || []

  const [selectedWeek, setSelectedWeek] = React.useState<number>(1)

  // Divide as tarefas em 12 semanas (7 dias por semana)
  const weeks = React.useMemo(() => {
    const list: typeof sched[] = []
    const sorted = [...sched].sort((a, b) => a.d.localeCompare(b.d))
    for (let w = 0; w < 12; w++) {
      list.push(sorted.slice(w * 7, (w + 1) * 7))
    }
    return list
  }, [sched])

  const currentWeekTasks = weeks[selectedWeek - 1] || []

  // Total de tarefas concluídas no cronograma
  const completedTasksCount = Object.keys(state.days).filter((k) => state.days[Number(k)] === "done").length
  const totalTasksCount = sched.length || 84

  return (
    <div className="space-y-6 w-full">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-border/60 pb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-elements">
            Cronograma Tático de 12 Semanas
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground font-sans">
            Ciclo diário de metas, leituras analíticas, fichamentos e revisões D+1/D+7
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="font-mono text-xs px-2.5 py-1 bg-secondary/50 border-border">
            CONCLUÍDO: {completedTasksCount} / {totalTasksCount} DIAS ({Math.round((completedTasksCount / totalTasksCount) * 100)}%)
          </Badge>
        </div>
      </div>

      {/* Seletor de Semanas 1 a 12 */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none font-elements">
        {Array.from({ length: 12 }, (_, i) => i + 1).map((w) => {
          const isSelected = selectedWeek === w
          // Contagem de concluídos na semana
          const weekTasks = weeks[w - 1] || []
          const weekDone = weekTasks.filter((t) => state.days[t.i] === "done").length

          return (
            <button
              key={w}
              onClick={() => setSelectedWeek(w)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-md text-xs font-semibold border transition-all ${isSelected ? "border-primary bg-primary text-primary-foreground shadow-sm" : "border-border/60 bg-card hover:bg-accent text-muted-foreground hover:text-foreground"}`}
            >
              Semana {w}
              <span className={`ml-1.5 text-[10px] font-mono ${isSelected ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                ({weekDone}/7)
              </span>
            </button>
          )
        })}
      </div>

      {/* Grid de Dias da Semana Selecionada */}
      <div className="space-y-3">
        {currentWeekTasks.map((task) => {
          const isDone = state.days[task.i] === "done"

          return (
            <div
              key={task.i}
              className={`rounded-lg border p-4 transition-all flex flex-col sm:flex-row sm:items-start justify-between gap-4 ${isDone ? "border-border/40 bg-accent/20 opacity-80" : "border-border/80 bg-card shadow-sm hover:border-primary/40"}`}
            >
              <div className="flex items-start gap-3.5 min-w-0 flex-1">
                {/* Botão de Toggle Real */}
                <button
                  type="button"
                  onClick={() => toggleDayTask(task.i)}
                  className="mt-0.5 text-muted-foreground hover:text-primary transition-colors shrink-0"
                  title={isDone ? "Marcar como pendente" : "Marcar como concluído"}
                >
                  {isDone ? (
                    <CheckCircle2 className="size-5 text-emerald-500 fill-emerald-500/10" />
                  ) : (
                    <Circle className="size-5 text-muted-foreground" />
                  )}
                </button>

                <div className="space-y-1.5 min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs font-bold text-foreground">
                      {task.d}
                    </span>
                    <Badge variant="outline" className="text-[10px] font-mono py-0 h-4 border-border">
                      {task.h}h planejadas
                    </Badge>
                    {isDone && (
                      <span className="text-[10px] font-elements font-bold text-emerald-500 uppercase">
                        Concluído
                      </span>
                    )}
                  </div>

                  {/* Descrição rica da meta */}
                  <div
                    className={`text-xs font-sans leading-relaxed text-muted-foreground ${isDone ? "line-through opacity-70" : "text-foreground/90"}`}
                    dangerouslySetInnerHTML={{ __html: task.t }}
                  />
                </div>
              </div>

              {/* Botão lateral de ação */}
              <div className="shrink-0 flex items-center justify-end sm:flex-col sm:items-end gap-2">
                <Button
                  size="sm"
                  variant={isDone ? "ghost" : "outline"}
                  onClick={() => toggleDayTask(task.i)}
                  className="h-7 text-xs font-elements"
                >
                  {isDone ? "Desmarcar" : "Concluir Meta"}
                </Button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
