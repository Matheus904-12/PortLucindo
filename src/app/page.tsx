import { About } from '@/components/About'
import { Animations } from '@/components/Animations'
import { Hero } from '@/components/Hero'
import { Nav } from '@/components/Nav'
import { StackMarquee } from '@/components/StackMarquee'
import { Timeline } from '@/components/Timeline'

export default function Home() {
  return (
    <>
      <Animations />
      <Nav />
      <main>
        <Hero />
        <StackMarquee />
        <About />
        <Timeline />
      </main>
    </>
  )
}
