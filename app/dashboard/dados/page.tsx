"use client"

import * as React from "react"
import { useDemoData } from "@/hooks/use-demo-data"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Headphones, ShieldCheck, Database, RefreshCw, Send, CheckCircle2 } from "lucide-react"

export default function DadosPage() {
  const { state, totalHoursStudied } = useDemoData()
  const [synced, setSynced] = React.useState<boolean>(false)

  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2))
    const downloadAnchor = document.createElement("a")
    downloadAnchor.setAttribute("href", dataStr)
    downloadAnchor.setAttribute("download", `crivos_backup_ppghs_${new Date().toISOString().slice(0, 10)}.json`)
    document.body.appendChild(downloadAnchor)
    downloadAnchor.click()
    downloadAnchor.remove()
  }

  const handleForceSync = () => {
    setSynced(true)
    setTimeout(() => setSynced(false), 3000)
  }

  return (
    <div className="space-y-6 w-full max-w-4xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-border/60 pb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-elements flex items-center gap-2">
            <Headphones className="size-5 text-primary" /> Suporte Técnico & Gestão de Dados
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground font-sans">
            Auditoria de telemetria local, integridade dos registros e backup do candidato
          </p>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {/* Status de Sincronização Local */}
        <Card className="border-border/60 bg-card shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold font-elements uppercase tracking-wider flex items-center gap-2">
              <Database className="size-4 text-primary" /> Estado do Armazenamento Local
            </CardTitle>
            <CardDescription className="text-xs font-sans">
              Dados salvos no seu navegador sob a chave ppghs_painel_v1
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 font-sans text-xs pt-2">
            <div className="flex justify-between py-1 border-b border-border/40">
              <span className="text-muted-foreground">Sessões de estudo registradas:</span>
              <span className="font-mono font-bold text-foreground">{state.log.length}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-border/40">
              <span className="text-muted-foreground">Cards no algoritmo SM-2:</span>
              <span className="font-mono font-bold text-foreground">{Object.keys(state.cards).length}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-border/40">
              <span className="text-muted-foreground">Perguntas de arguição treinadas:</span>
              <span className="font-mono font-bold text-foreground">{Object.keys(state.args).length}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-border/40">
              <span className="text-muted-foreground">Simulados concluídos:</span>
              <span className="font-mono font-bold text-foreground">{state.sims.length}</span>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <Button size="sm" variant="outline" onClick={handleExportData} className="font-elements text-xs flex-1">
                Exportar Backup JSON
              </Button>
              <Button size="sm" onClick={handleForceSync} className="font-elements text-xs flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
                <RefreshCw className="size-3 mr-1" /> {synced ? "Sincronizado!" : "Forçar Validação"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Canais de Suporte */}
        <Card className="border-border/60 bg-card shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold font-elements uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="size-4 text-emerald-500" /> Suporte & Mentoria CRIVOS
            </CardTitle>
            <CardDescription className="text-xs font-sans">
              Atendimento exclusivo para o plano CRIVOS Elite
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 font-sans text-xs pt-2">
            <p className="text-muted-foreground leading-relaxed">
              Dúvidas sobre o método, cronograma ou necessidade de revisão de recursos de prova pós-gabarito:
            </p>
            <div className="p-3 rounded-md bg-secondary/40 border border-border/40 space-y-1">
              <span className="font-elements font-bold text-foreground block">
                Canal Oficial de Atendimento:
              </span>
              <span className="font-mono text-muted-foreground">
                suporte@crivos.me · crivos.me/suporte
              </span>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="w-full font-elements text-xs"
              onClick={() => window.open("mailto:suporte@crivos.me", "_blank")}
            >
              <Send className="size-3 mr-1.5" /> Enviar Mensagem à Equipe Técnica
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
