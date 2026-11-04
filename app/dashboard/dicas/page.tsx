"use client"

import * as React from "react"
import { useDemoData } from "@/hooks/use-demo-data"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckSquare, AlertTriangle, Lightbulb, BookOpen, PenTool } from "lucide-react"

export default function DicasPage() {
  const { data } = useDemoData()
  const escrita = data.escrita || ""

  const tips = [
    {
      title: "6.1 Como a Prova Funciona",
      text: "A prova escrita é eliminatória. O tempo oficial é de 4 horas para responder 2 ou 3 questões dissertativas sem consulta a livros ou anotações. Cada questão exige entre 60 e 90 linhas de argumentação densa.",
    },
    {
      title: "6.2 Estrutura Canônica da Resposta",
      text: "1) Introdução (5-8 linhas): reformule o problema, apresente a tese e anuncie o percurso. 2) Desenvolvimento (3-4 blocos): cada bloco com uma ideia, autores correlacionados e diálogo conceitual explícito com o território. 3) Conclusão (5-8 linhas): responda diretamente à pergunta e aponte uma implicação historiográfica.",
    },
    {
      title: "6.3 Como Citar sem Consulta",
      text: "Use paráfrase atribuída ('Para Haesbaert, o território se estende num contínuo...'). Não invente páginas nem datas. Defina cada conceito na primeira vez que o usar (a banca avalia domínio, não mera citação nominativa).",
    },
    {
      title: "6.4 Erros Mais Graves que Desclassificam",
      text: "Fichamento em sequência (um parágrafo por autor sem entrelaçamento); falar do próprio projeto de pesquisa em vez de responder à pergunta da prova; usar 'território' como mero sinônimo de espaço físico.",
    },
  ]

  return (
    <div className="space-y-6 w-full max-w-5xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-border/60 pb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-elements flex items-center gap-2">
            <Lightbulb className="size-5 text-primary" /> Dicas da Banca & Manual de Redação
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground font-sans">
            Instruções táticas, critérios de pontuação e matriz de redação sob medida para a banca da UERJ
          </p>
        </div>
      </div>

      {/* Grid de Dicas Estruturadas */}
      <div className="grid gap-4 sm:grid-cols-2">
        {tips.map((t, idx) => (
          <Card key={idx} className="border-border/60 bg-card shadow-sm hover:border-primary/40 transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold font-elements text-foreground flex items-center gap-2">
                <PenTool className="size-4 text-primary shrink-0" />
                {t.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground font-sans leading-relaxed">
                {t.text}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Conteúdo Completo do Edital se disponível */}
      {escrita && (
        <Card className="border-border/60 bg-card p-6 shadow-sm">
          <CardHeader className="p-0 pb-4 border-b border-border/40">
            <CardTitle className="text-sm font-bold font-elements uppercase tracking-wider text-foreground">
              Manual Completo de Escrita Dissertativa (Extraído do Guia Oficial)
            </CardTitle>
          </CardHeader>
          <div
            className="prose prose-sm dark:prose-invert max-w-none pt-4 text-xs font-sans text-muted-foreground leading-relaxed"
            dangerouslySetInnerHTML={{ __html: escrita }}
          />
        </Card>
      )}
    </div>
  )
}
