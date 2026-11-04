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
      { id: "cronograma", title: "Cronograma Tático", icon: CalendarDays },
    ],
  },
  {
    title: "Trilha de Estudos",
    items: [
      { id: "textos", title: "Bibliografia & Textos", icon: BookOpen },
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
      { id: "arquivos", title: "Arquivos & Entregáveis", icon: FolderArchive },
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
      {/* 1. Backdrop Móvel */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* 2. Container da Sidebar shadcn */}
      <aside
        className={cn(
          "bg-card border-r border-border/60 flex flex-col select-none transition-all duration-300 ease-in-out z-50",
          // Mobile classes: Fixed drawer
          "fixed top-0 bottom-0 left-0 w-64 shadow-2xl lg:shadow-none lg:static",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          // Desktop classes
          collapsed ? "lg:w-16" : "lg:w-60"
        )}
      >
        {/* Header da Sidebar */}
        <div className="flex h-14 items-center px-4 border-b border-border/60 justify-between shrink-0">
          {(!collapsed || mobileOpen) ? (
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground font-black text-xs tracking-wider shadow-sm">
                CR
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold truncate leading-tight uppercase tracking-wider text-foreground">
                  crivos
                </span>
                <span className="text-[10px] text-muted-foreground truncate font-mono">
                  PPGHS · UERJ 2027
                </span>
              </div>
            </div>
          ) : (
            <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-black text-xs">
              CR
            </div>
          )}

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

        {/* Itens de Navegação no formato shadcn */}
        <div className="flex-1 overflow-y-auto px-2.5 py-3 space-y-4">
          {navSections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-1">
              {(!collapsed || mobileOpen) && (
                <h4 className="px-2 text-[10px] font-semibold text-muted-foreground/80 uppercase tracking-wider">
                  {section.title}
                </h4>
              )}
              <div className="space-y-0.5">
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
                        "w-full flex items-center gap-3 rounded-md px-2.5 py-2 text-xs font-medium transition-colors text-left cursor-pointer",
                        isActive
                          ? "bg-accent text-accent-foreground font-semibold"
                          : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
                        collapsed && !mobileOpen && "justify-center px-0 py-2"
                      )}
                    >
                      <Icon
                        className={cn(
                          "size-4 shrink-0",
                          isActive ? "text-foreground" : "text-muted-foreground"
                        )}
                      />
                      {(!collapsed || mobileOpen) && (
                        <span className="truncate flex-1">{item.title}</span>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Rodapé com Avatar estilo Kiranism */}
        <div className="p-2 border-t border-border/60 mt-auto shrink-0">
          <div
            className={cn(
              "flex items-center gap-2.5 p-2 rounded-md hover:bg-accent/50 transition-colors cursor-pointer",
              collapsed && !mobileOpen && "justify-center p-1"
            )}
          >
            <Avatar className="h-7 w-7 rounded-full border border-border/40 shrink-0">
              <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces" alt="João Gabriel" />
              <AvatarFallback className="text-[10px] bg-muted">JG</AvatarFallback>
            </Avatar>
            {(!collapsed || mobileOpen) && (
              <>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-xs font-semibold text-foreground truncate">
                    João Gabriel
                  </span>
                  <span className="text-[10px] text-muted-foreground truncate">
                    joao@crivos.me
                  </span>
                </div>
                <ChevronsUpDown className="size-3 text-muted-foreground shrink-0" />
              </>
            )}
          </div>
        </div>
      </aside>
    </>
  )
}
