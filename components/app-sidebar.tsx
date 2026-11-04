"use client"

import * as React from "react"
import {
  LayoutDashboard,
  CalendarDays,
  BookOpen,
  BrainCircuit,
  Timer,
  FileQuestion,
  Mic,
  Network,
  FolderArchive,
  Lightbulb,
  Headphones,
  User,
  ChevronsUpDown,
  X
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export type TabKey =
  | "home"
  | "crono"
  | "textos"
  | "cards"
  | "pomo"
  | "sim"
  | "arg"
  | "mapa"
  | "links"
  | "dicas"
  | "dados"
  | "perfil"

export interface NavItem {
  id: TabKey
  title: string
  icon: React.ElementType
}

export const LEGACY_TABS: NavItem[] = [
  { id: "home", title: "Início", icon: LayoutDashboard },
  { id: "crono", title: "Cronograma", icon: CalendarDays },
  { id: "textos", title: "Textos", icon: BookOpen },
  { id: "cards", title: "Flashcards", icon: BrainCircuit },
  { id: "pomo", title: "Pomodoro", icon: Timer },
  { id: "sim", title: "Simulado", icon: FileQuestion },
  { id: "arg", title: "Arguição", icon: Mic },
  { id: "mapa", title: "Conexões", icon: Network },
  { id: "links", title: "Arquivos", icon: FolderArchive },
  { id: "dicas", title: "Dicas", icon: Lightbulb },
  { id: "dados", title: "Suporte", icon: Headphones },
  { id: "perfil", title: "Perfil", icon: User },
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
      {/* Backdrop Mobile */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          "bg-card border-r border-border/60 flex flex-col select-none transition-all duration-300 ease-in-out z-50",
          "fixed top-0 bottom-0 left-0 w-64 shadow-2xl lg:shadow-none lg:static",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          collapsed ? "lg:w-16" : "lg:w-60"
        )}
      >
        {/* Header da Sidebar com Brand CRIVOS */}
        <div className="flex h-14 items-center px-4 border-b border-border/60 justify-between shrink-0">
          {(!collapsed || mobileOpen) ? (
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[3px] bg-primary text-primary-foreground font-black text-xs font-brand tracking-wider shadow-sm">
                CR
              </span>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-bold truncate leading-tight uppercase tracking-wider text-foreground font-brand">
                  crivos
                </span>
                <span className="text-[10px] text-muted-foreground truncate font-mono">
                  PPGHS · UERJ 2027
                </span>
              </div>
            </div>
          ) : (
            <div className="mx-auto flex h-7 w-7 items-center justify-center rounded-[3px] bg-primary text-primary-foreground font-black text-xs font-brand">
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

        {/* Lista Unificada Idêntica ao TABS do Legacy (sem reagrupamentos) */}
        <div className="flex-1 overflow-y-auto px-2.5 py-3 space-y-1">
          {LEGACY_TABS.map((item) => {
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
                  "w-full flex items-center gap-3 rounded-md px-2.5 py-2 text-xs font-medium font-elements transition-colors text-left cursor-pointer",
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
                  <span className="truncate flex-1 tracking-tight">{item.title}</span>
                )}
              </button>
            )
          })}
        </div>

        {/* Perfil no Rodapé */}
        <div className="p-2 border-t border-border/60 mt-auto shrink-0">
          <div
            className={cn(
              "flex items-center gap-2.5 p-2 rounded-md hover:bg-accent/50 transition-colors cursor-pointer",
              collapsed && !mobileOpen && "justify-center p-1"
            )}
          >
            <Avatar className="h-7 w-7 rounded-full border border-border/40 shrink-0">
              <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces" alt="João Gabriel" />
              <AvatarFallback className="text-[10px] bg-muted font-brand">JG</AvatarFallback>
            </Avatar>
            {(!collapsed || mobileOpen) && (
              <>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-xs font-semibold text-foreground truncate font-brand">
                    João Gabriel
                  </span>
                  <span className="text-[10px] text-muted-foreground truncate font-mono">
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
