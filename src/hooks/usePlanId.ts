'use client'

import { useState, useEffect } from 'react'

const STORAGE_KEY = 'travel-planner-plan-id'

function generatePlanId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}

export function usePlanId(): string | null {
  const [planId, setPlanId] = useState<string | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    let id = params.get('plan')

    if (id) {
      // URLにIDがあればlocalStorageに保存して使用
      localStorage.setItem(STORAGE_KEY, id)
    } else {
      // localStorageにあれば再利用、なければ新規生成
      id = localStorage.getItem(STORAGE_KEY) ?? generatePlanId()
      localStorage.setItem(STORAGE_KEY, id)
      // URLにIDを付与（リロードなし）
      const url = new URL(window.location.href)
      url.searchParams.set('plan', id)
      window.history.replaceState({}, '', url.toString())
    }

    setPlanId(id)
  }, [])

  return planId
}
