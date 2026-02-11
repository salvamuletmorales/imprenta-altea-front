import { ArrowRight } from "lucide-react"

export function AboutSection() {
  return (
    <section id="historia" className="py-20 lg:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <p className="text-sm font-medium text-accent tracking-wider uppercase mb-4">Nuestra Historia</p>
            <h2 className="font-serif text-3xl lg:text-5xl font-medium text-foreground leading-tight text-balance">
              Mas de 60 años imprimiendo en Altea
            </h2>
            
            <div className="mt-8 space-y-6 text-muted-foreground leading-relaxed">
              <p>
                Fundada en 1962 por Antonio Mulet Zaragozi, conocido como Antonio {"\"el cartero\""}, nuestra imprenta nacio en una epoca de retos como un proyecto familiar que hoy cuenta con más de seis decadas de historia.
              </p>
              <p>
                Comenzamos con una maquina plana y servicio de papeleria. Poco despues incorporamos la tipografia tradicional con una Minerva de aspas, que aun conservamos como simbolo de nuestros origenes. Con el tiempo, evolucionamos hacia la impresion offset y, a principios de los 2000, la impresion digital.
              </p>
              <p>
                Hoy continuamos siendo una empresa familiar, con la misma pasión por la impresion y el compromiso con el trabajo bien hecho. Nuestra prioridad: la satisfaccion del cliente.
              </p>
            </div>

            <a 
              href="#servicios" 
              className="inline-flex items-center gap-2 mt-8 text-sm font-medium text-foreground hover:text-accent transition-colors group"
            >
              Descubre nuestros servicios
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Timeline */}
          <div className="order-1 lg:order-2">
            <div className="bg-background p-8 lg:p-10 rounded-lg border border-border">
              <h3 className="font-serif text-xl font-medium text-foreground mb-8">Nuestra Trayectoria</h3>
              
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 bg-accent rounded-full" />
                    <div className="w-px h-full bg-border" />
                  </div>
                  <div className="pb-8">
                    <p className="font-serif text-lg font-medium text-foreground">1962</p>
                    <p className="text-sm text-muted-foreground mt-1">Fundacion en Calle Pont de Moncau</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 bg-accent rounded-full" />
                    <div className="w-px h-full bg-border" />
                  </div>
                  <div className="pb-8">
                    <p className="font-serif text-lg font-medium text-foreground">Decada 1970</p>
                    <p className="text-sm text-muted-foreground mt-1">Incorporacion de tipografia Minerva</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 bg-accent rounded-full" />
                    <div className="w-px h-full bg-border" />
                  </div>
                  <div className="pb-8">
                    <p className="font-serif text-lg font-medium text-foreground">1998</p>
                    <p className="text-sm text-muted-foreground mt-1">Traslado a Calle Benidorm</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 bg-accent rounded-full" />
                  </div>
                  <div>
                    <p className="font-serif text-lg font-medium text-foreground">Hoy</p>
                    <p className="text-sm text-muted-foreground mt-1">Impresion digital y offset</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
