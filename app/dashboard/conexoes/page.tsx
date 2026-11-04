"use client"

import * as React from "react"
import { useDemoData } from "@/hooks/use-demo-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Network, Share2, Compass, Layers, ArrowUpRight, CheckCircle2 } from "lucide-react"

export default function ConexoesPage() {
  const { data } = useDemoData()
  const texts = data.texts || []
  const tabs = data.tabs || []

  // Constrói lista de arestas a partir das conexões dos textos
  const connectionsList = React.useMemo(() => {
    const list: { from: string; fromTitle: string; to: string; desc: string }[] = []
    texts.forEach((t) => {
      if (Array.isArray(t.conexoes)) {
        t.conexoes.forEach(([target, desc]) => {
          list.push({
            from: t.autor,
            fromTitle: t.titulo,
            to: target,
            desc,
          })
        })
      }
    })
    return list
  }, [texts])

  const [activeTab, setActiveTab] = React.useState<"grafo" | "eixos">("grafo")
  const [selectedAxis, setSelectedAxis] = React.useState(0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            Conexões Interdisciplinares & Eixos
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Articulações teóricas transversais entre os autores exigidos na prova e na banca.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={activeTab === "grafo" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab("grafo")}
            className="h-8 text-xs font-semibold"
          >
            <Share2 className="mr-1.5 size-3.5" />
            Matriz de Conexões ({connectionsList.length})
          </Button>
          <Button
            variant={activeTab === "eixos" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab("eixos")}
            className="h-8 text-xs font-semibold"
          >
            <Layers className="mr-1.5 size-3.5" />
            Eixos Transversais ({tabs.length})
          </Button>
        </div>
      </div>

      {activeTab === "grafo" ? (
        /* Visualização em Lista de Articulações */
        <div className="grid gap-4 md:grid-cols-2">
          {connectionsList.map((conn, idx) => (
            <Card key={idx} className="border-border bg-card hover:border-primary/50 transition-colors">
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center justify-between gap-2">
                  <Badge variant="outline" className="text-[10px] font-mono border-primary/30 text-primary">
                    #CONEXÃO {String(idx + 1).padStart(2, "0")}
                  </Badge>
                  <span className="text-[11px] font-mono text-muted-foreground">Articulação Teórica</span>
                </div>
                <CardTitle className="text-sm font-bold pt-1 flex items-center gap-2">
                  <span className="text-foreground">{conn.from}</span>
                  <span className="text-primary font-mono">↔</span>
                  <span className="text-primary">{conn.to}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-1">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {conn.desc}
                </p>
                <div className="mt-3 pt-2 border-t border-border/50 flex items-center justify-between text-[10px] font-mono text-muted-foreground">
                  <span className="truncate max-w-[220px]">{conn.fromTitle}</span>
                  <span className="text-emerald-500 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="size-3" /> MAPEADA
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        /* Visualização de Eixos Transversais */
        <div className="space-y-6">
          {/* Seletor de Eixo */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-border">
            {tabs.map((tab, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedAxis(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedAxis === idx
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-secondary text-secondary-foreground hover:bg-accent"
                }`}
              >
                Eixo {idx + 1}: {tab.t}
              </button>
            ))}
          </div>

          {tabs[selectedAxis] && (
            <Card className="border-border bg-card">
              <CardHeader className="p-6 pb-3 border-b border-border">
                <Badge variant="outline" className="w-fit text-[10px] font-mono text-primary border-primary/30 mb-1">
                  EIXO TEMÁTICO #{selectedAxis + 1}
                </Badge>
                <CardTitle className="text-lg font-bold">
                  {tabs[selectedAxis].t}
                </CardTitle>
                <CardDescription className="text-xs">
                  {tabs[selectedAxis].intro}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="divide-y divide-border">
                  {(tabs[selectedAxis].rows || []).map((row: [string, string], rIdx: number) => (
                    <div key={rIdx} className="py-3 flex flex-col sm:flex-row sm:items-start gap-3">
                      <div className="sm:w-1/3 text-xs font-bold text-foreground">
                        {row[0]}
                      </div>
                      <div className="sm:w-2/3 text-xs text-muted-foreground leading-relaxed">
                        {row[1]}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
