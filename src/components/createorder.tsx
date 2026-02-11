'use client';
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Header } from "../components/header";
import { Footer } from "../components/footer";

interface Service {
  id: number;
  title: string;
  description: string;
  price?: number; // opcional si tu backend devuelve precio
}

export function CreateOrder() {
  const { id: serviceId } = useParams(); // id del servicio desde la ruta
  const navigate = useNavigate();

  const [cantidad, setCantidad] = useState(1);
  const [user, setUser] = useState<{ id: number; email: string; role: string } | null>(null);
  const [service, setService] = useState<Service | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);

  // Obtener datos del usuario logueado
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/auth/me", {
          credentials: "include",
        });

        if (!res.ok) throw new Error("No autorizado");

        const data = await res.json();
        setUser(data);
      } catch (err: any) {
        setUser(null);
        setError(err.message);
      }
    };

    fetchUser();
  }, []);

  // Obtener datos del servicio
  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/service/${serviceId}`, {
          credentials: "include", // si tu backend requiere cookies
        });

        if (!res.ok) throw new Error("No se pudo cargar el servicio");

        const data = await res.json();
        setService(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (serviceId) fetchService();
  }, [serviceId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!user) {
      return setError("Debes estar autenticado para realizar un pedido");
    }

    if (!service) {
      return setError("Servicio no disponible");
    }

    if (cantidad <= 0) {
      return setError("La cantidad debe ser mayor a 0");
    }

    try {
      const res = await fetch("http://localhost:3001/api/order/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // ✅ para enviar cookie HttpOnly
        body: JSON.stringify({
          serviceId: service.id,
          cantidad,
          userId: user.id,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Error al crear el pedido");

      setSuccess("Pedido realizado correctamente");
      setCantidad(1);

      setTimeout(() => navigate("/perfil"), 3500);

    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) return null;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Header />
      <main>
        <div className="min-h-screen flex items-center justify-center bg-background px-4 py-10">
          <div className="w-full max-w-2xl bg-card p-8 rounded-lg shadow-sm border space-y-8">
         
            {service && (
              <div className="space-y-2">
                <h1 className="text-2xl font-semibold text-center">{service.title}</h1>
                <p className="text-sm text-muted-foreground text-center">{service.description}</p>
                {service.price && (
                  <p className="text-center font-medium">Precio: {service.price} €</p>
                )}
              </div>
            )}

       
            <form className="space-y-4" onSubmit={handleSubmit}>
              <label>Eliga la cantidad</label>
              <Input
                type="number"
                min={1}
                placeholder="Cantidad"
                value={cantidad}
                onChange={(e) => setCantidad(parseInt(e.target.value))}
              />

              {error && (
                <div className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg p-2">
                  {error}
                </div>
              )}

              {success && (
                <div className="text-sm text-green-600 bg-green-50 border border-green-200 rounded-lg p-2">
                  {success}
                </div>
              )}

              <Button className="w-full">
                Realizar Pedido
              </Button>
            </form>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
