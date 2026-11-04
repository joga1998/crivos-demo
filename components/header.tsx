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
          <span className="text-muted-foreground font-medium hidden md:inline">Dashboard</span>
          <span className="text-muted-foreground hidden md:inline">/</span>
          <span className="font-semibold text-foreground truncate">{tabTitles[currentTab] || "Overview"}</span>
        </div>
      </div>

      {/* 2. Controles Globais (Theme + Notificações + Badge) */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
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

        {/* Badge de Prazo */}
        <div className="flex items-center pl-1 sm:pl-2 sm:border-l sm:border-border">
          <Badge variant="outline" className="text-[10px] font-mono tracking-tight bg-secondary/60 whitespace-nowrap">
            D-42
          </Badge>
        </div>
      </div>
    </header>
  )
}
