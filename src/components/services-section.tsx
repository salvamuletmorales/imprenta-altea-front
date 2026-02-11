import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ArrowRight, Folder, Layers, FileText, MailIcon } from "lucide-react";

const iconMap = {
  Folder,
  Layers,
  FileText,
  MailIcon,
};

export function ServicesSection() {
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/api/service/all")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al cargar los servicios");
        }
        return res.json();
      })
      .then((data) => setServices(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="servicios" className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-medium text-accent tracking-wider uppercase mb-4">
            Nuestros Servicios
          </p>
          <h2 className="font-serif text-3xl lg:text-5xl font-medium text-foreground leading-tight">
            Soluciones de impresión para cada necesidad
          </h2>
        </div>

        {/* Contenido */}
        {loading ? (
          <p className="text-center text-muted-foreground">Cargando servicios...</p>
        ) : error ? (
          <p className="text-center text-red-500">No se pudieron cargar los servicios: {error}</p>
        ) : services.length === 0 ? (
          <p className="text-center text-muted-foreground">No hay servicios disponibles por el momento.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {services.map((service) => {
              const Icon = iconMap[service.icon];
              return (
                <Link
                  key={service.id}
                  to={`/nuevo-pedido/${service.id}`}
                  className="block"
                >
                  <div className="group p-6 lg:p-4 bg-card border border-border rounded-lg hover:border-accent/50 transition-colors">
                    <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mb-6 group-hover:bg-accent/10 transition-colors">
                      {Icon && <Icon className="w-6 h-6 text-foreground" />}
                    </div>
                    <h3 className="font-serif text-xl font-medium text-foreground mb-3">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-8 bg-card border border-border rounded-lg">
            <div className="text-center sm:text-left">
              <h3 className="font-serif text-xl font-medium text-foreground">
                ¿Listo para empezar?
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Accede a nuestra plataforma y realiza tu pedido online
              </p>
            </div>

            <Link to="/perfil">
              <Button size="lg">
                Realizar Pedido
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
