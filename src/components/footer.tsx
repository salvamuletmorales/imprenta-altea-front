import { MapPin, Phone, Mail, Clock } from "lucide-react"

export function Footer() {
  return (
    <footer id="contacto" className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-40 h-10 bg-primary-foreground rounded-sm flex items-center justify-center">
                 <img src="logo.png"></img>
              </div>
              <div>
                <span className="font-serif text-xl font-semibold">Imprenta Altea</span>
                <p className="text-xs text-primary-foreground/70 tracking-wider">DESDE 1962</p>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              Empresa familiar con más de 60 años de experiencia en servicios de impresion en Altea.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg font-medium mb-6">Contacto</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-foreground/70 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-primary-foreground/80">Calle Benidorm, Altea, Alicante</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary-foreground/70 flex-shrink-0" />
                <span className="text-sm text-primary-foreground/80">+34 965 84 09 19</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary-foreground/70 flex-shrink-0" />
                <span className="text-sm text-primary-foreground/80">info@imprentaaltea.es</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-serif text-lg font-medium mb-6">Horario</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary-foreground/70 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-primary-foreground/80">
                  <p>Lunes - Viernes</p>
                  <p className="text-primary-foreground">9:00 - 14:00 / 17:00 - 20:00</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary-foreground/70 mt-0.5 flex-shrink-0 opacity-0" />
                <div className="text-sm text-primary-foreground/80">
                  <p>Sabados</p>
                  <p className="text-primary-foreground">9:00 - 14:00</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-serif text-lg font-medium mb-6">Enlaces</h4>
            <ul className="space-y-3">
              <li>
                <a href="#historia" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Nuestra Historia
                </a>
              </li>
              <li>
                <a href="#servicios" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Servicios
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Política de Privacidad
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-primary-foreground/20 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/70">
            © {new Date().getFullYear()} Imprenta Altea. Todos los derechos reservados.
          </p>
          <p className="text-sm text-primary-foreground/70">
            Altea, Alicante - Espana
          </p>
        </div>
      </div>
    </footer>
  )
}
