"use client"

import * as React from "react"
import { useDemoData } from "@/hooks/use-demo-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RotateCw, CheckCircle, Flame, Sparkles } from "lucide-react"

export default function FlashcardsPage() {
  const { cards, state, gradeCardSM2 } = useDemoData()

  // Fila de revisão de hoje
  const queue = React.useMemo(() => {
    const today = new Date().toISOString().slice(0, 10)
    // Cards agendados para hoje ou sem revisão prévia
    const due = cards.filter((c) => state.cards[c.id] && state.cards[c.id].due <= today)
    const nw = cards.filter((c) => !state.cards[c.id])
    return [...due, ...nw]
  }, [cards, state.cards])

  const [currentIndex, setCurrentIndex] = React.useState<number>(0)
  const [showAnswer, setShowAnswer] = React.useState<boolean>(false)

  const currentCard = queue[currentIndex] || null

  const handleRate = (grade: number) => {
    if (!currentCard) return
    gradeCardSM2(currentCard.id, grade)
    setShowAnswer(false)
    setCurrentIndex((prev) => prev + 1)
  }

  // Atalhos de teclado (Espaço para virar, 1-4 para avaliar)
  React.useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      if (e.key === " ") {
        e.preventDefault()
        setShowAnswer((prev) => !prev)
      } else if (showAnswer) {
        if (e.key === "1") handleRate(0)
        else if (e.key === "2") handleRate(3)
        else if (e.key === "3") handleRate(4)
        else if (e.key === "4") handleRate(5)
      }
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [showAnswer, currentCard])

  const cardsReviewedCount = Object.keys(state.cards).length

  return (
    <div className="space-y-6 w-full max-w-4xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-border/60 pb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-elements flex items-center gap-2">
            Flashcards & Repetição Espaçada SM-2
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground font-sans">
            Algoritmo canônico de retenção a longo prazo de teses, conceitos e citações da banca
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="font-mono text-xs px-2.5 py-1 bg-secondary/50 border-border">
            FILA: {queue.length - currentIndex} RESTANTES
          </Badge>
          <Badge variant="outline" className="font-mono text-xs px-2.5 py-1 bg-primary/10 text-primary border-primary/30">
            {cardsReviewedCount} APRENDIDOS
          </Badge>
        </div>
      </div>

      {currentCard ? (
        <div className="space-y-4">
          {/* Card Principal SM-2 */}
          <div
            onClick={() => setShowAnswer(!showAnswer)}
            className="group cursor-pointer select-none rounded-xl border border-border/80 bg-card p-6 sm:p-10 shadow-sm transition-all hover:border-primary/50 min-h-[300px] flex flex-col justify-between"
          >
            {/* Top Info */}
            <div className="flex items-center justify-between border-b border-border/30 pb-3">
              <span className="text-[11px] font-mono font-bold text-primary uppercase">
                {currentCard.t} · #{currentCard.id}
              </span>
              <span className="text-xs text-muted-foreground font-sans flex items-center gap-1 group-hover:text-foreground">
                <RotateCw className="size-3.5" /> Clique ou aperte [ESPAÇO] para virar
              </span>
            </div>

            {/* Conteúdo (Frente / Verso) */}
            <div className="py-6 text-center">
              <div className="text-lg sm:text-2xl font-bold font-elements text-foreground leading-relaxed">
                {currentCard.f}
              </div>

              {showAnswer && (
                <div className="mt-6 pt-6 border-t border-border/40 text-base sm:text-lg font-sans text-primary font-medium leading-relaxed animate-in fade-in-50 duration-200">
                  {currentCard.b}
                </div>
              )}
            </div>

            {/* Rodapé do Card */}
            <div className="flex items-center justify-between pt-3 border-t border-border/30 text-xs text-muted-foreground font-mono">
              <span>Card {currentIndex + 1} de {queue.length}</span>
              <span>{showAnswer ? "Selecione o grau de facilidade abaixo" : "Resposta oculta"}</span>
            </div>
          </div>

          {/* Botões de Ação SM-2 */}
          {showAnswer ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 animate-in fade-in-0 duration-150">
              <Button
                variant="outline"
                onClick={() => handleRate(0)}
                className="h-12 border-rose-500/40 text-rose-500 hover:bg-rose-500/10 font-elements flex flex-col items-center justify-center py-1"
              >
                <span className="font-bold text-xs">[1] Errei</span>
                <span className="text-[10px] font-mono opacity-70">&lt; 1 dia</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => handleRate(3)}
                className="h-12 border-amber-500/40 text-amber-500 hover:bg-amber-500/10 font-elements flex flex-col items-center justify-center py-1"
              >
                <span className="font-bold text-xs">[2] Difícil</span>
                <span className="text-[10px] font-mono opacity-70">1 a 2 dias</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => handleRate(4)}
                className="h-12 border-blue-500/40 text-blue-500 hover:bg-blue-500/10 font-elements flex flex-col items-center justify-center py-1"
              >
                <span className="font-bold text-xs">[3] Bom</span>
                <span className="text-[10px] font-mono opacity-70">3 a 5 dias</span>
              </Button>
              <Button
                onClick={() => handleRate(5)}
                className="h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-elements flex flex-col items-center justify-center py-1 shadow-sm"
              >
                <span className="font-bold text-xs">[4] Fácil</span>
                <span className="text-[10px] font-mono opacity-70">+7 dias</span>
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => setShowAnswer(true)}
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-elements font-bold text-sm tracking-wide shadow-sm"
            >
              [REVELAR RESPOSTA · ESPAÇO]
            </Button>
          )}
        </div>
      ) : (
        <Card className="border-border/60 bg-card p-12 text-center space-y-4">
          <div className="flex justify-center">
            <CheckCircle className="size-16 text-emerald-500 animate-bounce" />
          </div>
          <h3 className="text-xl font-bold font-elements text-foreground">
            Fila de Flashcards do Dia Concluída!
          </h3>
          <p className="text-sm text-muted-foreground font-sans max-w-md mx-auto">
            Você revisou todos os cards pendentes para hoje pelo algoritmo SM-2. Volte amanhã para o próximo ciclo de repetição espaçada.
          </p>
          <Button
            variant="outline"
            onClick={() => setCurrentIndex(0)}
            className="font-elements text-xs mt-2"
          >
            Revisar Todos Novamente
          </Button>
        </Card>
      )}
    </div>
  )
}
