"use client"

import * as React from "react"
import {
  PanelLeft,
  Calendar,
  ChevronDown,
  Sun,
  Moon,
  Menu,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { TabKey, LEGACY_TABS } from "@/components/app-sidebar"
import { cn } from "@/lib/utils"

interface HeaderProps {
  currentTab: TabKey
  collapsed: boolean
  setCollapsed: (val: boolean) => void
  onOpenMobile: () => void
}

const DATES: Array<{ name: string; date: string; displayDate: string }> = [
  { name: "Meta de inscrição", date: "2026-10-25T23:59:00", displayDate: "25/10/2026" },
  { name: "Fim das inscrições", date: "2026-10-30T17:00:00", displayDate: "30/10/2026" },
  { name: "Fim do cronograma", date: "2026-11-21T23:59:00", displayDate: "21/11/2026" },
  { name: "Prova escrita", date: "2026-11-23T09:00:00", displayDate: "23/11/2026" },
  { name: "Arguição oral", date: "2026-12-08T09:00:00", displayDate: "08/12/2026" },
  { name: "Língua estrangeira", date: "2027-02-24T09:00:00", displayDate: "24/02/2027" },
]

function calculateRemaining(targetIso: string): string {
  const target = new Date(targetIso).getTime()
  const now = new Date("2026-11-04T15:00:00").getTime() // Referência do certame
  const diff = target - now
  if (diff <= 0) return "Encerrado"
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  return `${days}d`
}

export function Header({
  currentTab,
  collapsed,
  setCollapsed,
  onOpenMobile,
}: HeaderProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const [datesDrawerOpen, setDatesDrawerOpen] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const currentTabObj = LEGACY_TABS.find((t) => t.id === currentTab)

  return (
    <header className="sticky top-0 z-30 flex flex-col w-full border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="flex h-14 w-full items-center justify-between px-3 sm:px-6">
        {/* 1. Toggle Sidebar & Breadcrumbs */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={onOpenMobile}
            className="lg:hidden h-8 w-8 text-muted-foreground hover:text-foreground shrink-0"
          >
            <Menu className="size-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex h-8 w-8 text-muted-foreground hover:text-foreground shrink-0"
            title={collapsed ? "Expandir menu lateral" : "Recolher menu lateral"}
          >
            <PanelLeft className="size-4" />
          </Button>

          <div className="hidden sm:block h-4 w-px bg-border/60 mx-1" />

          {/* Brand CRIVOS em Inter com Quadrado Vermelho */}
          <div className="flex items-center gap-2 text-xs truncate">
            <div className="flex items-center gap-1.5 font-brand font-bold tracking-tight text-foreground select-none">
              <span className="flex h-4 w-4 items-center justify-center rounded-[3px] bg-primary text-[9px] font-black text-primary-foreground leading-none">
                CR
              </span>
              <span className="text-sm font-bold tracking-tight text-foreground uppercase font-brand">
                crivos
              </span>
            </div>
            <span className="text-muted-foreground/60 hidden sm:inline">/</span>
            <span className="font-elements font-medium text-muted-foreground hidden sm:inline truncate">
              {currentTabObj?.title || "Início"}
            </span>
          </div>
        </div>

        {/* 2. Controles Globais (Busca + Marcos Temporais Dropdown + Theme) */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Busca sutil */}
          <div className="hidden md:flex items-center justify-between gap-3 h-8 w-44 lg:w-56 rounded-md border border-input/60 bg-muted/30 px-2.5 text-xs text-muted-foreground select-none cursor-default font-sans">
            <span className="truncate">Buscar no edital...</span>
            <kbd className="pointer-events-none inline-flex h-4 select-none items-center gap-0.5 rounded border border-border/80 bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              <span className="text-[10px]">⌘</span>K
            </kbd>
          </div>

          {/* Botão de MARCOS TEMPORAIS (Desliza para baixo ao clicar) */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setDatesDrawerOpen(!datesDrawerOpen)}
            className={cn(
              "h-8 gap-1.5 px-2.5 border-border/60 font-elements text-xs transition-colors",
              datesDrawerOpen && "bg-accent text-accent-foreground border-primary/50"
            )}
            title="Ver marcos temporais do edital"
          >
            <Calendar className="size-3.5 text-primary" />
            <span className="font-semibold text-foreground tracking-tight hidden sm:inline">Marcos Temporais</span>
            <span className="font-mono text-[10px] text-muted-foreground bg-muted/60 px-1 py-0.2 rounded border border-border/40">
              D-42
            </span>
            <ChevronDown className={cn("size-3 text-muted-foreground transition-transform duration-200", datesDrawerOpen && "rotate-180")} />
          </Button>

          {/* Alternar Tema */}
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
        </div>
      </div>

      {/* DRAWER DESLIZANTE DOS MARCOS TEMPORAIS */}
      {datesDrawerOpen && (
        <div className="w-full border-t border-border/60 bg-card/95 backdrop-blur-md px-3 sm:px-6 py-3 transition-all duration-200 ease-out shadow-lg">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-border/40">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[11px] font-elements font-bold uppercase tracking-wider text-foreground">
                Cronograma Oficial de Etapas & Marcos Temporais
              </span>
            </div>
            <span className="text-[10px] font-mono text-muted-foreground">
              Edital PPGHS/UERJ
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {DATES.map((item, idx) => {
              const rem = calculateRemaining(item.date)
              return (
                <div
                  key={idx}
                  className="rounded-md border border-border/60 bg-background/60 p-2 flex flex-col justify-between space-y-1 hover:border-primary/40 transition-colors"
                >
                  <span className="text-[10px] font-elements font-medium text-muted-foreground truncate" title={item.name}>
                    {item.name}
                  </span>
                  <div className="flex items-baseline justify-between pt-0.5">
                    <span className="text-[10px] font-mono text-muted-foreground">
                      {item.displayDate}
                    </span>
                    <span className="text-[11px] font-mono font-bold text-foreground">
                      {rem}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </header>
  )
}
