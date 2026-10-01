import type { Profile } from '../content/schema'

/** O que o navegador recebe: o perfil sem o e-mail. */
export type PerfilPublico = Omit<Profile, 'email'>

export type TipoDeItem = 'trabalho' | 'formacao' | 'marco'

export interface ItemDaLinhaDoTempo {
  id: string
  date: string
  end: string | null
  kind: TipoDeItem
  title: string
  subtitle: string
  text: string
  current: boolean
  future: boolean
}

const hojeComoMes = () => new Date().toISOString().slice(0, 7)

/** Junta vínculos, estudos e marcos em ordem cronológica. `hoje` (AAAA-MM) é parâmetro para o resultado ser testável. */
export function montarLinhaDoTempo(profile: PerfilPublico, hoje = hojeComoMes()): ItemDaLinhaDoTempo[] {
  const trabalhos = profile.experience.map((e): ItemDaLinhaDoTempo => ({
    id: `trabalho-${e.company}-${e.start}`, date: e.start, end: e.end, kind: 'trabalho',
    title: e.role, subtitle: e.company, text: e.summary, current: e.end === null, future: e.start > hoje,
  }))
  const estudos = profile.education.map((e): ItemDaLinhaDoTempo => ({
    id: `formacao-${e.institution}-${e.start}`, date: e.start, end: e.end, kind: 'formacao',
    title: e.institution, subtitle: e.course, text: e.note ? `${e.note}. ${e.summary ?? ''}`.trim() : (e.summary ?? ''),
    current: e.start <= hoje && e.end > hoje, future: e.start > hoje,
  }))
  const marcos = profile.milestones.map((m): ItemDaLinhaDoTempo => ({
    id: `marco-${m.date}-${m.title}`, date: m.date, end: null, kind: 'marco',
    title: m.title, subtitle: '', text: m.text, current: false, future: m.date > hoje,
  }))
  return [...trabalhos, ...estudos, ...marcos].sort((a, b) => a.date.localeCompare(b.date))
}

/** Conta cada entrada; as trilhas (Microsoft Learning, Senai) contam um por item. */
export function totalCertificacoes(profile: PerfilPublico): number {
  return profile.certifications.reduce((total, c) => total + (c.items?.length ?? 1), 0)
}
