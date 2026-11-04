"use client"

import * as React from "react"
import demoDatasetRaw from "@/lib/demo-dataset.json"

export interface DemoTextItem {
  id: string
  autor: string
  titulo: string
  prio: "ESSENCIAL" | "IMPORTANTE" | "SECUNDÁRIO"
  sec: string
  tese: string
  territorio?: string
  conexoes?: [string, string][]
  arq?: string
  ref?: string
}

export interface DemoSchedItem {
  d: string
  h: number
  t: string
  i: number
}

export interface DemoDataset {
  texts: DemoTextItem[]
  sched: DemoSchedItem[]
  sim: any[]
  arg: any[]
  rubric: any[]
  tabs: any[]
  vespera?: any[]
  escrita?: string
}

interface DemoState {
  completedTexts: Record<string, string>
  studyLogs: { d: string; t: string; m: number }[]
  flashcardProgress: Record<string, any>
  dailyStreak: number
}

interface DemoContextValue {
  data: DemoDataset
  state: DemoState
  totalHoursStudied: number
  completedTextsCount: number
  totalTextsCount: number
  daysUntilExam: number
  markTextStatus: (id: string, status: string) => void
  addStudyMinutes: (textId: string, minutes: number) => void
}

const defaultState: DemoState = {
  completedTexts: { haesbaert: "ok", thompson_cc: "ok", certeau: "ok" },
  studyLogs: [
    { d: "2026-10-14", t: "haesbaert", m: 90 },
    { d: "2026-10-15", t: "thompson_cc", m: 120 },
    { d: "2026-10-18", t: "certeau", m: 150 },
    { d: "2026-10-21", t: "hartog", m: 80 },
    { d: "2026-10-25", t: "poulantzas", m: 110 },
    { d: "2026-10-29", t: "catroga", m: 130 },
    { d: "2026-11-01", t: "haesbaert", m: 100 },
    { d: "2026-11-03", t: "thompson_em", m: 140 },
  ],
  flashcardProgress: {},
  dailyStreak: 14,
}

const DemoDataContext = React.createContext<DemoContextValue | null>(null)

export function DemoDataProvider({ children }: { children: React.ReactNode }) {
  const data = demoDatasetRaw as unknown as DemoDataset
  const [state, setState] = React.useState<DemoState>(defaultState)

  // Lê localStorage com segurança pós-montagem para evitar descompasso de hidratação
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem("ppghs_painel_v1")
      if (saved) {
        const parsed = JSON.parse(saved)
        setState({
          completedTexts: parsed.texts || defaultState.completedTexts,
          studyLogs: parsed.log && parsed.log.length ? parsed.log : defaultState.studyLogs,
          flashcardProgress: parsed.cards || {},
          dailyStreak: 14,
        })
      }
    } catch (e) {
      console.warn("Could not load local demo state", e)
    }
  }, [])

  const totalMinutes = state.studyLogs.reduce((acc, log) => acc + log.m, 0)
  const totalHoursStudied = Number((totalMinutes / 60).toFixed(1))

  const completedTextsCount = Object.values(state.completedTexts).filter(
    (st) => st === "ok" || st === "rev"
  ).length
  const totalTextsCount = data.texts?.length || 12
  const daysUntilExam = 42

  const markTextStatus = (id: string, status: string) => {
    setState((prev) => {
      const updated = {
        ...prev,
        completedTexts: { ...prev.completedTexts, [id]: status },
      }
      try {
        const raw = localStorage.getItem("ppghs_painel_v1")
        const parsed = raw ? JSON.parse(raw) : {}
        parsed.texts = updated.completedTexts
        localStorage.setItem("ppghs_painel_v1", JSON.stringify(parsed))
      } catch (e) {}
      return updated
    })
  }

  const addStudyMinutes = (textId: string, minutes: number) => {
    setState((prev) => {
      const todayIso = new Date().toISOString().slice(0, 10)
      const updated = {
        ...prev,
        studyLogs: [...prev.studyLogs, { d: todayIso, t: textId, m: minutes }],
      }
      try {
        const raw = localStorage.getItem("ppghs_painel_v1")
        const parsed = raw ? JSON.parse(raw) : {}
        parsed.log = updated.studyLogs
        localStorage.setItem("ppghs_painel_v1", JSON.stringify(parsed))
      } catch (e) {}
      return updated
    })
  }

  return (
    <DemoDataContext.Provider
      value={{
        data,
        state,
        totalHoursStudied,
        completedTextsCount,
        totalTextsCount,
        daysUntilExam,
        markTextStatus,
        addStudyMinutes,
      }}
    >
      {children}
    </DemoDataContext.Provider>
  )
}

export function useDemoData() {
  const context = React.useContext(DemoDataContext)
  if (!context) {
    throw new Error("useDemoData must be used within a DemoDataProvider")
  }
  return context
}
