"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface CaseData {
  role: "defendant" | "plaintiff"
  cause: "loan" | "consumer" | "tenancy"
  court?: { name: string }
  caseNo?: string
  hearingDate?: string
  deadlines: { name: string; date: string }[]
  parties: {
    plaintiff: { name: string; contact: string; address: string }
    defendant: { name: string; contact: string; address: string }
  }
  claims: Array<{ idx: number; text: string; amount?: number }>
  timeline: Array<{ date: string; event: string; evidenceId?: string }>
  evidence: Array<{
    id: string
    title: string
    category: string
    purpose: string
    status: "have" | "lack" | "todo"
    formedAt?: string
    sourceHint: string
  }>
  legalRefs: Array<{ name: string; article: string; summary: string }>
}

interface CaseContextType {
  caseData: Partial<CaseData>
  setCaseData: (data: Partial<CaseData>) => void
  updateCaseData: (updates: Partial<CaseData>) => void
}

const CaseContext = createContext<CaseContextType | undefined>(undefined)

export function CaseProvider({ children }: { children: ReactNode }) {
  const [caseData, setCaseData] = useState<Partial<CaseData>>({
    deadlines: [],
    parties: {
      plaintiff: { name: "", contact: "", address: "" },
      defendant: { name: "", contact: "", address: "" },
    },
    claims: [],
    timeline: [],
    evidence: [],
    legalRefs: [],
  })

  const updateCaseData = (updates: Partial<CaseData>) => {
    setCaseData((prev) => ({ ...prev, ...updates }))
  }

  return <CaseContext.Provider value={{ caseData, setCaseData, updateCaseData }}>{children}</CaseContext.Provider>
}

export function useCaseData() {
  const context = useContext(CaseContext)
  if (!context) {
    throw new Error("useCaseData must be used within CaseProvider")
  }
  return context
}
