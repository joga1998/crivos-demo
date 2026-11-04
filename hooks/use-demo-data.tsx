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
  conceitos?: [string, string][]
  cit?: [string, string, string?][]
  ex_comp?: [string, string][]
  arq?: string
  ref?: string
}

export interface DemoSchedItem {
  d: string
  h: number
  t: string
  i: number
}

export interface DemoCard {
  id: string
  t: string
  f: string
  b: string
  p?: string
}

export interface CardState {
  ef: number
  n: number
  iv: number
  due: string
  first?: string
}

export interface SimuladoSubmission {
  id: string
  date: string
  answers: Record<number, string>
  scores?: Record<number, number>
  totalScore?: number
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

export interface LegacyAppState {
  days: Record<number, string> // completed status of sched tasks: 'done'
  moved: Record<number, string> // rescheduled tasks
  texts: Record<string, string> // 'lido' | 'fichado' | 'dominado'
  notes: Record<string, string> // notes per text
  cards: Record<string, CardState> // SM-2 card state
  log: Array<{ d: string; t: string; m: number }> // study logs
  sims: SimuladoSubmission[]
  args: Record<number, { c: number; date: string }> // arguição progress
  theme: string
  pomo: { w: number; b: number; lb: number }
  drafts: Record<string, string>
  lastTab: string
}

const defaultLegacyState: LegacyAppState = {
  days: {},
  moved: {},
  texts: { haesbaert: "dominado", thompson_cc: "fichado", certeau: "lido" },
  notes: {},
  cards: {},
  log: [
    { d: "2026-10-14", t: "haesbaert", m: 90 },
    { d: "2026-10-15", t: "thompson_cc", m: 120 },
    { d: "2026-10-18", t: "certeau", m: 150 },
    { d: "2026-10-21", t: "hartog", m: 80 },
    { d: "2026-10-25", t: "poulantzas", m: 110 },
    { d: "2026-10-29", t: "catroga", m: 130 },
    { d: "2026-11-01", t: "haesbaert", m: 100 },
    { d: "2026-11-03", t: "thompson_em", m: 140 },
  ],
  sims: [],
  args: {},
  theme: "dark",
  pomo: { w: 25, b: 5, lb: 15 },
  drafts: {},
  lastTab: "home",
}

interface DemoContextValue {
  data: DemoDataset
  state: LegacyAppState
  cards: DemoCard[]
  totalHoursStudied: number
  completedTextsCount: number
  totalTextsCount: number
  daysUntilExam: number
  // Ações de Estado Tático
  toggleDayTask: (index: number) => void
  markTextStatus: (id: string, status: string) => void
  saveTextNote: (id: string, note: string) => void
  addStudyLog: (textId: string, minutes: number) => void
  gradeCardSM2: (cardId: string, rating: number) => void
  saveSimulado: (answers: Record<number, string>) => void
  rateArguicao: (questionIdx: number, confidence: number) => void
  updatePomoSettings: (settings: { w: number; b: number; lb: number }) => void
}

const DemoDataContext = React.createContext<DemoContextValue | null>(null)

export function DemoDataProvider({ children }: { children: React.ReactNode }) {
  const data = demoDatasetRaw as unknown as DemoDataset
  const [state, setState] = React.useState<LegacyAppState>(defaultLegacyState)

  // 1. Gera cards SM-2 completos da bibliografia oficial
  const cards = React.useMemo(() => {
    const list: DemoCard[] = []
    if (!data.texts) return list

    data.texts.forEach((t) => {
      const a = t.autor ? t.autor.split(" ").pop() || "" : ""
      if (t.conceitos) {
        t.conceitos.forEach((k, j) => {
          list.push({
            id: `${t.id}_c${j}`,
            t: t.id,
            f: `${a} · CONCEITO: ${k[0]}`,
            b: k[1],
          })
        })
      }
      if (t.cit) {
        t.cit.forEach((k, j) => {
          list.push({
            id: `${t.id}_q${j}`,
            t: t.id,
            f: `QUEM DISSE E EM QUE CONTEXTO? "${k[1]}"`,
            b: `${a}, ${k[0]}. ${k[2] || ""}`,
            p: k[0],
          })
        })
      }
      if (t.ex_comp) {
        t.ex_comp.forEach((k, j) => {
          list.push({
            id: `${t.id}_e${j}`,
            t: t.id,
            f: `${a} · EXERCÍCIO: ${k[0]}`,
            b: k[1],
          })
        })
      }
    })
    return list
  }, [data])

  // 2. Hidratação LocalStorage segura pós-montagem
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem("ppghs_painel_v1")
      if (saved) {
        const parsed = JSON.parse(saved)
        setState((prev) => ({
          ...prev,
          days: parsed.days || prev.days,
          moved: parsed.moved || prev.moved,
          texts: parsed.texts || prev.texts,
          notes: parsed.notes || prev.notes,
          cards: parsed.cards || prev.cards,
          log: parsed.log && parsed.log.length ? parsed.log : prev.log,
          sims: parsed.sims || prev.sims,
          args: parsed.args || prev.args,
          pomo: parsed.pomo || prev.pomo,
          drafts: parsed.drafts || prev.drafts,
        }))
      }
    } catch (e) {
      console.warn("Could not read local storage state:", e)
    }
  }, [])

  // Persiste estado no localStorage
  const persist = (next: LegacyAppState) => {
    setState(next)
    try {
      localStorage.setItem("ppghs_painel_v1", JSON.stringify(next))
    } catch (e) {
      console.warn("Could not persist state", e)
    }
  }

  // 3. Ações
  const toggleDayTask = (index: number) => {
    const isDone = state.days[index] === "done"
    const nextDays = { ...state.days }
    if (isDone) {
      delete nextDays[index]
    } else {
      nextDays[index] = "done"
    }
    persist({ ...state, days: nextDays })
  }

  const markTextStatus = (id: string, status: string) => {
    const nextTexts = { ...state.texts, [id]: status }
    persist({ ...state, texts: nextTexts })
  }

  const saveTextNote = (id: string, note: string) => {
    const nextNotes = { ...state.notes, [id]: note }
    persist({ ...state, notes: nextNotes })
  }

  const addStudyLog = (textId: string, minutes: number) => {
    if (minutes <= 0) return
    const today = new Date().toISOString().slice(0, 10)
    const nextLog = [...state.log, { d: today, t: textId || "geral", m: minutes }]
    persist({ ...state, log: nextLog })
  }

  const gradeCardSM2 = (cardId: string, q: number) => {
    // Algoritmo SuperMemo 2 canônico do index.legacy
    const cur = state.cards[cardId] || { ef: 2.5, n: 0, iv: 0, due: "" }
    const c = { ...cur }

    if (q < 3) {
      c.n = 0
      c.iv = 1
    } else {
      c.n++
      c.iv = c.n === 1 ? 1 : c.n === 2 ? 3 : Math.round(c.iv * c.ef)
    }

    c.ef = Math.max(1.3, c.ef + 0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))

    const d = new Date()
    d.setDate(d.getDate() + c.iv)
    c.due = d.toISOString().slice(0, 10)
    if (!c.first) c.first = new Date().toISOString().slice(0, 10)

    const nextCards = { ...state.cards, [cardId]: c }
    persist({ ...state, cards: nextCards })
  }

  const saveSimulado = (answers: Record<number, string>) => {
    const sub: SimuladoSubmission = {
      id: `sim_${Date.now()}`,
      date: new Date().toISOString(),
      answers,
    }
    persist({ ...state, sims: [sub, ...state.sims] })
  }

  const rateArguicao = (questionIdx: number, confidence: number) => {
    const nextArgs = {
      ...state.args,
      [questionIdx]: { c: confidence, date: new Date().toISOString().slice(0, 10) },
    }
    persist({ ...state, args: nextArgs })
  }

  const updatePomoSettings = (settings: { w: number; b: number; lb: number }) => {
    persist({ ...state, pomo: settings })
  }

  const totalMinutes = state.log.reduce((acc, l) => acc + l.m, 0)
  const totalHoursStudied = Number((totalMinutes / 60).toFixed(1))
  const completedTextsCount = Object.keys(state.texts).filter(
    (k) => state.texts[k] && state.texts[k] !== ""
  ).length
  const totalTextsCount = data.texts?.length || 12
  const daysUntilExam = 42

  return (
    <DemoDataContext.Provider
      value={{
        data,
        state,
        cards,
        totalHoursStudied,
        completedTextsCount,
        totalTextsCount,
        daysUntilExam,
        toggleDayTask,
        markTextStatus,
        saveTextNote,
        addStudyLog,
        gradeCardSM2,
        saveSimulado,
        rateArguicao,
        updatePomoSettings,
      }}
    >
      {children}
    </DemoDataContext.Provider>
  )
}

export function useDemoData() {
  const ctx = React.useContext(DemoDataContext)
  if (!ctx) {
    throw new Error("useDemoData must be used within a DemoDataProvider")
  }
  return ctx
}
