"use client"

import * as React from "react"
import { AppSidebar, TabKey } from "@/components/app-sidebar"
import { Header } from "@/components/header"

// Módulos
import OverviewPage from "./dashboard/overview/page"
import CronogramaPage from "./dashboard/cronograma/page"
import TextosPage from "./dashboard/textos/page"
import ConexoesPage from "./dashboard/conexoes/page"
import FlashcardsPage from "./dashboard/flashcards/page"
import PomodoroPage from "./dashboard/pomodoro/page"
import SimuladosPage from "./dashboard/simulados/page"
import ArquivosPage from "./dashboard/arquivos/page"

export default function RootPage() {
  const [currentTab, setCurrentTab] = React.useState<TabKey>("overview")
  const [collapsed, setCollapsed] = React.useState(false)
  const [mobileOpen, setMobileOpen] = React.useState(false)

  // Lê hash inicial pós montagem segura
  React.useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "") as TabKey
      if (
        [
          "overview",
          "cronograma",
          "textos",
          "conexoes",
          "flashcards",
          "pomodoro",
          "simulados",
          "arquivos",
        ].includes(hash)
      ) {
        setCurrentTab(hash)
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
      {/* 1. Sidebar Interativa (Desktop fixa/retrátil + Mobile Sheet Drawer) */}
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

        <main className="flex-1 p-3 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full transition-all">
          {currentTab === "overview" && <OverviewPage />}
          {currentTab === "cronograma" && <CronogramaPage />}
          {currentTab === "textos" && <TextosPage />}
          {currentTab === "conexoes" && <ConexoesPage />}
          {currentTab === "flashcards" && <FlashcardsPage />}
          {currentTab === "pomodoro" && <PomodoroPage />}
          {currentTab === "simulados" && <SimuladosPage />}
          {currentTab === "arquivos" && <ArquivosPage />}
        </main>
      </div>
    </div>
  )
}
