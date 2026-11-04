"use client"

import * as React from "react"
import { useDemoData } from "@/hooks/use-demo-data"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, CheckSquare, Clock, FileEdit, Award } from "lucide-react"

export default function SimuladosPage() {
  const { data, state, saveSimulado } = useDemoData()
  const simulados = data.sim || []

  const [activeQuestionIdx, setActiveQuestionIdx] = React.useState<number>(0)
  const [answers, setAnswers] = React.useState<Record<number, string>>({})
  const [simTimerSeconds, setSimTimerSeconds] = React.useState<number>(4800) // 80 minutos
  const [isSimRunning, setIsSimRunning] = React.useState<boolean>(false)
  const [submitted, setSubmitted] = React.useState<boolean>(false)

  // Timer do simulado
  React.useEffect(() => {
    let interval: any = null
    if (isSimRunning && simTimerSeconds > 0) {
      interval = setInterval(() => {
        setSimTimerSeconds((prev) => prev - 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isSimRunning, simTimerSeconds])

  const curQuestion = simulados[activeQuestionIdx] || simulados[0]

  const handleAnswerChange = (text: string) => {
    setAnswers((prev) => ({ ...prev, [activeQuestionIdx]: text }))
  }

  const handleFinishSimulado = () => {
    setIsSimRunning(false)
    saveSimulado(answers)
    setSubmitted(true)
  }

  const mins = Math.floor(simTimerSeconds / 60)
  const secs = simTimerSeconds % 60
  const formattedTimer = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`

  const currentAnswer = answers[activeQuestionIdx] || ""
  const wordCount = currentAnswer.trim() ? currentAnswer.trim().split(/\s+/).length : 0

  return (
    <div className="space-y-6 w-full">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-border/60 pb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-elements">
            Simulado Dissertativo Oficial
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground font-sans">
            Treinamento de redação sob pressão de tempo (80 minutos) com critérios oficiais da banca
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="font-mono text-lg font-bold text-primary bg-primary/10 px-3 py-1 rounded border border-primary/20">
            {formattedTimer}
          </div>
          <Button
            size="sm"
            onClick={() => setIsSimRunning(!isSimRunning)}
            className="font-elements text-xs bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
          >
            {isSimRunning ? "Pausar Tempo" : "Iniciar Prova"}
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleFinishSimulado}
            className="font-elements text-xs border-emerald-500/40 text-emerald-500 hover:bg-emerald-500/10"
          >
            Finalizar e Salvar
          </Button>
        </div>
      </div>

      {submitted ? (
        <Card className="border-border/60 bg-card p-8 text-center space-y-4">
          <Award className="size-16 text-emerald-500 mx-auto" />
          <h3 className="text-xl font-bold font-elements text-foreground">
            Simulado Salvo com Sucesso!
          </h3>
          <p className="text-xs text-muted-foreground font-sans max-w-md mx-auto">
            Sua resposta dissertativa foi salva localmente no histórico. Compare agora com a rubrica oficial de correção abaixo.
          </p>
          <Button onClick={() => setSubmitted(false)} variant="outline" className="font-elements text-xs">
            Continuar Editando
          </Button>
        </Card>
      ) : (
        <div className="space-y-4">
          {/* Seletor de Questões do Simulado */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 font-elements text-xs">
            {simulados.map((q, idx) => {
              const isSelected = activeQuestionIdx === idx
              const words = (answers[idx] || "").trim() ? (answers[idx] || "").trim().split(/\s+/).length : 0
              return (
                <button
                  key={idx}
                  onClick={() => setActiveQuestionIdx(idx)}
                  className={`px-3 py-2 rounded-md border font-semibold transition-all ${isSelected ? "border-primary bg-card text-foreground shadow-sm" : "border-border/60 bg-muted/40 text-muted-foreground hover:text-foreground"}`}
                >
                  Questão 0{idx + 1} · {q.sec === "area" ? "Área" : "Linha 1"}
                  <span className="ml-1.5 font-mono text-[10px] text-primary">
                    ({words} pal.)
                  </span>
                </button>
              )
            })}
          </div>

          {/* Enunciado da Questão */}
          {curQuestion && (
            <Card className="border-border/60 bg-card shadow-sm">
              <CardHeader className="pb-3 border-b border-border/40">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-primary uppercase">
                    ENUNCIADO DA QUESTÃO 0{activeQuestionIdx + 1}
                  </span>
                  <Badge variant="outline" className="font-mono text-[10px]">
                    {wordCount} PALAVRAS ESCRITAS
                  </Badge>
                </div>
                <CardTitle className="text-sm sm:text-base font-bold font-sans text-foreground leading-relaxed pt-1">
                  {curQuestion.q}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                {/* Área de Redação */}
                <textarea
                  rows={14}
                  value={currentAnswer}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                  placeholder="Redija aqui sua resposta dissertativa sem consulta, articulando os autores indicados com o conceito de território..."
                  className="w-full text-sm font-sans bg-background border border-border/80 rounded-md p-3.5 focus:outline-none focus:ring-1 focus:ring-primary leading-relaxed font-normal"
                />

                {/* Rubrica & Expectativa da Banca */}
                {curQuestion.expectativa && (
                  <div className="p-3.5 rounded-md bg-secondary/30 border border-border/40 space-y-1.5">
                    <span className="font-elements font-bold text-[11px] text-foreground uppercase tracking-wider">
                      Expectativa de Resposta da Banca:
                    </span>
                    <p className="text-xs text-muted-foreground font-sans leading-relaxed">
                      {curQuestion.expectativa}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
