"use client"

import * as React from "react"
import { AppSidebar, TabKey, LEGACY_TABS } from "@/components/app-sidebar"
import { Header } from "@/components/header"

// Módulos correspondentes às abas funcionais do legacy
import OverviewPage from "./dashboard/overview/page"
import CronogramaPage from "./dashboard/cronograma/page"
import TextosPage from "./dashboard/textos/page"
import FlashcardsPage from "./dashboard/flashcards/page"
import PomodoroPage from "./dashboard/pomodoro/page"
import SimuladosPage from "./dashboard/simulados/page"
import ArguicaoPage from "./dashboard/simulados/arguicao-view"
import ConexoesPage from "./dashboard/conexoes/page"
import ArquivosPage from "./dashboard/arquivos/page"
import DicasPage from "./dashboard/dicas/page"
import DadosPage from "./dashboard/dados/page"
import PerfilPage from "./dashboard/perfil/page"

export default function RootPage() {
  const [currentTab, setCurrentTab] = React.useState<TabKey>("home")
  const [collapsed, setCollapsed] = React.useState(false)
  const [mobileOpen, setMobileOpen] = React.useState(false)

  // Sincroniza hash inicial com URL
  React.useEffect(() => {
    const handleHash = () => {
      const raw = window.location.hash.replace("#", "")
      const valid = LEGACY_TABS.map((t) => t.id)
      if (valid.includes(raw as TabKey)) {
        setCurrentTab(raw as TabKey)
      } else if (raw === "overview") {
        setCurrentTab("home")
      }
    }
    handleHash()
    window.addEventListener("hashchange", handleHash)
    return () => window.removeEventListener("hashchange", handleHash)
  }, [])

  const handleSelectTab = (tab: TabKey) => {
    setCurrentTab(tab)
    window.location.hash = tab
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground antialiased selection:bg-primary/20">
      {/* 1. Sidebar Interativa */}
      <AppSidebar
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      {/* 2. Área de Conteúdo Principal */}
      <div className="flex flex-1 flex-col min-w-0 overflow-x-hidden">
        <Header
          currentTab={currentTab}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          onOpenMobile={() => setMobileOpen(true)}
        />

        <main className="flex-1 w-full max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8 font-sans">
          {currentTab === "home" && <OverviewPage />}
          {currentTab === "crono" && <CronogramaPage />}
          {currentTab === "textos" && <TextosPage />}
          {currentTab === "cards" && <FlashcardsPage />}
          {currentTab === "pomo" && <PomodoroPage />}
          {currentTab === "sim" && <SimuladosPage />}
          {currentTab === "arg" && <ArguicaoPage />}
          {currentTab === "mapa" && <ConexoesPage />}
          {currentTab === "links" && <ArquivosPage />}
          {currentTab === "dicas" && <DicasPage />}
          {currentTab === "dados" && <DadosPage />}
          {currentTab === "perfil" && <PerfilPage />}
        </main>
      </div>
    </div>
  )
}
