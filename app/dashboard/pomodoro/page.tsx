"use client"

import * as React from "react"
import { useDemoData } from "@/hooks/use-demo-data"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, RotateCcw, FastForward, CheckCircle2, Clock, Plus } from "lucide-react"

export default function PomodoroPage() {
  const { state, addStudyLog, updatePomoSettings, totalHoursStudied, data } = useDemoData()

  const [mode, setMode] = React.useState<"w" | "b" | "lb">("w")
  const [targetText, setTargetText] = React.useState<string>("")
  const [isRunning, setIsRunning] = React.useState<boolean>(false)
  const [secondsLeft, setSecondsLeft] = React.useState<number>(state.pomo.w * 60)
  const [manualMinutes, setManualMinutes] = React.useState<string>("")
  const [completedSessions, setCompletedSessions] = React.useState<number>(0)

  // Atualiza tempo ao mudar modo
  React.useEffect(() => {
    if (!isRunning) {
      if (mode === "w") setSecondsLeft(state.pomo.w * 60)
      else if (mode === "b") setSecondsLeft(state.pomo.b * 60)
      else setSecondsLeft(state.pomo.lb * 60)
    }
  }, [mode, state.pomo])

  // Timer Tick
  React.useEffect(() => {
    let interval: any = null
    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1)
      }, 1000)
    } else if (secondsLeft === 0 && isRunning) {
      setIsRunning(false)
      // Se terminou foco, registra minutos
      if (mode === "w") {
        addStudyLog(targetText || "geral", state.pomo.w)
        setCompletedSessions((c) => c + 1)
        setMode("b")
        setSecondsLeft(state.pomo.b * 60)
      } else {
        setMode("w")
        setSecondsLeft(state.pomo.w * 60)
      }
    }
    return () => clearInterval(interval)
  }, [isRunning, secondsLeft, mode, state.pomo, targetText])

  const toggleTimer = () => setIsRunning(!isRunning)

  const resetTimer = () => {
    setIsRunning(false)
    if (mode === "w") setSecondsLeft(state.pomo.w * 60)
    else if (mode === "b") setSecondsLeft(state.pomo.b * 60)
    else setSecondsLeft(state.pomo.lb * 60)
  }

  const skipPhase = () => {
    setIsRunning(false)
    if (mode === "w") {
      setMode("b")
      setSecondsLeft(state.pomo.b * 60)
    } else {
      setMode("w")
      setSecondsLeft(state.pomo.w * 60)
    }
  }

  const handleManualAdd = (e: React.FormEvent) => {
    e.preventDefault()
    const val = parseInt(manualMinutes, 10)
    if (!isNaN(val) && val > 0) {
      addStudyLog(targetText || "geral", val)
      setManualMinutes("")
    }
  }

  const mins = Math.floor(secondsLeft / 60)
  const secs = secondsLeft % 60
  const formattedTime = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`

  // Agrupamento de horas por disciplina/texto
  const hoursPerTopic = React.useMemo(() => {
    const acc: Record<string, number> = {}
    state.log.forEach((l) => {
      acc[l.t] = (acc[l.t] || 0) + l.m
    })
    return Object.entries(acc).sort((a, b) => b[1] - a[1])
  }, [state.log])

  return (
    <div className="space-y-6 w-full">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-border/60 pb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-elements">
            Pomodoro & Gestão de Horas Líquidas
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground font-sans">
            Ciclos de foco tático com registro de tempo vinculado ao edital
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="font-mono text-xs px-3 py-1 bg-secondary/50 border-border">
            ACUMULADO: {totalHoursStudied}h
          </Badge>
          <Badge variant="outline" className="font-mono text-xs px-3 py-1 bg-primary/10 text-primary border-primary/30">
            {completedSessions} CICLOS HOJE
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Coluna do Cronômetro */}
        <div className="lg:col-span-7 space-y-4">
          <Card className="border-border/60 bg-card shadow-sm border-l-4 border-l-primary">
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-muted-foreground uppercase font-bold">
                    Alvo Tático da Sessão
                  </span>
                  <select
                    value={targetText}
                    onChange={(e) => setTargetText(e.target.value)}
                    className="w-full sm:w-auto text-xs font-semibold bg-background border border-border/80 rounded px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="">[Alvo Geral / Redação / Metas]</option>
                    {data.texts?.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.autor} ({t.id})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Seletores de Modo */}
                <div className="flex items-center gap-1 bg-muted/60 p-1 rounded-md border border-border/40 font-elements text-xs">
                  <button
                    onClick={() => { setMode("w"); setIsRunning(false); }}
                    className={`px-2.5 py-1 rounded transition-colors ${mode === "w" ? "bg-card text-foreground font-bold shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    Foco ({state.pomo.w}m)
                  </button>
                  <button
                    onClick={() => { setMode("b"); setIsRunning(false); }}
                    className={`px-2.5 py-1 rounded transition-colors ${mode === "b" ? "bg-card text-foreground font-bold shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    Pausa ({state.pomo.b}m)
                  </button>
                  <button
                    onClick={() => { setMode("lb"); setIsRunning(false); }}
                    className={`px-2.5 py-1 rounded transition-colors ${mode === "lb" ? "bg-card text-foreground font-bold shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    Longa ({state.pomo.lb}m)
                  </button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-4 flex flex-col items-center justify-center space-y-6">
              {/* Display de Tempo Grande */}
              <div className="text-center">
                <span className="text-xs font-mono font-bold tracking-widest text-primary uppercase">
                  {mode === "w" ? "SESSÃO DE CONCENTRAÇÃO" : mode === "b" ? "PAUSA CURTA" : "PAUSA LONGA"}
                </span>
                <div className="font-mono text-7xl sm:text-8xl font-black tracking-tight text-foreground my-2 select-none">
                  {formattedTime}
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="flex items-center gap-3">
                <Button
                  size="lg"
                  onClick={toggleTimer}
                  className="font-elements px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-md"
                >
                  {isRunning ? (
                    <>
                      <Pause className="mr-2 size-4 fill-current" /> Pausar
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 size-4 fill-current" /> Iniciar Foco
                    </>
                  )}
                </Button>
                <Button variant="outline" size="icon" onClick={resetTimer} title="Reiniciar Ciclo">
                  <RotateCcw className="size-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={skipPhase} title="Pular Fase">
                  <FastForward className="size-4" />
                </Button>
              </div>

              {/* Lançamento Manual */}
              <form onSubmit={handleManualAdd} className="w-full pt-4 border-t border-border/40 flex items-center justify-between gap-3 flex-wrap">
                <span className="text-xs font-elements text-muted-foreground">
                  Lançamento Manual Rápido:
                </span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Minutos"
                    value={manualMinutes}
                    onChange={(e) => setManualMinutes(e.target.value)}
                    className="w-24 text-xs font-mono bg-background border border-border/80 rounded px-2.5 py-1.5 focus:outline-none"
                    min="1"
                    max="600"
                  />
                  <Button type="submit" size="sm" variant="secondary" className="font-elements text-xs">
                    <Plus className="mr-1 size-3" /> Registrar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Coluna Lateral: Histórico de Sessões e Horas por Disciplina */}
        <div className="lg:col-span-5 space-y-4">
          <Card className="border-border/60 bg-card shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-bold font-elements uppercase tracking-wider">
                Distribuição de Horas por Assunto
              </CardTitle>
              <CardDescription className="text-xs font-sans">
                Tempo acumulado nos autores e tópicos do certame
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {hoursPerTopic.length === 0 ? (
                <p className="text-xs text-muted-foreground font-sans py-4 text-center">
                  Nenhuma sessão registrada ainda.
                </p>
              ) : (
                hoursPerTopic.map(([topic, mins], idx) => {
                  const hrs = (mins / 60).toFixed(1)
                  const pct = Math.min(100, Math.round((mins / (totalHoursStudied * 60 || 1)) * 100))
                  return (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs font-sans">
                        <span className="font-medium text-foreground capitalize truncate max-w-[200px]">
                          {topic}
                        </span>
                        <span className="font-mono text-muted-foreground">{hrs}h ({mins}m)</span>
                      </div>
                      <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  )
                })
              )}
            </CardContent>
          </Card>

          {/* Últimos registros */}
          <Card className="border-border/60 bg-card shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold font-elements uppercase tracking-wider text-muted-foreground">
                Últimos Registros Salvos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {state.log.slice(-4).reverse().map((l, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-border/30 last:border-none">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-emerald-500" />
                    <span className="font-sans font-medium text-foreground capitalize">{l.t}</span>
                  </div>
                  <div className="flex items-center gap-3 font-mono text-[11px] text-muted-foreground">
                    <span>{l.d}</span>
                    <span className="font-bold text-foreground">+{l.m} min</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
