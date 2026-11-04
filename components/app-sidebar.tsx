"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
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
  ChevronDown,
  ChevronsUpDown,
  Sparkles,
  Search,
  Bell,
  PanelLeft,
  CheckCircle2,
  GraduationCap
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface NavItem {
  title: string
  href: string
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
      { title: "Dashboard", href: "/dashboard/overview", icon: LayoutDashboard },
      { title: "Cronograma Tático", href: "/dashboard/cronograma", icon: CalendarDays, badge: "12 Sem" },
    ],
  },
  {
    title: "Trilha de Estudos",
    items: [
      { title: "Bibliografia & Textos", href: "/dashboard/textos", icon: BookOpen, badge: "12" },
      { title: "Legislação & Normativos", href: "/dashboard/legislacao", icon: Scale },
      { title: "Conexões Interdisciplinares", href: "/dashboard/conexoes", icon: Network },
    ],
  },
  {
    title: "Ferramentas Táticas",
    items: [
      { title: "Flashcards SM-2", href: "/dashboard/flashcards", icon: BrainCircuit },
      { title: "Pomodoro & Foco", href: "/dashboard/pomodoro", icon: Timer },
      { title: "Simulados & Arguição", href: "/dashboard/simulados", icon: FileQuestion },
    ],
  },
  {
    title: "Acervo & Suporte",
    items: [
      { title: "Dicas da Banca", href: "/dashboard/dicas", icon: Lightbulb },
      { title: "Arquivos & Entregáveis", href: "/dashboard/arquivos", icon: FolderArchive, badge: "PDF" },
      { title: "Central de Suporte", href: "/dashboard/suporte", icon: Headphones },
    ],
  },
]

export function AppSidebar({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean
  setCollapsed: (val: boolean) => void
}) {
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        "relative flex flex-col border-r border-border bg-card transition-all duration-300 ease-in-out z-30 select-none",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* 1. Header da Organização / Certame */}
      <div className="flex h-16 items-center px-3 border-b border-border justify-between">
        {!collapsed ? (
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

        {!collapsed && (
          <Badge variant="outline" className="text-[9px] px-1.5 py-0 h-4 uppercase font-mono tracking-tighter shrink-0 border-primary/30 text-primary">
            DEMO
          </Badge>
        )}
      </div>

      {/* 2. Menu de Navegação Segmentado */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {navSections.map((section, idx) => (
          <div key={idx} className="space-y-1">
            {!collapsed && (
              <h4 className="px-2 text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
                {section.title}
              </h4>
            )}
            <div className="space-y-0.5 pt-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href || (item.href === "/dashboard/overview" && pathname === "/dashboard")
                const Icon = item.icon

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    title={collapsed ? item.title : undefined}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-2.5 py-2 text-xs font-medium transition-colors group relative",
                      isActive
                        ? "bg-accent text-accent-foreground font-semibold"
                        : "text-muted-foreground hover:bg-accent/60 hover:text-foreground",
                      collapsed && "justify-center px-0"
                    )}
                  >
                    <Icon
                      className={cn(
                        "size-4 shrink-0 transition-transform group-hover:scale-105",
                        isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                      )}
                    />
                    {!collapsed && (
                      <span className="truncate flex-1">{item.title}</span>
                    )}
                    {!collapsed && item.badge && (
                      <span className="ml-auto text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground border border-border">
                        {item.badge}
                      </span>
                    )}

                    {/* Active left indicator pill */}
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 rounded-r-full bg-primary" />
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* 3. Rodapé com Card de Perfil do Aluno */}
      <div className="p-3 border-t border-border mt-auto">
        <div
          className={cn(
            "flex items-center gap-3 rounded-lg p-1.5 transition-colors hover:bg-accent/60 cursor-pointer",
            collapsed && "justify-center p-0"
          )}
        >
          <Avatar className="h-8 w-8 rounded-lg shrink-0 border border-border">
            <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces" />
            <AvatarFallback className="rounded-lg bg-primary/10 text-primary font-bold text-xs">
              JG
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-xs font-semibold truncate leading-tight">
                João Gabriel
              </span>
              <span className="text-[10px] text-muted-foreground truncate">
                joga8991@gmail.com
              </span>
            </div>
          )}
          {!collapsed && (
            <ChevronsUpDown className="size-3.5 text-muted-foreground shrink-0" />
          )}
        </div>
      </div>
    </aside>
  )
}
