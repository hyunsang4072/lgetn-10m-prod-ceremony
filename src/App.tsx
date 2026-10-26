import AppShell from '@/components/AppShell'
import BackToTop from '@/components/BackToTop'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import MenuCarousel from '@/components/MenuCarousel'
import Timeline from '@/components/Timeline'

export default function App() {
  return (
    <AppShell>
      <Header />
      <main>
        <Hero />
        <Timeline />
        <MenuCarousel />
      </main>
      <Footer />
      <BackToTop />
    </AppShell>
  )
}
