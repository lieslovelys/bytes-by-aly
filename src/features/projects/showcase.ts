import { BookOpen, Clapperboard, Code2, Donut, Library, QrCode, Store, Wallet } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { Project } from '../../data/projects'

export type Filter = 'All' | 'Web' | 'Desktop' | 'Thesis'
export const filters: Filter[] = ['All', 'Web', 'Desktop', 'Thesis']
const categories: Record<string, Exclude<Filter, 'All'>> = {
  payroll: 'Thesis', urstamp: 'Web', sors: 'Web', adgen: 'Web', edupro: 'Web',
  'wooden-bizarre': 'Web', 'dunkin-donuts-ordering-system': 'Desktop',
}
const icons: Record<string, LucideIcon> = {
  payroll: Wallet, urstamp: QrCode, sors: BookOpen, adgen: Clapperboard,
  edupro: Library, 'wooden-bizarre': Store, 'dunkin-donuts-ordering-system': Donut,
}
export const slugOf = (project: Project) => {
  const slug = project.slug ?? project.id
  return slug === 'automated-payroll' ? 'payroll' : slug
}
export const categoryOf = (project: Project) => categories[slugOf(project)]
export const iconOf = (project: Project) => icons[slugOf(project)] ?? Code2
export const titleOf = (project: Project) => project.title.replace(/ — Thesis Project$/, '')

interface ShowcaseState { filter: Filter; selectedId: string | null }
type ShowcaseAction = { type: 'filter'; filter: Filter } | { type: 'open'; id: string } | { type: 'close' }
export function showcaseReducer(state: ShowcaseState, action: ShowcaseAction): ShowcaseState {
  switch (action.type) {
    case 'filter': return { ...state, filter: action.filter }
    case 'open': return { ...state, selectedId: action.id }
    case 'close': return { ...state, selectedId: null }
  }
}
