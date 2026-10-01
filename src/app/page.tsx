import { Animations } from '@/components/Animations'
import { Hero } from '@/components/Hero'
import { Nav } from '@/components/Nav'
import { StackMarquee } from '@/components/StackMarquee'

export default function Home() {
  return (
    <>
      <Animations />
      <Nav />
      <main>
        <Hero />
        <StackMarquee />
      </main>
    </>
  )
}
