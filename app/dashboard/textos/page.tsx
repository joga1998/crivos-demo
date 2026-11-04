"use client"

import * as React from "react"
import { useDemoData, DemoTextItem } from "@/hooks/use-demo-data"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Check, FileText, Bookmark, ExternalLink, Edit3, Save } from "lucide-react"

export default function TextosPage() {
  const { data, state, markTextStatus, saveTextNote } = useDemoData()
  const texts = data.texts || []

  const [selectedTextId, setSelectedTextId] = React.useState<string>(texts[0]?.id || "haesbaert")
  const [filterPrio, setFilterPrio] = React.useState<string>("TODOS")
  const [filterStatus, setFilterStatus] = React.useState<string>("TODOS")
  const [searchQuery, setSearchQuery] = React.useState<string>("")
  const [noteInput, setNoteInput] = React.useState<string>("")

  const selectedText = texts.find((t) => t.id === selectedTextId) || texts[0]

  // Carrega notas salvas ao trocar de texto
  React.useEffect(() => {
    if (selectedText) {
      setNoteInput(state.notes[selectedText.id] || "")
    }
  }, [selectedText, state.notes])

  const filteredTexts = React.useMemo(() => {
    return texts.filter((t) => {
      const matchPrio = filterPrio === "TODOS" || t.prio === filterPrio
      const st = state.texts[t.id] || "pendente"
      const matchStatus =
        filterStatus === "TODOS" ||
        (filterStatus === "CONCLUIDO" && st !== "pendente") ||
        (filterStatus === "PENDENTE" && st === "pendente")
      const matchQuery =
        t.autor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (t.tese && t.tese.toLowerCase().includes(searchQuery.toLowerCase()))
      return matchPrio && matchStatus && matchQuery
    })
  }, [texts, filterPrio, filterStatus, searchQuery, state.texts])

  const handleSaveNote = () => {
    if (selectedText) {
      saveTextNote(selectedText.id, noteInput)
    }
  }

  const currentStatus = state.texts[selectedText?.id || ""] || "pendente"

  return (
    <div className="space-y-6 w-full">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-border/60 pb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-elements">
            Bibliografia & Fichamentos Oficiais
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground font-sans">
            12 leituras canônicas com teses, citações, status de leitura e caderno de notas
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="font-mono text-xs px-2.5 py-1 bg-secondary/50 border-border">
            {Object.keys(state.texts).filter((k) => state.texts[k] && state.texts[k] !== "pendente").length} / {texts.length} CONCLUÍDOS
          </Badge>
        </div>
      </div>

      {/* Grid Master-Detail */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Coluna Master: Lista de Textos */}
        <div className="lg:col-span-5 space-y-3">
          {/* Filtros */}
          <div className="flex flex-col gap-2 bg-card border border-border/60 p-3 rounded-lg">
            <input
              type="text"
              placeholder="Filtrar por autor ou palavra-chave..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs bg-background border border-border/80 rounded px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary font-sans"
            />
            <div className="flex items-center justify-between gap-2 flex-wrap text-[11px] font-elements">
              <div className="flex items-center gap-1">
                {["TODOS", "ESSENCIAL", "IMPORTANTE"].map((p) => (
                  <button
                    key={p}
                    onClick={() => setFilterPrio(p)}
                    className={`px-2 py-0.5 rounded transition-colors ${filterPrio === p ? "bg-primary text-primary-foreground font-bold" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    {p}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-1">
                {["TODOS", "CONCLUIDO", "PENDENTE"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setFilterStatus(s)}
                    className={`px-2 py-0.5 rounded transition-colors ${filterStatus === s ? "bg-muted font-bold text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Lista Rolável */}
          <div className="space-y-2 max-h-[620px] overflow-y-auto pr-1">
            {filteredTexts.map((text) => {
              const isSelected = selectedText?.id === text.id
              const st = state.texts[text.id] || "pendente"
              return (
                <div
                  key={text.id}
                  onClick={() => setSelectedTextId(text.id)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${isSelected ? "border-primary bg-accent/40 shadow-sm" : "border-border/60 bg-card hover:border-border hover:bg-accent/20"}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-elements font-bold text-xs text-foreground leading-snug">
                      {text.autor}
                    </span>
                    <Badge
                      variant="outline"
                      className={`text-[9px] font-mono py-0 h-4 border ${text.prio === "ESSENCIAL" ? "border-rose-500/40 text-rose-500 bg-rose-500/10" : "border-amber-500/40 text-amber-500 bg-amber-500/10"}`}
                    >
                      {text.prio}
                    </Badge>
                  </div>
                  <p className="text-[11px] text-muted-foreground line-clamp-1 font-sans mt-0.5">
                    {text.titulo}
                  </p>
                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-border/30 text-[10px] font-mono">
                    <span className="text-muted-foreground uppercase">{text.sec || "ÁREA"}</span>
                    <span className={st === "dominado" ? "text-emerald-500 font-bold" : st === "fichado" ? "text-blue-500 font-bold" : st === "lido" ? "text-amber-500 font-bold" : "text-zinc-500"}>
                      {st.toUpperCase()}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Coluna Detail: Visão Completa da Obra + Caderno de Notas */}
        {selectedText && (
          <div className="lg:col-span-7 space-y-4">
            <Card className="border-border/60 bg-card shadow-sm border-t-4 border-t-primary">
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-primary uppercase">
                      FICHA TÁTICA DA BANCA
                    </span>
                    <CardTitle className="text-lg font-bold font-elements text-foreground mt-0.5">
                      {selectedText.autor}: {selectedText.titulo}
                    </CardTitle>
                  </div>
                  <Badge variant="outline" className="font-mono text-xs w-fit">
                    {selectedText.prio}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4 font-sans text-xs">
                {/* Status Toggles Reais */}
                <div className="flex items-center justify-between p-2.5 rounded-md bg-secondary/40 border border-border/40 flex-wrap gap-2">
                  <span className="font-elements font-semibold text-muted-foreground">
                    Status de Domínio:
                  </span>
                  <div className="flex items-center gap-1.5 font-elements">
                    {[
                      { key: "pendente", label: "Pendente" },
                      { key: "lido", label: "Lido" },
                      { key: "fichado", label: "Fichado" },
                      { key: "dominado", label: "Dominado" },
                    ].map((opt) => (
                      <Button
                        key={opt.key}
                        size="sm"
                        variant={currentStatus === opt.key ? "default" : "outline"}
                        onClick={() => markTextStatus(selectedText.id, opt.key)}
                        className={`h-7 text-[11px] font-elements ${currentStatus === opt.key ? "bg-primary text-primary-foreground font-bold" : "border-border/60"}`}
                      >
                        {opt.label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Tese Central */}
                <div className="space-y-1">
                  <h4 className="font-elements font-bold text-foreground uppercase tracking-wider text-[11px]">
                    Tese Central da Obra
                  </h4>
                  <p className="text-muted-foreground bg-background p-3 rounded-md border border-border/40 leading-relaxed">
                    {selectedText.tese || "Tese analítica compilada para o certame PPGHS/UERJ."}
                  </p>
                </div>

                {/* Articulação com Território */}
                {selectedText.territorio && (
                  <div className="space-y-1">
                    <h4 className="font-elements font-bold text-foreground uppercase tracking-wider text-[11px]">
                      Articulação com o Conceito de Território
                    </h4>
                    <p className="text-muted-foreground bg-background p-3 rounded-md border border-border/40 leading-relaxed">
                      {selectedText.territorio}
                    </p>
                  </div>
                )}

                {/* Caderno de Anotações do Aluno */}
                <div className="space-y-2 pt-2 border-t border-border/40">
                  <div className="flex items-center justify-between">
                    <h4 className="font-elements font-bold text-foreground uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                      <Edit3 className="size-3.5 text-primary" /> Caderno Pessoal de Fichamento
                    </h4>
                    <Button size="sm" onClick={handleSaveNote} className="h-6 text-[10px] font-elements">
                      <Save className="size-3 mr-1" /> Salvar Nota
                    </Button>
                  </div>
                  <textarea
                    rows={4}
                    value={noteInput}
                    onChange={(e) => setNoteInput(e.target.value)}
                    placeholder="Escreva seus argumentos, conexões de prova e citações memorizadas para esta obra..."
                    className="w-full text-xs font-sans bg-background border border-border/80 rounded-md p-2.5 focus:outline-none focus:ring-1 focus:ring-primary leading-relaxed"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
