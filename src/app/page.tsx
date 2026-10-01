export default function Home() {
  return (
    <main className="container" style={{ minHeight: '100svh', display: 'grid', alignContent: 'center', gap: 24 }}>
      <p className="mono">Design 3 · em construção</p>
      <h1 style={{ fontSize: 'clamp(3.2rem, 14vw, 10rem)' }}>
        MATHEUS<br />
        <em style={{ fontFamily: 'var(--font-display)' }}>LUCINDO</em>
        <span className="accent">©</span>
      </h1>
      <p style={{ color: 'var(--text-soft)', maxWidth: '46ch' }}>Desenvolvedor de software e analista.</p>
    </main>
  )
}
