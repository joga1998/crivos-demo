"use client"

import * as React from "react"
import { useDemoData } from "@/hooks/use-demo-data"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Award, ShieldCheck, Mail, Calendar, GraduationCap } from "lucide-react"

export default function PerfilPage() {
  const { totalHoursStudied, completedTextsCount, totalTextsCount, daysUntilExam } = useDemoData()

  return (
    <div className="space-y-6 w-full max-w-4xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-border/60 pb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-elements flex items-center gap-2">
            <User className="size-5 text-primary" /> Perfil & Credenciais do Candidato
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground font-sans">
            Dados cadastrais e status de matrícula no sistema tático CRIVOS
          </p>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-12">
        {/* Card do Usuário */}
        <Card className="sm:col-span-5 border-border/60 bg-card shadow-sm text-center p-6 space-y-4">
          <Avatar className="h-20 w-20 mx-auto border-2 border-primary/40 shadow-sm">
            <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces" alt="João Gabriel" />
            <AvatarFallback className="font-brand font-bold text-lg">JG</AvatarFallback>
          </Avatar>

          <div>
            <h3 className="font-elements font-bold text-lg text-foreground">
              João Gabriel
            </h3>
            <p className="text-xs text-muted-foreground font-sans">
              joao@crivos.me
            </p>
            <div className="mt-2 flex justify-center">
              <Badge variant="outline" className="border-primary/40 bg-primary/10 text-primary font-mono text-[10px]">
                PLANO CRIVOS ELITE
              </Badge>
            </div>
          </div>

          <div className="pt-4 border-t border-border/40 grid grid-cols-2 gap-2 text-center font-mono">
            <div className="p-2 rounded bg-muted/40">
              <span className="text-[10px] text-muted-foreground block">HORAS</span>
              <span className="font-bold text-foreground text-sm">{totalHoursStudied}h</span>
            </div>
            <div className="p-2 rounded bg-muted/40">
              <span className="text-[10px] text-muted-foreground block">AUTORES</span>
              <span className="font-bold text-foreground text-sm">{completedTextsCount}/{totalTextsCount}</span>
            </div>
          </div>
        </Card>

        {/* Detalhes do Certame */}
        <Card className="sm:col-span-7 border-border/60 bg-card shadow-sm">
          <CardHeader className="pb-3 border-b border-border/40">
            <CardTitle className="text-sm font-bold font-elements uppercase tracking-wider text-foreground flex items-center gap-2">
              <GraduationCap className="size-4 text-primary" /> Programa Selecionado
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-4 font-sans text-xs">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-muted-foreground uppercase">Instituição & Certame:</span>
              <p className="font-bold font-elements text-sm text-foreground">
                PPGHS / UERJ — Programa de Pós-Graduação em História Social
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono text-muted-foreground uppercase">Linha de Pesquisa:</span>
              <p className="font-medium text-foreground">
                Linha 1: História Social do Território (Processo Seletivo 2027)
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono text-muted-foreground uppercase">Status do Cronograma:</span>
              <p className="font-medium text-emerald-500 flex items-center gap-1.5">
                <ShieldCheck className="size-3.5" /> Fase 02 Ativa · Ciclo de Consolidação e Simulados
              </p>
            </div>

            <div className="pt-2 border-t border-border/40">
              <span className="text-muted-foreground block text-[11px] leading-relaxed">
                Este painel opera com persistência local criptografada no navegador e sincronização assíncrona para garantir funcionamento mesmo em ambientes offline.
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
