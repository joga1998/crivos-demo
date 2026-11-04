"use client"

import * as React from "react"
import {
  PanelLeft,
  Bell,
  Sun,
  Moon,
  Menu
} from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TabKey } from "@/components/app-sidebar"

interface HeaderProps {
  currentTab: TabKey
  collapsed: boolean
  setCollapsed: (val: boolean) => void
  onOpenMobile: () => void
}

const tabTitles: Record<TabKey, string> = {
  overview: "Overview",
  cronograma: "Cronograma Tático",
  textos: "Bibliografia & Fichamentos",
  conexoes: "Conexões Interdisciplinares",
  flashcards: "Flashcards SM-2",
  pomodoro: "Pomodoro & Gestão Líquida",
  simulados: "Simulados & Arguição",
  arquivos: "Arquivos & Entregáveis",
}

export function Header({
  currentTab,
  collapsed,
  setCollapsed,
  onOpenMobile,
}: HeaderProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="sticky top-0 z-20 flex h-14 sm:h-16 w-full items-center justify-between border-b border-border bg-background/95 px-3 sm:px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* 1. Toggle Sidebar & Breadcrumbs */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        {/* Mobile menu trigger */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onOpenMobile}
          className="lg:hidden h-9 w-9 text-muted-foreground hover:text-foreground shrink-0"
        >
          <Menu className="size-5" />
        </Button>

        {/* Desktop collapse trigger */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex h-8 w-8 text-muted-foreground hover:text-foreground shrink-0"
          title={collapsed ? "Expandir menu lateral" : "Recolher menu lateral"}
        >
          <PanelLeft className="size-4" />
        </Button>

        <div className="hidden sm:block h-4 w-px bg-border mx-1" />

        <div className="flex items-center gap-2 text-xs truncate">
          <div className="flex items-center gap-1.5 font-bold tracking-tight text-foreground font-sans">
            <span className="flex h-4 w-4 items-center justify-center rounded-[3px] bg-primary text-[9px] font-black text-primary-foreground leading-none">
              CR
            </span>
            <span className="text-sm font-bold tracking-tight text-foreground font-sans uppercase">
              crivos
            </span>
          </div>
          <span className="text-muted-foreground/60 hidden sm:inline">/</span>
          <span className="font-medium text-muted-foreground hidden sm:inline truncate">{tabTitles[currentTab] || "Overview"}</span>
        </div>
      </div>

      {/* 2. Controles Globais (Busca estilo shadcn + Theme + Notificações) */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Input de Busca decorativo estilo Kiranism */}
        <div className="hidden md:flex items-center justify-between gap-3 h-8 w-44 lg:w-56 rounded-md border border-input bg-muted/40 px-2.5 text-xs text-muted-foreground select-none cursor-default">
          <span className="truncate">Buscar no edital...</span>
          <kbd className="pointer-events-none inline-flex h-4 select-none items-center gap-0.5 rounded border border-border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            <span className="text-[10px]">⌘</span>K
          </kbd>
        </div>

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
              <Moon className="size-4 text-zinc-400 transition-all" />
            )}
          </Button>
        )}

        {/* Notificações com Ping */}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-foreground relative"
        >
          <Bell className="size-4" />
          <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
        </Button>

        {/* Badge de Prazo discreto */}
        <div className="flex items-center pl-1 sm:pl-2 border-l border-border">
          <Badge variant="outline" className="text-[10px] font-mono tracking-tight bg-secondary/40 text-muted-foreground border-border/60">
            D-42
          </Badge>
        </div>
      </div>
    </header>
  )
}
