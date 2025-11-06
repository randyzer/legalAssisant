"use client"

import { useState, useEffect } from "react"

export interface CaseData {
  role: "defendant" | "plaintiff"
  cause: "loan" | "consumer" | "tenancy"
  caseNo?: string
  claim?: string
  deadline?: string
  plaintiffName?: string
  defendantName?: string
  claims?: Array<{ idx: number; text: string; amount?: number }>
  timeline?: Array<{ date: string; event: string }>
  evidence?: Array<{ id: string; title: string; category: string }>
}

const STORAGE_KEY = "caseData"

export function useCaseStorage() {
  const [caseData, setCaseData] = useState<Partial<CaseData> | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  // 从localStorage加载数据
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        setCaseData(JSON.parse(stored))
      } catch (e) {
        console.error("Failed to parse stored case data:", e)
      }
    }
    setIsLoaded(true)
  }, [])

  // 保存数据到localStorage
  const saveCaseData = (data: Partial<CaseData>) => {
    setCaseData(data)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }

  // 更新数据
  const updateCaseData = (updates: Partial<CaseData>) => {
    const newData = { ...caseData, ...updates }
    saveCaseData(newData)
  }

  // 清除数据
  const clearCaseData = () => {
    setCaseData(null)
    localStorage.removeItem(STORAGE_KEY)
  }

  return {
    caseData,
    saveCaseData,
    updateCaseData,
    clearCaseData,
    isLoaded,
  }
}
