import { publicProfile } from '@/content/publico'

const REPOSITORIO = 'https://github.com/Matheus904-12/PortLucindo'

export function Rodape() {
  return (
    <footer className="rodape">
      <div className="container">
        <p className="rodape-marca" aria-hidden="true">Lucindo<span className="accent">©</span></p>
        <div className="rodape-linhas">
          <ul className="rodape-links" aria-label="Redes">
            {publicProfile.links.map((l) => <li key={l.href}><a href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a></li>)}
          </ul>
          <p className="rodape-versoes">
            Esta é a terceira versão do portfólio. A de 2024–2025 e a de 2026 continuam no GitHub:{' '}
            <a href={`${REPOSITORIO}/tree/arquivo/design-1-2024-2025`} target="_blank" rel="noopener noreferrer">design 1</a>
            {' · '}
            <a href={`${REPOSITORIO}/tree/arquivo/design-2-2026`} target="_blank" rel="noopener noreferrer">design 2</a>.
          </p>
        </div>
        <p className="mono rodape-copy">© {new Date().getFullYear()} {publicProfile.name} · {publicProfile.location}</p>
      </div>
    </footer>
  )
}
