"use client"

import * as React from "react"
import { useDemoData } from "@/hooks/use-demo-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BrainCircuit, RotateCcw, ThumbsUp, ThumbsDown, CheckCircle2, Shuffle, Sparkles } from "lucide-react"

interface Flashcard {
  id: string
  pergunta: string
  resposta: string
  autor: string
  categoria: string
  dificuldade: "FÁCIL" | "MÉDIA" | "DIFÍCIL"
}

export default function FlashcardsPage() {
  const { data } = useDemoData()
  const texts = data.texts || []

  // Gera banco de flashcards SM-2 baseado nos autores e teses do edital
  const cardDeck: Flashcard[] = React.useMemo(() => {
    const list: Flashcard[] = []
    texts.forEach((t, idx) => {
      list.push({
        id: `card_${t.id}_1`,
        pergunta: `Qual a tese central defendida por ${t.autor} em sua obra no edital?`,
        resposta: t.tese || "Análise teórico-metodológica de historiografia.",
        autor: t.autor,
        categoria: t.sec === "area" ? "Área Comum" : "Linha 1",
        dificuldade: t.prio === "ESSENCIAL" ? "DIFÍCIL" : "MÉDIA",
      })
      if (t.territorio) {
        list.push({
          id: `card_${t.id}_2`,
          pergunta: `Como ${t.autor} conceitua ou articula a noção de 'Território' / Espaço?`,
          resposta: t.territorio,
          autor: t.autor,
          categoria: "Territorialidade",
          dificuldade: "DIFÍCIL",
        })
      }
    })
    return list
  }, [texts])

  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [showAnswer, setShowAnswer] = React.useState(false)
  const [sessionReviewed, setSessionReviewed] = React.useState(0)

  const currentCard = cardDeck[currentIndex] || cardDeck[0]

  const handleNext = (score: number) => {
    setShowAnswer(false)
    setSessionReviewed((prev) => prev + 1)
    if (currentIndex < cardDeck.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    } else {
      setCurrentIndex(0)
    }
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            Flashcards & Repetição Espaçada (SM-2)
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Fixação ativa de conceitos-chave, teses e categorias da banca examinadora.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs font-mono py-1 px-3">
            Card {currentIndex + 1} de {cardDeck.length}
          </Badge>
          <Badge variant="secondary" className="text-xs font-mono py-1 px-3">
            {sessionReviewed} revisados hoje
          </Badge>
        </div>
      </div>

      {/* Cartão de Flashcard Interativo */}
      {currentCard && (
        <Card className="border-border bg-card shadow-sm transition-all min-h-[340px] flex flex-col justify-between">
          <CardHeader className="p-6 pb-2 border-b border-border flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-[10px] font-mono">
                {currentCard.categoria}
              </Badge>
              <Badge
                variant={currentCard.dificuldade === "DIFÍCIL" ? "default" : "outline"}
                className="text-[10px] font-mono"
              >
                {currentCard.dificuldade}
              </Badge>
            </div>
            <span className="text-xs font-bold text-muted-foreground font-mono">
              {currentCard.autor}
            </span>
          </CardHeader>

          <CardContent className="p-6 flex-1 flex flex-col justify-center text-center space-y-4">
            <div className="text-sm sm:text-base font-semibold text-foreground max-w-2xl mx-auto leading-relaxed">
              {currentCard.pergunta}
            </div>

            {showAnswer ? (
              <div className="p-4 rounded-xl bg-accent/60 border border-border text-xs sm:text-sm text-foreground leading-relaxed max-w-2xl mx-auto animate-in fade-in-50 duration-200">
                <div className="text-[10px] font-bold font-mono text-primary uppercase tracking-widest mb-1.5">
                  RESPOSTA & FUNDAMENTAÇÃO TEÓRICA
                </div>
                {currentCard.resposta}
              </div>
            ) : (
              <div className="pt-4">
                <Button
                  onClick={() => setShowAnswer(true)}
                  variant="outline"
                  size="sm"
                  className="h-9 px-6 text-xs font-semibold shadow-sm hover:bg-accent"
                >
                  <Sparkles className="mr-2 size-3.5 text-primary" />
                  Revelar Resposta (Espaço)
                </Button>
              </div>
            )}
          </CardContent>

          {/* Botões de Feedback SM-2 */}
          {showAnswer && (
            <div className="p-4 border-t border-border bg-muted/30 flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleNext(1)}
                className="h-8 text-xs font-semibold"
              >
                Errei / Difícil (&lt; 1 dia)
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleNext(3)}
                className="h-8 text-xs font-semibold"
              >
                Bom (3 dias)
              </Button>
              <Button
                size="sm"
                onClick={() => handleNext(5)}
                className="h-8 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                Fácil (7 dias)
              </Button>
            </div>
          )}
        </Card>
      )}
    </div>
  )
}
