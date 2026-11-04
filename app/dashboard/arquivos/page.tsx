"use client"

import * as React from "react"
import { useDemoData } from "@/hooks/use-demo-data"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FolderArchive, FileText, Download, Eye, ExternalLink } from "lucide-react"

interface DeliverableItem {
  name: string
  desc: string
  file: string
  format: "PDF" | "DOCX" | "HTML"
  size: string
}

const deliverables: DeliverableItem[] = [
  {
    name: "Guia Oficial de Estudos PPGHS/UERJ (78 Páginas)",
    desc: "Plano completo pós-edital em padrão Editorial Suíço contendo as 12 seções táticas do certame.",
    file: "projeto/guia_estudos_ppghs_uerj.pdf",
    format: "PDF",
    size: "2.4 MB",
  },
  {
    name: "Carta de Intenções & Projeto de Pesquisa",
    desc: "Minuta formal estruturada para a banca examinadora da Linha 1 (História Social do Território).",
    file: "projeto/carta_de_intencoes_ppghs_uerj.pdf",
    format: "PDF",
    size: "185 KB",
  },
  {
    name: "Matriz Tática de Conexões e Eixos Transversais",
    desc: "Tabela comparativa sintetizada para consulta e treino de citações antes da prova.",
    file: "projeto/matriz_conexoes_uerj.pdf",
    format: "PDF",
    size: "340 KB",
  },
  {
    name: "Dossiê de Véspera D-7 & Pegadinhas da Banca",
    desc: "Resumo executivo de última semana com pontos de atenção de cada autor da bibliografia.",
    file: "projeto/dossie_vespera_d7.pdf",
    format: "PDF",
    size: "520 KB",
  },
]

export default function ArquivosPage() {
  const { data } = useDemoData()
  const texts = data.texts || []

  return (
    <div className="space-y-6 w-full">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-border/60 pb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-elements flex items-center gap-2">
            <FolderArchive className="size-5 text-primary" /> Arquivos & Entregáveis Oficiais
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground font-sans">
            Acervo documental, guias em PDF diagramados, cartas de intenção e PDFs das obras
          </p>
        </div>
      </div>

      {/* Grid de Entregáveis Principais */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold font-elements uppercase tracking-wider text-muted-foreground">
          Entregáveis Técnicos CRIVOS
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {deliverables.map((item, idx) => (
            <Card key={idx} className="border-border/60 bg-card shadow-sm hover:border-primary/40 transition-colors">
              <CardContent className="p-4 flex flex-col justify-between h-full space-y-3">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-[10px] font-mono py-0 h-4 border-primary/30 text-primary">
                      {item.format} · {item.size}
                    </Badge>
                  </div>
                  <h4 className="font-elements font-bold text-sm text-foreground pt-1">
                    {item.name}
                  </h4>
                  <p className="text-xs text-muted-foreground font-sans leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="flex items-center gap-2 pt-2 border-t border-border/30">
                  <Button size="sm" variant="outline" className="h-7 text-xs font-elements flex-1" onClick={() => window.open(item.file, "_blank")}>
                    <Eye className="size-3 mr-1" /> Visualizar
                  </Button>
                  <Button size="sm" className="h-7 text-xs font-elements flex-1 bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => window.open(item.file, "_blank")}>
                    <Download className="size-3 mr-1" /> Baixar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Acervo dos Textos em PDF */}
      <div className="space-y-3 pt-4">
        <h3 className="text-xs font-bold font-elements uppercase tracking-wider text-muted-foreground">
          Textos da Bibliografia Oficial (PDFs na Pasta)
        </h3>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {texts.map((t) => (
            <div
              key={t.id}
              className="p-3 rounded-lg border border-border/60 bg-card flex items-center justify-between gap-3 hover:border-border transition-colors"
            >
              <div className="min-w-0 flex-1 space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <FileText className="size-3.5 text-primary shrink-0" />
                  <span className="font-elements font-bold text-xs text-foreground truncate">
                    {t.autor}
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground truncate font-sans">
                  {t.titulo}
                </p>
              </div>
              <Button
                size="sm"
                variant="ghost"
                className="h-7 text-xs font-elements text-muted-foreground hover:text-foreground shrink-0"
                onClick={() => window.open(`textos/${t.arq || t.id + '.pdf'}`, "_blank")}
              >
                Abrir <ExternalLink className="size-3 ml-1" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

