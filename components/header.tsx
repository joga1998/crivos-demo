"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import {
  PanelLeft,
  Search,
  Bell,
  Sun,
  Moon,
  Laptop,
  CheckCircle2,
  Calendar,
  Sparkles,
  Command
} from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface HeaderProps {
  collapsed: boolean
  setCollapsed: (val: boolean) => void
  onOpenSearch?: () => void
}

export function Header({ collapsed, setCollapsed, onOpenSearch }: HeaderProps) {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Gerador dinâmico de Breadcrumb
  const breadcrumbName = React.useMemo(() => {
    if (pathname.includes("overview") || pathname === "/dashboard") return "Overview"
    if (pathname.includes("cronograma")) return "Cronograma Tático"
    if (pathname.includes("textos")) return "Bibliografia & Fichamentos"
    if (pathname.includes("legislacao")) return "Legislação do Certame"
    if (pathname.includes("flashcards")) return "Flashcards SM-2"
    if (pathname.includes("pomodoro")) return "Pomodoro & Gestão Líquida"
    if (pathname.includes("simulados")) return "Simulados & Arguição"
    if (pathname.includes("conexoes")) return "Conexões Interdisciplinares"
    if (pathname.includes("arquivos")) return "Arquivos & Entregáveis"
    if (pathname.includes("dicas")) return "Dicas da Banca"
    if (pathname.includes("suporte")) return "Suporte Técnico"
    return "Dashboard"
  }, [pathname])

  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* 1. Toggle Sidebar & Breadcrumbs */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
          title={collapsed ? "Expandir menu lateral" : "Recolher menu lateral"}
        >
          <PanelLeft className="size-4" />
        </Button>

        <div className="h-4 w-px bg-border mx-1" />

        <div className="flex items-center gap-2 text-xs">
          <span className="text-muted-foreground font-medium">Dashboard</span>
          <span className="text-muted-foreground">/</span>
          <span className="font-semibold text-foreground">{breadcrumbName}</span>
        </div>
      </div>

      {/* 2. Controles Globais (Busca, Theme, Notificações) */}
      <div className="flex items-center gap-2">
        {/* Caixa de Busca Rápida (Estilo Shadcn Kbd) */}
        <button
          type="button"
          onClick={onOpenSearch}
          className="relative hidden sm:flex items-center justify-between gap-3 h-8 w-56 rounded-md border border-input bg-card px-2.5 text-xs text-muted-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <div className="flex items-center gap-2">
            <Search className="size-3.5" />
            <span>Buscar no edital...</span>
          </div>
          <kbd className="pointer-events-none inline-flex h-4 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[9px] font-medium text-muted-foreground opacity-100">
            <span className="text-[10px]">⌘</span>K
          </kbd>
        </button>

        {/* Toggle Dark / Light Theme */}
        {mounted && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            title="Alternar tema claro/escuro"
          >
            {theme === "dark" ? (
              <Sun className="size-4 text-amber-400 transition-all" />
            ) : (
              <Moon className="size-4 text-zinc-700 transition-all" />
            )}
          </Button>
        )}

        {/* Notificações / Status */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground relative"
            title="Notificações e Avisos de Edital"
          >
            <Bell className="size-4" />
            <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
          </Button>
        </div>

        {/* Tag de Aluno Conectado */}
        <div className="hidden md:flex items-center gap-2 pl-2 border-l border-border">
          <Badge variant="outline" className="text-[10px] font-mono tracking-tight bg-secondary/60">
            D-42 ATÉ A PROVA
          </Badge>
        </div>
      </div>
    </header>
  )
}
