"use client"

import * as React from "react"
import { AppSidebar, TabKey } from "@/components/app-sidebar"
import { Header } from "@/components/header"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [collapsed, setCollapsed] = React.useState(false)
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [currentTab, setCurrentTab] = React.useState<TabKey>("overview")

  return (
    <div className="flex min-h-screen bg-background text-foreground antialiased">
      {/* Sidebar Colapsável */}
      <AppSidebar
        currentTab={currentTab}
        onSelectTab={(tab) => setCurrentTab(tab)}
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-x-hidden">
        <Header
          currentTab={currentTab}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          onOpenMobile={() => setMobileOpen(true)}
        />
        <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  )
}
