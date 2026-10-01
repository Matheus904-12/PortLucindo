'use client'
import { useState } from 'react'
import type { Project } from '@/content/schema'
import { mesAno } from '@/lib/format'
import { Dialogo } from './Dialogo'

/** Barra larga e fina do projeto em construção: sem imagem, com info em modal e o "Ver demo" em destaque. */
export function WeaveBarra({ projeto }: { projeto: Project }) {
  const [aberto, setAberto] = useState(false)
  const inicio = projeto.startsAt ? mesAno(projeto.startsAt) : null
  return (
    <>
      <div className="barra" data-anim="inclinar" data-sem-opacidade>
        <div className="barra-titulo">
          <span className="selo-breve mono">Em construção{inicio && <> · produção em {inicio}</>}</span>
          <h3>{projeto.title}</h3>
          <p className="barra-tipo">{projeto.kind}</p>
        </div>
        <div className="barra-acoes">
          <button type="button" className="btn btn-fantasma btn-pequeno" onClick={() => setAberto(true)} aria-haspopup="dialog" aria-label={`Sobre o ${projeto.title}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></svg>
            Sobre
          </button>
          {projeto.demo && <a className="btn btn-primario btn-pequeno" href={projeto.demo} target="_blank" rel="noopener noreferrer">Ver demo <span className="seta" aria-hidden="true">↗</span></a>}
        </div>
      </div>
      <Dialogo aberto={aberto} aoFechar={() => setAberto(false)} rotulo="Em construção" titulo={projeto.title}>
        <div className="sobre-weave">
          <p className="sobre-weave-lead">{projeto.summary}</p>
          <dl className="fatos">
            <div><dt className="mono">Situação</dt><dd>Em construção</dd></div>
            {inicio && <div><dt className="mono">Início da produção</dt><dd>{inicio}</dd></div>}
            <div><dt className="mono">Tecnologias</dt><dd>{projeto.stack.join(', ')}</dd></div>
          </dl>
          {projeto.highlights && (
            <>
              <h3 className="mono">O que o produto vai fazer</h3>
              <ul className="sobre-weave-lista">{projeto.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
            </>
          )}
          <p className="proj-aviso">O protótipo no ar é uma demonstração: os dados, a IA e as integrações são simulados.</p>
          <div className="proj-links">
            {projeto.demo && <a className="btn btn-primario btn-pequeno" href={projeto.demo} target="_blank" rel="noopener noreferrer">Ver demo <span className="seta" aria-hidden="true">↗</span></a>}
            {projeto.repo && <a className="btn btn-fantasma btn-pequeno" href={projeto.repo} target="_blank" rel="noopener noreferrer">Código <span className="seta" aria-hidden="true">↗</span></a>}
          </div>
        </div>
      </Dialogo>
    </>
  )
}
