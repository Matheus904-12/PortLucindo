'use client'
import { useEffect, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { initSmoothScroll } from '@/lib/scroll'

// No servidor useLayoutEffect não roda; este alias evita o aviso e mantém o efeito antes da pintura no cliente.
const useEfeitoAntesDaPintura = typeof window !== 'undefined' ? useLayoutEffect : useEffect
const EASE = 'power3.out'

function subir(el: Element) {
  gsap.from(el, { y: 44, opacity: 0, duration: 0.9, ease: EASE, scrollTrigger: { trigger: el, start: 'top 88%', once: true } })
}

function escalonar(container: Element) {
  gsap.from(container.children, { y: 48, opacity: 0, duration: 0.85, stagger: 0.09, ease: EASE, scrollTrigger: { trigger: container, start: 'top 85%', once: true } })
}

function entradaDoHero() {
  gsap.from('.hero .linha > span', { yPercent: 115, duration: 1.2, stagger: 0.12, ease: 'power4.out', delay: 0.15 })
  gsap.fromTo('.hero-foto', { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 1.4, ease: 'power4.inOut', delay: 0.2 })
  gsap.from('.hero-aparece', { y: 24, opacity: 0, duration: 0.9, stagger: 0.08, ease: EASE, delay: 0.7 })
}

/** Movimento preso ao scroll (scrub): a posição depende de onde a página está, não de tempo. */
function paralaxeDoHero() {
  const gatilho = { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
  gsap.to('.hero-foto img', { yPercent: 12, ease: 'none', scrollTrigger: gatilho })
  gsap.to('.hero h1', { yPercent: -7, ease: 'none', scrollTrigger: gatilho })
}

/** A linha central da Trajetória se desenha conforme a seção passa pela tela. */
function desenharLinhaDoTempo() {
  gsap.fromTo('.tl-linha', { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.tl-envoltorio', start: 'top 70%', end: 'bottom 70%', scrub: true } })
}

function barraDeProgresso() {
  gsap.fromTo('.scroll-progress', { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0.3 } })
}

/**
 * Tudo dentro de matchMedia: com prefers-reduced-motion nada é escondido nem movido.
 * Os elementos nascem visíveis; o GSAP só os esconde quando o movimento é permitido.
 */
export function useScrollAnimations() {
  useEfeitoAntesDaPintura(() => {
    gsap.registerPlugin(ScrollTrigger)
    const parar = initSmoothScroll()
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      entradaDoHero()
      paralaxeDoHero()
      barraDeProgresso()
      desenharLinhaDoTempo()
      gsap.utils.toArray<Element>('[data-anim="subir"]').forEach(subir)
      gsap.utils.toArray<Element>('[data-anim="escalonar"]').forEach(escalonar)
    })
    document.fonts.ready.then(() => ScrollTrigger.refresh())
    return () => { media.revert(); parar() }
  }, [])
}
