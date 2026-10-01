'use client'
import { useEffect, useId, useRef } from 'react'
import { lockScroll, unlockScroll } from '@/lib/scroll'

interface DialogoProps {
  aberto: boolean
  aoFechar: () => void
  rotulo: string
  titulo: string
  children: React.ReactNode
}

/**
 * Modal sobre o <dialog> nativo: foco preso, Esc fecha e o foco volta para o botão que abriu.
 * Para a rolagem suave (Lenis) enquanto está aberto, senão a página rola por trás.
 */
export function Dialogo({ aberto, aoFechar, rotulo, titulo, children }: DialogoProps) {
  const ref = useRef<HTMLDialogElement>(null)
  const idTitulo = useId()

  useEffect(() => {
    const dialogo = ref.current
    if (!dialogo) return
    if (aberto && !dialogo.open) { dialogo.showModal(); lockScroll() }
    if (!aberto && dialogo.open) dialogo.close()
  }, [aberto])

  // O evento "close" cobre Esc, o botão X e o clique no fundo.
  const aoFecharNativo = () => { unlockScroll(); aoFechar() }

  return (
    <dialog ref={ref} className="dialogo" aria-labelledby={idTitulo} onClose={aoFecharNativo} onClick={(e) => e.target === ref.current && ref.current?.close()}>
      <div className="dialogo-corpo">
        <header className="dialogo-cabeca">
          <div>
            <p className="mono">{rotulo}</p>
            <h2 id={idTitulo}>{titulo}</h2>
          </div>
          <button type="button" className="icon-btn" onClick={() => ref.current?.close()} aria-label="Fechar">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </header>
        {aberto && children}
      </div>
    </dialog>
  )
}
