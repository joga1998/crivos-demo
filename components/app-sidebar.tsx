"use client"

import * as React from "react"
import {
  LayoutDashboard,
  CalendarDays,
  BookOpen,
  BrainCircuit,
  Timer,
  FileQuestion,
  Network,
  FolderArchive,
  ChevronsUpDown,
  X
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export type TabKey =
  | "overview"
  | "cronograma"
  | "textos"
  | "conexoes"
  | "flashcards"
  | "pomodoro"
  | "simulados"
  | "arquivos"

interface NavItem {
  id: TabKey
  title: string
  icon: React.ElementType
  badge?: string
}

interface NavSection {
  title: string
  items: NavItem[]
}

const navSections: NavSection[] = [
  {
    title: "Overview",
    items: [
      { id: "overview", title: "Dashboard", icon: LayoutDashboard },
      { id: "cronograma", title: "Cronograma Tático", icon: CalendarDays, badge: "12 Sem" },
    ],
  },
  {
    title: "Trilha de Estudos",
    items: [
      { id: "textos", title: "Bibliografia & Textos", icon: BookOpen, badge: "12" },
      { id: "conexoes", title: "Conexões Interdisciplinares", icon: Network },
    ],
  },
  {
    title: "Ferramentas Táticas",
    items: [
      { id: "flashcards", title: "Flashcards SM-2", icon: BrainCircuit },
      { id: "pomodoro", title: "Pomodoro & Foco", icon: Timer },
      { id: "simulados", title: "Simulados & Arguição", icon: FileQuestion },
    ],
  },
  {
    title: "Acervo & Suporte",
    items: [
      { id: "arquivos", title: "Arquivos & Entregáveis", icon: FolderArchive, badge: "PDF" },
    ],
  },
]

export function AppSidebar({
  currentTab,
  onSelectTab,
  collapsed,
  mobileOpen,
  onCloseMobile,
}: {
  currentTab: TabKey
  onSelectTab: (tab: TabKey) => void
  collapsed: boolean
  mobileOpen: boolean
  onCloseMobile: () => void
}) {
  return (
    <>
      {/* 1. Backdrop Móvel: Escurece a tela quando o menu lateral abre */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* 2. Container da Sidebar:
             - Desktop: Largura fixa (w-64 ou w-16 se colapsada)
             - Mobile: Oculta por padrão (hidden) e desliza como Sheet Drawer quando mobileOpen é true
      */}
      <aside
        className={cn(
          "bg-card border-r border-border flex flex-col select-none transition-all duration-300 ease-in-out z-50",
          // Mobile classes: Fixed drawer
          "fixed top-0 bottom-0 left-0 w-72 shadow-2xl lg:shadow-none lg:static",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          // Desktop classes
          collapsed ? "lg:w-16" : "lg:w-64"
        )}
      >
        {/* Header da Sidebar */}
        <div className="flex h-16 items-center px-4 border-b border-border justify-between shrink-0">
          {(!collapsed || mobileOpen) ? (
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground font-black text-sm tracking-wider shadow-sm">
                CR
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold truncate leading-tight uppercase tracking-wider text-foreground">
                  PPGHS / UERJ 2027
                </span>
                <span className="text-[10px] text-muted-foreground truncate font-mono">
                  Mestrado · Hist. Social
                </span>
              </div>
            </div>
          ) : (
            <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-black text-sm">
              CR
            </div>
          )}

          {(!collapsed || mobileOpen) && (
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-[9px] px-1.5 py-0 h-4 uppercase font-mono tracking-tighter shrink-0 border-primary/30 text-primary">
                DEMO
              </Badge>
              {mobileOpen && (
                <button
                  type="button"
                  onClick={onCloseMobile}
                  className="lg:hidden p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Itens de Navegação com Clique Reativo */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {navSections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-1">
              {(!collapsed || mobileOpen) && (
                <h4 className="px-2 text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
                  {section.title}
                </h4>
              )}
              <div className="space-y-1 pt-1">
                {section.items.map((item) => {
                  const isActive = currentTab === item.id
                  const Icon = item.icon

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        onSelectTab(item.id)
                        onCloseMobile()
                      }}
                      title={collapsed && !mobileOpen ? item.title : undefined}
                      className={cn(
                        "w-full flex items-center gap-3 rounded-lg px-2.5 py-2.5 text-xs font-medium transition-all group relative text-left cursor-pointer",
                        isActive
                          ? "bg-accent text-accent-foreground font-semibold shadow-sm"
                          : "text-muted-foreground hover:bg-accent/60 hover:text-foreground",
                        collapsed && !mobileOpen && "justify-center px-0 py-2.5"
                      )}
                    >
                      <Icon
                        className={cn(
                          "size-4 shrink-0 transition-transform group-hover:scale-105",
                          isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                        )}
                      />
                      {(!collapsed || mobileOpen) && (
                        <span className="truncate flex-1">{item.title}</span>
                      )}
                      {(!collapsed || mobileOpen) && item.badge && (
                        <span className="ml-auto text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground border border-border">
                          {item.badge}
                        </span>
                      )}

                      {/* Active indicator */}
                      {isActive && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full bg-primary" />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Rodapé com Card de Perfil */}
        <div className="p-3 border-t border-border mt-auto shrink-0">
          <div
            className={cn(
              "flex items-center gap-3 rounded-lg p-1.5 transition-colors hover:bg-accent/60 cursor-pointer",
              collapsed && !mobileOpen && "justify-center p-0"
            )}
          >
            <Avatar className="h-8 w-8 rounded-lg shrink-0 border border-border">
              <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces" />
              <AvatarFallback className="rounded-lg bg-primary/10 text-primary font-bold text-xs">
                JG
              </AvatarFallback>
            </Avatar>
            {(!collapsed || mobileOpen) && (
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-xs font-semibold truncate leading-tight">
                  João Gabriel
                </span>
                <span className="text-[10px] text-muted-foreground truncate font-mono">
                  joga8991@gmail.com
                </span>
              </div>
            )}
            {(!collapsed || mobileOpen) && (
              <ChevronsUpDown className="size-3.5 text-muted-foreground shrink-0" />
            )}
          </div>
        </div>
      </aside>
    </>
  )
}
