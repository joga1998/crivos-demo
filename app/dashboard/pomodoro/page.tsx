"use client"

import * as React from "react"
import { useDemoData } from "@/hooks/use-demo-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Timer as TimerIcon, Play, Pause, RotateCcw, SkipForward, PlusCircle, CheckCircle2 } from "lucide-react"

export default function PomodoroPage() {
  const { data, addStudyMinutes, totalHoursStudied } = useDemoData()
  const texts = data.texts || []

  const [mode, setMode] = React.useState<"foco" | "pausa">("foco")
  const [timeLeft, setTimeLeft] = React.useState(25 * 60)
  const [isRunning, setIsRunning] = React.useState(false)
  const [selectedText, setSelectedText] = React.useState<string>(texts[0]?.id || "")
  const [cyclesCompleted, setCyclesCompleted] = React.useState(0)
  const [manualMinutes, setManualMinutes] = React.useState("")

  React.useEffect(() => {
    let interval: any = null
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      if (mode === "foco") {
        addStudyMinutes(selectedText, 25)
        setCyclesCompleted((prev) => prev + 1)
        setMode("pausa")
        setTimeLeft(5 * 60)
      } else {
        setMode("foco")
        setTimeLeft(25 * 60)
      }
      setIsRunning(false)
    }
    return () => clearInterval(interval)
  }, [isRunning, timeLeft, mode, selectedText, addStudyMinutes])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`

  const handleManualAdd = (e: React.FormEvent) => {
    e.preventDefault()
    const val = Number(manualMinutes)
    if (val > 0 && selectedText) {
      addStudyMinutes(selectedText, val)
      setManualMinutes("")
    }
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            Pomodoro & Gestão de Horas Líquidas
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Cronômetro de imersão profunda com vinculação de sessões a autores e disciplinas.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs font-mono py-1 px-3">
            Total Acumulado: {totalHoursStudied}h
          </Badge>
          <Badge variant="secondary" className="text-xs font-mono py-1 px-3">
            {cyclesCompleted} ciclos concluídos
          </Badge>
        </div>
      </div>

      {/* Grid Principal do Pomodoro */}
      <div className="grid gap-6 md:grid-cols-12 items-start">
        {/* Painel Central do Timer */}
        <Card className="md:col-span-8 border-border bg-card">
          <CardHeader className="p-6 pb-2 border-b border-border">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono uppercase tracking-wider text-primary">
                {mode === "foco" ? "Sessão de Foco Ativo" : "Pausa Reparadora"}
              </span>
              <div className="flex gap-1">
                <Button
                  variant={mode === "foco" ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setMode("foco")
                    setTimeLeft(25 * 60)
                    setIsRunning(false)
                  }}
                  className="h-7 text-[11px]"
                >
                  Foco (25m)
                </Button>
                <Button
                  variant={mode === "pausa" ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setMode("pausa")
                    setTimeLeft(5 * 60)
                    setIsRunning(false)
                  }}
                  className="h-7 text-[11px]"
                >
                  Pausa (5m)
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-8 text-center space-y-6">
            {/* Display do Relógio */}
            <div className="text-6xl sm:text-8xl font-black font-mono tracking-tight text-foreground select-none">
              {formattedTime}
            </div>

            {/* Seletor de Autor Vinculado */}
            <div className="max-w-xs mx-auto text-left space-y-1">
              <label className="text-[10px] font-bold font-mono text-muted-foreground uppercase">
                Alvo Tático Vinculado:
              </label>
              <select
                value={selectedText}
                onChange={(e) => setSelectedText(e.target.value)}
                className="w-full text-xs font-semibold rounded-lg border border-border bg-secondary p-2 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              >
                {texts.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.autor} ({t.prio})
                  </option>
                ))}
              </select>
            </div>

            {/* Controles Principais */}
            <div className="flex items-center justify-center gap-3 pt-2">
              <Button
                onClick={() => setIsRunning(!isRunning)}
                size="lg"
                className="h-11 px-8 text-sm font-bold bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {isRunning ? (
                  <>
                    <Pause className="mr-2 size-4" /> Pausar
                  </>
                ) : (
                  <>
                    <Play className="mr-2 size-4 fill-current" /> Iniciar Foco
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  setIsRunning(false)
                  setTimeLeft(mode === "foco" ? 25 * 60 : 5 * 60)
                }}
                className="h-11 px-4 text-xs font-semibold"
              >
                <RotateCcw className="size-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  setIsRunning(false)
                  if (mode === "foco") {
                    setMode("pausa")
                    setTimeLeft(5 * 60)
                  } else {
                    setMode("foco")
                    setTimeLeft(25 * 60)
                  }
                }}
                className="h-11 px-4 text-xs font-semibold"
              >
                <SkipForward className="size-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Lançamento Manual & Dicas */}
        <div className="md:col-span-4 space-y-4">
          <Card className="border-border bg-card">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-xs font-bold uppercase tracking-wider">
                Lançamento Rápido Manual
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <form onSubmit={handleManualAdd} className="space-y-3">
                <input
                  type="number"
                  placeholder="Minutos estudados (ex: 45)"
                  value={manualMinutes}
                  onChange={(e) => setManualMinutes(e.target.value)}
                  className="w-full text-xs font-medium rounded-lg border border-border bg-secondary p-2 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <Button type="submit" size="sm" className="w-full h-8 text-xs font-semibold">
                  <PlusCircle className="mr-1.5 size-3.5" /> Registrar Tempo
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-xs font-bold uppercase tracking-wider">
                Regra Tática dos 25/5
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-1">
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Estude em blocos de alta intensidade de 25 minutos sem interrupções. A cada 4 blocos concluídos, tire uma pausa prolongada de 15 minutos para reciclagem cognitiva.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
