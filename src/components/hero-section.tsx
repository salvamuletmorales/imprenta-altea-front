import { Button } from "@/src/components/ui/button"
import { ArrowRight } from "lucide-react"
import { Link } from 'react-router-dom'

export function HeroSection() {
  return (
    <section
  className="
    relative
    pt-32 pb-20 lg:pt-40 lg:pb-32
    bg-[url('/fondo1.jpeg')]
    bg-cover bg-center
  "
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-black/60"></div>

  {/* Content */}
  <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
    <div className="flex flex-col items-center text-center">

      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/90 backdrop-blur-sm rounded-full mb-8">
        <span className="w-2 h-2 bg-accent rounded-full" />
        <span className="text-sm text-muted-foreground font-bold">
          Más de 60 años de tradición
        </span>
      </div>

      {/* Main Headline */}
      <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-medium text-white leading-tight max-w-4xl text-balance">
        Tradición e innovación en cada impresión
      </h1>

      {/* Subtitle */}
      <p className="mt-6 text-lg lg:text-xl text-white/80 max-w-2xl leading-relaxed">
        Desde 1962, combinamos el arte de la impresión tradicional con las últimas tecnologías
        para ofrecer resultados excepcionales.
      </p>

      {/* CTA Buttons */}
      <div className="mt-10 flex flex-col sm:flex-row gap-4">
        <Button
          size="lg"
          className="bg-primary cursor-pointer text-primary-foreground hover:bg-primary/90 px-8 h-12"
        >
          <Link to="/perfil">Realizar Pedido</Link>
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
        <a href="#historia">
        <Button
          variant="outline"
          size="lg"
          className="px-8 h-12 cursor-pointer border-white/40 text-white hover:bg-white/10 bg-transparent"
        >
          Conocer Más
        </Button>
        </a>
      </div>

      {/* Stats */}
      <div className="mt-20 grid grid-cols-3 gap-8 lg:gap-16 border-t border-white/20 pt-10">
        <div className="text-center">
          <p className="font-serif text-3xl lg:text-4xl font-semibold text-white">
            1962
          </p>
          <p className="mt-2 text-sm text-white/70">Año de fundación</p>
        </div>

        <div className="text-center">
          <p className="font-serif text-3xl lg:text-4xl font-semibold text-white">
            60+
          </p>
          <p className="mt-2 text-sm text-white/70">Años de experiencia</p>
        </div>

        <div className="text-center">
          <p className="font-serif text-3xl lg:text-4xl font-semibold text-white">
            3
          </p>
          <p className="mt-2 text-sm text-white/70">Generaciones</p>
        </div>
      </div>

    </div>
  </div>
</section>
  )
}
