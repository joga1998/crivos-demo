"use client"

import * as React from "react"
import { useDemoData } from "@/hooks/use-demo-data"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mic, CheckCircle2, AlertTriangle, Play, Pause, RotateCcw } from "lucide-react"

export default function ArguicaoPage() {
  const { data, state, rateArguicao } = useDemoData()
  const arguicoes = data.arg || []

  const [selectedIdx, setSelectedIdx] = React.useState<number>(0)
  const [selectedCat, setSelectedCat] = React.useState<string>("TODAS")
  const [timerSeconds, setTimerSeconds] = React.useState<number>(180) // 3 minutos por resposta
  const [isRunning, setIsRunning] = React.useState<boolean>(false)

  const categories = React.useMemo(() => {
    const set = new Set<string>()
    arguicoes.forEach((a) => {
      if (a.cat) set.add(a.cat)
    })
    return ["TODAS", ...Array.from(set)]
  }, [arguicoes])

  const filtered = React.useMemo(() => {
    return arguicoes.filter((a) => selectedCat === "TODAS" || a.cat === selectedCat)
  }, [arguicoes, selectedCat])

  const currentQ = filtered[selectedIdx] || filtered[0]

  // Timer de resposta oral
  React.useEffect(() => {
    let int: any = null
    if (isRunning && timerSeconds > 0) {
      int = setInterval(() => setTimerSeconds((prev) => prev - 1), 1000)
    }
    return () => clearInterval(int)
  }, [isRunning, timerSeconds])

  const handleRate = (conf: number) => {
    if (!currentQ) return
    const originalIndex = arguicoes.indexOf(currentQ)
    rateArguicao(originalIndex >= 0 ? originalIndex : selectedIdx, conf)
    if (selectedIdx < filtered.length - 1) {
      setSelectedIdx((prev) => prev + 1)
      setTimerSeconds(180)
      setIsRunning(false)
    }
  }

  const mins = Math.floor(timerSeconds / 60)
  const secs = timerSeconds % 60
  const formattedTimer = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`

  const trainedCount = Object.keys(state.args).length

  return (
    <div className="space-y-6 w-full">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-border/60 pb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-elements flex items-center gap-2">
            <Mic className="size-5 text-primary" /> Arguição Oral & Defesa de Projeto
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground font-sans">
            Simulador de perguntas da banca examinadora com cronômetro de sustentação oral
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="font-mono text-xs px-2.5 py-1 bg-secondary/50 border-border">
            {trainedCount} / {arguicoes.length} PERGUNTAS TREINADAS
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Coluna Master: Lista de Perguntas */}
        <div className="lg:col-span-5 space-y-3">
          {/* Seletor de Categoria */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 text-[11px] font-elements">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setSelectedCat(cat); setSelectedIdx(0); }}
                className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${selectedCat === cat ? "bg-primary text-primary-foreground font-bold" : "bg-card border border-border/60 text-muted-foreground hover:text-foreground"}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Lista de Perguntas */}
          <div className="space-y-2 max-h-[580px] overflow-y-auto pr-1">
            {filtered.map((item, idx) => {
              const isSelected = selectedIdx === idx
              const originalIndex = arguicoes.indexOf(item)
              const saved = state.args[originalIndex]

              return (
                <div
                  key={idx}
                  onClick={() => { setSelectedIdx(idx); setTimerSeconds(180); setIsRunning(false); }}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${isSelected ? "border-primary bg-accent/40 shadow-sm" : "border-border/60 bg-card hover:border-border hover:bg-accent/20"}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-mono text-[10px] text-primary font-bold uppercase">
                      {item.cat || "BANCA"} · #{idx + 1}
                    </span>
                    {saved && (
                      <Badge variant="outline" className="text-[9px] font-mono py-0 h-4 border-emerald-500/40 text-emerald-500 bg-emerald-500/10">
                        TREINADA ({saved.c}/4)
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs font-sans font-medium text-foreground line-clamp-2 mt-1">
                    {item.q}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Coluna Detail: Pergunta Ativa + Cronômetro de Sustentação */}
        {currentQ && (
          <div className="lg:col-span-7 space-y-4">
            <Card className="border-border/60 bg-card shadow-sm border-t-4 border-t-primary">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-primary uppercase">
                    SUSTENTAÇÃO ORAL EM TEMPO REAL
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-foreground bg-muted/60 px-2 py-0.5 rounded border border-border/40">
                      {formattedTimer}
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setIsRunning(!isRunning)}
                      className="h-7 text-xs font-elements"
                    >
                      {isRunning ? <Pause className="size-3 mr-1" /> : <Play className="size-3 mr-1" />}
                      {isRunning ? "Pausar" : "Gravar Tempo"}
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => { setTimerSeconds(180); setIsRunning(false); }}
                      className="h-7 w-7 text-muted-foreground"
                    >
                      <RotateCcw className="size-3" />
                    </Button>
                  </div>
                </div>

                <CardTitle className="text-base sm:text-lg font-bold font-sans text-foreground leading-relaxed pt-2">
                  "{currentQ.q}"
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4 font-sans text-xs">
                {/* Roteiro e Resposta Recomendada */}
                {currentQ.resp && (
                  <div className="space-y-1.5 p-3 rounded-md bg-secondary/30 border border-border/40">
                    <span className="font-elements font-bold text-[11px] text-foreground uppercase tracking-wider">
                      Linha de Resposta Recomendada (Roteiro da Banca):
                    </span>
                    <p className="text-xs text-muted-foreground font-sans leading-relaxed">
                      {currentQ.resp}
                    </p>
                  </div>
                )}

                {/* Avaliação de Desempenho Oral */}
                <div className="pt-3 border-t border-border/40 space-y-2">
                  <span className="font-elements font-semibold text-muted-foreground block">
                    Como foi seu domínio ao responder verbalmente?
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-elements">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRate(1)}
                      className="border-rose-500/40 text-rose-500 hover:bg-rose-500/10 text-xs"
                    >
                      1 · Inseguro
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRate(2)}
                      className="border-amber-500/40 text-amber-500 hover:bg-amber-500/10 text-xs"
                    >
                      2 · Regular
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRate(3)}
                      className="border-blue-500/40 text-blue-500 hover:bg-blue-500/10 text-xs"
                    >
                      3 · Firme
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleRate(4)}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs"
                    >
                      4 · Excelente
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
