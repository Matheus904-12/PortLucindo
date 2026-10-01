import { publicProfile } from '@/content/profile'
import { mesAno, periodo } from '@/lib/format'
import { montarLinhaDoTempo, type TipoDeItem } from '@/lib/timeline'
import { SecaoCabeca } from './SecaoCabeca'

const ROTULO: Record<TipoDeItem, string> = { trabalho: 'Trabalho', formacao: 'Formação', marco: 'Marco' }

export function Timeline() {
  const itens = montarLinhaDoTempo(publicProfile)
  return (
    <section className="secao" id="trajetoria">
      <div className="container">
        <SecaoCabeca numero="02" rotulo="Trajetória" titulo={<>De 2022 a <em>2027</em>.</>} />
        <div className="tl-envoltorio">
          <div className="tl-linha" aria-hidden="true" />
          <ol className="tl">
            {itens.map((i) => (
              <li key={i.id} className="tl-item" data-current={i.current} data-future={i.future} data-anim="subir">
                <time className="mono tl-data" dateTime={i.date}>{i.kind === 'marco' ? mesAno(i.date) : periodo(i.date, i.end)}</time>
                <div className="tl-corpo">
                  <p className="mono tl-tipo">
                    {ROTULO[i.kind]}
                    {i.current && <span className="tl-selo">Em andamento</span>}
                    {i.future && <span className="tl-selo tl-selo-futuro">Em breve</span>}
                  </p>
                  <h3>{i.title}</h3>
                  {i.subtitle && <p className="tl-sub">{i.subtitle}</p>}
                  {i.text && <p className="tl-texto">{i.text}</p>}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
