"use client"

import * as React from "react"
import { Search, X, BookOpen, Calendar, Timer, BrainCircuit, Network, ArrowRight } from "lucide-react"
import { useDemoData } from "@/hooks/use-demo-data"
import { Badge } from "@/components/ui/badge"
import { TabKey } from "@/components/app-sidebar"

interface CommandPaletteProps {
  open: boolean
  onClose: () => void
  onNavigate: (tab: TabKey) => void
}

export function CommandPalette({ open, onClose, onNavigate }: CommandPaletteProps) {
  const { data } = useDemoData()
  const [query, setQuery] = React.useState("")
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        if (open) onClose()
        else onNavigate("overview")
      }
      if (e.key === "Escape" && open) {
        onClose()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [open, onClose, onNavigate])

  React.useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50)
    } else {
      setQuery("")
    }
  }, [open])

  if (!open) return null

  const texts = data.texts || []
  const filteredTexts = query
    ? texts.filter(
        (t) =>
          t.autor.toLowerCase().includes(query.toLowerCase()) ||
          t.titulo.toLowerCase().includes(query.toLowerCase()) ||
          (t.tese && t.tese.toLowerCase().includes(query.toLowerCase()))
      )
    : texts.slice(0, 5)

  const quickNav: { title: string; tab: TabKey; icon: React.ElementType }[] = [
    { title: "Ir para Cronograma Tático", tab: "cronograma", icon: Calendar },
    { title: "Ir para Bibliografia & Autores", tab: "textos", icon: BookOpen },
    { title: "Ir para Sessão Pomodoro", tab: "pomodoro", icon: Timer },
    { title: "Ir para Flashcards SM-2", tab: "flashcards", icon: BrainCircuit },
    { title: "Ir para Matriz de Conexões", tab: "conexoes", icon: Network },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-background/80 backdrop-blur-sm animate-in fade-in-0 duration-150">
      <div
        className="fixed inset-0"
        onClick={onClose}
      />
      <div className="relative w-full max-w-xl rounded-xl border border-border bg-card shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-150">
        {/* Barra de Pesquisa */}
        <div className="flex items-center px-4 border-b border-border">
          <Search className="size-4 text-muted-foreground mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Buscar por autores, disciplinas, teses ou atalhos..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-12 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded text-muted-foreground hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Resultados */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-4">
          {/* Navegação Rápida */}
          {!query && (
            <div className="space-y-1">
              <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Módulos do Sistema
              </span>
              <div className="space-y-0.5 pt-1">
                {quickNav.map((item, idx) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        onNavigate(item.tab)
                        onClose()
                      }}
                      className="w-full flex items-center justify-between p-2.5 rounded-lg text-xs font-semibold text-foreground hover:bg-accent transition-colors text-left"
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="size-4 text-primary" />
                        <span>{item.title}</span>
                      </div>
                      <ArrowRight className="size-3 text-muted-foreground" />
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Autores & Fichamentos Filtrados */}
          <div className="space-y-1">
            <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Bibliografia do Edital
            </span>
            <div className="space-y-1 pt-1">
              {filteredTexts.length === 0 ? (
                <div className="p-4 text-center text-xs text-muted-foreground">
                  Nenhum resultado encontrado para &quot;{query}&quot;
                </div>
              ) : (
                filteredTexts.map((text) => (
                  <button
                    key={text.id}
                    onClick={() => {
                      onNavigate("textos")
                      onClose()
                    }}
                    className="w-full p-2.5 rounded-lg border border-border/50 bg-secondary/30 hover:bg-accent hover:border-primary/40 transition-colors text-left space-y-0.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-foreground">
                        {text.autor}
                      </span>
                      <Badge variant="outline" className="text-[9px] font-mono">
                        {text.prio}
                      </Badge>
                    </div>
                    <p className="text-[11px] text-muted-foreground line-clamp-1">
                      {text.titulo}
                    </p>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Rodapé com Dicas */}
        <div className="p-2.5 border-t border-border bg-muted/30 flex items-center justify-between text-[11px] font-mono text-muted-foreground px-4">
          <span>Pressione ESC para fechar</span>
          <span>Tab para navegar</span>
        </div>
      </div>
    </div>
  )
}
