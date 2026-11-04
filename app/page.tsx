"use client"

import OverviewPage from "./dashboard/overview/page"
import DashboardLayout from "./dashboard/layout"

export default function RootPage() {
  return (
    <DashboardLayout>
      <OverviewPage />
    </DashboardLayout>
  )
}
