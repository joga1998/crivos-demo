"use client"

import * as React from "react"
import { CheckCircle2, Clock, ArrowRight, BookOpen, AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const recentActivities = [
  {
    title: "Leitura Crítica: E.P. Thompson",
    subtitle: "Costume, Lei e Direito Comum · Fichamento concluído",
    time: "Hoje às 09:30",
    status: "done",
    tag: "ESSENCIAL",
  },
  {
    title: "Revisão SM-2: Bloco Teórico de Estado",
    subtitle: "Poulantzas & Mendonça / Fontes · 18 flashcards respondidos",
    time: "Ontem às 21:15",
    status: "done",
    tag: "SM-2",
  },
  {
    title: "Simulado Dissertativo #01",
    subtitle: "Tema: Territorialidade e Lugar Social · Nota estimada 9.2/10",
    time: "02 de Nov",
    status: "done",
    tag: "DISSERTATIVA",
  },
  {
    title: "Meta Pendente: Reinhart Koselleck",
    subtitle: "Futuro Passado & Estratos do Tempo · Seções 1 a 4",
    time: "Agendado para hoje",
    status: "pending",
    tag: "IMPORTANTE",
  },
]

export function RecentTasks() {
  return (
    <Card className="border-border bg-card">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div>
          <CardTitle className="text-sm font-semibold uppercase tracking-wider">
            Atividades Recentes & Próximas Metas
          </CardTitle>
          <CardDescription className="text-xs">
            Registro cronológico das últimas sessões
          </CardDescription>
        </div>
        <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground hover:text-foreground">
          Ver todas <ArrowRight className="ml-1 size-3" />
        </Button>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="space-y-3">
          {recentActivities.map((act, idx) => (
            <div
              key={idx}
              className="flex items-start justify-between gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-accent/40"
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  {act.status === "done" ? (
                    <CheckCircle2 className="size-4 text-emerald-500" />
                  ) : (
                    <Clock className="size-4 text-amber-500" />
                  )}
                </div>
                <div className="space-y-0.5">
                  <div className="text-xs font-semibold text-foreground flex items-center gap-2">
                    <span>{act.title}</span>
                    <Badge variant="outline" className="text-[9px] font-mono py-0 h-4 border-border">
                      {act.tag}
                    </Badge>
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    {act.subtitle}
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono text-muted-foreground whitespace-nowrap">
                {act.time}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
