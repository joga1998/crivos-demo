"use client"

import * as React from "react"
import { useDemoData } from "@/hooks/use-demo-data"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Network, Layers, GitFork } from "lucide-react"

export default function ConexoesPage() {
  const { data } = useDemoData()
  const texts = data.texts || []
  const axes = data.tabs || []

  const [selectedAxisIdx, setSelectedAxisIdx] = React.useState<number>(0)
  const [selectedAuthorId, setSelectedAuthorId] = React.useState<string>(texts[0]?.id || "haesbaert")

  const currentAxis = axes[selectedAxisIdx] || axes[0]
  const selectedText = texts.find((t) => t.id === selectedAuthorId) || texts[0]

  return (
    <div className="space-y-6 w-full">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-border/60 pb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-elements flex items-center gap-2">
            <Network className="size-5 text-primary" /> Conexões Interdisciplinares & Eixos Transversais
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground font-sans">
            Pontes conceituais, aproximações e tensões teóricas entre os autores cobrados no edital
          </p>
        </div>
      </div>

      {/* Seletor de Eixos Transversais */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 font-elements text-xs">
          {axes.map((ax, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedAxisIdx(idx)}
              className={`px-3 py-2 rounded-md border font-semibold transition-all whitespace-nowrap ${selectedAxisIdx === idx ? "border-primary bg-primary text-primary-foreground shadow-sm" : "border-border/60 bg-card text-muted-foreground hover:text-foreground"}`}
            >
              {idx + 1}. {ax.t}
            </button>
          ))}
        </div>

        {/* Quadro Comparativo do Eixo */}
        {currentAxis && currentAxis.rows && (
          <Card className="border-border/60 bg-card shadow-sm overflow-hidden">
            <CardHeader className="pb-3 border-b border-border/40">
              <CardTitle className="text-base font-bold font-elements text-foreground">
                Eixo Temático: {currentAxis.t}
              </CardTitle>
              <CardDescription className="text-xs font-sans text-muted-foreground">
                Matriz de comparação analítica entre abordagens teóricas
              </CardDescription>
            </CardHeader>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-secondary/40 border-b border-border/60 text-muted-foreground font-elements uppercase tracking-wider text-[10px]">
                  <tr>
                    {currentAxis.headers?.map((h: string, idx: number) => (
                      <th key={idx} className="p-3 font-bold">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {currentAxis.rows.map((row: string[], rIdx: number) => (
                    <tr key={rIdx} className="hover:bg-accent/30 transition-colors">
                      {row.map((cell: string, cIdx: number) => (
                        <td key={cIdx} className={`p-3 leading-relaxed ${cIdx === 0 ? "font-bold font-elements text-foreground" : "text-muted-foreground"}`}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* Matriz de Conexões Específicas por Autor */}
        <div className="grid gap-6 lg:grid-cols-12 pt-2">
          {/* Seletor de Autor */}
          <div className="lg:col-span-4 space-y-2">
            <h3 className="text-xs font-bold font-elements uppercase tracking-wider text-muted-foreground">
              Selecione o Autor para Ver Pontes
            </h3>
            <div className="space-y-1.5 max-h-[420px] overflow-y-auto pr-1">
              {texts.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedAuthorId(t.id)}
                  className={`w-full text-left p-2.5 rounded-md border text-xs font-elements transition-colors flex items-center justify-between ${selectedAuthorId === t.id ? "border-primary bg-accent/40 font-bold text-foreground" : "border-border/60 bg-card text-muted-foreground hover:text-foreground"}`}
                >
                  <span className="truncate">{t.autor}</span>
                  <Badge variant="outline" className="text-[9px] font-mono">
                    {t.conexoes?.length || 0} pontes
                  </Badge>
                </button>
              ))}
            </div>
          </div>

          {/* Conexões Detalhadas */}
          <div className="lg:col-span-8 space-y-3">
            <h3 className="text-xs font-bold font-elements uppercase tracking-wider text-muted-foreground">
              Pontes Conceituais de {selectedText?.autor}
            </h3>
            {selectedText?.conexoes && selectedText.conexoes.length > 0 ? (
              <div className="space-y-3">
                {selectedText.conexoes.map(([target, desc], idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-lg border border-border/60 bg-card space-y-1.5 hover:border-primary/40 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <GitFork className="size-4 text-primary shrink-0" />
                      <span className="font-elements font-bold text-xs text-foreground">
                        Diálogo com {target}
                      </span>
                    </div>
                    <p className="text-xs font-sans text-muted-foreground leading-relaxed pl-6">
                      {desc}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <Card className="border-border/60 bg-card p-6 text-center text-xs text-muted-foreground font-sans">
                Nenhuma conexão cadastrada para este autor.
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
