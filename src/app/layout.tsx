import type { Metadata, Viewport } from 'next'
import '@fontsource/geist/latin-400.css'
import '@fontsource/geist/latin-500.css'
import '@fontsource/geist/latin-600.css'
import '@fontsource/geist-mono/latin-400.css'
import '@fontsource/geist-mono/latin-500.css'
import '@fontsource/instrument-serif/latin-400.css'
import '@fontsource/instrument-serif/latin-400-italic.css'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://lucindoporto.netlify.app'),
  title: 'Matheus Lucindo — Desenvolvedor de Software',
  description: 'Desenvolvedor de software e analista na BCR.CX. Integrações, APIs e produtos web com TypeScript, Python e Node.js.',
  openGraph: { title: 'Matheus Lucindo', description: 'Desenvolvedor de software e analista.', locale: 'pt_BR', type: 'website' },
}
export const viewport: Viewport = { themeColor: '#0e0d0c', colorScheme: 'dark light' }

// Lê o tema salvo antes da primeira pintura, para não piscar o tema errado.
const temaInicial = `try{var t=localStorage.getItem('tema');if(!t)t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';document.documentElement.dataset.theme=t}catch(e){}`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" data-theme="dark" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: temaInicial }} /></head>
      <body>{children}</body>
    </html>
  )
}
