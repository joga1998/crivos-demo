"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FolderArchive, Download, ExternalLink, FileText, Search } from "lucide-react"

export default function ArquivosPage() {
  const materials = [
    {
      title: "Guia de Estudos Pós-Edital CRIVOS",
      desc: "Planejamento estratégico integral em 12 seções táticas, cronograma executivo e fichamento dos 12 textos.",
      format: "PDF A4",
      size: "1.9 MB",
      badge: "ENTREGÁVEL OFICIAL #01",
      url: "/Guia_Estudos_PPGHS_Mestrado_2027.pdf",
    },
    {
      title: "Apostila Tática Compilada",
      desc: "Compêndio denso com os resumos estruturados dos 12 autores, citações literais verificadas e quadros transversais.",
      format: "PDF A4",
      size: "1.5 MB",
      badge: "ENTREGÁVEL OFICIAL #02",
      url: "/Apostila_PPGHS_2027.pdf",
    },
    {
      title: "Edital Oficial PPGHS/UERJ 001/2027",
      desc: "Documento oficial do processo seletivo contendo regras, cronograma de etapas e programa bibliográfico.",
      format: "PDF OFICIAL",
      size: "820 KB",
      badge: "NORMATIVO",
      url: "https://www.google.com/search?q=Edital+Oficial+PPGHS+UERJ+Mestrado+2027+PDF",
      isExternal: true,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            Arquivos, Apostilas & Entregáveis
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Acesse e baixe os compêndios impressos, guias táticos em alta definição e editais oficiais.
          </p>
        </div>

        <a
          href="https://www.google.com/search?q=Edital+Oficial+PPGHS+UERJ+Mestrado+2027+PDF"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-border bg-secondary hover:bg-accent text-foreground transition-colors"
        >
          <Search className="size-3.5" /> Pesquisar Edital no Google ↗
        </a>
      </div>

      {/* Grid de Materiais */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {materials.map((m, idx) => (
          <Card key={idx} className="border-border bg-card flex flex-col justify-between">
            <CardHeader className="p-5 pb-2">
              <div className="flex items-center justify-between gap-2 mb-2">
                <Badge variant="outline" className="text-[10px] font-mono border-primary/30 text-primary">
                  {m.badge}
                </Badge>
                <span className="text-[10px] font-mono text-muted-foreground">{m.size}</span>
              </div>
              <CardTitle className="text-sm font-bold leading-snug">
                {m.title}
              </CardTitle>
              <CardDescription className="text-xs pt-1 line-clamp-3">
                {m.desc}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-5 pt-3 border-t border-border/60">
              <a
                href={m.url}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-1.5 h-8 text-xs font-semibold rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                {m.isExternal ? (
                  <>
                    <ExternalLink className="size-3.5" /> Abrir no Google
                  </>
                ) : (
                  <>
                    <Download className="size-3.5" /> Baixar Documento ({m.format})
                  </>
                )}
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
