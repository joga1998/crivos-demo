"use client"

import * as React from "react"
import { useDemoData, DemoTextItem } from "@/hooks/use-demo-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Search, ExternalLink, CheckCircle2, Bookmark, FileText } from "lucide-react"

export default function TextosPage() {
  const { data, state, markTextStatus } = useDemoData()
  const texts = data.texts || []

  const [selectedText, setSelectedText] = React.useState<DemoTextItem>(texts[0] || null)
  const [filterPrio, setFilterPrio] = React.useState<string>("")

  const filteredTexts = React.useMemo(() => {
    if (!filterPrio) return texts
    return texts.filter((t) => t.prio === filterPrio)
  }, [texts, filterPrio])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            Bibliografia & Fichamentos
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            12 autores de referência do edital com teses, territoralidade e articulações conceituais.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {["", "ESSENCIAL", "IMPORTANTE", "SECUNDÁRIO"].map((prio) => (
            <Button
              key={prio}
              variant={filterPrio === prio ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterPrio(prio)}
              className="h-8 text-xs font-semibold"
            >
              {prio || "Todos"}
            </Button>
          ))}
        </div>
      </div>

      {/* Layout Split Master-Detail */}
      <div className="grid gap-6 lg:grid-cols-12 items-start">
        {/* Lista Lateral de Autores */}
        <div className="lg:col-span-5 space-y-2.5">
          {filteredTexts.map((text) => {
            const isSelected = selectedText?.id === text.id
            const isDone = state.completedTexts[text.id] === "ok"

            return (
              <div
                key={text.id}
                onClick={() => setSelectedText(text)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? "border-primary bg-accent shadow-sm"
                    : "border-border bg-card hover:border-border/80 hover:bg-accent/40"
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <Badge
                      variant={text.prio === "ESSENCIAL" ? "default" : "secondary"}
                      className="text-[9px] font-mono py-0 h-4"
                    >
                      {text.prio}
                    </Badge>
                    <span className="text-[10px] text-muted-foreground font-mono uppercase">
                      {text.sec === "area" ? "Área Comum" : "Linha 1"}
                    </span>
                  </div>

                  {isDone && (
                    <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-500 font-mono">
                      <CheckCircle2 className="size-3" /> FICHADO
                    </span>
                  )}
                </div>

                <div className="text-xs font-bold text-foreground">{text.autor}</div>
                <div className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">
                  {text.titulo}
                </div>
              </div>
            )
          })}
        </div>

        {/* Painel de Detalhes da Ficha */}
        {selectedText && (
          <Card className="lg:col-span-7 border-border bg-card sticky top-20">
            <CardHeader className="p-6 pb-4 border-b border-border">
              <div className="flex items-center justify-between gap-3 mb-2">
                <Badge variant="outline" className="text-xs font-mono text-primary border-primary/30">
                  {selectedText.prio}
                </Badge>
                <div className="flex items-center gap-2">
                  <a
                    href={`https://www.google.com/search?q=${encodeURIComponent(
                      `${selectedText.autor} ${selectedText.titulo} PDF`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground underline underline-offset-4"
                  >
                    Google ↗
                  </a>
                </div>
              </div>

              <CardTitle className="text-lg font-bold leading-snug">
                {selectedText.autor} — <span className="text-muted-foreground">{selectedText.titulo}</span>
              </CardTitle>
            </CardHeader>

            <CardContent className="p-6 space-y-4">
              {/* Tese Central */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-primary">
                  Tese Central & Eixo Metodológico
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {selectedText.tese}
                </p>
              </div>

              {/* Território */}
              {selectedText.territorio && (
                <div className="space-y-1.5 p-3 rounded-lg bg-secondary/50 border border-border">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-foreground">
                    Território e Categoria Espacial
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {selectedText.territorio}
                  </p>
                </div>
              )}

              {/* Ações */}
              <div className="pt-4 border-t border-border flex items-center justify-between">
                <span className="text-[11px] font-mono text-muted-foreground">
                  Status de Leitura
                </span>
                <Button
                  size="sm"
                  onClick={() =>
                    markTextStatus(
                      selectedText.id,
                      state.completedTexts[selectedText.id] === "ok" ? "pend" : "ok"
                    )
                  }
                  variant={state.completedTexts[selectedText.id] === "ok" ? "secondary" : "default"}
                  className="h-8 text-xs font-semibold"
                >
                  <CheckCircle2 className="mr-1.5 size-3.5" />
                  {state.completedTexts[selectedText.id] === "ok"
                    ? "Marcar como Pendente"
                    : "Concluir Fichamento"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
