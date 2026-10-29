import { useEffect, useReducer, useState } from 'react'

export type ListState<T> =
  | { status: 'idle' | 'loading' | 'empty' | 'error'; data: T[] }
  | { status: 'success'; data: T[] }
export type ListAction<T> = { type: 'loading' | 'error' } | { type: 'loaded'; data: T[] }

export function listReducer<T>(_state: ListState<T>, action: ListAction<T>): ListState<T> {
  if (action.type === 'loaded') return { status: action.data.length ? 'success' : 'empty', data: action.data }
  return { status: action.type, data: [] }
}

export function useApiList<T>(url: string) {
  const [state, dispatch] = useReducer(listReducer<T>, { status: 'idle', data: [] })
  const [attempt, setAttempt] = useState(0)
  useEffect(() => {
    const controller = new AbortController()
    dispatch({ type: 'loading' })
    void (async () => {
      try {
        const response = await fetch(url, { signal: controller.signal })
        if (!response.ok) throw new Error('Request failed')
        const data: unknown = await response.json()
        if (!Array.isArray(data)) throw new Error('Invalid response')
        if (!controller.signal.aborted) dispatch({ type: 'loaded', data: data as T[] })
      } catch {
        if (!controller.signal.aborted) dispatch({ type: 'error' })
      }
    })()
    return () => controller.abort()
  }, [url, attempt])
  return { ...state, retry: () => setAttempt((value) => value + 1) }
}
