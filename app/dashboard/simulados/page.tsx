"use client"

import * as React from "react"
import { useDemoData } from "@/hooks/use-demo-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileQuestion, MessageSquare, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react"

export default function SimuladosPage() {
  const { data } = useDemoData()
  const sim = data.sim || []
  const arg = data.arg || []

  const [activeTab, setActiveTab] = React.useState<"dissertativas" | "arguicao">("dissertativas")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            Simulados & Arguição Oral da Banca
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Bateria de questões inéditas de prova escrita e arguições sobre o projeto de pesquisa.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={activeTab === "dissertativas" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab("dissertativas")}
            className="h-8 text-xs font-semibold"
          >
            <FileQuestion className="mr-1.5 size-3.5" />
            Prova Dissertativa ({sim.length})
          </Button>
          <Button
            variant={activeTab === "arguicao" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab("arguicao")}
            className="h-8 text-xs font-semibold"
          >
            <MessageSquare className="mr-1.5 size-3.5" />
            Arguição Oral ({arg.length})
          </Button>
        </div>
      </div>

      {activeTab === "dissertativas" ? (
        <div className="grid gap-6 md:grid-cols-2">
          {sim.map((item, idx) => (
            <Card key={idx} className="border-border bg-card">
              <CardHeader className="p-5 pb-2">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <Badge variant="outline" className="text-[10px] font-mono border-primary/30 text-primary">
                    PROPOSTA #{String(idx + 1).padStart(2, "0")}
                  </Badge>
                  <span className="text-[10px] font-mono text-muted-foreground">PADRÃO UERJ</span>
                </div>
                <CardTitle className="text-sm font-bold leading-snug">
                  {item.t || item.titulo || `Questão Dissertativa Temática #${idx + 1}`}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 pt-2 space-y-4">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.p || item.enunciado || item.desc}
                </p>

                {item.crit && (
                  <div className="p-3 rounded-lg bg-secondary/50 border border-border space-y-1">
                    <span className="text-[10px] font-bold font-mono text-primary uppercase">
                      CRITÉRIO OFICIAL DE CORREÇÃO (ESPELHO)
                    </span>
                    <p className="text-[11px] text-muted-foreground">
                      {item.crit}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {arg.map((item, idx) => (
            <Card key={idx} className="border-border bg-card">
              <CardHeader className="p-5 pb-2">
                <div className="flex items-center justify-between gap-2">
                  <Badge variant="secondary" className="text-[10px] font-mono">
                    PERGUNTA DA BANCA #{idx + 1}
                  </Badge>
                  <span className="text-[10px] font-mono text-muted-foreground uppercase">
                    {item.eixo || "Defesa Metodológica"}
                  </span>
                </div>
                <CardTitle className="text-sm font-bold pt-1">
                  {item.q || item.pergunta}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 pt-2">
                <div className="p-3.5 rounded-lg bg-accent/40 border border-border text-xs text-muted-foreground leading-relaxed">
                  <div className="text-[10px] font-bold font-mono text-foreground uppercase tracking-wider mb-1">
                    DIRETRIZ DE RESPOSTA RECOMENDADA
                  </div>
                  {item.a || item.resposta || item.diretriz}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
