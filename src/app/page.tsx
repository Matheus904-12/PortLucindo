import { About } from '@/components/About'
import { Animations } from '@/components/Animations'
import { Hero } from '@/components/Hero'
import { Nav } from '@/components/Nav'
import { Projects } from '@/components/Projects'
import { StackMarquee } from '@/components/StackMarquee'
import { Trajetoria } from '@/components/Trajetoria'

export default function Home() {
  return (
    <>
      <Animations />
      <Nav />
      <main>
        <Hero />
        <StackMarquee />
        <About />
        <Trajetoria />
        <Projects />
      </main>
    </>
  )
}
