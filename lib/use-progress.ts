"use client"

import * as React from "react"
import type { LanguageId } from "./types"

export type LessonStatus = "completed" | "weak"

export interface Reminder {
  id: string
  text: string
  time: string // HH:MM
  createdAt: number
}

interface ProgressState {
  // lessonId -> status
  statuses: Record<string, LessonStatus>
  reminders: Reminder[]
  lastVisited: Record<LanguageId, string | undefined>
}

const STORAGE_KEY = "codemaster500.progress.v1"

const EMPTY: ProgressState = {
  statuses: {},
  reminders: [],
  lastVisited: {} as Record<LanguageId, string | undefined>,
}

function read(): ProgressState {
  if (typeof window === "undefined") return EMPTY
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return EMPTY
    const parsed = JSON.parse(raw)
    return {
      statuses: parsed.statuses ?? {},
      reminders: parsed.reminders ?? [],
      lastVisited: parsed.lastVisited ?? {},
    }
  } catch {
    return EMPTY
  }
}

function write(state: ProgressState) {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // ignore quota errors
  }
}

export function useProgress() {
  const [state, setState] = React.useState<ProgressState>(EMPTY)
  const [hydrated, setHydrated] = React.useState(false)

  React.useEffect(() => {
    setState(read())
    setHydrated(true)
  }, [])

  const update = React.useCallback((updater: (prev: ProgressState) => ProgressState) => {
    setState((prev) => {
      const next = updater(prev)
      write(next)
      return next
    })
  }, [])

  const setStatus = React.useCallback(
    (lessonId: string, status: LessonStatus | null) => {
      update((prev) => {
        const statuses = { ...prev.statuses }
        if (status === null) {
          delete statuses[lessonId]
        } else {
          statuses[lessonId] = status
        }
        return { ...prev, statuses }
      })
    },
    [update],
  )

  const markCompleted = React.useCallback(
    (lessonId: string) => setStatus(lessonId, "completed"),
    [setStatus],
  )
  const markWeak = React.useCallback((lessonId: string) => setStatus(lessonId, "weak"), [setStatus])
  const clearStatus = React.useCallback((lessonId: string) => setStatus(lessonId, null), [setStatus])

  const setLastVisited = React.useCallback(
    (language: LanguageId, lessonId: string) => {
      update((prev) => ({
        ...prev,
        lastVisited: { ...prev.lastVisited, [language]: lessonId },
      }))
    },
    [update],
  )

  const addReminder = React.useCallback(
    (text: string, time: string) => {
      update((prev) => ({
        ...prev,
        reminders: [
          ...prev.reminders,
          { id: `r-${Date.now()}`, text, time, createdAt: Date.now() },
        ],
      }))
    },
    [update],
  )

  const removeReminder = React.useCallback(
    (id: string) => {
      update((prev) => ({
        ...prev,
        reminders: prev.reminders.filter((r) => r.id !== id),
      }))
    },
    [update],
  )

  return {
    hydrated,
    statuses: state.statuses,
    reminders: state.reminders,
    lastVisited: state.lastVisited,
    markCompleted,
    markWeak,
    clearStatus,
    setLastVisited,
    addReminder,
    removeReminder,
  }
}
