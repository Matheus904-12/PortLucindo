import { describe, expect, it } from 'vitest'
import { profile } from '../src/content/profile'
import { montarLinhaDoTempo, totalCertificacoes } from '../src/lib/timeline'

const HOJE = '2026-10'

describe('linha do tempo', () => {
  const itens = montarLinhaDoTempo(profile, HOJE)
  it('junta experiências, formações e marcos', () => {
    expect(itens).toHaveLength(profile.experience.length + profile.education.length + profile.milestones.length)
  })
  it('ordena do mais antigo para o mais novo', () => {
    const datas = itens.map((i) => i.date)
    expect(datas).toEqual([...datas].sort())
  })
  it('começa no Sesi (2022) e termina no início do WEAVE (jan/2027)', () => {
    expect(itens[0]?.title).toContain('Sesi')
    const ultimo = itens.at(-1)
    expect(ultimo?.title).toContain('WEAVE')
    expect(ultimo?.date).toBe('2027-01')
  })
  it('marca como futuro só o que ainda não começou', () => {
    expect(itens.filter((i) => i.future).map((i) => i.title)).toEqual([expect.stringContaining('WEAVE')])
  })
  it('marca BCR.CX e UMC como em andamento', () => {
    const atuais = itens.filter((i) => i.current).map((i) => i.subtitle + i.title)
    expect(atuais.join('|')).toContain('BCR.CX')
    expect(atuais.join('|')).toContain('Universidade de Mogi das Cruzes')
  })
  it('não marca a Rádio SAT FM (terminou em 2025) como em andamento', () => {
    expect(itens.find((i) => i.subtitle.includes('Rádio SAT FM'))?.current).toBe(false)
  })
})

describe('totalCertificacoes', () => {
  it('soma as entradas, contando cada item das trilhas', () => expect(totalCertificacoes(profile)).toBe(43))
})
