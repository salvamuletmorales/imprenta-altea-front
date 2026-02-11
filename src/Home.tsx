import { Header } from '../src/components/header'
import { HeroSection } from '../src/components/hero-section'
import { AboutSection } from '../src/components/about-section'
import { ServicesSection } from '../src/components/services-section'
import { Footer } from '../src/components/footer'

export function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
      </main>
      <Footer />
    </div>
  )
}