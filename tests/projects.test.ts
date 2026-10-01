import { existsSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { profile } from '../src/content/profile'

const arquivo = (caminho: string) => `public${caminho}`

describe('projetos', () => {
  it('toda capa declarada existe como arquivo local (nada de imagem hospedada em terceiros)', () => {
    for (const p of profile.projects.filter((x) => x.cover)) {
      expect(p.cover!.startsWith('/images/projetos/'), p.slug).toBe(true)
      expect(existsSync(arquivo(p.cover!)), p.slug).toBe(true)
    }
  })
  it('toda capa tem a versão mobile ao lado (usada no mockup de celular)', () => {
    for (const p of profile.projects.filter((x) => x.cover)) expect(existsSync(arquivo(p.cover!.replace('-desktop', '-mobile'))), p.slug).toBe(true)
  })
  it('projeto com demo quebrada ou com login não expõe link de demo', () => {
    for (const slug of ['weatherapi', 'cerne']) expect(profile.projects.find((p) => p.slug === slug)?.demo, slug).toBeUndefined()
  })
  it('todo projeto com demo ao vivo tem capa', () => {
    for (const p of profile.projects.filter((x) => x.demo)) expect(p.cover, p.slug).toBeTruthy()
  })
  it('projeto privado nunca expõe link de repositório', () => {
    for (const p of profile.projects.filter((x) => x.privateCode)) expect(p.repo, p.slug).toBeUndefined()
  })
  it('só entram projetos da lista confirmada pelo Senhor', () => {
    const permitidos = ['agendei', 'prodmais', 'claude-cortex', 'weave', 'inovamold', 'suburban', 'conectatea', 'weatherapi', 'cerne', 'ecommerce-montink', 'sunnythings']
    expect(profile.projects.map((p) => p.slug).sort()).toEqual([...permitidos].sort())
  })
  it('nenhum resumo cita imagem de banco nem número inflado', () => {
    const tudo = JSON.stringify(profile.projects)
    for (const proibido of ['unsplash', 'wikimedia', '3+ anos', '60+']) expect(tudo.toLowerCase()).not.toContain(proibido)
  })
})
