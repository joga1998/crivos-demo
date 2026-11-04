"use client"

import * as React from "react"
import Link from "next/link"
import {
  LayoutDashboard,
  CalendarDays,
  BookOpen,
  Scale,
  BrainCircuit,
  Timer,
  FileQuestion,
  Network,
  FolderArchive,
  Lightbulb,
  Headphones,
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
  | "dicas"
  | "suporte"

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
      {/* Backdrop para Mobile */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      <aside
        className={cn(
          "fixed top-0 bottom-0 left-0 z-50 flex flex-col border-r border-border bg-card transition-all duration-300 ease-in-out select-none lg:static",
          collapsed ? "lg:w-16" : "lg:w-64",
          mobileOpen ? "translate-x-0 w-64 shadow-2xl" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* 1. Header da Organização / Certame */}
        <div className="flex h-16 items-center px-3 border-b border-border justify-between">
          {(!collapsed || mobileOpen) ? (
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground font-black text-sm tracking-wider">
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
            <Badge variant="outline" className="text-[9px] px-1.5 py-0 h-4 uppercase font-mono tracking-tighter shrink-0 border-primary/30 text-primary">
              DEMO
            </Badge>
          )}

          {/* Botão Fechar no Mobile */}
          {mobileOpen && (
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1 rounded-md text-muted-foreground hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        {/* 2. Menu de Navegação com Troca de Estado Instantânea */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {navSections.map((section, idx) => (
            <div key={idx} className="space-y-1">
              {(!collapsed || mobileOpen) && (
                <h4 className="px-2 text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
                  {section.title}
                </h4>
              )}
              <div className="space-y-0.5 pt-1">
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
                        "w-full flex items-center gap-3 rounded-lg px-2.5 py-2 text-xs font-medium transition-colors group relative text-left",
                        isActive
                          ? "bg-accent text-accent-foreground font-semibold"
                          : "text-muted-foreground hover:bg-accent/60 hover:text-foreground",
                        collapsed && !mobileOpen && "justify-center px-0"
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
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 rounded-r-full bg-primary" />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* 3. Rodapé com Card de Perfil */}
        <div className="p-3 border-t border-border mt-auto">
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
                <span className="text-[10px] text-muted-foreground truncate">
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
